package cn.hnsl.sys.modular.system.mapper;

import cn.hnsl.base.pojo.node.SelectOption;
import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.sys.modular.system.entity.Dict;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 基础字典 Mapper 接口
 * </p>
 *
 * @author spot
 * @since 2019-03-13
 */
public interface DictMapper extends BaseMapper<Dict> {

    /**
     * 获取ztree的节点列表
     */
    List<ZTreeNode> dictTree(@Param("dictTypeId") Long dictTypeId);

    /**
     * where parentIds like ''
     */
    List<Dict> likeParentIds(@Param("dictId") Long dictId);

    /**
     * 根据字典类型编码，获取字典列表
     * @param dictTypeCode
     * @return
     */
    List<SelectOption> getDictItemsByCode(@Param("dictTypeCode") String dictTypeCode);

    /**
     * 根据字典类型编码以及字典编码，获取字典名称
     * @param dictCode
     * @param dictType
     * @return
     */
    String dictNameByCode(@Param("dictCode") String dictCode, @Param("dictTypeCode") String dictType);
}
