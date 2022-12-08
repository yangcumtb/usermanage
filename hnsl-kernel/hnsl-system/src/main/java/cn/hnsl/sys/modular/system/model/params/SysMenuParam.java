package cn.hnsl.sys.modular.system.model.params;

import lombok.Data;

@Data
public class SysMenuParam {
    /**
     * 菜单名字
     */
    private String menuName;
    /**
     * 菜单等级
     */
    private String level;
}
