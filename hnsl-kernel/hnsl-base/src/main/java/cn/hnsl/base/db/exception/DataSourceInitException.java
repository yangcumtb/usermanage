package cn.hnsl.base.db.exception;

import cn.hnsl.model.exception.AbstractExceptionEnum;
import cn.hnsl.model.exception.ServiceException;

/**
 * 数据源容器初始化失败异常
 *
 * @author fengshuonan
 * @date 2019-06-12-13:53
 */
public class DataSourceInitException extends ServiceException {

    public DataSourceInitException(AbstractExceptionEnum exception) {
        super(exception);
    }

    public enum ExEnum implements AbstractExceptionEnum {

        DATA_SOURCE_READ_ERROR("500", "获取主数据源异常"),
        INIT_DATA_SOURCE_ERROR("500", "初始化数据源异常"),
        DELETE_TENANT_ERROR("500", "不能删除租户数据源"),
        REPEAT_ERROR("500", "数据源已存在，请更换名称！"),
        INIT_DATASOURCE_ERROR("500", "数据源连接错误，请检查连接配置！"),
        NAME_REPEAT_ERROR("500", "当前上下文中已存在该名称，请重启项目或更换名称！"),
        QUERY_DATASOURCE_INFO_ERROR("500", "查询数据库中数据源信息错误");

        ExEnum(String errorCode, String userTip) {
            this.errorCode = errorCode;
            this.userTip = userTip;
        }

        private String errorCode;

        private String userTip;

        @Override
        public String getErrorCode() {
            return errorCode;
        }

        @Override
        public String getUserTip() {
            return userTip;
        }

    }

}
