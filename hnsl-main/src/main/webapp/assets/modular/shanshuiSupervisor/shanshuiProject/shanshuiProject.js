layui.use(['table', 'admin', 'HttpRequest', 'form', 'func', 'element'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;
    var element = layui.element;

    /**
     * 管理
     */
    var ShanshuiProject = {
        tableId: "shanshuiProjectTable",
        queryData: {}
    };

    /**
     * 初始化表格的列
     */
    ShanshuiProject.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left',},
            // {field: 'id', hide: true, title: 'id'},
            {field: 'num', fixed: 'left', sort: true, width: 160, title: '项目序号'},
            {field: 'zXmmc', sort: true, width: 300, title: '子项目名称'},
            {field: 'xmmc', sort: true, title: '项目名称', width: 500},
            // {field: 'jlrid', sort: true, title: '监理账号'},
            {field: 'xmzjlx', sort: true, width: 200, title: '项目资金类型'},
            {
                field: 'xmmjzqk', sort: true, width: 200, title: '项目进展情况', templet: function (val) {
                    return '<div class="layui-progress layui-progress-big " lay-showpercent="true"> <div class="layui-progress-bar layui-bg-green" lay-percent="' + val.xmmjzqk + '"></div> </div>'
                }
            },
            {field: 'jlrname', sort: true, width: 160, title: '监理人'},
            {field: 'zxscsj', sort: true, width: 200, title: '最新上传时间'},
            {
                field: 'tjzt', sort: true, width: 160, title: '提交状态', templet: function (d) {
                    //console.log(d);
                    var today = new Date();
                    var year = today.getFullYear();
                    var month = (today.getMonth() + 1).toString().padStart(2,'0');
                    var date = today.getDate().toString().padStart(2,'0');
                    var todaytime = year + '-' + month + '-' + date;
                    //console.log(d.zxscsj);
                    var zxscsj = d.zxscsj;
                    if (zxscsj != null) {
                        var timeindex = zxscsj.indexOf(" ");
                        var dtime = zxscsj.substring(0, timeindex);
                        if (todaytime == dtime) {
                            return '<span style="color: green;">已提交</span>'

                        } else {
                            return '<span style="color: red;">未提交</span>'
                        }
                    } else {
                        return '<span style="color: red;">未提交</span>'
                    }

                }
            },
            {align: 'center', toolbar: '#tableBar', fixed: 'right', width: 300, title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    // ShanshuiProject.search = function () {
    //
    //     // table.reload(ShanshuiProject.tableId, {
    //     //     where: ShanshuiProject.queryData,
    //     //     page: {curr: 1},
    //     // });
    // };
    $("#btnSearch").click(function (event) {
        event.preventDefault();
        ShanshuiProject.queryData.xmmc = $("#xmmc").val();
        console.log($("#xmmc").val())
        table.reload(ShanshuiProject.tableId, {
            where: ShanshuiProject.queryData,
            page: {curr: 1},
        });
    });

    /**
     * 导出excel按钮
     */
    ShanshuiProject.exportExcel = function () {
        var checkRows = table.checkStatus(ShanshuiProject.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + ShanshuiProject.tableId,
        url: Feng.ctxPath + '/shanshuiProject/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: ShanshuiProject.initColumn(),
        done: function (res, currentCount) {
            //***重点***：table渲染完成后渲染element进度条
            element.render()
        }
    });

    //图片下载
    /*ShanshuiProject.Download = function (data) {
        window.open(Feng.ctxPath + "/shanshuiProject/compressDownload?jlrids=" + data.jlrid);
    };*/

    //进度详情
    ShanshuiProject.jumpDetail = function (data) {
        console.log(data);
        if (data.xmmjzqk == null) {
            layer.msg('暂无进度');
        } else {
            layer.open({
                type: 1,
                title: '进展详情',
                // skin: 'layui-layer-rim', //加上边框
                area: ['60%', '80%'], //宽高 t.width() t.height()
                shadeClose: true, //开启遮罩关闭
                end: function (index, layero) {
                    return false;
                },
                content: '<button id="btnExp" class="layui-btn icon-btn" style="background-color: #33549988"><i\n' +
                    '             class="layui-icon">&#xe67d;</i>全部导出\n' +
                    '     <button id="btnExpImg" class="layui-btn icon-btn" style="background-color: #33549988"><i\n' +
                    '             class="layui-icon">&#xe67d;</i>图片导出\n' +
                    '     <button id="btnExpPdf" class="layui-btn icon-btn" style="background-color: #33549988"><i\n' +
                    '             class="layui-icon">&#xe67d;</i>Pdf文件导出\n' +
                    '     </button><table class="layui-table" id="shanshuiProgressTable" lay-filter="shanshuiProgressTable"></table>',
                success: function () {
                    table.render({
                        elem: '#shanshuiProgressTable',
                        url: Feng.ctxPath + '/shanshuiProject/listprogress?jlrid=' + data.jlrid,
                        page: true,
                        height: "full-100",
                        cellMinWidth: 100,
                        cols: [[
                            {type: 'checkbox'},
                            {field: 'id', hide: true, title: 'id'},
                            {field: 'createtime', sort: true, title: '上传时间'},
                            {field: 'percent', title: '百分比'},
                            {
                                field: 'associateid', title: '图片', templet:
                                    function (d) {
                                        return '<div class="checkPhoto" ><img src="' + Feng.ctxPath + "/shanshuiFile/previewImage/" + d.id + '"></div>'
                                    }
                            },
                            {
                                field: 'associateid', title: 'pdf文件', templet:
                                    function (d) {
                                        return '<div class="checkPdf" ><button class="layui-btn layui-btn-xs demo-preview" >预览</button></div>'
                                    }
                            },
                        ]],
                    });
                    var shanshuiProgressTable = {
                        tableId: "shanshuiProgressTable",
                        queryData: {}
                    };
                    // 全部导出
                    $('#btnExp').click(function () {
                        var checkRows = table.checkStatus(shanshuiProgressTable.tableId);
                        if (checkRows.data.length === 0) {
                            Feng.error("请选择要导出的数据");
                        } else {
                            var L = checkRows.data.length;
                            var ID = checkRows.data[0].id;
                            for (i = 1; i < L; i++) {
                                var Date = checkRows.data[i];
                                ID = ID + "," + Date.id;
                            }
                            console.log(checkRows);
                            console.log(ID);
                            //console.log(Date);
                            window.open(Feng.ctxPath + "/shanshuiProject/downloadPdfImg/" + ID);
                        }
                    });
                    // 图片导出
                    $('#btnExpImg').click(function () {
                        var checkRows = table.checkStatus(shanshuiProgressTable.tableId);
                        if (checkRows.data.length === 0) {
                            Feng.error("请选择要导出的数据");
                        } else {
                            var L = checkRows.data.length;
                            var ID = checkRows.data[0].id;
                            for (i = 1; i < L; i++) {
                                var Date = checkRows.data[i];
                                ID = ID + "," + Date.id;
                            }
                            console.log(checkRows);
                            console.log(ID);
                            //console.log(Date);
                            window.open(Feng.ctxPath + "/shanshuiProject/downloadJD/" + ID);
                        }
                    });
                    // Pdf文件导出
                    $('#btnExpPdf').click(function () {
                        var checkRows = table.checkStatus(shanshuiProgressTable.tableId);
                        if (checkRows.data.length === 0) {
                            Feng.error("请选择要导出的数据");
                        } else {
                            var L = checkRows.data.length;
                            var ID = checkRows.data[0].id;
                            for (i = 1; i < L; i++) {
                                var Date = checkRows.data[i];
                                ID = ID + "," + Date.id;
                            }
                            console.log(checkRows);
                            console.log(ID);
                            //console.log(Date);
                            window.open(Feng.ctxPath + "/shanshuiProject/downloadJL/" + ID);
                        }
                    });
                    setTimeout(function () {
                        $(document).on('click','.checkPdf',function (val) {
                        //$(".checkPdf").click(function (val) {
                            $(this).addClass('checkcurrPdf');
                            var nowtable = document.querySelector(".layui-layer-content");
                            var curr = nowtable.querySelector('.checkcurrPdf');
                            var tr = curr.parentNode.parentNode.parentNode;
                            var Id = tr.childNodes[1].innerText;
                            //console.log(Id);
                            //var checkRows = table.checkStatus(shanshuiProgressTable.tableId);
                            //var ID = checkRows.data[0].id;
                            //console.log(ID);
                            window.open(window.location.origin + Feng.ctxPath + "/shanshuiFile/previewPdf/" + Id);
                            $(this).removeClass('checkcurrPdf');
                            return false;
                        })
                    },500)
                    setTimeout(function () {
                        $(document).on('click','.checkPhoto',function (val) {
                        //$(".checkPhoto").click(function (val) {
                            var t = val.currentTarget.children[0];
                            //页面层
                            layer.open({
                                type: 1,
                                title: '查看图片',
                                // skin: 'layui-layer-rim', //加上边框
                                area: ['60%', '80%'], //宽高 t.width() t.height()
                                shadeClose: true, //开启遮罩关闭
                                end: function (index, layero) {
                                    return false;
                                },
                                //content里面图片的长宽高
                                content: '<div id="targetimg" style="text-align:center;margin-top: 30px"><img src="' + $(t).attr('src') + '" style="display:none"/></div>',
                                success: function (layero, index) {
                                    setTimeout(function () {
                                        var div = document.querySelector("#targetimg");
                                        var tarimg = div.querySelector("img");
                                        var IMG = document.querySelector(".checkPhoto").querySelector("img");
                                        console.log(tarimg);//判断获取到是的是否是弹窗里的
                                        let NewL = (IMG.width / IMG.height) * 300;
                                        console.log(NewL);
                                        tarimg.style.width = NewL + "px";
                                        tarimg.style.height = "300px";
                                        tarimg.style.display = "inline";
                                        tarimg.style.padding = "auto";
                                    }, 500);
                                }
                            });
                        })
                    }, 500)
                }
            });
        }
    };


    // 多项目图片下载
    $('#someOut').click(function () {
        var checkRows = table.checkStatus(ShanshuiProject.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            var L = checkRows.data.length;
            var ID = checkRows.data[0].jlrid;
            for (i = 1; i < L; i++) {
                var Date = checkRows.data[i];
                ID = ID + "," + Date.jlrid;
            }
            console.log(checkRows)
            window.open(Feng.ctxPath + "/shanshuiProject/compressDownload?jlrids=" + ID);
        }
    });
    //全部导出
    $('#allOut').click(function () {
        window.open(Feng.ctxPath + "/shanshuiProject/allCompressDownload");
    });
    //导出今日提交文件
    $('#btnOutToday').click(function () {
        window.open(Feng.ctxPath + "/shanshuiProject/downloadToday");
    });
    // 工具条点击事件
    table.on('tool(' + ShanshuiProject.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'download') {
            ShanshuiProject.Download(data);
        } else if (layEvent === 'detail') {
            ShanshuiProject.jumpDetail(data);
        }
    });
});
