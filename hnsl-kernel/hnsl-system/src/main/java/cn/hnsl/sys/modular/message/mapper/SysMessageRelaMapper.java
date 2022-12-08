package cn.hnsl.sys.modular.message.mapper;

import cn.hnsl.sys.modular.message.entity.SysMessageRela;
import cn.hnsl.sys.modular.message.model.params.SysMessageRelaParam;
import cn.hnsl.sys.modular.message.model.result.SysMessageRelaResult;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 系统消息用户关系表 Mapper 接口
 * </p>
 *
 * @author spt
 * @since 2021-09-17
 */
public interface SysMessageRelaMapper extends BaseMapper<SysMessageRela> {

    /**
     * 获取列表
     *
     * @author spt
     * @Date 2021-09-17
     */
    List<SysMessageRelaResult> customList(@Param("paramCondition") SysMessageRelaParam paramCondition);

    /**
     * 获取map列表
     *
     * @author spt
     * @Date 2021-09-17
     */
    List<Map<String, Object>> customMapList(@Param("paramCondition") SysMessageRelaParam paramCondition);

    /**
     * 获取分页实体列表
     *
     * @author spt
     * @Date 2021-09-17
     */
    Page<SysMessageRelaResult> customPageList(@Param("page") Page page, @Param("paramCondition") SysMessageRelaParam paramCondition);

    /**
     * 获取分页map列表
     *
     * @author spt
     * @Date 2021-09-17
     */
    Page<Map<String, Object>> customPageMapList(@Param("page") Page page, @Param("paramCondition") SysMessageRelaParam paramCondition);

}
