package cn.hnsl.sys.modular.system.service.impl;

import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.core.cache.UserCache;
import cn.hnsl.sys.modular.system.entity.SysUserOnline;
import cn.hnsl.sys.modular.system.mapper.OnlineMapper;
import cn.hnsl.sys.modular.system.model.params.SysUserOnlineParam;
import cn.hnsl.sys.modular.system.model.result.SysUserOnlineResult;
import cn.hnsl.sys.modular.system.service.OnlineService;
import cn.hutool.core.util.ObjectUtil;
import cn.hnsl.core.util.ToolUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * <p>
 * 在线用户记录 服务实现类
 * </p>
 *
 * @author spt
 * @since 2020-09-21
 */
@Service
public class OnlineServiceImpl extends ServiceImpl<OnlineMapper, SysUserOnline> implements OnlineService {

    @Resource
    private UserCache userCache;

    @Override
    public void add(SysUserOnlineParam param) {
        SysUserOnline entity = getEntity(param);
        this.save(entity);
    }

    @Override
    public void delete(SysUserOnlineParam param) {
        this.removeById(getKey(param));
    }

    @Override
    public void update(SysUserOnlineParam param) {
        SysUserOnline oldEntity = getOldEntity(param);
        SysUserOnline newEntity = getEntity(param);
        ToolUtil.copyProperties(newEntity, oldEntity);
        this.updateById(oldEntity);
    }

    @Override
    public SysUserOnlineResult findBySpec(SysUserOnlineParam param) {
        return null;
    }

    @Override
    public List<SysUserOnlineResult> findListBySpec(SysUserOnlineParam param) {
        return null;
    }

    @Override
    public LayuiPageInfo findPageBySpec(SysUserOnlineParam param) {
        Page pageContext = getPageContext();
        IPage page = this.baseMapper.customPageList(pageContext, param);
        return LayuiPageFactory.createPageInfo(page);
    }

    /**
     * 系统在线用户强退
     *
     * @param sessionId
     * @author xuyuxiang
     * @date 2020/4/7 20:20
     */
    @Override
    public void forceExist(String sessionId) {
        //获取缓存的key
        String redisLoginUserKey = sessionId;

        //获取缓存的用户
        LoginUser sysLoginUser = userCache.get(redisLoginUserKey);

        //如果缓存的用户存在，清除会话，否则表示该会话信息已失效，不执行任何操作
        if (ObjectUtil.isNotNull(sysLoginUser)) {
            //清除登录会话
            userCache.remove(redisLoginUserKey);

        }

        this.removeById(sessionId);
    }

    /**
     * @param loginUser
     * @param token
     */
    @Override
    public void saveOnline(LoginUser loginUser, String token) {

        this.baseMapper.removeByAccount(loginUser.getAccount());

        SysUserOnlineParam param = new SysUserOnlineParam();
        param.setDeptName(loginUser.getDeptName());
        param.setIpaddr(loginUser.getLastLoginIp());
        param.setStartTimestamp(new Date());
        param.setLastAccessTime(new Date());
        param.setLoginLocation(loginUser.getLastLoginAddress());
        param.setSessionId(token);
        param.setLoginName(loginUser.getAccount());

        this.add(param);
    }

    /**
     * 通过会话序号删除信息
     *
     * @param sessionId 会话ID
     * @return 在线用户信息
     */
    @Override
    public void deleteOnlineById(String sessionId) {
        this.removeById(sessionId);
    }

    /**
     * 通过会话序号删除信息
     *
     * @param sessions 会话ID集合
     * @return 在线用户信息
     */
    @Override
    public void batchDeleteOnline(List<String> sessions) {
        this.removeByIds(sessions);
    }

    /**
     * 更新在线用户信息
     *
     * @param token
     */
    @Override
    public void updateOnline(String token) {
        SysUserOnline online = this.getById(token);
        if (ToolUtil.isNotEmpty(online)) {
            online.setLastAccessTime(new Date());
            this.updateById(online);
        }

    }

    private Serializable getKey(SysUserOnlineParam param) {
        return param.getSessionId();
    }

    private Page getPageContext() {
        return LayuiPageFactory.defaultPage();
    }

    private SysUserOnline getOldEntity(SysUserOnlineParam param) {
        return this.getById(getKey(param));
    }

    private SysUserOnline getEntity(SysUserOnlineParam param) {
        SysUserOnline entity = new SysUserOnline();
        ToolUtil.copyProperties(param, entity);
        return entity;
    }

}
