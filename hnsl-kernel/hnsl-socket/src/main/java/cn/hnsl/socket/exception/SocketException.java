package cn.hnsl.socket.exception;


import cn.hnsl.model.exception.AbstractExceptionEnum;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.socket.constants.SocketConstants;

/**
 * Socket模块异常
 *
 * @author majianguo
 * @date 2021/6/1 上午11:23
 */
public class SocketException extends ServiceException {

    public SocketException(String errorCode, String userTip) {
        super(errorCode, SocketConstants.SOCKET_MODULE_NAME + userTip);
    }

    public SocketException(AbstractExceptionEnum exception) {
        super(SocketConstants.SOCKET_MODULE_NAME, exception);
    }
}
