package cn.hnsl.sys.modular.system.mapper;

import cn.hnsl.base.pojo.node.LayuiTreeNode;
import cn.hnsl.base.pojo.node.TreeviewNode;
import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.sys.modular.system.entity.SysDept;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 部门表 Mapper 接口
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
public interface DeptMapper extends BaseMapper<SysDept> {

    /**
     * 获取ztree的节点列表
     *
     * @param adCode
     */
    List<ZTreeNode> tree(@Param("adCode") String adCode);

    /**
     * 获取layui树形节点
     *
     * @param adCode
     */
    List<LayuiTreeNode> layuiTree(@Param("adCode") String adCode,@Param("deptType") String deptType);

    /**
     * 获取所有部门列表
     */
    Page<Map<String, Object>> list(@Param("page") Page page, @Param("condition") String condition, @Param("deptId") Long deptId);

    /**
     * 获取所有部门树列表
     */
    List<TreeviewNode> treeviewNodes();

    /**
     * where pids like ''
     */
    List<SysDept> likePids(@Param("deptId") Long deptId);

    SysDept getParentDeptByAdCode(@Param("upAdCode") String upAdCode);

    SysDept getTownParentDeptByAdCode(@Param("upAdCode") String upAdCode);

    SysDept getDeptByType(@Param("adCode") String adCode, @Param("type") String type);
}
