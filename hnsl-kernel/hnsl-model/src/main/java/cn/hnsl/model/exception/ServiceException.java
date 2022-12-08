/**
 * Copyright 2018-2020 stylefeng & fengshuonan (sn93@qq.com)
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package cn.hnsl.model.exception;

import cn.hutool.core.util.StrUtil;

/**
 * 业务异常的封装
 *
 * @author fengshuonan
 * @date 2016年11月12日 下午5:05:10
 */
public class ServiceException extends RuntimeException {
    /**
     * 异常的模块名称
     */
    private String moduleName;

    private String errorCode;

    private String userTip;


    public ServiceException(String errorCode, String userTip) {
        super(userTip);
        this.errorCode = errorCode;
        this.userTip = userTip;
    }

    public ServiceException(AbstractExceptionEnum exception) {
        super(exception.getUserTip());
        this.errorCode = exception.getErrorCode();
        this.userTip = exception.getUserTip();
    }

    public ServiceException(AbstractExceptionEnum exception, Object... params) {
        super(StrUtil.format(exception.getUserTip(), params));
        this.errorCode = exception.getErrorCode();
        this.userTip = StrUtil.format(exception.getUserTip(), params);
    }

    public ServiceException(String moduleName, AbstractExceptionEnum exception) {
        super(exception.getUserTip());
        this.moduleName = moduleName;
        this.errorCode = exception.getErrorCode();
        this.userTip = exception.getUserTip();
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getUserTip() {
        return userTip;
    }

    public void setUserTip(String userTip) {
        this.userTip = userTip;
    }
}
