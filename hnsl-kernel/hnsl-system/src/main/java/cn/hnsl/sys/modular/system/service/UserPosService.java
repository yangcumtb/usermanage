package cn.hnsl.sys.modular.system.service;

import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.entity.UserPos;
import cn.hnsl.sys.modular.system.model.params.UserPosParam;
import cn.hnsl.sys.modular.system.model.result.UserPosResult;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 用户职位关联表 服务类
 * </p>
 *
 * @author spot
 * @since 2019-06-28
 */
public interface UserPosService extends IService<UserPos> {

    /**
     * 新增
     *
     * @author spot
     * @Date 2019-06-28
     */
    void add(UserPosParam param);

    /**
     * 删除
     *
     * @author spot
     * @Date 2019-06-28
     */
    void delete(UserPosParam param);

    /**
     * 更新
     *
     * @author spot
     * @Date 2019-06-28
     */
    void update(UserPosParam param);

    /**
     * 查询单条数据，Specification模式
     *
     * @author spot
     * @Date 2019-06-28
     */
    UserPosResult findBySpec(UserPosParam param);

    /**
     * 查询列表，Specification模式
     *
     * @author spot
     * @Date 2019-06-28
     */
    List<UserPosResult> findListBySpec(UserPosParam param);

    /**
     * 查询分页数据，Specification模式
     *
     * @author spot
     * @Date 2019-06-28
     */
     LayuiPageInfo findPageBySpec(UserPosParam param);

}
