package cn.hnsl.sys.modular.system.service.impl;

import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.pojo.node.LayuiTreeNode;
import cn.hnsl.base.pojo.node.TreeviewNode;
import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.sys.core.exception.enums.BizExceptionEnum;
import cn.hnsl.sys.modular.system.entity.SysDept;
import cn.hnsl.sys.modular.system.mapper.DeptMapper;
import cn.hnsl.sys.modular.system.service.SysDeptService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 部门表 服务实现类
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
@Service
public class SysDeptServiceImpl extends ServiceImpl<DeptMapper, SysDept> implements SysDeptService {

    @Resource
    private DeptMapper deptMapper;

    /**
     * 新增部门
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:00 PM
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void addDept(SysDept dept) {

        if (ToolUtil.isOneEmpty(dept, dept.getSimpleName(), dept.getFullName(), dept.getPid())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }

        //完善pids,根据pid拿到pid的pids
        this.deptSetPids(dept);

        this.save(dept);
    }

    /**
     * 修改部门
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:00 PM
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void editDept(SysDept dept) {

        if (ToolUtil.isOneEmpty(dept, dept.getDeptId(), dept.getSimpleName(), dept.getFullName(), dept.getPid())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }

        //完善pids,根据pid拿到pid的pids
        this.deptSetPids(dept);

        this.updateById(dept);
    }

    /**
     * 删除部门
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:16 PM
     */
    @Transactional
    @Override
    public void deleteDept(Long deptId) {
        SysDept dept = deptMapper.selectById(deptId);

        //根据like查询删除所有级联的部门
        List<SysDept> subDepts = deptMapper.likePids(dept.getDeptId());

        for (SysDept temp : subDepts) {
            this.removeById(temp.getDeptId());
        }

        this.removeById(dept.getDeptId());
    }

    /**
     * 获取ztree的节点列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:16 PM
     */
    @Override
    public List<ZTreeNode> tree() {
        String adCode = LoginContextHolder.me().getLoginUser().getAdCode();
        LambdaQueryWrapper<SysDept> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(SysDept::getAdCode, adCode);
        List<SysDept> sysDepts = this.getBaseMapper().selectList(queryWrapper);
        Long pid = null;
        List<ZTreeNode> treeNoderesult = new ArrayList<>();
        for (SysDept sysDept : sysDepts) {
            if (!sysDept.getPid().equals(Long.valueOf("0"))) {
                pid = sysDept.getPid();
            }
        }
        /**
         * 如果是管理员，直接返回所有，否则要进行pid的筛选
         */
        if (LoginContextHolder.me().getLoginUser().getAdGrad() == 1) {
            return this.baseMapper.tree(adCode);
        } else {
            List<ZTreeNode> treeNodes = this.baseMapper.tree(adCode);
            int index = treeNodes.size();
            for (int i = 0; i < index; i++) {
                if (pid.equals(treeNodes.get(i).getPId())) {
                    treeNoderesult.add(treeNodes.get(i));
                }
            }
            return treeNoderesult;
        }
    }


    /**
     * 获取layuiTree的节点列表
     *
     * @author fengshuonan
     * @Date 2019-8-27 15:23
     */
    public List<LayuiTreeNode> layuiTree(String deptType) {

        return this.baseMapper.layuiTree(LoginContextHolder.me().getLoginUser().getAdCode(), deptType);
    }

    /**
     * 获取ztree的节点列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:16 PM
     */
    @Override
    public List<TreeviewNode> treeviewNodes() {
        return this.baseMapper.treeviewNodes();
    }

    /**
     * 获取所有部门列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:16 PM
     */
    @Override
    public Page<Map<String, Object>> list(String condition, Long deptId) {

//        if (ToolUtil.isEmpty(deptId)) {
//            deptId = this.getDeptByType(LoginContextHolder.me().getUser().getAdCode(), BizConst.DEPT_TYPE_ADMIN).getDeptId();
//        }

        Page page = LayuiPageFactory.defaultPage();
        return this.baseMapper.list(page, condition, deptId);
    }

    /**
     * 设置部门的父级ids
     *
     * @author fengshuonan
     * @Date 2018/12/23 4:58 PM
     */
    private void deptSetPids(SysDept dept) {
        if (ToolUtil.isEmpty(dept.getPid()) || dept.getPid().equals(0L)) {
            dept.setPid(0L);
            dept.setPids("[0],");
        } else {
            Long pid = dept.getPid();
            SysDept temp = this.getById(pid);
            String pids = temp.getPids();
            dept.setPid(pid);
            dept.setPids(pids + "[" + pid + "],");
        }
    }


    /**
     * 获取上级政区部门
     *
     * @param upAdCode
     * @return
     */
    @Override
    public SysDept getParentDeptByAdCode(String upAdCode) {
        return this.baseMapper.getParentDeptByAdCode(upAdCode);
    }

    /**
     * 获取村级上级政区部门
     *
     * @param upAdCode
     * @return
     */
    @Override
    public SysDept getTownParentDeptByAdCode(String upAdCode) {
        return this.baseMapper.getTownParentDeptByAdCode(upAdCode);
    }

    @Override
    public SysDept getDeptByType(String adCode, String type) {
        return this.baseMapper.getDeptByType(adCode, type);
    }
}
