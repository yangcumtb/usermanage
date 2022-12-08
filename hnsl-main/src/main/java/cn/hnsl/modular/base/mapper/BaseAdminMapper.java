package cn.hnsl.modular.base.mapper;

import cn.hnsl.base.pojo.node.LayuiTreeNode;
import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.modular.base.entity.BaseAdmin;
import cn.hnsl.modular.base.model.params.BaseAdminParam;
import cn.hnsl.modular.base.model.result.BaseAdminResult;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 行政区划 Mapper 接口
 * </p>
 *
 * @author spt
 * @since 2020-07-03
 */
public interface BaseAdminMapper extends BaseMapper<BaseAdmin> {

    /**
     * 获取列表
     *
     * @author spt
     * @Date 2020-07-03
     */
    List<BaseAdminResult> customList(@Param("paramCondition") BaseAdminParam paramCondition);

    /**
     * 获取map列表
     *
     * @author spt
     * @Date 2020-07-03
     */
    List<Map<String, Object>> customMapList(@Param("paramCondition") BaseAdminParam paramCondition);

    /**
     * 获取分页实体列表
     *
     * @author spt
     * @Date 2020-07-03
     */
    Page<BaseAdminResult> customPageList(@Param("page") Page page, @Param("paramCondition") BaseAdminParam paramCondition);

    /**
     * 获取分页map列表
     *
     * @author spt
     * @Date 2020-07-03
     */
    Page<Map<String, Object>> customPageMapList(@Param("page") Page page, @Param("paramCondition") BaseAdminParam paramCondition);

    /**
     * 获取layui树形节点
     *
     * @param baseAdmin
     * @return
     */
    List<LayuiTreeNode> layuiTree(@Param("param") BaseAdmin baseAdmin);


    List<LayuiTreeNode> layuiTreeOverGrade(@Param("param") BaseAdmin baseAdmin, @Param("grade") String grade);

    /**
     * ztree树
     *
     * @param baseAdmin
     * @return
     */
    List<ZTreeNode> tree(@Param("param") BaseAdmin baseAdmin);

    /**
     * 获取下级政区
     *
     * @param upAdCode
     * @return
     */
    Long getMinChildCode(String upAdCode);

    /**
     * 获取直属政区
     *
     * @param adCode
     * @return
     */
    List<BaseAdmin> getDirAdminByCode(@Param("adCode") String adCode);

    /**
     * 获取下级直属政区
     *
     * @param adCode
     * @return
     */
    List<Map<String, Object>> dirAdmin(@Param("adCode") String adCode);

    /**
     * 生成任务流水号
     *
     * @return
     */
    String generateSeq(@Param("name") String name,
                       @Param("type") Integer type);

    /**
     * 生成任务流水号
     *
     * @return
     */
    String generateSeqByTime(@Param("name") String name,
                             @Param("type") Integer type,
                             @Param("time") String time);

    void saveSeq(@Param("code") String code, @Param("ip") String ip);


    /**
     * 根据ad_code查询ad_name
     */
    String get_ad_name(String param);


    List<String> getAllCityNameList();
}
