package cn.hnsl.sys.modular.system.service.impl;

import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.sys.modular.system.entity.SysNews;
import cn.hnsl.sys.modular.system.mapper.SysNewsMapper;
import cn.hnsl.sys.modular.system.model.params.SysNewsParam;
import cn.hnsl.sys.modular.system.model.result.SysNewsResult;
import  cn.hnsl.sys.modular.system.service.SysNewsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;
/**
 * <p>
 * 新闻管理 服务实现类
 * </p>
 *
 * @author spt
 * @since 2021-10-15
 */
@Service
public class SysNewsServiceImpl extends ServiceImpl<SysNewsMapper, SysNews> implements SysNewsService {

    @Override
    public void add(SysNewsParam param){
        SysNews entity = getEntity(param);
        this.save(entity);
    }

    @Override
    public void delete(SysNewsParam param){
        this.removeById(getKey(param));
    }

    @Override
    public void update(SysNewsParam param){
        SysNews oldEntity = getOldEntity(param);
        SysNews newEntity = getEntity(param);
        ToolUtil.copyProperties(newEntity, oldEntity);
        this.updateById(oldEntity);
    }

    @Override
    public SysNewsResult findBySpec(SysNewsParam param){
        return null;
    }

    @Override
    public List<SysNewsResult> findListBySpec(SysNewsParam param){
        return null;
    }

    @Override
    public LayuiPageInfo findPageBySpec(SysNewsParam param){
        Page pageContext = getPageContext();
        IPage page = this.baseMapper.customPageList(pageContext, param);
        return LayuiPageFactory.createPageInfo(page);
    }

    private Serializable getKey(SysNewsParam param){
        return param.getNewsId();
    }

    private Page getPageContext() {
        return LayuiPageFactory.defaultPage();
    }

    private SysNews getOldEntity(SysNewsParam param) {
        return this.getById(getKey(param));
    }

    private SysNews getEntity(SysNewsParam param) {
        SysNews entity = new SysNews();
        ToolUtil.copyProperties(param, entity);
        return entity;
    }

}
