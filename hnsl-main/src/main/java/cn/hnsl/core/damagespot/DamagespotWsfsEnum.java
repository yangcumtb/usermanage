package cn.hnsl.core.damagespot;

public enum DamagespotWsfsEnum {
    CK("采坑", 1),
    SP("山坡", 2),
    DMW("地埋物", 3);



    // 成员变量
    private String wsfsName;
    private Integer wsfsCode;

    // 构造方法
    private DamagespotWsfsEnum(String name, Integer index) {
        this.wsfsName = name;
        this.wsfsCode = index;
    }

    // 普通方法
    public static Integer getWsfs(String name) {
        for (DamagespotWsfsEnum c : DamagespotWsfsEnum.values()) {
            if (c.getWsfsName() == name) {
                return c.wsfsCode;
            }
        }
        return null;
    }

    public String getWsfsName() {
        return wsfsName;
    }

    public void setWsfsName(String wsfsName) {
        this.wsfsName = wsfsName;
    }

    public Integer getWsfsCode() {
        return wsfsCode;
    }

    public void setWsfsCode(Integer wsfsCode) {
        this.wsfsCode = wsfsCode;
    }
}
