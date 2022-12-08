
package cn.hnsl;

import cn.hnsl.core.config.MybatisDataSourceAutoConfiguration;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableAsync;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * SpringBoot方式启动类 FlowableSecurityAutoConfiguration
 *
 * @author spot
 * @Date 2017/5/21 12:06
 */
@SpringBootApplication(exclude = {MybatisDataSourceAutoConfiguration.class, SecurityAutoConfiguration.class})
@EnableCaching
@EnableAsync//开启异步调用
public class StartApplication {

    private final static Logger logger = LoggerFactory.getLogger(StartApplication.class);

    public static void main(String[] args) throws UnknownHostException {
        ConfigurableApplicationContext application = SpringApplication.run(StartApplication.class, args);
        Environment env = application.getEnvironment();
        String contextPath = env.getProperty("server.servlet.context-path");
        if(StringUtils.isNoneEmpty(contextPath) && !"/".equals(contextPath)){
            logger.info("\n----------------------------------------------------------\n\t" +
                            "Application '{}' is running! Access URLs:\n\t" +
                            "Login: \thttp://{}:{}{}/login\n\t" +
                            "----------------------------------------------------------",
                    StartApplication.class.getSimpleName(),
                    InetAddress.getLocalHost().getHostAddress(),
                    env.getProperty("server.port"),
                    env.getProperty("server.servlet.context-path"));
        }else {
            logger.info("\n----------------------------------------------------------\n\t" +
                            "Application '{}' is running! Access URLs:\n\t" +
                            "Login: \thttp://{}:{}/login\n\t" +
                            "----------------------------------------------------------",
                    StartApplication.class.getSimpleName(),
                    InetAddress.getLocalHost().getHostAddress(),
                    env.getProperty("server.port"));
        }
    }
}
