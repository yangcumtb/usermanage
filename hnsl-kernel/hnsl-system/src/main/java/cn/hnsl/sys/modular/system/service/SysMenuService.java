package cn.hnsl.sys.modular.system.service;


import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.sys.modular.system.entity.SysMenu;
import cn.hnsl.sys.modular.system.model.params.SysMenuParam;
import com.baomidou.mybatisplus.extension.service.IService;
import java.util.List;
import java.util.Set;

/**
 * <p>
 * 菜单表 服务实现类
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
public interface SysMenuService extends IService<SysMenu> {

    /**
     * 根据用户ID查询菜单
     *
     * @param userId 用户信息
     * @return 菜单列表
     */
    List<SysMenu> selectMenusByUser(Long userId);


    /**
     * 查询系统菜单列表
     *
     * @param menu   菜单信息
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<SysMenu> selectAllMenuList(SysMenu menu, Long userId);

    /**
     * 搜索功能实现函数
     * @param menu
     * @return
     */
    List<SysMenu> searchMenuList(SysMenuParam menu);

    /**
     * 根据用户ID查询权限
     *
     * @param userId 用户ID
     * @return 权限列表
     */
    Set<String> selectPermsByUserId(Long userId);

    /**
     * 根据角色获取菜单树
     * @param roleId  权限ID
     * @return 返回菜单节点树
     */
    List<ZTreeNode> menuTreeListByRoleId(Long roleId);
}
