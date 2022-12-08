package cn.hnsl.sys.modular.message.controller;

import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.model.response.ResponseData;
import cn.hnsl.sys.modular.message.entity.SysMessage;
import cn.hnsl.sys.modular.message.model.params.SysMessageParam;
import cn.hnsl.sys.modular.message.service.SysMessageService;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 系统消息控制器
 *
 * @author spt
 * @Date 2021-09-17 11:41:28
 */
@Controller
@RequestMapping("/sysMessage")
public class SysMessageController extends BaseController {

    private String PREFIX = "/modular/system/message";

    @Resource
    private SysMessageService sysMessageService;

    /**
     * 跳转到主页面
     *
     * @author spt
     * @Date 2021-09-17
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "/sysMessage.html";
    }

    /**
     * 新增页面
     *
     * @author spt
     * @Date 2021-09-17
     */
    @RequestMapping("/add")
    public String add() {
        return PREFIX + "/sysMessage_add.html";
    }

    /**
     * 编辑页面
     *
     * @author spt
     * @Date 2021-09-17
     */
    @RequestMapping("/edit")
    public String edit() {
        return PREFIX + "/sysMessage_edit.html";
    }

    /**
     * 新增接口
     *
     * @author spt
     * @Date 2021-09-17
     */
    @RequestMapping("/addItem")
    @ResponseBody
    public ResponseData addItem(SysMessageParam sysMessageParam) {
        this.sysMessageService.add(sysMessageParam);
        return ResponseData.success();
    }

    /**
     * 编辑接口
     *
     * @author spt
     * @Date 2021-09-17
     */
    @RequestMapping("/editItem")
    @ResponseBody
    public ResponseData editItem(SysMessageParam sysMessageParam) {
        this.sysMessageService.update(sysMessageParam);
        return ResponseData.success();
    }

    /**
     * 删除接口
     *
     * @author spt
     * @Date 2021-09-17
     */
    @RequestMapping("/delete")
    @ResponseBody
    public ResponseData delete(SysMessageParam sysMessageParam) {
        this.sysMessageService.delete(sysMessageParam);
        return ResponseData.success();
    }

    /**
     * 查看详情接口
     *
     * @author spt
     * @Date 2021-09-17
     */
    @RequestMapping("/detail")
    @ResponseBody
    public ResponseData detail(SysMessageParam sysMessageParam) {
        SysMessage detail = this.sysMessageService.getById(sysMessageParam.getMessageId());
        return ResponseData.success(detail);
    }

    /**
     * 查询列表
     *
     * @author spt
     * @Date 2021-09-17
     */
    @ResponseBody
    @RequestMapping("/list")
    public LayuiPageInfo list(SysMessageParam sysMessageParam) {
        return this.sysMessageService.findPageBySpec(sysMessageParam);
    }

}


