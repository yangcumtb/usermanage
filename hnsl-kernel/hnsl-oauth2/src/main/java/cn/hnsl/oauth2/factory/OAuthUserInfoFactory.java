package cn.hnsl.oauth2.factory;

import cn.hnsl.base.consts.ConstantsContext;
import cn.hnsl.sys.core.constant.state.ManagerStatus;
import cn.hnsl.sys.core.util.SaltUtil;
import cn.hnsl.sys.modular.system.entity.SysUser;
import cn.hnsl.base.oauth2.entity.OauthUserInfo;
import cn.hnsl.core.util.ToolUtil;
import me.zhyd.oauth.enums.AuthUserGender;
import me.zhyd.oauth.model.AuthUser;

import java.util.Date;

/**
 * oauth绑定记录
 *
 * @author fengshuonan
 * @Date 2019/6/9 19:02
 */
public class OAuthUserInfoFactory {

    /**
     * 创建oauth绑定
     *
     * @author fengshuonan
     * @Date 2019/6/9 19:03
     */
    public static OauthUserInfo createOAuthUserInfo(Long userId, AuthUser oauthUser) {
        OauthUserInfo oauthUserInfo = new OauthUserInfo();

        ToolUtil.copyProperties(oauthUser, oauthUserInfo);

        //设置openId和第三方源
        oauthUserInfo.setUuid(oauthUser.getUuid());
        oauthUserInfo.setSource(oauthUser.getSource().name());

        //设置本系统地用户id
        oauthUserInfo.setUserId(userId);

        return oauthUserInfo;
    }

    /**
     * 创建第三方应用在本应用的用户
     *
     * @author fengshuonan
     * @Date 2019/6/9 19:11
     */
    public static SysUser createOAuthUser(AuthUser authUser) {

        SysUser systemSysUser = new SysUser();

        //设置密码，利用token
        String salt = SaltUtil.getRandomSalt();
        String password = SaltUtil.md5Encrypt(String.valueOf(authUser.getToken()), salt);
        systemSysUser.setPassword(password);
        systemSysUser.setSalt(salt);

        //利用openId设置账号
        systemSysUser.setAccount(ConstantsContext.getOAuth2UserPrefix() + "_" + authUser.getSource().name() + "_" + authUser.getUsername());
        systemSysUser.setName(authUser.getNickname());
        systemSysUser.setBirthday(new Date());
        systemSysUser.setSex(AuthUserGender.MALE.equals(authUser.getGender()) ? "M" : "F");
        systemSysUser.setEmail("未设置");
        systemSysUser.setPhone("未设置");

        //固定第三方应用的角色和部门
        systemSysUser.setRoleId("5");
        systemSysUser.setDeptId(25L);

        systemSysUser.setStatus(ManagerStatus.OK.getCode());
        systemSysUser.setCreateTime(new Date());
        systemSysUser.setCreateUser(1L);
        systemSysUser.setUpdateTime(new Date());
        systemSysUser.setUpdateUser(1L);
        systemSysUser.setVersion(0);

        return systemSysUser;
    }

}
