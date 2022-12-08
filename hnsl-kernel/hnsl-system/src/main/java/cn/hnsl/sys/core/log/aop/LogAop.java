
package cn.hnsl.sys.core.log.aop;

import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.enums.BusinessStatus;
import cn.hnsl.base.enums.BusinessType;
import cn.hnsl.base.log.BaseResource;
import cn.hnsl.base.log.GetResource;
import cn.hnsl.base.log.PostResource;
import cn.hnsl.base.utils.ServletUtils;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.sys.core.log.LogManager;
import cn.hnsl.sys.core.log.LogObjectHolder;
import cn.hnsl.sys.core.log.factory.LogTaskFactory;
import cn.hnsl.sys.core.util.Contrast;
import cn.hnsl.core.util.HttpContext;
import cn.hnsl.sys.core.util.HttpServletUtil;
import cn.hnsl.sys.modular.system.entity.OperationLog;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.support.spring.PropertyPreFilters;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;
import java.util.*;

/**
 * 日志记录
 *
 * @author fengshuonan
 * @date 2016年12月6日 下午8:48:30
 */
@Aspect
@Component
public class LogAop {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    /**
     * 排除敏感属性字段
     */
    public static final String[] EXCLUDE_PROPERTIES = {"password", "oldPassword", "newPassword", "confirmPassword"};

    @Pointcut(value = "@annotation(cn.hnsl.base.log.PostResource) || @annotation(cn.hnsl.base.log.GetResource)")
    public void logPointCut() {
    }

    /**
     * 处理完请求后执行
     *
     * @param joinPoint 切点
     */
    @AfterReturning(pointcut = "logPointCut()", returning = "jsonResult")
    public void doAfterReturning(JoinPoint joinPoint, Object jsonResult) {
        handleLog(joinPoint, null, jsonResult);
    }

    /**
     * 拦截异常操作
     *
     * @param joinPoint 切点
     * @param e         异常
     */
    @AfterThrowing(value = "logPointCut()", throwing = "e")
    public void doAfterThrowing(JoinPoint joinPoint, Exception e) {
        handleLog(joinPoint, e, null);
    }

    protected void handleLog(final JoinPoint joinPoint, final Exception e, Object jsonResult) {
        try {
            // 获取接口上@PostResource或者@GetResource的name属性和requiredLogin属性
            BaseResource annotationProp = getAnnotationProp(joinPoint);


            if (annotationProp == null) {
                return;
            }

            // 获取当前的用户
            LoginUser currentUser = LoginContextHolder.me().getLoginUser();

            // *========数据库日志=========*//
            OperationLog operLog = new OperationLog();
            operLog.setStatus(BusinessStatus.SUCCESS.ordinal());
            // 请求的地址
            operLog.setOperIp(currentUser.getLastLoginIp());
            // 返回参数
            if (ToolUtil.isNotEmpty(jsonResult)) {
                operLog.setJsonResult(StringUtils.substring(JSON.toJSONString(jsonResult), 0, 2000));
            }

            operLog.setOperUrl(ServletUtils.getRequest().getRequestURI());
            if (currentUser != null) {
                operLog.setOperName(currentUser.getName());
                operLog.setDeptName(currentUser.getDeptName());
            }

            if (e != null) {
                operLog.setStatus(BusinessStatus.FAIL.ordinal());
                operLog.setErrorMsg(StringUtils.substring(e.getMessage(), 0, 2000));
            }
            // 设置方法名称
            String className = joinPoint.getTarget().getClass().getName();
            String methodName = joinPoint.getSignature().getName();
            operLog.setMethod(className + "." + methodName + "()");
            operLog.setOperTime(new Date());
            // 设置请求方式
            operLog.setRequestMethod(HttpServletUtil.getRequest().getMethod());
            // 处理设置注解上的参数
            getControllerMethodDescription(joinPoint, annotationProp, operLog);
            // 保存数据库

            if (annotationProp.isSaveLog()) {
                LogManager.me().executeLog(LogTaskFactory.bussinessLog(operLog));
            }

        } catch (Exception exp) {
            // 记录本地异常日志
            log.error("==前置通知异常==");
            log.error("异常信息:{}", exp.getMessage());
            exp.printStackTrace();
        }
    }

    /**
     * 获取注解中对方法的描述信息 用于Controller层注解
     *
     * @param log     日志
     * @param operLog 操作日志
     * @throws Exception
     */
    public void getControllerMethodDescription(JoinPoint joinPoint, BaseResource log, OperationLog operLog) throws Exception {
        // 设置action动作
        operLog.setBusinessType(log.getBusinessType().ordinal());
        // 设置标题
        operLog.setTitle(log.getModular());
        // 设置操作人类别
        operLog.setOperatorType(log.getOperatorType().ordinal());
        // 是否需要保存request，参数和值
        if (log.isSaveRequestData()) {
            // 获取参数的信息，传入到数据库中。
            setRequestValue(joinPoint, operLog);
        }


        if (log.isSaveChange()) {
            String msg = "";
            String key = log.getKey();
            if (log.getBusinessType() == BusinessType.UPDATE) {
                Object obj1 = LogObjectHolder.me().get();
                if (ToolUtil.isNotEmpty(obj1)) {
                    Map<String, String> obj2 = HttpContext.getRequestParameters();
                    msg = Contrast.contrastObj( key, obj1, obj2);
                }

            }
            operLog.setRemark(msg);
        }


    }

    /**
     * 获取请求的参数，放到log中
     *
     * @param operLog 操作日志
     * @throws Exception 异常
     */
    private void setRequestValue(JoinPoint joinPoint, OperationLog operLog) throws Exception {
        Map<String, String[]> map = ServletUtils.getRequest().getParameterMap();
        if (ToolUtil.isNotEmpty(map)) {
            String params = JSONObject.toJSONString(map, excludePropertyPreFilter());
            operLog.setOperParam(StringUtils.substring(params, 0, 2000));
        } else {
            Object args = joinPoint.getArgs();
            if (ToolUtil.isNotEmpty(args)) {
                String params = argsArrayToString(joinPoint.getArgs());
                operLog.setOperParam(StringUtils.substring(params, 0, 2000));
            }
        }
    }


    /**
     * AOP获取 @PostResource 和 @GetResource 属性信息
     *
     * @param joinPoint joinPoint对象
     * @return 返回K, V格式的参数，key是参数名称，v是参数值
     * @author liuhanqing
     * @date 2020/12/22 21:18
     */
    private BaseResource getAnnotationProp(JoinPoint joinPoint) throws Exception {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();

        // 通过map封装参数和参数值，key参数名，value是参数值
        BaseResource resource = new BaseResource();

        // 获取接口上的@PostResource或者@GetResource的name属性和requiredLogin属性，填充到map
        GetResource getResource = method.getAnnotation(GetResource.class);
        PostResource postResource = method.getAnnotation(PostResource.class);

        Boolean isResource = false;

        if (getResource != null) {
            resource.setModular(getResource.modular());
            resource.setBusinessType(getResource.businessType());
            resource.setOperatorType(getResource.operatorType());
            resource.setDict(getResource.dict());
            resource.setKey(getResource.key());
            resource.setSaveChange(getResource.isSaveChange());
            resource.setSaveRequestData(getResource.isSaveRequestData());
            resource.setSaveLog(getResource.isSaveLog());

            isResource = true;
        }

        if (postResource != null) {
            resource.setModular(postResource.modular());
            resource.setBusinessType(postResource.businessType());
            resource.setOperatorType(postResource.operatorType());
            resource.setDict(postResource.dict());
            resource.setKey(postResource.key());
            resource.setSaveChange(postResource.isSaveChange());
            resource.setSaveRequestData(postResource.isSaveRequestData());
            resource.setSaveLog(postResource.isSaveLog());

            isResource = true;
        }

        if (!isResource) {
            resource = null;
        }

        return resource;
    }

    /**
     * 忽略敏感属性
     */
    public PropertyPreFilters.MySimplePropertyPreFilter excludePropertyPreFilter() {
        return new PropertyPreFilters().addFilter().addExcludes(EXCLUDE_PROPERTIES);
    }

    /**
     * 参数拼装
     */
    private String argsArrayToString(Object[] paramsArray) {
        String params = "";
        if (paramsArray != null && paramsArray.length > 0) {
            for (int i = 0; i < paramsArray.length; i++) {
                if (ToolUtil.isNotEmpty(paramsArray[i]) && !isFilterObject(paramsArray[i])) {
                    Object jsonObj = JSONObject.toJSONString(paramsArray[i], excludePropertyPreFilter());
                    params += jsonObj.toString() + " ";
                }
            }
        }
        return params.trim();
    }

    /**
     * 判断是否需要过滤的对象。
     *
     * @param o 对象信息。
     * @return 如果是需要过滤的对象，则返回true；否则返回false。
     */
    @SuppressWarnings("rawtypes")
    public boolean isFilterObject(final Object o) {
        Class<?> clazz = o.getClass();
        if (clazz.isArray()) {
            return clazz.getComponentType().isAssignableFrom(MultipartFile.class);
        } else if (Collection.class.isAssignableFrom(clazz)) {
            Collection collection = (Collection) o;
            for (Iterator iter = collection.iterator(); iter.hasNext(); ) {
                return iter.next() instanceof MultipartFile;
            }
        } else if (Map.class.isAssignableFrom(clazz)) {
            Map map = (Map) o;
            for (Iterator iter = map.entrySet().iterator(); iter.hasNext(); ) {
                Map.Entry entry = (Map.Entry) iter.next();
                return entry.getValue() instanceof MultipartFile;
            }
        }
        return o instanceof MultipartFile || o instanceof HttpServletRequest || o instanceof HttpServletResponse
                || o instanceof BindingResult;
    }
}