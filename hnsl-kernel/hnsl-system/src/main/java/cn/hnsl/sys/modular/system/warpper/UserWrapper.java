
package cn.hnsl.sys.modular.system.warpper;

import cn.hnsl.sys.core.constant.factory.ConstantFactory;
import cn.hnsl.sys.core.util.DecimalUtil;
import cn.hnsl.core.base.warpper.BaseControllerWrapper;
import cn.hnsl.model.page.PageResult;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import java.util.List;
import java.util.Map;

/**
 * 用户管理的包装类
 *
 * @author fengshuonan
 * @date 2017年2月13日 下午10:47:03
 */
public class UserWrapper extends BaseControllerWrapper {

    public UserWrapper(Map<String, Object> single) {
        super(single);
    }

    public UserWrapper(List<Map<String, Object>> multi) {
        super(multi);
    }

    public UserWrapper(Page<Map<String, Object>> page) {
        super(page);
    }

    public UserWrapper(PageResult<Map<String, Object>> pageResult) {
        super(pageResult);
    }

    @Override
    protected void wrapTheMap(Map<String, Object> map) {
        map.put("sexName", ConstantFactory.me().getSexName((String) map.get("sex")));
        map.put("deptName", ConstantFactory.me().getDeptName(DecimalUtil.getLong(map.get("deptId"))));
        map.put("statusName", ConstantFactory.me().getStatusName((String) map.get("status")));
        map.put("positionName", ConstantFactory.me().getPositionName(DecimalUtil.getLong(map.get("userId"))));
    }

}
