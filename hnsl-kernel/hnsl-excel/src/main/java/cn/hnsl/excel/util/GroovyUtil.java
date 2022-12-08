package cn.hnsl.excel.util;

import groovy.lang.GroovyClassLoader;
import groovy.lang.GroovyShell;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Method;

/**
 * 动态执行工具类
 *
 * @author fengshuonan
 * @Date 2019/12/29 16:24
 */
public class GroovyUtil {

    private static Logger log = LoggerFactory.getLogger(GroovyUtil.class);

    /**
     * 将groovyText转换成class
     *
     * @author fengshuonan
     * @Date 2019/12/29 16:24
     */
    public static Class<?> textToClass(String groovyText) {
        GroovyClassLoader groovyClassLoader = new GroovyClassLoader();
        return (Class<?>) groovyClassLoader.parseClass(groovyText);
    }

    /**
     * 执行java语句
     *
     * @author fengshuonan
     * @Date 2019/12/29 16:24
     */
    public static Object executeShell(String groovyText) {
        GroovyShell shell = new GroovyShell();
        return shell.evaluate(groovyText);
    }

    /**
     * 将groovyText转换成class，并执行某个方法
     *
     * @author fengshuonan
     * @Date 2019/12/29 16:24
     */
    public static Object executeClassMethod(String groovyText, String method, Class<?>[] parameterTypes, Object[] args) {
        try {
            Class<?> clazz = GroovyUtil.textToClass(groovyText);
            Method clazzMethod = clazz.getMethod(method, parameterTypes);
            Object obj = clazz.newInstance();
            return clazzMethod.invoke(obj, args);
        } catch (Exception e) {
            log.error("执行groovy类中方法出错！", e);
            return null;
        }
    }

}
