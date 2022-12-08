
package cn.hnsl.sys.modular.system.controller;


import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.model.params.SysUserOnlineParam;
import cn.hnsl.sys.modular.system.service.OnlineService;
import cn.hnsl.model.response.ResponseData;
import cn.hnsl.model.response.SuccessResponseData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 在线用户控制器
 *
 * @author xuyuxiang
 * @date 2020/4/7 16:57
 */
@Controller
@RequestMapping("/system/online")
public class OnlineController {
    private String PREFIX = "/modular/system/online";

    @Resource
    private OnlineService onlineService;

    @GetMapping("")
    @Permission("system:online:view")
    public String index() {
        return PREFIX + "/online.html";
    }

    /**
     * 在线用户列表
     *
     * @author xuyuxiang
     * @date 2020/4/7 16:58
     */

    @RequestMapping("/list")
    @Permission("system:online:list")
    @ResponseBody
    public LayuiPageInfo list(SysUserOnlineParam sysUserOnlineParam) {
        return this.onlineService.findPageBySpec(sysUserOnlineParam);
    }

    /**
     * 在线用户强退
     *
     * @author xuyuxiang
     * @date 2020/4/7 17:36
     */
    @RequestMapping("/forceExist")
    @Permission("system:online:forceExist")
    @ResponseBody
    public ResponseData forceExist(@RequestParam("sessionId") String sessionId) {
        onlineService.forceExist(sessionId);
        return new SuccessResponseData();
    }
}
