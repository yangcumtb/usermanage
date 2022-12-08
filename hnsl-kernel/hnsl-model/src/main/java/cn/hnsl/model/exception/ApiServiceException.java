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

import lombok.Getter;
import lombok.Setter;

/**
 * 远程接口调用出现的业务异常
 *
 * @author fengshuonan
 * @date 2018-08-06-上午11:33
 */
@Getter
@Setter
public abstract class ApiServiceException extends Exception {

    /**
     * 错误编码
     */
    private String errorCode;

    private String userTip;

    /**
     * 默认用于dubbo反序列化
     */
    public ApiServiceException() {

    }

    public ApiServiceException(AbstractExceptionEnum exception) {
        super(exception.getUserTip());
        this.errorCode = exception.getErrorCode();
        this.userTip = exception.getUserTip();
    }

    /**
     * 获取异常的类的具体名称
     */
    public String getExceptionClassName() {
        return this.getClass().getName();
    }
}
