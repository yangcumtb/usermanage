package cn.hnsl.sys.modular.system.service.impl;

import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.sys.core.constant.Const;
import cn.hnsl.sys.core.exception.enums.BizExceptionEnum;
import cn.hnsl.sys.modular.system.entity.Relation;
import cn.hnsl.sys.modular.system.entity.SysRole;
import cn.hnsl.sys.modular.system.mapper.RelationMapper;
import cn.hnsl.sys.modular.system.mapper.SysRoleMapper;
import cn.hnsl.sys.modular.system.service.SysRoleService;
import cn.hutool.core.convert.Convert;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 角色表 服务实现类
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
@Service
public class SysRoleServiceImpl extends ServiceImpl<SysRoleMapper, SysRole> implements SysRoleService {

    @Resource
    private SysRoleMapper roleMapper;

    @Resource
    private RelationMapper relationMapper;

    @Resource
    private SysUserServiceImpl userService;


    /**
     * 添加角色
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:40 PM
     */
    public void addRole(SysRole role) {
        role.setRoleId(null);
        this.save(role);
    }

    /**
     * 编辑角色
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:40 PM
     */
    public void editRole(SysRole role) {
        this.updateById(role);
    }

    /**
     * 设置某个角色的权限
     *
     * @param roleId 角色id
     * @param ids    权限的id
     * @date 2017年2月13日 下午8:26:53
     */
    @Transactional(rollbackFor = Exception.class)
    public void setAuthority(Long roleId, String ids) {
        // 删除该角色所有的权限
        this.roleMapper.deleteRelaById(roleId);

        // 添加新的权限
        for (Long id : Convert.toLongArray(ids.split(","))) {
            Relation relation = new Relation();
            relation.setRoleId(roleId);
            relation.setMenuId(id);
            this.relationMapper.insert(relation);
        }

        // 刷新当前用户的权限
        userService.refreshCurrentUser();

    }

    /**
     * 删除角色
     *
     * @author spot
     * @Date 2017/5/5 22:24
     */
    @Transactional(rollbackFor = Exception.class)
    public void delRoleById(Long roleId) {
        if (ToolUtil.isEmpty(roleId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }

        //不能删除超级管理员角色
        if (roleId.equals(Const.ADMIN_ROLE_ID)) {
            throw new ServiceException(BizExceptionEnum.CANT_DELETE_ADMIN);
        }

        //删除角色
        this.roleMapper.deleteById(roleId);

    }

    @Override
    public Page<Map<String, Object>> list(String condition) {

        Page page = LayuiPageFactory.defaultPage();
        return this.baseMapper.list(page, condition);
    }

    @Override
    public LayuiPageInfo roleListByUserId(Long userId) {
        List<Map<String,Object>> list = this.baseMapper.roleListByUserId(userId);

        LayuiPageInfo layuiPageInfo = new LayuiPageInfo();
        layuiPageInfo.setData(list);
        return layuiPageInfo;
    }

    @Override
    public List<ZTreeNode> roleTreeByUserId(Long userId) {
        return this.baseMapper.roleTreeByUserId(userId);
    }

    @Override
    public List<SysRole> getRolesByIds(ArrayList<Long> longs) {
        return null;
    }


}
