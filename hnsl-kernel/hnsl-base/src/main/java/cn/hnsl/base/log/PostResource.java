
package cn.hnsl.base.log;

import cn.hnsl.base.dict.AbstractDictMap;
import cn.hnsl.base.dict.SystemDict;
import cn.hnsl.base.enums.BusinessType;
import cn.hnsl.base.enums.OperatorType;
import org.springframework.core.annotation.AliasFor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.annotation.*;

/**
 * 标记需要做业务日志的方法
 *
 * @author fengshuonan
 * @date 2017-03-31 12:46
 */
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
@RequestMapping(method = RequestMethod.POST)
@ResponseBody
public @interface PostResource {

    String name() default "";

    /**
     * 模块
     */
    String modular() default "";

    /**
     * 功能
     */
    BusinessType businessType() default BusinessType.OTHER;

    /**
     * 操作人类别
     */
    OperatorType operatorType() default OperatorType.MANAGE;

    /**
     * 是否保存请求的参数
     */
    boolean isSaveRequestData() default true;

    /**
     * 是否保存日志
     * @return
     */
    boolean isSaveLog() default true;

    /**
     * 是否保存请求的参数
     */
    boolean isSaveChange() default false;

    /**
     * 被修改的实体的唯一标识,例如:菜单实体的唯一标识为"id"
     */
    String key() default "id";

    /**
     * 字典(用于查找key的中文名称和字段的中文名称)
     */
    Class<? extends AbstractDictMap> dict() default SystemDict.class;

    /**
     * 请求路径(同RequestMapping)
     */
    @AliasFor(annotation = RequestMapping.class)
    String[] path() default {};

    /**
     * 请求的http方法(同RequestMapping)
     */
    @AliasFor(annotation = RequestMapping.class)
    RequestMethod[] method() default RequestMethod.POST;

    /**
     * 同RequestMapping
     */
    @AliasFor(annotation = RequestMapping.class)
    String[] produces() default {};
}
