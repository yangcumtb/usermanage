package cn.hnsl.sys.modular.message.core.pojo.request;

import cn.hnsl.model.request.BaseRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * 发送系统消息的参数
 *
 * @author liuhanqing
 * @date 2021/1/1 20:23
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class MessageSendRequest extends BaseRequest {

    /**
     * 接收用户id字符串，多个以,分割
     */
    private String receiveUserIds;

    /**
     * 发送消息用户
     */
    private Long sendUserId;

    /**
     * 消息标题
     */
    private String messageTitle;

    /**
     * 消息的内容
     */
    private String messageContent;

    /**
     * 消息类型
     */
    private String messageType;

    /**
     * 消息优先级
     */
    private String priorityLevel;

    /**
     * 业务id
     */
    private Long businessId;

    /**
     * 业务类型
     */
    private String businessType;

    /**
     * 业务类型值
     */
    private String businessTypeValue;

    /**
     * 消息发送时间
     */
    private Date messageSendTime;

}
