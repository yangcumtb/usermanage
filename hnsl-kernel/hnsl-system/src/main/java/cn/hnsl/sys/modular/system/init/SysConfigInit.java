package cn.hnsl.sys.modular.system.init;

import cn.hnsl.base.consts.ConstantsContext;
import cn.hnsl.sys.modular.system.service.SysConfigService;
import cn.hnsl.sys.modular.system.entity.SysConfig;
import lombok.extern.slf4j.Slf4j;
import javax.annotation.Resource;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * <p>
 * 参数配置 服务类
 * </p>
 *
 * @author spot
 * @since 2019-06-20
 */
@Component("SysConfigInit")
@Slf4j
public class SysConfigInit implements CommandLineRunner {

    @Resource
    private SysConfigService sysConfigService;

    @Override
    public void run(String... args) {

        //初始化所有的常量
        List<SysConfig> list = sysConfigService.list();

        if (list != null && list.size() > 0) {
            for (SysConfig sysConfig : list) {
                ConstantsContext.putConstant(sysConfig.getCode(), sysConfig.getValue());
            }

            log.info("初始化常量" + list.size() + "条！");
        }

    }
}
