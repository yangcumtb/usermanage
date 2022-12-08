var normalm = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    maxZoom: 18,
    minZoom: 1
});
var imgm = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
    maxZoom: 18,
    minZoom: 1
});
var imga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
    maxZoom: 18,
    minZoom: 1
});
var normalLayer = L.layerGroup([normalm]);
var imageLayer = L.layerGroup([imgm, imga]);
var gisMap = new L.map('mapDiv',
    {
        zoom: 15,
        center: [41.3541, 119.6030],
        layers: [imageLayer],
        zoomControl: false,
        attributionControl: false
    });
var popup = L.popup();

var lng = document.getElementById('lng');
var lat = document.getElementById('lat');
// var latlng1 = document.getElementById('latlng1');
L.Control.MousePosition = L.Control.extend({
    options: {
        position: 'bottomleft',
        separator: ':',
        emptyString: '经纬度坐标',
        lngFirst: false,
        numDigits: 5,
        lngFormatter: undefined,
        latFormatter: undefined,
        prefix: ""
    },

    onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
        L.DomEvent.disableClickPropagation(this._container);
        map.on('mousemove', this._onMouseMove, this);
        this._container.innerHTML = this.options.emptyString;
        return this._container;
    },

    onRemove: function (map) {
        map.off('mousemove', this._onMouseMove)
    },

    _onMouseMove: function (e) {
        lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
        lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
        var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
        var prefixAndValue = this.options.prefix + ' ' + value;
        this._container.innerHTML = prefixAndValue;
    }

});
// L.Control.setLatLng = function(e) {
//     latlng1 = e.latlng.toString();
// };
// console.log(latlng1);
// function onMapClick(e) {
//     L.popup().setLatLng(e.latlng)
//         .setContent('经纬度'+e.latlng.toString())
//         .openOn(gisMap)
// };
// gisMap.on('click',onMapClick);

L.control.mousePosition = function (options) {
    return new L.Control.MousePosition(options);
};
// 添加比例尺

L.control.scale(
    {
        position: 'bottomleft',
        maxWidth: 200,
        metric: true,
        imperial: false
    }).addTo(gisMap);
// 添加指北针
var north = L.control({position: "topright", maxWidth: 100,});
north.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML = '<img src=' + Feng.ctxPath + '/assets/common/images/north.png style="width: 120px;height: 132px">';
    return div;
}
north.addTo(gisMap);
// 添加图例
L.Control.Legend = L.Control.extend({
    options: {
        position: 'topleft' //初始位置
    },
    // 初始化
    initialize: function (options) {
        L.Util.extend(this.options, options);
    },
    onAdd: function (map) {
        // 创建一个class为info legend的div
        this._container = L.DomUtil.create('div', 'info legend');
        // 创建图例列表
        var legend = ["矿权边界", "生产矿山损毁/预损毁图斑", "生产矿山已修复图斑"],
            labels = [],
            from;
        for (var i = 0; i < legend.length; i++) {
            from = legend[i];

            labels.push(
                '<i style="display: inline-block;width:15px;height: 3px;background:' + this._getColor(from) + '"></i>' + from);
        }
        this._container.innerHTML = labels.join('<br>');
        return this._container;
    },
    _getColor: function (d) {
        return d == "矿权边界" ? '#BD0026' :
            d == "生产矿山损毁/预损毁图斑" ? '#fad227' :
                '#1a53e3';
    },
    onRemove: function (map) {
        // Nothing to do here
    }
});
L.control.legend = function (opts) {
    return new L.Control.Legend(opts);
}
var legend = L.control.legend({position: 'topleft'});
legend.addTo(gisMap);


var HistoricalmineInfoDlg = {
    data: {
        id: "",
        geoJsonBeforeRepair: "",
        kqbj_border: "",
        tbshp: "",
        tblx: "",
        recoveredspot: "",
        damagespot: ""
    }
};


layui.use(['form', 'HttpRequest'], function () {
    var $ = layui.jquery;
    gisMap.on('mousemove', (e) => {
        let latlng = e.latlng;
        $("#lng").text(latlng.lng.toFixed(8));
        $("#lat").text(latlng.lat.toFixed(8));
    });
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/twoInOneSolution/location?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    if (result.message == "缺少矿权边界数据！") {
        parent.layer.closeAll();
        parent.layer.msg('没有图斑空间数据', {time: 3000});
    }
    /**
     * bug
     * 数据需要索引规划修复图斑的矢量数据
     */
    /**
     *首先获取数据数据
     */
    var dataNum = result.data.length;
    console.log(dataNum)
    if (dataNum == undefined) {
        var Kqborder = result.data.geoJsonBorder;
        var geoKqborder = Terraformer.WKT.parse(Kqborder);
        var layer = L.geoJson(geoKqborder, {
            onEachFeature: onEachFeatureGeoborderNoTB,
            color: 'red',
            fillOpacity: 0
        }).addTo(gisMap);
    } else {
        var Kqborder = result.data[0].kqbj_border;
        var geoKqborder = Terraformer.WKT.parse(Kqborder);
        var layer = L.geoJson(geoKqborder, {
            onEachFeature: onEachFeatureGeoborder,
            color: 'red',
            fillOpacity: 0
        }).addTo(gisMap);
    }

    /**
     * 定义一个全局的填充冒泡框的数据
     */
    var fileData;


    for (let i = 0; i < dataNum; i++) {
        var data = result.data[i];
        if (data.damagespot != null) {
            /**
             * 该数据为损毁图斑,对某些字段值转译
             */
            fileData = data.damagespot;
            if (fileData.fkfx === null) {
                fileData.fkfx = '/'
            }
            if (fileData.sukq === null) {
                fileData.sukq = '/'
            }
            if (fileData.tbmj === null) {
                fileData.tbmj = '/'
            }
            if (fileData.sddl === null) {
                fileData.sddl = '/'
            }
            if (fileData.ydsx === 1) {
                fileData.ydsx = "有";
            } else if (fileData.ydsx === 0) {
                fileData.ydsx = "无";
            } else {
                fileData.ydsx = "未知";
            }

            if (fileData.shlx === "YZ") {
                fileData.shlx = "压占";
            } else if (fileData.shlx === "WS") {
                fileData.shlx = "挖损";
            } else if (fileData.shlx === "TX") {
                fileData.shlx = "塌陷";
            } else if (fileData.shlx === "YJZY") {
                fileData.shlx = "永久占用";
            } else if (fileData.shlx === "LSZY") {
                fileData.shlx = "临时占用";
            } else if (fileData.shlx === "DZ") {
                fileData.shlx = "地质灾害隐患点";
            } else {
                fileData.shlx = "未知";
            }

            if (fileData.shsjq != null) {
                fileData.shsjq = fileData.shsjq.substr(0, 7);
            } else {
                fileData.shsjq = '/'
            }
            if (fileData.shsjz != null) {
                fileData.shsjz = fileData.shsjz.substr(0, 7);
            } else {
                fileData.shsjz = '/'
            }
            if (fileData.nxfsj != null) {
                fileData.nxfsj = fileData.nxfsj.substr(0, 7);
            } else {
                fileData.nxfsj = '/'
            }
            if (fileData.ghxffs === null) {
                fileData.ghxffs = '/'
            }
            if (fileData.ghxfmj === null) {
                fileData.ghxfmj = '/'
            }
            if (fileData.ghyssj != null) {
                fileData.ghyssj = fileData.ghyssj.substr(0, 7);
            } else {
                fileData.ghyssj = '/'
            }


            var geoshp = Terraformer.WKT.parse(data.tbshp);
            var layer = L.geoJson(geoshp, {
                onEachFeature: onEachFeatureDamageSpot ,
                color: 'yellow',
            }).addTo(gisMap);
        }
        if (data.recoveredspot != null) {
            /**
             * 该数据为损毁图斑
             */
            fileData = data.recoveredspot;
            if (fileData.sukq === null) {
                fileData.sukq = '/'
            }
            if (fileData.tbmj === null) {
                fileData.tbmj = '/'
            }
            if (fileData.sddl === null) {
                fileData.sddl = '/'
            }
            if (fileData.ydsx === 1) {
                fileData.ydsx = "有";
            } else if (fileData.ydsx === 0) {
                fileData.ydsx = "无";
            } else {
                fileData.ydsx = "未知";
            }

            if (fileData.ysjl === "TG") {
                fileData.ysjl = "通过";
            } else if (fileData.ysjl === "YTJTG") {
                fileData.ysjl = "有条件通过";
            } else if (fileData.ysjl === "WTG") {
                fileData.ysjl = "未通过";
            } else {
                fileData.ysjl = '/'
            }
            if (fileData.fksj != null) {
                fileData.fksj = fileData.fksj.substr(0, 7);
            } else {
                fileData.fksj = '/'
            }
            if (fileData.sszt === null) {
                fileData.sszt = '/'
            }
            if (fileData.xffs === null) {
                fileData.xffs = '/'
            }
            if (fileData.zjly === null) {
                fileData.zjly = '/'
            }
            if (fileData.mjtz === null) {
                fileData.mjtz = '/'
            }
            if (fileData.yssj != null) {
                fileData.yssj = fileData.yssj.substr(0, 7);
            } else {
                fileData.yssj = '/'
            }
            if (fileData.ysdw === null) {
                fileData.ysdw = '/'
            }
            if (fileData.ysjl === null) {
                fileData.ysjl = '/'
            }

            var geoshp = Terraformer.WKT.parse(data.tbshp);
            var layer = L.geoJson(geoshp, {
                onEachFeature: onEachFeatureRecoveredSpot,
            }, data.recoveredspot).addTo(gisMap);
        }
    }


    // var wkt1 = result.data[0].kqbj_border;
    // var wkt2 = result.data[0].tbshp;
    // var wkt3 = result.data[1].kqbj_border;
    // var wkt4 = result.data[1].tbshp;
    // var geojson1 = Terraformer.WKT.parse(wkt1);
    // var geojson2 = Terraformer.WKT.parse(wkt2);
    // var geojson3 = Terraformer.WKT.parse(wkt3);
    // var geojson4 = Terraformer.WKT.parse(wkt4);
    // var layer = L.geoJson(geojson1, {
    //     onEachFeature: onEachFeatureGeoborder,
    //     color: 'red',
    //     fillOpacity: 0
    // }).addTo(gisMap);
    // var layer = L.geoJson(geojson3, {
    //     onEachFeature: onEachFeature3,
    //     color: 'red',
    //     fillOpacity: 0
    // }).addTo(gisMap);
    // var layer = L.geoJson(geojson2, {
    //     onEachFeature: onEachFeature2,
    // }).addTo(gisMap);
    // var layer = L.geoJson(geojson4, {
    //     onEachFeature: onEachFeature4
    // }).addTo(gisMap);
    var bounds = geoKqborder.bbox();
    gisMap.fitBounds([[bounds[1], bounds[0]], [bounds[3], bounds[2]]]);

    function onEachFeatureGeoborder(feature, layer) {
        var popupContent = '<table class="table">' +
            '<tr>' +
            '<th rowspan="1">边界种类：</th>' +
            '<td>二合一方案图斑矿权边界</td>' +
            '</tr>' +
            '<th rowspan="1">采矿权证号：</th>' +
            '<td>' + result.data[0].ckzh +
            '</td>' +
            '<tr>' +
            '<tr>' +
            '</tr>' +
            '</table>' + ''
        layer.bindPopup(popupContent);
    }

    function onEachFeatureGeoborderNoTB(feature, layer) {
        var popupContent = '<table class="table">' +
            '<tr>' +
            '<th rowspan="1">边界种类：</th>' +
            '<td>二合一方案图斑矿权边界</td>' +
            '</tr>' +
            '<th rowspan="1">采矿权证号：</th>' +
            '<td>' + result.data.ckzh +
            '</td>' +
            '<tr>' +
            '<tr>' +
            '</tr>' +
            '</table>' + ''
        layer.bindPopup(popupContent);
    }
    function onEachFeatureDamageSpot(feature, layer,e) {
        var popupContent = '<table class="table">' +
            '<tr>' +
            '<th rowspan="1">图斑种类：</th>' +
            '<td>生产矿山损毁/预损毁图斑</td>' +
            '</tr>' +
            '<th rowspan="1">图斑编号：</th>' +
            '<td>' + fileData.id +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">复垦方向：</th>' +
            '<td>' + fileData.fkfx +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">所属矿权：</th>' +
            '<td>' + fileData.sukq +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">图斑面积：</th>' +
            '<td>' + fileData.tbmj +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">三调地类：</th>' +
            '<td>' + fileData.sddl +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">有无合法用地手续：</th>' +
            '<td>' + fileData.ydsx +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">损毁类型：</th>' +
            '<td>' + fileData.shlx +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">损毁时间起：</th>' +
            '<td>' + fileData.shsjq +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">损毁时间止：</th>' +
            '<td>' + fileData.shsjz +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">拟修复时间：</th>' +
            '<td>' + fileData.nxfsj +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">规划修复方式：</th>' +
            '<td>' + fileData.ghxffs +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">规划修复面积：</th>' +
            '<td>' + fileData.ghxfmj +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">规划验收时间：</th>' +
            '<td>' + fileData.ghyssj +
            '</td>' +
            '<tr>' +
            // '<th rowspan="1">该点经纬度：</th>' +
            // '<td id="latlng1">'+ +'</td>' +
            // '<tr>' +
            '</tr>' +
            '</table>' + ''
        layer.bindPopup(popupContent);
    }
    function onEachFeatureRecoveredSpot(feature, layer) {
        var popupContent = '<table class="table">' +
            '<tr>' +
            '<th rowspan="1">图斑种类：</th>' +
            '<td>生产矿山已修复图斑</td>' +
            '</tr>' +
            '<th rowspan="1">图斑编号：</th>' +
            '<td>' + fileData.id +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">所属矿权名称：</th>' +
            '<td>' + fileData.sukq +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">图斑面积：</th>' +
            '<td>' + fileData.tbmj +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">修复后三调地类：</th>' +
            '<td>' + fileData.sddl +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">有无合法用地手续：</th>' +
            '<td>' + fileData.ydsx +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">修复时间：</th>' +
            '<td>' + fileData.fksj +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">实施主体：</th>' +
            '<td>' + fileData.sszt +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">修复方式：</th>' +
            '<td>' + fileData.xffs +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">资金来源：</th>' +
            '<td>' + fileData.zjly +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">亩均投资：</th>' +
            '<td>' + fileData.mjtz +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">验收时间：</th>' +
            '<td>' + fileData.yssj +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">组织验收单位：</th>' +
            '<td>' + fileData.ysdw +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">验收结论：</th>' +
            '<td>' + fileData.ysjl +
            '</td>' +
            '<tr>' +
            '<tr>' +
            '</tr>' +
            '</table>' + ''
        layer.bindPopup(popupContent);
    }
});