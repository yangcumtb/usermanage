
package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.core.exception.enums.BizExceptionEnum;
import cn.hnsl.sys.core.log.LogObjectHolder;
import cn.hnsl.sys.modular.system.service.SysRoleService;
import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.sys.modular.system.entity.SysRole;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.model.response.ResponseData;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * 角色控制器
 *
 * @author fengshuonan
 * @Date 2017年2月12日21:59:14
 */
@Controller
@RequestMapping("/system/role")
public class SysRoleController extends BaseController {

    private static String PREFIX = "/modular/system/role";


    @Resource
    private SysRoleService roleService;

    /**
     * 跳转到角色列表页面
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:30 PM
     */
    @RequestMapping("")
    @Permission("system:role:view")
    public String indexView() {
        return PREFIX + "/role.html";
    }


    /**
     * 跳转到添加角色
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:30 PM
     */
    @RequestMapping(value = "/role_add")
    @Permission("system:role:add")
    public String roleAddView() {
        return PREFIX + "/role_add.html";
    }

    /**
     * 跳转到修改角色
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:31 PM
     */

    @RequestMapping(value = "/role_edit")
    @Permission("system:role:edit")
    public String roleEditView(@RequestParam Long roleId) {
        if (ToolUtil.isEmpty(roleId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        SysRole role = this.roleService.getById(roleId);
        LogObjectHolder.me().set(role);
        return PREFIX + "/role_edit.html";
    }

    /**
     * 跳转到权限分配
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:31 PM
     */
    @Permission("system:role:assign")
    @RequestMapping(value = "/role_assign/{roleId}")
    public String roleAssignView(@PathVariable("roleId") Long roleId, Model model) {
        if (ToolUtil.isEmpty(roleId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        model.addAttribute("roleId", roleId);
        return PREFIX + "/role_assign.html";
    }

    /**
     * 获取角色列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:31 PM
     */
    @RequestMapping(value = "/list")
    @Permission("system:role:list")
    @ResponseBody
    public Object list(@RequestParam(value = "roleName", required = false) String roleName) {
        Page<Map<String, Object>> roles = this.roleService.list(roleName);
        return LayuiPageFactory.createPageInfo(roles);
    }

    /**
     * 角色新增
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:31 PM
     */
    @RequestMapping(value = "/add")
    @Permission("system:role:add")
    @ResponseBody
    public ResponseData add(SysRole role) {
        this.roleService.addRole(role);
        return SUCCESS_TIP;
    }

    /**
     * 角色修改
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:31 PM
     */
    @RequestMapping(value = "/edit")
    @Permission("system:role:edit")
    @ResponseBody
    public ResponseData edit(SysRole role) {
        this.roleService.editRole(role);
        return SUCCESS_TIP;
    }

    /**
     * 删除角色
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:31 PM
     */
    @RequestMapping(value = "/remove")
    @Permission("system:role:remove")
    @ResponseBody
    public ResponseData remove(@RequestParam Long roleId) {
        this.roleService.delRoleById(roleId);
        return SUCCESS_TIP;
    }


    /**
     * 配置权限
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:31 PM
     */
    @RequestMapping("/setAuthority")
    @Permission("system:role:assign")
    @ResponseBody
    public ResponseData setAuthority(@RequestParam("roleId") Long roleId, @RequestParam("ids") String ids) {
        if (ToolUtil.isOneEmpty(roleId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        this.roleService.setAuthority(roleId, ids);
        return SUCCESS_TIP;
    }

    /**
     * 查看角色
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:31 PM
     */
    @RequestMapping(value = "/view/{roleId}")
    @ResponseBody
    public ResponseData view(@PathVariable Long roleId) {
        if (ToolUtil.isEmpty(roleId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        SysRole role = this.roleService.getById(roleId);

        return ResponseData.success(role);
    }


    @RequestMapping(value = "/roleListByUserId")
    @ResponseBody
    public LayuiPageInfo roleListByUserId(@RequestParam(value = "userId", required = false) Long userId) {

        return this.roleService.roleListByUserId(userId);
    }

    @RequestMapping(value = "/roleTreeByUserId")
    @ResponseBody
    public List<ZTreeNode> roleTreeByUserId(@RequestParam(value = "userId", required = false) Long userId) {

        List<ZTreeNode> tree = this.roleService.roleTreeByUserId(userId);
        tree.add(ZTreeNode.createParent());
        return tree;
    }

}
