package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.enums.BusinessType;
import cn.hnsl.base.log.PostResource;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.entity.SysNews;
import cn.hnsl.sys.modular.system.model.params.SysNewsParam;
import cn.hnsl.sys.modular.system.service.SysNewsService;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.model.response.ResponseData;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 新闻管理控制器
 *
 * @author spt
 * @Date 2021-10-15 14:57:38
 */
@Controller
@RequestMapping("/system/news")
public class SysNewsController extends BaseController {

    private String PREFIX = "/modular/system/news";

    @Resource
    private SysNewsService sysNewsService;

    /**
     * 跳转到主页面
     *
     * @author spt
     * @Date 2021-10-15
     */
    @GetMapping("")
    @Permission("system:news:view")
    public String indexView() {
        return PREFIX + "/news.html";
    }

    /**
     * 新增页面
     *
     * @author spt
     * @Date 2021-10-15
     */
    @GetMapping("/add")
    @Permission("system:news:add")
    public String addView() {
        return PREFIX + "/news_add.html";
    }

    /**
     * 编辑页面
     *
     * @author spt
     * @Date 2021-10-15
     */
    @GetMapping("/edit")
    @Permission("system:news:edit")
    public String edit() {
        return PREFIX + "/news_edit.html";
    }

    /**
     * 新增接口
     *
     * @author spt
     * @Date 2021-10-15
     */
    @PostResource(path = "/add", modular = "系统管理-用户管理-添加用户", businessType = BusinessType.INSERT)
    @Permission("system:news:add")
    public ResponseData addItem(SysNewsParam sysNewsParam) {
        this.sysNewsService.add(sysNewsParam);
        return ResponseData.success();
    }

    /**
     * 编辑接口
     *
     * @author spt
     * @Date 2021-10-15
     */
    @PostResource(path = "/edit", modular = "系统管理-用户管理-修改用户", businessType = BusinessType.UPDATE)
    @Permission("system:news:edit")
    public ResponseData editItem(SysNewsParam sysNewsParam) {
        this.sysNewsService.update(sysNewsParam);
        return ResponseData.success();
    }

    /**
     * 删除接口
     *
     * @author spt
     * @Date 2021-10-15
     */
    @PostResource(path = "/delete", modular = "系统管理-用户管理-删除用户", businessType = BusinessType.DELETE)
    @Permission("system:news:remove")
    public ResponseData delete(SysNewsParam sysNewsParam) {
        this.sysNewsService.delete(sysNewsParam);
        return ResponseData.success();
    }

    /**
     * 查看详情接口
     *
     * @author spt
     * @Date 2021-10-15
     */
    @RequestMapping("/detail")
    @ResponseBody
    public ResponseData detail(SysNewsParam sysNewsParam) {
        SysNews detail = this.sysNewsService.getById(sysNewsParam.getNewsId());
        return ResponseData.success(detail);
    }

    /**
     * 查询列表
     *
     * @author spt
     * @Date 2021-10-15
     */
    @ResponseBody
    @RequestMapping("/list")
    @Permission("system:news:list")
    public LayuiPageInfo list(SysNewsParam sysNewsParam) {
        return this.sysNewsService.findPageBySpec(sysNewsParam);
    }

}


