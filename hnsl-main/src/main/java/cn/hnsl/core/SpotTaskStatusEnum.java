package cn.hnsl.core;

public enum SpotTaskStatusEnum {
    ToBeAssigned("待分配", 1), Assigned("已分配", 2), OutSideChecking("外业核查中", 3), OutSideCheceked("外业核查完毕", 4), CompleteInsideCheck("县级审核完毕", 5);
    // 成员变量
    private String tbhcStatusName;
    private Integer tbhcStatusCode;
    // 构造方法
    private SpotTaskStatusEnum(String name, int index) {
        this.tbhcStatusName = name;
        this.tbhcStatusCode = index;
    }
    // 普通方法
    public static Integer getTbtype(String name) {
        for (SpotTaskStatusEnum c : SpotTaskStatusEnum.values()) {
            if (c.getTbhcStatusName() == name) {
                return c.tbhcStatusCode;
            }
        }
        return null;
    }

    private String getTbhcStatusName() {
        return tbhcStatusName;
    }

    public void setTbhcStatusName(String tbhcStatusName) {
        this.tbhcStatusName = tbhcStatusName;
    }

    public Integer getTbhcStatusCode() {
        return tbhcStatusCode;
    }

    public void setTbhcStatusCode(Integer tbhcStatusCode) {
        this.tbhcStatusCode = tbhcStatusCode;
    }
}
