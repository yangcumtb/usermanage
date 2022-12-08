
package cn.hnsl.sys.core.constant.factory;

import cn.hnsl.base.pojo.node.SelectOption;
import cn.hnsl.sys.core.constant.Const;
import cn.hnsl.sys.modular.system.entity.*;
import cn.hnsl.sys.modular.system.mapper.*;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;
import cn.hnsl.sys.core.constant.cache.Cache;
import cn.hnsl.sys.core.constant.cache.CacheKey;
import cn.hnsl.sys.core.constant.state.ManagerStatus;
import cn.hnsl.sys.core.constant.state.MenuStatus;
import cn.hnsl.sys.core.log.LogObjectHolder;
import cn.hnsl.sys.modular.system.service.PositionService;
import cn.hnsl.sys.modular.system.service.UserPosService;
import cn.hnsl.core.util.SpringContextHolder;
import cn.hnsl.core.util.ToolUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 快捷查询方法
 *
 * @author fengshuonan
 * @date 2017年2月13日 下午10:55:21
 */
@Component
@DependsOn("springContextHolder")
public class ConstantFactory implements IConstantFactory {

    private SysRoleMapper roleMapper = SpringContextHolder.getBean(SysRoleMapper.class);
    private DeptMapper deptMapper = SpringContextHolder.getBean(DeptMapper.class);
    private DictMapper dictMapper = SpringContextHolder.getBean(DictMapper.class);
    private DictTypeMapper dictTypeMapper = SpringContextHolder.getBean(DictTypeMapper.class);
    private UserMapper userMapper = SpringContextHolder.getBean(UserMapper.class);
    private SysMenuMapper sysMenuMapper = SpringContextHolder.getBean(SysMenuMapper.class);
    private NoticeMapper noticeMapper = SpringContextHolder.getBean(NoticeMapper.class);
    private UserPosService userPosService = SpringContextHolder.getBean(UserPosService.class);
    private PositionService positionService = SpringContextHolder.getBean(PositionService.class);

    public static IConstantFactory me() {
        return SpringContextHolder.getBean("constantFactory");
    }

    @Override
    public String getUserNameById(Long userId) {
        SysUser sysUser = userMapper.selectById(userId);
        if (sysUser != null) {
            return sysUser.getName();
        } else {
            return "--";
        }
    }

    @Override
    public String getUserAccountById(Long userId) {
        SysUser sysUser = userMapper.selectById(userId);
        if (sysUser != null) {
            return sysUser.getAccount();
        } else {
            return "--";
        }
    }


    @Override
    @Cacheable(value = Cache.CONSTANT, key = "'" + CacheKey.DEPT_NAME + "'+#deptId")
    public String getDeptName(Long deptId) {
        if (deptId == null) {
            return "";
        } else if (deptId == 0L) {
            return "顶级";
        } else {
            SysDept dept = deptMapper.selectById(deptId);
            if (ToolUtil.isNotEmpty(dept) && ToolUtil.isNotEmpty(dept.getFullName())) {
                return dept.getFullName();
            }
            return "";
        }
    }


    @Override
    public String getDictName(Long dictId) {
        if (ToolUtil.isEmpty(dictId)) {
            return "";
        } else {
            Dict dict = dictMapper.selectById(dictId);
            if (dict == null) {
                return "";
            } else {
                return dict.getName();
            }
        }
    }

    @Override
    public String getNoticeTitle(Long dictId) {
        if (ToolUtil.isEmpty(dictId)) {
            return "";
        } else {
            Notice notice = noticeMapper.selectById(dictId);
            if (notice == null) {
                return "";
            } else {
                return notice.getNoticeTitle();
            }
        }
    }

    @Override
    public String getDictsByName(String name, String code) {
        DictType temp = new DictType();
        temp.setName(name);
        QueryWrapper<DictType> queryWrapper = new QueryWrapper<>(temp);
        DictType dictType = dictTypeMapper.selectOne(queryWrapper);
        if (dictType == null) {
            return "";
        } else {
            QueryWrapper<Dict> wrapper = new QueryWrapper<>();
            wrapper = wrapper.eq("dict_type_id", dictType.getDictTypeId());
            List<Dict> dicts = dictMapper.selectList(wrapper);
            for (Dict item : dicts) {
                if (item.getCode() != null && item.getCode().equals(code)) {
                    return item.getName();
                }
            }
            return "";
        }
    }

    @Override
    public String getDictNameByCode(String dictCode) {
        if (ToolUtil.isEmpty(dictCode)) {
            return "";
        } else {
            QueryWrapper<Dict> dictQueryWrapper = new QueryWrapper<>();
            dictQueryWrapper.eq("code", dictCode);
            Dict dict = dictMapper.selectOne(dictQueryWrapper);
            if (dict == null) {
                return "";
            } else {
                return dict.getName();
            }
        }
    }

    @Override
    public String getSexName(String sexCode) {
        return getDictsByName("性别", sexCode);
    }

    @Override
    public String getStatusName(String status) {
        return ManagerStatus.getDescription(status);
    }

    @Override
    public String getMenuStatusName(String status) {
        return MenuStatus.getDescription(status);
    }

    @Override
    public List<Dict> findInDict(Long id) {
        if (ToolUtil.isEmpty(id)) {
            return null;
        } else {
            QueryWrapper<Dict> wrapper = new QueryWrapper<>();
            List<Dict> dicts = dictMapper.selectList(wrapper.eq("pid", id));
            if (dicts == null || dicts.size() == 0) {
                return null;
            } else {
                return dicts;
            }
        }
    }

    @Override
    public String getCacheObject(String para) {
        return LogObjectHolder.me().get().toString();
    }

    @Override
    public List<Long> getSubDeptId(Long deptId) {
        ArrayList<Long> deptIds = new ArrayList<>();

        if (deptId == null) {
            return deptIds;
        } else {
            List<SysDept> depts = this.deptMapper.likePids(deptId);
            if (depts != null && depts.size() > 0) {
                for (SysDept dept : depts) {
                    deptIds.add(dept.getDeptId());
                }
            }

            return deptIds;
        }
    }

    @Override
    public List<Long> getParentDeptIds(Long deptId) {
        SysDept dept = deptMapper.selectById(deptId);
        String pids = dept.getPids();
        String[] split = pids.split(",");
        ArrayList<Long> parentDeptIds = new ArrayList<>();
        for (String s : split) {
            parentDeptIds.add(Long.valueOf(StrUtil.removeSuffix(StrUtil.removePrefix(s, "["), "]")));
        }
        return parentDeptIds;
    }

    @Override
    public String getPositionName(Long userId) {

        StringBuilder positionNames = new StringBuilder();

        List<UserPos> userPosList = this.userPosService.list(
                new QueryWrapper<UserPos>().eq("user_id", userId));
        if (userPosList != null && userPosList.size() > 0) {
            for (UserPos userPos : userPosList) {
                Position position = positionService.getById(userPos.getPosId());
                if (position != null) {
                    positionNames.append(",").append(position.getName());
                }
            }
        }

        return StrUtil.removePrefix(positionNames.toString(), ",");

    }

    @Override
    public String getPositionIds(Long userId) {
        StringBuilder positionIds = new StringBuilder();

        List<UserPos> userPosList = this.userPosService.list(
                new QueryWrapper<UserPos>().eq("user_id", userId));
        if (userPosList != null && userPosList.size() > 0) {
            for (UserPos userPos : userPosList) {
                Position position = positionService.getById(userPos.getPosId());
                if (position != null) {
                    positionIds.append(",").append(position.getPositionId());
                }
            }
        }

        return StrUtil.removePrefix(positionIds.toString(), ",");
    }

    /**
     * 根据字典名称和字典中的值获取对应的名称
     *
     * @param dictCode
     */
    @Override
    public List<SelectOption> getDictItemsByCode(String dictCode) {
        return dictMapper.getDictItemsByCode(dictCode);
    }

    /**
     * 根据字典类型及字典编码获取字典名称
     *
     * @param dictCode
     * @param dictType
     * @return
     */
    @Override
    @Cacheable(value = Cache.CONSTANT, key = "'" + CacheKey.DICT_TYPE_CODE + "'+#dictType+'_'+#dictCode", unless = "#result == '" + Const.BLANK_STR + "'")
    public String dictNameByCode(Object dictCode, String dictType) {

        if (ToolUtil.isOneEmpty(dictCode, dictType)) {
            return Const.BLANK_STR;
        }

        String result = dictMapper.dictNameByCode(Convert.toStr(dictCode), dictType);

        if (ToolUtil.isEmpty(result)) {
            return Const.BLANK_STR;
        }
        return result;
    }
}
