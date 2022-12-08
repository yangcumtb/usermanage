package cn.hnsl.modular.base.service;

import cn.hnsl.base.pojo.node.LayuiTreeNode;
import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.modular.base.entity.BaseAdmin;
import cn.hnsl.modular.base.model.params.BaseAdminParam;
import cn.hnsl.modular.base.model.result.BaseAdminResult;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 行政区划 服务类
 * </p>
 *
 * @author spt
 * @since 2020-07-03
 */
public interface BaseAdminService extends IService<BaseAdmin> {

    /**
     * 新增
     *
     * @author spt
     * @Date 2020-07-03
     */
    void add(BaseAdminParam param);

    /**
     * 根据政区创建部门
     *
     * @param adCode
     */
    void createDeptByAdmin(String adCode);

    /**
     * 删除
     *
     * @author spt
     * @Date 2020-07-03
     */
    void delete(BaseAdminParam param);

    /**
     * 更新
     *
     * @author spt
     * @Date 2020-07-03
     */
    void update(BaseAdminParam param);

    /**
     * 查询单条数据，Specification模式
     *
     * @author spt
     * @Date 2020-07-03
     */
    BaseAdminResult findBySpec(BaseAdminParam param);

    /**
     * 查询列表，Specification模式
     *
     * @author spt
     * @Date 2020-07-03
     */
    List<BaseAdminResult> findListBySpec(BaseAdminParam param);

    /**
     * 查询分页数据，Specification模式
     *
     * @author spt
     * @Date 2020-07-03
     */
    LayuiPageInfo findPageBySpec(BaseAdminParam param);

    /**
     * 政区树layuiTree
     *
     * @return
     */
    List<LayuiTreeNode> layuiTree();


    List<LayuiTreeNode> layuiTreeOverGrade(String grade);

    /**
     * 政区ztree
     *
     * @return
     */
    List<ZTreeNode> tree();

    /**
     * 获取直属政区列表
     *
     * @param adCode
     * @return
     */
    List<BaseAdmin> getDirAdminByCode(String adCode);


    /**
     * 创建政区编码
     *
     * @param upAdCode
     * @return
     */
    String buildAdCode(String upAdCode);

    /**
     * 获取下级直属政区
     *
     * @param adCode
     * @return
     */
    LayuiPageInfo dirAdmin(String adCode);

    /**
     * 根据ad_code查询行政区划名称
     */
    String getName(String ad_code);

    String getAdcode(String name);

    List<String> getAllCityNameList();
}
