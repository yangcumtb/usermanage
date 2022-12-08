package cn.hnsl.sys.modular.message.model.params;

import cn.hnsl.model.validator.BaseValidatingParam;
import lombok.Data;
import java.util.Date;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * <p>
 * 系统消息用户关系表
 * </p>
 *
 * @author spt
 * @since 2021-09-17
 */
@Data
public class SysMessageRelaParam implements Serializable, BaseValidatingParam {

    private static final long serialVersionUID = 1L;


    /**
     * 主键
     */
    private Long messageId;

    /**
     * 接收用户id
     */
    private Long receiveUserId;

    /**
     * 接收部门id
     */
    private Long receiveDeptId;

    /**
     * 阅读状态：0-未读，1-已读
     */
    private Integer readFlag;

    /**
     * 是否删除：Y-被删除，N-未删除
     */
    private String delFlag;

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
