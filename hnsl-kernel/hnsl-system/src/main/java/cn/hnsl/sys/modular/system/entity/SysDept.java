package cn.hnsl.sys.modular.system.entity;

import cn.hnsl.sys.core.entity.BaseEntity;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 部门表
 * </p>
 *
 * @author spot
 * @since 2019-04-01
 */
@Data
@TableName("sys_dept")
public class SysDept  extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "dept_id", type = IdType.ASSIGN_ID)
    private Long deptId;

    /**
     * 所属政区编码
     */
    @TableField("ad_code")
    private String adCode;

    /**
     * 部门类型
     */
    @TableField("dept_type")
    private String deptType;

    /**
     * 父部门id
     */
    @TableField("pid")
    @NotNull
    private Long pid;

    /**
     * 父级ids
     */
    @TableField("pids")
    private String pids;

    /**
     * 简称
     */
    @TableField("simple_name")
    @NotBlank
    private String simpleName;

    /**
     * 全称
     */
    @TableField("full_name")
    @NotBlank
    private String fullName;

    /**
     * 是否为叶子节点
     */
    @TableField("is_leaf")
    private String isLeaf;

    /**
     * 描述
     */
    @TableField("description")
    private String description;


    /**
     * 版本（乐观锁保留字段）
     */
    @TableField("version")
    private Integer version;

    /**
     * 排序
     */
    @TableField("sort")
    private Integer sort;
}
