package cn.hnsl.modular.base.model.result;

import cn.hnsl.core.constant.state.AdminGradeEnum;
import cn.hnsl.sys.modular.message.core.enums.MessageBusinessTypeEnum;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

/**
 * <p>
 * 行政区划
 * </p>
 *
 * @author spt
 * @since 2020-07-03
 */
@Data
public class BaseAdminResult implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * 行政区划代码
     */
    private String adCode;

    private String adAbbrCode;

    /**
     * 行政区划名称
     */
    private String adName;

    /**
     * 行政区划简称
     */
    private String adAbbrName;

    /**
     * 行政区划级别
     */
    private Integer adGrad;

    /**
     * 行政区全称
     */
    private String adFullName;

    /**
     * 是否直辖行政区
     */
    private String hasUp;

    /**
     * 上级行政区划代码
     */
    private String upAdCode;

    /**
     * 上级行政区划名称
     */
    private String upAdName;

    /**
     * 备注
     */
    private String note;

    private String hasDept;

    private String createAdCode;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    private Date updateTime;

    /**
     * 创建用户
     */
    private Long createUser;

    /**
     * 修改用户
     */
    private Long updateUser;

    /**
     * 区划级别
     */
    private String adGradName;

    public String getAdGradName() {
        AtomicReference<String> value = new AtomicReference<>("");
        Optional.ofNullable(this.adGrad).ifPresent(val -> {
            value.set(AdminGradeEnum.getName(String.valueOf(this.adGrad)));
        });
        return value.get();
    }

}
