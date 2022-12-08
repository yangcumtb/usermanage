package cn.hnsl.sys.modular.system.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

/**
 * <p>
 * 新闻管理
 * </p>
 *
 * @author spt
 * @since 2021-10-15
 */
@TableName("sys_news")
public class SysNews implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 主键
     */
      @TableId(value = "news_id", type = IdType.ASSIGN_ID)
    private Long newsId;

    /**
     * 通知标题
     */
    @TableField("news_title")
    private String newsTitle;

    /**
     * 新闻类型
     */
    @TableField("news_type")
    private String newsType;

    /**
     * 缩略图
     */
    @TableField("news_thumb")
    private String newsThumb;

    /**
     * 通知摘要
     */
    @TableField("news_summary")
    private String newsSummary;

    /**
     * 正文文件
     */
    @TableField("main_file_id")
    private String mainFileId;

    /**
     * 附件文件
     */
    @TableField("att_file_id")
    private String attFileId;

    /**
     * 创建时间
     */
      @TableField(value = "create_time", fill = FieldFill.INSERT)
    private Date createTime;

    /**
     * 修改时间
     */
      @TableField(value = "update_time", fill = FieldFill.UPDATE)
    private Date updateTime;

    /**
     * 创建用户
     */
      @TableField(value = "create_user", fill = FieldFill.INSERT)
    private Long createUser;

    /**
     * 修改用户
     */
      @TableField(value = "update_user", fill = FieldFill.UPDATE)
    private Long updateUser;


    public Long getNewsId() {
        return newsId;
    }

    public void setNewsId(Long newsId) {
        this.newsId = newsId;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getNewsType() {
        return newsType;
    }

    public void setNewsType(String newsType) {
        this.newsType = newsType;
    }

    public String getNewsThumb() {
        return newsThumb;
    }

    public void setNewsThumb(String newsThumb) {
        this.newsThumb = newsThumb;
    }

    public String getNewsSummary() {
        return newsSummary;
    }

    public void setNewsSummary(String newsSummary) {
        this.newsSummary = newsSummary;
    }

    public String getMainFileId() {
        return mainFileId;
    }

    public void setMainFileId(String mainFileId) {
        this.mainFileId = mainFileId;
    }

    public String getAttFileId() {
        return attFileId;
    }

    public void setAttFileId(String attFileId) {
        this.attFileId = attFileId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Long getCreateUser() {
        return createUser;
    }

    public void setCreateUser(Long createUser) {
        this.createUser = createUser;
    }

    public Long getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(Long updateUser) {
        this.updateUser = updateUser;
    }

    @Override
    public String toString() {
        return "SysNews{" +
        "newsId=" + newsId +
        ", newsTitle=" + newsTitle +
        ", newsType=" + newsType +
        ", newsThumb=" + newsThumb +
        ", newsSummary=" + newsSummary +
        ", mainFileId=" + mainFileId +
        ", attFileId=" + attFileId +
        ", createTime=" + createTime +
        ", updateTime=" + updateTime +
        ", createUser=" + createUser +
        ", updateUser=" + updateUser +
        "}";
    }
}
