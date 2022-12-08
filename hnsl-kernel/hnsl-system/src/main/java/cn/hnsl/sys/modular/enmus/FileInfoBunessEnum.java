package cn.hnsl.sys.modular.enmus;

public enum FileInfoBunessEnum {
    TBYX("图斑影像", 1),
    YWHC("核查", 2),
    GHT("规划", 3),
    PSFA("评审方案", 4),
    PSYJ("评审意见", 5);

    // 成员变量
    private String buniessName;
    private Integer buniessType;

    // 构造方法
    private FileInfoBunessEnum(String buniessName, int buniessType) {
        this.buniessName = buniessName;
        this.buniessType = buniessType;
    }

    // 普通方法
    public static Integer getBuniesstype(String name) {
        for (FileInfoBunessEnum c : FileInfoBunessEnum.values()) {
            if (c.getBuniessName() == name) {
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

    public Integer getBuniesstype() {
        return buniessType;
    }

    public void setBuniessType(Integer buniessType) {
        this.buniessType = buniessType;
    }
}
