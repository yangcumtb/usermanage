package cn.hnsl.sys.modular.system.entity;

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
 * 操作日志
 * </p>
 *
 * @author spot
 * @since 2019-04-01
 */
@Data
@TableName("sys_operation_log")
public class OperationLog implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "operation_log_id", type = IdType.ASSIGN_ID)
    private Long operationLogId;

    /** 操作模块 */
    private String title;

    /** 业务类型（0其它 1新增 2修改 3删除） */
    @TableField("business_type")
    private Integer businessType;

    /** 请求方法 */
    private String method;

    /** 请求方式 */
    @TableField("request_method")
    private String requestMethod;

    /** 操作类别（0其它 1后台用户 2手机端用户） */
    @TableField("operator_type")
    private Integer operatorType;

    /** 操作人员 */
    @TableField("oper_name")
    private String operName;

    /** 部门名称 */
    @TableField("dept_name")
    private String deptName;

    /** 请求url */

    @TableField("oper_url")
    private String operUrl;

    /** 操作地址 */
    @TableField("oper_ip")
    private String operIp;

    /** 操作地点 */
    @TableField("oper_location")
    private String operLocation;

    /** 请求参数 */
    @TableField("oper_param")
    private String operParam;

    /** 返回参数 */
    @TableField("json_result")
    private String jsonResult;

    /** 操作状态（0正常 1异常） */
    private Integer status;

    @TableField("remark")
    private String remark;

    /** 错误消息 */
    @TableField("error_msg")
    private String errorMsg;

    /** 操作时间 */
    @TableField(value = "oper_time", fill = FieldFill.INSERT)
    private Date operTime;
}
