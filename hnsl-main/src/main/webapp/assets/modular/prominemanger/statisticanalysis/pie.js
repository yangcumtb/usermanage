layui.use(["HttpRequest", 'carousel', 'laytpl', 'form', 'element', 'layarea'], function () {
    var $ = layui.$;
    var HttpRequest = layui.HttpRequest;
    var laytpl = layui.laytpl;
    var carousel = layui.carousel;
    var form = layui.form;
    var element = layui.element;
    var layarea = layui.layarea;


    // 导出excel数据
    $('#importExceldata').click(function () {
        window.open(Feng.ctxPath + '/count/excelDownload');
    });


    /**
     * 初始化饼状图
     */
    new HttpRequest(Feng.ctxPath + "/count/shxzs", 'POST', function (result) {


        var origndata = result.data;
        var xcor = [];
        var ycor = [];
        var ycor1 = [];
        for (let i = 0; i < origndata.length; i++) {
            xcor.push(origndata[i].xzscount);
            ycor.push(origndata[i].sum);
            ycor1.push(origndata[i].count);
        }


        /**
         * 各市的损毁数量面积柱状图
         */
        var myChart = echarts.init(document.getElementById('main2'));
        const colors = ['#c13531', '#2f4554'];
        var option = {
            color: colors,
            title: {
                text: '各市损毁图斑的数量和面积',
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
        myChart.setOption(option);
    }).start();
    /**
     * 雷达图
     */

    new HttpRequest(Feng.ctxPath + "/count/sj", "POST", function (result) {
        const xcor = ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '铁岭市', '朝阳市', '葫芦岛市'];
        var orign = result.data;

        var arry1 = {
            value: [0, 0, 0, 0],
            name: '沈阳市'
        };
        var arry2 = {
            value: [0, 0, 0, 0],
            name: '大连市'
        };
        var arry3 = {
            value: [0, 0, 0, 0],
            name: '鞍山市'
        };
        var arry4 = {
            value: [0, 0, 0, 0],
            name: '抚顺市'
        };
        var arry5 = {
            value: [0, 0, 0, 0],
            name: '本溪市'
        };
        var arry6 = {
            value: [0, 0, 0, 0],
            name: '丹东市'
        };
        var arry7 = {
            value: [0, 0, 0, 0],
            name: '锦州市'
        };
        var arry8 = {
            value: [0, 0, 0, 0],
            name: '营口市'
        };
        var arry9 = {
            value: [0, 0, 0, 0],
            name: '阜新市'
        };
        var arry10 = {
            value: [0, 0, 0, 0],
            name: '辽阳市'
        };
        var arry11 = {
            value: [0, 0, 0, 0],
            name: '盘锦市'
        };
        var arry12 = {
            value: [0, 0, 0, 0],
            name: '铁岭市'
        };
        var arry13 = {
            value: [0, 0, 0, 0],
            name: '朝阳市'
        };
        var arry14 = {
            value: [0, 0, 0, 0],
            name: '葫芦岛市'
        };
        //遍历传回的值，更新默认值
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "沈阳市") {
                if (orign[i].shlx === "TX") {
                    arry1.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry1.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry1.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry1.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "大连市") {
                if (orign[i].shlx === "TX") {
                    arry2.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry2.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry2.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry2.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "鞍山市") {
                if (orign[i].shlx === "TX") {
                    arry3.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry3.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry3.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry3.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "抚顺市") {
                if (orign[i].shlx === "TX") {
                    arry4.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry4.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry4.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry4.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "本溪市") {
                if (orign[i].shlx === "TX") {
                    arry5.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry5.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry5.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry5.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "丹东市") {
                if (orign[i].shlx === "TX") {
                    arry6.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry6.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry6.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry6.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "锦州市") {
                if (orign[i].shlx === "TX") {
                    arry7.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry7.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry7.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry7.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "营口市") {
                if (orign[i].shlx === "TX") {
                    arry8.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry8.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry8.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry8.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "阜新市") {
                if (orign[i].shlx === "TX") {
                    arry9.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry9.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry9.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry9.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "辽阳市") {
                if (orign[i].shlx === "TX") {
                    arry10.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry10.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry10.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry10.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "盘锦市") {
                if (orign[i].shlx === "TX") {
                    arry11.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry11.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry11.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry11.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "铁岭市") {
                if (orign[i].shlx === "TX") {
                    arry12.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry12.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry12.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry12.value.splice(3, 1, orign[i].sum)
                }
            }
        }

        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "朝阳市") {
                if (orign[i].shlx === "TX") {
                    arry13.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry13.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry13.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry13.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        for (let i = 0; i < orign.length; i++) {
            if (orign[i].xzscount === "葫芦岛市") {
                if (orign[i].shlx === "TX") {
                    arry14.value.splice(0, 1, orign[i].sum)
                } else if (orign[i].shlx === "WS") {
                    arry14.value.splice(1, 1, orign[i].sum)
                } else if (orign[i].shlx === "YZ") {
                    arry14.value.splice(2, 1, orign[i].sum)
                } else if (orign[i].shlx === null) {
                    arry14.value.splice(3, 1, orign[i].sum)
                }
            }
        }
        var
            myChartd = echarts.init(document.getElementById('main7'));
        var optiond = {
            title: {
                text: '各市图斑损毁面积',
                right: '10%',
            },

            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: xcor,
            },
            radar: {
                indicator: [
                    {name: '塌陷'},
                    {name: '挖损'},
                    {name: '压占'},
                    {name: '其他'}
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
                        arry5,
                        arry6,
                        arry7,
                        arry8,
                        arry9,
                        arry10,
                        arry11,
                        arry12,
                        arry13,
                        arry14
                    ],
                }
            ]
        };
        myChartd.setOption(optiond);


    }).start();

    new HttpRequest(Feng.ctxPath + "/count/shlx", 'POST', function (result) {
        var shlxdata = result.data;

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
         * 全省各类型损毁面积饼图
         */
        var myChartpie = echarts.init(document.getElementById('mainpie'));
        var optionpie = {
            title: {
                text: '各类型损毁图斑面积'
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
                    name: '全省',
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

        var myChartz = echarts.init(document.getElementById('main5'));
        var optionz = {
            title: {
                text: '各类型损毁图斑数量'
            },
            tooltip: {
                trigger: 'axis'
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
                    name: '全省',
                    data: datac0,
                    type: 'line'
                }
            ]
        };

        myChartz.setOption(optionz);
    }).start();
    /**
     * 全省已修复数量面积饼图
     */
    new HttpRequest(Feng.ctxPath + "/count/xftb", 'POST', function (result) {
        var xdata = result.data;
        var xcor = [];
        var ycor = [];
        var ycor1 = [];
        for (let i = 0; i < xdata.length; i++) {
            if (xdata[i].xzscount != null) {
                xcor.push(xdata[i].xzscount);
                ycor.push(xdata[i].tbmj);
                ycor1.push(xdata[i].count);
            }
        }


        var myChartx = echarts.init(document.getElementById('main8'));
        const colors = ['#c13531', '#2f4554'];
        var optionx = {
            color: colors,
            title: {
                text: '各市已修复图斑的面积和数量',
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
                right: '20%',
                left: '20%'
            },
            legend: {
                orient: 'vertical',
                data: ['面积', '数量'],
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

                },]


        }
        myChartx.setOption(optionx);
    }).start();

    /**
     * 全省核查与未核查数量饼图
     */
    new HttpRequest(Feng.ctxPath + "/count/hccount", 'POST', function (result) {
        var data0 = result.data[0]
        var data1 = result.data[1]
        var myCharth = echarts.init(document.getElementById('main6'));
        var optionh = {
            title: {
                text: '核查图斑数量',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: '全省',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        {value: data0, name: '已核查'},
                        {value: data1, name: '未核查'}
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
        var resultlist = ajax.start()
        console.log(resultlist)
        for (let i = 0; i < result.features.length; i++) {
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
                    if ((Obj.xfhcsl + Obj.shhcsl) == 0) {
                        Obj.value = 0
                    } else {
                        let percent = ((Obj.xfhcsl / (Obj.xfhcsl + Obj.shhcsl)) * 100).toFixed(2)
                        console.log(percent)
                        Obj.value = percent
                    }

                }
            }
            data.push(Obj)
        }
        console.log(data, "this")


        var regionEcharts = echarts.init(document.getElementById('mainmap'));
        echarts.registerMap('map', result);
        var option = {
            title: {
                left: 'center',
                text: '辽宁省示意图',
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
                            '损毁图斑数量：' + params.data['shtbsl'],
                            '损毁图斑面积：' + params.data['shtbmj'],
                            '已修复图斑数量：' + params.data['xftbsl'],
                            '已修复图斑面积：' + params.data['xftbmj'],
                            '已核查图斑数量：' + params.data['hctbsl'],
                            '已核查图斑面积：' + params.data['hctbmj'],
                            '未核查图斑数量：' + params.data['whctbsl'],
                            '未核查图斑面积：' + params.data['whctbmj'],
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
     * 二合一方案情况
     */

    /**
     * 全省各二合一方案状态数量饼图
     */
    new HttpRequest(Feng.ctxPath + "/count/sjtwo_in_one", 'POST', function (result) {
        var Tdata = result.data;
        var data0 = 0;
        var data1 = 0;
        var data2 = 0;
        for (let i = 0; i < Tdata.length; i++) {
            if (Tdata[i].fazt == "0") {
                data0 = data0 + Number(Tdata[i].faztcount);
            } else if (Tdata[i].fazt == "1") {
                data1 = data1 + Number(Tdata[i].faztcount);
            } else if (Tdata[i].fazt == "2") {
                data2 = data2 + Number(Tdata[i].faztcount);
            }
        }
        var myCharte = echarts.init(document.getElementById('maine'));
        var optione = {
            title: {
                text: '矿山二合一方案状态'
            },

            legend: {
                top: 'bottom'
            },

            tooltip: {
                trigger: 'item'
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
                    name: '全省',
                    type: 'pie',
                    radius: [15, 75],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 3
                    },
                    data: [
                        {value: data0, name: '有效期内二合一方案'},
                        {value: data1, name: '二合一方案过期'},
                        {value: data2, name: '无二合一方案'}
                    ]
                }
            ]
        };

        myCharte.setOption(optione);
    }).start();
    /**
     * 各市各二合一方案状态数量饼图
     */
    new HttpRequest(Feng.ctxPath + "/count/cityTwoInOne", 'POST', function (result) {
        var Tdata = result.data;
        var xcor = [];
        var data0 = [];
        var data1 = [];
        var data2 = [];
        for (let i = 0; i < Tdata.length; i++) {
            xcor.push(Tdata[i].xzs);
        }
        ;
        xcor = Array.from(new Set(xcor))
        console.log(xcor)
        for (let i = 0; i < Tdata.length; i++) {
            xcor.push(Tdata[i].xzs);
        }
        ;
        xcor = Array.from(new Set(xcor))
        for (let i = 0; i < xcor.length; i++) {
            let zero = 0;
            let one = 0;
            let two = 0;
            let city = xcor[i]
            for (let x = 0; x < Tdata.length; x++) {
                if (Tdata[x].xzs == city) {
                    if (Tdata[x].fazt == "0") {
                        zero = zero + Number(Tdata[x].faztcount)
                    } else if (Tdata[x].fazt == "1") {
                        one = one + Number(Tdata[x].faztcount)
                    } else if (Tdata[x].fazt == "2") {
                        two = two + Number(Tdata[x].faztcount)
                    }
                }
            }
            data0.push(zero)
            data1.push(one)
            data2.push(two)
        }
        /**
         * 各市的各市二合一方案数量柱状图
         */
        var myChartse = echarts.init(document.getElementById('mainse'));
        var optionse = {
            title: {
                text: '各市矿山二合一方案状态',
                left: 'center',
            },
            tooltip: {
                trigger: 'axis'
            },

            legend: {
                data: ['有效期内二合一方案', '二合一方案过期', '无二合一方案'],
                top: 'bottom'

            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: xcor,
                    axisLabel: {
                        interval: 0,
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '有效期内二合一方案',
                    type: 'bar',
                    // data: data0,
                    data: data0,
                    markPoint: {
                        data: [
                            {type: 'max', name: 'Max'},
                            {type: 'min', name: 'Min'}
                        ]
                    },
                },
                {
                    name: '二合一方案过期',
                    type: 'bar',

                    data: data1,
                    markPoint: {
                        data: [
                            {type: 'max', name: 'Max'},
                            {type: 'min', name: 'Min'}
                        ]
                    },
                },
                {
                    name: '无二合一方案',
                    type: 'bar',
                    data: data2,
                    markPoint: {
                        data: [
                            {type: 'max', name: 'Max'},
                            {type: 'min', name: 'Min'}
                        ]
                    },
                }
            ]
        };
        myChartse.setOption(optionse);
    }).start();

    /**
     * 矿权情况
     */

    /**
     * 全省矿权情况数量饼图
     */
    new HttpRequest(Feng.ctxPath + "/count/sjMineEnterprisekqxkz", 'POST', function (result) {
        var qyxzdata = result.data;
        var data0 = null;
        var data1 = null;
        var data2 = null;
        var data3 = null;
        var data4 = null;
        for (let i = 0; i < qyxzdata.length; i++) {
            if (qyxzdata[i].ckxkz == "变更") {
                data0 = qyxzdata[i].ckxkzcount;
            } else if (qyxzdata[i].ckxkz == "延续") {
                data1 = qyxzdata[i].ckxkzcount;
            } else if (qyxzdata[i].ckxkz == "新申请") {
                data2 = qyxzdata[i].ckxkzcount;
            } else if (qyxzdata[i].ckxkz == '持有') {
                data3 = qyxzdata[i].ckxkzcount;
            } else if (qyxzdata[i].ckxkz == '过期') {
                data4 = qyxzdata[i].ckxkzcount;
            }
        }

        var myChartT = echarts.init(document.getElementById('mainT'));

        var optionT = {
            title: {
                text: '矿权许可状态',
                left: 'center',
            },
            tooltip: {
                trigger: 'item'
            },

            legend: {
                top: 'bottom'
            },

            series: [
                {
                    name: '全省',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: data2, name: '新申请'},
                        {value: data3, name: '持有'},
                        {value: data0, name: '变更'},
                        {value: data4, name: '过期'},
                        {value: data1, name: '延续'}
                    ]
                }
            ]
        };
        myChartT.setOption(optionT);
    }).start();
    /**
     * 矿权情况
     */

    /**
     * 全省矿权性质数量饼图
     */

    new HttpRequest(Feng.ctxPath + "/count/sjMineEnterpriseqyxz", 'POST', function (result) {
        var qyxzdata = result.data;
        var data0 = [];
        for (let i = 0; i < qyxzdata.length; i++) {
            data0.push(qyxzdata[i].qyxzcount);
        }


        var myChartsT = echarts.init(document.getElementById('mainsT'));
        var optionsT = {
            title: {
                text: '矿权企业性质情况',
                left: 'center',
            },
            tooltip: {
                trigger: 'axis'
            },
            // "1"国有企业
            // "2">集体所有制
            // "3">私营企业
            // "4">股份制企业
            // "5">有限合伙企业
            // "6">联营企业
            //"7">外商投资企业
            // "8">个人独资企业
            toolbox: {
                show: true,
                feature: {
                    // dataView: { show: true, readOnly: false },
                    // magicType: { show: true, type: ['line', 'bar'] },
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['股份制企业', '集体所有制', '外商投资企业', '联营企业', '国有企业', '私营企业'],
                    // ,'有限合伙企业','个人独资企业'
                    axisLabel: {
                        interval: 0,
                    }
                }
            ],
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '全省',
                    data: data0,
                    type: 'line'
                }
            ],
        };
        myChartsT.setOption(optionsT);
    }).start();
})



