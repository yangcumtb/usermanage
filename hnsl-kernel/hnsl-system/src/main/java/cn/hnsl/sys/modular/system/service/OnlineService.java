package cn.hnsl.sys.modular.system.service;

import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.entity.SysUserOnline;
import cn.hnsl.sys.modular.system.model.params.SysUserOnlineParam;
import cn.hnsl.sys.modular.system.model.result.SysUserOnlineResult;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 在线用户记录 服务类
 * </p>
 *
 * @author spt
 * @since 2020-09-21
 */
public interface OnlineService extends IService<SysUserOnline> {

    /**
     * 新增
     *
     * @author spt
     * @Date 2020-09-21
     */
    void add(SysUserOnlineParam param);

    /**
     * 删除
     *
     * @author spt
     * @Date 2020-09-21
     */
    void delete(SysUserOnlineParam param);

    /**
     * 更新
     *
     * @author spt
     * @Date 2020-09-21
     */
    void update(SysUserOnlineParam param);

    /**
     * 查询单条数据，Specification模式
     *
     * @author spt
     * @Date 2020-09-21
     */
    SysUserOnlineResult findBySpec(SysUserOnlineParam param);

    /**
     * 查询列表，Specification模式
     *
     * @author spt
     * @Date 2020-09-21
     */
    List<SysUserOnlineResult> findListBySpec(SysUserOnlineParam param);

    /**
     * 查询分页数据，Specification模式
     *
     * @author spt
     * @Date 2020-09-21
     */
    LayuiPageInfo findPageBySpec(SysUserOnlineParam param);


    /**
     * 系统在线用户强退
     *
     * @author xuyuxiang
     * @date 2020/4/7 20:20
     */
    void forceExist(String sessionId);

    /**
     * 创建在线用户信息
     *
     * @param loginUser
     * @param token
     */
    void saveOnline(LoginUser loginUser, String token);

    /**
     * 更新在线用户信息
     *
     * @param token
     */
    void updateOnline(String token);

    /**
     * 通过会话序号删除信息
     *
     * @param sessionId 会话ID
     * @return 在线用户信息
     */
    void deleteOnlineById(String sessionId);

    /**
     * 通过会话序号删除信息
     *
     * @param sessions 会话ID集合
     * @return 在线用户信息
     */
    void batchDeleteOnline(List<String> sessions);
}
