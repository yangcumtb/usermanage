package cn.hnsl.sys.modular.system.model.params;

import cn.hnsl.model.validator.BaseValidatingParam;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 基础字典
 * </p>
 *
 * @author spot
 * @since 2019-03-13
 */
@Data
public class OperationLogParam implements Serializable, BaseValidatingParam {

    private static final long serialVersionUID = 1L;


    private String title;

    private String businessType;

    private String[] businessTypes;

    private String status;

    private String operName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date beginTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endTime;

    @Override
    public String checkParam() {
        return null;
    }

}
