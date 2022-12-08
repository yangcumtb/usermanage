package cn.hnsl.sys.modular.system.service;



import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.entity.SysRole;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.ArrayList;
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
public interface SysRoleService extends IService<SysRole> {

    /**
     * 添加角色
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:40 PM
     */
     void addRole(SysRole role);

    /**
     * 编辑角色
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:40 PM
     */
     void editRole(SysRole role);

    /**
     * 设置某个角色的权限
     *
     * @param roleId 角色id
     * @param ids    权限的id
     * @date 2017年2月13日 下午8:26:53
     */

     void setAuthority(Long roleId, String ids);

    /**
     * 删除角色
     *
     * @author spot
     * @Date 2017/5/5 22:24
     */
     void delRoleById(Long roleId) ;

    /**
     * 根据条件查询角色列表
     *
     * @return
     * @date 2017年2月12日 下午9:14:34
     */
     Page<Map<String, Object>> list(String condition);


    /**
     * 根据用户获取角色列表
     * @param userId
     * @return
     */
    LayuiPageInfo roleListByUserId(Long userId);

    /**
     * 角色树
     * @param userId
     * @return
     */
    List<ZTreeNode> roleTreeByUserId(Long userId);

    List<SysRole> getRolesByIds(ArrayList<Long> longs);
}
