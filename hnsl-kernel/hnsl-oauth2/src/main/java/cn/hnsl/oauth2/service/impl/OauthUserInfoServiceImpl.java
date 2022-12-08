package cn.hnsl.oauth2.service.impl;

import cn.hnsl.base.oauth2.service.OauthUserInfoService;
import cn.hnsl.base.pojo.page.LayuiPageFactory;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.base.oauth2.entity.OauthUserInfo;
import cn.hnsl.oauth2.mapper.OauthUserInfoMapper;
import cn.hnsl.base.oauth2.model.params.OauthUserInfoParam;
import cn.hnsl.base.oauth2.model.result.OauthUserInfoResult;
import cn.hnsl.core.util.ToolUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 * 第三方用户信息表 服务实现类
 * </p>
 *
 * @author spot
 * @since 2019-06-09
 */
@Service
public class OauthUserInfoServiceImpl extends ServiceImpl<OauthUserInfoMapper, OauthUserInfo> implements OauthUserInfoService {

    @Override
    public void add(OauthUserInfoParam param) {
        OauthUserInfo entity = getEntity(param);
        this.save(entity);
    }

    @Override
    public void delete(OauthUserInfoParam param) {
        this.removeById(getKey(param));
    }

    @Override
    public void update(OauthUserInfoParam param) {
        OauthUserInfo oldEntity = getOldEntity(param);
        OauthUserInfo newEntity = getEntity(param);
        ToolUtil.copyProperties(newEntity, oldEntity);
        this.updateById(newEntity);
    }

    @Override
    public OauthUserInfoResult findBySpec(OauthUserInfoParam param) {
        return null;
    }

    @Override
    public List<OauthUserInfoResult> findListBySpec(OauthUserInfoParam param) {
        return null;
    }

    @Override
    public LayuiPageInfo findPageBySpec(OauthUserInfoParam param) {
        Page pageContext = getPageContext();
        IPage page = this.baseMapper.customPageList(pageContext, param);
        return LayuiPageFactory.createPageInfo(page);
    }

    @Override
    public String getAvatarUrl(Long userId) {
        OauthUserInfo oauthUserInfo = this.getOne(new QueryWrapper<OauthUserInfo>().eq("user_id", userId));
        return oauthUserInfo.getAvatar();
    }

    private Serializable getKey(OauthUserInfoParam param) {
        return param.getOauthId();
    }

    private Page getPageContext() {
        return LayuiPageFactory.defaultPage();
    }

    private OauthUserInfo getOldEntity(OauthUserInfoParam param) {
        return this.getById(getKey(param));
    }

    private OauthUserInfo getEntity(OauthUserInfoParam param) {
        OauthUserInfo entity = new OauthUserInfo();
        ToolUtil.copyProperties(param, entity);
        return entity;
    }

}
