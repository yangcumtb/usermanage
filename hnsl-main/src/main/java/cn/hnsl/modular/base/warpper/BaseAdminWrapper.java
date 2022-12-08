
package cn.hnsl.modular.base.warpper;

import cn.hnsl.core.base.warpper.BaseControllerWrapper;
import cn.hnsl.model.page.PageResult;
import cn.hnsl.sys.core.constant.factory.ConstantFactory;
import cn.hnsl.sys.modular.message.core.enums.MessageBusinessTypeEnum;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

/**
 * 部门列表的包装
 *
 * @author fengshuonan
 * @date 2017年4月25日 18:10:31
 */
public class BaseAdminWrapper extends BaseControllerWrapper {

    public BaseAdminWrapper(Map<String, Object> single) {
        super(single);
    }

    public BaseAdminWrapper(List<Map<String, Object>> multi) {
        super(multi);
    }

    public BaseAdminWrapper(Page<Map<String, Object>> page) {
        super(page);
    }

    public BaseAdminWrapper(PageResult<Map<String, Object>> pageResult) {
        super(pageResult);
    }

    @Override
    protected void wrapTheMap(Map<String, Object> map) {
        //河流级别
        map.put("gradeName", getGradeName(String.valueOf(map.get("adGrad"))));
    }

    public String getGradeName(String adGrad) {
        AtomicReference<String> value = new AtomicReference<>("");
        Optional.ofNullable(adGrad).ifPresent(val -> {
            value.set(MessageBusinessTypeEnum.getName(adGrad));
        });
        return value.get();
    }
}
