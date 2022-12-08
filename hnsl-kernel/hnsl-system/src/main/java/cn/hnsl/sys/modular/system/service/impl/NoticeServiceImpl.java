package cn.hnsl.sys.modular.system.service.impl;

import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.sys.core.exception.enums.BizExceptionEnum;
import cn.hnsl.sys.modular.message.core.enums.MessageBusinessTypeEnum;
import cn.hnsl.sys.modular.message.core.pojo.request.MessageSendRequest;
import cn.hnsl.sys.modular.message.entity.SysMessage;
import cn.hnsl.sys.modular.message.service.MessageApi;
import cn.hnsl.sys.modular.system.entity.Notice;
import cn.hnsl.sys.modular.system.mapper.NoticeMapper;
import cn.hnsl.sys.modular.system.service.NoticeService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.Map;

/**
 * <p>
 * 通知表 服务实现类
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
@Service
public class NoticeServiceImpl extends ServiceImpl<NoticeMapper, Notice> implements NoticeService {

    @Resource
    private MessageApi messageApi;
    /**
     * 获取通知列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:05 PM
     */
    public Page<Map<String, Object>> list(String condition) {
        Page page = LayuiPageFactory.defaultPage();
        return this.baseMapper.list(page, condition);
    }

    @Override
    public void push(Long noticeId) {
        Notice notice = this.getById(noticeId);
        if (ToolUtil.isEmpty(notice)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }

        MessageSendRequest message = new MessageSendRequest();

        // 消息标题
        message.setMessageTitle(notice.getNoticeTitle());

        // 消息内容
        message.setMessageContent(notice.getNoticeContent());

        // 消息优先级
        message.setPriorityLevel(notice.getPriorityLevel());

        // 消息发送范围
        message.setReceiveUserIds(notice.getNoticeScope());

        // 消息业务类型
        message.setBusinessType(MessageBusinessTypeEnum.SYS_NOTICE.getCode());
        message.setBusinessTypeValue(MessageBusinessTypeEnum.SYS_NOTICE.getName());

        message.setBusinessId(notice.getNoticeId());
        message.setMessageSendTime(new Date());

        try {
            messageApi.sendMessage(message);
        } catch (Exception exception) {
            // 发送失败打印异常
            log.error("发送消息失败:", exception);
        }
    }

}
