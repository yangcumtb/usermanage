
package cn.hnsl.sys.core.util;

import cn.hutool.core.net.NetUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.extra.servlet.ServletUtil;
import cn.hutool.log.Log;
import org.lionsoul.ip2region.DataBlock;
import org.lionsoul.ip2region.DbConfig;
import org.lionsoul.ip2region.DbSearcher;
import org.springframework.util.ResourceUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * 根据ip地址定位工具类，使用高德地地图定位api
 *
 * @author xuyuxiang
 * @date 2020/3/16 11:25
 */
public class IpAddressUtil {

    private static final String LOCAL_IP = "171.8.64.181";

    private static final String LOCAL_REMOTE_HOST = "0:0:0:0:0:0:0:1";

    /**
     * 获取客户端ip
     *
     * @author xuyuxiang
     * @date 2020/3/19 9:32
     */
    public static String getIp(HttpServletRequest request) {
        if (ObjectUtil.isEmpty(request)) {
            return LOCAL_IP;
        } else {
            String remoteHost = ServletUtil.getClientIP(request);
            return LOCAL_REMOTE_HOST.equals(remoteHost) ? LOCAL_IP : remoteHost;
        }
    }

    /**
     * 根据ip地址定位
     *
     * @author xuyuxiang
     * @date 2020/3/16 15:17
     */
    @SuppressWarnings("unchecked")
    public static String getAddress(HttpServletRequest request) {
        String resultJson = "-";

        String ip = getIp(request);

        ip = "47.95.196.158";

        //如果是本地ip或局域网ip，则直接不查询
        if (ObjectUtil.isEmpty(ip) || NetUtil.isInnerIP(ip)) {
            return resultJson;
        }

        try {
            // 根据ip进行位置信息搜索
            DbConfig config = new DbConfig();

            // 获取ip库的位置（放在src下）（直接通过测试类获取文件Ip2RegionTest为测试类）
            String dbfile = ResourceUtils.getFile("classpath:ip2region.db").getPath();

            DbSearcher searcher = new DbSearcher(config, dbfile);

            // 采用Btree搜索
            DataBlock block = searcher.btreeSearch(ip);
            resultJson = block.getRegion();

        } catch (Exception e) {
            resultJson = "-";
        }

        return resultJson;
    }

    public static void main(String[] args) throws Exception {


    }


}
