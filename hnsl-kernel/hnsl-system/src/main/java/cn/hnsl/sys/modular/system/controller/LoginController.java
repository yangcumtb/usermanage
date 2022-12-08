
package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.auth.service.AuthService;
import cn.hnsl.base.consts.ConstantsContext;
import cn.hnsl.sys.core.auth.cache.SessionManager;
import cn.hnsl.sys.core.exception.InvalidKaptchaException;
import cn.hnsl.sys.modular.system.service.impl.SysUserServiceImpl;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.RequestEmptyException;
import cn.hnsl.model.response.ResponseData;
import cn.hnsl.model.response.SuccessResponseData;
import com.google.code.kaptcha.Constants;

import javax.annotation.Resource;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * 登录控制器
 *
 * @author fengshuonan
 * @Date 2017年1月10日 下午8:25:24
 */
@Controller
public class LoginController extends BaseController {

    @Resource
    private AuthService authService;

    @Resource
    private SysUserServiceImpl userService;

    @Resource
    private SessionManager sessionManager;

    /**
     * 跳转到主页
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:41 PM
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model) throws Exception {


        //判断用户是否登录
        if (LoginContextHolder.me().hasLogin()) {
            Map<String, Object> userIndexInfo = userService.getUserIndexInfo();

            //用户信息为空，提示账号没分配角色登录不进去
            if (userIndexInfo == null) {
                model.addAttribute("tips", "该用户没有角色，无法登陆");
                return "/login.html";
            } else {
                model.addAllAttributes(userIndexInfo);
                return "/index.html";
            }

        } else {
            return "/login.html";
        }
    }

    /**
     * 跳转到登录页面
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:41 PM
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        if (LoginContextHolder.me().hasLogin()) {
            return REDIRECT + "/";
        } else {
            return "/login.html";
        }
    }

    /**
     * 点击登录执行的动作
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:42 PM
     */
    @PostMapping(value = "/login")
    @ResponseBody
    public ResponseData loginVali(HttpServletRequest request, HttpServletResponse response) {

        String username = super.getPara("username");
        String password = super.getPara("password");
        String remFlag = super.getPara("remFlag");

        if (ToolUtil.isOneEmpty(username, password)) {
            throw new RequestEmptyException("账号或密码为空！");
        }

        //验证验证码是否正确
        if (ConstantsContext.getKaptchaOpen()) {
            String kaptcha = super.getPara("kaptcha").trim();
            String code = (String) super.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
            if (ToolUtil.isEmpty(kaptcha) || !kaptcha.equalsIgnoreCase(code)) {
                throw new InvalidKaptchaException();
            }
        }
        //存储用户密码
        if("1".equals(remFlag)){ //"1"表示用户勾选记住密码
            String loginInfo = username+"#"+password;
            Cookie userCookie=new Cookie("loginInfo",loginInfo);
            userCookie.setMaxAge(30*24*60*60);   //存活期为一个月 30*24*60*60
            userCookie.setPath("/");
            response.addCookie(userCookie);
        }
        //登录并创建token
        String token = authService.login(username, password);

        return new SuccessResponseData(token);
    }
    /**
     * 利用已有的token进行登录（一般用在oauth登录）
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:42 PM
     */
    @RequestMapping(value = "/sysTokenLogin")
    public String sysTokenLogin(@RequestParam(value = "token", required = false) String token, Model model) {
        if (ToolUtil.isNotEmpty(token)) {

            //从session获取用户信息，没有就是token无效
            LoginUser user = sessionManager.getSession(token);
            if (user == null) {
                return "/login.html";
            }

            //创建当前登录上下文
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            //渲染首页需要的用户信息
            Map<String, Object> userIndexInfo = userService.getUserIndexInfo();
            if (userIndexInfo == null) {
                model.addAttribute("tips", "该用户没有角色，无法登陆！");
                return "/login.html";
            } else {
                model.addAllAttributes(userIndexInfo);
            }

            //创建cookie
            authService.addLoginCookie(token);

            return "/index.html";
        } else {
            model.addAttribute("tips", "token请求为空，无法登录！");
            return "/login.html";
        }
    }

    /**
     * 退出登录
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:42 PM
     */
    @RequestMapping(value = "/logout")
    @ResponseBody
    public ResponseData logOut() {
        authService.logout();
        return new SuccessResponseData();
    }

}
