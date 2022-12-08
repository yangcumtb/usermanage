
package cn.hnsl.sys.core.constant.factory;

import cn.hnsl.base.pojo.node.SelectOption;
import cn.hnsl.sys.modular.system.entity.Dict;
import cn.hnsl.sys.modular.system.entity.SysMenu;

import java.util.List;

/**
 * 常量生产工厂的接口
 *
 * @author fengshuonan
 * @date 2017-06-14 21:12
 */
public interface IConstantFactory {

    /**
     * 根据用户id获取用户名称
     *
     * @author spot
     * @Date 2017/5/9 23:41
     */
    String getUserNameById(Long userId);

    /**
     * 根据用户id获取用户账号
     *
     * @author spot
     * @date 2017年5月16日21:55:371
     */
    String getUserAccountById(Long userId);



    /**
     * 获取部门名称
     */
    String getDeptName(Long deptId);


    /**
     * 获取字典名称
     */
    String getDictName(Long dictId);

    /**
     * 获取通知标题
     */
    String getNoticeTitle(Long dictId);

    /**
     * 根据字典名称和字典中的值获取对应的名称
     */
    String getDictsByName(String name, String code);

    /**
     * 获取字典名称
     */
    String getDictNameByCode(String dictCode);

    /**
     * 获取性别名称
     */
    String getSexName(String sexCode);

    /**
     * 获取用户登录状态
     */
    String getStatusName(String status);

    /**
     * 获取菜单状态
     */
    String getMenuStatusName(String status);

    /**
     * 查询字典
     */
    List<Dict> findInDict(Long id);

    /**
     * 获取被缓存的对象(用户删除业务)
     */
    String getCacheObject(String para);

    /**
     * 获取子部门id
     */
    List<Long> getSubDeptId(Long deptId);

    /**
     * 获取所有父部门id
     */
    List<Long> getParentDeptIds(Long deptId);

    /**
     * 获取用户的职位名称
     */
    String getPositionName(Long userId);

    /**
     * 获取用户的职位ids
     */
    String getPositionIds(Long userId);

    /**
     * 根据字典名称和字典中的值获取对应的名称
     */
    List<SelectOption> getDictItemsByCode(String dictCode);

    /**
     * 根据字典类型及字典编码获取字典名称
     *
     * @param dictCode
     * @param dictType
     * @return
     */
    String dictNameByCode(Object dictCode, String dictType);
}
