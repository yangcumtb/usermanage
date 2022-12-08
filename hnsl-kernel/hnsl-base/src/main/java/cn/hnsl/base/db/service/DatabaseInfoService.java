package cn.hnsl.base.db.service;

import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.base.db.entity.DatabaseInfo;
import cn.hnsl.base.db.model.params.DatabaseInfoParam;
import cn.hnsl.base.db.model.result.DatabaseInfoResult;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 数据库信息表 服务类
 * </p>
 *
 * @author spot
 * @since 2019-06-15
 */
public interface DatabaseInfoService extends IService<DatabaseInfo> {

    /**
     * 新增
     *
     * @author spot
     * @Date 2019-06-15
     */
    void add(DatabaseInfoParam param);

    /**
     * 删除
     *
     * @author spot
     * @Date 2019-06-15
     */
    void delete(DatabaseInfoParam param);

    /**
     * 更新
     *
     * @author spot
     * @Date 2019-06-15
     */
    void update(DatabaseInfoParam param);

    /**
     * 查询单条数据，Specification模式
     *
     * @author spot
     * @Date 2019-06-15
     */
    DatabaseInfoResult findBySpec(DatabaseInfoParam param);

    /**
     * 查询列表，Specification模式
     *
     * @author spot
     * @Date 2019-06-15
     */
    List<DatabaseInfoResult> findListBySpec(DatabaseInfoParam param);

    /**
     * 查询分页数据，Specification模式
     *
     * @author spot
     * @Date 2019-06-15
     */
    LayuiPageInfo findPageBySpec(DatabaseInfoParam param);

}
