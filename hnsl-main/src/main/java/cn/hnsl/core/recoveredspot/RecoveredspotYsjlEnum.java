package cn.hnsl.core.recoveredspot;

public enum RecoveredspotYsjlEnum {
    TG("通过", "TG"),
    YTJTG("有条件通过", "YTJTG"),
    WTG("未通过", "WTG"),
    TZLDYS("已治理，待验收", "YZLDYS");



    // 成员变量
    private String ysjlName;
    private String ysjlCode;

    // 构造方法
    private RecoveredspotYsjlEnum(String name, String code) {
        this.ysjlName = name;
        this.ysjlCode = code;
    }

    // 普通方法
    public static String getYsjl(String name) {
        for (RecoveredspotYsjlEnum c : RecoveredspotYsjlEnum.values()) {
            if (c.getYsjlName() == name) {
                return c.ysjlCode;
            }
        }
        return null;
    }

    public String getYsjlName() {
        return ysjlName;
    }

    public void setYsjlName(String ysjlName) {
        this.ysjlName = ysjlName;
    }

    public String getYsjlCode() {
        return ysjlCode;
    }

    public void setYsjlCode(String ysjlCode) {
        this.ysjlCode = ysjlCode;
    }
}
