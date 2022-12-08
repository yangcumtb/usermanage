package cn.hnsl.socket.exception.enums;

import cn.hnsl.model.exception.AbstractExceptionEnum;
import cn.hnsl.socket.constants.SocketConstants;

/**
 * Socket模块相关异常枚举
 *
 * @author majianguo
 * @date 2021/6/1 上午11:25
 */

public enum SocketExceptionEnum implements AbstractExceptionEnum {

    /**
     * Socket操作异常
     */
    SOCKET_ERROR( SocketConstants.SOCKET_ERROR, "操作异常，具体信息为：{}"),

    /**
     * 会话不存在
     */
    SESSION_NOT_EXIST( SocketConstants.SESSION_NOT_EXIST, "会话不存在");

    /**
     * 错误编码
     */
    private String errorCode;

    /**
     * 提示用户信息
     */
    private String userTip;

    SocketExceptionEnum(String errorCode, String userTip) {
        this.errorCode = errorCode;
        this.userTip = userTip;
    }

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
