package cn.hnsl.sys.modular.system.service;

import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.entity.SysConfig;
import cn.hnsl.sys.modular.system.model.params.SysConfigParam;
import cn.hnsl.sys.modular.system.model.result.SysConfigResult;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 参数配置 服务类
 * </p>
 *
 * @author spot
 * @since 2019-06-20
 */
public interface SysConfigService extends IService<SysConfig> {

    /**
     * 新增
     *
     * @author spot
     * @Date 2019-06-20
     */
    void add(SysConfigParam param);

    /**
     * 删除
     *
     * @author spot
     * @Date 2019-06-20
     */
    void delete(SysConfigParam param);

    /**
     * 更新
     *
     * @author spot
     * @Date 2019-06-20
     */
    void update(SysConfigParam param);

    /**
     * 查询单条数据，Specification模式
     *
     * @author spot
     * @Date 2019-06-20
     */
    SysConfigResult findBySpec(SysConfigParam param);

    /**
     * 查询列表，Specification模式
     *
     * @author spot
     * @Date 2019-06-20
     */
    List<SysConfigResult> findListBySpec(SysConfigParam param);

    /**
     * 查询分页数据，Specification模式
     *
     * @author spot
     * @Date 2019-06-20
     */
    LayuiPageInfo findPageBySpec(SysConfigParam param);

}
