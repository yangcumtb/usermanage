
package cn.hnsl.sys.modular.message.core.exception;


import cn.hnsl.model.exception.AbstractExceptionEnum;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.sys.modular.message.core.constants.MessageApiConstants;
import cn.hutool.core.util.StrUtil;

/**
 * 消息异常枚举
 *
 * @author liuhanqing
 * @date 2021/1/1 20:55
 */
public class MessageException extends ServiceException {

    public MessageException(AbstractExceptionEnum exception, Object... params) {
        super(exception.getErrorCode(), MessageApiConstants.MESSAGE_MODULE_NAME + StrUtil.format(exception.getUserTip(), params));
    }

    public MessageException(AbstractExceptionEnum exception) {
        super(exception.getErrorCode(), MessageApiConstants.MESSAGE_MODULE_NAME + exception.getUserTip());
    }

}
