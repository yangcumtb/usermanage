package cn.hnsl.sys.core.auth.cache.impl;

import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.consts.ConstantsContext;
import cn.hnsl.sys.core.auth.cache.SessionManager;
import cn.hnsl.sys.modular.system.service.OnlineService;
import cn.hnsl.core.util.ToolUtil;
import com.alibaba.fastjson.parser.ParserConfig;

import javax.annotation.Resource;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.concurrent.TimeUnit;

/**
 * 基于redis的会话管理
 *
 * @author fengshuonan
 * @date 2019-09-28-14:43
 */
@Component
public class RedisSessionManager implements SessionManager {

    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    @Resource
    private OnlineService onlineService;

    @Override
    public void createSession(String token, LoginUser loginUser) {
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);


        redisTemplate.opsForValue().set(ConstantsContext.getSystemCode() + SESSION_PREFIX + token, loginUser, 60 * 60 * 4, TimeUnit.SECONDS);

        //保存用户信息
        onlineService.saveOnline(loginUser, token);
    }

    @Override
    public LoginUser getSession(String token) {
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);

        LoginUser loginUser = (LoginUser) redisTemplate.opsForValue().get(ConstantsContext.getSystemCode() + SESSION_PREFIX + token);
        if (ToolUtil.isEmpty(loginUser)) {
            //当token不存在则移除
            onlineService.deleteOnlineById(token);
        }

        return loginUser;
    }

    @Override
    public void removeSession(String token) {
        redisTemplate.delete(ConstantsContext.getSystemCode() + SESSION_PREFIX + token);
        onlineService.deleteOnlineById(token);
    }

    @Override
    public boolean haveSession(String token) {
        Boolean flag = redisTemplate.hasKey(ConstantsContext.getSystemCode() + SESSION_PREFIX + token);
        if (flag == null) {
            return false;
        } else {
            return redisTemplate.hasKey(ConstantsContext.getSystemCode() + SESSION_PREFIX + token);
        }
    }

    /**
     * 刷新过期时间
     *
     * @param token
     * @author fengshuonan
     * @date 2020/10/12 9:51
     */
    @Override
    public void refreshSession(String token) {
        if (redisTemplate.boundValueOps(ConstantsContext.getSystemCode() + SESSION_PREFIX + token).getExpire() < 300) {
            redisTemplate.boundValueOps(ConstantsContext.getSystemCode() + SESSION_PREFIX + token).expire(ConstantsContext.getSessionExpireSeconds(), TimeUnit.SECONDS);
            LoginUser loginUser = (LoginUser) redisTemplate.opsForValue().get(ConstantsContext.getSystemCode() + SESSION_PREFIX + token);

            if (ToolUtil.isNotEmpty(loginUser)) {
                //保存用户信息
                onlineService.updateOnline(token);
            } else {
                //当token不存在则移除
                onlineService.deleteOnlineById(token);
            }
        }

    }


}
