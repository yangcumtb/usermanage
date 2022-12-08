
package cn.hnsl.base.log;

import cn.hnsl.base.dict.AbstractDictMap;
import cn.hnsl.base.enums.BusinessType;
import cn.hnsl.base.enums.OperatorType;
import lombok.Data;

/**
 * 标记需要做业务日志的方法
 *
 * @author fengshuonan
 * @date 2017-03-31 12:46
 */
@Data
public class BaseResource {

    /**
     * 模块
     */
    String modular;

    /**
     * 功能
     */
    BusinessType businessType;

    /**
     * 操作人类别
     */
    OperatorType operatorType;

    /**
     * 是否保存请求的参数
     */
    boolean isSaveRequestData;

    /**
     *
     */
    boolean isSaveLog;

    /**
     * 是否保存请求的参数
     */
    boolean isSaveChange;

    /**
     * 被修改的实体的唯一标识,例如:菜单实体的唯一标识为"id"
     */
    String key;

    /**
     * 字典(用于查找key的中文名称和字段的中文名称)
     */
    Class<? extends AbstractDictMap> dict;
}
