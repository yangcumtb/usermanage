layui.use(['table', 'admin', 'form', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;

    /**
     * 管理
     */
    var ExamineOperation = {
        tableId: "examineOperationTable",
        queryData: {}
    };

    /**
     * 初始化表格的列
     */
    ExamineOperation.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left', width: 120},
            {field: 'xmmc', sort: true, title: '项目名称', fixed: 'left', width: 200},
            {
                field: 'xtj', sort: true, title: '县级提交验收', templet: function (d) {
                    if (d.xtj == "1") {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
            {
                field: 'sys', sort: true, title: '市级提交验收', templet: function (d) {
                    if (d.sys == "1") {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
            {
                field: 'sjys', sort: true, title: '省级通过验收', templet: function (d) {
                    if (d.sjys == "1") {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
            {field: 'pssjXs', sort: true, title: '县级验收时间', templet: function (a) {
            if (a.pssjXs != null) {
                var b = a.pssjXs.substring(0, 10);
                return b
            } else{
                var c = '/';
                return c
            }
        }},
            {field: 'pssjC', sort: true, title: '市级验收时间', templet: function (a) {
                    if (a.pssjXs != null) {
                        var b = a.pssjXs.substring(0, 10);
                        return b
                    } else{
                        var c = '/';
                        return c
                    }
                }},
            {field: 'pssjS', sort: true, title: '省级验收时间', templet: function (a) {
                    if (a.pssjXs != null) {
                        var b = a.pssjXs.substring(0, 10);
                        return b
                    } else{
                        var c = '/';
                        return c
                    }
                }},
            {align: 'center', toolbar: '#tableBar', title: '操作', fixed: 'right', width: 400}
        ]];
    };

    /**
     * 点击查询按钮
     */
    ExamineOperation.search = function () {
        var queryData = {};
        ExamineOperation.queryData.xmmc = $("#xmmc").val();

        table.reload(ExamineOperation.tableId, {
            where: ExamineOperation.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    ExamineOperation.Reset = function () {
        $("#xmmc").val('');
        ExamineOperation.search();
        form.render();
        table.reload(ExamineOperation.tableId);

    };

    /**
     * 弹出添加对话框
     */
    ExamineOperation.openAddDlg = function () {
        func.open({
            title: '添加',
            content: Feng.ctxPath + '/project/examine/add',
            tableId: ExamineOperation.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    ExamineOperation.openEditDlg = function (data) {
        func.open({
            title: '修改',
            content: Feng.ctxPath + '/project/examine/edit?xmmc=' + data.xmmc,
            tableId: ExamineOperation.tableId,
            area: ['1800px', '500px']
        });
    };


    /**
     * 导出excel按钮
     */
    ExamineOperation.exportExcel = function () {
        var checkRows = table.checkStatus(ExamineOperation.tableId);
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
    ExamineOperation.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/project/examine/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(ExamineOperation.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("xmmc", data.xmmc);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };
    /**
     * 点击详情
     */
    ExamineOperation.onDetailItem = function (data) {
        func.open({
            title: '详情',
            content: Feng.ctxPath + '/project/examine/detailHtml?id=' + data.id,
            tableId: ExamineOperation.tableId,
            width: "1000rem",
        });
    };
    /**
     * 点击上级审批
     */
    ExamineOperation.onExamItem = function (data) {
        func.open({
            title: '提交验收',
            content: Feng.ctxPath + '/project/examine/exam?id=' + data.id,
            tableId: ExamineOperation.tableId,
            width: "1000rem",
        });
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + ExamineOperation.tableId,
        url: Feng.ctxPath + '/project/examine/list?xmlx=0',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: ExamineOperation.initColumn()
    });

    // 搜索按钮点击事件
    $(".icon-btn").click(function () {
        ExamineOperation.search();
        return false;
    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        ExamineOperation.Reset();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        ExamineOperation.openAddDlg();

    });

    // 导出excel
    $('#btnExp').click(function () {
        ExamineOperation.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + ExamineOperation.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            ExamineOperation.openEditDlg(data);
        } else if (layEvent === 'delete') {
            ExamineOperation.onDeleteItem(data);
        }else if (layEvent ==='detail'){
            ExamineOperation.onDetailItem(data);
        }else if (layEvent === 'exam'){
            ExamineOperation.onExamItem(data);
        }
    });
});