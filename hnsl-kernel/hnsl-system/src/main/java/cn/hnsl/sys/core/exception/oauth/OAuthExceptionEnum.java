
package cn.hnsl.sys.core.exception.oauth;

import cn.hnsl.model.exception.AbstractExceptionEnum;

/**
 * 第三方登录异常枚举
 *
 * @author fengshuonan
 * @Date 2019/6/9 18:45
 */
public enum OAuthExceptionEnum implements AbstractExceptionEnum {

    OPEN_ID_ALREADY_BIND("500", "当前openId已有人绑定！"),
    OAUTH_RESPONSE_ERROR("400", "oauth server错误");

    OAuthExceptionEnum(String errorCode, String userTip) {
        this.errorCode = errorCode;
        this.userTip = userTip;
    }

    private String errorCode;

    private String userTip;

    @Override
    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    @Override
    public String getUserTip() {
        return userTip;
    }

    public void setUserTip(String userTip) {
        this.userTip = userTip;
    }
}
