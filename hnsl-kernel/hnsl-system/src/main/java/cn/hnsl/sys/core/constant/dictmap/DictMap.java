
package cn.hnsl.sys.core.constant.dictmap;

import cn.hnsl.base.dict.AbstractDictMap;

/**
 * 字典map
 *
 * @author fengshuonan
 * @date 2017-05-06 15:43
 */
public class DictMap extends AbstractDictMap {

    @Override
    public void init() {
        put("dictId", "字典名称");
        put("name", "字典名称");
        put("code", "字典编码");
        put("description", "字典描述");
        put("sort", "排序");
    }

    @Override
    protected void initBeWrapped() {

    }
}
