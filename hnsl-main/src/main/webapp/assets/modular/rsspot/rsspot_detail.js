/**
 * 详情对话框
 */
var RsspotInfoDlg = {
    data: {
        id: "",
        xzs: "",
        xzx: "",
        ckzh: "",
        kfx: "",
        kfy: "",
        changearea: "",
        changetype: "",
        minename: "",
        bz: "",
        createUser: "",
        createTime: "",
        updateUser: "",
        updateTime: ""
    }
};
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
layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects', 'layarea', 'xmSelect', 'func'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var xmSelect = layui.xmSelect;
    var func = layui.func;

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/rsspot/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    form.val('rsspotForm', result.data);

    //定位
    var ajax1 = new HttpRequest(Feng.ctxPath + "/rsspot/location?id=" + Feng.getUrlParam("id"), "get");
    var result1 = ajax1.start();
    var wkt = result1.data.geoJson;
    console.log(wkt)
    if (result1.data.geoJson == null) {
        $("#loaction").css("display","none")
    } else {
        var geojson = Terraformer.WKT.parse(wkt);
        console.log(geojson)
        var layer = L.geoJson(geojson, {
            onEachFeature: onEachFeature
        }).addTo(gisMap);
        var bounds = geojson.bbox();
        gisMap.fitBounds([[bounds[1], bounds[0]], [bounds[3], bounds[2]]]);
        function onEachFeature(feature, layer, innerHTML) {
            var popupContent = '<table class="table" >' +
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
                '<th rowspan="1">中心点经度：</th>' +
                '<td>' + result.data.kfx +
                '</td>' +
                '<tr>' +
                '<th rowspan="1">中心点纬度：</th>' +
                '<td>' + result.data.kfy +
                '</td>' +
                '<tr>' +
                '<th rowspan="1">变化面积(m²)：</th>' +
                '<td>' + result.data.changearea + '</td>' +
                '<tr>' +
                '<th rowspan="1">变化类型：</th>' +
                '<td>' + result.data.changetype + '</td>' +
                '</table>' + ''
            layer.bindPopup(popupContent);

        }
    }
    gisMap.on('mousemove', (e) => {
        let latlng = e.latlng;
        $("#lng").text(latlng.lng.toFixed(8));
        $("#lat").text(latlng.lat.toFixed(8));
    });
});