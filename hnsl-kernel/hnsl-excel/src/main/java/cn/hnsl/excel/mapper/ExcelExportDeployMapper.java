package cn.hnsl.excel.mapper;

import cn.hnsl.excel.entity.ExcelExportDeploy;
import cn.hnsl.excel.model.params.ExcelExportDeployParam;
import cn.hnsl.excel.model.result.ExcelExportDeployResult;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * excel导出配置 Mapper 接口
 * </p>
 *
 * @author York
 * @since 2019-11-26
 */
public interface ExcelExportDeployMapper extends BaseMapper<ExcelExportDeploy> {

    /**
     * 获取列表
     *
     * @author York
     * @Date 2019-11-26
     */
    List<ExcelExportDeployResult> customList(@Param("paramCondition") ExcelExportDeployParam paramCondition);

    /**
     * 获取map列表
     *
     * @author York
     * @Date 2019-11-26
     */
    List<Map<String, Object>> customMapList(@Param("paramCondition") ExcelExportDeployParam paramCondition);

    /**
     * 获取分页实体列表
     *
     * @author York
     * @Date 2019-11-26
     */
    Page<ExcelExportDeployResult> customPageList(@Param("page") Page page, @Param("paramCondition") ExcelExportDeployParam paramCondition);

    /**
     * 获取分页map列表
     *
     * @author York
     * @Date 2019-11-26
     */
    Page<Map<String, Object>> customPageMapList(@Param("page") Page page, @Param("paramCondition") ExcelExportDeployParam paramCondition);

}
