package cn.hnsl.core.constant.state;

import cn.hnsl.sys.modular.message.core.enums.MessageBusinessTypeEnum;

/**
 * 组织结构类型的枚举
 *
 * @author fengshuonan
 * @date 2017年6月1日22:50:11
 */
public enum AdminGradeEnum {

    PROVINCE("1", "省级"),
    CITY("2", "市级"),
    COUNTRY("3", "县级"),
    TOWN("4", "乡镇级"),
    VILLAGE("5", "村级");

    String code;
    String name;

    AdminGradeEnum(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static AdminGradeEnum getByCode(String code) {
        if (code == null) {
            return null;
        }
        for (AdminGradeEnum flagEnum : AdminGradeEnum.values()) {
            if (flagEnum.getCode().equals(code)) {
                return flagEnum;
            }
        }
        return null;
    }

    public static String getName(String code) {
        if (code == null) {
            return null;
        }
        for (AdminGradeEnum flagEnum : AdminGradeEnum.values()) {
            if (flagEnum.getCode().equals(code)) {
                return flagEnum.name;
            }
        }
        return null;
    }

}
