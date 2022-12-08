package cn.hnsl.sys.modular.system.mapper;

import cn.hnsl.sys.modular.system.entity.OperationLog;
import cn.hnsl.sys.modular.system.model.params.OperationLogParam;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 操作日志 Mapper 接口
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
public interface OperationLogMapper extends BaseMapper<OperationLog> {

    /**
     * 获取操作日志
     */
    List<Map<String, Object>> getOperationLogs(@Param("page") Page page, @Param("title") String title, @Param("businessType") Integer businessType,
                                               @Param("status") Integer status,@Param("beginTime") String beginTime,
                                               @Param("endTime") String endTime,@Param("operName") String operName);


}
