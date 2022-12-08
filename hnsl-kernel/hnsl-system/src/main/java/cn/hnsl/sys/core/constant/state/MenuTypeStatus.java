
package cn.hnsl.sys.core.constant.state;

import lombok.Getter;

/**
 * 菜单的状态
 *
 * @author fengshuonan
 * @Date 2017年1月22日 下午12:14:59
 */
@Getter
public enum MenuTypeStatus {

    M("M", "目录"),
    C("C", "菜单"),
    F("F", "按钮");

    String code;
    String message;

    MenuTypeStatus(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public static String getDescription(String status) {
        if (status == null) {
            return "";
        } else {
            for (MenuTypeStatus s : MenuTypeStatus.values()) {
                if (s.getCode().equals(status)) {
                    return s.getMessage();
                }
            }
            return "";
        }
    }
}
