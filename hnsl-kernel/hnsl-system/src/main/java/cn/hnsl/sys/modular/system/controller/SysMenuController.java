package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.enums.BusinessType;
import cn.hnsl.base.log.PostResource;
import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.model.response.ResponseData;
import cn.hnsl.sys.core.exception.enums.BizExceptionEnum;
import cn.hnsl.sys.core.log.LogObjectHolder;
import cn.hnsl.sys.modular.system.entity.SysMenu;
import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.model.MenuDto;
import cn.hnsl.sys.modular.system.model.params.SysMenuParam;
import cn.hnsl.sys.modular.system.service.SysMenuService;
import cn.hnsl.sys.modular.system.service.impl.SysUserServiceImpl;
import cn.hnsl.core.base.controller.BaseController;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 菜单控制器
 *
 * @author fengshuonan
 * @Date 2017年2月12日21:59:14
 */
@Controller
@RequestMapping("/system/menu")
public class SysMenuController extends BaseController {

    private static String PREFIX = "/modular/system/menu/";

    @Resource
    private SysMenuService menuService;

    @Resource
    private SysUserServiceImpl userService;

    /**
     * 跳转到菜单列表列表页面
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @RequestMapping("")
    @Permission("system:menu:view")
    public String indexView() {
        return PREFIX + "menu.html";
    }

    @Permission("system:menu:list")
    @RequestMapping("/list")
    @ResponseBody
    public LayuiPageInfo list(SysMenu menu) {
        Long userId = LoginContextHolder.me().getUserId();
        List<SysMenu> menuList = menuService.selectAllMenuList(menu, userId);
        LayuiPageInfo result = new LayuiPageInfo();
        result.setData(menuList);
        return result;
    }

    /**
     * 获取角色的菜单列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:54 PM
     */
    @RequestMapping(value = "/menuTreeListByRoleId/{roleId}")
    @ResponseBody
    public List<ZTreeNode> menuTreeListByRoleId(@PathVariable Long roleId) {
        List<ZTreeNode> zTreeNodes = this.menuService.menuTreeListByRoleId(roleId);
        return zTreeNodes;
    }

    /**
     * 跳转到菜单列表列表页面
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @RequestMapping(value = "/menu_add")
    public String menuAdd() {
        return PREFIX + "menu_add.html";
    }


    /**
     * 新增菜单
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @Permission("system:menu:add")
    @RequestMapping(value = "/add")
    @PostResource(path = "/add", modular = "系统管理-菜单管理-新增菜单", businessType = BusinessType.INSERT)
    @ResponseBody
    public ResponseData add(SysMenu menu) {
        this.menuService.save(menu);
        return SUCCESS_TIP;
    }

    /**
     * 跳转到菜单详情列表页面
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @Permission("system:menu:edit")
    @RequestMapping(value = "/edit")
    @PostResource(path = "/edit", modular = "系统管理-菜单管理-编辑菜单", businessType = BusinessType.UPDATE)
    @ResponseBody
    public ResponseData menuEdit(SysMenu menu) {
        this.menuService.updateById(menu);
        return SUCCESS_TIP;
    }

    /**
     * 跳转到菜单详情列表页面
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */

    @Permission("system:menu:edit")
    @RequestMapping(value = "/menu_edit")
    public String menuEditHtml(@RequestParam Long menuId) {
        if (ToolUtil.isEmpty(menuId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }

        //获取菜单当前信息，记录日志用
        SysMenu menu = this.menuService.getById(menuId);
        LogObjectHolder.me().set(menu);

        return PREFIX + "menu_edit.html";
    }


    /**
     * 删除菜单
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @Permission("system:menu:remove")
    @RequestMapping(value = "/remove")
    @PostResource(path = "/remove", modular = "系统管理-菜单管理-删除菜单", businessType = BusinessType.DELETE)
    @ResponseBody
    public ResponseData menuRemove(SysMenu menu) {
        this.menuService.removeById(menu);
        return SUCCESS_TIP;
    }


    /**
     * 获取菜单信息
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @RequestMapping(value = "/getMenuInfo")
    @ResponseBody
    public ResponseData getMenuInfo(@RequestParam Long menuId) {
        if (ToolUtil.isEmpty(menuId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        SysMenu menu = this.menuService.getById(menuId);
        MenuDto menuDto = new MenuDto();
        BeanUtils.copyProperties(menu, menuDto);

        SysMenu parentMenu = this.menuService.getById(menuDto.getParentId());
        if (null != parentMenu) {
            menuDto.setParentName(parentMenu.getMenuName());
        } else {
            menuDto.setParentName("顶级");
        }

        return ResponseData.success(menuDto);
    }

    /**
     * 获取菜单列表(选择父级菜单用)
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:54 PM
     */
    @RequestMapping(value = "/selectMenuTreeList")
    @ResponseBody
    public List<ZTreeNode> selectMenuTreeList() {
        List<Long> roleList = LoginContextHolder.me().getLoginUser().getRoleList();
        //TODO  FIXME 需要进一步优化逻辑
        List<ZTreeNode> roleTreeList = this.menuService.menuTreeListByRoleId(roleList.get(0));
        roleTreeList.add(ZTreeNode.createParent());
        return roleTreeList;
    }

    @RequestMapping(value = "/search")
    @ResponseBody
    public LayuiPageInfo menusearch(SysMenuParam menu) {
        Long userId = LoginContextHolder.me().getUserId();
        SysMenu sysMenu=new SysMenu();
        sysMenu.setMenuName(menu.getMenuName());
        if (menu.getLevel().equals("目录")){
            sysMenu.setMenuType("M");
        }else if (menu.getLevel().equals("菜单")){
            sysMenu.setMenuType("C");

        }else if (menu.getLevel().equals("按钮") || menu.getLevel().equals("功能") ){
            sysMenu.setMenuType("F");
        }
        List<SysMenu> menuList = menuService.selectAllMenuList(sysMenu, userId);
        LayuiPageInfo result = new LayuiPageInfo();
        result.setData(menuList);
        return result;
    }
}
