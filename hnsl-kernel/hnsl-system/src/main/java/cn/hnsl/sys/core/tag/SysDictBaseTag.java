package cn.hnsl.sys.core.tag;

import cn.hnsl.model.enums.YesOrNotEnum;
import cn.hnsl.sys.core.beetl.DictTagConstants;
import cn.hnsl.sys.modular.system.entity.Dict;
import cn.hnsl.sys.modular.system.entity.DictType;
import cn.hnsl.sys.modular.system.service.DictService;
import cn.hnsl.sys.modular.system.service.DictTypeService;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.extra.spring.SpringUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.beetl.core.GeneralVarTagBinding;

import java.util.List;
import java.util.Map;

/**
 * beetl字典标签基类
 *
 * @author liuhanqing
 * @date 2021/1/16 18:45
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SysDictBaseTag extends GeneralVarTagBinding {

    public DictService dictService = SpringUtil.getBean(DictService.class);

    public DictTypeService dictTypeService = SpringUtil.getBean(DictTypeService.class);

    /**
     * html组件 id
     */
    public String id;

    /**
     * html组件 name
     */
    public String name;

    /**
     * html组件 type
     */
    public String type;

    /**
     * 字典类型编码
     */
    public String dictTypeCode;

    /**
     * layui元素的风格
     */
    public String laySkin;

    /**
     * layui事件过滤器
     */
    public String layFilter;

    /**
     * layui校验
     */
    public String layVerify;

    /**
     * select控件提示name
     */
    public String headName;

    /**
     * select控件提示value
     */
    public String headValue;

    /**
     * select控件提示类型：：1-全部，2-请选择
     */
    public String headType;

    /**
     * 默认值
     */
    public String defaultValue;

    /**
     * 工作流相关
     */
    public String workflowForm;

    /**
     * 工作流相关
     */
    public String itemName;

    /**
     * 初始化绑定属性
     *
     * @author liuhanqing
     * @date 2021/1/16 23:49
     */
    public void initAttr() {
        Map<String, Object> attrs = this.getAttributes();
        if (attrs.size() > 0) {
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.ID))) {
                this.setId(attrs.get(DictTagConstants.ID).toString());
            }
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.NAME))) {
                this.setName(attrs.get(DictTagConstants.NAME).toString());
            }
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.TYPE))) {
                this.setType(attrs.get(DictTagConstants.TYPE).toString());
            }
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.DICT_TYPE_CODE))) {
                this.setDictTypeCode(attrs.get(DictTagConstants.DICT_TYPE_CODE).toString());
            }
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.LAY_SKIN))) {
                this.setLaySkin(attrs.get(DictTagConstants.LAY_SKIN).toString());
            }
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.LAY_FILTER))) {
                this.setLayFilter(attrs.get(DictTagConstants.LAY_FILTER).toString());
            }
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.LAY_VERIFY))) {
                this.setLayVerify(attrs.get(DictTagConstants.LAY_VERIFY).toString());
            }
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.HEAD_NAME))) {
                this.setHeadName(attrs.get(DictTagConstants.HEAD_NAME).toString());
            }
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.HEAD_VALUE))) {
                this.setHeadValue(attrs.get(DictTagConstants.HEAD_VALUE).toString());
            }
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.HEAD_TYPE))) {
                this.setHeadType(attrs.get(DictTagConstants.HEAD_TYPE).toString());
            }
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.DEFAULT_VALUE))) {
                this.setDefaultValue(attrs.get(DictTagConstants.DEFAULT_VALUE).toString());
            }
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.WORKFLOW_FORM))) {
                this.setWorkflowForm(attrs.get(DictTagConstants.WORKFLOW_FORM).toString());
            }
            if (ObjectUtil.isNotNull(attrs.get(DictTagConstants.ITEM_NAME))) {
                this.setItemName(attrs.get(DictTagConstants.ITEM_NAME).toString());
            }
        }
    }

    @Override
    public void render() {

    }

    /**
     * 获取字典类型
     *
     * @return 字典类型
     * @author liuhanqing
     * @date 2021/1/16 23:46
     */
    public DictType getDictType() {
        // 根据字典类型编码去查询字典类型
        LambdaQueryWrapper<DictType> dictTypeQueryWrapper = new LambdaQueryWrapper<>();
        dictTypeQueryWrapper.eq(DictType::getCode, this.getDictTypeCode());
        dictTypeQueryWrapper.eq(DictType::getStatus, "ENABLE");
        return dictTypeService.getOne(dictTypeQueryWrapper);
    }

    /**
     * @return 根据字典类型返回字典集合
     * @author liuhanqing
     * @date 2021/1/16 23:46
     */
    public List<Dict> getDictList() {
        return dictService.listDictsByCode(this.getDictTypeCode());
    }
}
