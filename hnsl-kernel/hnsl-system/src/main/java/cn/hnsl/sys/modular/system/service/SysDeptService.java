package cn.hnsl.sys.modular.system.service;


import cn.hnsl.base.pojo.node.LayuiTreeNode;
import cn.hnsl.base.pojo.node.TreeviewNode;
import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.sys.modular.system.entity.SysDept;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;


/**
 * <p>
 * 菜单表 服务实现类
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
public interface SysDeptService extends IService<SysDept> {

    /**
     * 新增部门
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:00 PM
     */

    void addDept(SysDept dept);

    /**
     * 修改部门
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:00 PM
     */
    void editDept(SysDept dept);

    /**
     * 删除部门
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:16 PM
     */
    public void deleteDept(Long deptId);

    /**
     * 获取ztree的节点列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:16 PM
     */
    List<ZTreeNode> tree();

    /**
     * 获取ztree的节点列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:16 PM
     */
    List<TreeviewNode> treeviewNodes();

    /**
     * 获取所有部门列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:16 PM
     */
    Page<Map<String, Object>> list(String condition, Long deptId);


    /**
     * 获取上级政区部门
     *
     * @param upAdCode
     * @return
     */
    SysDept getParentDeptByAdCode(String upAdCode);

    /**
     * 获取村级上级政区部门
     *
     * @param upAdCode
     * @return
     */
    SysDept getTownParentDeptByAdCode(String upAdCode);


    SysDept getDeptByType(String adCode, String type);
}
