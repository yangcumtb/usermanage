package cn.hnsl.sys.core.auth.cache;

import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.consts.ConstantsContext;

/**
 * 会话管理
 *
 * @author fengshuonan
 * @date 2019-09-28-14:43
 */
public interface SessionManager {

    /**
     * 缓存前缀
     */
    String SESSION_PREFIX = "_LOGIN_USER_";

    /**
     * 创建会话
     *
     * @author fengshuonan
     * @Date 2019-09-28 14:50
     */
    void createSession(String token, LoginUser loginUser);

    /**
     * 获取会话
     *
     * @author fengshuonan
     * @Date 2019-09-28 14:50
     */
    LoginUser getSession(String token);

    /**
     * 删除会话
     *
     * @author fengshuonan
     * @Date 2019-09-28 14:50
     */
    void removeSession(String token);

    /**
     * 是否已经登陆
     *
     * @author fengshuonan
     * @Date 2019-09-28 14:56
     */
    boolean haveSession(String token);

    /**
     * 刷新过期时间
     *
     * @author fengshuonan
     * @date 2020/10/12 9:51
     */
    void refreshSession(String token);

}
