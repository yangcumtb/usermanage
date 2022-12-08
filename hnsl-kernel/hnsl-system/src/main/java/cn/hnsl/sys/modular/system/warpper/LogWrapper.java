
package cn.hnsl.sys.modular.system.warpper;

import cn.hnsl.base.db.util.ClobUtil;
import cn.hnsl.sys.core.constant.factory.ConstantFactory;
import cn.hnsl.sys.core.util.Contrast;
import cn.hnsl.sys.core.util.DecimalUtil;
import cn.hnsl.core.base.warpper.BaseControllerWrapper;
import cn.hnsl.core.util.ToolUtil;
import com.alibaba.druid.proxy.jdbc.ClobProxyImpl;

import java.util.List;
import java.util.Map;

/**
 * 日志列表的包装类
 *
 * @author fengshuonan
 * @date 2017年4月5日22:56:24
 */
public class LogWrapper extends BaseControllerWrapper {

    public LogWrapper(Map<String, Object> single) {
        super(single);
    }

    public LogWrapper(List<Map<String, Object>> multi) {
        super(multi);
    }

    @Override
    protected void wrapTheMap(Map<String, Object> map) {

        String message = "";

        Object messageObj = map.get("message");
        if (messageObj instanceof ClobProxyImpl) {
            ClobProxyImpl clobProxy = (ClobProxyImpl) messageObj;
            message = ClobUtil.clobToString(clobProxy.getRawClob());
        } else {
            message = (String) messageObj;
        }


        //如果信息过长,则只截取前100位字符串
        if (ToolUtil.isNotEmpty(message) && message.length() >= 100) {
            String subMessage = message.substring(0, 100) + "...";
            map.put("message", subMessage);
        }

        //如果信息中包含分割符号;;;   则分割字符串返给前台
        if (ToolUtil.isNotEmpty(message) && message.contains(Contrast.separator)) {
            String[] msgs = message.split(Contrast.separator);
            map.put("regularMessage", msgs);
        } else {
            map.put("regularMessage", message);
        }
    }
}
