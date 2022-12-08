package cn.hnsl.core.constant.state;

/**
 * 组织结构类型的枚举
 *
 * @author fengshuonan
 * @date 2017年6月1日22:50:11
 */
public enum SeqType {

    PATROL(1, "XH"),
    EVENT_PATROL(2, "WT"),
    EVENT_COMPLAINT(3, "TS"),
    EVENT_FOUR_CHAOS(4, "SL");

    int code;
    String message;

    SeqType(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static String valueOf(Integer status) {
        if (status == null) {
            return "";
        } else {
            for (SeqType s : SeqType.values()) {
                if (s.getCode() == status) {
                    return s.getMessage();
                }
            }
            return "";
        }
    }
}
