package cn.hnsl.base.auth.context;

import cn.hnsl.core.util.SpringContextHolder;

/**
 * 当前登录用户信息获取的接口
 *
 * @author fengshuonan
 * @Date 2019/7/18 22:27
 */
public class LoginContextHolder {

    public static LoginContext me() {
        return SpringContextHolder.getBean(LoginContext.class);
    }

}
