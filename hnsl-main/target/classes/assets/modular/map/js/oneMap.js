var iconColor = ["#0ca5e2", "#38d5d0", "#f6c52b", "#F77147"];
var pickerData = [];
var _location = [114.39548492431642, 37.08359831045062];
var searchFeatures = {};

var token = null;

var admin = null;

layui.config({
    cacheTab: false,
    base: '/assets/common/module/'
}).extend({
    dropdown: 'dropdown/dropdown',
}).use(
    ['layer', 'element', 'admin', 'dropdown'], function () {
        var $ = layui.jquery;
        admin = layui.admin;

        $("#leftmenus").on("click", "li", function () {
            if ($(this).hasClass("sel")) {
                $(this).removeClass("sel");
                $(".leftmenu2").removeClass("show");
            } else {
                $("#leftmenus li").removeClass("sel");
                $(".leftmenu2").addClass("show");
                $(this).addClass("sel");
            }

        })


        $("#search .ipt").focus(function () {
            $(".searchresult").addClass("show");
            $(".searchresult").show();
        });

        $(".closebtn").click(function () {
            $(".searchresult").removeClass("show");
            $(".searchresult").hide();
        })

        $(".basemap-control-quick").mouseover(function () {
            $(this).addClass("unford")
        })

        $(".basemap-control-quick").mouseleave(function () {
            $(this).removeClass("unford")
        })


    });


require(["esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Zoom",
    "esri/Basemap",
    "esri/layers/TileLayer",
    "esri/layers/GeoJSONLayer",
    "esri/layers/WebTileLayer",
    "esri/layers/MapImageLayer",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "/assets/modular/map/src/domLayer/DomLayer.js",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/geometry/SpatialReference",
    'esri/geometry/support/webMercatorUtils',
    'esri/config'
], function (WebMap, MapView, Zoom, Basemap, TileLayer, GeoJSONLayer,
             WebTileLayer, MapImageLayer, GraphicsLayer, Graphic, MyCustomLayer, Legend, Expand, SpatialReference,
             webMercatorUtils, esriConfig) {

    var activeLayer = null;

    esriConfig.request.interceptors.push({
        before: function (params) {
            if (params.url.indexOf("map/layer/getLayerByName") != -1) {
                mui.showLoading();
            }
        },
        after: function (response) {
            if (response.url.indexOf("map/layer/getLayerByName") != -1) {

                setTimeout(mui.hideLoading(), 1000);

                var _result = parseData(response.data);

                if (_result.code == "200") {
                    response.data = toArrayBuffer(JSON.stringify(_result.data));
                } else {
                    console.log(_result.message);
                }
            }

        }
    });

    var BaseMapGroup = {
        "Images": new Basemap({
            baseLayers: [
                new TileLayer({
                    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
                }),
                new TileLayer({
                    url: "http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/administrative_division_boundaryLine/MapServer"
                }),
                new TileLayer({
                    url: "http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/administrative_division_label/MapServer"
                }),
                new MapImageLayer({
                    url: "http://10.20.2.80:6080/arcgis/rest/services/Basemap/Zhengzhou_shaded/MapServer",
                    opacity: 0.5
                }),
                new GeoJSONLayer({
                    url: "/assets/modular/map/layer/region.json",
                    legendEnabled: false,
                    renderer: {
                        type: "unique-value",
                        field: "level",
                        uniqueValueInfos: [{
                            value: "city",
                            symbol: {
                                type: "simple-line",
                                color: "#0bfc03",
                                width: "3px"
                            }
                        }, {
                            value: "district",
                            symbol: {
                                type: "simple-line",
                                color: "rgba(111,250,73,0.56)",
                                width: "2px",
                                style: "short-dot"
                            }
                        }]
                    },
                    labelingInfo: [
                        {
                            labelExpressionInfo: {
                                expression: "$feature.name"
                            },
                            labelPlacement: "above-center",
                            symbol: {
                                type: "text",
                                color: "#f2c15e",
                                haloColor: "#000",
                                haloSize: 1,
                                font: {
                                    size: 12,
                                    weight: "bold"
                                }
                            },
                            where: "level = 'district'"
                        },
                        {
                            labelExpressionInfo: {
                                expression: "$feature.name"
                            },
                            labelPlacement: "above-center",
                            symbol: {
                                type: "text",
                                color: "#F2725E",
                                haloColor: "#000",
                                haloSize: 1,
                                font: {
                                    size: 14,
                                    weight: "bold"
                                }
                            },
                            where: "level = 'city'"
                        }]
                })
            ]
        }),
        "Streets": new Basemap({
            baseLayers: [
                new TileLayer({
                    url: "http://10.20.2.80:6080/arcgis/rest/services/Basemap/HNBasemap_LSB_NOROAD/MapServer"
                }),
                new MapImageLayer({
                    url: "http://10.20.2.80:6080/arcgis/rest/services/Basemap/Zhengzhou_shaded/MapServer",
                    opacity: 0.5
                }),
                new GeoJSONLayer({
                    url: "/assets/modular/map/layer/region.json",
                    legendEnabled: false,
                    renderer: {
                        type: "unique-value",
                        field: "level",
                        uniqueValueInfos: [{
                            value: "city",
                            symbol: {
                                type: "simple-line",
                                color: "#fc03c6",
                                width: "0px"
                            }
                        }, {
                            value: "district",
                            symbol: {
                                type: "simple-line",
                                color: "rgba(250,38,215,0.5)",
                                width: "1px",
                                style: "short-dot"
                            }
                        }]
                    },
                    labelingInfo: [
                        {
                            labelExpressionInfo: {
                                expression: "$feature.name"
                            },
                            labelPlacement: "above-center",
                            symbol: {
                                type: "text",
                                color: "#f7ff00",
                                haloColor: "#000",
                                haloSize: 1,
                                font: {
                                    size: 12,
                                    weight: "bold"
                                }
                            },
                            where: "level = 'district'"
                        },
                        {
                            labelExpressionInfo: {
                                expression: "$feature.name"
                            },
                            labelPlacement: "above-center",
                            symbol: {
                                type: "text",
                                color: "#F2725E",
                                haloColor: "#000",
                                haloSize: 1,
                                font: {
                                    size: 14,
                                    weight: "bold"
                                }
                            },
                            where: "level = 'city'"
                        }]
                })
            ]
        })
    }


    const map = new WebMap({
        basemap: BaseMapGroup["Streets"]
    });

    const view = new MapView({
        map: map,
        center: [113.477396, 34.587366],
        zoom: 3,
        container: "map"
    });

    view.ui.move("zoom", "bottom-right");

    view.ui.remove("attribution");

    view.when(function () {

        map.loadAll()
            .then(function () {
                admin.removeLoading();
            });

    }, function (error) {

    });

    $(".basemap-control-quick").on("click", ".basemap", function () {
        $(".basemap").removeClass("active");
        $(this).addClass("active");
        map.basemap = BaseMapGroup[$(this).attr("data-map")]
    })


});


function parseData(input) {
    const decoder = new TextDecoder('utf8')
    return JSON.parse(decoder.decode(input))
}

function toArrayBuffer(input) {
    const encoder = new TextEncoder()
    const view = encoder.encode(input)
    return view.buffer
}
