package cn.hnsl.sys.modular.message.service.impl;

import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.sys.modular.message.entity.SysMessage;
import cn.hnsl.sys.modular.message.mapper.SysMessageMapper;
import cn.hnsl.sys.modular.message.model.params.SysMessageParam;
import cn.hnsl.sys.modular.message.model.result.SysMessageResult;
import  cn.hnsl.sys.modular.message.service.SysMessageService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 * 系统消息 服务实现类
 * </p>
 *
 * @author spt
 * @since 2021-09-17
 */
@Service
public class SysMessageServiceImpl extends ServiceImpl<SysMessageMapper, SysMessage> implements SysMessageService {

    @Override
    public void add(SysMessageParam param){
        SysMessage entity = getEntity(param);
        this.save(entity);
    }

    @Override
    public void delete(SysMessageParam param){
        this.removeById(getKey(param));
    }

    @Override
    public void update(SysMessageParam param){
        SysMessage oldEntity = getOldEntity(param);
        SysMessage newEntity = getEntity(param);
        ToolUtil.copyProperties(newEntity, oldEntity);
        this.updateById(newEntity);
    }

    @Override
    public SysMessageResult findBySpec(SysMessageParam param){
        return null;
    }

    @Override
    public List<SysMessageResult> findListBySpec(SysMessageParam param){
        return null;
    }

    @Override
    public LayuiPageInfo findPageBySpec(SysMessageParam param){
        Page pageContext = getPageContext();
        IPage page = this.baseMapper.customPageList(pageContext, param);
        return LayuiPageFactory.createPageInfo(page);
    }

    private Serializable getKey(SysMessageParam param){
        return param.getMessageId();
    }

    private Page getPageContext() {
        return LayuiPageFactory.defaultPage();
    }

    private SysMessage getOldEntity(SysMessageParam param) {
        return this.getById(getKey(param));
    }

    private SysMessage getEntity(SysMessageParam param) {
        SysMessage entity = new SysMessage();
        ToolUtil.copyProperties(param, entity);
        return entity;
    }

}
