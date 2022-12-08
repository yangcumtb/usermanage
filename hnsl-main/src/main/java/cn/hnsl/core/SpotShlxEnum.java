package cn.hnsl.core;


public enum SpotShlxEnum {
    WS("挖损", "WS"),
    YZ("压占", "YZ"),
    TX("塌陷", "TX");
    // 成员变量
    private String shlxName;
    private String shlxCode;

    // 构造方法
    private SpotShlxEnum(String name, String index) {
        this.shlxName = name;
        this.shlxCode = index;
    }

    // 普通方法
    public static String getTbtype(String name) {
        for (SpotShlxEnum c : SpotShlxEnum.values()) {
            if (c.getShlxName() == name) {
                return c.shlxCode;
            }
        }
        return null;
    }

    public String getShlxName() {
        return shlxName;
    }

    public void setShlxName(String shlxName) {
        this.shlxName = shlxName;
    }

    public String getShlxCode() {
        return shlxCode;
    }

    public void setShlxCode(String shlxCode) {
        this.shlxCode = shlxCode;
    }
}
