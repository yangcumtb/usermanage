package cn.hnsl.sys.modular.system.mapper;

import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.sys.modular.system.entity.SysMenu;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 菜单表 Mapper 接口
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
public interface SysMenuMapper extends BaseMapper<SysMenu> {

    /**
     * 根据用户ID查询菜单
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<SysMenu> selectMenusByUserId(@Param("userId") Long userId);


    /**
     * 查询系统菜单列表
     *
     * @param menu 菜单信息
     * @return 菜单列表
     */
    List<SysMenu> selectMenuListByUserId(SysMenu menu);

    /**
     * 查询系统菜单列表
     *
     * @return 菜单列表
     */
    List<SysMenu> selectAllMenuList(SysMenu menu);

    /**
     * 根据用户ID查询权限
     *
     * @param userId 用户ID
     * @return 权限列表
     */
    List<String> selectPermsByUserId(@Param("userId") Long userId);

    /**
     * 根据角色获取菜单列表
     *
     * @param roleId
     * @return
     */
    List<ZTreeNode> menuTreeListByRoleId(@Param("roleId") Long roleId);
}
