package cn.hnsl.sys.modular.system.service;

import cn.hnsl.sys.modular.system.entity.OperationLog;
import cn.hnsl.sys.modular.system.mapper.OperationLogMapper;
import cn.hnsl.sys.modular.system.model.params.OperationLogParam;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 操作日志 服务实现类
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
@Service
public class OperationLogService extends ServiceImpl<OperationLogMapper, OperationLog> {

    /**
     * 获取操作日志列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:41 PM
     */
    public List<Map<String, Object>> getOperationLogs(Page page,String title,Integer businessType,Integer status,String beginTime, String endTime,String operName) {
        return this.baseMapper.getOperationLogs(page, title,businessType,status,beginTime, endTime,operName);
    }

}
