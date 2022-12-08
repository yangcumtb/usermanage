
package cn.hnsl.sys.core.cache;


import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.consts.ConstantsContext;
import org.springframework.data.redis.core.RedisTemplate;

/**
 * 登录用户的缓存，存储了当前登录的用户
 * <p>
 * 一般用于在线用户的查看和过滤器检测用户是否登录
 * <p>
 * key为用户的唯一id，value为LoginUser对象
 *
 * @author spot
 * @date 2020/7/9 11:02
 */

public class UserCache extends AbstractRedisCacheOperator<LoginUser> {

    /**
     * 登录用户缓存前缀
     */
    public static final String LOGIN_USER_CACHE_PREFIX = "SOIL_LOGIN_USER_";

    public UserCache(RedisTemplate<String, LoginUser> redisTemplate) {
        super(redisTemplate);
    }


    /**
     * 通用缓存的前缀，用于区分不同业务
     * <p>
     * 如果带了前缀，所有的缓存在添加的时候，key都会带上这个前缀
     *
     * @return 缓存前缀
     * @author spot
     * @date 2020/7/9 11:06
     */
    @Override
    public String getCommonKeyPrefix() {
        return LOGIN_USER_CACHE_PREFIX;
    }
}
