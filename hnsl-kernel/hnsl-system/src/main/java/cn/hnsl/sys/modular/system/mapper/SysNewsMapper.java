package cn.hnsl.sys.modular.system.mapper;

import cn.hnsl.sys.modular.system.entity.SysNews;
import cn.hnsl.sys.modular.system.model.params.SysNewsParam;
import cn.hnsl.sys.modular.system.model.result.SysNewsResult;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 新闻管理 Mapper 接口
 * </p>
 *
 * @author spt
 * @since 2021-10-15
 */
public interface SysNewsMapper extends BaseMapper<SysNews> {

    /**
     * 获取列表
     *
     * @author spt
     * @Date 2021-10-15
     */
    List<SysNewsResult> customList(@Param("paramCondition") SysNewsParam paramCondition);

    /**
     * 获取map列表
     *
     * @author spt
     * @Date 2021-10-15
     */
    List<Map<String, Object>> customMapList(@Param("paramCondition") SysNewsParam paramCondition);

    /**
     * 获取分页实体列表
     *
     * @author spt
     * @Date 2021-10-15
     */
    Page<SysNewsResult> customPageList(@Param("page") Page page, @Param("paramCondition") SysNewsParam paramCondition);

    /**
     * 获取分页map列表
     *
     * @author spt
     * @Date 2021-10-15
     */
    Page<Map<String, Object>> customPageMapList(@Param("page") Page page, @Param("paramCondition") SysNewsParam paramCondition);

}
