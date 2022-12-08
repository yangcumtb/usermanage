package cn.hnsl.sys.modular.system.mapper;

import cn.hnsl.sys.modular.system.entity.SysUser;
import cn.hnsl.core.datascope.DataScope;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 管理员表 Mapper 接口
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
public interface UserMapper extends BaseMapper<SysUser> {

    /**
     * 修改用户状态
     */
    int setStatus(@Param("userId") Long userId, @Param("status") String status);

    /**
     * 修改密码
     */
    int changePwd(@Param("userId") Long userId, @Param("pwd") String pwd);

    /**
     * 根据条件查询用户列表
     */
    Page<Map<String, Object>> selectUsers(@Param("page") Page page,
                                          @Param("dataScope") DataScope dataScope,
                                          @Param("name") String name,
                                          @Param("beginTime") String beginTime,
                                          @Param("endTime") String endTime,
                                          @Param("deptId") Long deptId);

    /**
     * 根据条件查询业外和差用户列表
     */
    Page<Map<String, Object>> selectOutCheckUsers(@Param("page") Page page,
                                          @Param("name") String name,
                                          @Param("beginTime") String beginTime,
                                          @Param("endTime") String endTime,
                                          @Param("deptId") Long deptId,
                                          @Param("deptType") String deptType);

    /**
     * 根据条件查询用户列表
     */
    Page<Map<String, Object>> pickerUsers(@Param("page") Page page,
                                          @Param("dataScope") DataScope dataScope,
                                          @Param("name") String name,
                                          @Param("deptId") Long deptId,
                                          @Param("userList") String[] userList);

    /**
     * 根据条件查询用户列表（根据角色）
     */
    Page<Map<String, Object>> selectUsersByRole(@Param("page") Page page,
                                                @Param("name") String name,
                                                @Param("beginTime") String beginTime,
                                                @Param("endTime") String endTime,
                                                @Param("roleId") String roleId);

    /**
     * 设置用户的角色
     */
    int setRoles(@Param("userId") Long userId, @Param("roleIds") String roleIds);

    /**
     * 通过账号获取用户
     */
    SysUser getByAccount(@Param("account") String account);

    /**
     * 选择办理人
     */
    IPage<Map<String, Object>> listUserAndRoleExpectAdmin(Page page);

    /**
     * 校验手机号码是否唯一
     *
     * @param phone 手机号码
     * @return 结果
     */
    SysUser checkPhoneUnique(String phone);

    List<Long> queryAllUserIdList();
}
