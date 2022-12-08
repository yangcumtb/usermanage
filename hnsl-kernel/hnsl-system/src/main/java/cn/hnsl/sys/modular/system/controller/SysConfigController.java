package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.service.SysConfigService;
import cn.hnsl.sys.modular.system.entity.SysConfig;
import cn.hnsl.sys.modular.system.model.params.SysConfigParam;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.response.ResponseData;

import javax.annotation.Resource;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


/**
 * 参数配置控制器
 *
 * @author spot
 * @Date 2019-06-20 14:32:21
 */
@Controller
@RequestMapping("/system/config")
public class SysConfigController extends BaseController {

    private String PREFIX = "/modular/system/config";

    @Resource
    private SysConfigService sysConfigService;

    /**
     * 跳转到主页面
     *
     * @author spot
     * @Date 2019-06-20
     */
    @RequestMapping("")
    @Permission("system:config:view")
    public String index() {
        return PREFIX + "/sysConfig.html";
    }

    /**
     * 新增页面
     *
     * @author spot
     * @Date 2019-06-20
     */
    @GetMapping("/add")
    @Permission("system:config:add")
    public String add() {
        return PREFIX + "/sysConfig_add.html";
    }

    /**
     * 编辑页面
     *
     * @author spot
     * @Date 2019-06-20
     */
    @GetMapping("/edit")
    @Permission("system:config:edit")
    public String edit() {
        return PREFIX + "/sysConfig_edit.html";
    }

    /**
     * 新增接口
     *
     * @author spot
     * @Date 2019-06-20
     */
    @PostMapping("/add")
    @Permission("system:config:add")
    @ResponseBody
    public ResponseData addItem(SysConfigParam sysConfigParam) {
        this.sysConfigService.add(sysConfigParam);
        return ResponseData.success();
    }

    /**
     * 编辑接口
     *
     * @author spot
     * @Date 2019-06-20
     */
    @PostMapping("/edit")
    @Permission("system:config:edit")
    @ResponseBody
    public ResponseData editItem(SysConfigParam sysConfigParam) {
        this.sysConfigService.update(sysConfigParam);
        return ResponseData.success();
    }

    /**
     * 删除接口
     *
     * @author spot
     * @Date 2019-06-20
     */
    @RequestMapping("/delete")
    @Permission("system:config:remvoe")
    @ResponseBody
    public ResponseData delete(SysConfigParam sysConfigParam) {
        this.sysConfigService.delete(sysConfigParam);
        return ResponseData.success();
    }

    /**
     * 查看详情接口
     *
     * @author spot
     * @Date 2019-06-20
     */
    @RequestMapping("/detail")
    @ResponseBody
    public ResponseData detail(SysConfigParam sysConfigParam) {
        SysConfig detail = this.sysConfigService.getById(sysConfigParam.getId());
        return ResponseData.success(detail);
    }

    /**
     * 根据code查看详情
     *
     * @author spot
     * @Date 2019-06-20
     */
    @RequestMapping("/detailbycode")
    @ResponseBody
    public ResponseData detailbycode(String code) {
        SysConfig detail = this.sysConfigService.getBaseMapper().selectOne(new QueryWrapper<SysConfig>().eq("code", code));
        return ResponseData.success(detail);
    }


    /**
     * 查询列表
     *
     * @author spot
     * @Date 2019-06-20
     */
    @ResponseBody
    @RequestMapping("/list")
    @Permission("system:config:list")
    public LayuiPageInfo list(@RequestParam(value = "condition", required = false) String condition) {

        SysConfigParam sysConfigParam = new SysConfigParam();

        if (ToolUtil.isNotEmpty(condition)) {
            sysConfigParam.setCode(condition);
            sysConfigParam.setName(condition);
            sysConfigParam.setRemark(condition);
            sysConfigParam.setValue(condition);
        }

        return this.sysConfigService.findPageBySpec(sysConfigParam);
    }

}


