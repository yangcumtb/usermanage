package cn.hnsl.core.node;

import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.sys.core.util.PositionUtil;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.convert.Convert;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class FeatureCollection {

    //geojson 类型
    private final String type = "FeatureCollection";

    //要素数量
    private Integer num;

    //要素集合
    private List<FeatureNode> features = new ArrayList<>();

    public FeatureCollection(List<? extends Object> list, String _latKey, String _lngKey) {
        int i = 0;
        for (Object object : list) {
            Map<String, Object> objectMap;
            if (object instanceof Map) {
                objectMap = (Map<String, Object>) object;
            } else {
                objectMap = BeanUtil.beanToMap(object);
            }

            //经纬度为空是，跳过
            if (ToolUtil.isOneEmpty(objectMap.get(_latKey), objectMap.get(_lngKey))) continue;

            //创建Feature
            FeatureNode feature = new FeatureNode();

            JSONObject geometry = new JSONObject();

            geometry.put("type", "Point");

            Double[] latlng = {Convert.toDouble(objectMap.get(_latKey)), Convert.toDouble(objectMap.get(_lngKey))};

            geometry.put("coordinates", PositionUtil.transformlatlng(latlng));

            feature.setGeometry(geometry);

            JSONObject properties = JSONObject.parseObject(JSON.toJSONString(objectMap));

            feature.setProperties(properties);

            this.getFeatures().add(feature);

            i++;
        }
        this.setNum(i);
    }

    public FeatureCollection() {

    }
}
