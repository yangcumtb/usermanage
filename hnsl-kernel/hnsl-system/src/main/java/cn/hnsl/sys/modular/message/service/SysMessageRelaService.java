package cn.hnsl.sys.modular.message.service;

import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.message.entity.SysMessageRela;
import cn.hnsl.sys.modular.message.model.params.SysMessageRelaParam;
import cn.hnsl.sys.modular.message.model.result.SysMessageRelaResult;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
/**
 * <p>
 * 系统消息用户关系表 服务类
 * </p>
 *
 * @author spt
 * @since 2021-09-17
 */
public interface SysMessageRelaService extends IService<SysMessageRela> {

    /**
     * 新增
     *
     * @author spt
     * @Date 2021-09-17
     */
    void add(SysMessageRelaParam param);

    /**
     * 删除
     *
     * @author spt
     * @Date 2021-09-17
     */
    void delete(SysMessageRelaParam param);

    /**
     * 更新
     *
     * @author spt
     * @Date 2021-09-17
     */
    void update(SysMessageRelaParam param);

    /**
     * 查询单条数据，Specification模式
     *
     * @author spt
     * @Date 2021-09-17
     */
    SysMessageRelaResult findBySpec(SysMessageRelaParam param);

    /**
     * 查询列表，Specification模式
     *
     * @author spt
     * @Date 2021-09-17
     */
    List<SysMessageRelaResult> findListBySpec(SysMessageRelaParam param);

    /**
     * 查询分页数据，Specification模式
     *
     * @author spt
     * @Date 2021-09-17
     */
     LayuiPageInfo findPageBySpec(SysMessageRelaParam param);

}
