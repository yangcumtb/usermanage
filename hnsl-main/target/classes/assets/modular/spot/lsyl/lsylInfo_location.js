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
L.control.mousePosition = function (options) {
    return new L.Control.MousePosition(options);
};


var HistoricalmineInfoDlg = {
    data: {
        id: "",
        geoJSONBeforeRepair: ""
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
    var ajax = new HttpRequest(Feng.ctxPath + "/spot/lsyl/location?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    var wkt = result.data.geoJSONBeforeRepair;
    if (result.data.geoJSONBeforeRepair == null) {
        parent.layer.closeAll();
        parent.layer.msg('没有图斑空间数据', {time: 3000});
    }
    //做一个数据的转译---图斑大类
    if (result.data.tbdl === "10") {
        result.data.tbdl = "历史遗留矿山";
    } else if (result.data.tbdl === "20") {
        result.data.tbdl = "有责任主体的废弃矿山";
    } else if (result.data.tbdl === "30") {
        result.data.tbdl = "其他情形";
    } else {
        result.data.tbdl = "";
    }
    //做一个数据的转译---图斑小类
    if (result.data.tbxl === "11") {
        result.data.tbxl = "无法确认治理恢复责任主体的无主废弃矿山";
    } else if (result.data.tbxl === "12") {
        result.data.tbxl = "由政府承担治理恢复责任的政策性关闭矿山";
    } else if (result.data.tbxl === "21") {
        result.data.tbxl = "由企业履行治理恢复责任的政策性关闭矿山";
    } else if (result.data.tbxl === "22") {
        result.data.tbxl = "由企业或个人履行治理恢复责任的有主废弃矿山";
    } else if (result.data.tbxl === "31") {
        result.data.tbxl = "生产矿山";
    } else if (result.data.tbxl === "32") {
        result.data.tbxl = "采矿权过期未注销矿山";
    } else if (result.data.tbxl === "33") {
        result.data.tbxl = "自然灾毁";
    } else if (result.data.tbxl === "34") {
        result.data.tbxl = "建设类损毁";
    } else if (result.data.tbxl === "35") {
        result.data.tbxl = "河道采砂损毁";
    } else if (result.data.tbxl === "36") {
        result.data.tbxl = "尾矿库占用损毁";
    } else if (result.data.tbxl === "37") {
        result.data.tbxl = "伪变化";
    } else if (result.data.tbxl === "41") {
        result.data.tbxl = "有效矿业权范围内功能未损毁的采矿沉陷区";
    } else if (result.data.tbxl === "42") {
        result.data.tbxl = "过期未注销矿业权范围内功能未损毁的采矿沉陷区";
    } else if (result.data.tbxl === "43") {
        result.data.tbxl = "其他功能未损毁的采矿沉陷区";
    } else {
        result.data.tbxl = "";
    }
    //做一个数据的转译---图斑属性
    if (result.data.tbsx === "1") {
        result.data.tbsx = "采场";
    } else if (result.data.tbsx === "2") {
        result.data.tbsx = "中转场地（堆煤场、其他矿石堆、选矿场等）";
    } else if (result.data.tbsx === "3") {
        result.data.tbsx = "固体废弃物堆场（煤矸石堆、废石堆、排土场等）";
    } else if (result.data.tbsx === "4") {
        result.data.tbsx = "矿山建筑";
    } else if (result.data.tbsx === "5") {
        result.data.tbsx = "塌陷坑";
    } else if (result.data.tbsx === "6") {
        result.data.tbsx = "井口/硐口";
    } else if (result.data.tbsx === "7") {
        result.data.tbsx = "其他";
    } else if (result.data.tbsx === "12") {
        result.data.tbsx = "其他重大工程建设";
    } else if (result.data.tbsx === "13") {
        result.data.tbsx = "独立选址的选矿厂等";
    } else if (result.data.tbsx === "14") {
        result.data.tbsx = "功能未损毁的采矿塌陷";
    } else if (result.data.tbsx === "17") {
        result.data.tbsx = "交通工程建设";
    } else if (result.data.tbsx === "18") {
        result.data.tbsx = "伪变化";
    } else {
        result.data.tbsx = "";
    }

    //做一个数据的转译---恢复治理情况
    if (result.data.hfzlqk === "A") {
        result.data.hfzlqk = "未治理";
    } else if (result.data.hfzlqk === "B") {
        result.data.hfzlqk = "已恢复治理";
    } else {
        result.data.hfzlqk = "";
    }

    //做一个数据的转译---修复方式
    if (result.data.nxffs === "A") {
        result.data.nxffs = "自然恢复";
    } else if (result.data.nxffs === "B") {
        result.data.nxffs = "辅助再生";
    } else if (result.data.nxffs === "C") {
        result.data.nxffs = "生态重建";
    } else if (result.data.nxffs === "D") {
        result.data.nxffs = "转型利用";
    } else {
        result.data.nxffs = "";
    }

    //做一个数据的转译---修复时间段
    if (result.data.nxfsjd === "A") {
        result.data.nxfsjd = "十四五期间";
    } else if (result.data.nxfsjd === "B") {
        result.data.nxfsjd = "十四五之后";
    } else {
        result.data.nxfsjd = "";
    }
    //做一个数据的转译---备注
    if (result.data.bz == null) {
        result.data.bz = "";
    }
    //做一个数据的转译---治理年度
    if (result.data.zlnd == null) {
        result.data.zlnd = "";
    }

    var geojson = Terraformer.WKT.parse(wkt);
    var layer = L.geoJson(geojson, {
        onEachFeature: onEachFeature
    }).addTo(gisMap);
    var bounds = geojson.bbox();
    gisMap.fitBounds([[bounds[1], bounds[0]], [bounds[3], bounds[2]]]);

    function onEachFeature(feature, layer, innerHTML) {
        var popupContent = '<table class="table" >' +
            '<tr>' +
            '<th rowspan="1">图斑类型</th>' +
            '<td>历史遗留矿山</td>' +
            '</tr>' +
            '<th rowspan="1">图斑编号：</th>' +
            '<td>' + result.data.id +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">所在市：</th>' +
            '<td>' + result.data.xzs +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">所在县：</th>' +
            '<td>' + result.data.xzx +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">图斑面积(m²)：</th>' +
            '<td>' + result.data.tbmj +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">中心点经度：</th>' +
            '<td>' + result.data.kfx +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">中心点纬度：</th>' +
            '<td>' + result.data.kfy +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">图斑大类：</th>' +
            '<td>' + result.data.tbdl + '</td>' +
            '<tr>' +
            '<th rowspan="1">图斑小类：</th>' +
            '<td>' + result.data.tbxl + '</td>' +
            '<tr>' +
            '<th rowspan="1">矿种：</th>' +
            '<td>' + result.data.kz + '</td>' +
            '<tr>' +
            '<th rowspan="1">关闭年度：</th>' +
            '<td>' + result.data.gbnd + '</td>' +
            '<tr>' +
            '<th rowspan="1">恢复治理情况：</th>' +
            '<td>' + result.data.hfzlqk + '</td>' +
            '<tr>' +
            '<th rowspan="1">图斑属性：</th>' +
            '<td>' + result.data.tbsx + '</td>' +
            '<tr>' +
            '<th rowspan="1">三调地类：</th>' +
            '<td>' + result.data.sddl +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">修复方式：</th>' +
            '<td>' + result.data.nxffs + '</td>' +
            '<tr>' +
            '<th rowspan="1">修复方向：</th>' +
            '<td>' + result.data.nxffx + '</td>' +
            '<tr>' +
            '<th rowspan="1">修复时间段：</th>' +
            '<td>' + result.data.nxfsjd + '</td>' +
            '<tr>' +
            '<th rowspan="1">治理年度：</th>' +
            '<td>' + result.data.zlnd + '</td>' +
            '<tr>' +
            '<th rowspan="1">备注：</th>' +
            '<td>' + result.data.bz + '</td>' +
            '<tr>' +
            '</table>' + ''
        layer.bindPopup(popupContent);

    }
});