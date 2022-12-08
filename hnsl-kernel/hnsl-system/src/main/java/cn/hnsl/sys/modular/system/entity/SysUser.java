package cn.hnsl.sys.modular.system.entity;

import cn.hnsl.sys.core.entity.BaseEntity;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 管理员表
 * </p>
 *
 * @author spot
 * @since 2019-04-01
 */
@Data
@TableName("sys_user")
public class SysUser extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "user_id", type = IdType.ASSIGN_ID)
    private Long userId;

    /**
     * 头像
     */
    @TableField("avatar")
    private String avatar;

    /**
     * 账号
     */
    @TableField("account")
    private String account;

    /**
     * 密码
     */
    @TableField("password")
    private String password;

    /**
     * md5密码盐
     */
    @TableField("salt")
    private String salt;

    /**
     * 名字
     */
    @TableField("name")
    private String name;

    /**
     * 职务
     */
    @TableField("title")
    private String title;

    /**
     * 生日
     */
    @TableField("birthday")
    private Date birthday;

    /**
     * 性别(字典)
     */
    @TableField("sex")
    private String sex;

    /**
     * 电子邮件
     */
    @TableField("email")
    private String email;

    /**
     * 电话
     */
    @TableField("phone")
    private String phone;

    /**
     * 角色id(多个逗号隔开)
     */
    @TableField(exist = false)
    private String roleId;

    /**
     * 部门id(多个逗号隔开)
     */
    @TableField("dept_id")
    private Long deptId;

    /**
     * 所属政区
     */
    @TableField(exist = false)
    private String adCode;

    /**
     * 所属政区级别
     */
    @TableField(exist = false)
    private Integer adGrad;


    /**
     * 状态(字典)
     */
    @TableField("status")
    private String status;


    /**
     * 乐观锁
     */
    @TableField("version")
    private Integer version;



}
