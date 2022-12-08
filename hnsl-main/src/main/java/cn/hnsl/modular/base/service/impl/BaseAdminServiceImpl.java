package cn.hnsl.modular.base.service.impl;

import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.pojo.node.LayuiTreeNode;
import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.modular.base.warpper.BaseAdminWrapper;
import cn.hnsl.sys.core.constant.BizConst;
import cn.hnsl.core.treebuild.DefaultTreeBuildFactory;
import cn.hnsl.core.util.RegionUtil;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.modular.base.entity.BaseAdmin;
import cn.hnsl.modular.base.mapper.BaseAdminMapper;
import cn.hnsl.modular.base.model.params.BaseAdminParam;
import cn.hnsl.modular.base.model.result.BaseAdminResult;
import cn.hnsl.modular.base.service.BaseAdminService;
import cn.hnsl.sys.modular.system.entity.SysDept;
import cn.hnsl.sys.modular.system.service.impl.SysDeptServiceImpl;
import cn.hutool.core.convert.Convert;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 行政区划 服务实现类
 * </p>
 *
 * @author spt
 * @since 2020-07-03
 */
@Service
public class BaseAdminServiceImpl extends ServiceImpl<BaseAdminMapper, BaseAdmin> implements BaseAdminService {

    @Resource
    private SysDeptServiceImpl deptService;

    @Override
    public void add(BaseAdminParam param) {

        if (ToolUtil.isEmpty(param.getAdCode())) {
            String upAdCode = buildAdCode(param.getUpAdCode());
            param.setAdCode(upAdCode);
        }


        //判断政区编码与上级编码是否一致
        BaseAdmin pEntity = this.getById(param.getUpAdCode());
        String abbrCode = pEntity.getAdAbbrCode();
        String adCode = param.getAdCode();

        if (!abbrCode.equals(adCode.substring(0, abbrCode.length()))) {
            throw new ServiceException("500", "输入的政区编码[" + adCode + "]不属于选择的上级政区！");
        }

        //创建政区
        BaseAdmin entity = getEntity(param);
//        String adCode= "210000000000";
//        entity.setCreateAdCode(LoginContextHolder.me().getLoginUser().getAdCode());
        entity.setCreateAdCode("210000000000");

        entity.setAdAbbrCode(RegionUtil.genAbbrCode(param.getAdCode()));

        //政区全称
        if ("2".equals(param.getAdGrad())) {
            entity.setAdFullName(entity.getAdName());
        } else {
            entity.setAdFullName(pEntity.getAdFullName() + "," + entity.getAdName());
        }

        this.save(entity);
    }

    @Override
    public void delete(BaseAdminParam param) {
        BaseAdmin entity = getEntity(param);
        if ("1".equals(entity.getHasDept())) {
            throw new ServiceException("500", "当前政区已创建部门，不能被删除");
        }
        this.removeById(getKey(param));
    }

    @Override
    public void update(BaseAdminParam param) {
        BaseAdmin oldEntity = getOldEntity(param);
        BaseAdmin newEntity = getEntity(param);
        ToolUtil.copyProperties(newEntity, oldEntity);
        this.updateById(oldEntity);
    }

    @Override
    public BaseAdminResult findBySpec(BaseAdminParam param) {
        QueryWrapper<BaseAdmin> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("ad_name", param.getAdName());
        BaseAdmin baseAdmin = this.getOne(queryWrapper);
        BaseAdminResult baseAdminResult = new BaseAdminResult();
        baseAdminResult.setAdCode(baseAdmin.getAdCode());
        baseAdminResult.setAdName(baseAdmin.getAdName());
        baseAdminResult.setAdFullName(baseAdmin.getAdFullName());
        baseAdminResult.setAdGrad(baseAdmin.getAdGrad());
        baseAdminResult.setUpAdCode(baseAdmin.getUpAdCode());
        baseAdminResult.setUpAdName(baseAdmin.getUpAdName());

        return baseAdminResult;
    }

    @Override
    public List<BaseAdminResult> findListBySpec(BaseAdminParam param) {
        return null;
    }

    @Override
    public LayuiPageInfo findPageBySpec(BaseAdminParam param) {
        Page pageContext = getPageContext();
        Page<Map<String, Object>> list = this.baseMapper.customPageMapList(pageContext, param);
        Page<Map<String, Object>> wrap = new BaseAdminWrapper(list).wrap();
        return LayuiPageFactory.createPageInfo(wrap);
    }


    /**
     * 政区树
     *
     * @return
     */
    @Override
    public List<LayuiTreeNode> layuiTree() {
        String adCode = LoginContextHolder.me().getLoginUser().getAdCode();
        BaseAdmin baseAdmin = this.getById(adCode);
        List<LayuiTreeNode> list = this.baseMapper.layuiTree(baseAdmin);
        DefaultTreeBuildFactory<LayuiTreeNode> treeBuildFactory = new DefaultTreeBuildFactory<>();
        treeBuildFactory.setRootParentId(baseAdmin.getUpAdCode());
        return treeBuildFactory.doTreeBuild(list);
    }

    @Override
    public List<LayuiTreeNode> layuiTreeOverGrade(String grade) {
        String adCode = LoginContextHolder.me().getLoginUser().getAdCode();
        BaseAdmin baseAdmin = this.getById(adCode);
        List<LayuiTreeNode> list = this.baseMapper.layuiTreeOverGrade(baseAdmin, grade);
        DefaultTreeBuildFactory<LayuiTreeNode> treeBuildFactory = new DefaultTreeBuildFactory<>();
        treeBuildFactory.setRootParentId(baseAdmin.getUpAdCode());
        return treeBuildFactory.doTreeBuild(list);
    }

    /**
     * 政区ztree
     *
     * @return
     */
    @Override
    public List<ZTreeNode> tree() {
        String adCode = LoginContextHolder.me().getLoginUser().getAdCode();
//        String adCode= "210000000000";
        BaseAdmin baseAdmin = this.getById(adCode);
        return this.baseMapper.tree(baseAdmin);
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public void createDeptByAdmin(String adCode) {
        BaseAdmin region = this.getById(adCode);

        //创建部门前进行数据检查
        if (ToolUtil.isEmpty(region)) {
            throw new ServiceException("500", "政区不存在！");
        }

        if ("1".equals(region.getHasDept())) {
            throw new ServiceException("500", "当前政区机构已创建完成，无需重复创建!");
        }

        //根据政区创建对应的政区下部门；


        region.setHasDept("1");
        this.updateById(region);

    }

    /**
     * 创建部门政区
     *
     * @param region
     * @return
     */
    private SysDept createAdminDept(BaseAdmin region) {
        //获取上级部门
        SysDept pDept = deptService.getParentDeptByAdCode(region.getUpAdCode());
        String sort = (Convert.toLong(region.getAdCode()) - Convert.toLong(region.getUpAdCode()) + "").replaceAll("0+$", "");
        //新建部门
        SysDept dept = this.createDept(pDept, region, BizConst.DEPT_TYPE_ADMIN, region.getAdName(), region.getAdName(), "0", Convert.toInt(sort));
        return dept;
    }

    private SysDept createDept(SysDept pDept, BaseAdmin region, String type, String simpleName, String fullName, String isLeaf, Integer sort) {
        //创建河长部门
        SysDept dept = new SysDept();
        dept.setAdCode(region.getAdCode());
        dept.setDeptType(type);
        dept.setPid(pDept.getDeptId());
        dept.setPids(pDept.getPids() + "[" + pDept.getDeptId() + "],");
        dept.setIsLeaf(isLeaf);
        dept.setSort(sort);
        dept.setFullName(fullName);
        dept.setSimpleName(simpleName);
        deptService.addDept(dept);
        return dept;
    }

    private Serializable getKey(BaseAdminParam param) {
        return param.getAdCode();
    }

    private Page getPageContext() {
        return LayuiPageFactory.defaultPage();
    }

    private BaseAdmin getOldEntity(BaseAdminParam param) {
        return this.getById(getKey(param));
    }

    private BaseAdmin getEntity(BaseAdminParam param) {
        BaseAdmin entity = new BaseAdmin();
        ToolUtil.copyProperties(param, entity);
        return entity;
    }

    /**
     * 获取直属政区列表
     *
     * @param adCode
     * @return
     */
    @Override
    public List<BaseAdmin> getDirAdminByCode(String adCode) {
        return this.baseMapper.getDirAdminByCode(adCode);
    }


    /**
     * 处理新增政区编码问题
     *
     * @param upAdCode 上级行政区划
     * @return
     */
    @Override
    public String buildAdCode(String upAdCode) {

        BaseAdmin upAdmin = this.getById(upAdCode);

        List<BaseAdmin> subAdminLit = getDirAdminByCode(upAdCode);

        String sGrade = Convert.toStr(Convert.toInt(upAdmin.getAdGrad()) + 1);
        String sCode = RegionUtil.buildNewRegionCode(upAdCode, sGrade);

        //政区编码中该级别的编码集合
        List<Integer> subList = new ArrayList<>();

        for (BaseAdmin children : subAdminLit) {
            String sChildrenCode = children.getAdCode();
            Integer sChildrenSub = RegionUtil.getSubByGrade(sChildrenCode, sGrade);
            subList.add(sChildrenSub);
        }

        //新生成的政区编码中该级别的编码
        Integer nSubCode = RegionUtil.getSubByGrade(sCode, sGrade);
        //避免和已有的重复
        Integer nNewSubCode = buildNewRegionCode(subList, nSubCode);
        if (nNewSubCode == 0) {
            return sCode;
        } else {
            return RegionUtil.buildNewRegionCode(upAdCode, sGrade, nNewSubCode);
        }

    }

    /**
     * 获取下级直属政区
     *
     * @param adCode
     * @return
     */
    @Override
    public LayuiPageInfo dirAdmin(String adCode) {

        //找出所有职位
        List<Map<String, Object>> list = this.baseMapper.dirAdmin(adCode);

        LayuiPageInfo layuiPageInfo = new LayuiPageInfo();
        layuiPageInfo.setData(list);
        return layuiPageInfo;
    }

    /**
     * 重新生成新的政区编码中的子序列
     *
     * @param subList
     * @param nCode
     * @return
     */
    private Integer buildNewRegionCode(List<Integer> subList, Integer nCode) {
        for (int i = nCode; i > 0; i--) {
            if (!subList.contains(nCode)) {
                return nCode;
            }
            nCode = i;
        }
        return 0;
    }

    /**
     * 根据ad_code查询行政区划名称
     */
    @Override
    public String getName(String ad_code) {
        return this.getBaseMapper().get_ad_name(ad_code);
    }

    @Override
    public String getAdcode(String name) {
        if (!name.isEmpty()) {
            List<BaseAdmin> baseAdmins = this.getBaseMapper().selectList(new QueryWrapper<BaseAdmin>().eq("ad_name", name));
            if (baseAdmins.size() != 1) {
                return null;
            } else {
                return baseAdmins.get(0).getAdCode();
            }
        } else {
            return null;
        }
    }

    @Override
    public List<String> getAllCityNameList() {
        return this.getBaseMapper().getAllCityNameList();
    }

}
