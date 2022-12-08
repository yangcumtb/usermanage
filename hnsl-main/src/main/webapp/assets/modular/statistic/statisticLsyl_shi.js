layui.use(["HttpRequest", 'carousel', 'laytpl', 'form', 'element', 'layarea'], function () {
    var $ = layui.$;
    var HttpRequest = layui.HttpRequest;
    var laytpl = layui.laytpl;
    var carousel = layui.carousel;
    var form = layui.form;
    var element = layui.element;
    var layarea = layui.layarea;

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
     * 初始地图表
     */
    new HttpRequest(Feng.ctxPath + "/assets/modular/map/layer/region-simple.json", 'get', function (result) {

        var ajax = new HttpRequest(Feng.ctxPath + "/statistic/statisticlsyl/checkShiDetail?xzs="+"", "POST");
        var result1 = ajax.start();
        var city = result1.data[0].xzs;
        xiantablechange(result1.data);
        var index;
        for(var z = 0; z<result.features.length; z++){
            if(result.features[z].properties.name == city){
                index = z;
            }
        }
        /**
         * 根据账号等级填充下拉框菜单框
         */
        let Feature = {
            type: "FeatureCollection"
        }
        Feature.features = []
        Feature.features.push(result.features[index])
        let data = []
        for (let i = 0; i < result.features.length; i++) {
            let Obj = {};
            let cityname = result.features[i].properties.name
            Obj.name = cityname
            for (let x = 0; x < result1.data.length; x++) {
                if (result1.data[x].xzs == cityname) {
                    Obj.zls = result1.data[x].hfzlqkB
                    Obj.wzls = result1.data[x].hfzlqkA
                    Obj.sdzlmj = result1.data[x].sdzlmj
                    Obj.tbhdmj = result1.data[x].tbhdmj
                    Obj.value = Math.ceil(result1.data[x].hfzlqkB / result1.data[x].hfzlqkA * 100)
                }
            }
            data.push(Obj)
        }
        //console.log(data)
        var myChart = echarts.init(document.getElementById('regionMap'));
        echarts.registerMap('map', Feature);
        var option = {
            title: {
                text: city + '示意图',
            },
            tooltip: {
                show: true,
                formatter: function (params) {
                    if (params.name.length > 0) {
                        if(params.data['tbhdmj'] == null){
                            params.data['tbhdmj'] = 0;
                        }
                        if(params.data['zls'] == null){
                            params.data['zls'] = 0;
                        }
                        if(params.data['wzls'] == null){
                            params.data['wzls'] = 0;
                        }
                        if(params.data['value'] == null){
                            params.data['value'] = 0;
                        }
                        if(params.data['sdzlmj'] == null){
                            params.data['sdzlmj'] = 0;
                        }
                        return [
                            '治理数：' + params.data['zls'],
                            '未治理数：' + params.data['wzls'],
                            '治理数比例' + params.data['value'] + '%',
                            '实地治理面积(㎡)：' + params.data['sdzlmj'],
                            '图斑核定面积(㎡)：' + params.data['tbhdmj'],
                        ].join('<br>');
                    }
                },
            },
            dataRange: {//左下角的颜色块。start：值域开始值；end：值域结束值；label：图例名称；color：自定义颜色值
                x: 'left',
                y: 'bottom',
                itemWidth: 10,
                itemHeight: 10,
                splitList: [
                    {start: 51, label: '> 50%', color: '#a50026'},
                    {start: 31, end: 50, label: '31 - 50%', color: '#d73027'},
                    {start: 11, end: 30, label: '11% - 30%', color: '#f46d43'},
                    {start: 1, end: 10, label: '1% - 10%', color: '#fdae61'},
                    {start:0, end: 0,label: ' 0%', color: '#fee090'}
                ]
            },
            geo: [{
                map: 'map',
                roam: false, //是否允许缩放
                zoom: 1.1,
                top: "12%",
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

        window.addEventListener("resize", function (event) {
            myChart.resize();
        })

    }).start();


    new HttpRequest(Feng.ctxPath + "/statistic/statisticlsyl/total", 'POST', function (result) {

        var result = result.data;
        //console.log(result)
        var city = result.multiple[0].xzs;
        //console.log(city)

        /**
         * 历史遗留各个市主要生态问题
         */
        var data0 = result.stwt.tdhs;
        var data1 = result.stwt.dzhj;
        var data2 = result.stwt.zbph;
        var zystwt = echarts.init(document.getElementById('zystwt'));
        var total = {
            name: city + '主要生态问题'
        };
        var option = {
            title: [{
                text: total.name,
                left: '0%',
                top: '0%',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 14
                }
            }],
            tooltip : {
                trigger: 'item',
                position: ['50%','50%'],
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
                show:true,
                right: '5%',
                feature: {
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            color:['#70a3ff','#ff7f4e','#4acf79'],
            legend: {
                data: ['土地损毁','地质环境问题','植被破坏'],
                orient: 'vertical',
                //orient: 'horizontal',
                //x:"left",
                //y:"bottom",
                left: '2%',
                bottom: 5,
                //itemWidth:14,
                //itemHeight:10,
                textStyle:{
                    lineHeight:20,
                    fontSize: 13
                },
                padding:0,
                /*formatter:function(params) {
                    var tip = wrap(params,9)
                    var oa = option.series[0].data;
                    var num = oa[0].value + oa[1].value + oa[2].value;
                    for(var i = 0; i < option.series[0].data.length; i++){
                        if(params==oa[i].name){
                            return tip + '\n' +oa[i].value +'个'+ ' ' + (oa[i].value / num * 100).toFixed(2) + '%';
                        }
                    }
                },*/
            },
            series : [
                {
                    name: city,
                    type: 'pie',
                    selectedMode: 'single',
                    radius: ['40%', '55%'],
                    center: ['50%', '45%'],
                    data: [
                        {value: data0, name: '土地损毁'},
                        {value: data1, name: '地质环境问题'},
                        {value: data2, name: '植被破坏'}
                    ],
                    label: {
                        normal: {
                            show: false,
                            position: "outer",
                            align:'left',
                            textStyle: {
                                rotate:true
                            }
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal: {
                            label:{
                                show: true,
                                formatter: '{b} {c}'
                            }
                        }

                    }
                }
            ]
        };
        zystwt.setOption(option);

        /**
         * 历史遗留拟修复时间段数量
         */
        var nxfsjd = echarts.init(document.getElementById('nxfsjd'));
        var total = {
            name: city + '拟修复时间段统计'
        };
        var option = {
            title: [{
                text: total.name,
                left: '0%',
                top: '5%',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 14
                }
            }],
            tooltip : {
                trigger: 'item',
                position: ['50%','50%'],
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
                right: '5%',
                top: '4%',
                show:true,
                feature: {
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            color:['#4f9de7','#4acf79'],
            legend: {
                data: ['“十四五期间”','“十四五之后”'],
                //orient: 'vertical',
                //x:"right",
                y:"bottom",
                //bottom: 5,
                //itemWidth:12,
                //itemHeight:8,
                textStyle:{
                    lineHeight:15,
                },
                padding:0,
                /*formatter:function(name){
                    var oa = option.series[0].data;
                    var num = oa[0].value + oa[1].value ;
                    for(var i = 0; i < option.series[0].data.length; i++){
                        if(name==oa[i].name){
                            return name + "\n"+oa[i].value+'个'+"  "+ (oa[i].value / num * 100).toFixed(2) + '%';
                        }
                    }
                },*/
            },
            series : [
                {
                    name: city,
                    type: 'pie',
                    selectedMode: 'single',
                    radius: ['40%', '55%'],
                    center: ['50%', '55%'],
                    data: [
                        {value: result.nxfsjd.qj, name: '“十四五期间”'},
                        {value: result.nxfsjd.zh, name: '“十四五之后”'}
                    ],
                    label: {
                        normal: {
                            show: false,
                            position: "outer",
                            align:'left',
                            textStyle: {
                                rotate:true
                            }
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal: {
                            label:{
                                show: true,
                                formatter: '{b} {c}'
                            }
                        }
                    }
                }
            ]
        };
        nxfsjd.setOption(option);

        /*var get=function(e){
            var newStr=" ";
            var start,end;
            var name_len=e.name.length;    　　　　　　　　　　　　   //每个内容名称的长度
            var max_name=4;    　　　　　　　　　　　　　　　　　　//每行最多显示的字数
            var new_row = Math.ceil(name_len / max_name); 　　　　// 最多能显示几行，向上取整比如2.1就是3行
            if(name_len>max_name){ 　　　　　　　　　　　　　　  //如果长度大于每行最多显示的字数
                for(var i=0;i<new_row;i++){ 　　　　　　　　　　　   //循环次数就是行数
                    var old='';    　　　　　　　　　　　　　　　　    //每次截取的字符
                    start=i*max_name;    　　　　　　　　　　     //截取的起点
                    end=start+max_name;    　　　　　　　　　  //截取的终点
                    if(i==new_row-1){    　　　　　　　　　　　　   //最后一行就不换行了
                        old=e.name.substring(start);
                    }else{
                        old=e.name.substring(start,end)+"\n";
                    }
                    newStr+=old; //拼接字符串
                }
            }else{                                          //如果小于每行最多显示的字数就返回原来的字符串
                newStr=e.name;
            }
            return newStr;
        }*/

        /**
         * 历史遗留图斑大类统计
         */
        var tbdltj = echarts.init(document.getElementById('tbdltj'));
        var total = {
            name: city + '图斑大类统计'
        };
        var option = {
            title: [{
                text: total.name,
                right: '5%',
                top: '5%',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 18
                }
            }],
            tooltip : {
                trigger: 'item',
                position: ['50%','50%'],
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
                left: '2%',
                show:true,
                feature: {
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['历史遗留矿山','有责任主体的废弃矿山','其他情形'],
                //orient: 'horizontal',
                orient: 'vertical',
                //x:"left",
                left: "2%",
                //x:'middle',
                //y:"bottom",
                //y:'middle',
                bottom: 5,
                //itemWidth:12,
                //itemHeight:8,
                textStyle:{
                    lineHeight:20,
                    fontSize: 13
                },
                padding:0,
                /*formatter:function(params) {
                    var tip = wrap(params,6)
                    var oa = option.series[0].data;
                    var num = oa[0].value + oa[1].value + oa[2].value;
                    for(var i = 0; i < option.series[0].data.length; i++){
                        if(params==oa[i].name){
                            return tip + '\n' +oa[i].value + ' ' + (oa[i].value / num * 100).toFixed(2) + '%';
                            //return params + ' ' +oa[i].value +'个'+ ' ' + (oa[i].value / num * 100).toFixed(2) + '%';
                        }
                    }
                },*/
            },
            series : [
                {
                    name: city,
                    type: 'pie',
                    radius : '65%',
                    color:['#27c2c1','#9ccb63','#fcd85a'],
                    center: ['55%', '50%'],
                    data:[
                        {value:result.tbdl.lsyl, name:'历史遗留矿山'},
                        {value:result.tbdl.fqks, name:'有责任主体的废弃矿山'},
                        {value:result.tbdl.qt, name:'其他情形'},
                    ],
                    label:{
                        normal:{
                            position:'outer',
                            alignTo:'labelLine',
                            formatter: '{b}',
                            fontSize: 14,
                            lineHeight: 18,
                            //padding:[0,-200,0,0], //调整左右位置
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 5,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            ]
        };
        tbdltj.setOption(option);

        /**
         * 历史遗留图斑小类统计
         */
        var tbxltj = echarts.init(document.getElementById('tbxltj'));
        var total = {
            name: city + '图斑小类统计'
        };
        var option = {
            title: [{
                text: total.name,
                right: '5%',
                top: '5%',
                //left: '5%',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 18
                }
            }],
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
                left: '2%',
                show:true,
                feature: {
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['无法确认治理恢复责任主体的无主废弃矿山','由政府承担治理恢复责任的政策性关闭矿山','由企业履行治理恢复责任的政策性关闭矿山','由企业或个人履行治理恢复责任的有主废弃矿山','生产矿山','采矿权过期未注销矿山','自然灾损','工程建设损毁'],
                //orient: 'horizontal',
                orient: 'vertical',
                //x:"right",
                left: 5,
                //x:'middle',
                //y:"bottom",
                //y:'middle',
                bottom: 10,
                //itemWidth:12,
                //itemHeight:8,
                textStyle:{
                    fontSize: 12,
                    lineHeight:10,
                },
                padding:0,
                /*formatter:function(params) {
                    let tip1 = "";
                    let tip = "";
                    var oa = option.series[0].data;
                    var num = oa[0].value + oa[1].value + oa[2].value + oa[3].value + oa[4].value + oa[5].value + oa[6].value + oa[7].value;

                    var param = "";
                    for(var i = 0; i < option.series[0].data.length; i++) {
                        if(params==oa[i].name){
                            param = params + oa[i].value +'个'+ ' ' + ((oa[i].value / num * 100) > 0 ? (oa[i].value / num * 100).toFixed(2) : 0) + '%';
                        }}
                    let le = param.length  //图例文本的长度
                    if(le > 17){   //几个字换行大于几就可以了
                        let l = Math.ceil(le/17)  //有些不能整除，会有余数，向上取整
                        for(let i = 1;i <= l;i++){ //循环
                            if(i < l){ //最后一段字符不能有\n
                                tip1 += param.slice(i*17-17,i*17)+'\n'; //字符串拼接
                            }else if(i === l){  //最后一段字符不一定够9个
                                tip = tip1 + param.slice((l-1)*17,le) //最后的拼接在最后
                                return tip
                            }
                        }
                    }else{
                        tip = param //前面定义了tip为空，这里要重新赋值，不然会替换为空
                        return tip
                    }
                }*/
            },
            series : [
                {
                    name: city,
                    type: 'pie',
                    radius : '60%',
                    center: ['80%', '60%'],
                    data:[
                        {value:result.tbxl.tbxl11, name:'无法确认治理恢复责任主体的无主废弃矿山'},
                        {value:result.tbxl.tbxl12, name:'由政府承担治理恢复责任的政策性关闭矿山'},
                        {value:result.tbxl.tbxl21, name:'由企业履行治理恢复责任的政策性关闭矿山'},
                        {value:result.tbxl.tbxl22, name:'由企业或个人履行治理恢复责任的有主废弃矿山'},
                        {value:result.tbxl.tbxl31, name:'生产矿山'},
                        {value:result.tbxl.tbxl32, name:'采矿权过期未注销矿山'},
                        {value:result.tbxl.tbxl33, name:'自然灾损'},
                        {value:result.tbxl.tbxl34, name:'工程建设损毁'},

                    ],
                    itemStyle: {
                        emphasis: {
                            show: false,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    itemStyle: {
                        normal: {
                            label:{
                                show: false,
                                fontSize: 10,
                                position:"inner",
                                //formatter: get,
                            }
                        },
                        labelLine :{show:false}
                    }
                }
            ]
        };
        tbxltj.setOption(option);

        /**
         * 历史遗留各市拟修复方式
         */
        var xcor = [];
        var dataxffs0 = [];
        var dataxffs1 = [];
        var dataxffs2 = [];
        var dataxffs3 = [];
        var dataxffs4 = [];
        for (let i = 0; i < result.multiple.length; i++) {
            xcor.push(result.multiple[i].xzx);
        }
        xcor = Array.from(new Set(xcor))
        //console.log(xcor)
        for (let i = 0; i < xcor.length; i++) {
            let zero = 0;
            let one = 0;
            let two = 0;
            let three = 0;
            let four = 0;
            let city = xcor[i]
            for (let x = 0; x < result.multiple.length; x++) {
                if (result.multiple[x].xzx == city) {
                    zero = zero + Number(result.multiple[x].nxffsZRHF);
                    one = one + Number(result.multiple[x].nxffsFZZS);
                    two = two + Number(result.multiple[x].nxffsSTCJ);
                    three = three + Number(result.multiple[x].nxffsZXLY);
                    four = four + Number(result.multiple[x].nxffsQt);
                }
            }
            dataxffs0.push(zero)
            dataxffs1.push(one)
            dataxffs2.push(two)
            dataxffs3.push(three)
            dataxffs4.push(four)
        }
        var nxffs = echarts.init(document.getElementById('nxffs'));
        var total = {
            name: city + '拟修复方式统计'
        };
        var option = {
            title: [{
                text: total.name,
                left: 'center',
                top: '5%',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 14
                }
            }],

            tooltip: {
                trigger: 'axis',
                formatter: '{b}</br>{a}: {c}</br>{a1}: {c1}</br>{a2}: {c2}</br>{a3}: {c3}</br>{a4}: {c4}'
            },
            toolbox: {
                show:true,
                feature: {
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data:['自然恢复','辅助再生','生态重建','转型利用','其他'],
                top: 'bottom',
                textStyle:{
                    //color:'#fff'
                }
            },
            grid:{
                top:'18%',
                right:'5%',
                bottom:'8%',
                left:'5%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xcor,
                    axisLabel:{
                        textStyle:{
                            fontSize: 9
                            //color:"#fff"
                        },
                        lineStyle:{
                            color: '#519cff'
                        },
                        alignWithLabel: true,
                        interval:0,
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    nameTextStyle:{
                        color:'#fff'
                    },
                    position: 'left',
                    alignTicks: true,
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color: '#115372'
                        }
                    },
                    axisLine: {
                        show:true,
                        lineStyle: {
                            color: '#115372'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel:{
                        textStyle:{
                            //color:"#fff"
                        },
                        alignWithLabel: true,
                        interval:0,
                    }
                },
            ],
            series: [
                {
                    name:'自然恢复',
                    type:'bar',
                    data:dataxffs0,
                    itemStyle: {
                        normal: {
                            color: '#76da91'
                        },label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}'
                        }
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: 'Max'},
                            {type: 'min', name: 'Min'}
                        ]
                    },
                },
                {
                    name:'辅助再生',
                    type:'bar',
                    data:dataxffs1,
                    itemStyle: {
                        normal: {
                            color: '#f8cb7f'},
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}'
                        }
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: 'Max'},
                            {type: 'min', name: 'Min'}
                        ]
                    },
                },
                {
                    name:'生态重建',
                    type:'bar',
                    data:dataxffs2,
                    itemStyle: {
                        normal: {
                            color: '#f89588'},
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}'
                        }
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: 'Max'},
                            {type: 'min', name: 'Min'}
                        ]
                    },
                },
                {
                    name:'转型利用',
                    type:'bar',
                    data:dataxffs3,
                    itemStyle: {
                        normal: {
                            color: '#7cd6cf'},
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}'
                        }
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: 'Max'},
                            {type: 'min', name: 'Min'}
                        ]
                    },
                },
                {
                    name:'其他',
                    type:'bar',
                    data:dataxffs4,
                    itemStyle: {
                        normal: {
                            color: '#c39705'},
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}'
                        }
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: 'Max'},
                            {type: 'min', name: 'Min'}
                        ]
                    },
                }
            ]
        };
        nxffs.setOption(option);

        /**
         * 历史遗留各市恢复治理情况
         */
        var datahfzlqk0 = [];//未治理
        var datahfzlqk1 = [];//已治理
        for (let i = 0; i < xcor.length; i++) {
            let zero = 0;
            let one = 0;
            let city = xcor[i]
            for (let x = 0; x < result.multiple.length; x++) {
                if (result.multiple[x].xzs == city) {
                    zero = zero + Number(result.multiple[x].hfzlqkA);
                    one = one + Number(result.multiple[x].hfzlqkB);
                }
            }
            datahfzlqk0.push(zero)
            datahfzlqk1.push(one)
        }
        var hfzlqk = echarts.init(document.getElementById('hfzlqk'));
        var total = {
            name: city + '恢复治理情况统计'
        };
        var option = {
            title: [{
                text: total.name,
                //left: '1%',
                top: '2%',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 14
                }
            }],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            toolbox: {
                show:true,
                right: '3%',
                feature: {
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            color:['#f89588','#4f9de7'],
            legend: {
                data: ['未治理', '已恢复治理'],
                top: 'bottom',
                textStyle:{
                    //color:'#fff'
                }
            },
            grid: {
                left: '12%',
                //right: '4%',
                bottom: '3%',
                top:'10%',
                width: '90%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value',
                    boundaryGap:[0, 0.10],
                    splitLine:{
                        //show:true,
                        show:false,
                        lineStyle:{
                            color: '#1e2b43'
                        }
                    },
                    axisLine: {
                        show:false,
                        lineStyle: {
                            color: '#115372'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel:{
                        textStyle:{
                            color:"#fff"
                        },
                        alignWithLabel: true,
                        interval:0
                    }

                },
            ],
            dataZoom: [{
                type: 'slider',
                yAxisIndex: 0,
                filterMode: 'empty',
                start: 0,
                x:'0',
                end: 60,
                handleStyle:{
                    color:"#519cff",
                    backgroundColor:'#519cff'
                },
                textStyle:{
                    fontSize: 8,
                    //color:"#fff"
                },
                borderColor:"#519cff"
            }],
            yAxis: {
                type: 'category',
                data: xcor,

                splitLine:{
                    show:false,
                    lineStyle:{
                        color: '#1e2b43'
                    }
                },

                axisTick: {
                    show: false
                },
                axisLine: {
                    show:true,
                    lineStyle: {
                        color: '#115372'
                    }
                },
                axisLabel:{
                    //margin: 15,
                    textStyle:{
                        color:"#419aff"
                    },
                    lineStyle:{
                        color: '#519cff'
                    },
                    alignWithLabel: true,
                    interval:0,
                    //rotate: 15
                    formatter: function (params) {
                        var newParamsName = ""; // 最终拼接成的字符串
                        var paramsNameNumber = params.length; // 实际标签的个数
                        var provideNumber = 3; // 每行能显示的字的个数
                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                        // 条件等同于rowNumber>1
                        if (paramsNameNumber > provideNumber) {
                            for (var p = 0; p < rowNumber; p++) {
                                var tempStr = ""; // 表示每一次截取的字符串
                                var start = p * provideNumber; // 开始截取的位置
                                var end = start + provideNumber; // 结束截取的位置
                                // 此处特殊处理最后一行的索引值
                                if (p == rowNumber - 1) {
                                    // 最后一次不换行
                                    tempStr = params.substring(start, paramsNameNumber);
                                } else {
                                    // 每一次拼接字符串并换行
                                    tempStr = params.substring(start, end) + "\n";
                                }
                                newParamsName += tempStr; // 最终拼成的字符串
                            }
                        } else {
                            // 将旧标签的值赋给新标签
                            newParamsName = params;
                        }
                        //将最终的字符串返回
                        return newParamsName;
                        },
                }
            },
            series: [
                {
                    name: '未治理',
                    type: 'bar',
                    stack: '比例',
                    barWidth: 20, // 柱子宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            textStyle:{
                                color:'#333'
                            }
                        }
                    },
                    data: datahfzlqk0
                },
                {
                    name: '已恢复治理',
                    type: 'bar',
                    stack: '比例',
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            textStyle:{
                                color:'#333'
                            }
                        }
                    },
                    data: datahfzlqk1
                }
            ]
        };
        hfzlqk.setOption(option);
        window.addEventListener("resize", function (event) {
            zystwt.resize();
            nxfsjd.resize();
            tbdltj.resize();
            tbxltj.resize();
            nxffs.resize();
            hfzlqk.resize();
        })

    }).start();

    function wrap(e,number){
        let tip1 = "";
        let tip = "";
        let le = e.length  //图例文本的长度
        if(le > number){   //几个字换行大于几就可以了
            let l = Math.ceil(le/number)  //有些不能整除，会有余数，向上取整
            for(let i = 1;i <= l;i++){ //循环
                if(i < l){ //最后一段字符不能有\n
                    tip1 += e.slice(i*number-number,i*number)+'\n'; //字符串拼接
                }else if(i === l){  //最后一段字符不一定够9个
                    tip = tip1 + e.slice((l-1)*number,le) //最后的拼接在最后
                    return tip
                }
            }
        }else{
            tip = e //前面定义了tip为空，这里要重新赋值，不然会替换为空
            return tip
        }

    }

    function xiantablechange(data){
        $('table tbody').html('');
        var xcor = [];
        var data0 = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        for (let i = 0; i < data.length; i++) {
            xcor.push(data[i].xzx);
        }
        xcor = Array.from(new Set(xcor))
        //console.log(xcor)
        for (let i = 0; i < xcor.length; i++) {
            let zero = 0;
            let one = 0;
            let two = 0;
            let three = 0;
            let city = xcor[i]
            for (let x = 0; x < data.length; x++) {
                if (data[x].xzx == city) {
                    zero = zero + Number(data[x].hfzlqkB);
                    one = one + Number(data[x].hfzlqkA);
                    two = two + Number(data[x].sdzlmj);
                    three = three + Number(data[x].tbhdmj);
                }
            }
            data0.push(zero)
            data1.push(one)
            data2.push(two)
            data3.push(three)
        }
        var table = document.querySelector('.table');
        var tbody = table.querySelector('tbody');
        for(var i = 0; i < data.length; i++){
            var tr = document.createElement('tr');
            tbody.appendChild(tr);
            for(var j = 0; j <= 4; j++){
                var td = document.createElement('td');
                tr.appendChild(td);
            }
            tr.childNodes[0].innerText = xcor[i];
            tr.childNodes[1].innerText = data0[i];
            tr.childNodes[2].innerText = data1[i];
            tr.childNodes[3].innerText = data2[i];
            tr.childNodes[4].innerText = data3[i];
        }
    }

})