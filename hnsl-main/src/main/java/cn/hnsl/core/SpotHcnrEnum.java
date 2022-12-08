package cn.hnsl.core;

public enum SpotHcnrEnum {
    SH("损毁", 1), XF("修复", 2), ZLZ("治理中", 3), RSSTATE("遥感图斑实际情况", 4);
    // 成员变量
    private String hcnrName;
    private Integer hcnrCode;

    // 构造方法
    private SpotHcnrEnum(String name, int index) {
        this.hcnrName = name;
        this.hcnrCode = index;
    }

    // 普通方法
    public static Integer getHcnr(String name) {
        for (SpotHcnrEnum c : SpotHcnrEnum.values()) {
            if (c.getHcnrName() == name) {
                return c.hcnrCode;
            }
        }
        return null;
    }

    private String getHcnrName() {
        return hcnrName;
    }

    public void setHcnrName(String hcnrName) {
        this.hcnrName = hcnrName;
    }

    public Integer getHcnrCode() {
        return hcnrCode;
    }

    public void setHcnrCode(Integer hcnrCode) {
        this.hcnrCode = hcnrCode;
    }
}
