package cn.hnsl.sys.modular.message.model.params;

import cn.hnsl.model.validator.BaseValidatingParam;
import lombok.Data;
import java.util.Date;
import java.io.Serializable;

/**
 * <p>
 * 系统消息
 * </p>
 *
 * @author spt
 * @since 2021-09-17
 */
@Data
public class SysMessageParam implements Serializable, BaseValidatingParam {

    private static final long serialVersionUID = 1L;


    /**
     * 主键
     */
    private Long messageId;

    /**
     * 发送用户id
     */
    private String sender;

    /**
     * 消息标题
     */
    private String messageTitle;

    /**
     * 消息内容
     */
    private String messageContent;

    /**
     * 消息类型
     */
    private String messageType;

    /**
     * 优先级
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
     * 业务类型(根据业务id和业务类型可以确定业务数据)
     */
    private String businessType;

    /**
     * 创建人
     */
    private Long createUser;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改人
     */
    private Long updateUser;

    /**
     * 修改时间
     */
    private Date updateTime;

    @Override
    public String checkParam() {
        return null;
    }

}
