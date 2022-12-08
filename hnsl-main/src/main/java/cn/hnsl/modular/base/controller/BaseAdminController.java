package cn.hnsl.modular.base.controller;

import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.enums.BusinessType;
import cn.hnsl.base.log.GetResource;
import cn.hnsl.base.log.PostResource;
import cn.hnsl.base.pojo.node.LayuiTreeNode;
import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.response.ResponseData;
import cn.hnsl.modular.base.entity.BaseAdmin;
import cn.hnsl.modular.base.model.params.BaseAdminParam;
import cn.hnsl.modular.base.service.BaseAdminService;

import javax.annotation.Resource;

import cn.hnsl.sys.core.log.LogObjectHolder;
import cn.hnsl.sys.modular.system.entity.SysUser;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * 行政区划控制器
 *
 * @author spt
 * @Date 2020-07-03 11:25:36
 */
@Controller
@RequestMapping("/base/baseAdmin")
public class BaseAdminController extends BaseController {

    private String PREFIX = "/modular/base/baseAdmin";

    @Resource
    private BaseAdminService baseAdminService;

    /**
     * 跳转到主页面
     *
     * @author spt
     * @Date 2020-07-03
     */
    @GetMapping("")
    @Permission("base:admin:view")
    public String indexView() {
        return PREFIX + "/baseAdmin.html";
    }

    /**
     * 新增页面
     *
     * @author spt
     * @Date 2020-07-03
     */
    @GetMapping("/add")
    @Permission("base:admin:add")
    public String addView() {
        return PREFIX + "/baseAdmin_add.html";
    }

    /**
     * 编辑页面
     *
     * @author spt
     * @Date 2020-07-03
     */
    @RequestMapping("/edit")
    @Permission("base:admin:edit")
    public String editView() {
        return PREFIX + "/baseAdmin_edit.html";
    }

    /**
     * 新增接口
     *
     * @author spt
     * @Date 2020-07-03
     */
    @PostResource(path = "/add", modular = "基础信息-区划管理-增加区划", businessType = BusinessType.INSERT)
    @ApiOperation(value="基础信息-区划管理-增加区划",httpMethod = "POST")
    @Permission("base:admin:add")
    public ResponseData addItem(BaseAdminParam baseAdminParam) {
        baseAdminParam.setHasDept("0");
        this.baseAdminService.add(baseAdminParam);
        return ResponseData.success();
    }

    /**
     * 编辑接口
     *
     * @author spt
     * @Date 2020-07-03
     */
    @PostResource(path = "/edit", modular = "基础信息-区划管理-编辑区划", businessType = BusinessType.UPDATE, isSaveChange = true, key = "adCode")
    @ApiOperation(value="基础信息-区划管理-编辑区划",httpMethod = "POST")
    @Permission("base:admin:edit")
    public ResponseData editItem(BaseAdminParam baseAdminParam) {
        //记录修改前对象
        BaseAdmin baseAdmin = this.baseAdminService.getById(baseAdminParam.getAdCode());
        LogObjectHolder.me().set(baseAdmin);

        this.baseAdminService.update(baseAdminParam);
        return ResponseData.success();
    }

    /**
     * 删除接口
     *
     * @author spt
     * @Date 2020-07-03
     */
    @PostResource(path = "/delete", modular = "基础信息-区划管理-删除区划", businessType = BusinessType.DELETE)
    @ApiOperation(value="基础信息-区划管理-删除区划",httpMethod = "POST")
    @Permission("base:admin:remove")
    public ResponseData delete(BaseAdminParam baseAdminParam) {
        this.baseAdminService.delete(baseAdminParam);
        return ResponseData.success();
    }

    /**
     * 查看详情接口
     *
     * @author spt
     * @Date 2020-07-03
     */
    @GetMapping("/detail")
    @ResponseBody
    public ResponseData detail(BaseAdminParam baseAdminParam) {
        BaseAdmin detail = this.baseAdminService.getById(baseAdminParam.getAdCode());
        return ResponseData.success(detail);
    }

    /**
     * 查询列表
     *
     * @author spt
     * @Date 2020-07-03
     */
    @GetResource(path = "/list", modular = "基础信息-区划管理-查询列表", businessType = BusinessType.QUERY)
    @ApiOperation(value="基础信息-区划管理-查询列表",httpMethod = "GET")
    @Permission("base:admin:list")
    public LayuiPageInfo list(BaseAdminParam baseAdminParam) {
        if (ToolUtil.isEmpty(baseAdminParam.getAdCode())) {
            baseAdminParam.setAdCode(LoginContextHolder.me().getLoginUser().getAdCode());
        }
        return this.baseAdminService.findPageBySpec(baseAdminParam);
    }

    /**
     * 获取直属下级政区
     *
     * @return
     */
    @GetResource(path = "/dirAdmin", modular = "基础信息-区划管理-查询直属下级政区", businessType = BusinessType.QUERY)
    @ApiOperation(value="基础信息-区划管理-查询直属下级政区",httpMethod = "GET")

    public LayuiPageInfo dirAdmin() {
        return this.baseAdminService.dirAdmin(LoginContextHolder.me().getLoginUser().getAdCode());
    }

    /**
     * 根据当前用户权限内的政区树结构(layuiTree)
     *
     * @return
     */
    @GetResource(path = "/layuiTree", modular = "基础信息-区划管理-查询权限内的政区树结构(layuiTree)", businessType = BusinessType.QUERY)
    @ApiOperation(value="基础信息-区划管理-查询权限内的政区树结构(layuiTree)",httpMethod = "GET")
    public List<LayuiTreeNode> layuiTree() {
        return this.baseAdminService.layuiTree();
    }

    /**
     * 查询指定级别以上的政区树结构(layuiTree)
     *
     * @param grade
     * @return
     */
    @GetResource(path = "/layuiTreeOverGrade/{grade}", modular = "基础信息-区划管理-查询指定级别以上的政区树结构(layuiTree)", businessType = BusinessType.QUERY)
    @ApiOperation(value="基础信息-区划管理-查询指定级别以上的政区树结构(layuiTree)",httpMethod = "GET")
    public List<LayuiTreeNode> layuiTreeOverGrade(@PathVariable String grade) {
        return this.baseAdminService.layuiTreeOverGrade(grade);
    }

    /**
     * 查询政区树结构(ztree)
     *
     * @return
     */
    @GetResource(path = "/tree", modular = "基础信息-区划管理-查询政区树结构(ztree)", businessType = BusinessType.QUERY)
    @ApiOperation(value="基础信息-区划管理-查询政区树结构(ztree)",httpMethod = "GET")
    public List<ZTreeNode> tree() {
        List<ZTreeNode> tree = this.baseAdminService.tree();
        return tree;
    }

    /**
     * 创建区划下部门
     *
     * @param adCode
     * @return
     */
    @PostResource(path = "/createDept", modular = "基础信息-区划管理-创建区划下部门", businessType = BusinessType.INSERT)
    @ApiOperation(value="基础信息-区划管理-创建区划下部门",httpMethod = "POST")
    public ResponseData createDept(@RequestParam String adCode) {
        this.baseAdminService.createDeptByAdmin(adCode);
        return ResponseData.success();
    }


    /**
     * 生产区划代码
     *
     * @param upAdCode
     * @return
     */
    @PostResource(path = "/createAdCode", modular = "基础信息-区划管理-生产区划代码", businessType = BusinessType.OTHER)
    @ApiOperation(value="基础信息-区划管理-生产区划代码",httpMethod = "POST")
    public ResponseData buildAdCode(@RequestParam String upAdCode) {
        return ResponseData.success(this.baseAdminService.buildAdCode(upAdCode));
    }

}


