
package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.sys.modular.system.service.LoginLogService;
import cn.hnsl.sys.modular.system.warpper.LogWrapper;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.core.data.SqlExe;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * 日志管理的控制器
 *
 * @author fengshuonan
 * @Date 2017年4月5日 19:45:36
 */
@Controller
@RequestMapping("/system/loginLog")
public class SysLoginLogController extends BaseController {

    private static String PREFIX = "/modular/system/log/";

    @Resource
    private LoginLogService loginLogService;

    /**
     * 跳转到日志管理的首页
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:51 PM
     */
    @GetMapping("")
    @Permission("system:loginLog:view")
    public String index() {
        return PREFIX + "login_log.html";
    }

    /**
     * 查询登录日志列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:51 PM
     */
    @RequestMapping("/list")
    @Permission("system:loginLog:list")
    @ResponseBody
    public Object list(@RequestParam(required = false) String beginTime,
                       @RequestParam(required = false) String endTime,
                       @RequestParam(required = false) String logName) {

        //获取分页参数
        Page page = LayuiPageFactory.defaultPage();

        //根据条件查询日志
        List<Map<String, Object>> result = loginLogService.getLoginLogs(page, beginTime, endTime, logName);
        page.setRecords(new LogWrapper(result).wrap());

        return LayuiPageFactory.createPageInfo(page);
    }

    /**
     * 清空日志
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:51 PM
     */
    @RequestMapping("/delLoginLog")
    @Permission("system:loginLog:remove")
    @ResponseBody
    public Object delLog() {
        SqlExe.delete("delete from sys_login_log", null);
        return SUCCESS_TIP;
    }
}
