package cn.hnsl.core.util;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.date.DateUtil;

/**
 * 政区工具类
 *
 * @author Administrator
 */
public class RegionUtil {

    /**
     * 根据政区编码获取当前政区级别
     *
     * @param regionCode
     * @return
     */
    public static Integer getGradeByCode(String regionCode) {
        Integer grade = 1;
        if (regionCode.endsWith("0000000000")) {
            grade = 1;
        } else if (regionCode.endsWith("00000000")) {
            grade = 2;
        } else if (regionCode.endsWith("000000")) {
            grade = 3;
        } else if (regionCode.endsWith("000")) {
            grade = 4;
        } else {
            if (regionCode.length() == 12) {
                grade = 5;
            } else {
                grade = 5;
            }
        }

        if (regionCode.equals("419001000000")) {
            return 2;
        }

        return grade;
    }

    public static Boolean vildCode(String regionCode, Integer grade) {
        Boolean isGood = true;
        if (grade == 1) {
            isGood = regionCode.endsWith("0000000000");
        } else if (grade == 2) {
            isGood = regionCode.endsWith("00000000");
        } else if (grade == 3) {
            isGood = regionCode.endsWith("000000");
        } else if (grade == 4) {
            isGood = regionCode.endsWith("000");
        }

        return isGood;
    }

    public static Integer getEndIndex(String regionCode) {
        Integer endIndex = 0;
        if (regionCode.endsWith("0000000000")) {
            endIndex = 2;
        } else if (regionCode.endsWith("00000000")) {
            endIndex = 4;
        } else if (regionCode.endsWith("000000")) {
            endIndex = 6;
        } else if (regionCode.endsWith("000")) {
            endIndex = 9;
        } else {
            if (regionCode.length() == 12) {
                endIndex = 12;
            } else {
                endIndex = regionCode.length();
            }
        }
        return endIndex;
    }

    /**
     * 获取政区的缩写Code
     *
     * @param regionCode
     * @return
     */
    public static String genAbbrCode(String regionCode) {
        if (ToolUtil.isEmpty(regionCode)) {
            return null;
        }
        return regionCode.substring(0, getEndIndex(regionCode));
    }

    public static Integer genSort(String code1, String code2) {
        try {
            Integer index1 = getEndIndex(code1);
            Integer index2 = getEndIndex(code2);
            Integer index;
            if (index1 > index2) {
                index = index1;
            } else {
                index = index2;
            }
            return Math.abs(Convert.toInt(Convert.toLong(code1.substring(0, index)) - Convert.toLong(code2.substring(0, index))));
        } catch (Exception e) {
            return 0;
        }

    }


    public static String complateCodeByScode(String sCode) {
        if (sCode == null || sCode.length() > 12) {
            return sCode;
        }

        StringBuilder str = new StringBuilder(12);
        for (int i = 0; i < 12; i++) {
            str.append("0");
        }

        sCode = sCode + str;
        sCode = sCode.substring(0, 12);
        return sCode;
    }

    public static Integer getSubEndIndex(String regionCode) {
        Integer endIndex = 0;
        if (regionCode.endsWith("0000000000")) {
            endIndex = 4;
        } else if (regionCode.endsWith("00000000")) {
            endIndex = 6;
        } else if (regionCode.endsWith("000000")) {
            endIndex = 9;
        } else if (regionCode.endsWith("000")) {
            endIndex = 12;
        }

        if (regionCode.equals("419001000000") || regionCode.equals("419000000000")) {
            endIndex = 9;
        }
        return endIndex;
    }

    public static Integer getSub3EndIndex(String regionCode) {
        Integer endIndex = 0;
        if (regionCode.endsWith("0000000000")) {
            endIndex = 6;
        } else if (regionCode.endsWith("00000000")) {
            endIndex = 9;
        } else if (regionCode.endsWith("000000")) {
            endIndex = 12;
        } else if (regionCode.endsWith("000")) {
            endIndex = 12;
        }
        return endIndex;
    }

    /**
     * 根据code获取对应级别政区编码
     *
     * @param regionCode
     * @param grade
     * @return
     */
    public static String getPCodeByGrade(String regionCode, Integer grade) {
        String code = regionCode;
        if (grade == 1) {
            code = regionCode.substring(0, 2) + "0000000000";
        } else if (grade == 2) {
            if (regionCode.startsWith("4190")) {
                code = "419001000000";
            } else {
                code = regionCode.substring(0, 4) + "00000000";
            }
        } else if (grade == 3) {
            if (regionCode.startsWith("4190")) {
                code = "419001000000";
            } else {
                code = regionCode.substring(0, 6) + "000000";
            }
        } else if (grade == 4) {
            code = regionCode.substring(0, 9) + "000";
        } else {
            code = regionCode;
        }
        return code;
    }

    public static String getUpCode(String regionCode) {
        String code = complateCodeByScode(genAbbrCode(regionCode));
        return code;
    }

    public static String countryCode(String regionCode) {
        return regionCode.substring(0, 6) + "000000";
    }

    public static String getsCodeByGrade(String regionCode, Integer grade) {
        String code = regionCode;
        if (grade == 1) {
            code = regionCode.substring(0, 2);
        } else if (grade == 2) {
            code = regionCode.substring(0, 4);
        } else if (grade == 3) {
            code = regionCode.substring(0, 6);
        } else if (grade == 4) {
            code = regionCode.substring(0, 9);
        } else if (grade == 0) {
            code = "";
        } else {
            code = regionCode;
        }
        return code;
    }

    /**
     * 根据政区级别获取编码中的对应的代码
     *
     * @param grade
     * @return
     */
    public static Integer getSubByGrade(String code, String grade) {
        Integer nCode = 0;
        switch (grade) {
            case "1":
                nCode = Convert.toInt(code.substring(0, 2));
                break;
            case "2":
                nCode = Convert.toInt(code.substring(2, 4));
                break;
            case "3":
                nCode = Convert.toInt(code.substring(4, 6));
                break;
            case "4":
                nCode = Convert.toInt(code.substring(6, 9));
                break;
            default:
                nCode = Convert.toInt(code.substring(9, 12));
                break;
        }
        return nCode;
    }

    /**
     * 根据政区级别获取编码中的对应的代码
     *
     * @param pCode 父及编号
     * @param grade 政区级别
     * @return
     */
    public static String buildNewRegionCode(String pCode, String grade) {
        return buildNewRegionCode(pCode, grade, null);
    }

    /**
     * 根据政区级别获取编码中的对应的代码
     *
     * @param pCode 父及编号
     * @param grade 政区级别
     * @return
     */
    public static String buildNewRegionCode(String pCode, String grade, Integer nSubCode) {
        String sCode;
        switch (grade) {
            case "1":
                sCode = "410000000000";
                break;
            case "2":
                if (nSubCode == null) {
                    nSubCode = 99;
                }
                sCode = pCode.substring(0, 2) + nSubCode + "00000000";
                break;
            case "3":
                if (nSubCode == null) {
                    nSubCode = 99;
                }
                sCode = pCode.substring(0, 4) + nSubCode + "000000";
                break;
            case "4":
                if (nSubCode == null) {
                    nSubCode = 999;
                }
                sCode = pCode.substring(0, 6) + nSubCode + "000";
                break;
            default:
                if (nSubCode == null) {
                    nSubCode = 999;
                }
                sCode = pCode.substring(0, 9) + nSubCode;
                break;
        }
        return sCode;
    }

    public static void main(String[] args) {
        String time = "2020-11-01 14:00:00";
        System.out.printf(DateUtil.offsetHour(DateUtil.parseDateTime(time),1).toString());


    }
}
