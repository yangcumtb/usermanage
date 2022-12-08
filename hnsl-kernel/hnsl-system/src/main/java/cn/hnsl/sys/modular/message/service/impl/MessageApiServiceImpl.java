
package cn.hnsl.sys.modular.message.service.impl;

import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.socket.exception.SocketException;
import cn.hnsl.sys.modular.message.core.enums.MessageReadFlagEnum;
import cn.hnsl.sys.modular.message.core.exception.MessageException;
import cn.hnsl.sys.modular.message.core.exception.enums.MessageExceptionEnum;
import cn.hnsl.sys.modular.message.core.pojo.request.MessageRequest;
import cn.hnsl.sys.modular.message.core.pojo.response.MessageResponse;
import cn.hnsl.sys.modular.message.entity.SysMessage;
import cn.hnsl.sys.modular.message.service.MessageApi;
import cn.hnsl.sys.modular.message.core.pojo.request.MessageSendRequest;
import cn.hnsl.socket.config.SocketOperatorApi;
import cn.hnsl.socket.enums.ServerMessageTypeEnum;
import cn.hnsl.sys.modular.message.service.SysMessageService;
import cn.hnsl.sys.modular.system.service.impl.SysUserServiceImpl;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.convert.Convert;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

/**
 * 系统消息，数据库实现
 *
 * @author liuhanqing
 * @date 2021/1/2 22:00
 */
@Slf4j
@Service
public class MessageApiServiceImpl implements MessageApi {

    private static final String SCOPE_ALL = "all";

    @Resource
    private SocketOperatorApi socketOperatorApi;

    @Resource
    private SysUserServiceImpl userServiceApi;

    @Resource
    private SysMessageService sysMessageService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void sendMessage(MessageSendRequest messageSendRequest) {

        String receiveUserIds = messageSendRequest.getReceiveUserIds();
        LoginUser loginUser = LoginContextHolder.me().getLoginUser();

        List<SysMessage> sendMsgList = new ArrayList<>();
        List<Long> userIds;

        // 发送所有人判断
        if (SCOPE_ALL.equals(receiveUserIds)) {
            // 查询所有用户
            userIds = userServiceApi.queryAllUserIdList();
        } else {
            String[] userIdArr = receiveUserIds.split(",");
            userIds = Convert.toList(Long.class, userIdArr);
        }

        // 无人可发，不发送
        if (userIds == null || userIds.isEmpty()) {
            throw new MessageException(MessageExceptionEnum.ERROR_RECEIVE_USER_IDS);
        }

        Set<Long> userIdSet = new HashSet<>(userIds);
        for (Long userId : userIdSet) {
            // 判断用户是否存在
            if (userServiceApi.userExist(userId)) {
                SysMessage sysMessage = new SysMessage();
                BeanUtil.copyProperties(messageSendRequest, sysMessage);
                // 初始化默认值
                sysMessage.setReadFlag(MessageReadFlagEnum.UNREAD.getCode());
                sysMessage.setSender(loginUser.getDeptName());
                sysMessage.setReceiveUserId(userId);
                sendMsgList.add(sysMessage);
            }
        }
        sysMessageService.saveBatch(sendMsgList);

        // 给用户发送通知
        for (SysMessage item : sendMsgList) {
            try {
                socketOperatorApi.sendMsgOfUserSession(ServerMessageTypeEnum.SYS_NOTICE_MSG_TYPE.getCode(), item.getReceiveUserId().toString(), item);
            } catch (SocketException socketException) {
                // 该用户不在线

            }
        }
    }

    @Override
    public void updateReadFlag(MessageRequest messageRequest) {

    }

    @Override
    public void allMessageReadFlag() {

    }

    @Override
    public void batchReadFlagByMessageIds(String messageIds, MessageReadFlagEnum flagEnum) {

    }

    @Override
    public void deleteByMessageId(Long messageId) {

    }

    @Override
    public void batchDeleteByMessageIds(String messageIds) {

    }

    @Override
    public MessageResponse messageDetail(MessageRequest messageRequest) {
        return null;
    }

    @Override
    public List<MessageResponse> queryList(MessageRequest messageRequest) {
        return null;
    }

    @Override
    public List<MessageResponse> queryListCurrentUser(MessageRequest messageRequest) {
        return null;
    }

    @Override
    public Integer queryCount(MessageRequest messageRequest) {
        return null;
    }

    @Override
    public Integer queryCountCurrentUser(MessageRequest messageRequest) {
        return null;
    }


}
