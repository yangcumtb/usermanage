package cn.hnsl.base.consts;

import cn.hnsl.base.enums.CommonStatus;
import cn.hnsl.core.util.ToolUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static cn.hnsl.base.consts.ConfigConstant.SYSTEM_CONSTANT_PREFIX;
import static cn.hnsl.core.util.ToolUtil.getTempPath;

/**
 * 系统常量的容器
 *
 * @author fengshuonan
 * @Date 2019-06-20 13:37
 */
@Slf4j
public class ConstantsContext {

    private static final String TIPS_END = "，若想忽略此提示，请在开发管理->系统配置->参数配置，设置相关参数！";

    public final String sys_code = "SOIL";

    /**
     * 所有的常量，可以增删改查
     */
    private static Map<String, Object> CONSTNTS_HOLDER = new ConcurrentHashMap<>();

    /**
     * 添加系统常量
     */
    public static void putConstant(String key, Object value) {
        if (ToolUtil.isOneEmpty(key, value)) {
            return;
        }
        CONSTNTS_HOLDER.put(key, value);
    }

    /**
     * 删除常量
     */
    public static void deleteConstant(String key) {
        if (ToolUtil.isOneEmpty(key)) {
            return;
        }

        //如果是系统常量
        if (!key.startsWith(SYSTEM_CONSTANT_PREFIX)) {
            CONSTNTS_HOLDER.remove(key);
        }
    }

    /**
     * 获取系统常量
     */
    public static Map<String, Object> getConstntsMap() {
        return CONSTNTS_HOLDER;
    }

    /**
     * 获取验证码开关
     */
    public static Boolean getKaptchaOpen() {
        String hnslKaptchaOpen = (String) CONSTNTS_HOLDER.get("HNSL_KAPTCHA_OPEN");
        if (CommonStatus.ENABLE.getCode().equalsIgnoreCase(hnslKaptchaOpen)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取验证码开关
     */
    public static Boolean getImOpen() {
        String ImOpen = (String) CONSTNTS_HOLDER.get("HNSL_IM_OPEN");
        if (CommonStatus.ENABLE.getCode().equalsIgnoreCase(ImOpen)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取管理系统名称
     */
    public static String getSystemName() {
        String systemName = (String) CONSTNTS_HOLDER.get("HNSL_SYSTEM_NAME");
        if (ToolUtil.isEmpty(systemName)) {
            log.error("系统常量存在空值！常量名称：HNSL_SYSTEM_NAME，采用默认名称：Guns快速开发平台" + TIPS_END);
            return "Guns快速开发平台";
        } else {
            return systemName;
        }
    }

    /**
     * 获取历史遗留项目文件清单
     */
    public static String getLsylFileName() {
        String FileName = (String) CONSTNTS_HOLDER.get("HNSL_LSYLFILE_NAME");
        if (ToolUtil.isEmpty(FileName)) {
            log.error("文件清单报错" + TIPS_END);
            return "Guns快速开发平台";
        } else {
            return FileName;
        }
    }

    /**
     * 获取管理系统名称
     */
    public static String getSystemCode() {
        String systemCode = (String) CONSTNTS_HOLDER.get("HNSL_SYSTEM_CODE");
        if (ToolUtil.isEmpty(systemCode)) {
            log.error("系统常量存在空值！常量名称：HNSL_SYSTEM_NAME，采用默认名称：Guns快速开发平台" + TIPS_END);
            return "TEMPLATE";
        } else {
            return systemCode;
        }
    }

    /**
     * 获取管理系统名称
     */
    public static String getDefaultPassword() {
        String defaultPassword = (String) CONSTNTS_HOLDER.get("HNSL_DEFAULT_PASSWORD");
        if (ToolUtil.isEmpty(defaultPassword)) {
            log.error("系统常量存在空值！常量名称：HNSL_DEFAULT_PASSWORD，采用默认密码：111111" + TIPS_END);
            return "111111";
        } else {
            return defaultPassword;
        }
    }

    /**
     * 获取管理系统名称
     */
    public static String getOAuth2UserPrefix() {
        String oauth2Prefix = (String) CONSTNTS_HOLDER.get("HNSL_OAUTH2_PREFIX");
        if (ToolUtil.isEmpty(oauth2Prefix)) {
            log.error("系统常量存在空值！常量名称：HNSL_OAUTH2_PREFIX，采用默认值：oauth2" + TIPS_END);
            return "oauth2";
        } else {
            return oauth2Prefix;
        }
    }

    /**
     * 获取顶部导航条是否开启
     */
    public static Boolean getDefaultAdvert() {
        String hnslDefaultAdvert = (String) CONSTNTS_HOLDER.get("HNSL_DEFAULT_ADVERT");
        if (ToolUtil.isEmpty(hnslDefaultAdvert)) {
            log.error("系统常量存在空值！常量名称：HNSL_DEFAULT_ADVERT，采用默认值：true" + TIPS_END);
            return true;
        } else {
            if (CommonStatus.ENABLE.getCode().equalsIgnoreCase(hnslDefaultAdvert)) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 获取系统发布的版本号（防止css和js的缓存）
     */
    public static String getReleaseVersion() {
        String systemReleaseVersion = (String) CONSTNTS_HOLDER.get("HNSL_SYSTEM_RELEASE_VERSION");
        if (ToolUtil.isEmpty(systemReleaseVersion)) {
            log.error("系统常量存在空值！常量名称：HNSL_SYSTEM_RELEASE_VERSION，采用默认值：hnsl" + TIPS_END);
            return ToolUtil.getRandomString(8);
        } else {
            return systemReleaseVersion;
        }
    }

    /**
     * 获取文件上传路径(用于头像和富文本编辑器)
     */
    public static String getFileUploadPath() {
        String hnslFileUploadPath = (String) CONSTNTS_HOLDER.get("HNSL_FILE_UPLOAD_PATH");
        if (ToolUtil.isEmpty(hnslFileUploadPath)) {
            log.error("系统常量存在空值！常量名称：HNSL_FILE_UPLOAD_PATH，采用默认值：系统tmp目录" + TIPS_END);
            return getTempPath();
        } else {
            //判断有没有结尾符
            if (!hnslFileUploadPath.endsWith(File.separator)) {
                hnslFileUploadPath = hnslFileUploadPath + File.separator;
            }

            //判断目录存不存在
            File file = new File(hnslFileUploadPath);
            if (!file.exists()) {
                boolean mkdirs = file.mkdirs();
                if (mkdirs) {
                    return hnslFileUploadPath;
                } else {
                    log.error("系统常量存在空值！常量名称：HNSL_FILE_UPLOAD_PATH，采用默认值：系统tmp目录" + TIPS_END);
                    return getTempPath();
                }
            } else {
                return hnslFileUploadPath;
            }
        }
    }

    /**
     * 用于存放bpmn文件
     */
    public static String getBpmnFileUploadPath() {
        String bpmnFileUploadPath = (String) CONSTNTS_HOLDER.get("HNSL_BPMN_FILE_UPLOAD_PATH");
        if (ToolUtil.isEmpty(bpmnFileUploadPath)) {
            log.error("系统常量存在空值！常量名称：HNSL_BPMN_FILE_UPLOAD_PATH，采用默认值：系统tmp目录" + TIPS_END);
            return getTempPath();
        } else {
            //判断有没有结尾符
            if (!bpmnFileUploadPath.endsWith(File.separator)) {
                bpmnFileUploadPath = bpmnFileUploadPath + File.separator;
            }

            //判断目录存不存在
            File file = new File(bpmnFileUploadPath);
            if (!file.exists()) {
                boolean mkdirs = file.mkdirs();
                if (mkdirs) {
                    return bpmnFileUploadPath;
                } else {
                    log.error("系统常量存在空值！常量名称：HNSL_BPMN_FILE_UPLOAD_PATH，采用默认值：系统tmp目录" + TIPS_END);
                    return getTempPath();
                }
            } else {
                return bpmnFileUploadPath;
            }
        }
    }

    /**
     * 获取系统地密钥
     */
    public static String getJwtSecret() {
        String systemReleaseVersion = (String) CONSTNTS_HOLDER.get("HNSL_JWT_SECRET");
        if (ToolUtil.isEmpty(systemReleaseVersion)) {
            String randomSecret = ToolUtil.getRandomString(32);
            CONSTNTS_HOLDER.put("HNSL_JWT_SECRET", randomSecret);
            log.error("jwt密钥存在空值！常量名称：HNSL_JWT_SECRET，采用默认值：随机字符串->" + randomSecret + TIPS_END);
            return randomSecret;
        } else {
            return systemReleaseVersion;
        }
    }

    /**
     * 获取系统地密钥过期时间（单位：秒）
     */
    public static Long getJwtSecretExpireSec() {
        Long defaultSecs = 86400L;
        String systemReleaseVersion = (String) CONSTNTS_HOLDER.get("HNSL_JWT_SECRET_EXPIRE");
        if (ToolUtil.isEmpty(systemReleaseVersion)) {
            log.error("jwt密钥存在空值！常量名称：HNSL_JWT_SECRET_EXPIRE，采用默认值：1天" + TIPS_END);
            CONSTNTS_HOLDER.put("HNSL_JWT_SECRET_EXPIRE", String.valueOf(defaultSecs));
            return defaultSecs;
        } else {
            try {
                return Long.valueOf(systemReleaseVersion);
            } catch (NumberFormatException e) {
                log.error("jwt密钥过期时间不是数字！常量名称：HNSL_JWT_SECRET_EXPIRE，采用默认值：1天" + TIPS_END);
                CONSTNTS_HOLDER.put("HNSL_JWT_SECRET_EXPIRE", String.valueOf(defaultSecs));
                return defaultSecs;
            }
        }
    }

    /**
     * 获取token的header标识
     */
    public static String getTokenHeaderName() {
        String tokenHeaderName = (String) CONSTNTS_HOLDER.get("HNSL_TOKEN_HEADER_NAME");
        if (ToolUtil.isEmpty(tokenHeaderName)) {
            String defaultName = "Authorization";
            CONSTNTS_HOLDER.put("HNSL_TOKEN_HEADER_NAME", defaultName);
            log.error("获取token的header标识为空！常量名称：HNSL_TOKEN_HEADER_NAME，采用默认值：" + defaultName + TIPS_END);
            return defaultName;
        } else {
            return tokenHeaderName;
        }
    }


    /**
     * 获取token的header标识
     */
    public static String getSystemWsConfig() {
        String wsUrl = (String) CONSTNTS_HOLDER.get("WEB_SOCKET_WS_URL");
        if (ToolUtil.isEmpty(wsUrl)) {
            String defaultName = "ws://localhost:8082/webSocket/{token}";
            CONSTNTS_HOLDER.put("WEB_SOCKET_WS_URL", defaultName);
            log.error("获取token的header标识为空！常量名称：WEB_SOCKET_WS_URL，采用默认值：" + defaultName + TIPS_END);
            return defaultName;
        } else {
            return wsUrl;
        }
    }



    /**
     * 获取会话过期时间，默认2小时
     *
     * @author spot
     * @date 2020/7/9 16:18
     */
    public static Long getSessionTokenExpireSec() {
        return 24 * 60 * 60L;
    }

    /**
     * 获取系统地密钥过期时间（单位：秒）
     */
    public static Long getSessionExpireSeconds() {
        return 15 * 60L;
    }


}
