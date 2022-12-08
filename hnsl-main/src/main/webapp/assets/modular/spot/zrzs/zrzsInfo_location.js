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
        center: [41.3541,119.6030],
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
        this._container.innerHTML=this.options.emptyString;
        return this._container;
    },

    onRemove: function (map) {
        map.off('mousemove', this._onMouseMove)
    },

    _onMouseMove: function (e) {
        lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
        lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
        var value = this.options.lngFirst ? lng + this.options.separator + lat:lat + this.options.separator + lng;
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
        geoJSONBeforeRepair:""
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
    var ajax = new HttpRequest(Feng.ctxPath + "/spot/zrzs/location?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    if(result.data.geoJSONBeforeRepair == null){
        parent.layer.closeAll();
        parent.layer.msg('没有图斑空间数据', {time: 3000});
    }
    var wkt = result.data.geoJSONBeforeRepair;
    var geojson = Terraformer.WKT.parse(wkt);
    var layer = L.geoJson(geojson, {
        onEachFeature: onEachFeature
    }).addTo(gisMap);
    var bounds = geojson.bbox();
    gisMap.fitBounds([ [bounds[1], bounds[0]], [bounds[3], bounds[2]] ]);

    function onEachFeature(feature, layer) {
        var popupContent = '<table class="table">' +
            '<tr>' +
            '<th rowspan="1">图斑类型</th>' +
            '<td>自然灾损矿山</td>' +
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
            '<th rowspan="1">图斑属性：</th>' +
            '<td>露天矿厂</td>' +
            '<tr>' +
            '<th rowspan="1">三调地类：</th>' +
            '<td>' + result.data.sddl +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">拟修复时间：</th>' +
            '<td>' + result.data.nxfsj +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">核查具体日期：</th>' +
            '<td>' + result.data.hcrq +
            '</td>' +
            '<tr>' +
            '<th rowspan="1">责任主体：</th>' +
            '<td>' +result.data.zrzt +
            '</td>' +
            '</tr>' +
            '</table>' +''
        layer.bindPopup(popupContent);
    }
});