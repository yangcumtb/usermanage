package cn.hnsl.sys.modular.system.model.result;

import lombok.Data;
import java.util.Date;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * <p>
 * 新闻管理
 * </p>
 *
 * @author spt
 * @since 2021-10-15
 */
@Data
public class SysNewsResult implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * 主键
     */
    private Long newsId;

    /**
     * 通知标题
     */
    private String newsTitle;

    /**
     * 新闻类型
     */
    private String newsType;

    /**
     * 缩略图
     */
    private String newsThumb;

    /**
     * 通知摘要
     */
    private String newsSummary;

    /**
     * 正文文件
     */
    private String mainFileId;

    /**
     * 附件文件
     */
    private String attFileId;

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

}
