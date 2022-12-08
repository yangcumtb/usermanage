var layerItems = [
    {
        title: "建设项目",
        layers: [{
            id: "rainTm",
            title: "商业建筑",
            icon: "icon-yu",
            checked: true,
            filterGroup: [{
                name: "地域范围",
                code: "time",
                active: 24,
                values: [{
                    text: "沈阳市",
                    value: 24
                }, {
                    text: "大连市",
                    value: 12
                }, {
                    text: "鞍山市",
                    value: 6
                }, {
                    text: "抚顺市",
                    value: 3
                }, {
                    text: "本溪市",
                    value: 1
                }]
            }],

        },
            {
                id: "riverTm",
                title: "居民建筑",
                icon: "icon-yu",
                checked: false,
                filterGroup: [{
                    name: "选择站点",
                    code: "warn",
                    active: -1,
                    values: [{
                        text: "全部站点",
                        value: -1
                    }, {
                        text: "超警戒",
                        value: 1
                    }]
                }]
            },
            {
                id: "resrTm",
                title: "工业建筑",
                icon: "icon-yu",
                checked: false,
                filterGroup: [{
                    name: "选择站点",
                    code: "warn",
                    active: -1,
                    values: [{
                        text: "全部站点",
                        value: -1
                    }, {
                        text: "超警戒",
                        value: 1
                    }]
                }]
            }
        ]
    },
    {
        title: "矿山",
        layers: [{
            id: "riskProject",
            title: "生产矿山",
            icon: "icon-project",
            checked: false,
            filterGroup: [{
                name: "风险项目类型",
                code: "type",
                active: -1,
                values: [{
                    text: "全部",
                    value: -1
                }, {
                    text: "大型河渠交叉建筑物",
                    value: 1
                }, {
                    text: "左排建筑物",
                    value: 2
                }, {
                    text: "全填方渠段",
                    value: 3
                }, {
                    text: "全挖方渠段",
                    value: 4
                }, {
                    text: "其它项目",
                    value: 9
                }]
            },
                {
                    name: "风险等级",
                    code: "level",
                    active: -1,
                    values: [{
                        text: "全部",
                        value: -1
                    }, {
                        text: "1级风险点",
                        value: 1
                    }, {
                        text: "2级风险点",
                        value: 2
                    }, {
                        text: "3级风险点",
                        value: 3
                    }]
                }
            ],
        },
            {
                id: "reservoir",
                title: "废弃矿山",
                icon: "icon-shuiku",
                checked: false,
                filterGroup: [{
                    name: "水库类型",
                    code: "level",
                    active: -1,
                    values: [{
                        text: "全部",
                        value: -1
                    }, {
                        text: "大（1）型",
                        value: 1
                    }, {
                        text: "大（2）型",
                        value: 2
                    }, {
                        text: "中型",
                        value: 3
                    }, {
                        text: "小（1）型",
                        value: 4
                    }, {
                        text: "小（2）型",
                        value: 5
                    }]
                }
                ]
            },
            {
                id: "baseProject",
                title: "历史遗留矿山",
                icon: "icon-hequ",
                checked: false,
                filterGroup: [{
                    name: "建筑物类型",
                    code: "type",
                    active: -1,
                    values: [{
                        text: "全部",
                        value: -1
                    }, {
                        text: "河渠交叉",
                        value: 1
                    }, {
                        text: "左排建筑物",
                        value: 2
                    }]
                }
                ]
            }
        ]
    },
    {
        title: "自然灾损",
        layers: [{
            id: "riskStock",
            title: "土地损毁",
            icon: "icon-huowu",
            checked: false,
            filterGroup: []
        },
            {
                id: "depot",
                title: "地质环境问题",
                icon: "icon-wuzi",
                checked: false,
                filterGroup: []
            },
            {
                id: "otherStock",
                title: "植被破坏",
                icon: "icon-wuzi",
                checked: false,
                filterGroup: []
            }
        ]
    },
    {
        title: "政策关闭矿山",
        layers: [{
            id: "team",
            title: "露天矿场",
            icon: "icon-shiziduiwu",
            checked: false,
            filterGroup: []
        }]
    },
]


var layers = {
    "riskProject": {
        idField: "projectId",
        title: "防汛风险项目",
        layer: null,
        renderer: {
            type: "unique-value",
            field: "level",
            legendOptions: {
                title: "风险分级"
            },
            defaultLabel: "未分级",
            defaultSymbol: {
                type: "picture-marker",
                url: "/assets/modular/map/img/map/project.png",
                width: "30px",
                height: "36px"
            },
            uniqueValueInfos: [{
                value: "1",
                label: "1级风险项目",
                symbol: {
                    type: "picture-marker",
                    url: "/assets/modular/map/img/map/riskProject_1.png",
                    width: "30px",
                    height: "36px"
                }
            }, {
                value: "2",
                label: "2级风险项目",
                symbol: {
                    type: "picture-marker",
                    url: "/assets/modular/map/img/map/riskProject_2.png",
                    width: "30px",
                    height: "36px"
                }
            }, {
                value: "3",
                label: "3级风险项目",
                symbol: {
                    type: "picture-marker",
                    url: "/assets/modular/map/img/map/riskProject_3.png",
                    width: "30px",
                    height: "36px"
                }
            }]
        },
        labelingInfo: {
            labelExpressionInfo: {
                expression: "$feature.NAME"
            },
            labelPlacement: "above-center",
            symbol: {
                type: "text",
                color: "#F2725E",
                haloColor: "#000",
                haloSize: 1,
                font: {
                    size: 12,
                    weight: "bold"
                }
            },
            minScale: 500000,
        },
        popupTemplate: {
            title: "{name}",
            content: "<div class='project' data-id='{projectId}' data-lvl='{level}'><div class='content'><span style='background: #4DA9EB;'>{typeName}</span>" +
                "<span style='background: #F2725E;'>{levelName}级风险点</span><span style='background: #00A65A'>{orgnName}</span></div>" +
                "<div class='footer'>{reason}</div></div>",
            actions: [{
                title: "风险详情",
                id: "riskProject",
                className: "iconfont icon-project"
            }]
        },
        searchResult: function (feature) {
            var properties = feature.attributes
            return {
                title: properties.name,
                tags: [properties.levelName + " 级", properties.typeName, properties.orgnName],
                image: "riskProject_" + properties.level,
                center: {
                    latitude: feature.geometry.latitude,
                    longitude: feature.geometry.longitude
                }
            }
        }
    },
    "reservoir": {
        idField: "id",
        title: "上游水库",
        layer: null,
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "picture-marker",
                url: "/assets/modular/img/map/baseReservoir.png", //图片地址
                width: "20px",
                height: "24px"
            }
        },
        labelingInfo: {
            labelExpressionInfo: {
                expression: "$feature.NAME"
            },
            labelPlacement: "above-center",
            symbol: {
                type: "text",
                color: "#03e1ff",
                haloColor: "#000",
                haloSize: 1,
                font: {
                    size: 10,
                    weight: "bold"
                }
            },
            minScale: 500000,
        },
        popupTemplate: {
            title: "{name}",
            content: "<div class='project' data-id='{id}'><div class='content'><span style='background: #4DA9EB;'>{buildingName}</span><span style='background: #F2725E;'>" +
                "{levelName}</span><span style='background: #00A65A'>距总干渠（km）:{ length }</span></div><div class='footer'>{info} </div></div>",
            actions: [{
                title: "水库详情",
                id: "reservoir",
                className: "iconfont icon-shuiku"
            }]
        },
        searchResult: function (feature) {
            var properties = feature.attributes
            return {
                title: properties.name,
                tags: [properties.buildingName, properties.levelName, properties.length],
                image: "baseReservoir",
                center: {
                    latitude: feature.geometry.latitude,
                    longitude: feature.geometry.longitude
                }
            }
        },
    },
    "baseProject": {
        idField: "id",
        title: "历史遗留矿山",
        layer: null,
        data: [],
        filter: false,
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "picture-marker",
                url: "/assets/modular/img/map/baseProject.png", //图片地址
                width: "20px",
                height: "24px"
            }
        },
        labelingInfo: {
            labelExpressionInfo: {
                expression: "$feature.NAME"
            },
            labelPlacement: "above-center",
            symbol: {
                type: "text",
                color: "#05ef53",
                haloColor: "#000",
                haloSize: 1,
                font: {
                    size: 10,
                    weight: "bold"
                }
            },
            minScale: 100000,
        },
        popupTemplate: {
            title: "{name}",
            content: "<div class='project' data-id='{id}'><div class='content'><span style='background: #4DA9EB;'>{riverName}</span>" +
                "<span style='background: #F2725E;'>保证水位:{safety}</span>" +
                "<span style='background: #00A65A'>警戒水位:{warn}</span></div></div>",
            actions: [{
                title: "建筑物详情",
                id: "baseProject",
                className: "iconfont icon-hequ"
            }]
        },
        searchResult: function (feature) {
            var properties = feature.attributes
            return {
                title: properties.name,
                tags: ["保证: " + properties.safety, "警戒: " + properties.warn, properties.riverName],
                image: "baseProject",
                center: {
                    latitude: feature.geometry.latitude,
                    longitude: feature.geometry.longitude
                }
            }
        }
    },
    "riskStock": {
        idField: "stockId",
        title: "防汛备料点",
        layer: null,
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "picture-marker",
                url: "/assets/modular/img/map/riskStock.png", //图片地址
                width: "20px",
                height: "24px"
            }
        },
        labelingInfo: {
            labelExpressionInfo: {
                expression: "$feature.NAME"
            },
            labelPlacement: "above-center",
            symbol: {
                type: "text",
                color: "#ff03c0",
                haloColor: "#000",
                haloSize: 1,
                font: {
                    size: 10,
                    weight: "bold"
                }
            },
            minScale: 500000,
        },
        popupTemplate: {
            title: "{name}",
            outFields: ["*"],
            content: function (feature) {
                var properties = feature.graphic.attributes;
                var list = JSON.parse(properties["stock"]);
                var html = "<table>";

                for (let i = 0; i < list.length; i++) {
                    html = html + "<tr><th>" + list[i].catalogName + "</th><td>" + list[i].totalStock + list[i]
                        .unit + "</td></tr>"
                }
                html = html + "</table>";

                return "<div class='project'><div class='content'><span style='background: #4DA9EB;'>{orgnName}</span>" +
                    "<span style='background: #F2725E;'>保证水位:{safe}</span>" +
                    "<span style='background: #00A65A'>桩号:{pileNumber}</span></div><div class='footer'>" + html +
                    "</div></div>";
            },
            actions: [{
                title: "备料点详情",
                id: "riskStock",
                className: "iconfont icon-huowu"
            }]
        },
        searchResult: function (feature) {
            var properties = feature.attributes
            return {
                title: properties.name,
                tags: [properties.orgnName, properties.pileNumber],
                image: "riskStock",
                center: {
                    latitude: feature.geometry.latitude,
                    longitude: feature.geometry.longitude
                }
            }
        }
    },
    "depot": {
        idField: "code",
        title: "地质环境问题",
        layer: null,
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "picture-marker",
                url: "/assets/modular/img/map/org.png", //图片地址
                width: "20px",
                height: "24px"
            }
        },
        labelingInfo: {
            labelExpressionInfo: {
                expression: "$feature.NAME"
            },
            labelPlacement: "above-center",
            symbol: {
                type: "text",
                color: "#91f8ef",
                haloColor: "#000",
                haloSize: 1,
                font: {
                    size: 10,
                    weight: "bold"
                }
            },
            minScale: 500000,
        },
        popupTemplate: {
            title: "{name}",
            outFields: ["*"],
            content: "<div class='project' data-id='{id}'><div class='content'><span style='background: #4DA9EB;'>{orgnName}</span>" +
                "<span style='background: #F2725E;'>面积:{area}</span>" +
                "</div></div>",
            actions: [{
                title: "查看物资",
                id: "depot",
                className: "iconfont icon-wuzi"
            }]
        },
        searchResult: function (feature) {
            var properties = feature.attributes
            return {
                title: properties.name,
                tags: [properties.orgnName, properties.orgnName],
                image: "org",
                center: {
                    latitude: feature.geometry.latitude,
                    longitude: feature.geometry.longitude
                }
            }
        }
    },
    "otherStock": {
        idField: "id",
        title: "植被破坏",
        layer: null,
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "picture-marker",
                url: "/assets/modular/img/map/depot.png", //图片地址
                width: "20px",
                height: "24px"
            }
        },
        labelingInfo: {
            labelExpressionInfo: {
                expression: "$feature.NAME"
            },
            labelPlacement: "above-center",
            symbol: {
                type: "text",
                color: "#f089f3",
                haloColor: "#000",
                haloSize: 1,
                font: {
                    size: 10,
                    weight: "bold"
                }
            },
            minScale: 500000,
        },
        popupTemplate: {
            title: "{name}",
            outFields: ["*"],
            content: "<div class='project' data-id='{id}'><div class='content'><span style='background: #4DA9EB;'>{orgnName}</span></div></div>",
            actions: [{
                title: "查看物资",
                id: "depot",
                className: "iconfont icon-wuzi"
            }]
        },
        searchResult: function (feature) {
            var properties = feature.attributes
            return {
                title: properties.name,
                tags: [properties.orgnName],
                image: "depot",
                center: {
                    latitude: feature.geometry.latitude,
                    longitude: feature.geometry.longitude
                }
            }
        },
    },
    "team": {
        idField: "id",
        title: "驻汛队伍",
        layer: null,
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "picture-marker",
                url: "/assets/modular/img/map/teamPoint.png", //图片地址
                width: "20px",
                height: "24px"
            }
        },
        popupTemplate: {
            title: "{name}",
            outFields: ["*"],
            content: function (feature) {
                var properties = feature.graphic.attributes;
                var html = "<table>";
                html = html + "<tr><th>驻守人员</th><td>" + properties.member + "名</td></tr>";
                html = html + "<tr><th>驻守设备</th><td>" + properties.equip + "台</td></tr>";
                html = html + "</table>";
                return "<div class='project'><div class='content'><span style='background: #4DA9EB;'>" + properties
                        .orgnName + "</span><span style='background: #F2725E;'>" + properties.teamName +
                    "</span><span style='background: #00A65A'>" + properties.contactName +
                    "</span></div><div class='footer'>" + html + "</div></div>";
            },
            actions: [{
                title: "队伍详情",
                id: "team",
                className: "iconfont icon-shiziduiwu"
            }]
        },
        searchResult: function (feature) {
            var properties = feature.attributes
            return {
                title: properties.name,
                tags: [properties.teamName, properties.contactName, properties.orgnName],
                image: "teamPoint",
                center: {
                    latitude: feature.geometry.latitude,
                    longitude: feature.geometry.longitude
                }
            }
        }
    },
    "rainTm": {
        idField: "code",
        title: "商业建筑",
        layer: null,
        renderer: {
            type: "class-breaks",
            field: "rain",
            legendOptions: {
                title: "雨量颜色分级"
            },
            classBreakInfos: [
                {
                    minValue: 0,
                    maxValue: 9.9999,
                    label: "小于 10 mm",
                    symbol: {
                        type: "simple-marker",
                        size: 8,
                        color: "#00ffff",
                        outline: {
                            width: 1,
                            color: "#000"
                        }
                    }
                },
                {
                    minValue: 10,
                    maxValue: 24.9999,
                    label: "10 - 25 mm",
                    symbol: {
                        type: "simple-marker",
                        size: 8,
                        color: "#039c4f",
                        outline: {
                            width: 1,
                            color: "#000"
                        }
                    }
                },
                {
                    minValue: 25,
                    maxValue: 49.999,
                    label: "25 - 50 mm",
                    symbol: {
                        type: "simple-marker",
                        size: 8,
                        color: "#0060e6",
                        outline: {
                            width: 1,
                            color: "#000"
                        }
                    }
                },
                {
                    minValue: 50,
                    maxValue: 99.999,
                    label: "50 - 100 mm",
                    symbol: {
                        type: "simple-marker",
                        size: 8,
                        color: "#f3f703",
                        outline: {
                            width: 1,
                            color: "#000"
                        }
                    }
                },
                {
                    minValue: 100,
                    maxValue: 250,
                    label: "100 - 250 mm",
                    symbol: {
                        type: "simple-marker",
                        size: 8,
                        color: "#f76803",
                        outline: {
                            width: 1,
                            color: "#000"
                        }
                    }
                },
                {
                    minValue: 250.0001,
                    maxValue: 5000,
                    label: "大于 250 mm",
                    symbol: {
                        type: "simple-marker",
                        size: 8,
                        color: "#e10602",
                        outline: {
                            width: 1,
                            color: "#000"
                        }
                    }
                }
            ]
        },
        labelingInfo: {
            labelExpressionInfo: {
                expression: "Round($feature.rain,1)"
            },
            labelPlacement: "above-center",
            symbol: {
                type: "text",
                color: "#F2725E",
                haloColor: "#000",
                haloSize: 1,
                font: {
                    size: 10
                }
            },
            minScale: 100000000,
        },
        popupTemplate: {
            title: "{name}",
            outFields: ["*"],
            content: function (feature) {
                var rain = parseFloat(feature.graphic.attributes.rain).toFixed(1);
                return "<div class='project' data-id='{id}'><div class='content'>" +
                    "<span style='background: #f304e9;'>累计雨量 : " + rain + " mm </span>" +
                    "<span style='background: #4DA9EB;'>{orgnName}</span></div></div>";
            },
            actions: [{
                title: "查看详情",
                id: "rainTm",
                className: "iconfont icon-yu"
            }]
        },
        searchResult: function (feature) {
            var properties = feature.attributes
            return {
                title: properties.name,
                tags: ["今日雨量: " + properties.rain.toFixed(2), properties.orgnName],
                image: "qixiang",
                center: {
                    latitude: feature.geometry.latitude,
                    longitude: feature.geometry.longitude
                }
            }
        }
    },
    "riverTm": {
        idField: "code",
        title: "居民建筑",
        layer: null,
        renderer: {
            type: "unique-value",
            field: "warn",
            defaultSymbol: {
                type: "picture-marker",
                url: "/assets/modular/map/img/map/riverTm_N.jpg",
                width: "20px",
                height: "24px"
            },
            uniqueValueInfos: [{
                value: "0",
                symbol: {
                    type: "picture-marker",
                    url: "/assets/modular/map/img/map/riverTm_N.jpg",
                    width: "20px",
                    height: "24px"
                }
            }, {
                value: "1",
                symbol: {
                    type: "picture-marker",
                    url: "/assets/modular/map/img/map/riverTm_W.jpg",
                    width: "28px",
                    height: "36px"
                }
            }]
        },
        labelingInfo: [
            {
                labelExpressionInfo: {
                    expression: "Round($feature.level,2)"
                },
                labelPlacement: "above-center",
                symbol: {
                    type: "text",
                    color: "#02d7fd",
                    haloColor: "#000",
                    haloSize: 1,
                    font: {
                        size: 10
                    }
                },
                minScale: 100000,
                where: "warn = '0'"
            },
            {
                labelExpressionInfo: {
                    expression: "$feature.level"
                },
                labelPlacement: "above-center",
                symbol: {
                    type: "text",
                    color: "#fd0202",
                    haloColor: "#000",
                    haloSize: 1,
                    font: {
                        size: 11
                    }
                },
                minScale: 5000000,
                where: "warn = '1'"
            }],
        popupTemplate: {
            title: "{name}",
            outFields: ["*"],
            content: function (feature) {
                var warn = feature.graphic.attributes.warn;

                var color = "#00A65A"
                if (warn == "1") {
                    color = "#F2725E"
                }

                return "<div class='project' data-id='{id}'><div class='content'>" +
                    "<span style='background: #f304e9;'>实时水位 : {level}</span>" +
                    "<span style='background: " + color + "'>超警戒 : {dwarn}</span>" +
                    "<span style='background: #4DA9EB;'>{orgnName}</span></div></div>";
            },
            actions: [{
                title: "查看详情",
                id: "riverTm",
                className: "iconfont icon-yu"
            }]
        },
        searchResult: function (feature) {
            var properties = feature.attributes
            return {
                title: properties.name,
                tags: ["水位: " + properties.level, "超警戒: " + properties.dwarn, properties.orgnName],
                image: "shuiwen",
                center: {
                    latitude: feature.geometry.latitude,
                    longitude: feature.geometry.longitude
                }
            }
        }

    },
    "resrTm": {
        idField: "code",
        title: "工业建筑",
        layer: null,
        renderer: {
            type: "unique-value",
            field: "warn",
            defaultSymbol: {
                type: "picture-marker",
                url: "/assets/modular/map/img/map/rsvrTm_N.png",
                width: "20px",
                height: "24px"
            },
            uniqueValueInfos: [{
                value: "0",
                symbol: {
                    type: "picture-marker",
                    url: "/assets/modular/map/img/map/rsvrTm_N.png",
                    width: "20px",
                    height: "24px"
                }
            }, {
                value: "1",
                symbol: {
                    type: "picture-marker",
                    url: "/assets/modular/map/img/map/rsvrTm_W.png",
                    width: "28px",
                    height: "36px"
                }
            }]
        },
        labelingInfo: [

            {
                labelExpressionInfo: {
                    expression: "Round($feature.level,2)"
                },
                labelPlacement: "above-center",
                symbol: {
                    type: "text",
                    color: "#02d7fd",
                    haloColor: "#000",
                    haloSize: 1,
                    font: {
                        size: 10
                    }
                },
                minScale: 500000,
                where: "warn = '0'"
            },
            {
                labelExpressionInfo: {
                    expression: "$feature.level"
                },
                labelPlacement: "above-center",
                symbol: {
                    type: "text",
                    color: "#fd0202",
                    haloColor: "#000",
                    haloSize: 1,
                    font: {
                        size: 11
                    }
                },
                minScale: 5000000,
                where: "warn = '1'"
            }],
        popupTemplate: {
            title: "{name}",
            outFields: ["*"],
            content: function (feature) {
                var warn = feature.graphic.attributes.warn;

                var color = "#00A65A"
                if (warn == "1") {
                    color = "#F2725E"
                }

                return "<div class='project' data-id='{id}'><div class='content'>" +
                    "<span style='background: #f304e9;'>实时水位 : {level}</span>" +
                    "<span style='background: " + color + "'>超警戒 : {dwarn}</span>" +
                    "<span style='background: #4DA9EB;'>{orgnName}</span></div></div>";
            },
            actions: [{
                title: "查看详情",
                id: "resrTm",
                className: "iconfont icon-yu"
            }]
        },
        searchResult: function (feature) {
            var properties = feature.attributes
            return {
                title: properties.name,
                tags: ["水位: " + properties.level, "超警戒: " + properties.dwarn, properties.orgnName],
                image: "rsvrTm_N",
                center: {
                    latitude: feature.geometry.latitude,
                    longitude: feature.geometry.longitude
                }
            }
        }
    },
}
