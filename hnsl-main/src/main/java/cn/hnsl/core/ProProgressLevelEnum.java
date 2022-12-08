package cn.hnsl.core;

import java.util.Objects;

public enum ProProgressLevelEnum {
    XIAN("县级用户", 1), XIAN_final("县级终审", 2), SHI("市级审核", 3), SHENG("省级审核", 4), RUKU("项目入库", 5);

    // 成员变量
    private String buniessName;
    private Integer buniessType;

    // 构造方法
    private ProProgressLevelEnum(String buniessName, int buniessType) {
        this.buniessName = buniessName;
        this.buniessType = buniessType;
    }
    // 普通方法
    public static Integer getBuniessType(String name) {
        for (ProProgressLevelEnum c : ProProgressLevelEnum.values()) {
            if (Objects.equals(c.getBuniessName(), name)) {
                return c.buniessType;
            }
        }
        return null;
    }

    public String getBuniessName() {
        return buniessName;
    }

    public void setBuniessName(String buniessName) {
        this.buniessName = buniessName;
    }

    public Integer getBuniessType() {
        return buniessType;
    }

    public void setBuniessType(Integer buniessType) {
        this.buniessType = buniessType;
    }
}
