package cn.hnsl.sys.modular.system.service;


import cn.hnsl.core.datascope.DataScope;
import cn.hnsl.sys.modular.system.entity.SysUser;
import cn.hnsl.sys.modular.system.model.SysUserDTO;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;


/**
 * <p>
 * 菜单表 服务实现类
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
public interface SysUserService extends IService<SysUser> {

    /**
     * 添加用戶
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:51
     */
    void addUser(SysUserDTO user);

    /**
     * 修改用户
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:53
     */
    void editUser(SysUserDTO user);

    /**
     * 删除用户
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:54
     */
    void deleteUser(Long userId);

    /**
     * 修改用户状态
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:45
     */
    int setStatus(Long userId, String status);

    /**
     * 修改密码
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:45
     */
    void changePwd(String oldPassword, String newPassword);

    /**
     * 根据条件查询用户列表
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:45
     */
    Page<Map<String, Object>> selectUsers(DataScope dataScope, String name, String beginTime, String endTime, Long deptId);



    Page<Map<String, Object>> selectOutCheckUsers(String name, String beginTime, String endTime, Long deptId,String deptType);


    Page<Map<String, Object>> pickerUsers(DataScope dataScope, String name, Long deptId, String userIds);

    /**
     * 设置用户的角色
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:45
     */
    void setRoles(Long userId, String roleIds);

    /**
     * 通过账号获取用户
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:46
     */
    SysUser getByAccount(String account);


    /**
     * 判断当前登录的用户是否有操作这个用户的权限
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:44
     */
    void assertAuth(Long userId);

    /**
     * 刷新当前登录用户的信息
     *
     * @author fengshuonan
     * @Date 2019/1/19 5:59 PM
     */
    void refreshCurrentUser();

    /**
     * 获取用户的基本信息
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:12
     */
    Map<String, Object> getUserInfo(Long userId);

    /**
     * 获取用户首页信息
     *
     * @author fengshuonan
     * @Date 2019/10/17 16:18
     */
    Map<String, Object> getUserIndexInfo();


    /**
     * 选择办理人
     *
     * @author fengshuonan
     * @Date 2019-08-27 19:07
     */
    IPage listUserAndRoleExpectAdmin(Page pageContext);

    /**
     * 校验手机号码是否唯一
     *
     * @param phone 手机号
     * @return 结果
     */
    boolean checkPhoneUnique(String phone,Long userId);

    /**
     * 根据用户id 判断用户是否存在
     *
     * @param userId 用户id
     * @return 用户信息
     */
    Boolean userExist(Long userId);

    /**
     * 查询全部用户ID(剔除被删除的)
     *
     * @return List<Long> 用户id 集合
     * @author liuhanqing
     * @date 2021/1/4 22:09
     */
    List<Long> queryAllUserIdList();

    /**
     * 根据用户ID获取用户信息
     *
     * @param userId 用户ID
     * @author majianguo
     * @date 2021/1/9 19:00
     */
    SysUserDTO getUserInfoByUserId(Long userId);
}
