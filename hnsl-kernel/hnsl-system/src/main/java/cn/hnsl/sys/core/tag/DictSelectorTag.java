
package cn.hnsl.sys.core.tag;

import cn.hnsl.base.pojo.node.SelectOption;
import cn.hnsl.sys.core.constant.factory.ConstantFactory;
import cn.hnsl.sys.core.exception.enums.BizExceptionEnum;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.ServiceException;
import org.beetl.core.Tag;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Map;


/**
 * 字典标签渲染
 *
 * @author zhangjiajia
 * @Date 2018年6月4日17:33:32
 */
@Component
@Scope("prototype")
public class DictSelectorTag extends Tag {


    @Override
    public void render() {
        Map attrs = (Map) args[1];
        if (ToolUtil.isEmpty(attrs.get("code"))) {
            throw new ServiceException(BizExceptionEnum.ERROR_CODE_EMPTY);
        }

        //字典类型编码
        String code = attrs.get("code").toString();
        //字典名称
        String label = ToolUtil.isNotEmpty(attrs.get("label")) ? attrs.get("label").toString() : "";
        //id
        String id = ToolUtil.isNotEmpty(attrs.get("id")) ? attrs.get("id").toString() : "";
        //监听
        String filter = ToolUtil.isNotEmpty(attrs.get("filter")) ? attrs.get("filter").toString() : "";
        //是否必填
        String isRequired = ToolUtil.isNotEmpty(attrs.get("required")) ? attrs.get("required").toString() : "true";

        StringBuffer html = new StringBuffer();
        List<SelectOption> list = ConstantFactory.me().getDictItemsByCode(code);

        if ("false".equals(isRequired)) {
            html.append("<select id=\"" + id + "\" name=\"" + id + "\" lay-filter=\"" + filter+ "\"  lay-verType=\"tips\">\r\n");
        } else {
            html.append("<select id=\"" + id + "\" name=\"" + id + "\" lay-filter=\"" + filter+ "\"  lay-verType=\"tips\" lay-verify=\"required\" >\r\n");
        }

        html.append("<option value=\"\">" + label + "</option>\r\n");
        list.forEach(obj -> {
            html.append("<option value=\"" + obj.getValue() + "\">" + obj.getText() + "</option>\r\n");
        });
        html.append("</select>\r\n");

        try {
            this.ctx.byteWriter.writeString(html.toString());
        } catch (IOException e) {
            throw new RuntimeException("输出字典标签错误");
        }
    }

}
