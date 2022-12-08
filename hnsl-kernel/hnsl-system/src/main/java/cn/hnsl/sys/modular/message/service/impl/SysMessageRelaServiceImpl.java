package cn.hnsl.sys.modular.message.service.impl;

import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.base.pojo.page.LayuiPageInfo;

import cn.hnsl.sys.modular.message.entity.SysMessageRela;
import cn.hnsl.sys.modular.message.mapper.SysMessageRelaMapper;
import cn.hnsl.sys.modular.message.model.params.SysMessageRelaParam;
import cn.hnsl.sys.modular.message.model.result.SysMessageRelaResult;
import  cn.hnsl.sys.modular.message.service.SysMessageRelaService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 * 系统消息用户关系表 服务实现类
 * </p>
 *
 * @author spt
 * @since 2021-09-17
 */
@Service
public class SysMessageRelaServiceImpl extends ServiceImpl<SysMessageRelaMapper, SysMessageRela> implements SysMessageRelaService {

    @Override
    public void add(SysMessageRelaParam param){
        SysMessageRela entity = getEntity(param);
        this.save(entity);
    }

    @Override
    public void delete(SysMessageRelaParam param){
        this.removeById(getKey(param));
    }

    @Override
    public void update(SysMessageRelaParam param){
        SysMessageRela oldEntity = getOldEntity(param);
        SysMessageRela newEntity = getEntity(param);
        ToolUtil.copyProperties(newEntity, oldEntity);
        this.updateById(newEntity);
    }

    @Override
    public SysMessageRelaResult findBySpec(SysMessageRelaParam param){
        return null;
    }

    @Override
    public List<SysMessageRelaResult> findListBySpec(SysMessageRelaParam param){
        return null;
    }

    @Override
    public LayuiPageInfo findPageBySpec(SysMessageRelaParam param){
        Page pageContext = getPageContext();
        IPage page = this.baseMapper.customPageList(pageContext, param);
        return LayuiPageFactory.createPageInfo(page);
    }

    private Serializable getKey(SysMessageRelaParam param){
        return param.getMessageId();
    }

    private Page getPageContext() {
        return LayuiPageFactory.defaultPage();
    }

    private SysMessageRela getOldEntity(SysMessageRelaParam param) {
        return this.getById(getKey(param));
    }

    private SysMessageRela getEntity(SysMessageRelaParam param) {
        SysMessageRela entity = new SysMessageRela();
        ToolUtil.copyProperties(param, entity);
        return entity;
    }

}
