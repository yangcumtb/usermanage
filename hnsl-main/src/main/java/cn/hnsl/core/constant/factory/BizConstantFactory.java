package cn.hnsl.core.constant.factory;

import cn.hnsl.core.util.SpringContextHolder;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

@Component
@DependsOn("springContextHolder")
public class BizConstantFactory implements IBizConstantFactory {


    public static IBizConstantFactory me() {
        return SpringContextHolder.getBean("bizConstantFactory");
    }


}
