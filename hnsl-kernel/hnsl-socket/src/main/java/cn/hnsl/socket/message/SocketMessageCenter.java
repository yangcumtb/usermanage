package cn.hnsl.socket.message;

import java.util.HashMap;
import java.util.Map;

/**
 * 会话消息中心
 * <p>
 * 维护所有消息类型对应的处理器
 *
 * @author majianguo
 * @date 2021/6/1 下午2:20
 */
public class SocketMessageCenter {

    /**
     * 所有消息监听器维护
     */
    private static Map<String, SocketMsgCallbackInterface> messageListenerMap = new HashMap<>();

    /**
     * 设置消息类型的监听器
     *
     * @param msgType  消息类型
     * @param listener 监听器
     * @author majianguo
     * @date 2021/6/1 下午2:25
     **/
    public static void setMessageListener(String msgType, SocketMsgCallbackInterface listener) {
        messageListenerMap.put(msgType, listener);
    }

    /**
     * 获取消息监听器
     *
     * @param msgType 消息类型
     * @return {@link SocketMsgCallbackInterface}
     * @author majianguo
     * @date 2021/6/1 下午2:26
     **/
    public static SocketMsgCallbackInterface getSocketMsgCallbackInterface(String msgType) {
        return messageListenerMap.get(msgType);
    }
}
