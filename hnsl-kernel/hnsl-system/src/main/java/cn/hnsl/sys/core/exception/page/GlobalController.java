
package cn.hnsl.sys.core.exception.page;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 全局的控制器
 *
 * @author fengshuonan
 * @date 2016年11月13日 下午11:04:45
 */
@Controller
@RequestMapping("/global")
public class GlobalController {

    /**
     * 跳转到404页面
     *
     * @author fengshuonan
     */
    @RequestMapping(path = "/error")
    public String errorPage() {
        return "/404.html";
    }

    /**
     * 跳转到session超时页面
     *
     * @author fengshuonan
     */
    @RequestMapping(path = "/sessionError")
    public String errorPageInfo(Model model) {
        model.addAttribute("tips", "登陆超时，请您重新登陆！");
        return "/login.html";
    }
}
