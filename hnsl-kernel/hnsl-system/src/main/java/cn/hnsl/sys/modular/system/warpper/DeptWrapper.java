
package cn.hnsl.sys.modular.system.warpper;

import cn.hnsl.sys.core.constant.factory.ConstantFactory;
import cn.hnsl.sys.core.util.DecimalUtil;
import cn.hnsl.core.base.warpper.BaseControllerWrapper;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.page.PageResult;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import java.util.List;
import java.util.Map;

/**
 * 部门列表的包装
 *
 * @author fengshuonan
 * @date 2017年4月25日 18:10:31
 */
public class DeptWrapper extends BaseControllerWrapper {

    public DeptWrapper(Map<String, Object> single) {
        super(single);
    }

    public DeptWrapper(List<Map<String, Object>> multi) {
        super(multi);
    }

    public DeptWrapper(Page<Map<String, Object>> page) {
        super(page);
    }

    public DeptWrapper(PageResult<Map<String, Object>> pageResult) {
        super(pageResult);
    }

    @Override
    protected void wrapTheMap(Map<String, Object> map) {
        Long pid = DecimalUtil.getLong(map.get("pid"));

        if (ToolUtil.isEmpty(pid) || pid.equals(0L)) {
            map.put("pName", "--");
        } else {
            map.put("pName", ConstantFactory.me().getDeptName(pid));
        }
    }
}
