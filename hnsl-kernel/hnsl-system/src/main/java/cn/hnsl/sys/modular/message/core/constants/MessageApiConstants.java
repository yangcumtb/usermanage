
package cn.hnsl.sys.modular.message.core.constants;

/**
 * message模块的常量
 *
 * @author liuhanqing
 * @date 2021/1/1 20:58
 */
public interface MessageApiConstants {

    /**
     * 消息模块的名称
     */
    String MESSAGE_MODULE_NAME = "hnsl-message";

    /**
     * 异常枚举的步进值
     */
    String MESSAGE_EXCEPTION_STEP_CODE = "23";

    /**
     * 发送所有用户标识
     */
    String RECEIVE_ALL_USER_FLAG = "all";

    /**
     * 默认websocket-url
     */
    String DEFAULT_WS_URL = "ws://localhost:8080/webSocket/{token}";

}
