package cn.hnsl.sys.modular.system.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

/**
 * <p>
 * 用户职位关联表
 * </p>
 *
 * @author spot
 * @since 2019-06-28
 */
@TableName("sys_user_pos")
public class UserPos implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * 用户id
     */
    @TableField("user_id")
    private Long userId;

    /**
     * 职位id
     */
    @TableField("pos_id")
    private Long posId;



    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPosId() {
        return posId;
    }

    public void setPosId(Long posId) {
        this.posId = posId;
    }

    @Override
    public String toString() {
        return "UserPos{" +
        ", userId=" + userId +
        ", posId=" + posId +
        "}";
    }
}
