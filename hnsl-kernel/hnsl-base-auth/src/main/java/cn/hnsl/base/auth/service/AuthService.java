
package cn.hnsl.base.auth.service;

import cn.hnsl.base.auth.model.LoginUser;

import java.util.List;

/**
 * Auth相关数据库的操作
 *
 * @author fengshuonan
 * @date 2016年12月5日 上午10:23:34
 */
public interface AuthService {

    /**
     * 登录
     *
     * @param username 账号
     * @param password 密码
     * @return token
     */
    String login(String username, String password);

    /**
     * 登录（直接用账号登录）
     *
     * @param username 账号
     * @return token
     */
    String login(String username);

    /**
     * 创建登录cookie
     */
    void addLoginCookie(String token);

    /**
     * 退出当前用户
     */
    void logout();

    /**
     * 退出
     */
    void logout(String token);

    /**
     * 根据账号获取登录用户
     *
     * @param account 账号
     */
    LoginUser user(String account);


    /**
     * 检查当前登录用户是否拥有指定的角色访问当
     *
     * @param permission 权限集合
     */
    boolean check(String permission);

    /**
     * 检查当前登录用户是否拥有当前请求的servlet的权限
     */
    boolean checkAll();

}
