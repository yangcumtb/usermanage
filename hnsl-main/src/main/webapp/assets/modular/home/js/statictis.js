layui.use(["HttpRequest", 'carousel', 'laytpl', 'form', 'element', 'layarea'], function () {
    var $ = layui.$;
    var HttpRequest = layui.HttpRequest;
    var laytpl = layui.laytpl;
    var carousel = layui.carousel;
    var form = layui.form;
    var element = layui.element;
    var layarea = layui.layarea;

    $(".delete-btn").click(function () {
        $("#xzs").val('');
        form.render();
    })
    $(".delete-btn1").click(function () {
        $("#xzx").val('');
        form.render();
    })
    // 渲染轮播
    carousel.render({
        elem: '#compCarousel',
        width: '100%',
        height: '180px',
        arrow: 'none',
        autoplay: true,
        trigger: 'hover',
        anim: 'fade'
    });
    layarea.render({
        elem: '#area',
        change: function (res) {
        }
    });

    /**
     * 初始地图表、条形表
     */
    new HttpRequest(Feng.ctxPath + "/assets/modular/map/layer/region-simple.json", 'get', function (result) {
        var ajax1 = new HttpRequest(Feng.ctxPath + "/home/select", "POST");
        var selectdata = ajax1.start();
        var city = selectdata.data.xzs;
        var county = selectdata.data.xzx;
        /**
         * 根据账号等级填充下拉框菜单框
         */
        if (selectdata.data.length !== 0) {
            if (selectdata.data.length === 1) {
                $(".city-selector").val(city);
                form.render();
            } else {
                $(".city-selector").val(city);
                $(".county-selector").val(county);
                form.render();
            }
        }

        var ajax = new HttpRequest(Feng.ctxPath + "/home/statisticsitem", "POST");
        var result1 = ajax.start();
        var size = result1.data.length;
        var data = [];
        var dataitem = [];
        var dataitemvalue = [];
        var text = [];
        for (let i = 0; i < result.features.length; i++) {
            /**
             * data的获取用函数来计算。
             */
            for (let j = 0; j < size; j++) {
                if (result1.data[j].adname === result.features[i].properties.name) {
                    data.push({
                        name: result.features[i].properties.name,
                        value: ((result1.data[j].yxfmj / (result1.data[j].tbshmj + result1.data[j].yxfmj)) * 100).toFixed(2),
                    });

                    text.push(result.features[i].properties.name);
                }
            }
        }
        for (let j = 0; j < size; j++) {
            dataitem.push(result1.data[j].adname);
            dataitemvalue.push(result1.data[j].tbshmj + result1.data[j].yxfmj);
        }
        var myChart = echarts.init(document.getElementById('regionMap'));
        echarts.registerMap('map', result);
        var option = {
            title: {
                left: 'center',
                text: '辽宁省各市已修复未修复图斑面积比值图',
                textStyle: {
                    fontStyle: 'normal',
                }
            },
            tooltip: {
                show: true,
                formatter: function (params) {
                    if (params.name.length > 0) {
                        return params.name + ':' + params.data['value'] + '%';
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
                min: 50,
                max: 100,
                inRange: {
                    color: ['#9ea7b4', '#4FC180', '#464c5b']
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
        myChart.setOption(option);

        /**
         * 初始化条形表
         */
        var myChartitem = echarts.init(document.getElementById('chat'));
        var optionitem = {
            color: ['#3398DB'],
            title: {
                left: 'center',
                text: '辽宁省各市图斑面积统计表',
                textStyle: {
                    //标题颜色
                    // color:'#c4d9f5',
                    //字体风格
                    fontStyle: 'normal',
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} '
            },
            legend: {
                data: ['行政区']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '4%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: dataitem,
                //将统计图横坐标垂直排列
                axisLabel: {
                    formatter: function (value) {
                        return value.split("").join("\n")
                    }
                }
            },
            yAxis: {type: 'value'},
            series: [{
                name: '图斑数量(面积)',
                type: 'bar',
                data: dataitemvalue,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#3DABC2'},
                                {offset: 0.5, color: '#9ea7b4'},
                                {offset: 1, color: '#464c5b'},
                            ]
                        )
                    }
                }
            }]
        }
        myChartitem.setOption(optionitem);
    }).start();

    /**
     * 初始化折现表
     */
    new HttpRequest(Feng.ctxPath + "/home/statisticslines", 'POST', function (result) {

        var datalsyl = [];
        var datapclose = [];
        var datascks = [];
        var datajsxm = [];
        var datazrzs = [];
        year.innerText = "(" + result.data[result.data.length - 1].year + ")";
        for (i = 0; i < result.data.length; i++) {
            if (result.data[i].tblx === 1) {
                datalsyl.push({
                    year: result.data[i].year,
                    value: result.data[i].yxfmj,
                });
            } else if (result.data[i].tblx === 2) {
                datapclose.push({
                    year: result.data[i].year,
                    value: result.data[i].yxfmj,
                });
            } else if (result.data[i].tblx === 3) {
                datascks.push({
                    year: result.data[i].year,
                    value: result.data[i].yxfmj,
                });
            } else if (result.data[i].tblx === 4) {
                datajsxm.push({
                    year: result.data[i].year,
                    value: result.data[i].yxfmj,
                });
            } else if (result.data[i].tblx === 5) {
                datazrzs.push({
                    year: result.data[i].year,
                    value: result.data[i].yxfmj,
                });
            }
        }
        var myChartline = echarts.init(document.getElementById('line'));
        var optionline = {
            color: ['#3398DB'],
            title: {
                x: 'center',
                y: 'top',
                text: '辽宁省各类图斑面积拟修复时间变化折线表',
                textStyle: {
                    //标题颜色
                    // color:'#c4d9f5',
                    //字体风格
                    fontStyle: 'normal',
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} '
            },
            color: ['#66DD00', 'pink', '#FF0000', 'green', '#9ea7b4'],
            legend: {
                // orient: 'vertical',
                // x: 'right',
                // y: 'top',
                orient: 'horizontal',
                top: 30,
                data: ['历史遗留图斑', '建设项目图斑', '生产矿山图斑', '政策性关闭矿山', '自然灾损']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '4%',
                containLabel: true
            },
            xAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#3398DB'
                    }
                },
                type: 'category',
                data: [],
                //将统计图横坐标垂直排列
                axisLabel: {
                    rotate: 30,
                    interval: 0
                    //垂直排列
                    // formatter: function (value) {
                    //     return value.split("").join("\n")
                    // }
                },

            },
            yAxis: {
                type: 'value',
                splitLine: {show: false}
            },
            series: [{
                name: '历史遗留图斑',
                type: 'line',
                smooth: true,  //true 为平滑曲线，false为直线
                data: datalsyl,
                lineStyle: {
                    normal: {
                        color: '#66DD00',
                    }
                }
            },
                {
                    name: '建设项目图斑',
                    type: "line",
                    smooth: true,  //true 为平滑曲线，false为直线
                    stack: 'Total',
                    data: datajsxm,
                    lineStyle: {
                        normal: {
                            color: 'pink'
                        }
                    }
                },
                {
                    name: '生产矿山图斑',
                    type: "line",
                    smooth: true,  //true 为平滑曲线，false为直线
                    stack: 'Total',
                    data: datascks,
                    lineStyle: {
                        normal: {
                            color: '#FF0000'
                        }
                    }
                },
                {
                    name: '政策性关闭矿山',
                    type: "line",
                    smooth: true,  //true 为平滑曲线，false为直线
                    stack: 'Total',
                    data: datapclose,
                    lineStyle: {
                        normal: {
                            color: 'green'
                        }
                    }
                },
                {
                    name: '自然灾损',
                    type: "line",
                    smooth: true,  //true 为平滑曲线，false为直线
                    stack: 'Total',
                    data: datazrzs,
                    lineStyle: {
                        normal: {
                            color: '#9ea7b4'
                        }
                    }
                },
            ]
        }
        myChartline.setOption(optionline);
    }).start();

    /**
     * 初始化饼状图
     */
    new HttpRequest(Feng.ctxPath + "/home/statisticspie", 'POST', function (result) {
        /**
         * 封装标题数据
         * @type {HTMLElement}
         */
        var p = document.getElementById('yxftbs');
        var pvalue = 0;
        var p2 = document.getElementById('wxftbs');
        var p2value = 0;
        var p3 = document.getElementById('p3');
        var p3value = 0;
        var p4 = document.getElementById('p4');
        var p4value = 0;
        var p5 = document.getElementById('p5');
        var p5value = 0;
        var p6 = document.getElementById('p6');
        var p6value = 0;
        var p7 = document.getElementById('p7');
        var p7value = 0;

        var index = result.data.length - 1;
        if (result.data.length != 0) {
            for (let i = 0; i <= index; i++) {
                if (result.data[i].tblx === 1) {
                    pvalue = pvalue + result.data[i].yxfsl;
                    p2value = p2value + result.data[i].tbshsl;
                    p3value = result.data[i].tbshsl
                } else if (result.data[i].tblx === 2) {
                    pvalue = pvalue + result.data[i].yxfsl
                    p2value = p2value + result.data[i].tbshsl;
                    p4value = result.data[i].tbshsl;
                } else if (result.data[i].tblx === 3) {
                    pvalue = pvalue + result.data[i].yxfsl
                    p2value = p2value + result.data[i].tbshsl;
                    p5value = result.data[i].tbshsl;

                } else if (result.data[i].tblx == 4) {
                    pvalue = pvalue + result.data[i].yxfsl
                    p2value = p2value + result.data[i].tbshsl;
                    p6value = result.data[i].tbshsl;

                } else if (result.data[i].tblx == 5) {
                    pvalue = pvalue + result.data[i].yxfsl
                    p2value = p2value + result.data[i].tbshsl;
                    p7value = result.data[i].tbshsl;

                }
            }
            p.innerText = pvalue;
            p2.innerText = p2value;
            p3.innerText = p3value;
            p4.innerText = p4value;
            p5.innerText = p5value;
            p6.innerText = p6value;
            p7.innerText = p7value;

        } else {
            Feng.error("数据为空")
        }

        /**
         * 封装饼状图加载数据
         */
        var value = [];
        if (result.data.length != 0) {
            /**
             * 将已经有的数据封装进去
             */
            for (let j = 0; j < 5; j++) {
                value.push(0);
            }
            for (let i = 0; i <= index; i++) {
                if (result.data[i].tblx == 1) {
                    value.splice(0, 1, result.data[i].tbshmj);
                } else if (result.data[i].tblx === 2) {
                    value.splice(1, 1, result.data[i].tbshmj);
                } else if (result.data[i].tblx === 3) {
                    value.splice(2, 1, result.data[i].tbshmj);
                } else if (result.data[i].tblx === 4) {
                    value.splice(3, 1, result.data[i].tbshmj);
                } else if (result.data[i].tblx === 5) {
                    value.splice(4, 1, result.data[i].tbshmj);
                }
            }
        } else {
            Feng.error("数据为空")
        }

        var myChartpie = echarts.init(document.getElementById('main2'));
        var optionpie = {
            legend: {
                top: 'bottom'
            },
            title: {
                left: 'center',
                text: '各类图斑已修复面积占比'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: false, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    name: '图斑占比',
                    type: 'pie',
                    radius: [20, 120],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    // itemStyle: {
                    //     borderRadius: 8
                    // },
                    data: [
                        {
                            name: '历史遗留矿山',
                            itemStyle: {
                                color: '#346E75',

                            },
                            value: value[0],
                        },
                        {
                            name: '政策关闭矿山',
                            itemStyle: {
                                color: '#39AEA9',

                            },
                            value: value[1],
                        },
                        {
                            name: '生产矿山',
                            itemStyle: {
                                color: '#A2D5AB',

                            },
                            value: value[2],
                        },
                        {
                            name: '建设项目',
                            itemStyle: {
                                color: '#3DABC2',

                            },
                            value: value[3],
                        },
                        {
                            name: '自然灾损',
                            itemStyle: {
                                color: '#55B783',

                            },
                            value: value[4],

                        }
                    ]
                }
            ]
        };
        myChartpie.setOption(optionpie);
    }).start();

    /**
     * 执行下面的搜索
     */
    $('#Search').click(function () {
        /**
         * 获取下拉框的值
         */
        var xzx = $("#xzx").val();
        var xzs = $("#xzs").val();
        var xfzt = $("#xfzt").val();
        var work = $("#work").val();
        new HttpRequest(Feng.ctxPath + "/home/statisticspie?xzs=" + xzs + "&xzx=" + xzx + "&xfzt=" + xfzt + "&work=" + work, 'POST', function (result) {
                /**
                 * 封装标题数据
                 * @type {HTMLElement}
                 */
                var p = document.getElementById('yxftbs');
                var pvalue = 0;
                var p2 = document.getElementById('wxftbs');
                var p2value = 0;
                var p3 = document.getElementById('p3');
                var p3value = 0;
                var p4 = document.getElementById('p4');
                var p4value = 0;
                var p5 = document.getElementById('p5');
                var p5value = 0;
                var p6 = document.getElementById('p6');
                var p6value = 0;
                var p7 = document.getElementById('p7');
                var p7value = 0;

                var index = result.data.length - 1;
                if (result.data.length != 0) {
                    for (let i = 0; i <= index; i++) {
                        if (result.data[i].tblx === 1) {
                            pvalue = pvalue + result.data[i].yxfsl;
                            p2value = p2value + result.data[i].tbshsl;
                            p3value = result.data[i].tbshsl
                        } else if (result.data[i].tblx === 2) {
                            pvalue = pvalue + result.data[i].yxfsl
                            p2value = p2value + result.data[i].tbshsl;
                            p4value = result.data[i].tbshsl;
                        } else if (result.data[i].tblx === 3) {
                            pvalue = pvalue + result.data[i].yxfsl
                            p2value = p2value + result.data[i].tbshsl;
                            p5value = result.data[i].tbshsl;

                        } else if (result.data[i].tblx == 4) {
                            pvalue = pvalue + result.data[i].yxfsl
                            p2value = p2value + result.data[i].tbshsl;
                            p6value = result.data[i].tbshsl;

                        } else if (result.data[i].tblx == 5) {
                            pvalue = pvalue + result.data[i].yxfsl
                            p2value = p2value + result.data[i].tbshsl;
                            p7value = result.data[i].tbshsl;

                        }
                    }
                    p.innerText = pvalue;
                    p2.innerText = p2value;
                    p3.innerText = p3value;
                    p4.innerText = p4value;
                    p5.innerText = p5value;
                    p6.innerText = p6value;
                    p7.innerText = p7value;

                } else {
                    Feng.error("数据为空")
                }

                /**
                 * 封装饼状图加载数据
                 */
                var value = [];
                if (result.data.length != 0) {
                    /**
                     * 将已经有的数据封装进去
                     */
                    for (let j = 0; j < 5; j++) {
                        value.push(0);
                    }
                    for (let i = 0; i <= index; i++) {
                        if (result.data[i].tblx == 1) {
                            value.splice(0, 1, result.data[i].tbshmj);
                        } else if (result.data[i].tblx === 2) {
                            value.splice(1, 1, result.data[i].tbshmj);
                        } else if (result.data[i].tblx === 3) {
                            value.splice(2, 1, result.data[i].tbshmj);
                        } else if (result.data[i].tblx === 4) {
                            value.splice(3, 1, result.data[i].tbshmj);
                        } else if (result.data[i].tblx === 5) {
                            value.splice(4, 1, result.data[i].tbshmj);
                        }
                    }
                } else {
                    Feng.error("数据为空")
                }
                var myChartpie = echarts.init(document.getElementById('main2'));
                var optionpie = {
                    legend: {
                        top: 'bottom'
                    },
                    title: {
                        left: 'center',
                        text: '各类图斑面积占比'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: false, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: '图斑占比',
                            type: 'pie',
                            radius: [20, 120],
                            center: ['50%', '50%'],
                            roseType: 'area',
                            // itemStyle: {
                            //     borderRadius: 8
                            // },
                            data: [
                                {
                                    name: '历史遗留矿山',
                                    itemStyle: {
                                        color: '#346E75',

                                    },
                                    value: value[0],
                                },
                                {
                                    name: '政策关闭矿山',
                                    itemStyle: {
                                        color: '#39AEA9',

                                    },
                                    value: value[1],
                                },
                                {
                                    name: '生产矿山',
                                    itemStyle: {
                                        color: '#A2D5AB',

                                    },
                                    value: value[2],
                                },
                                {
                                    name: '建设项目',
                                    itemStyle: {
                                        color: '#3DABC2',

                                    },
                                    value: value[3],
                                },
                                {
                                    name: '自然灾损',
                                    itemStyle: {
                                        color: '#55B783',

                                    },
                                    value: value[4],
                                }
                            ]
                        }
                    ]
                };
                myChartpie.setOption(optionpie);
            }
        ).start();

    });

})