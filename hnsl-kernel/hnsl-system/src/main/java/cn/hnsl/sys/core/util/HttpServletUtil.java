
package cn.hnsl.sys.core.util;


import cn.hnsl.model.exception.ServiceException;
import cn.hutool.core.net.NetUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.extra.servlet.ServletUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpUtil;
import cn.hutool.http.useragent.UserAgent;
import cn.hutool.http.useragent.UserAgentUtil;
import com.alibaba.fastjson.JSONPath;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * HttpServlet工具类，获取当前request和response
 *
 * @author xuyuxiang
 * @date 2020/3/30 15:09
 */
public class HttpServletUtil {

    /**
     * 本机ip地址
     */
    private static final String LOCAL_IP = "127.0.0.1";

    /**
     * 本机ip地址的ipv6地址
     */
    private static final String LOCAL_REMOTE_HOST = "0:0:0:0:0:0:0:1";

    /**
     * 获取用户浏览器信息的http请求header
     */
    private static final String USER_AGENT_HTTP_HEADER = "User-Agent";

    /**
     * 获取当前请求的request对象
     *
     * @author fengshuonan
     * @date 2020/10/15 17:48
     */
    public static HttpServletRequest getRequest() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (requestAttributes == null) {
            throw new ServiceException("1", "当前请求参数为空或数据缺失，请联系管理员");
        } else {
            return requestAttributes.getRequest();
        }
    }

    /**
     * 获取当前请求的response对象
     *
     * @author fengshuonan
     * @date 2020/10/15 17:48
     */
    public static HttpServletResponse getResponse() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (requestAttributes == null) {
            throw new ServiceException("1", "当前请求参数为空或数据缺失，请联系管理员");
        } else {
            return requestAttributes.getResponse();
        }
    }

    /**
     * 获取客户端ip
     * <p>
     * 如果获取不到或者获取到的是ipv6地址，都返回127.0.0.1
     *
     * @author fengshuonan
     * @date 2020/10/26 14:09
     */
    public static String getRequestClientIp(HttpServletRequest request) {
        if (ObjectUtil.isEmpty(request)) {
            return LOCAL_IP;
        } else {
            String remoteHost = ServletUtil.getClientIP(request);
            return LOCAL_REMOTE_HOST.equals(remoteHost) ? LOCAL_IP : remoteHost;
        }
    }

    /**
     * 根据http请求的client ip定位城市等信息
     *
     * @param request      http请求封装
     * @param ipGeoApi     阿里云ip定位api接口
     * @param ipGeoAppCode 阿里云ip定位appCode
     * @author fengshuonan
     * @date 2020/10/26 14:10
     */
    @SuppressWarnings("unchecked")
    public static String calcClientIpAddress(HttpServletRequest request, String ipGeoApi, String ipGeoAppCode) {

        // 如果获取不到，返回 "-"
        String resultJson = "-";

        // 请求阿里云定位接口需要传的header的名称
        String requestApiHeader = "Authorization";

        // 获取客户端的ip地址
        String ip = getRequestClientIp(request);

        // 如果是本地ip或局域网ip，则直接不查询
        if (ObjectUtil.isEmpty(ip) || NetUtil.isInnerIP(ip)) {
            return resultJson;
        }

        // 判断定位api和appCode是否为空
        if (ObjectUtil.hasEmpty(ipGeoApi, ipGeoAppCode)) {
            return resultJson;
        }

        try {
            if (ObjectUtil.isAllNotEmpty(ipGeoApi, ipGeoAppCode)) {
                String jsonPath = "$['data']['country','region','city','isp']";
                String appCodeSymbol = "APPCODE";
                HttpRequest http = HttpUtil.createGet(String.format(ipGeoApi, ip));
                http.header(requestApiHeader, appCodeSymbol + " " + ipGeoAppCode);
                resultJson = http.timeout(3000).execute().body();
                resultJson = String.join("", (List<String>) JSONPath.read(resultJson, jsonPath));
            }
        } catch (Exception e) {

        }
        return resultJson;
    }

    /**
     * 根据http请求获取UserAgent信息
     * <p>
     * UserAgent信息包含浏览器的版本，客户端操作系统等信息
     * <p>
     * 没有相关header被解析，则返回null
     *
     * @author fengshuonan
     * @date 2020/10/28 9:14
     */
    public static UserAgent getUserAgent(HttpServletRequest request) {

        // 获取http header的内容
        String userAgentStr = ServletUtil.getHeaderIgnoreCase(request, USER_AGENT_HTTP_HEADER);

        // 如果http header内容不为空，则解析这个字符串获取UserAgent对象
        if (ObjectUtil.isNotEmpty(userAgentStr)) {
            return UserAgentUtil.parse(userAgentStr);
        } else {
            return null;
        }
    }

    /**
     * 判断当前请求是否是普通请求
     * <p>
     * 定义：普通请求为网页请求，Accept中包含类似text/html的标识
     *
     * @return ture-是普通请求
     * @author fengshuonan
     * @date 2021/2/22 22:37
     */
    public static Boolean getNormalRequestFlag(HttpServletRequest request) {
        return request.getHeader("Accept") == null
                || request.getHeader("Accept").toLowerCase().contains("text/html");
    }

    /**
     * 判断当前请求是否是json请求
     * <p>
     * 定义：json请求为网页请求，Accept中包含类似 application/json 的标识
     *
     * @return ture-是json请求
     * @author fengshuonan
     * @date 2021/2/22 22:37
     */
    public static Boolean getJsonRequestFlag(HttpServletRequest request) {
        return request.getHeader("Accept") == null
                || request.getHeader("Accept").toLowerCase().contains("application/json");
    }
}
