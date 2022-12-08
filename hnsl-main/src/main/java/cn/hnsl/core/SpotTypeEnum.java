package cn.hnsl.core;

import io.swagger.models.auth.In;

public enum SpotTypeEnum {
    LSYL("历史遗留废弃矿山", 1),
    PCLOSE("政策关闭矿山", 2),
    PRODUCTIVE("生产矿山", 3),
    JSXM("建设项目", 4),
    ZRZS("自然灾损", 5),
    RS("遥感动态监测", 6);

    // 成员变量
    private String tbTypeName;
    private Integer tbtype;

    // 构造方法
    private SpotTypeEnum(String name, int index) {
        this.tbTypeName = name;
        this.tbtype = index;
    }

    // 普通方法
    public static Integer getTbtype(String name) {
        for (SpotTypeEnum c : SpotTypeEnum.values()) {
            if (c.getTbTypeName() == name) {
                return c.tbtype;
            }
        }
        return null;
    }

    private String getTbTypeName() {
        return tbTypeName;
    }

    public void setTbTypeName(String tbTypeName) {
        this.tbTypeName = tbTypeName;
    }

    public Integer getTbtype() {
        return tbtype;
    }

    public void setTbtype(Integer tbtype) {
        this.tbtype = tbtype;
    }
}
