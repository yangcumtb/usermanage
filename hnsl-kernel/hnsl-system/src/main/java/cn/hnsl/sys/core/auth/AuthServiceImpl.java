
package cn.hnsl.sys.core.auth;

import cn.hnsl.base.consts.ConstantsContext;
import cn.hnsl.sys.core.auth.cache.SessionManager;
import cn.hnsl.sys.core.constant.state.ManagerStatus;
import cn.hnsl.sys.core.listener.ConfigListener;
import cn.hnsl.sys.core.log.factory.LogTaskFactory;
import cn.hnsl.sys.core.util.HttpServletUtil;
import cn.hnsl.sys.core.util.IpAddressUtil;
import cn.hnsl.sys.core.util.SaltUtil;
import cn.hnsl.sys.core.util.UaUtil;
import cn.hnsl.sys.modular.system.entity.SysRole;
import cn.hnsl.sys.modular.system.entity.SysUser;
import cn.hnsl.sys.modular.system.mapper.SysRoleMapper;
import cn.hnsl.sys.modular.system.service.SysMenuService;
import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.auth.exception.AuthException;
import cn.hnsl.base.auth.exception.enums.AuthExceptionEnum;
import cn.hnsl.base.auth.jwt.JwtTokenUtil;
import cn.hnsl.base.auth.jwt.payload.JwtPayLoad;
import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.auth.service.AuthService;
import cn.hnsl.sys.core.log.LogManager;
import cn.hnsl.sys.modular.system.factory.UserFactory;
import cn.hnsl.sys.modular.system.mapper.UserMapper;
import cn.hutool.core.date.DateTime;
import cn.hutool.core.util.ObjectUtil;
import cn.hnsl.core.util.HttpContext;
import cn.hnsl.core.util.SpringContextHolder;
import cn.hutool.core.util.StrUtil;

import javax.annotation.Resource;

import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

import static cn.hnsl.base.consts.ConstantsContext.getJwtSecretExpireSec;
import static cn.hnsl.base.consts.ConstantsContext.getTokenHeaderName;
import static cn.hnsl.core.util.HttpContext.getIp;

@Service
@DependsOn("springContextHolder")
public class AuthServiceImpl implements AuthService {

    @Resource
    private UserMapper userMapper;

    @Resource
    private SysMenuService menuService;

    @Resource
    private SysRoleMapper roleMapper;

    @Resource
    private SessionManager sessionManager;

    public static AuthService me() {
        return SpringContextHolder.getBean(AuthService.class);
    }

    @Override
    public String login(String username, String password) {

        SysUser sysUser = userMapper.getByAccount(username);

        // ???????????????
        if (null == sysUser) {
            throw new AuthException(AuthExceptionEnum.USERNAME_PWD_ERROR);
        }

        //??????????????????????????????
        String requestMd5 = SaltUtil.md5Encrypt(password, sysUser.getSalt());
        String dbMd5 = sysUser.getPassword();
        if (dbMd5 == null || !dbMd5.equalsIgnoreCase(requestMd5)) {
            throw new AuthException(AuthExceptionEnum.USERNAME_PWD_ERROR);
        }

        return login(username);
    }

    @Override
    public String login(String username) {

        SysUser sysUser = userMapper.getByAccount(username);

        // ???????????????
        if (null == sysUser) {
            throw new AuthException(AuthExceptionEnum.USERNAME_PWD_ERROR);
        }

        // ???????????????
        if (!sysUser.getStatus().equals(ManagerStatus.OK.getCode())) {
            throw new AuthException(AuthExceptionEnum.ACCOUNT_FREEZE_ERROR);
        }


        //TODO key?????????
        JwtPayLoad payLoad = new JwtPayLoad(sysUser.getUserId(), sysUser.getAccount(), "xxxx");

        //??????token
        String token = JwtTokenUtil.generateToken(payLoad);

        LoginUser loginUser = user(username);

        Map<String, String> params = new HashMap<>(1);

        params.put("token", token);

        loginUser.setWsUrl(StrUtil.format(ConstantsContext.getSystemWsConfig(), params));
        //??????????????????
        sessionManager.createSession(token, loginUser);

        //??????cookie
        addLoginCookie(token);

        //??????????????????
        LogManager.me().executeLog(LogTaskFactory.loginLog(sysUser.getUserId(), getIp()));

        return token;
    }

    @Override
    public void addLoginCookie(String token) {
        //??????cookie
        Cookie authorization = new Cookie(getTokenHeaderName(), token);
        authorization.setMaxAge(getJwtSecretExpireSec().intValue());
        authorization.setHttpOnly(true);
        authorization.setPath("/");
        HttpServletResponse response = HttpContext.getResponse();
        response.addCookie(authorization);
    }

    @Override
    public void logout() {
        String token = LoginContextHolder.me().getToken();
        logout(token);
    }

    @Override
    public void logout(String token) {

        //??????????????????
        LogManager.me().executeLog(LogTaskFactory.exitLog(LoginContextHolder.me().getUserId(), getIp()));

        //??????Auth??????cookies
        Cookie[] cookies = HttpContext.getRequest().getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                String tokenHeader = getTokenHeaderName();
                if (tokenHeader.equalsIgnoreCase(cookie.getName())) {
                    Cookie temp = new Cookie(cookie.getName(), "");
                    temp.setMaxAge(0);
                    temp.setPath("/");
                    HttpContext.getResponse().addCookie(temp);
                }
            }
        }

        //????????????
        sessionManager.removeSession(token);
    }

    @Override
    public LoginUser user(String account) {

        HttpServletRequest request = HttpServletUtil.getRequest();

        SysUser sysUser = userMapper.getByAccount(account);

        LoginUser loginUser = UserFactory.createLoginUser(sysUser);

        //??????????????????
        List<SysRole> roleList = roleMapper.getRoleByUserId(sysUser.getUserId());

        //?????????????????????????????????
        if (roleList == null || roleList.size() == 0) {
            return loginUser;
        }

        //????????????????????????
        List<Long> roleIdList = new ArrayList<>();
        List<String> roleNameList = new ArrayList<>();
        List<String> roleKeyList = new ArrayList<>();
        for (SysRole role : roleList) {
            roleIdList.add(role.getRoleId());
            roleNameList.add(role.getRoleName());
            roleKeyList.add(role.getRoleKey());
        }
        loginUser.setRoleList(roleIdList);
        loginUser.setRoleNames(roleNameList);
        loginUser.setRoleKey(roleKeyList);

        //??????????????????
        Set<String> permissionSet = menuService.selectPermsByUserId(sysUser.getUserId());

        loginUser.setPermissions(permissionSet);

        if (ObjectUtil.isNotNull(request)) {
            loginUser.setLastLoginIp(IpAddressUtil.getIp(request));
            loginUser.setLastLoginTime(DateTime.now().toString());
            loginUser.setLastLoginAddress(IpAddressUtil.getAddress(request));
            loginUser.setLastLoginBrowser(UaUtil.getBrowser(request));
            loginUser.setLastLoginOs(UaUtil.getOs(request));
        }


        return loginUser;
    }

    @Override
    public boolean check(String permission) {
        LoginUser user = LoginContextHolder.me().getLoginUser();
        if (null == user) {
            return false;
        }
        if (LoginContextHolder.me().hasPermission(permission)) {
            return true;
        }
        return false;
    }

    @Override
    public boolean checkAll() {
        HttpServletRequest request = HttpContext.getRequest();
        LoginUser user = LoginContextHolder.me().getLoginUser();
        if (null == user) {
            return false;
        }
        String requestURI = request.getRequestURI().replaceFirst(ConfigListener.getConf().get("contextPath"), "");
        String[] str = requestURI.split("/");
        if (str.length > 3) {
            requestURI = "/" + str[1] + "/" + str[2];
        }
        if (LoginContextHolder.me().hasPermission(requestURI)) {
            return true;
        }
        return false;
    }

}
