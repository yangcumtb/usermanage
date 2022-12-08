package cn.hnsl.sys.core.tag;

import cn.hnsl.sys.modular.system.entity.Dict;
import cn.hnsl.sys.modular.system.entity.DictType;
import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.List;

/**
 * radio字典组件
 *
 * @author liuhanqing
 * @date 2021/1/16 19:59
 */
@Slf4j
public class SysDictRadioTag extends SysDictBaseTag {
    @Override
    public void render() {
        // 初始属性
        initAttr();
        StringBuilder sb = new StringBuilder();
        // 当字典类型编码不为空
        if (StrUtil.isNotBlank(this.getDictTypeCode())) {
            // 根据字典类型编码去查询字典类型
            DictType dictType = getDictType();
            // 判断字典类型不为空
            if (dictType != null) {
                List<Dict> lst = getDictList();
                // 默认选中值
                String defaultValue = this.getDefaultValue();
                int index = 0;
                for (Dict option : lst) {
                    // 生成input的id
                    String id = this.getType() + "_" + this.getName() + "_" + option.getCode();
                    // 拼接html
                    sb.append(" <input type='radio' name='").append(this.getName())
                            .append("' id='").append(id)
                            .append("' title='").append(option.getName())
                            .append("' value='").append(option.getCode())
                            .append("'");

                    // layui 元素的风格
                    if (StrUtil.isNotBlank(this.getLaySkin())) {
                        sb.append(" lay-skin='").append(this.getLaySkin()).append("'");
                    }
                    // layui 事件过滤器
                    if (StrUtil.isNotBlank(this.getLayFilter())) {
                        sb.append(" lay-filter='").append(this.getLayFilter()).append("'");
                    }
                    // layui 表单验证
                    if (StrUtil.isNotBlank(this.getLayVerify())) {
                        sb.append(" lay-verify='").append(this.getLayVerify()).append("'");
                    }
                    // 默认选中值
                    if (StrUtil.isNotBlank(defaultValue) && defaultValue.equals(option.getCode())) {
                        sb.append(" checked ");
                    } else {
                        // 无默认值选中第一个（忘了为什么设计先保留逻辑）
                        if (index == 0) {
                            sb.append(" checked ");
                        }
                    }

                    sb.append(" /> ");
                    index++;
                }
            }
        }
        try {
            this.ctx.byteWriter.writeString(sb.toString());
        } catch (IOException e) {
            log.error("select字典初始化异常：", e);
        }
    }
}
