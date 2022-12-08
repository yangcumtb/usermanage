layui.use(['table', 'layarea', 'form', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var layarea = layui.layarea;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;

    /**
     * 已修复图斑信息表管理
     */
    var Recoveredspot = {
        tableId: "recoveredspotTable",
        queryData: {}
    };
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            Recoveredspot.queryData.xzs = res.xzs;
            Recoveredspot.queryData.xzx = res.xzx;
        }
    });

    /**
     * 检查列表避免null、undefined
     */
    var checkNull = function (data) {
        if (data == null || data == undefined) {
            return '/'
        } else {
            return data
        }
    }

    /**
     * 初始化表格的列
     */
    Recoveredspot.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left', sort: true},
            {field: 'id', hide: false, fixed: 'left', sort: true, title: '图斑编号', width: 300},
            {
                field: 'tbmc', title: '图斑名称', width: 150, templet: function (param) {
                    return checkNull(param.tbmc)
                }
            },
            {
                field: 'xzs', title: '所在地市', sort: true, width: 150, templet: function (param) {
                    return checkNull(param.xzs)
                }
            },
            {
                field: 'xzx', title: '所在区县', sort: true, width: 150, templet: function (param) {
                    return checkNull(param.xzx)
                }
            },
            {
                field: 'sukq', sort: true, title: '图斑所属矿权名称', width: 160, templet: function (param) {
                    return checkNull(param.sukq)
                }
            },
            {
                field: 'kqbh', sort: true, title: '图斑所属矿权编号', width: 150, templet: function (param) {
                    return checkNull(param.kqbh)
                }
            },
            {
                field: 'tbmj', sort: true, title: '图斑面积(m²)', width: 150, templet: function (param) {
                    return checkNull(param.tbmj)
                }
            },
            {
                field: 'kfx', sort: true, title: '图斑中心点经度', width: 150, templet: function (param) {
                    return checkNull(param.kfx)
                }
            },
            {
                field: 'kfy', sort: true, title: '图斑中心点纬度', width: 150, templet: function (param) {
                    return checkNull(param.kfy)
                }
            },
            {
                field: 'sddl', sort: true, title: '修复后二调地类', width: 150, templet: function (param) {
                    return checkNull(param.sddl)
                }
            },
            // {
            //     field: 'ydsx', sort: true, title: '有无用地手续', width: 160, sort: true, templet: function (param) {
            //         if (param.ydsx == "1") {
            //             return "有";
            //         } else {
            //             return "无";
            //         }
            //     }
            // },
            {
                field: 'xfqshlx', sort: true, title: '修复前损毁类型', width: 160, sort: true, templet: function (param) {
                    if (param.xfqshlx == "WS") {
                        return "挖损";
                    } else if (param.xfqshlx == "YZ") {
                        return "压占";
                    } else if (param.xfqshlx == "TX") {
                        return "塌陷";
                    } else if (param.xfqshlx == "JZZY") {
                        return "建筑占用";
                    } else if (param.xfqshlx == "LSZY") {
                        return "临时占用";
                    } else if (param.xfqshlx == "DZ") {
                        return "点状";
                    } else {
                        return "/";
                    }
                }
            },
            {
                field: 'fksj', sort: true, title: '复垦/治理时间', width: 150, templet: function (param) {
                    if (param.fksj == null) {
                        return "/"
                    } else {
                        return param.fksj.substring(0, 10)
                    }
                }
            },
            {
                field: 'sszt', sort: true, title: '实施主体', width: 150, templet: function (param) {
                    return checkNull(param.sszt)
                }
            },
            {
                field: 'zjly', sort: true, title: '资金来源', width: 150, templet: function (param) {
                    return checkNull(param.zjly)
                }
            },
            {
                field: 'mjtz', sort: true, title: '亩均投资', width: 150, templet: function (param) {
                    return checkNull(param.mjtz)
                }
            },
            {
                field: 'xffs', sort: true, title: '修复方式', width: 150, templet: function (param) {
                    return checkNull(param.xffs)
                }
            },
            {
                field: 'yssj', sort: true, title: '验收时间', width: 150, templet: function (param) {
                    if (param.ysjl == "YZLDYS") {
                        return "待定"
                    } else {
                        if (param.yssj != null) {
                            return param.yssj.substring(0, 10)
                        } else {
                            var c = "/";
                            return c
                        }
                    }
                }
            },
            {
                field: 'ysdw', sort: true, title: '组织验收单位', width: 150, templet: function (param) {
                    return checkNull(param.ysdw)
                }
            },
            {

                field: 'ysjl', sort: true, title: '验收结论', width: 150, sort: true, templet: function (param) {
                    if (param.ysjl == "TG") {
                        return "通过";
                    } else if (param.ysjl == "YTJTG") {
                        return "有条件通过";
                    } else if (param.ysjl == "WTG") {
                        return "未通过，整改";
                    } else if (param.ysjl == "YZLDYS") {
                        return "已治理，待验收";
                    } else {
                        return "/";
                    }
                }
            },
            // {field: 'xczp', sort: true, title: '现场照片'},
            // {field: 'hcry', sort: true, title: '核查人员'},
            // {field: 'hcrq', sort: true, title: '核查日期'},
            // {field: 'qtdz', sort: true, title: '切图地址'},
            {align: 'center', fixed: 'right', width: 300, toolbar: '#tableBar', title: '操作'}
        ]];
    };


    $(".more-btn").click(function () {
        if ($(".more-container").is(":hidden")) {
            $(".more-container").show(); //如果元素为隐藏,则将它显现
            $(".more-btn").html('<i class="layui-icon layui-icon-subtraction"></i>收起')
        } else {
            $(".more-container").hide(); //如果元素为显现,则将其隐藏
            $(".more-btn").html('<i class="layui-icon layui-icon-addition"></i>展开')
        }
        return false;
    })

    //清除
    $(".delete-btn").click(function () {
        $("#xzs").val('');
        form.render();
    })
    $(".delete-btn1").click(function () {
        $("#xzx").val('');
        form.render();
    })

    /**
     * 点击查询按钮
     */
    Recoveredspot.search = function () {
        var queryData = {};


        table.reload(Recoveredspot.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    Recoveredspot.openAddDlg = function () {
        func.open({
            width: "1000rem",
            title: '添加已修复图斑信息表',
            content: Feng.ctxPath + '/prominemanger/recoveredspot/add',
            tableId: Recoveredspot.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    Recoveredspot.openEditDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '修改已修复图斑信息表',
            content: Feng.ctxPath + '/prominemanger/recoveredspot/edit?id=' + data.id,
            tableId: Recoveredspot.tableId
        });
    };


    /**
     * 导出excel按钮
     */
    Recoveredspot.exportExcel = function () {
        var checkRows = table.checkStatus(Recoveredspot.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 导出所有excel按钮
     */
    Recoveredspot.exportExcelAll = function () {
        var ajax = new HttpRequest(Feng.ctxPath + '/prominemanger/recoveredspot/listnopage', 'POST')
        var result = ajax.start();
        if (result.success !== true) {
            Feng.error("请求数据为空！");
        } else {
            table.exportFile(tableResult.config.id, result.data, 'xls');
        }

    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    Recoveredspot.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/recoveredspot/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Recoveredspot.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否删除?删除操作会删除该图斑所有的影像图、规划图以及外业核查图，请谨慎操作！", operation);
    };

    Recoveredspot.onDetails = function (data) {
        func.open({
            width: "1000rem",
            title: '详情',
            content: Feng.ctxPath + '/prominemanger/recoveredspot/detailHtml?id=' + data.id,
            tableId: Recoveredspot.tableId
        });
    }

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Recoveredspot.tableId,
        url: Feng.ctxPath + '/prominemanger/recoveredspot/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: Recoveredspot.initColumn()
    });

    Recoveredspot.openLocationDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '已修复图斑位置',
            content: Feng.ctxPath + '/prominemanger/recoveredspot/locationHtml?id=' + data.id,
            tableId: Recoveredspot.tableId
        });
    };


    /**
     * 点击查询按钮
     */
    Recoveredspot.search = function () {
        Recoveredspot.queryData.id = $("#id").val();
        Recoveredspot.queryData.xzs = $("#xzs").val();
        Recoveredspot.queryData.xzx = $("#xzx").val();
        Recoveredspot.queryData.kqbh = $("#kqbh").val();
        Recoveredspot.queryData.sddl = $("#sddl").val();
        Recoveredspot.queryData.xffs = $("#xffs").val();
        Recoveredspot.queryData.ydsx = $("#ydsx").val();
        Recoveredspot.queryData.sukq = $("#sukq").val();
        table.reload(Recoveredspot.tableId, {
            where: Recoveredspot.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    Recoveredspot.Reset = function () {
        $("#id").val('');
        $("#xzs").val('');
        $("#xzx").val('');
        $("#kqbh").val('');
        $("#sddl").val('');
        $("#xffs").val('');
        $("#ydsx").val('');
        $("#sukq").val('');
        Recoveredspot.queryData.xzs = $("#xzs").val();
        Recoveredspot.queryData.xzx = $("#xzx").val();
        Recoveredspot.search();
        form.render();
        table.reload(Recoveredspot.tableId);
    };

    /**
     * 根据excel批量导入数据
     */
    Recoveredspot.batchInsertByExcel = function () {
        layer.open({
            title: '批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['70%', '80%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/spot/recoverImportExcelList',
        });
    };
    $(document).ready(function () {
    }).keydown(
        function (e) {
            undefined

            if (e.which === 27) {
                undefined

                layer.closeAll();

            }

        });


    /**
     * 批量导入image数据
     */
    Recoveredspot.batchInsertByImage = function () {
        layer.open({
            type: 2,
            title: '文件批量上传',
            offset: '60px',
            area: ['70%', '80%'],
            content: Feng.ctxPath + '/prominemanger/damagespot/MoreImageUpload_dlg',
        });
    };

    /**
     * 批量转换图斑为已修复图斑
     */
    Recoveredspot.batchChangeSpot = function () {
        var checkRows2 = table.checkStatus(Recoveredspot.tableId);
        var ids = "";
        var changeType = 1;

        if (checkRows2.data.length === 0) {
            Feng.error("请选择要转换的数据");
        } else {
            var operation = function () {
                var L = checkRows2.data.length;
                for (i = 0; i < L; i++) {
                    var Date = checkRows2.data[i];
                    ids = ids + Date.id + ",";
                }
                var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/recoveredspot/changeSpotType", 'post', function (data) {
                    Feng.success(data.message);
                    table.reload(Recoveredspot.tableId);
                }, function (data) {
                    Feng.error("转换失败!" + data.message + "!");
                });
                var Data = {
                    "ids": ids,
                    "changeType": 1
                };
                ajax.set(Data);
                debugger;
                ajax.setContentType('application/json');
                ajax.start();
            };
            Feng.confirm("请确认是否转换所选图斑为损毁图斑?\n请注意转换后请及时在损毁图斑列表中添加缺失字段信息。", operation);
        }


    }

    /**
     * 导出全省shp数据
     */
    Recoveredspot.exportSql = function () {
        var ajax = new HttpRequest(Feng.ctxPath + '/prominemanger/recoveredspot/pgsql2shp', 'POST')
        var result = ajax.start();
        window.open(Feng.ctxPath + "/prominemanger/recoveredspot/shpDownload");
        if (result.success !== true) {
            Feng.error("请求数据为空！");
        } else {
            Feng.success("导出成功!");
        }

    };

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Recoveredspot.search();
        return false;
    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        Recoveredspot.Reset();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        Recoveredspot.openAddDlg();

    });

    // 导出excel
    $('#btnExp').click(function () {
        Recoveredspot.exportExcel();
    });

    // 导出全部excel
    $('#btnExp1').click(function () {
        Recoveredspot.exportExcelAll();
    });

    // 批量导入
    $('#btnExp2').click(function () {
        Recoveredspot.batchInsertByExcel();
    });

    // 图片批量导入
    $('#btnExp3').click(function () {
        Recoveredspot.batchInsertByImage();
    });

    // 转换图斑为损毁图斑
    $('#btnChangeSpot').click(function () {
        Recoveredspot.batchChangeSpot();
    });

    // 导出全省shp数据
    $('#btnSql').click(function () {
        Recoveredspot.exportSql();
    });


    Recoveredspot.openFileuplod = function (data) {
        var editUrl = encodeURIComponent("/prominemanger/recoveredspot/edit");
        var field = encodeURIComponent("fileids");
        var keyIdValue = encodeURIComponent(data.id);
        var keyIdName = encodeURIComponent("id");
        var fileType = encodeURIComponent("image");
        layer.open({
            type: 2,
            title: '文件类型',
            offset: '60px',
            area: ['800px', '600px'],
            content: Feng.ctxPath + '/prominemanger/recoveredspot/recoverFileUpload_dlg?editUrl=' + editUrl + '&field=' + field + "&keyIdValue=" + keyIdValue + "&keyIdName=" + keyIdName + "&fileType=" + fileType,
        });
    };

    // 工具条点击事件
    table.on('tool(' + Recoveredspot.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Recoveredspot.openEditDlg(data);
        } else if (layEvent === 'delete') {
            Recoveredspot.onDeleteItem(data);
        } else if (layEvent === 'location') {
            Recoveredspot.openLocationDlg(data);
        } else if (layEvent === 'uploadPic') {
            Recoveredspot.openFileuplod(data, "scenePhotos");
        } else if (layEvent === 'detail') {
            Recoveredspot.onDetails(data)
        }
    });
});
