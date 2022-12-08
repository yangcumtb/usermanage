package cn.hnsl.sys.core.auth.util;

import cn.hnsl.core.util.HttpContext;
import cn.hnsl.core.util.ToolUtil;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import static cn.hnsl.base.consts.ConstantsContext.getTokenHeaderName;

/**
 * 获取token的封装
 *
 * @author fengshuonan
 * @Date 2020/2/16 22:51
 */
public class TokenUtil {

    /**
     * 获取token的两种方法
     *
     * @author fengshuonan
     * @Date 2020/2/16 22:51
     */
    public static String getToken() {

        String authToken = null;
        HttpServletRequest request = HttpContext.getRequest();

        //权限校验的头部
        String tokenHeader = getTokenHeaderName();
        authToken = request.getHeader(tokenHeader);

        //header中没有的话去cookie拿值，以header为准
        if (ToolUtil.isEmpty(authToken)) {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if (tokenHeader.equals(cookie.getName())) {
                        authToken = cookie.getValue();
                    }
                }
            }
        }

        return authToken;
    }
}
