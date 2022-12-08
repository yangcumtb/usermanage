package cn.hnsl.sys.modular.system.service.impl;

import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.consts.ConstantsContext;
import cn.hnsl.base.oauth2.entity.OauthUserInfo;
import cn.hnsl.base.oauth2.service.OauthUserInfoService;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.sys.core.constant.Const;
import cn.hnsl.sys.core.constant.factory.ConstantFactory;
import cn.hnsl.sys.core.constant.state.ManagerStatus;
import cn.hnsl.sys.core.exception.enums.BizExceptionEnum;
import cn.hnsl.sys.core.util.DefaultImages;
import cn.hnsl.sys.core.util.SaltUtil;
import cn.hnsl.sys.modular.system.entity.SysMenu;
import cn.hnsl.sys.modular.system.entity.SysUser;
import cn.hnsl.sys.modular.system.entity.SysUserRole;
import cn.hnsl.sys.modular.system.entity.UserPos;
import cn.hnsl.sys.modular.system.factory.UserFactory;
import cn.hnsl.sys.modular.system.mapper.SysUserRoleMapper;
import cn.hnsl.sys.modular.system.mapper.UserMapper;
import cn.hnsl.sys.modular.system.model.SysUserDTO;
import cn.hnsl.core.datascope.DataScope;
import cn.hnsl.core.util.SpringContextHolder;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.sys.modular.system.service.SysMenuService;
import cn.hnsl.sys.modular.system.service.SysUserService;
import cn.hnsl.sys.modular.system.service.UserPosService;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 管理员表 服务实现类
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
@Service
public class SysUserServiceImpl extends ServiceImpl<UserMapper, SysUser> implements SysUserService {

    @Resource
    private SysMenuService sysMenuService;

    @Resource
    private UserPosService userPosService;

    @Resource
    private SysUserRoleMapper userRoleMapper;

    /**
     * 添加用戶
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:51
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addUser(SysUserDTO user) {

        // 判断账号是否重复
        SysUser theSysUser = this.getByAccount(user.getAccount());

        if (theSysUser != null) {
            throw new ServiceException(BizExceptionEnum.USER_ALREADY_REG);
        }

//        // 校验手机号码是否唯一
//        if (this.checkPhoneUnique(user.getPhone(), user.getUserId())) {
//            throw new ServiceException(BizExceptionEnum.PHONE_ALREADY_REG);
//        }

        // 完善账号信息
        String salt = SaltUtil.getRandomSalt();
        String password = SaltUtil.md5Encrypt(ConstantsContext.getDefaultPassword(), salt);

        SysUser newUser = UserFactory.createUser(user, password, salt);
        this.save(newUser);

        //添加职位关联
        addPosition(user.getPosition(), newUser.getUserId());

        //添加角色关联
        addRole(user.getRoleId(), newUser.getUserId());

    }

    /**
     * 修改用户
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:53
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void editUser(SysUserDTO user) {
        SysUser oldSysUser = this.getById(user.getUserId());

        // 校验手机号码是否唯一
        if (this.checkPhoneUnique(user.getPhone(), user.getUserId())) {
            throw new ServiceException(BizExceptionEnum.PHONE_ALREADY_REG);
        }

        if (LoginContextHolder.me().isAdmin()) {
            this.updateById(UserFactory.editUser(user, oldSysUser));
        } else {
            this.assertAuth(user.getUserId());
            this.updateById(UserFactory.editUser(user, oldSysUser));
        }

        //删除职位关联
        userPosService.remove(new QueryWrapper<UserPos>().eq("user_id", user.getUserId()));

        //添加职位关联
        addPosition(user.getPosition(), user.getUserId());

        //删除角色关联
        userRoleMapper.deleteUserRoleByUserId(user.getUserId());

        //添加橘色关联
        addRole(user.getRoleId(), user.getUserId());


    }

    /**
     * 删除用户
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:54
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteUser(Long userId) {

        //不能删除超级管理员
        if (userId.equals(Const.ADMIN_ID)) {
            throw new ServiceException(BizExceptionEnum.CANT_DELETE_ADMIN);
        }
        this.assertAuth(userId);
        this.setStatus(userId, ManagerStatus.DELETED.getCode());

        //删除对应的oauth2绑定表
        OauthUserInfoService oauthUserInfoService = null;
        try {
            oauthUserInfoService = SpringContextHolder.getBean(OauthUserInfoService.class);
            oauthUserInfoService.remove(new QueryWrapper<OauthUserInfo>().eq("user_id", userId));
        } catch (Exception e) {
            //没有集成oauth2模块，不操作
        }

        //删除职位关联
        userPosService.remove(new QueryWrapper<UserPos>().eq("user_id", userId));
    }

    /**
     * 修改用户状态
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:45
     */
    @Override
    public int setStatus(Long userId, String status) {
        return this.baseMapper.setStatus(userId, status);
    }

    /**
     * 修改密码
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:45
     */
    @Override
    public void changePwd(String oldPassword, String newPassword) {
        Long userId = LoginContextHolder.me().getUserId();
        SysUser sysUser = this.getById(userId);

        String oldMd5 = SaltUtil.md5Encrypt(oldPassword, sysUser.getSalt());

        if (sysUser.getPassword().equals(oldMd5)) {
            String newMd5 = SaltUtil.md5Encrypt(newPassword, sysUser.getSalt());
            sysUser.setPassword(newMd5);
            this.updateById(sysUser);
        } else {
            throw new ServiceException(BizExceptionEnum.OLD_PWD_NOT_RIGHT);
        }
    }

    /**
     * 根据条件查询用户列表
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:45
     */
    @Override
    public Page<Map<String, Object>> selectUsers(DataScope dataScope, String name, String beginTime, String endTime, Long deptId) {
        Page page = LayuiPageFactory.defaultPage();
        return this.baseMapper.selectUsers(page, dataScope, name, beginTime, endTime, deptId);
    }

    /**
     * 查询野外核查用户列表
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:45
     */
    @Override
    public Page<Map<String, Object>> selectOutCheckUsers(String name, String beginTime, String endTime, Long deptId, String deptType) {
        Page page = LayuiPageFactory.defaultPage();
        return this.baseMapper.selectOutCheckUsers(page, name, beginTime, endTime, deptId, deptType);
    }


    @Override
    public Page<Map<String, Object>> pickerUsers(DataScope dataScope, String name, Long deptId, String userIds) {
        if (ToolUtil.isEmpty(userIds)) {
            userIds = "-1";
        }
        Page page = LayuiPageFactory.defaultPage();
        String[] userList = userIds.split(",");
        return this.baseMapper.pickerUsers(page, dataScope, name, deptId, userList);
    }

    /**
     * 设置用户的角色
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:45
     */
    @Override
    public void setRoles(Long userId, String roleIds) {
        //删除角色关联
        userRoleMapper.deleteUserRoleByUserId(userId);

        //添加橘色关联
        addRole(roleIds, userId);
    }

    /**
     * 通过账号获取用户
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:46
     */
    @Override
    public SysUser getByAccount(String account) {
        return this.baseMapper.getByAccount(account);
    }


    /**
     * 判断当前登录的用户是否有操作这个用户的权限
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:44
     */
    @Override
    public void assertAuth(Long userId) {
        if (LoginContextHolder.me().isAdmin()) {
            return;
        }
        List<Long> deptDataScope = LoginContextHolder.me().getDeptDataScope();
        SysUser sysUser = this.getById(userId);
        Long deptId = sysUser.getDeptId();
        if (deptDataScope.contains(deptId)) {
            return;
        } else {
            throw new ServiceException(BizExceptionEnum.NO_PERMITION);
        }
    }

    /**
     * 刷新当前登录用户的信息
     *
     * @author fengshuonan
     * @Date 2019/1/19 5:59 PM
     */
    @Override
    public void refreshCurrentUser() {
        //TODO 刷新
    }

    /**
     * 获取用户的基本信息
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:12
     */
    @Override
    public Map<String, Object> getUserInfo(Long userId) {
        SysUser sysUser = this.getById(userId);
        Map<String, Object> map = UserFactory.removeUnSafeFields(sysUser);

        HashMap<String, Object> hashMap = new HashMap();
        hashMap.putAll(map);
        hashMap.put("deptName", ConstantFactory.me().getDeptName(sysUser.getDeptId()));

        return hashMap;
    }

    /**
     * 获取用户首页信息
     *
     * @author fengshuonan
     * @Date 2019/10/17 16:18
     */
    @Override
    public Map<String, Object> getUserIndexInfo() {

        //获取当前用户角色列表
        LoginUser user = LoginContextHolder.me().getLoginUser();
        List<Long> roleList = user.getRoleList();

        //用户没有角色无法显示首页信息
        if (roleList == null || roleList.size() == 0) {
            return null;
        }

        List<SysMenu> menus = this.sysMenuService.selectMenusByUser(user.getId());

        HashMap<String, Object> result = new HashMap<>();
        result.put("menus", menus);
        result.put("avatar", DefaultImages.defaultAvatarUrl());
        result.put("name", user.getName());
        result.put("userId", user.getId());
        result.put("wsUrl", user.getWsUrl());
        return result;
    }

    /**
     * 添加职位关联
     *
     * @author fengshuonan
     * @Date 2019-06-28 13:35
     */
    private void addPosition(String positions, Long userId) {
        if (ToolUtil.isNotEmpty(positions)) {
            String[] position = positions.split(",");
            for (String item : position) {

                UserPos entity = new UserPos();
                entity.setUserId(userId);
                entity.setPosId(Long.valueOf(item));

                userPosService.save(entity);
            }
        }
    }

    /**
     * 添加角色关联
     *
     * @author fengshuonan
     * @Date 2019-06-28 13:35
     */
    private void addRole(String roles, Long userId) {
        if (ToolUtil.isNotEmpty(roles)) {
            String[] roleIds = roles.split(",");
            for (String item : roleIds) {

                SysUserRole entity = new SysUserRole();
                entity.setUserId(userId);
                entity.setRoleId(Long.valueOf(item));

                userRoleMapper.insert(entity);
            }
        }
    }

    /**
     * 选择办理人
     *
     * @author fengshuonan
     * @Date 2019-08-27 19:07
     */
    @Override
    public IPage listUserAndRoleExpectAdmin(Page pageContext) {
        return baseMapper.listUserAndRoleExpectAdmin(pageContext);
    }

    @Override
    public boolean checkPhoneUnique(String phone, Long userId) {
        SysUser info = this.baseMapper.checkPhoneUnique(phone);
        if (ToolUtil.isNotEmpty(userId)) {
            if (ToolUtil.isNotEmpty(info) && info.getUserId().longValue() != userId.longValue()) {
                return true;
            }
        } else {
            if (ToolUtil.isNotEmpty(info)) {
                return true;
            }
        }

        return false;
    }

    @Override
    public Boolean userExist(Long userId) {

        SysUser sysUser = this.getById(userId);

        if (sysUser == null || sysUser.getUserId() == null) {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }

    @Override
    public List<Long> queryAllUserIdList() {
        return this.baseMapper.queryAllUserIdList();
    }

    public SysUserDTO getUserInfoByUserId(Long userId) {
        SysUser sysUser = this.getById(userId);
        if (ObjectUtil.isNotEmpty(sysUser)) {
            SysUserDTO result = BeanUtil.copyProperties(sysUser, SysUserDTO.class, new String[0]);
            return result;
        } else {
            return null;
        }
    }
}
