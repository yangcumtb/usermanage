package cn.hnsl.socket.session;

import cn.hnsl.socket.operator.channel.BizSocketOperator;
import cn.hnsl.socket.session.pojo.SocketSession;
import cn.hutool.core.util.ObjectUtil;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * 会话中心
 * <p>
 * 维护所有的会话
 *
 * @author majianguo
 * @date 2021/6/1 下午1:43
 */
public class SessionCenter {

    /**
     * 所有用户会话维护
     */
    private static ConcurrentMap<String, List<SocketSession<BizSocketOperator>>> socketSessionMap = new ConcurrentHashMap<>();

    /**
     * 获取维护的所有会话
     *
     * @return {@link ConcurrentMap< String, SocketSession<BizSocketOperator>>}
     * @author majianguo
     * @date 2021/6/1 下午2:13
     **/
    public static ConcurrentMap<String, List<SocketSession<BizSocketOperator>>> getSocketSessionMap() {
        return socketSessionMap;
    }

    /**
     * 根据用户ID获取会话信息列表
     *
     * @param userId 用户ID
     * @return {@link SocketSession <BizSocketOperator>}
     * @author majianguo
     * @date 2021/6/1 下午1:48
     **/
    public static List<SocketSession<BizSocketOperator>> getSessionByUserId(String userId) {
        return socketSessionMap.get(userId);
    }

    /**
     * 根据用户ID和消息类型获取会话信息列表
     *
     * @param userId 用户ID
     * @return {@link SocketSession <BizSocketOperator>}
     * @author majianguo
     * @date 2021/6/1 下午1:48
     **/
    public static List<SocketSession<BizSocketOperator>> getSessionByUserIdAndMsgType(String userId) {
        return socketSessionMap.get(userId);
    }

    /**
     * 根据会话ID获取会话信息
     *
     * @param sessionId 会话ID
     * @return {@link SocketSession <BizSocketOperator>}
     * @author majianguo
     * @date 2021/6/1 下午1:48
     **/
    public static SocketSession<BizSocketOperator> getSessionBySessionId(String sessionId) {
        for (List<SocketSession<BizSocketOperator>> values : socketSessionMap.values()) {
            for (SocketSession<BizSocketOperator> session : values) {
                if (sessionId.equals(session.getSessionId())) {
                    return session;
                }
            }
        }
        return null;
    }

    /**
     * 设置会话
     *
     * @param socketSession 会话详情
     * @author majianguo
     * @date 2021/6/1 下午1:49
     **/
    public static void addSocketSession(SocketSession<BizSocketOperator> socketSession) {
        List<SocketSession<BizSocketOperator>> socketSessions = socketSessionMap.get(socketSession.getUserId());
        if (ObjectUtil.isEmpty(socketSessions)) {
            socketSessions = Collections.synchronizedList(new ArrayList<>());
            socketSessionMap.put(socketSession.getUserId(), socketSessions);
        }
        socketSessions.add(socketSession);
    }

    /**
     * 连接关闭
     *
     * @param sessionId 会话ID
     * @author majianguo
     * @date 2021/6/1 下午3:25
     **/
    public static void closed(String sessionId) {
        Set<Map.Entry<String, List<SocketSession<BizSocketOperator>>>> entrySet = socketSessionMap.entrySet();
        Iterator<Map.Entry<String, List<SocketSession<BizSocketOperator>>>> iterator = entrySet.iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, List<SocketSession<BizSocketOperator>>> next = iterator.next();
            List<SocketSession<BizSocketOperator>> value = next.getValue();
            if (ObjectUtil.isNotEmpty(value)) {
                value.removeIf(BizSocketOperatorSocketSession -> BizSocketOperatorSocketSession.getSessionId().equals(sessionId));
            }
        }
    }
}
