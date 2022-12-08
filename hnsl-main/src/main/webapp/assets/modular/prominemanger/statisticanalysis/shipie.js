layui.use(["HttpRequest", 'carousel', 'laytpl', 'form', 'element', 'layarea'], function () {
    var $ = layui.$;
    var HttpRequest = layui.HttpRequest;
    var laytpl = layui.laytpl;
    var carousel = layui.carousel;
    var form = layui.form;
    var element = layui.element;
    var layarea = layui.layarea;

    /**
     * 初始化饼状图
     */
    new HttpRequest(Feng.ctxPath + "/count/shlx", 'POST', function (result) {

            var shlxdata = result.data;
            var shi = shlxdata[0].xzs;
            var data0 = null;
            var data1 = null;
            var data2 = null;
            var data3 = null;

            for (let i = 0; i < shlxdata.length; i++) {
                if (shlxdata[i].shlx == null) {
                    data1 = shlxdata[i].sum;
                } else if (shlxdata[i].shlx == "WS") {
                    data3 = shlxdata[i].sum;
                } else if (shlxdata[i].shlx == "TX") {
                    data2 = shlxdata[i].sum;
                } else if (shlxdata[i].shlx == "YZ") {
                    data0 = shlxdata[i].sum;
                }
            }
            /**
             * 各市各类型损毁面积饼图
             */
            var myChartpie = echarts.init(document.getElementById('mainpie'));
            var optionpie = {
                title: {
                    text: shi + '各损毁类型面积'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: [15, 75],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 50
                        },
                        data: [
                            {value: data2, name: '塌陷'},
                            {value: data3, name: '挖损'},
                            {value: data0, name: '压占'},
                            {value: data1, name: '其他'}
                        ]
                    }
                ]
            };

            myChartpie.setOption(optionpie);
            /**
             * 全省各类型损毁数量柱状图
             */
            var datac0 = [];


            for (let i = 0; i < shlxdata.length; i++) {
                datac0.push(shlxdata[i].count);
            }
            var myChartz = echarts.init(document.getElementById('mainbar'));
            var optionz = {
                title: {
                    text: shi + '各损毁类型数量'
                },
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    feature: {
                        // magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: {

                    type: 'category',
                    data: ['压占', '其他', '塌陷', '挖损']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: datac0,
                        type: 'line',
                        markPoint: {
                            data: [
                                {type: 'max', name: 'Max'},
                                {type: 'min', name: 'Min'}
                            ]
                        },
                        // markLine: {
                        //     data: [{type: 'average', name: 'Avg'}]
                        // }
                    },

                ]
            };

            myChartz.setOption(optionz);
        }
    ).start();

    new HttpRequest(Feng.ctxPath + "/count/cityrecover", 'POST', function (result) {

            var cdata = result.data;
            var shi = cdata[0].xzs;
            var xcor = [];
            var ycor = [];
            var ycor1 = [];
            let a = cdata.length -1
            for (let i = 0; i < cdata.length; i++) {
                xcor.push(cdata[a-i].year);
                ycor.push(cdata[a-i].recoveredArea)
                ycor1.push(cdata[a-i].recoveredCount)
            }

            /**
             * 各市的已修复数量面积柱状图
             */
            var myChartx = echarts.init(document.getElementById('mainx'));
            const colors = ['#c13531', '#2f4554'];
            var optionx = {
                color: colors,
                title: {
                    text: shi + '近十年已修复数量和面积',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                grid: {
                    right: '10%',
                    left: '20%'
                },
                legend: {
                    data: ['面积', '数量'],
                    orient: 'vertical',
                    left: 'left',
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xcor,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            interval: 0,
                        }
                    }
                ],
                yAxis: [

                    {
                        type: 'value',
                        name: '面积',
                        position: 'left',
                        alignTicks: true,
                        // offset: 40,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                    },
                    {
                        type: 'value',
                        name: '数量',
                        position: 'right',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                    },

                ],
                series: [
                    {
                        name: '面积',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + '';
                            }
                        },
                        data: ycor
                    },
                    {
                        name: '数量',
                        type: 'bar',
                        yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + '';
                            }
                        },
                        data: ycor1

                    },

                    ,]
            }
            myChartx.setOption(optionx);
        }
    ).start();
    /**
     * 核查与未核查数量饼图
     */
    new HttpRequest(Feng.ctxPath + "/count/shlx", 'POST', function (result) {

        // console.log(result)
        var shlxdata = result.data;
        var shi = shlxdata[0].xzs;
        var data0 = null;
        var data1 = null;
        var data2 = null;
        var data3 = null;

        for (let i = 0; i < shlxdata.length; i++) {
            if (shlxdata[i].shlx == null) {
                data1 = shlxdata[i].sum;
            } else if (shlxdata[i].shlx == "WS") {
                data3 = shlxdata[i].sum;
            } else if (shlxdata[i].shlx == "TX") {
                data2 = shlxdata[i].sum;
            } else if (shlxdata[i].shlx == "YZ") {
                data0 = shlxdata[i].sum;
            }
        }

        var myCharth = echarts.init(document.getElementById('mainh'));
        var optionh = {
            title: {
                text: shi + '核查数量'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: [15, 75],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 50
                    },
                    data: [
                        {value: data0, name: '已核查'},
                        {value: data1, name: '未核查'}
                    ],
                }
            ]
        };

        myCharth.setOption(optionh);
    }).start();

    /**
     * 地图
     */
    new HttpRequest(Feng.ctxPath + "/assets/modular/map/layer/region-simple.json", 'get', function (result) {
        var ajax1 = new HttpRequest(Feng.ctxPath + "/home/select", "POST");
        var selectdata = ajax1.start();
        var city = selectdata.data.xzs;
        var county = selectdata.data.xzx;
        /**
         * 根据账号等级填充下拉框菜单框
         */
        let Feature = {
            type: "FeatureCollection"
        }
        Feature.features = []
        Feature.features.push(result.features[0])
        let data = []
        var ajax = new HttpRequest(Feng.ctxPath + "/count/newsjhc", "POST")
        var resultlist =ajax.start()
        for (let i = 0; i< result.features.length; i++ ) {
            let Obj = {};
            let cityname = result.features[i].properties.name
            Obj.name = cityname
            for (let x = 0; x < resultlist.data.length; x++) {
                if (resultlist.data[x].xzs == cityname) {
                    Obj.shtbsl = resultlist.data[x].damageCount
                    Obj.shtbmj = resultlist.data[x].damageArea
                    Obj.shhcsl = resultlist.data[x].damageChecKCount
                    Obj.shhcmj = resultlist.data[x].damageCheckArea
                    Obj.xftbsl = resultlist.data[x].recoveredCount
                    Obj.xftbmj = resultlist.data[x].recoveredArea
                    Obj.xfhcsl = resultlist.data[x].recoveredCheckCount
                    Obj.xfhcmj = resultlist.data[x].recoveredCheckArea
                    Obj.hctbsl = Number(Obj.xfhcsl) + Number(Obj.shhcsl)
                    Obj.hctbmj = Number(Obj.xfhcmj) + Number(Obj.shhcmj)
                    Obj.whctbsl = (Number(Obj.shtbsl) + Number(Obj.xftbsl)) - Obj.hctbsl
                    Obj.whctbmj = (Number(Obj.shtbmj) + Number(Obj.xftbmj)) - Obj.hctbmj
                    let percent = ((Obj.xfhcsl / (Obj.xfhcsl + Obj.shhcsl))*100).toFixed(2)
                    console.log(percent)
                    Obj.value = percent
                }
            }
            data.push(Obj)
        }
        console.log(data,"this")

        var regionEcharts = echarts.init(document.getElementById('mainmap'));
        echarts.registerMap('map', Feature);
        var option = {
            title: {
                left: 'center',
                text: city + '示意图',
                textStyle: {
                    fontStyle: 'normal',
                }
            },
            tooltip: {
                show: true,
                formatter: function (params) {
                    if (params.name.length > 0) {
                        return [
                            '已修复核查图斑百分比：' + params.data['value'] + '%',
                            '损毁图斑数量：'+ params.data['shtbsl'],
                            '损毁图斑面积：'+ params.data['shtbmj'],
                            '已修复图斑数量：'+ params.data['xftbsl'],
                            '已修复图斑面积：'+ params.data['xftbmj'],
                            '已核查图斑数量：'+ params.data['hctbsl'],
                            '已核查图斑面积：'+ params.data['hctbmj'],
                            '未核查图斑数量：'+ params.data['whctbsl'],
                            '未核查图斑面积：'+ params.data['whctbmj'],
                        ].join('<br>');
                    }
                },
            },
            visualMap: {
                type: 'continuous',
                orient: 'horizontal',
                itemWidth: 10,
                itemHeight: 80,
                text: ['高', '低'],
                showLabel: true,
                seriesIndex: [0],
                min: 0,
                max: 100,
                inRange: {
                    color: [
                        '#4575b4',
                        '#74add1',
                        '#fee090',
                        '#fdae61',
                        '#f46d43',
                        '#d73027',
                        '#a50026']
                },
                textStyle: {
                    color: '#7B93A7'
                },
                bottom: 30,
                left: 'left',
            },
            geo: [{
                map: 'map',
                roam: false, //是否允许缩放
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 10,
                            textShadowColor: "#000",
                            textShadowBlur: 1,
                            textShadowOffsetX: 1,
                            textShadowOffsetY: 1,
                            fontFamily: "PingFang SC",
                            fontWeight: 'bold',
                            color: '#f8f9ff'
                        },
                    },
                    emphasis: {
                        textStyle: {
                            fontFamily: "PingFang SC",
                            color: '#e1effa'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        borderColor: '#effafd',
                        areaColor: '#c0c2d0'
                    },
                    emphasis: {
                        borderColor: '#c5ada4',
                        areaColor: '#73716f',
                    }
                }
            }],
            series: [{
                type: 'map',
                roam: false,
                geoIndex: 0,
                label: {
                    show: false,
                },
                data: data
            }]
        };
        regionEcharts.setOption(option);
        var colorStops = [
            [{
                offset: 0,
                color: '#73716f' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#ffffff' // 100% 处的颜色
            }], [{
                offset: 0,
                color: '#487584' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#5ebbc6' // 100% 处的颜色
            }], [{
                offset: 0,
                color: '#d4d1c4' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#73716f' // 100% 处的颜色
            }]]
    }).start();
    /**
     * 二合一方案饼图
     */
    new HttpRequest(Feng.ctxPath + "/count/cityTwoInOne", "POST", function (result) {
        var tdata = result.data;
        var shi = tdata[0].xzs;
        var data0 = 0;
        var data1 = 0;
        var data2 = 0;
        for (let i = 0; i < tdata.length; i++) {
            if (tdata[i].fazt == "0") {
                data0 = Number(tdata[i].faztcount);
            } else if (tdata[i].fazt == "1") {
                data1 = tdata[i].faztcount;
            } else if (tdata[i].fazt == "2") {
                data2 = tdata[i].faztcount;
            }
        }
        console.log(data0, data1, data2);
        var myChartd = echarts.init(document.getElementById('maint'));
        var optiond = {
            title: {
                text: shi+'二合一方案状态',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                // orient: 'vertical',
                // left: 'left',
                top: 'bottom'
            },

            series: [
                {
                    name: shi,
                    type: 'pie',
                    radius: '30%',
                    // radius: ['10%', '20%'],
                    roseType: 'area',
                    data: [
                        {value: data0, name: '有效期内二合一方案'},
                        {value: data1, name: '二合一方案过期'},
                        {value: data2, name: '无二合一方案'},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        myChartd.setOption(optiond);


    }).start();

    /**
     * 矿权信息雷达图
     */
    new HttpRequest(Feng.ctxPath + "/count/cityMineEnterpriseckxkz", "POST", function (result) {
        var kdata = result.data;

        // var shi = kdata[0].xzsv;
        var arry1 = {
            value: [0, 0, 0, 0, 0],
            name: '变更'
        };
        var arry2 = {
            value: [0, 0, 0, 0, 0],
            name: '延续'
        };
        var arry3 = {
            value: [0, 0, 0, 0, 0],
            name: '新申请'
        };
        var arry4 = {
            value: [0, 0, 0, 0, 0],
            name: '持有'
        };
        var arry5 = {
            value: [0, 0, 0, 0, 0],
            name: '过期'
        };
        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].ckxkz == "变更") {
                arry1.value.splice(0, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "延续") {
                arry1.value.splice(1, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "新申请") {
                arry1.value.splice(2, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "持有") {
                arry1.value.splice(3, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "过期") {
                arry1.value.splice(3, 1, kdata[i].ckxkzcount)
            }
        }
        ;
        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].ckxkz == "变更") {
                arry2.value.splice(0, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "延续") {
                arry2.value.splice(1, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "新申请") {
                arry2.value.splice(2, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "持有") {
                arry2.value.splice(3, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "过期") {
                arry2.value.splice(3, 1, kdata[i].ckxkzcount)
            }
        }
        ;
        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].ckxkz == "变更") {
                arry3.value.splice(0, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "延续") {
                arry3.value.splice(1, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "新申请") {
                arry3.value.splice(2, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "持有") {
                arry3.value.splice(3, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "过期") {
                arry3.value.splice(3, 1, kdata[i].ckxkzcount)
            }
        }
        ;
        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].ckxkz == "变更") {
                arry4.value.splice(0, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "延续") {
                arry4.value.splice(1, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "新申请") {
                arry4.value.splice(2, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "持有") {
                arry4.value.splice(3, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "过期") {
                arry4.value.splice(3, 1, kdata[i].ckxkzcount)
            }
        }
        ;
        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].ckxkz == "变更") {
                arry5.value.splice(0, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "延续") {
                arry5.value.splice(1, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "新申请") {
                arry5.value.splice(2, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "持有") {
                arry5.value.splice(3, 1, kdata[i].ckxkzcount)
            } else if (kdata[i].ckxkz == "过期") {
                arry5.value.splice(3, 1, kdata[i].ckxkzcount)
            }
        }
        ;
        // var ajax = new HttpRequest(Feng.ctxPath + "/count/cityMineEnterpriseqyxz", "POST");
        // console.log(ajax.start())
        //

        var myChartk = echarts.init(document.getElementById('maink'));
        var optionk = {
            title: {
                text: '矿权许可信息',
                left: 'center'
            },

            tooltip: {
                trigger: 'item',
            },
            radar: {
                indicator: [
                    {name: '新申请'},
                    {name: '持有'},
                    {name: '变更'},
                    {name: '过期'},
                    {name: '延续'}
                ]
            },
            series: [
                {
                    name: 'Budget vs spending',
                    type: 'radar',

                    data: [
                        arry1,
                        arry2,
                        arry3,
                        arry4,
                        arry5
                    ],
                }
            ]
        };
        myChartk.setOption(optionk);


    }).start();

    /**
     * 矿权企业性质雷达图
     */
    new HttpRequest(Feng.ctxPath + "/count/cityMineEnterpriseqyxz", "POST", function (result) {
        var kdata = result.data;

        // var shi = kdata[0].xzsv;
        // "1"国有企业
        // "2">集体所有制
        // "3">私营企业
        // "4">股份制企业
        // "5">有限合伙企业
        // "6">联营企业
        //"7">外商投资企业
        // "8">个人独资企业
        var arry1 = {
            value: [0, 0, 0, 0, 0,0,0,0],
            name: '国有企业'
        };
        var arry2 = {
            value: [0, 0, 0, 0, 0,0,0,0],
            name: '集体所有制'
        };
        var arry3 = {
            value: [0, 0, 0, 0, 0,0,0,0],
            name: '私营企业'
        };
        var arry4 = {
            value: [0, 0, 0, 0, 0,0,0,0],
            name: '股份制企业'
        };
        var arry5 = {
            value: [0, 0, 0, 0, 0,0,0,0],
            name: '有限合伙企业'
        };
        var arry6 = {
            value: [0, 0, 0, 0, 0,0,0,0],
            name: '联营企业'
        };
        var arry7 = {
            value: [0, 0, 0, 0, 0,0,0,0],
            name: '外商投资企业'
        };
        var arry8 = {
            value: [0, 0, 0, 0, 0,0,0,0],
            name: '个人独资企业'
        };

        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].qyxz == "1") {
                arry1.value.splice(0, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "2") {
                arry1.value.splice(1, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "3") {
                arry1.value.splice(2, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "4") {
                arry1.value.splice(3, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "5") {
                arry1.value.splice(4, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "6") {
                arry1.value.splice(5, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "7") {
                arry1.value.splice(6, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "8") {
                arry1.value.splice(7, 1, kdata[i].qyxzcount)
            }
        };
        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].qyxz == "1") {
                arry2.value.splice(0, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "2") {
                arry2.value.splice(1, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "3") {
                arry2.value.splice(2, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "4") {
                arry2.value.splice(3, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "5") {
                arry2.value.splice(4, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "6") {
                arry2.value.splice(5, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "7") {
                arry2.value.splice(6, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "8") {
                arry2.value.splice(7, 1, kdata[i].qyxzcount)
            }
        };
        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].qyxz == "1") {
                arry3.value.splice(0, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "2") {
                arry3.value.splice(1, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "3") {
                arry3.value.splice(2, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "4") {
                arry3.value.splice(3, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "5") {
                arry3.value.splice(4, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "6") {
                arry3.value.splice(5, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "7") {
                arry3.value.splice(6, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "8") {
                arry3.value.splice(7, 1, kdata[i].qyxzcount)
            }
        };
        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].qyxz == "1") {
                arry4.value.splice(0, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "2") {
                arry4.value.splice(1, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "3") {
                arry4.value.splice(2, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "4") {
                arry4.value.splice(3, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "5") {
                arry4.value.splice(4, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "6") {
                arry4.value.splice(5, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "7") {
                arry4.value.splice(6, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "8") {
                arry4.value.splice(7, 1, kdata[i].qyxzcount)
            }
        };
        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].qyxz == "1") {
                arry5.value.splice(0, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "2") {
                arry5.value.splice(1, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "3") {
                arry5.value.splice(2, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "4") {
                arry5.value.splice(3, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "5") {
                arry5.value.splice(4, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "6") {
                arry5.value.splice(5, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "7") {
                arry5.value.splice(6, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "8") {
                arry5.value.splice(7, 1, kdata[i].qyxzcount)
            }
        };
        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].qyxz == "1") {
                arry6.value.splice(0, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "2") {
                arry6.value.splice(1, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "3") {
                arry6.value.splice(2, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "4") {
                arry6.value.splice(3, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "5") {
                arry6.value.splice(4, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "6") {
                arry6.value.splice(5, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "7") {
                arry6.value.splice(6, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "8") {
                arry6.value.splice(7, 1, kdata[i].qyxzcount)
            }
        };
        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].qyxz == "1") {
                arry7.value.splice(0, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "2") {
                arry7.value.splice(1, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "3") {
                arry7.value.splice(2, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "4") {
                arry7.value.splice(3, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "5") {
                arry7.value.splice(4, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "6") {
                arry7.value.splice(5, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "7") {
                arry7.value.splice(6, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "8") {
                arry7.value.splice(7, 1, kdata[i].qyxzcount)
            }
        };
        for (let i = 0; i < kdata.length; i++) {
            if (kdata[i].qyxz == "1") {
                arry8.value.splice(0, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "2") {
                arry8.value.splice(1, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "3") {
                arry8.value.splice(2, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "4") {
                arry8.value.splice(3, 1, kdata[i].qyxzcount)
            } else if (kdata[i].qyxz == "5") {
                arry8.value.splice(4, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "6") {
                arry8.value.splice(5, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "7") {
                arry8.value.splice(6, 1, kdata[i].qyxzcount)
            }else if (kdata[i].qyxz == "8") {
                arry8.value.splice(7, 1, kdata[i].qyxzcount)
            }
        };
        // console.log(ajax.start())
        var myChartq = echarts.init(document.getElementById('mainq'));
        var optionq = {
            title: {
                text: '矿权企业性质',
                left: 'center'
            },

            tooltip: {
                trigger: 'item',
            },
            radar: {
                indicator: [
                    {name: '国有企业'},
                    {name: '集体所有制'},
                    {name: '私营企业'},
                    {name: '股份制企业'},
                    {name: '有限合伙企业'},
                    {name: '联营企业'},
                    {name: '外商投资企业'},
                    {name: '个人独资企业'}
                ]
                // "1"国有企业
                // "2">集体所有制
                // "3">私营企业
                // "4">股份制企业
                // "5">有限合伙企业
                // "6">联营企业
                //"7">外商投资企业
                // "8">个人独资企业
            },
            series: [
                {
                    name: 'Budget vs spending',
                    type: 'radar',

                    data: [
                        arry1,
                        arry2,
                        arry3,
                        arry4,
                        arry5,
                        arry6,
                        arry7,
                        arry8
                    ],
                }
            ]
        };
        myChartq.setOption(optionq);


    }).start();
})







