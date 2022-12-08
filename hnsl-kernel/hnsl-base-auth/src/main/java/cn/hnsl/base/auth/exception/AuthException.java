package cn.hnsl.base.auth.exception;

import cn.hnsl.model.exception.AbstractExceptionEnum;
import lombok.Data;

/**
 * 认证失败（账号密码错误，账号被冻结，token过期等）
 *
 * @author fengshuonan
 * @Date 2019/7/18 22:18
 */
@Data
public class AuthException extends RuntimeException {

    private String errorCode;

    private String userTip;

    public AuthException() {
        super("认证失败！");
        this.errorCode = "500";
        this.userTip = "认证失败！";
    }

    public AuthException(AbstractExceptionEnum exception) {
        super(exception.getUserTip());
        this.errorCode = exception.getErrorCode();
        this.userTip = exception.getUserTip();
    }

}
