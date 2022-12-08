layui.use(['table', 'layarea', 'admin', 'form', 'HttpRequest', 'func'], function () {
    /**
     * 生产矿山基础信息表管理
     */
    var productivemineInfo = {
        tableId: "productivemineInfoTable",
        queryData: {}
    };
    var $ = layui.$;
    var layarea = layui.layarea;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            productivemineInfo.queryData.xzs = res.xzs;
            productivemineInfo.queryData.xzs = res.xzx;
        }
    });

    /**
     * 初始化表格的列
     */
    productivemineInfo.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left', sort: true},
            {field: 'iD', fixed: 'left', width: 200, title: '图斑编号', sort: true},
            {field: 'xzs', width: 150, title: '所在地市', sort: true},
            {field: 'xzx', width: 150, title: '所在区县', sort: true},
            {field: 'wZ', width: 150, title: '图斑位置', sort: true},
            {field: 'tBMJ', width: 150, title: '图斑面积(㎡)', width: 120, sort: true},
            {field: 'kFX', width: 150, title: '中心点经度', sort: true},
            {field: 'kFY', width: 150, title: '中心点纬度', sort: true},
            {
                field: 'sHLX', width: 120, title: '损毁类型', sort: true, templet: function (d) {
                    if (d.sHLX == "挖损") {
                        return "挖损";
                    } else if (d.sHLX == "压占") {
                        return "压占";
                    } else if(d.sHLX == "塌陷"){
                        return "塌陷";
                    }else{
                        return "无";
                    }
                }
            },
            {
                field: 'tBSX', width: 150, title: '图斑属性', sort: true, templet: function (d) {
                    if (d.tBSX == "露天矿场") {
                        return "露天矿场";
                    } else if (d.tBSX == "堆煤场") {
                        return "堆煤场";
                    } else if (d.tBSX == "洗煤厂") {
                        return "洗煤厂";
                    } else if (d.tBSX == "煤矸石堆") {
                        return "煤矸石堆";
                    } else if (d.tBSX == "其他矿石堆场") {
                        return "其他矿石堆场";
                    } else if (d.tBSX == "选矿厂") {
                        return "选矿厂";
                    } else if (d.tBSX == "选矿池") {
                        return "选矿池";
                    } else if (d.tBSX == "表土堆场") {
                        return "表土堆场";
                    } else if (d.tBSX == "内排土场") {
                        return "内排土场";
                    } else if (d.tBSX == "外排土场") {
                        return "外排土场";
                    } else if (d.tBSX == "废石堆") {
                        return "废石堆";
                    } else if (d.tBSX == "尾矿库") {
                        return "尾矿库";
                    } else if (d.tBSX == "工业广场建筑") {
                        return "工业广场建筑";
                    } else if (d.tBSX == "塌陷坑") {
                        return "塌陷坑";
                    } else if (d.tBSX == "油气井场") {
                        return "油气井场";
                    } else if (d.tBSX == "油气场站") {
                        return "油气场站";
                    } else if (d.tBSX == "炸药库") {
                        return "炸药库";
                    } else if (d.tBSX == "矿山道路") {
                        return "矿山道路";
                    } else if (d.tBSX == "地裂缝") {
                        return "地裂缝";
                    } else if (d.tBSX == "崩塌") {
                        return "崩塌";
                    } else if (d.tBSX == "滑坡") {
                        return "滑坡";
                    } else if (d.tBSX == "其他") {
                        return "其他";
                    }else{
                        return "无";
                    }
                }
            },
            {
                field: 'sDDL', width: 200, title: '三调地类', sort: true, templet: function (d) {
                    if (d.sDDL == "耕地") {
                        return "耕地";
                    } else if (d.sDDL == "园地") {
                        return "园地";
                    } else if (d.sDDL == "林地") {
                        return "林地";
                    } else if (d.sDDL == "草地") {
                        return "草地";
                    } else if (d.sDDL == "商服用地") {
                        return "商服用地";
                    } else if (d.sDDL == "工矿仓储用地") {
                        return "工矿仓储用地";
                    } else if (d.sDDL == "住宅用地") {
                        return "住宅用地";
                    } else if (d.sDDL == "公共管理与公共服务用地") {
                        return "公共管理与公共服务用地";
                    } else if (d.sDDL == "特殊用地") {
                        return "特殊用地";
                    } else if (d.sDDL == "交通运输用地") {
                        return "交通运输用地";
                    } else if (d.sDDL == "水域及水利设施用地") {
                        return "水域及水利设施用地";
                    } else if (d.sDDL == "其他用地") {
                        return "其他用地";
                    }else{
                        return "无";
                    }
                }
            },
            {
                field: 'sYQ', width: 180, title: '所有权权属', sort: true, templet: function (d) {
                    if (d.sYQ == "国有土地所有权") {
                        return "国有土地所有权";
                    } else if(d.sYQ == "集体土地所有权"){
                        return "集体土地所有权";
                    }else{
                        return "无";
                    }
                }
            },
            {
                field: 'sHYQ', width: 180, title: '使用权权属', sort: true, templet: function (d) {
                    if (d.sHYQ == "国有土地使用权") {
                        return "国有土地使用权";
                    } else if (d.sHYQ == "集体土地使用权") {
                        return "集体土地使用权";
                    } else if(d.sHYQ == "其他"){
                        return "其他";
                    }else{
                        return "无";
                    }
                }
            },
            {
                field: 'yDSX', width: 180, title: '有无合法用地手续', sort: true, templet: function (d) {
                    if (d.yDSX == "1") {
                        return "有";
                    } else {
                        return "无";
                    }
                }
            },
            {field: 'kQBH', width: 150, title: '采矿权证编号', sort: true},
            {
                field: 'kQQXQ', width: 200, title: '采矿权证有效期起', sort: true, templet: function (a) {
                    if (a.kQQXQ != null) {
                        var b = a.kQQXQ.substring(0, 10);
                        return b
                    }

                }
            },
            {
                field: 'kQQXZ', width: 200, title: '采矿权证有效期止', sort: true, templet: function (a) {
                    if (a.kQQXZ != null) {
                        var b = a.kQQXZ.substring(0, 10);
                        return b
                    } else {
                        var c = null;
                        return c
                    }

                }
            },
            {field: 'kQMC', width: 150, title: '采矿权名称', sort: true},
            {field: 'xMDW', width: 150, title: '项目单位', sort: true},
            {field: 'kZ', width: 120, title: '矿种', sort: true},
            {
                field: 'kCFS', width: 140, title: '开采方式', sort: true, templet: function (d) {
                    if (d.kCFS == "地下开采") {
                        return "地下开采";
                    } else if (d.kCFS == "露天开采") {
                        return "露天开采";
                    } else {
                        return "露井联采";
                    }
                }
            },
            {
                field: 'zLQK', width: 140, title: '修复情况', sort: true, templet: function (d) {
                    if (d.zlqk == "XFZ") {
                        return "治理中";
                    } else if (d.zlqk == "WXF") {
                        return "未治理";
                    } else if (d.zlqk == "XF") {
                        return "已治理";
                    }else{
                        return "无";
                    }
                }
            },
            {field: 'zLMJ', width: 180, title: '实地治理面积(㎡)', sort: true},
            {
                field: 'nXFSJ', width: 200, title: '拟修复时间', sort: true, templet: function (a) {
                    if (a.nXFSJ != null) {
                        var b = a.nXFSJ.substring(0, 10);
                        return b
                    } else {
                        var c = null;
                        return c
                    }

                }
            },
            {
                field: 'xCZP', width: 180, title: '核查现场的照片', sort: true, templet: function (d) {
                    if (d.dd == null || d.dd == undefined) {
                        return "上传照片";
                    } else {
                        return "查看照片";
                    }
                }
            },
            {field: 'hCDW', width: 160, title: '核查单位名称', sort: true},
            {field: 'hCRY', width: 160, title: '核查人员姓名', sort: true},
            {
                field: 'hCRQ', width: 200, title: '核查具体日期', sort: true, templet: function (a) {
                    if (a.hCRQ != null) {
                        var b = a.hCRQ.substring(0, 10);
                        return b
                    } else {
                        var c = null;
                        return c
                    }

                }
            },
            // {field: 'qTDZ', width: 180, title: '切图文件存储地址', sort: true},
            {field: 'sSZT', width: 180, title: '实施主体', sort: true},
            {
                field: 'fKSJ', width: 200, title: '复垦/治理时间', sort: true, templet: function (a) {
                    if (a.fKSJ != null) {
                        var b = a.fKSJ.substring(0, 10);
                        return b
                    } else {
                        return ''
                    }

                }
            },
            {
                field: 'ySSJ', width: 200, title: '验收时间', sort: true, templet: function (a) {
                    if (a.ySSJ != null) {
                        var b = a.ySSJ.substring(0, 10);
                        return b
                    } else {
                        return ''
                    }

                }
            },
            {field: 'damagetime', width: 200, title: '损毁时间', sort: true},
            {field: 'ySDW', width: 180, title: '组织验收单位', sort: true},
            {
                field: 'ySJL', width: 180, title: '验收结论', sort: true, templet: function (d) {
                    if (d.ySJL == "通过") {
                        return "通过";
                    } else if (d.ySJL == "有条件通过") {
                        return "有条件通过";
                    } else if (d.ySJL == "未通过，整改") {
                        return "未通过，整改";
                    }else{
                        return "无";
                    }
                }
            },
            {
                field: 'fKFX', width: 260, title: '治理/复垦后土地利用类型', sort: true, templet: function (d) {
                    if (d.fKFX == "01") {
                        return "耕地";
                    } else if (d.fKFX == "02") {
                        return "园地";
                    } else if (d.fKFX == "03") {
                        return "林地";
                    } else if (d.fKFX == "04") {
                        return "草地";
                    } else if (d.fKFX == "05") {
                        return "商服用地";
                    } else if (d.fKFX == "06") {
                        return "工矿仓储用地";
                    } else if (d.fKFX == "07") {
                        return "住宅用地";
                    } else if (d.fKFX == "08") {
                        return "公共管理与公共服务用地";
                    } else if (d.fKFX == "09") {
                        return "特殊用地";
                    } else if (d.fKFX == "10") {
                        return "交通运输用地";
                    } else if (d.fKFX == "11") {
                        return "水域及水利设施用地";
                    } else {
                        return "其他用地";
                    }
                }
            },
            {field: 'fKYWR', width: 200, title: '复垦义务人', sort: true},
            {field: 'zTTZ', width: 180, title: '总体投资（万元）', sort: true},
            {fixed: 'right', width: 310, toolbar: "#tool", title: '操作'}
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
    productivemineInfo.search = function () {
        productivemineInfo.queryData.iD = $("#iD").val();
        productivemineInfo.queryData.xzs = $("#xzs").val();
        productivemineInfo.queryData.xzx= $("#xzx").val();
        productivemineInfo.queryData.hCDW = $("#hCDW").val();
        productivemineInfo.queryData.hCRY = $("#hCRY").val();
        productivemineInfo.queryData.sHLX = $("#sHLX").val();
        productivemineInfo.queryData.tBSX = $("#tBSX").val();
        productivemineInfo.queryData.xMDW = $("#xMDW").val();
        productivemineInfo.queryData.sHYQ = $("#sHYQ").val();
        productivemineInfo.queryData.sYQ = $("#sYQ").val();
        productivemineInfo.queryData.zLQK = $("#zLQK").val();
        productivemineInfo.queryData.kQMC = $("#kQMC").val();
        productivemineInfo.queryData.kZ = $("#kZ").val();
        table.reload(productivemineInfo.tableId, {
            where: productivemineInfo.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    productivemineInfo.Reset = function () {
        $("#iD").val('');
        $("#xzs").val('');
        $("#xzx").val('');
        $("#hCDW").val('');
        $("#hCRY").val('');
        $("#xMDW").val('');
        $("#sHLX").val('');
        $("#tBSX").val('');
        $("#sHYQ").val('');
        $("#sYQ").val('');
        $("#zLQK").val('');
        $("#kQMC").val('');
        productivemineInfo.queryData.xzs = $("#xzs").val();
        productivemineInfo.queryData.xzx = $("#xzx").val();
        productivemineInfo.search();
        form.render();
        table.reload(productivemineInfo.tableId);

    };

    /**
     * 弹出添加对话框
     */
    productivemineInfo.openAddDlg = function () {
        func.open({
            title: '添加生产矿山图斑',
            content: Feng.ctxPath + '/spot/productivemine/add',
            area: ['800px', '500px'],
            shade: 0.6,
            tableId: productivemineInfo.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    productivemineInfo.openEditDlg = function (data) {
        func.open({
            title: '修改生产矿山表',
            content: Feng.ctxPath + '/spot/productivemine/edit?iD=' + data.iD,
            tableId: productivemineInfo.tableId
        });
    };

    /**
     * 点击详情
     *
     * @param data 点击按钮时候的行数据
     */
    productivemineInfo.openDetailDlg = function (data) {
        func.open({
            title: '生产矿山详情',
            content: Feng.ctxPath + '/spot/productivemine/detailHtml?iD=' + data.iD,
            tableId: productivemineInfo.tableId
        });
    };

    productivemineInfo.openLocationDlg = function (data) {
        func.open({
            title: '生产矿山图斑位置',
            content: Feng.ctxPath + '/spot/productivemine/locationHtml?iD=' + data.iD,
            tableId: productivemineInfo.tableId
        });
    };
    /**
     * 导出excel按钮
     */
    productivemineInfo.exportExcel = function () {
        var checkRows = table.checkStatus(productivemineInfo.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 根据excel批量导入数据
     */
    productivemineInfo.batchInsertByExcel = function () {
        layer.open({
            title: '批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['80%', '90%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/spot/batchImport',
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
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    productivemineInfo.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/spot/productivemine/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(productivemineInfo.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("iD", data.iD);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + productivemineInfo.tableId,
        url: Feng.ctxPath + '/spot/productivemine/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: productivemineInfo.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        productivemineInfo.search();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        productivemineInfo.openAddDlg();
    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        productivemineInfo.Reset();
        return false;
    });

    // 导出excel
    $('#btnExp').click(function () {
        productivemineInfo.exportExcel();
    });

    // 根据Excel批量导入
    $('#btnExp2').click(function () {
        productivemineInfo.batchInsertByExcel();
    });

    productivemineInfo.uploadFile = function (data) {
        var editUrl = encodeURIComponent("/spot/productivemine/edit");
        var field = encodeURIComponent("fileids");
        var keyIdValue = encodeURIComponent(data.iD);
        var keyIdName = encodeURIComponent("iD");
        var fileType = encodeURIComponent("image");

        layer.open({
            type: 2,
            title: '文档类型',
            offset: '60px',
            area: ['800px', '400px'],
            content: Feng.ctxPath + '/spot/productivemine/productivemineFileUpload_dlg?editUrl=' + editUrl + '&field=' + field + "&keyIdValue=" + keyIdValue + "&keyIdName=" + keyIdName + "&fileType=" + fileType,
        });
    };
    // 工具条点击事件
    table.on('tool(' + productivemineInfo.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            productivemineInfo.openEditDlg(data);
        } else if (layEvent === 'detail') {
            productivemineInfo.openDetailDlg(data);
        } else if (layEvent === 'delete') {
            productivemineInfo.onDeleteItem(data);
        } else if (layEvent === 'location') {
            productivemineInfo.openLocationDlg(data);
        } else if (layEvent === 'uploadPic') {
            productivemineInfo.uploadFile(data, "scenePhotos");
        }
    });
});
