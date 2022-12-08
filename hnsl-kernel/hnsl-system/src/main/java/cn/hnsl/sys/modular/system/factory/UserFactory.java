
package cn.hnsl.sys.modular.system.factory;

import cn.hnsl.sys.core.constant.factory.ConstantFactory;
import cn.hnsl.sys.core.constant.state.ManagerStatus;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.date.DateUtil;
import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.consts.ConstantsContext;
import cn.hnsl.sys.modular.system.entity.SysUser;
import cn.hnsl.sys.modular.system.model.SysUserDTO;
import cn.hnsl.core.util.ToolUtil;
import org.springframework.beans.BeanUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户创建工厂
 *
 * @author fengshuonan
 * @date 2017-05-05 22:43
 */
public class UserFactory {

    /**
     * 根据请求创建实体
     */
    public static SysUser createUser(SysUserDTO userDto, String md5Password, String salt) {
        if (userDto == null) {
            return null;
        } else {
            SysUser sysUser = new SysUser();
            BeanUtils.copyProperties(userDto, sysUser);
            sysUser.setCreateTime(new Date());
            sysUser.setStatus(ManagerStatus.OK.getCode());
            sysUser.setPassword(md5Password);
            sysUser.setSalt(salt);
            return sysUser;
        }
    }

    /**
     * 更新user
     */
    public static SysUser editUser(SysUserDTO newUser, SysUser oldSysUser) {
        if (newUser == null || oldSysUser == null) {
            return oldSysUser;
        } else {
            if (ToolUtil.isNotEmpty(newUser.getAvatar())) {
                oldSysUser.setAvatar(newUser.getAvatar());
            }
            if (ToolUtil.isNotEmpty(newUser.getName())) {
                oldSysUser.setName(newUser.getName());
            }
            if (ToolUtil.isNotEmpty(newUser.getBirthday())) {
                oldSysUser.setBirthday(newUser.getBirthday());
            }
            if (ToolUtil.isNotEmpty(newUser.getDeptId())) {
                oldSysUser.setDeptId(newUser.getDeptId());
            }
            if (ToolUtil.isNotEmpty(newUser.getSex())) {
                oldSysUser.setSex(newUser.getSex());
            }
            if (ToolUtil.isNotEmpty(newUser.getEmail())) {
                oldSysUser.setEmail(newUser.getEmail());
            }
            if (ToolUtil.isNotEmpty(newUser.getPhone())) {
                oldSysUser.setPhone(newUser.getPhone());
            }
            return oldSysUser;
        }
    }

    /**
     * 过滤不安全字段并转化为map
     */
    public static Map<String, Object> removeUnSafeFields(SysUser sysUser) {
        if (sysUser == null) {
            return new HashMap<>();
        } else {
            Map<String, Object> map = BeanUtil.beanToMap(sysUser);
            map.remove("password");
            map.remove("salt");
            map.put("birthday", DateUtil.formatDate(sysUser.getBirthday()));
            return map;
        }
    }

    /**
     * 通过用户表的信息创建一个登录用户
     */
    public static LoginUser createLoginUser(SysUser sysUser) {
        LoginUser loginUser = new LoginUser();

        if (sysUser == null) {
            return loginUser;
        }

        loginUser.setId(sysUser.getUserId());
        loginUser.setAccount(sysUser.getAccount());
        loginUser.setDeptId(sysUser.getDeptId());
        loginUser.setAdCode(sysUser.getAdCode());
        loginUser.setAdGrad(sysUser.getAdGrad());
        loginUser.setDeptName(ConstantFactory.me().getDeptName(sysUser.getDeptId()));
        loginUser.setName(sysUser.getName());
        loginUser.setEmail(sysUser.getEmail());

        loginUser.setAvatar("/api/system/preview/" + sysUser.getAvatar());

        return loginUser;
    }

    /**
     * 判断用户是否是从oauth2登录过来的
     */
    public static boolean oauth2Flag() {
        String account = LoginContextHolder.me().getLoginUser().getAccount();
        if (account.startsWith(ConstantsContext.getOAuth2UserPrefix())) {
            return true;
        } else {
            return false;
        }
    }
}
