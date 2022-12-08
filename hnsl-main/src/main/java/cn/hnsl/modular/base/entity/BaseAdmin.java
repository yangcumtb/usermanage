package cn.hnsl.modular.base.entity;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.models.auth.In;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 行政区划
 * </p>
 *
 * @author spt
 * @since 2020-07-03
 */
@TableName("base_admin")
public class BaseAdmin implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 行政区划代码
     */
    @TableId(value = "ad_code", type = IdType.ASSIGN_ID)
    private String adCode;

    @TableField("ad_abbr_code")
    private String adAbbrCode;

    /**
     * 行政区划名称
     */
    @TableField("ad_name")
    private String adName;

    /**
     * 行政区划简称
     */
    @TableField("ad_abbr_name")
    private String adAbbrName;

    /**
     * 行政区划级别
     */
    @TableField("ad_grad")
    private Integer adGrad;

    /**
     * 行政区全称
     */
    @TableField("ad_full_name")
    private String adFullName;

    /**
     * 是否直辖行政区
     */
    @TableField("has_up")
    private String hasUp;

    /**
     * 是否已创建部门
     */
    @TableField("has_dept")
    private String hasDept;

    /**
     * 上级行政区划代码
     */
    @TableField("up_ad_code")
    private String upAdCode;

    /**
     * 上级行政区划名称
     */
    @TableField("up_ad_name")
    private String upAdName;

    /**
     * 备注
     */
    @TableField("note")
    private String note;

    /**
     * 创建政区
     */
    @TableField("create_ad_code")
    private String createAdCode;

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


    public String getAdCode() {
        return adCode;
    }

    public void setAdCode(String adCode) {
        this.adCode = adCode;
    }

    public String getAdAbbrCode() {
        return adAbbrCode.trim();
    }

    public void setAdAbbrCode(String adAbbrCode) {
        this.adAbbrCode = adAbbrCode;
    }

    public String getAdName() {
        return adName;
    }

    public void setAdName(String adName) {
        this.adName = adName;
    }

    public String getAdAbbrName() {
        return adAbbrName;
    }

    public void setAdAbbrName(String adAbbrName) {
        this.adAbbrName = adAbbrName;
    }

    public Integer getAdGrad() {
        return adGrad;
    }

    public void setAdGrad(Integer adGrad) {
        this.adGrad = adGrad;
    }

    public String getAdFullName() {
        return adFullName;
    }

    public void setAdFullName(String adFullName) {
        this.adFullName = adFullName;
    }

    public String getHasUp() {
        return hasUp;
    }

    public void setHasUp(String hasUp) {
        this.hasUp = hasUp;
    }

    public String getUpAdCode() {
        return upAdCode;
    }

    public void setUpAdCode(String upAdCode) {
        this.upAdCode = upAdCode;
    }

    public String getUpAdName() {
        return upAdName;
    }

    public void setUpAdName(String upAdName) {
        this.upAdName = upAdName;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getHasDept() {
        return hasDept;
    }

    public void setHasDept(String hasDept) {
        this.hasDept = hasDept;
    }

    public String getCreateAdCode() {
        return createAdCode;
    }

    public void setCreateAdCode(String createAdCode) {
        this.createAdCode = createAdCode;
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
        return "BaseAdmin{" +
                "adCode=" + adCode +
                ", adName=" + adName +
                ", adAbbrName=" + adAbbrName +
                ", adGrad=" + adGrad +
                ", adFullName=" + adFullName +
                ", hasUp=" + hasUp +
                ", upAdCode=" + upAdCode +
                ", upAdName=" + upAdName +
                ", note=" + note +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", createUser=" + createUser +
                ", updateUser=" + updateUser +
                "}";
    }
}
