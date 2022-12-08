package cn.hnsl.sys.modular.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 在线用户记录
 * </p>
 *
 * @author spt
 * @since 2020-09-21
 */
@TableName("sys_user_online")
public class SysUserOnline implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户会话id
     */
    @TableId(value = "session_id", type = IdType.INPUT)
    private String sessionId;

    /**
     * 登录账号
     */
    @TableField("login_name")
    private String loginName;

    /**
     * 部门名称
     */
    @TableField("dept_name")
    private String deptName;

    /**
     * 登录IP地址
     */
    @TableField("ipaddr")
    private String ipaddr;

    /**
     * 登录地点
     */
    @TableField("login_location")
    private String loginLocation;

    /**
     * 浏览器类型
     */
    @TableField("browser")
    private String browser;

    /**
     * 操作系统
     */
    @TableField("os")
    private String os;

    /**
     * 在线状态on_line在线off_line离线
     */
    @TableField("STATUS")
    private String status;

    /**
     * session创建时间
     */
    @TableField("start_timestamp")
    private Date startTimestamp;

    /**
     * session最后访问时间
     */
    @TableField("last_access_time")
    private Date lastAccessTime;

    /**
     * 超时时间，单位为分钟
     */
    @TableField("expire_time")
    private Integer expireTime;


    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getIpaddr() {
        return ipaddr;
    }

    public void setIpaddr(String ipaddr) {
        this.ipaddr = ipaddr;
    }

    public String getLoginLocation() {
        return loginLocation;
    }

    public void setLoginLocation(String loginLocation) {
        this.loginLocation = loginLocation;
    }

    public String getBrowser() {
        return browser;
    }

    public void setBrowser(String browser) {
        this.browser = browser;
    }

    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getStartTimestamp() {
        return startTimestamp;
    }

    public void setStartTimestamp(Date startTimestamp) {
        this.startTimestamp = startTimestamp;
    }

    public Date getLastAccessTime() {
        return lastAccessTime;
    }

    public void setLastAccessTime(Date lastAccessTime) {
        this.lastAccessTime = lastAccessTime;
    }

    public Integer getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(Integer expireTime) {
        this.expireTime = expireTime;
    }

    @Override
    public String toString() {
        return "SysUserOnline{" +
                "sessionId=" + sessionId +
                ", loginName=" + loginName +
                ", deptName=" + deptName +
                ", ipaddr=" + ipaddr +
                ", loginLocation=" + loginLocation +
                ", browser=" + browser +
                ", os=" + os +
                ", status=" + status +
                ", startTimestamp=" + startTimestamp +
                ", lastAccessTime=" + lastAccessTime +
                ", expireTime=" + expireTime +
                "}";
    }
}
