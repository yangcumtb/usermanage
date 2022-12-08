
package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.sys.modular.system.model.params.OperationLogParam;
import cn.hutool.core.bean.BeanUtil;
import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.sys.modular.system.entity.OperationLog;
import cn.hnsl.sys.modular.system.service.OperationLogService;
import cn.hnsl.sys.modular.system.warpper.LogWrapper;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.core.data.SqlExe;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 日志管理的控制器
 *
 * @author fengshuonan
 * @Date 2017年4月5日 19:45:36
 */
@Controller
@RequestMapping("/system/log")
public class SysLogController extends BaseController {

    private static String PREFIX = "/modular/system/log/";

    @Resource
    private OperationLogService operationLogService;

    /**
     * 跳转到日志管理的首页
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:34 PM
     */
    @GetMapping("")
    @Permission("system:log:view")
    public String index() {
        return PREFIX + "log.html";
    }

    @GetMapping("/detail/{id}")
    @Permission("system:log:view")
    public String detail(@PathVariable Long id, Model model) {
        OperationLog operationLog = operationLogService.getById(id);
        model.addAttribute("item", operationLog);
        return PREFIX + "log_info.html";
    }

    /**
     * 查询操作日志列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:34 PM
     */
    @RequestMapping("/list")
    @Permission("system:log:list")
    @ResponseBody
    public Object list(@RequestParam(required = false) String title,
                       @RequestParam(required = false) Integer businessType,
                       @RequestParam(required = false) Integer status,
                       @RequestParam(required = false) Integer businessTypes,
                       @RequestParam(required = false) String beginTime,
                       @RequestParam(required = false) String endTime,
                       @RequestParam(required = false) String operName) {

        //获取分页参数
        Page page = LayuiPageFactory.defaultPage();

        //根据条件查询操作日志
        List<Map<String, Object>> result = operationLogService.getOperationLogs(page, title,businessType,status,beginTime,endTime,operName);

        page.setRecords(result);

        return LayuiPageFactory.createPageInfo(page);
    }

    /**
     * 清空日志
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:34 PM
     */
    @PostMapping("/delLog")
    @Permission("system:log:remove")
    @ResponseBody
    public Object delLog() {
        SqlExe.delete("delete from sys_operation_log", null);
        return SUCCESS_TIP;
    }
}
