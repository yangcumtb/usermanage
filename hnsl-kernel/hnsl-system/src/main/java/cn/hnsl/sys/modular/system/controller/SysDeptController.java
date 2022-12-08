package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.enums.BusinessType;
import cn.hnsl.base.log.PostResource;
import cn.hnsl.base.pojo.node.LayuiTreeNode;
import cn.hnsl.base.pojo.node.TreeviewNode;
import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.sys.core.constant.factory.ConstantFactory;
import cn.hnsl.sys.core.log.LogObjectHolder;
import cn.hnsl.sys.modular.system.entity.SysDept;
import cn.hnsl.sys.modular.system.factory.LayuiTreeFactory;
import cn.hnsl.sys.modular.system.model.DeptDto;
import cn.hnsl.sys.modular.system.service.impl.SysDeptServiceImpl;
import cn.hnsl.sys.modular.system.warpper.DeptTreeWrapper;
import cn.hnsl.sys.modular.system.warpper.DeptWrapper;
import cn.hutool.core.bean.BeanUtil;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.core.treebuild.DefaultTreeBuildFactory;
import cn.hnsl.model.response.ResponseData;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * 部门控制器
 */
@Controller
@RequestMapping("/system/dept")
public class SysDeptController extends BaseController {

    private String PREFIX = "/modular/system/dept/";

    @Resource
    private SysDeptServiceImpl deptService;

    /**
     * 跳转到部门管理首页
     */
    @GetMapping("")
    @Permission("system:dept:view")
    public String indexView() {
        return PREFIX + "dept.html";
    }

    /**
     * 跳转到添加部门
     */
    @GetMapping("/add")
    @Permission("system:dept:add")
    public String addView() {
        return PREFIX + "dept_add.html";
    }

    /**
     * 跳转到修改部门
     */
    @GetMapping("/edit")
    @Permission("system:dept:edit")
    public String editView(@RequestParam("deptId") Long deptId) {
        SysDept dept = deptService.getById(deptId);
        LogObjectHolder.me().set(dept);

        return PREFIX + "dept_edit.html";
    }


    /**
     * 获取所有部门列表
     */
    @RequestMapping(value = "/list")
    @Permission("system:dept:list")
    @ResponseBody
    public Object list(@RequestParam(value = "condition", required = false) String condition,
                       @RequestParam(value = "deptId", required = false) Long deptId) {
        Page<Map<String, Object>> list = this.deptService.list(condition, deptId);
        Page<Map<String, Object>> wrap = new DeptWrapper(list).wrap();
        return LayuiPageFactory.createPageInfo(wrap);
    }

    /**
     * 添加部门
     */
    @PostResource(path = "/add", modular = "系统管理-部门管理-添加部门", businessType = BusinessType.INSERT)
    @Permission("system:dept:add")
    public ResponseData add(@Valid SysDept dept) {
        this.deptService.addDept(dept);
        return SUCCESS_TIP;
    }

    /**
     * 修改部门
     */
    @PostResource(path = "/edit", modular = "系统管理-部门管理-修改部门", businessType = BusinessType.UPDATE)
    @Permission("system:dept:edit")
    public ResponseData update(@Valid SysDept dept) {
        deptService.editDept(dept);
        return SUCCESS_TIP;
    }

    /**
     * 部门详情
     */
    @RequestMapping(value = "/detail/{deptId}")
    @ResponseBody
    public Object detail(@PathVariable("deptId") Long deptId) {
        SysDept dept = deptService.getById(deptId);
        DeptDto deptDto = new DeptDto();
        BeanUtil.copyProperties(dept, deptDto);
        deptDto.setPName(ConstantFactory.me().getDeptName(deptDto.getPid()));
        return deptDto;
    }

    /**
     * 删除部门
     */
    @PostResource(path = "/delete", modular = "系统管理-部门管理-删除部门", businessType = BusinessType.DELETE)
    @Permission("system:dept:remove")
    public ResponseData delete(@RequestParam("deptId") Long deptId) {

        deptService.deleteDept(deptId);

        return SUCCESS_TIP;
    }

    /**
     * 获取部门的tree列表，layuiTree格式
     */
    @RequestMapping(value = "/layuiTree")
    @ResponseBody
    public List<LayuiTreeNode> layuiTree(String deptType) {

        List<LayuiTreeNode> list = this.deptService.layuiTree(deptType);
        list.add(LayuiTreeFactory.createRoot());

        DefaultTreeBuildFactory<LayuiTreeNode> treeBuildFactory = new DefaultTreeBuildFactory<>();
        return treeBuildFactory.doTreeBuild(list);
    }

    /**
     * 获取部门的tree列表，ztree格式
     */
    @RequestMapping(value = "/tree")
    @ResponseBody
    public List<ZTreeNode> tree() {
        List<ZTreeNode> tree = this.deptService.tree();
        tree.add(ZTreeNode.createParent());
        return tree;
    }

    /**
     * 获取部门的tree列表，treeview格式
     */
    @RequestMapping(value = "/treeview")
    @ResponseBody
    public List<TreeviewNode> treeview() {
        List<TreeviewNode> treeviewNodes = this.deptService.treeviewNodes();

        //构建树
        DefaultTreeBuildFactory<TreeviewNode> factory = new DefaultTreeBuildFactory<>();
        factory.setRootParentId("0");
        List<TreeviewNode> results = factory.doTreeBuild(treeviewNodes);

        //把子节点为空的设为null
        DeptTreeWrapper.clearNull(results);

        return results;
    }

}
