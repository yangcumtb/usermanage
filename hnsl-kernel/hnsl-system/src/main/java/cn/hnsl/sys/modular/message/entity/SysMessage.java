
package cn.hnsl.sys.modular.message.entity;


import cn.hnsl.sys.core.entity.BaseEntity;
import com.alibaba.fastjson.annotation.JSONField;
import com.alibaba.fastjson.serializer.ToStringSerializer;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

/**
 * 系统消息
 *
 * @author liuhanqing
 * @date 2020/12/31 20:09
 */

@Data
@TableName("sys_message")
public class SysMessage extends BaseEntity {

    /**
     * 主键
     */
    @TableId(value = "message_id", type = IdType.ASSIGN_ID)
    private Long messageId;

    /**
     * 接收用户id
     */
    @TableField(exist = false)
    private Long receiveUserId;

    /**
     * 发送用户id
     */
    @TableField(value = "sender")
    private String sender;

    /**
     * 消息标题
     */
    @TableField(value = "message_title")
    private String messageTitle;

    /**
     * 消息的内容
     */
    @TableField(value = "message_content")
    private String messageContent;

    /**
     * 消息类型
     */
    @TableField(value = "message_type")
    private String messageType;

    /**
     * 消息优先级
     */
    @TableField(value = "priority_level")
    private String priorityLevel;

    /**
     * 消息发送时间
     */
    @TableField(value = "message_send_time")
    private Date messageSendTime;

    /**
     * 业务id
     */
    @TableField(value = "business_id")
    private Long businessId;

    /**
     * 业务类型
     */
    @TableField(value = "business_type")
    private String businessType;

    /**
     * 阅读状态：0-未读，1-已读
     */
    @TableField(exist = false)
    private Integer readFlag;

    /**
     * 是否删除：Y-已删除，N-未删除
     */
    @TableField(exist = false)
    private String delFlag;


}
