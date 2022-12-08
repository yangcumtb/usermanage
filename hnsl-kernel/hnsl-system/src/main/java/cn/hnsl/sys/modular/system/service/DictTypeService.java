package cn.hnsl.sys.modular.system.service;

import cn.hnsl.base.enums.CommonStatus;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.core.exception.enums.BizExceptionEnum;
import cn.hnsl.sys.modular.system.entity.Dict;
import cn.hnsl.sys.modular.system.entity.DictType;
import cn.hnsl.sys.modular.system.mapper.DictTypeMapper;
import cn.hnsl.sys.modular.system.model.params.DictTypeParam;
import cn.hnsl.sys.modular.system.model.result.DictTypeResult;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.RequestEmptyException;
import cn.hnsl.model.exception.ServiceException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 * 字典类型表 服务实现类
 * </p>
 *
 * @author spot
 * @since 2019-03-13
 */
@Service
public class DictTypeService extends ServiceImpl<DictTypeMapper, DictType> {

    @Resource
    private DictService dictService;

    /**
     * 新增
     *
     * @author spot
     * @Date 2019-03-13
     */
    public void add(DictTypeParam param) {

        //判断是否已经存在同编码或同名称字典
        QueryWrapper<DictType> dictQueryWrapper = new QueryWrapper<>();
        dictQueryWrapper.eq("code", param.getCode()).or().eq("name", param.getName());
        List<DictType> list = this.list(dictQueryWrapper);
        if (list != null && list.size() > 0) {
            throw new ServiceException(BizExceptionEnum.DICT_EXISTED);
        }

        DictType entity = getEntity(param);

        //设置状态
        entity.setStatus(CommonStatus.ENABLE.getCode());

        this.save(entity);
    }

    /**
     * 删除
     *
     * @author spot
     * @Date 2019-03-13
     */
    @Transactional(rollbackFor = Exception.class)
    public void delete(DictTypeParam param) {

        if (param == null || param.getDictTypeId() == null) {
            throw new RequestEmptyException("字典类型id为空");
        }

        //删除字典类型
        this.removeById(getKey(param));

        //删除字典
        this.dictService.remove(new QueryWrapper<Dict>().eq("dict_type_id", getKey(param)));
    }

    /**
     * 更新
     *
     * @author spot
     * @Date 2019-03-13
     */
    public void update(DictTypeParam param) {
        DictType oldEntity = getOldEntity(param);
        DictType newEntity = getEntity(param);

        //判断编码是否重复
        QueryWrapper<DictType> wrapper = new QueryWrapper<DictType>()
                .and(i -> i.eq("code", newEntity.getCode()).or().eq("name", newEntity.getName()))
                .and(i -> i.ne("dict_type_id", newEntity.getDictTypeId()));
        int dicts = this.count(wrapper);
        if (dicts > 0) {
            throw new ServiceException(BizExceptionEnum.DICT_EXISTED);
        }
        ToolUtil.copyProperties(newEntity, oldEntity);
        this.updateById(oldEntity);
    }

    /**
     * 查询单条数据，Specification模式
     *
     * @author spot
     * @Date 2019-03-13
     */
    public DictTypeResult findBySpec(DictTypeParam param) {
        return null;
    }

    /**
     * 查询列表，Specification模式
     *
     * @author spot
     * @Date 2019-03-13
     */
    public List<DictTypeResult> findListBySpec(DictTypeParam param) {
        return null;
    }

    /**
     * 查询分页数据，Specification模式
     *
     * @author spot
     * @Date 2019-03-13
     */
    public LayuiPageInfo findPageBySpec(DictTypeParam param) {
        Page pageContext = getPageContext();
        QueryWrapper<DictType> objectQueryWrapper = new QueryWrapper<>();
        if (ToolUtil.isNotEmpty(param.getCondition())) {
            objectQueryWrapper.and(i -> i.eq("code", param.getCondition()).or().eq("name", param.getCondition()));
        }
        if (ToolUtil.isNotEmpty(param.getStatus())) {
            objectQueryWrapper.and(i -> i.eq("status", param.getStatus()));
        }
        if (ToolUtil.isNotEmpty(param.getSystemFlag())) {
            objectQueryWrapper.and(i -> i.eq("system_flag", param.getSystemFlag()));
        }

        pageContext.setAsc("sort");

        IPage page = this.page(pageContext, objectQueryWrapper);
        return LayuiPageFactory.createPageInfo(page);
    }

    private Serializable getKey(DictTypeParam param) {
        return param.getDictTypeId();
    }

    private Page getPageContext() {
        return LayuiPageFactory.defaultPage();
    }

    private DictType getOldEntity(DictTypeParam param) {
        return this.getById(getKey(param));
    }

    private DictType getEntity(DictTypeParam param) {
        DictType entity = new DictType();
        ToolUtil.copyProperties(param, entity);
        return entity;
    }

}
