package cn.hnsl.socket;

import cn.hnsl.socket.config.SocketOperatorApi;
import cn.hnsl.socket.operator.WebSocketOperator;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Socket的自动配置类
 *
 * @author majianguo
 * @date 2021/6/2 下午5:48
 */
@Configuration
public class BizSocketAutoConfiguration {

    /**
     * Socket操作实现类
     *
     * @author majianguo
     * @date 2021/6/2 下午5:48
     **/
    @Bean
    @ConditionalOnMissingBean(SocketOperatorApi.class)
    public SocketOperatorApi socketOperatorApi() {
        return new WebSocketOperator();
    }

}
