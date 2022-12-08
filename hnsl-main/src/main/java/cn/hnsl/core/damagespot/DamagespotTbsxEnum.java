package cn.hnsl.core.damagespot;

public enum DamagespotTbsxEnum {
    WKK("尾矿库", "WKK"),
    TXK("塌陷坑", "TXK"),
    QTTBSX("其他", "QTTBSX"),
    GYCD("工业场地（堆煤场、矿石堆、井口/硐口、选矿场等）", "GYCD"),
    GTDQDC("固体废弃物堆场（煤矸石堆、废石堆、排土场等）", "GTDQDC"),
    LTCC("露天采场", "LTCC"),
    KSJZ("矿山建筑", "KSJZ");
    // 成员变量
    private String tbsxName;
    private String tbsxCode;

    // 构造方法
    private DamagespotTbsxEnum(String name, String index) {
        this.tbsxName = name;
        this.tbsxCode = index;
    }

    // 普通方法
    public static String getTbsx(String name) {
        for (DamagespotTbsxEnum c : DamagespotTbsxEnum.values()) {
            if (c.getTbsxName() == name) {
                return c.tbsxCode;
            }
        }
        return null;
    }

    public String getTbsxName() {
        return tbsxName;
    }

    public void setTbsxName(String tbsxName) {
        this.tbsxName = tbsxName;
    }

    public String getTbsxCode() {
        return tbsxCode;
    }

    public void setTbsxCode(String tbsxCode) {
        this.tbsxCode = tbsxCode;
    }
}
