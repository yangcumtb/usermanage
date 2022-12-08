
package cn.hnsl.sys.core.beetl;

import cn.hnsl.base.auth.context.LoginContext;
import cn.hnsl.base.consts.ConstantsContext;
import cn.hnsl.sys.core.tag.DictSelectorTag;
import cn.hnsl.sys.core.tag.SysDictCheckBoxTag;
import cn.hnsl.sys.core.tag.SysDictRadioTag;
import cn.hnsl.sys.core.tag.SysDictSelectTag;
import cn.hutool.core.util.NumberUtil;
import cn.hnsl.core.util.ToolUtil;
import org.beetl.ext.spring.BeetlGroupUtilConfiguration;
import javax.annotation.Resource;

/**
 * beetl拓展配置,绑定一些工具类,方便在模板中直接调用
 *
 * @author spot
 * @Date 2018/2/22 21:03
 */
public class BeetlConfiguration extends BeetlGroupUtilConfiguration {

    @Resource
    private DictSelectorTag dictSelectorTag;

    private LoginContext loginContext;

    public BeetlConfiguration(LoginContext loginContext) {
        this.loginContext = loginContext;
    }

    @Override
    public void initOther() {
        groupTemplate.registerFunctionPackage("shiro", loginContext);
        groupTemplate.registerFunctionPackage("tool", new ToolUtil());
        groupTemplate.registerFunctionPackage("constants", new ConstantsContext());
        groupTemplate.registerFunctionPackage("numberUtil", new NumberUtil());
        //封装标签
        groupTemplate.registerTagFactory("dictSelector", () -> dictSelectorTag);

        // 下拉选字典
        groupTemplate.registerTag("dict_select", SysDictSelectTag.class);

        // 单选字典
        groupTemplate.registerTag("dict_radio", SysDictRadioTag.class);

        // 多选字典
        groupTemplate.registerTag("dict_checkbox", SysDictCheckBoxTag.class);
    }
}
