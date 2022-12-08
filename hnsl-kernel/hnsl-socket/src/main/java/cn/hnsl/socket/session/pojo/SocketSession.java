package cn.hnsl.socket.session.pojo;


import cn.hnsl.socket.session.SocketSessionOperatorApi;

/**
 * Socket会话
 *
 * @author majianguo
 * @date 2021/6/1 上午11:28
 */
public class SocketSession<T extends SocketSessionOperatorApi> {

    /**
     * 会话ID，每一个新建的会话都有(目前使用通道ID)
     */
    private String sessionId;

    /**
     * 会话唯一标识
     */
    private String userId;

    /**
     * 该会话监听的消息类型
     */
    private String messageType;

    /**
     * token信息
     */
    private String token;

    /**
     * 连接时间
     */
    private Long connectionTime;

    /**
     * 最后活跃时间
     */
    private Long lastActiveTime;

    /**
     * 操作API
     */
    private T socketOperatorApi;

    /**
     * 自定义数据
     */
    private Object data;

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMessageType() {
        return messageType;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getConnectionTime() {
        return connectionTime;
    }

    public void setConnectionTime(Long connectionTime) {
        this.connectionTime = connectionTime;
    }

    public Long getLastActiveTime() {
        return lastActiveTime;
    }

    public void setLastActiveTime(Long lastActiveTime) {
        this.lastActiveTime = lastActiveTime;
    }

    public T getSocketOperatorApi() {
        return socketOperatorApi;
    }

    public void setSocketOperatorApi(T socketOperatorApi) {
        this.socketOperatorApi = socketOperatorApi;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
