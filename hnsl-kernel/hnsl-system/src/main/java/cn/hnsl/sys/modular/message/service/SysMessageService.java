package cn.hnsl.sys.modular.message.service;

import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.message.entity.SysMessage;
import cn.hnsl.sys.modular.message.model.params.SysMessageParam;
import cn.hnsl.sys.modular.message.model.result.SysMessageResult;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
/**
 * <p>
 * 系统消息 服务类
 * </p>
 *
 * @author spt
 * @since 2021-09-17
 */
public interface SysMessageService extends IService<SysMessage> {

    /**
     * 新增
     *
     * @author spt
     * @Date 2021-09-17
     */
    void add(SysMessageParam param);

    /**
     * 删除
     *
     * @author spt
     * @Date 2021-09-17
     */
    void delete(SysMessageParam param);

    /**
     * 更新
     *
     * @author spt
     * @Date 2021-09-17
     */
    void update(SysMessageParam param);

    /**
     * 查询单条数据，Specification模式
     *
     * @author spt
     * @Date 2021-09-17
     */
    SysMessageResult findBySpec(SysMessageParam param);

    /**
     * 查询列表，Specification模式
     *
     * @author spt
     * @Date 2021-09-17
     */
    List<SysMessageResult> findListBySpec(SysMessageParam param);

    /**
     * 查询分页数据，Specification模式
     *
     * @author spt
     * @Date 2021-09-17
     */
     LayuiPageInfo findPageBySpec(SysMessageParam param);

}
