package cn.hnsl.sys.modular.system.mapper;

import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.entity.SysRole;
import cn.hnsl.sys.modular.system.entity.UserPos;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 角色表 Mapper 接口
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
public interface SysRoleMapper extends BaseMapper<SysRole> {

    /**
     * 根据条件查询角色列表
     *
     * @return
     * @date 2017年2月12日 下午9:14:34
     */
    Page<Map<String, Object>> list(@Param("page") Page page, @Param("condition") String condition);


    /**
     * 删除菜单和角色的关联关系
     *
     * @param roleId
     */
    void deleteRelaById(@Param("roleId") Long roleId);

    /**
     * 根据用户获取角色列表
     *
     * @param userId
     * @return
     */
    List<Map<String,Object>> roleListByUserId(@Param("userId") Long userId);

    List<SysRole> getRoleByUserId(@Param("userId") Long userId);

    List<ZTreeNode> roleTreeByUserId(@Param("userId") Long userId);
}
