package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.consts.ConstantsContext;
import cn.hnsl.base.enums.BusinessType;
import cn.hnsl.base.log.PostResource;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.sys.core.constant.Const;
import cn.hnsl.sys.core.exception.enums.BizExceptionEnum;
import cn.hnsl.sys.core.log.LogObjectHolder;
import cn.hnsl.sys.core.util.SaltUtil;
import cn.hnsl.sys.modular.system.entity.SysUser;
import cn.hnsl.sys.modular.system.model.SysUserDTO;
import cn.hnsl.sys.modular.system.service.impl.SysUserServiceImpl;
import cn.hnsl.sys.modular.system.warpper.UserWrapper;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.core.datascope.DataScope;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.RequestEmptyException;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.model.response.ResponseData;
import cn.hnsl.model.response.SuccessResponseData;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.hibernate.validator.constraints.Length;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.sql.Wrapper;
import java.util.Map;

/**
 * 系统管理员控制器
 */
@Controller
@RequestMapping("/system/user")
@Validated
@ApiOperation("用户管理")
public class SysUserController extends BaseController {

    private static String PREFIX = "/modular/system/user/";

    @Resource
    private SysUserServiceImpl userService;

    /**
     * 跳转到查看管理员列表的页面
     */
    @GetMapping("")
    @Permission("system:user:view")
    public String indexView() {
        return PREFIX + "user.html";
    }

    /**
     * 跳转到查看用户列表的页面
     */
    @GetMapping("/user_add")
    @Permission("system:user:add")
    public String addView() {
        return PREFIX + "user_add.html";
    }

    /**
     * 跳转到编辑管理员页面
     */
    @GetMapping("/user_edit")
    @Permission("system:user:edit")
    public String editView(@RequestParam Long userId) {
        SysUser sysUser = this.userService.getById(userId);
        LogObjectHolder.me().set(sysUser);
        return PREFIX + "user_edit.html";
    }

    /**
     * 跳转到查看管理员列表的页面
     */
    @GetMapping("/user_sel")
    public String addSelView() {
        return PREFIX + "user_sel.html";
    }

    /**
     * 跳转到角色分配页面
     */
    @RequestMapping("/role_assign")
    @Permission("system:user:setRole")
    public String roleAssignView(@RequestParam Long userId, Model model) {
        model.addAttribute("userId", userId);
        return PREFIX + "user_roleassign.html";
    }

    /**
     * 查看管理员详情
     */
    @RequestMapping("/view/{userId}")
    @ResponseBody
    @ApiOperation(value = "管理员详情", httpMethod = "GET")
    public SysUser infoView(@PathVariable Long userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        this.userService.assertAuth(userId);
        return this.userService.getById(userId);
    }

    /**
     * 查询管理员列表
     */
    @RequestMapping("/list")
    @Permission("system:user:list")
    @ResponseBody
    public Object list(@RequestParam(required = false) String name,
                       @RequestParam(required = false) String timeLimit,
                       @RequestParam(required = false) Long deptId) {

        //拼接查询条件
        String beginTime = "";
        String endTime = "";

        if (ToolUtil.isNotEmpty(timeLimit)) {
            String[] split = timeLimit.split(" - ");
            beginTime = split[0];
            endTime = split[1];
        }

        if (LoginContextHolder.me().isAdmin()) {
            Page<Map<String, Object>> users = userService.selectUsers(null, name, beginTime, endTime, deptId);
            Page wrapped = new UserWrapper(users).wrap();
            return LayuiPageFactory.createPageInfo(wrapped);
        } else {
            DataScope dataScope = new DataScope(LoginContextHolder.me().getDeptDataScope());
            Page<Map<String, Object>> users = userService.selectUsers(dataScope, name, beginTime, endTime, deptId);
            Page wrapped = new UserWrapper(users).wrap();
            return LayuiPageFactory.createPageInfo(wrapped);
        }
    }


    /**
     * 外业核查用户列表
     */
    @RequestMapping("/outCheckList")
    @Permission("system:user:list")
    @ResponseBody
    @ApiOperation(value = "外业核查用户列表", httpMethod = "GET")
    public Object outCheckList(@RequestParam(required = false) String name,
                               @RequestParam(required = false) String timeLimit,
                               @RequestParam(required = false) Long deptId,
                               @RequestParam(required = false) String deptType) {
        //拼接查询条件
        String beginTime = "";
        String endTime = "";

        if (ToolUtil.isNotEmpty(timeLimit)) {
            String[] split = timeLimit.split(" - ");
            beginTime = split[0];
            endTime = split[1];
        }

        Page<Map<String, Object>> users = userService.selectOutCheckUsers(name, beginTime, endTime, deptId, deptType);
        Page wrapped = new UserWrapper(users).wrap();
        return LayuiPageFactory.createPageInfo(wrapped);
    }

    /**
     * 添加用户
     */
    @ApiOperation(value = "添加用户", httpMethod = "POST")
    @PostResource(path = "/add", modular = "系统管理-用户管理-添加用户", businessType = BusinessType.INSERT)
    @Permission("system:user:add")
    public ResponseData add(@Valid SysUserDTO user) {
        this.userService.addUser(user);
        return SUCCESS_TIP;
    }

    /**
     * 修改管理员
     */
    @PostResource(path = "/edit", modular = "系统管理-用户管理-修改用户", businessType = BusinessType.UPDATE)
    @Permission("system:user:edit")
    @ApiOperation(value = "修改用户", httpMethod = "POST")
    public ResponseData edit(@ApiParam(value = "用户参数") SysUserDTO user) {
        this.userService.editUser(user);
        return SUCCESS_TIP;
    }

    /**
     * 删除管理员（逻辑删除）
     */
    @PostResource(path = "/delete", modular = "系统管理-用户管理-删除用户", businessType = BusinessType.DELETE)
    @Permission("system:user:remove")
    @ApiOperation(value = "删除管理员", httpMethod = "POST")
    public ResponseData delete(@RequestParam Long userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        this.userService.deleteUser(userId);
        return SUCCESS_TIP;
    }

    /**
     * 分配角色
     */
    @PostResource(path = "/setRole", modular = "系统管理-用户管理-分配角色", businessType = BusinessType.UPDATE)
    @Permission("system:user:setRole")
    public ResponseData setRole(@RequestParam("userId") Long userId,
                                @RequestParam("roleIds") @NotBlank String roleIds) {
        //不能修改超级管理员
        if (userId.equals(Const.ADMIN_ID)) {
            throw new ServiceException(BizExceptionEnum.CANT_CHANGE_ADMIN);
        }
        this.userService.assertAuth(userId);
        this.userService.setRoles(userId, roleIds);
        return SUCCESS_TIP;
    }


    /**
     * 重置管理员的密码
     */
    @PostResource(path = "/reset", modular = "系统管理-用户管理-重置密码", businessType = BusinessType.UPDATE)
    @Permission("system:user:resetPwd")
    @ApiOperation(value = "重置管理员的密码", httpMethod = "POST")
    public ResponseData reset(@RequestParam Long userId) {
        LogObjectHolder.me().set(this.userService.getById(userId));

        if (ToolUtil.isEmpty(userId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        this.userService.assertAuth(userId);
        SysUser sysUser = this.userService.getById(userId);
        sysUser.setSalt(SaltUtil.getRandomSalt());
        sysUser.setPassword(SaltUtil.md5Encrypt(ConstantsContext.getDefaultPassword(), sysUser.getSalt()));
        this.userService.updateById(sysUser);
        return SUCCESS_TIP;
    }

    /**
     * 获取用户详情
     */
    @RequestMapping("/getUserInfo")
    @ResponseBody
    @ApiOperation(value = "获取用户详情", httpMethod = "GET")
    public SuccessResponseData getUserInfo(@RequestParam Long userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new RequestEmptyException();
        }

        this.userService.assertAuth(userId);
        return new SuccessResponseData(userService.getUserInfo(userId));
    }


    /**
     * 修改当前用户的密码
     */
    @RequestMapping("/changePwd")
    @ResponseBody
    @ApiOperation(value = "修改当前用户的密码", httpMethod = "POST")
    public Object changePwd(@RequestParam("oldPassword") @NotBlank String oldPassword,
                            @RequestParam("newPassword") @Length(min = 6, max = 12) String newPassword) {
        this.userService.changePwd(oldPassword, newPassword);
        return SUCCESS_TIP;
    }


    /**
     * 选择用户
     */
    @RequestMapping("/pickerUser")
    @ResponseBody
    public Object pickerUser(@RequestParam(required = false) String name,
                             @RequestParam(required = false) Long deptId,
                             @RequestParam(required = false) String userIds) {

        if (LoginContextHolder.me().isAdmin()) {
            Page<Map<String, Object>> users = userService.pickerUsers(null, name, deptId, userIds);
            Page wrapped = new UserWrapper(users).wrap();
            return LayuiPageFactory.createPageInfo(wrapped);
        } else {
            DataScope dataScope = new DataScope(LoginContextHolder.me().getDeptDataScope());
            Page<Map<String, Object>> users = userService.pickerUsers(dataScope, name, deptId, userIds);
            Page wrapped = new UserWrapper(users).wrap();
            return LayuiPageFactory.createPageInfo(wrapped);
        }
    }


}
