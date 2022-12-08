layui.use(['table', 'layarea', 'form', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;
    var layarea = layui.layarea;

    /**
     * 规划修复图斑信息表管理
     */
    var PlannedRecoverspot = {
        tableId: "plannedRecoverspotTable",
        queryData: {}
    };
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            PlannedRecoverspot.queryData.xzs = res.xzs;
            PlannedRecoverspot.queryData.xzx = res.xzx;
        }
    });

    /**
     * 初始化表格的列
     */
    PlannedRecoverspot.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left', sort: true, width: 150},
            {field: 'id', hide: false, fixed: 'left', title: '图斑编号', width: 150},
            {field: 'tbmc', title: '图斑名称', width: 150},
            {field: 'xzs', title: '所在地市', sort: true, width: 150},
            {field: 'xzx', title: '所在区县', sort: true, width: 150},
            {field: 'sukq', sort: true, title: '矿权名称', width: 150},
            {field: 'tbmj', sort: true, title: '图斑面积', width: 150},
            {field: 'kfx', sort: true, title: '中心点经度', width: 150},
            {field: 'kfy', sort: true, title: '中心点纬度', width: 150},
            {
                field: 'xzShlx', sort: true, title: '现状损毁类型', width: 150, templet: function (d) {
                    if (d.xzShlx == "WS") {
                        return "挖损"
                    } else if (d.xzShlx == "YZ") {
                        return "压占"
                    } else if (d.xzShlx == "TX") {
                        return "塌陷"
                    } else if (d.xzShlx == "YJZY") {
                        return "建筑占用"
                    } else if (d.xzShlx == "LSZY") {
                        return "临时占用"
                    } else return "无"
                }
            },
            {
                field: 'xzTbsx', width: 150, title: '图斑属性', sort: true, width: 150, templet: function (d) {
                    if (d.xzTbsx == "LTKC1") {
                        return "露天矿场";
                    } else if (d.xzTbsx == "DMC") {
                        return "堆煤场";
                    } else if (d.xzTbsx == "XMC") {
                        return "洗煤厂";
                    } else if (d.xzTbsx == "MGSD") {
                        return "煤矸石堆";
                    } else if (d.xzTbsx == "QTKSDC") {
                        return "其他矿石堆场";
                    } else if (d.xzTbsx == "XKC") {
                        return "选矿厂";
                    } else if (d.xzTbsx == "XKC2") {
                        return "选矿池";
                    } else if (d.xzTbsx == "BTDC") {
                        return "表土堆场";
                    } else if (d.xzTbsx == "NPTC") {
                        return "内排土场";
                    } else if (d.xzTbsx == "WPTC") {
                        return "外排土场";
                    } else if (d.xzTbsx == "FSD") {
                        return "废石堆";
                    } else if (d.xzTbsx == "WKK") {
                        return "尾矿库";
                    } else if (d.xzTbsx == "GYGCJZ") {
                        return "工业广场建筑";
                    } else if (d.xzTbsx == "TXK") {
                        return "塌陷坑";
                    } else if (d.xzTbsx == "YQJC") {
                        return "油气井场";
                    } else if (d.xzTbsx == "YQCZ") {
                        return "油气场站";
                    } else if (d.xzTbsx == "ZYK") {
                        return "炸药库";
                    } else if (d.xzTbsx == "KSDL") {
                        return "矿山道路";
                    } else if (d.xzTbsx == "DLF") {
                        return "地裂缝";
                    } else if (d.xzTbsx == "BT") {
                        return "崩塌";
                    } else if (d.xzTbsx == "HP") {
                        return "滑坡";
                    } else if (d.xzTbsx == "其他") {
                        return "其他";
                    } else {
                        return "无";
                    }
                }
            },
            {
                field: 'stwt', width: 150, title: '损毁原因', width: 150, sort: true, templet: function (d) {
                    if (d.stwt == "TDSH") {
                        return "土地损毁";
                    } else if (d.stwt == "DZHJWT") {
                        return "地质环境问题";
                    } else if (d.stwt == "ZBPH") {
                        return "植被破坏";
                    }
                }
            },
            {field: 'ghxfsj', sort: true, title: '规划修复时间', width: 150},
            {field: 'ghxffs', sort: true, title: '规划修复方式', width: 150},
            {field: 'ghxfdl', sort: true, title: '规划修复地类', width: 150},
            {field: 'ghssdw', sort: true, title: '规划实施单位', width: 150},
            {field: 'tzgs', sort: true, title: '投资概算', width: 150},
            {field: 'zjly', sort: true, title: '资金来源', width: 150},
            {field: 'yqyssj', sort: true, title: '预期验收时间', width: 150},
            // {field: 'createUser', sort: true, title: '创建人'},
            // {field: 'createTime', sort: true, title: '创建时间'},
            // {field: 'updateUser', sort: true, title: '修改人'},
            // {field: 'updateTime', sort: true, title: '修改时间'},
            // {field: 'geoShp', sort: true, title: '图斑矢量数据'},
            {align: 'center', fixed: 'right', toolbar: '#tableBar', title: '操作', width: 300}
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
    PlannedRecoverspot.search = function () {
        PlannedRecoverspot.queryData.id = $("#id").val();
        PlannedRecoverspot.queryData.xzs = $("#xzs").val();
        PlannedRecoverspot.queryData.xzx = $("#xzx").val();
        PlannedRecoverspot.queryData.xzShlx = $("#xzShlx").val();
        PlannedRecoverspot.queryData.xzTbsx = $("#xzTbsx").val();
        PlannedRecoverspot.queryData.sukq = $("#sukq").val();

        table.reload(PlannedRecoverspot.tableId, {
            where: PlannedRecoverspot.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    PlannedRecoverspot.Reset = function () {
        $("#id").val('');
        $("#xzs").val('');
        $("#xzx").val('');
        $("#xzShlx").val('');
        $("#xzTbsx").val('');
        $("#sukq").val('');
        PlannedRecoverspot.queryData.xzs = $("#xzs").val();
        PlannedRecoverspot.queryData.xzx = $("#xzx").val();
        PlannedRecoverspot.search();
        form.render();
        table.reload(PlannedRecoverspot.tableId);
    };

    /**
     * 跳转到添加页面
     */
    PlannedRecoverspot.openAddDlg = function () {
        func.open({
            width: "1000rem",
            title: '添加规划修复图斑信息表',
            content: Feng.ctxPath + '/prominemanger/plannedRecoverspot/add',
            tableId: PlannedRecoverspot.tableId
        });
    };

    /**
     * 跳转到编辑页面
     *
     * @param data 点击按钮时候的行数据
     */
    PlannedRecoverspot.openEditDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '修改已修复图斑信息表',
            content: Feng.ctxPath + '/prominemanger/plannedRecoverspot/edit?id=' + data.id,
            tableId: PlannedRecoverspot.tableId
        });
    };

    /**
     * 导出excel按钮
     */
    PlannedRecoverspot.exportExcel = function () {
        var checkRows = table.checkStatus(PlannedRecoverspot.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    PlannedRecoverspot.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/plannedRecoverspot/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(PlannedRecoverspot.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    //详情
    PlannedRecoverspot.onDetails = function (data) {
        func.open({
            width: "1000rem",
            title: '详情',
            content: Feng.ctxPath + '/prominemanger/plannedRecoverspot/detailHtml?id=' + data.id,
            tableId: PlannedRecoverspot.tableId
        });
    }
    // 渲染表格
    var tableResult = table.render({
        elem: '#' + PlannedRecoverspot.tableId,
        url: Feng.ctxPath + '/prominemanger/plannedRecoverspot/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: PlannedRecoverspot.initColumn()
    });
    PlannedRecoverspot.openLocationDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '规划修复图斑位置',
            content: Feng.ctxPath + '/prominemanger/plannedRecoverspot/locationHtml?id=' + data.id,
            tableId: PlannedRecoverspot.tableId
        });
    };

    /**
     * 根据excel批量导入数据
     */
    PlannedRecoverspot.batchInsertByExcel = function () {
        layer.open({
            title: '批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['70%', '80%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/spot/planImportExcelList',
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
    PlannedRecoverspot.batchInsertByImage = function () {
        layer.open({
            type: 2,
            title: '文件批量上传',
            offset: '60px',
            area: ['70%', '80%'],
            content: Feng.ctxPath + '/prominemanger/damagespot/MoreImageUpload_dlg',
        });
    };
    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        PlannedRecoverspot.search();
        return false;
    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        PlannedRecoverspot.Reset();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        PlannedRecoverspot.openAddDlg();

    });

    // 导出excel
    $('#btnExp').click(function () {
        PlannedRecoverspot.exportExcel();
    });

    // 批量导入
    $('#btnExp2').click(function () {
        PlannedRecoverspot.batchInsertByExcel();
    });

    // 图片批量导入
    $('#btnExp3').click(function () {
        PlannedRecoverspot.batchInsertByImage();
    });

    PlannedRecoverspot.openFileuplod = function (data) {
        var editUrl = encodeURIComponent("/prominemanger/plannedRecoverspot/edit");
        var field = encodeURIComponent("fileids");
        var keyIdValue = encodeURIComponent(data.id);
        var keyIdName = encodeURIComponent("id");
        var fileType = encodeURIComponent("image");
        layer.open({
            type: 2,
            title: '文件类型',
            offset: '60px',
            area: ['70%', '80%'],
            content: Feng.ctxPath + '/prominemanger/plannedRecoverspot/plannedFileUpload_dlg?editUrl=' + editUrl + '&field=' + field + "&keyIdValue=" + keyIdValue + "&keyIdName=" + keyIdName + "&fileType=" + fileType,
        });
    };

    // 工具条点击事件
    table.on('tool(' + PlannedRecoverspot.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            PlannedRecoverspot.openEditDlg(data);
        } else if (layEvent === 'delete') {
            PlannedRecoverspot.onDeleteItem(data);
        } else if (layEvent === 'location') {
            PlannedRecoverspot.openLocationDlg(data);
        } else if (layEvent === 'uploadPic') {
            PlannedRecoverspot.openFileuplod(data, "scenePhotos");
        } else if (layEvent === 'detail') {
            PlannedRecoverspot.onDetails(data)
        }
    });
});
