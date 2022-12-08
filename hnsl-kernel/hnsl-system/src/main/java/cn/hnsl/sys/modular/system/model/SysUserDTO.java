
package cn.hnsl.sys.modular.system.model;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * 用户传输bean
 *
 * @author spot
 * @Date 2017/5/5 22:40
 */
@Data
public class SysUserDTO {

    private Long userId;

    @NotBlank
    private String account;

    private String password;

    @NotBlank
    private String name;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthday;

    private String sex;

    private String email;

    @NotNull
    private String phone;

    @NotNull
    private String roleId;

    @NotNull
    private Long deptId;

    private String status;

    private String avatar;

    private String position;

    private String title;

}
