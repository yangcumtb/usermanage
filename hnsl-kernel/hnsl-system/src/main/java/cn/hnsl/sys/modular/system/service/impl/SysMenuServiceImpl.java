package cn.hnsl.sys.modular.system.service.impl;


import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.sys.modular.system.entity.SysMenu;
import cn.hnsl.sys.modular.system.entity.SysUser;
import cn.hnsl.sys.modular.system.mapper.SysMenuMapper;
import cn.hnsl.sys.modular.system.model.params.SysMenuParam;
import cn.hnsl.sys.modular.system.service.SysMenuService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

/**
 * <p>
 * 菜单表 服务实现类
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
@Service
public class SysMenuServiceImpl extends ServiceImpl<SysMenuMapper, SysMenu> implements SysMenuService {

    @Resource
    private SysMenuMapper menuMapper;

    @Override
    public List<SysMenu> selectMenusByUser(Long userId) {
        List<SysMenu> menus = menuMapper.selectMenusByUserId(userId);
        return getChildPerms(menus, 0);
    }

    @Override
    public List<SysMenu> selectAllMenuList(SysMenu menu, Long userId) {
        if (LoginContextHolder.me().isAdmin()) {
            List<SysMenu> menuList = menuMapper.selectAllMenuList(menu);
            return menuList;
        } else {
            menu.getParams().put("userId", userId);
            List<SysMenu> menuList = menuMapper.selectMenuListByUserId(menu);
            return menuList;
        }

    }

    @Override
    public List<SysMenu> searchMenuList(SysMenuParam menu){
        return null;
    }


    /**
     * 根据用户ID查询权限
     *
     * @param userId 用户ID
     * @return 权限列表
     */
    @Override
    public Set<String> selectPermsByUserId(Long userId) {
        List<String> perms = menuMapper.selectPermsByUserId(userId);
        Set<String> permsSet = new HashSet<>();
        for (String perm : perms) {
            if (ToolUtil.isNotEmpty(perm)) {
                permsSet.addAll(Arrays.asList(perm.trim().split(",")));
            }
        }
        return permsSet;
    }

    @Override
    public List<ZTreeNode> menuTreeListByRoleId(Long roleId) {
        return this.baseMapper.menuTreeListByRoleId(roleId);
    }


    /**
     * 根据父节点的ID获取所有子节点
     *
     * @param list     分类表
     * @param parentId 传入的父节点ID
     * @return String
     */
    public List<SysMenu> getChildPerms(List<SysMenu> list, int parentId) {
        List<SysMenu> returnList = new ArrayList<SysMenu>();
        for (Iterator<SysMenu> iterator = list.iterator(); iterator.hasNext(); ) {
            SysMenu t = (SysMenu) iterator.next();
            // 一、根据传入的某个父节点ID,遍历该父节点的所有子节点
            if (t.getParentId() == parentId) {
                recursionFn(list, t);
                returnList.add(t);
            }
        }
        return returnList;
    }

    /**
     * 递归列表
     *
     * @param list
     * @param t
     */
    private void recursionFn(List<SysMenu> list, SysMenu t) {
        // 得到子节点列表
        List<SysMenu> childList = getChildList(list, t);
        t.setChildren(childList);
        for (SysMenu tChild : childList) {
            if (hasChild(list, tChild)) {
                recursionFn(list, tChild);
            }
        }
    }

    /**
     * 得到子节点列表
     */
    private List<SysMenu> getChildList(List<SysMenu> list, SysMenu t) {
        List<SysMenu> tlist = new ArrayList<SysMenu>();
        Iterator<SysMenu> it = list.iterator();
        while (it.hasNext()) {
            SysMenu n = (SysMenu) it.next();
            if (n.getParentId().longValue() == t.getMenuId().longValue()) {
                tlist.add(n);
            }
        }
        return tlist;
    }

    /**
     * 判断是否有子节点
     */
    private boolean hasChild(List<SysMenu> list, SysMenu t) {
        return getChildList(list, t).size() > 0 ? true : false;
    }
}
