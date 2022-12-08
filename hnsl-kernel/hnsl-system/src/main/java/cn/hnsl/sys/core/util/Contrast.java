
package cn.hnsl.sys.core.util;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.Map;

/**
 * 对比两个对象的变化的工具类
 *
 * @author fengshuonan
 * @Date 2017/3/31 10:36
 */
public class Contrast {

    //记录每个修改字段的分隔符
    public static final String separator = "==>";

    /**
     * 比较两个对象pojo1和pojo2,并输出不一致信息
     *
     * @author spot
     * @Date 2017/5/9 19:34
     */
    public static String contrastObj(String key, Object pojo1, Map<String, String> pojo2) throws IllegalAccessException, InstantiationException {

        String str = parseMutiKey(key, pojo2) + separator;
        try {
            Class clazz = pojo1.getClass();
            Field[] fields = pojo1.getClass().getDeclaredFields();
            int i = 1;
            for (Field field : fields) {
                if ("serialVersionUID".equals(field.getName())) {
                    continue;
                }
                PropertyDescriptor pd = new PropertyDescriptor(field.getName(), clazz);
                Method getMethod = pd.getReadMethod();
                Object o1 = getMethod.invoke(pojo1);
                Object o2 = pojo2.get(StrUtil.lowerFirst(getMethod.getName().substring(3)));
                if (o1 == null || o2 == null) {
                    continue;
                }
                if (o1 instanceof Date) {
                    o1 = DateUtil.formatDate((Date) o1);
                } else if (o1 instanceof Integer) {
                    o2 = Integer.parseInt(o2.toString());
                }
                if (!o1.toString().equals(o2.toString())) {
                    if (i != 1) {
                        str += separator;
                    }
                    str += "字段:" + field.getName() + ",旧值:" + o1 + ",新值:" + o2;
                    i++;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return str;
    }

    /**
     * 解析多个key(逗号隔开的)
     *
     * @author spot
     * @Date 2017/5/16 22:19
     */
    public static String parseMutiKey(String key, Map<String, String> requests) {
        String value = requests.get(key);
        return key + "=" + value;
    }

}
