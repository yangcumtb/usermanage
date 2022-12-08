package cn.hnsl.sys.modular.system.service;

import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.entity.SysNews;
import cn.hnsl.sys.modular.system.model.params.SysNewsParam;
import cn.hnsl.sys.modular.system.model.result.SysNewsResult;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
/**
 * <p>
 * 新闻管理 服务类
 * </p>
 *
 * @author spt
 * @since 2021-10-15
 */
public interface SysNewsService extends IService<SysNews> {

    /**
     * 新增
     *
     * @author spt
     * @Date 2021-10-15
     */
    void add(SysNewsParam param);

    /**
     * 删除
     *
     * @author spt
     * @Date 2021-10-15
     */
    void delete(SysNewsParam param);

    /**
     * 更新
     *
     * @author spt
     * @Date 2021-10-15
     */
    void update(SysNewsParam param);

    /**
     * 查询单条数据，Specification模式
     *
     * @author spt
     * @Date 2021-10-15
     */
    SysNewsResult findBySpec(SysNewsParam param);

    /**
     * 查询列表，Specification模式
     *
     * @author spt
     * @Date 2021-10-15
     */
    List<SysNewsResult> findListBySpec(SysNewsParam param);

    /**
     * 查询分页数据，Specification模式
     *
     * @author spt
     * @Date 2021-10-15
     */
     LayuiPageInfo findPageBySpec(SysNewsParam param);

}
