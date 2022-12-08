package cn.hnsl.sys.modular.system.mapper;

import cn.hnsl.sys.modular.system.entity.SysUserOnline;
import cn.hnsl.sys.modular.system.model.params.SysUserOnlineParam;
import cn.hnsl.sys.modular.system.model.result.SysUserOnlineResult;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 在线用户记录 Mapper 接口
 * </p>
 *
 * @author spt
 * @since 2020-09-21
 */
public interface OnlineMapper extends BaseMapper<SysUserOnline> {

    /**
     * 获取列表
     *
     * @author spt
     * @Date 2020-09-21
     */
    List<SysUserOnlineResult> customList(@Param("paramCondition") SysUserOnlineParam paramCondition);

    /**
     * 获取map列表
     *
     * @author spt
     * @Date 2020-09-21
     */
    List<Map<String, Object>> customMapList(@Param("paramCondition") SysUserOnlineParam paramCondition);

    /**
     * 获取分页实体列表
     *
     * @author spt
     * @Date 2020-09-21
     */
    Page<SysUserOnlineResult> customPageList(@Param("page") Page page, @Param("paramCondition") SysUserOnlineParam paramCondition);

    /**
     * 获取分页map列表
     *
     * @author spt
     * @Date 2020-09-21
     */
    Page<Map<String, Object>> customPageMapList(@Param("page") Page page, @Param("paramCondition") SysUserOnlineParam paramCondition);

    /**
     * 清空账户的登陆信息
     * @param account
     */
    void removeByAccount(@Param("account") String account);
}
