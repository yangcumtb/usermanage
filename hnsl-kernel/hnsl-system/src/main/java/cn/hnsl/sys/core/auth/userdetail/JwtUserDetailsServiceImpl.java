package cn.hnsl.sys.core.auth.userdetail;

import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.auth.service.AuthService;
import javax.annotation.Resource;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * 用户详情信息获取
 *
 * @author fengshuonan
 * @Date 2019-09-28 14:07
 */
@Service("jwtUserDetailsService")
public class JwtUserDetailsServiceImpl implements UserDetailsService {

    @Resource
    private AuthService authService;

    @Override
    public LoginUser loadUserByUsername(String username) throws UsernameNotFoundException {
        return authService.user(username);
    }
}
