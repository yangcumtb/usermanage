
package cn.hnsl.sys.core.cache;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;

import javax.annotation.Resource;

/**
 * 缓存的配置，默认使用基于内存的缓存，如果分布式部署请更换为redis
 *
 * @author xuyuxiang
 * @date 2020/7/9 11:43
 */
@Configuration
public class CacheConfig {

    @Resource
    private RedisTemplate redisTemplate;

    /**
     * 登录用户的缓存，默认过期时间，根据系统sys_config中的常量决定
     *
     * @author spot
     * @date 2020/7/9 11:44
     */
    @Bean
    public UserCache userCache() {
        return new UserCache(redisTemplate);
    }

}
