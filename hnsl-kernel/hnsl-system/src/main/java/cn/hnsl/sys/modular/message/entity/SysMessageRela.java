package cn.hnsl.sys.modular.message.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * 系统消息用户关系表
 * </p>
 *
 * @author spt
 * @since 2021-09-17
 */
@Data
@TableName("sys_message_rela")
public class SysMessageRela implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 主键
     */
      @TableId(value = "message_id", type = IdType.ASSIGN_ID)
    private Long messageId;

    /**
     * 接收用户id
     */
    @TableField("receive_user_id")
    private Long receiveUserId;

    /**
     * 接收部门id
     */
    @TableField("receive_dept_id")
    private Long receiveDeptId;

    /**
     * 阅读状态：0-未读，1-已读
     */
    @TableField("read_flag")
    private Integer readFlag;

    /**
     * 是否删除：Y-被删除，N-未删除
     */
    @TableField("del_flag")
    private String delFlag;

    /**
     * 创建人
     */
      @TableField(value = "create_user", fill = FieldFill.INSERT)
    private Long createUser;

    /**
     * 创建时间
     */
      @TableField(value = "create_time", fill = FieldFill.INSERT)
    private Date createTime;

    /**
     * 修改人
     */
      @TableField(value = "update_user", fill = FieldFill.UPDATE)
    private Long updateUser;

    /**
     * 修改时间
     */
      @TableField(value = "update_time", fill = FieldFill.UPDATE)
    private Date updateTime;

}
