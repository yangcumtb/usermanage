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
// 添加比例尺

L.control.scale(
    {
        position: 'bottomleft',
        maxWidth:200,
        metric:true,
        imperial:false
    }).addTo(gisMap);
// 添加指北针
var north = L.control({position: "topright",maxWidth:100,});
north.onAdd = function(map) {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML = '<img src=' +  Feng.ctxPath + '/assets/common/images/north.png style="width: 120px;height: 132px">';
    return div;
}
north.addTo(gisMap);


var HistoricalmineInfoDlg = {
    data: {
        id: "",
        geoJsonBeforeRepair: ""
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
    var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/plannedRecoverspot/location?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    if (result.data.geoJsonBeforeRepair == null) {
        parent.layer.closeAll();
        parent.layer.msg('没有图斑空间数据', {time: 3000});
    }
    var wkt = result.data.geoJsonBeforeRepair;
    var geojson = Terraformer.WKT.parse(wkt);
    var layer = L.geoJson(geojson, {
        onEachFeature: onEachFeature
    }).addTo(gisMap);
    var bounds = geojson.bbox();
    gisMap.fitBounds([[bounds[1], bounds[0]], [bounds[3], bounds[2]]]);

    function onEachFeature(feature, layer) {
        var popupContent = '<table class="table">' +
            '<tr>' +
            '<th rowspan="1">图斑类型：</th>' +
            '<td>损毁图斑</td>' +
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
            '<th rowspan="1">图斑面积：</th>' +
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
            '<th rowspan="1">图斑所属矿权名称：</th>' +
            '<td>' + result.data.sukq +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">现状损毁类型：</th>' +
            '<td>' + result.data.xzShlx +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">现状图斑属性：</th>' +
            '<td>' + result.data.xzTbsx +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">规划修复时间：</th>' +
            '<td>' + result.data.ghxfsj +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">规划修复方式：</th>' +
            '<td>' + result.data.ghxffs +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">规划修复地类：</th>' +
            '<td>' + result.data.ghxfdl +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">规划实施单位：</th>' +
            '<td>' + result.data.ghssdw +
            '</td>' +
            '<tr>' +
            '</tr>' +
            '</table>' + ''
        layer.bindPopup(popupContent);
    }
});