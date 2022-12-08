
package cn.hnsl.base.auth.aop;

import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.auth.exception.PermissionException;
import cn.hnsl.base.auth.service.AuthService;
import cn.hnsl.core.util.ToolUtil;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import javax.annotation.Resource;
import org.springframework.core.annotation.Order;

import java.lang.reflect.Method;

/**
 * 权限检查的aop
 *
 * @author fengshuonan
 * @date 2017-07-13 21:05
 */
@Aspect
@Order(200)
public class PermissionAop {

    @Resource
    private AuthService authService;

    @Pointcut(value = "@annotation(cn.hnsl.base.auth.annotion.Permission)")
    private void cutPermission() {

    }

    @Around("cutPermission()")
    public Object doPermission(ProceedingJoinPoint point) throws Throwable {
        MethodSignature ms = (MethodSignature) point.getSignature();
        Method method = ms.getMethod();
        Permission permission = method.getAnnotation(Permission.class);
        String _permission = permission.value();
        if (ToolUtil.isEmpty(_permission)) {

            //检查全体角色
            boolean result = authService.checkAll();
            if (result) {
                return point.proceed();
            } else {
                throw new PermissionException();
            }

        } else {

            //检查指定角色
            boolean result = authService.check(_permission);
            if (result) {
                return point.proceed();
            } else {
                throw new PermissionException();
            }
        }
    }

}
