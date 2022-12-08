package cn.hnsl.sys.core.exception.oauth;

import cn.hnsl.model.exception.AbstractExceptionEnum;
import cn.hnsl.model.exception.ServiceException;

/**
 * 第三方登录异常
 *
 * @author fengshuonan
 * @Date 2019/6/9 18:43
 */
public class OAuthLoginException extends ServiceException {

    public OAuthLoginException(AbstractExceptionEnum exception) {
        super(exception);
    }

}
