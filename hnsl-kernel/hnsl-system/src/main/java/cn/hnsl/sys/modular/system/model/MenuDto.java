package cn.hnsl.sys.modular.system.model;

import cn.hnsl.sys.modular.system.entity.SysMenu;
import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * 菜单返回前端实体类
 * </p>
 *
 * @author lh
 * @since 2021-10-05
 */
@Data
public class MenuDto extends SysMenu implements Serializable {

    private static final long serialVersionUID = 1L;

    private String parentName;

}
