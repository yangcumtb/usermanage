layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;

    /**
     * 管理
     */
    var FinalCheckJsxmCopy1 = {
        tableId: "finalCheckJsxmCopy1Table",
        queryData: {}
    };

    /**
     * 初始化表格的列
     */
    FinalCheckJsxmCopy1.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'id', hide: true, title: 'ID'},
            {field: 'xmmc', sort: true, title: '建设项目名称', fixed: 'left', width: 180},
            {field: 'zgbm', sort: true, title: '项目类型'},
            {
                field: 'tjlx', sort: true, title: '提交类型', templet: function (d) {
                    if (d.tjlx == 0) {
                        return "初审";
                    } else if (d.tjlx == 1) {
                        return "终审";
                    }
                }
            },

            {
                field: 'psjd', width: 120, sort: true, title: '项目评审节点', templet: function (d) {
                    if (d.psjd == "1") {
                        return "县级初审";
                    } else if (d.psjd == "2") {
                        return "县级终审";
                    } else if (d.psjd == "3") {
                        return "市级审批";
                    } else if (d.psjd == "4") {
                        return "省级审批";
                    } else if (d.psjd == "5") {
                        return "已入库";
                    } else {
                        return "节点追踪失败"
                    }
                }
            },
            {
                field: 'pssjXs', sort: true, title: '县级初审时间', width: 150, templet: function (a) {
                    if (a.pssjXs != null) {
                        var b = a.pssjXs.substring(0, 10);
                        return b
                    } else {
                        var c = '/';
                        return c
                    }
                }
            },
            {
                field: 'pssjXf', sort: true, title: '县级终审时间', width: 150, templet: function (a) {
                    if (a.pssjXf != null) {
                        var b = a.pssjXf.substring(0, 10);
                        return b
                    } else {
                        var c = '/';
                        return c
                    }
                }
            },
            {
                field: 'pssjC', sort: true, title: '市级评审时间', width: 150, templet: function (a) {
                    if (a.pssjC != null) {
                        var b = a.pssjC.substring(0, 10);
                        return b
                    } else {
                        var c = '/';
                        return c
                    }
                }
            },
            {
                field: 'pssjS', sort: true, title: '省级评审时间', width: 150, templet: function (a) {
                    if (a.pssjS != null) {
                        var b = a.pssjS.substring(0, 10);
                        return b
                    } else {
                        var c = '/';
                        return c
                    }
                }
            },
            {align: 'center', toolbar: '#tableBar', title: '操作', fixed: 'right', width: 310}
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
    /**
     * 点击查询按钮
     */
    FinalCheckJsxmCopy1.search = function () {
        FinalCheckJsxmCopy1.queryData.xmmc = $("#xmmc").val();
        FinalCheckJsxmCopy1.queryData.tjlx = $("#tjlx").val();
        FinalCheckJsxmCopy1.queryData.bzdw = $("#bzdw").val();
        FinalCheckJsxmCopy1.queryData.jsdw = $("#jsdw").val();
        FinalCheckJsxmCopy1.queryData.bzdwdz = $("#bzdwdz").val();
        FinalCheckJsxmCopy1.queryData.ywr = $("#ywr").val();

        table.reload(FinalCheckJsxmCopy1.tableId, {
            where: FinalCheckJsxmCopy1.queryData, page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    FinalCheckJsxmCopy1.Reset = function () {
        $("#xmmc").val('');
        $("#tjlx").val('');
        $("#bzdw").val('');
        $("#jsdw").val('');
        $("#bzdwdz").val('');
        $("#ywr").val('');
        FinalCheckJsxmCopy1.search();
        form.render();
        table.reload(FinalCheckJsxmCopy1.tableId);

    };

    /**
     * 弹出添加对话框
     */
    FinalCheckJsxmCopy1.openAddDlg = function () {
        func.open({
            width: "1000rem",
            title: '添加',
            content: Feng.ctxPath + '/jsxmCheck/final/add',
            tableId: FinalCheckJsxmCopy1.tableId
        });
    };

    /**
     * 点击审批
     *
     * @param data 点击按钮时候的行数据
     */
    FinalCheckJsxmCopy1.openCheck = function (data) {
        func.open({
            width: "1000rem",
            title: '审批',
            content: Feng.ctxPath + '/jsxmCheck/final/check?id=' + data.id,
            tableId: FinalCheckJsxmCopy1.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    FinalCheckJsxmCopy1.openEdit = function (data) {
        func.open({
            width: "1000rem",
            title: '编辑',
            content: Feng.ctxPath + '/jsxmCheck/final/edit?id=' + data.id,
            tableId: FinalCheckJsxmCopy1.tableId
        });
    };

    /**
     * 点击查看详细
     *
     * @param data 点击按钮时候的行数据
     */
    FinalCheckJsxmCopy1.openDetail = function (data) {
        func.open({
            width: "1000rem",
            title: '查看详细',
            content: Feng.ctxPath + '/jsxmCheck/final/detailHtml?id=' + data.id,
            tableId: FinalCheckJsxmCopy1.tableId
        });
    };


    /**
     * 导出excel按钮
     */
    FinalCheckJsxmCopy1.exportExcel = function () {
        var checkRows = table.checkStatus(FinalCheckJsxmCopy1.tableId);
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
    FinalCheckJsxmCopy1.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(FinalCheckJsxmCopy1.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + FinalCheckJsxmCopy1.tableId,
        url: Feng.ctxPath + '/jsxmCheck/final/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: FinalCheckJsxmCopy1.initColumn()
    });

    // 搜索按钮点击事件
    $('.icon-btn').click(function () {
        FinalCheckJsxmCopy1.search();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        FinalCheckJsxmCopy1.openAddDlg();

    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        FinalCheckJsxmCopy1.Reset();
        return false;
    });

    // 导出excel
    $('#btnExp').click(function () {
        FinalCheckJsxmCopy1.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + FinalCheckJsxmCopy1.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'check') {
            FinalCheckJsxmCopy1.openCheck(data);
        } else if (layEvent === 'delete') {
            FinalCheckJsxmCopy1.onDeleteItem(data);
        } else if (layEvent === 'edit') {
            FinalCheckJsxmCopy1.openEdit(data);
        } else if (layEvent === 'detail') {
            FinalCheckJsxmCopy1.openDetail(data);
        }
    });
});