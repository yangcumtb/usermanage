
package cn.hnsl.sys.core.constant.dictmap;

import cn.hnsl.base.dict.AbstractDictMap;

/**
 * 通知的映射
 *
 * @author fengshuonan
 * @date 2017-05-06 15:01
 */
public class NoticeDict extends AbstractDictMap {

    @Override
    public void init() {
        put("noticeId", "标题id");
        put("noticeTitle", "标题");
    }

    @Override
    protected void initBeWrapped() {
    }
}
