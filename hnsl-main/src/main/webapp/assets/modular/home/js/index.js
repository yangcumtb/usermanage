layui.use(["HttpRequest", 'carousel', 'laytpl', 'form', 'element','layarea'], function () {
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
    var Info = {
        queryData: {}
    };
    layarea.render({
        elem: '#area',
        change: function (res) {
            //选择结果
            Info.queryData.xzs = res.xZS;
            Info.queryData.xzx = res.xZX;
        }
    });

    new HttpRequest(Feng.ctxPath + "/assets/modular/map/layer/region-simple.json", 'get', function (result) {

        var data = [];
        var text = [];

        var xzs = $("xzs").val;
        var xzx = $("xzx").val;
        var action = $("action").val;
        var context = $("context").val;
        var work = $("work").val;
        loadEcharts(action, context, work);
        loadecharts(xzs, xzx);

        for (let i = 0; i < result.features.length; i++) {
            data.push({
                name: result.features[i].properties.name,
                value: Math.floor(Math.random() * (50) + 50)
            });
            text.push(result.features[i].properties.name);
        }

         $('#Search').click(function () {
            loadEcharts(action, context, work);
            loadecharts(xzs, xzx);
         });

        //根据图斑损毁类型、统计类型和图斑种类进行统计
        function loadEcharts(action, context, work) {
            var myChart = echarts.init(document.getElementById('chat'));
            var option = {
                color: ['#3398DB'],
                title: {
                    left: 'center',
                    text: '辽宁省各市图斑数量(面积)统计表',
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
                    data: ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '铁岭市', '朝阳市', '葫芦岛市'],
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
                    data: [],
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
            var myChartline = echarts.init(document.getElementById('line'));
            var optionline = {
                color: ['#3398DB'],
                title: {
                    x:'center',
                    y: 'top',
                    text: '各类图斑数量(面积)拟修复时间变化折线表',
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
                color: ['blue', 'pink', 'black', 'green', '#9ea7b4'],
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
                    data: [],
                    lineStyle: {
                        normal: {
                            color: 'blue',
                        }
                    }
                },
                    {
                        name: '建设项目图斑',
                        type: "line",
                        smooth: true,  //true 为平滑曲线，false为直线
                        stack: 'Total',
                        data: [],
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
                        data: [],
                        lineStyle: {
                            normal: {
                                color: 'black'
                            }
                        }
                    },
                    {
                        name: '政策性关闭矿山',
                        type: "line",
                        smooth: true,  //true 为平滑曲线，false为直线
                        stack: 'Total',
                        data: [],
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
                        data: [],
                        lineStyle: {
                            normal: {
                                color: '#9ea7b4'
                            }
                        }
                    },
                ]
            }
            var myChartpie = echarts.init(document.getElementById('main2'));
            var optionpie = {
                legend: {
                    top: 'bottom'
                },
                title: {
                    left: 'center',
                    text: '各类图斑数量(面积)占比'
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
                            },
                            {
                                 name: '政策关闭矿山',
                                itemStyle: {
                                    color: '#39AEA9',

                                },
                            },
                            {
                                 name: '生产矿山',
                                itemStyle: {
                                    color: '#A2D5AB',

                                },
                            },
                            {
                                name: '建设项目',
                                itemStyle: {
                                    color: '#3DABC2',

                                },
                            },
                            {
                                name: '自然灾损',
                                itemStyle: {
                                    color: '#55B783',

                                },
                            }
                        ]
                    }
                ]
            };
            myChart.setOption(option);
            myChartline.setOption(optionline);
            myChartpie.setOption(optionpie);
            if (action != "" && context == "" && work == "") {
                let qty = [];
                let lsyl = [];
                let pclose = [];
                let zrzs = [];
                let scks = [];
                let jsxm = [];
                $.ajax({
                    url: Feng.ctxPath + '',
                    async: false,
                    cache: true,
                    dataType: 'json',
                    type: 'GET',
                    data: {
                        actionID: action
                    },
                    success: function (data) {
                        // 请求成功时执行该函数内容，result即为服务器返回的json对象
                        for (let i = 0; i < data.length; i++) {
                            qty.push(data[i].result);
                            lsyl.push(data[i].result);
                            pclose.push(data[i].result);
                            zrzs.push(data[i].result);
                            scks.push(data[i].result);
                            jsxm.push(data[i].result);
                        }
                        myChart.hideLoading(); // 隐藏加载动画
                        myChart.setOption({ // 加载数据图表
                            series: [{
                                name: '图斑数量(面积)',
                                data: qty
                            }]
                        });
                        myChartline.setOption({ // 加载数据图表
                            xAxis : {
                                data : time
                            },
                            series: [{
                                name: '历史遗留图斑',
                                data: lsyl
                            },{
                                name:'建设项目图斑',
                                data:jsxm
                            },{
                                name:'生产矿山图斑',
                                data:scks
                            },{
                                name:'政策关闭图斑',
                                data:pclose
                            },{
                                name:'自然灾损图斑',
                                data:zrzs
                            }]
                        });
                        myChartpie.setOption({
                            series: [{
                                name: '图斑占比',
                                type: 'pie',
                                radius: [20, 120],
                                center: ['50%', '50%'],
                                roseType: 'area',
                                data: [{
                                    name: '历史遗留图斑',
                                    itemStyle: {
                                        color: '#346E75',
                                    },
                                    value: lsyl
                                    },
                                    {
                                        name: '建设项目图斑',
                                        itemStyle: {
                                            color: '#39AEA9',

                                        },
                                        value: jsxm
                                    },
                                    {
                                        name: '生产矿山图斑',
                                        itemStyle: {
                                            color: '#A2D5AB',

                                        },
                                        value: scks
                                    },
                                    {
                                        name: '政策关闭图斑',
                                        itemStyle: {
                                            color: '#3DABC2',

                                        },
                                        value: pclose
                                    },
                                    {
                                        name: '自然灾损图斑',
                                        itemStyle: {
                                            color: '#55B783',

                                        },
                                        value: zrzs
                                    }]
                            }]
                        })
                    },
                    error: function () {
                        console.log("数据获取失败！");
                        myChart.hideLoading();
                    }
                });
            } else if (action == "" && context != "" && work == "") {
                let qtya = [];
                let lsyla = [];
                let pclosea = [];
                let zrzsa = [];
                let scksa = [];
                let jsxma = [];
                $.ajax({
                    url: Feng.ctxPath
                        + '',
                    async: false,
                    cache: true,
                    dataType: 'json',
                    type: 'GET',
                    data: {
                        actionID: action
                    },
                    success: function (data) {
                        // 请求成功时执行该函数内容，result即为服务器返回的json对象
                        for (let i = 0; i < data.length; i++) {
                            qtya.push(data[i].result);
                            lsyla.push(data[i].result);
                            pclosea.push(data[i].result);
                            zrzsa.push(data[i].result);
                            scksa.push(data[i].result);
                            jsxma.push(data[i].result);
                        }
                        myChart.hideLoading(); // 隐藏加载动画
                        myChart.setOption({ // 加载数据图表
                            series: [{
                                name: '图斑数量(面积)',
                                data: qtya
                            }]
                        });
                        myChartline.setOption({ // 加载数据图表
                            xAxis : {
                                data : time
                            },
                            series: [{
                                name: '历史遗留图斑',
                                data: lsyla
                            },{
                                name:'建设项目图斑',
                                data:jsxma
                            },{
                                name:'生产矿山图斑',
                                data:scksa
                            },{
                                name:'政策关闭图斑',
                                data:pclosea
                            },{
                                name:'自然灾损图斑',
                                data:zrzsa
                            }]
                        });
                        myChartpie.setOption({
                            series: [{
                                name: '图斑占比',
                                type: 'pie',
                                radius: [20, 120],
                                center: ['50%', '50%'],
                                roseType: 'area',
                                data: [{
                                    name: '历史遗留图斑',
                                    itemStyle: {
                                        color: '#346E75',
                                    },
                                    value: lsyl
                                },
                                    {
                                        name: '建设项目图斑',
                                        itemStyle: {
                                            color: '#39AEA9',

                                        },
                                        value: jsxm
                                    },
                                    {
                                        name: '生产矿山图斑',
                                        itemStyle: {
                                            color: '#A2D5AB',

                                        },
                                        value: scks
                                    },
                                    {
                                        name: '政策关闭图斑',
                                        itemStyle: {
                                            color: '#3DABC2',

                                        },
                                        value: pclose
                                    },
                                    {
                                        name: '自然灾损图斑',
                                        itemStyle: {
                                            color: '#55B783',

                                        },
                                        value: zrzs
                                    }]
                            }]
                        })
                    },
                    error: function () {
                        console.log("数据获取失败！");
                        myChart.hideLoading();
                    }
                });
            }

            $(document).ready(function () {
                layui.use(['form', 'upload', 'layer'], function () {
                    var form = layui.form;
                    $.ajax({
                        url: Feng.ctxPath
                            + '',
                        async: false,
                        cache: true,
                        dataType: 'json',
                        type: 'POST',
                        success: function (data) {
                            for (var i = 0; i < data.length; i++) {
                                $("#action").append(
                                    "<option value='" + data[i] + "'>"
                                    + data[i] + "</option>");
                            }
                            form.render('select');
                        },
                        error: function () {
                            console.log("获取失败！！！");
                        }
                    });
                });
                // 存一级下拉框的值
                var selectaction = null;

                //定义用于判断
                var world = null;

                // 获取一级下拉框的值
                layui.form.on('select(action-1)', function (data) { // 对应lay-filter
                    selectaction = data.value; // 获取value值
                    //如果设备ID不为空时，显示折线图
                    if (selectaction != world) {
                        //加载折线图
                        myChart(selectaction, "", "");
                        myChartline(selectaction, "", "");
                        myChartpie(selectaction, "", "");
                    } else {

                    }
                });

            })

            $(document).ready(function () {
                layui.use(['form', 'upload', 'layer'], function () {
                    var form = layui.form;
                    $.ajax({
                        url: Feng.ctxPath
                            + '',
                        async: false,
                        cache: true,
                        dataType: 'json',
                        type: 'POST',
                        success: function (data) {
                            for (var i = 0; i < data.length; i++) {
                                $("#context").append(
                                    "<option value='" + data[i] + "'>"
                                    + data[i] + "</option>");
                            }
                            form.render('select');
                        },
                        error: function () {
                            console.log("获取失败！！！");
                        }
                    });
                });
                // 存一级下拉框的值
                var selectcontext = null;

                //定义用于判断
                var world = null;

                // 获取一级下拉框的值
                layui.form.on('select(context-1)', function (data) { // 对应lay-filter
                    selectcontext = data.value; // 获取value值
                    //如果设备ID不为空时，显示柱状图
                    if (selectcontext != world) {
                        //加载柱状图
                        myChart(selectcontext, "", "");
                        myChartline(selectcontext, "", "");
                        myChartpie(selectcontext, "", "");
                    } else {

                    }
                });

            })


        }

        function loadecharts(xzs,xzx,action,context,work){

        }
        var myChart = echarts.init(document.getElementById('regionMap'));
        echarts.registerMap('map', result);
        var option = {
            title: {
                left: 'center',
                text: '辽宁省各市已修复未修复图斑数量(面积)比值图',
                textStyle: {
                    fontStyle: 'normal',
                }
            },
            tooltip: {
                show: true,
                formatter: function (params) {
                    return params.name + '：' + params.data['value'] + '%'
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
})