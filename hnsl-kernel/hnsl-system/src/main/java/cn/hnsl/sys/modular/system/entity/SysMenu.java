package cn.hnsl.sys.modular.system.entity;

import cn.hnsl.sys.core.entity.BaseEntity;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * <p>
 * 菜单表
 * </p>
 *
 * @author spot
 * @since 2019-04-01
 */
@TableName("sys_menu")
@Data
public class SysMenu extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "menu_id", type = IdType.AUTO)
    private Long menuId;

    /**
     * 菜单名称
     */
    @TableField("menu_name")
    private String menuName;

    /**
     * 模块代码
     */
    @TableField("app_code")
    private String appCode;

    /**
     * 父菜单名称
     */
    @TableField(exist = false)
    private String parentName;

    /**
     * 父菜单ID
     */
    @TableField("parent_id")
    private Long parentId;

    /**
     * 显示顺序
     */
    @TableField("order_num")
    private String orderNum;

    /**
     * 菜单URL
     */
    @TableField("url")
    private String url;

    /**
     * 打开方式（menuItem页签 menuBlank新窗口）
     */
    @TableField("target")
    private String target;

    /**
     * 类型（M目录 C菜单 F按钮）
     */
    @TableField("menu_type")
    private String menuType;

    /**
     * 菜单状态（0显示 1隐藏）
     */
    @TableField("visible")
    private String visible;

    /**
     * 是否刷新（0刷新 1不刷新）
     */
    @TableField("is_refresh")
    private String isRefresh;

    /**
     * 权限字符串
     */
    @TableField("perms")
    private String perms;

    /**
     * 菜单图标
     */
    @TableField("icon")
    private String icon;


    /**
     * 子菜单
     */
    @TableField(exist = false)
    private List<SysMenu> children = new ArrayList<>();


}
