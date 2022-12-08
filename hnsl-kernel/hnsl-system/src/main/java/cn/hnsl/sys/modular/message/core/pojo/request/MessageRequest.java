
package cn.hnsl.sys.modular.message.core.pojo.request;

import cn.hnsl.model.request.BaseRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * 系统消息的查询参数
 *
 * @author liuhanqing
 * @date 2021/1/1 20:23
 */

@Data
public class MessageRequest {

    /**
     * 消息id
     */
    private Long messageId;

    /**
     * 接收用户id
     */
    private Long receiveUserId;

    /**
     * 发送用户id
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
     * 消息发送时间
     */
    private Date messageSendTime;

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
     * 阅读状态：0-未读，1-已读
     */
    private Integer readFlag;

    /**
     * 消息id集合
     */
    private List<Long> messageIdList;


    /**
     * 参数校验分组：修改阅读状态
     */
    public @interface updateReadFlag {
    }

}
