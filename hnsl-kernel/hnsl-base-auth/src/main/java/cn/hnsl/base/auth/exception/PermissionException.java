package cn.hnsl.base.auth.exception;

import cn.hnsl.model.exception.AbstractExceptionEnum;
import lombok.Data;

import static cn.hnsl.base.auth.exception.enums.AuthExceptionEnum.NO_PERMISSION;

/**
 * 没有访问权限
 *
 * @author fengshuonan
 * @Date 2019/7/18 22:18
 */
@Data
public class PermissionException extends RuntimeException {

    private String code;
    private String errorMessage;

    public PermissionException() {
        super(NO_PERMISSION.getUserTip());
        this.code = NO_PERMISSION.getErrorCode();
        this.errorMessage = NO_PERMISSION.getUserTip();
    }

    public PermissionException(AbstractExceptionEnum exception) {
        super(exception.getUserTip());
        this.code = exception.getErrorCode();
        this.errorMessage = exception.getUserTip();
    }

}
