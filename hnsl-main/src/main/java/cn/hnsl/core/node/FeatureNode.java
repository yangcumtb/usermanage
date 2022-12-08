package cn.hnsl.core.node;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;

@Data
public class FeatureNode {

    //要素类型，为固定值
    private final String type = "Feature";

    //要素集合信息
    private JSONObject geometry;

    //要素属性信息
    private JSONObject properties;

}
