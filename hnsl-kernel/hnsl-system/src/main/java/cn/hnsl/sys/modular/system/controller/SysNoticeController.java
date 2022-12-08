
package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.enums.BusinessType;
import cn.hnsl.base.log.PostResource;
import cn.hnsl.sys.modular.message.service.MessageApi;
import cn.hnsl.sys.modular.system.service.NoticeService;
import cn.hutool.core.bean.BeanUtil;
import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.sys.modular.system.entity.Notice;
import cn.hnsl.sys.modular.system.warpper.NoticeWrapper;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.RequestEmptyException;
import cn.hnsl.model.response.ResponseData;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 通知控制器
 *
 * @author fengshuonan
 * @Date 2017-05-09 23:02:21
 */
@Controller
@RequestMapping("/system/notice")
public class SysNoticeController extends BaseController {

    private String PREFIX = "/modular/system/notice/";

    @Resource
    private NoticeService noticeService;

    @Resource
    private MessageApi messageApi;

    /**
     * 跳转到通知列表首页
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:06 PM
     */
    @RequestMapping("")
    @Permission("system:notice:view")
    public String index() {
        return PREFIX + "notice.html";
    }

    /**
     * 跳转到添加通知
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:06 PM
     */
    @GetMapping("/add")
    @Permission("system:notice:add")
    public String noticeAdd(Model model) {
        model.addAttribute("sendUnit",LoginContextHolder.me().getLoginUser().getDeptName());
        return PREFIX + "notice_add.html";
    }

    /**
     * 跳转到修改通知
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:06 PM
     */
    @GetMapping("/edit")
    @Permission("system:notice:edit")
    public String noticeUpdate() {
        return PREFIX + "notice_edit.html";
    }

    /**
     * 获取通知详情
     *
     * @author fengshuonan
     * @Date 2019/8/26 18:14
     */
    @RequestMapping("/detail")
    @ResponseBody
    public ResponseData noticeDetail(Long noticeId) {
        Notice notice = this.noticeService.getById(noticeId);
        Map<String, Object> noticeMap = BeanUtil.beanToMap(notice);
        return ResponseData.success(noticeMap);
    }

    /**
     * 获取通知列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:06 PM
     */
    @RequestMapping(value = "/list")
    @Permission("system:notice:list")
    @ResponseBody
    public Object list(String condition) {
        Page<Map<String, Object>> list = this.noticeService.list(condition);
        Page<Map<String, Object>> wrap = new NoticeWrapper(list).wrap();
        return LayuiPageFactory.createPageInfo(wrap);
    }

    /**
     * 新增通知
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:06 PM
     */
    @PostResource(path = "/add", modular = "系统管理-通知消息-新增通知", businessType = BusinessType.INSERT)
    @Permission("system:notice:add")
    public Object add(Notice notice) {
        if (ToolUtil.isOneEmpty(notice, notice.getNoticeTitle(), notice.getNoticeContent())) {
            throw new RequestEmptyException("通知标题或内容为空");
        }
        notice.setDelFlag("N");
        this.noticeService.save(notice);

        return SUCCESS_TIP;
    }

    /**
     * 通知消息
     * @param noticeId
     * @return
     */
    @PostResource(path = "/push", modular = "系统管理-通知消息-推送通知", businessType = BusinessType.OTHER)
    @Permission("system:notice:push")
    public Object push(@RequestParam Long noticeId){
        this.noticeService.push(noticeId);
        return SUCCESS_TIP;
    }

    /**
     * 删除通知
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:06 PM
     */
    @PostMapping(value = "/delete")
    @Permission("system:notice:remove")
    @ResponseBody
        public Object delete(@RequestParam Long noticeId) {

        this.noticeService.removeById(noticeId);

        return SUCCESS_TIP;
    }

    /**
     * 修改通知
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:06 PM
     */
    @PostMapping(value = "/edit")
    @Permission("system:notice:edit")
    @ResponseBody
    public Object update(Notice notice) {
        if (ToolUtil.isOneEmpty(notice, notice.getNoticeId(), notice.getNoticeTitle(), notice.getNoticeContent())) {
            throw new RequestEmptyException("通知标题或内容为空");
        }
        Notice old = this.noticeService.getById(notice.getNoticeId());
        old.setNoticeTitle(notice.getNoticeTitle());
        old.setNoticeContent(notice.getNoticeContent());
        this.noticeService.updateById(old);
        return SUCCESS_TIP;
    }

}
