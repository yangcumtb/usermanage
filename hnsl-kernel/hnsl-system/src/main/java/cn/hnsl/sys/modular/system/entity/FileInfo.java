package cn.hnsl.sys.modular.system.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 文件信息表
 * </p>
 *
 * @author spot
 * @since 2019-05-04
 */
@TableName("sys_file_info")
@Data
public class FileInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "file_id", type = IdType.ASSIGN_ID)
    private String fileId;

    /**
     * 文件仓库（oss仓库）
     */
    @TableField("file_bucket")
    private String fileBucket;

    /**
     * 文件名称
     */
    @TableField("file_name")
    private String fileName;

    /**
     * 文件后缀
     */
    @TableField("file_suffix")
    private String fileSuffix;

    /**
     * 文件大小kb
     */
    @TableField("file_size_kb")
    private Long fileSizeKb;

    /**
     * 文件唯一标识id
     */
    @TableField("final_name")
    private String finalName;

    /**
     * 存储路径
     */
    @TableField("file_path")
    private String filePath;

    /**
     * 文件的年份
     */
    @TableField("file_year")
    private Integer fileYear;

    /**
     * 文件业务类型代码：1图斑影像、2核查、3规划、4评审方案、5评审意见、6二合一方案文件
     */
    @TableField("file_business_type")
    private String fileBusinessType;

    /**
     * 文件业务类型名称：1图斑影像、2核查、3规划、4评审方案、5评审意见、6二合一方案文件
     */
    @TableField("file_business_name")
    private String fileBusinessName;

    /**
     * 文件关联id
     */
    @TableField("associate_id")
    private String associateId;

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


    /**
     * 是否可用，标识逻辑删除
     */
    @TableField(value = "available")
    private Integer available = 1;


}
