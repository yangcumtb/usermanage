package cn.hnsl.sys.modular.system.service;


import cn.hnsl.sys.modular.system.entity.Notice;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.Map;


/**
 * <p>
 * 在线用户记录 服务类
 * </p>
 *
 * @author spt
 * @since 2020-09-21
 */
public interface NoticeService extends IService<Notice> {

    /**
     * 通知列表
     * @param condition
     * @return
     */
    Page<Map<String, Object>> list(String condition);

    /**
     * 推送通知
     * @param noticeId
     */
    void push(Long noticeId);
}
