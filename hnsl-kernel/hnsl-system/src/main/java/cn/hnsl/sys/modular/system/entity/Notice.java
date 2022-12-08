package cn.hnsl.sys.modular.system.entity;

import cn.hnsl.sys.core.entity.BaseEntity;
import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 通知表
 * </p>
 *
 * @author spot
 * @since 2019-04-01
 */
@Data
@TableName("sys_notice")
public class Notice extends BaseEntity {

    /**
     * 通知id
     */
    @TableId("notice_id")
    private Long noticeId;

    /**
     * 通知标题
     */
    @TableField("notice_title")
    private String noticeTitle;

    /**
     * 通知摘要
     */
    @TableField("notice_summary")
    private String noticeSummary;

    /**
     * 通知优先级
     */
    @TableField(value = "priority_level")
    private String priorityLevel;

    /**
     * 通知开始时间
     */
    @TableField(value = "notice_begin_time")
    private Date noticeBeginTime;

    /**
     * 通知结束时间
     */
    @TableField(value = "notice_end_time")
    private Date noticeEndTime;

    /**
     * 通知内容
     */
    @TableField("notice_content")
    private String noticeContent;

    /**
     * 通知范围
     */
    @TableField("notice_scope")
    private String noticeScope;

    /**
     * 是否删除：Y-已删除，N-未删除
     */
    @TableField(value = "del_flag")
    private String delFlag;

    /**
     * 发布单位
     */
    @TableField(value = "send_unit")
    private String sendUnit;


}
