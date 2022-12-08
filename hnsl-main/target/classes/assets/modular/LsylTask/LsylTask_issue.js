layui.use(['table', 'layarea', 'admin', 'form', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var layarea = layui.layarea;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;


    /**
     * 核查任务。管理
     */
    var VerificationTask = {
        tableId: "verificationTaskTable",
        queryData: {}
    };
    layarea.render({
        elem: '#area',
        change: function (res) {
            //选择结果
            VerificationTask.queryData.xzs = res.xzs;
            VerificationTask.queryData.xzx = res.xzx;
        }
    });
    /**
     * 初始化表格的列
     */
    VerificationTask.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'id', title: '任务编号', hide: true},
            {field: 'spottableId', fixed: 'left', title: '图斑编号', width: 300},
            {field: 'xzs', sort: true, title: '所在地市'},
            {field: 'xzx', sort: true, title: '所在区县'},
            {
                field: 'tbtype', sort: true, title: '图斑类型', width: 180, templet: function (d) {
                    return "历史遗留图斑"
                }
            },
            {
                field: 'hcnr', sort: true, title: '核查内容', width: 180, templet: function (d) {
                    if (d.hcnr == 1) {
                        return "损毁图斑的损毁情况"
                    } else if (d.hcnr == 2) {
                        return "复垦图斑的复垦情况"
                    } else {
                        return "未知任务"
                    }
                }
            },
            {
                field: 'taskStatus', sort: true, width: 120, title: '任务状态', templet: function (d) {
                    if (d.taskStatus == 1) {
                        return "待分配"
                    } else if (d.taskStatus == 2) {
                        return "外业分配"
                    } else if (d.taskStatus == 3) {
                        return "外业核查中"
                    } else if (d.taskStatus == 4) {
                        return "外业核查完毕"
                    } else if (d.taskStatus == 5) {
                        return "县级审核完毕"
                    } else return "未输入"
                }
            },
            {
                field: 'dept_name', title: '核查单位', width: 300, templet: function (param) {
                    if (param.dept_name == null) {
                        return ''
                    } else {
                        return param.dept_name
                    }
                }
            },
            {
                field: 'user_id', title: '核查人员', templet: function (param) {
                    if (param.user_id == null) {
                        return ''
                    } else {
                        return param.user_id
                    }
                }
            },
            {field: 'bz', sort: true, title: '备注'},
            {align: 'center', fixed: 'right', width: 150, toolbar: '#tableBar', title: '操作'}
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
    VerificationTask.search = function () {
        VerificationTask.queryData.xzs = $("#xzs").val();
        VerificationTask.queryData.xzx = $("#xzx").val();
        //VerificationTask.queryData.tbtype = $("#tbtype").val();
        VerificationTask.queryData.hcnr = $("#hcnr").val();
        VerificationTask.queryData.taskStatus = $("#taskStatus").val();
        VerificationTask.queryData.spottableId = $("#spottableId").val();
        VerificationTask.queryData.sukq = $("#sukq").val();
        VerificationTask.queryData.scdw = $("#scdw").val();
        //VerificationTask.queryData.jsdw = $("#jsdw").val();
        VerificationTask.queryData.xmmc = $("#xmmc").val();
        table.reload(VerificationTask.tableId, {
            where: VerificationTask.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    VerificationTask.Reset = function () {
        $("#xzs").val(null);
        $("#xzx").val(null);
        //$("#tbtype").val(null);
        $("#hcnr").val(null);
        $("#taskStatus").val(null);
        $("#spottableId").val(null);
        $("#sukq").val(null);
        $("#scdw").val(null);
        //$("#jsdw").val(null);
        $("#xmmc").val(null);
        VerificationTask.search();
        form.render();
        table.reload(VerificationTask.tableId);

    };

    /**
     * 跳转到添加页面
     */
    VerificationTask.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/LsylTask/add'
    };

    /**
     * 跳转到编辑页面
     *
     * @param data 点击按钮时候的行数据
     */
    VerificationTask.jumpEditPage = function (data) {
        window.location.href = Feng.ctxPath + '/LsylTask/edit?id=' + data.id
    };

    /**
     * 导出excel按钮
     */
    VerificationTask.exportExcel = function () {
        var checkRows = table.checkStatus(VerificationTask.tableId);
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
    VerificationTask.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/LsylTask/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(VerificationTask.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("tbbh", data.tbbh);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };
    /**
     *点击查看详细按钮
     * @param data
     */
    VerificationTask.jumpEditPage = function (data) {
        func.open({
            width: "1000rem",
            title: '查看详细',
            content: Feng.ctxPath + '/LsylTask/detailHtml?id=' + data.id,
            tableId: VerificationTask.tableId,
        })
    }
    /**
     *点击下发按钮
     * @param data
     */
    VerificationTask.onDistribute = function (data) {

        func.open({
            width: "1000rem",
            title: '外业核查任务下发',
            content: Feng.ctxPath + '/LsylTask/distributeHtml?id=' + data.id,
            tableId: VerificationTask.tableId,
        })
    }
    /**
     * 点击查看审核按钮
     * @param data
     */
    VerificationTask.onCheck = function (data) {
        func.open({
            width: "1000rem",
            title: '审核',
            content: Feng.ctxPath + '/LsylTask/checkHtml?id=' + data.id,
            tableId: VerificationTask.tableId,
        });
    }
    // 渲染表格
    var tableResult = table.render({
        elem: '#' + VerificationTask.tableId,
        url: Feng.ctxPath + '/LsylTask/issueList',
        page: true,
        height: "full-100",
        cellMinWidth: 120,
        cols: VerificationTask.initColumn()
    });

    // 搜索按钮点击事件
    $('.icon-btn').click(function () {
        VerificationTask.search();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        VerificationTask.jumpAddPage();

    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        VerificationTask.Reset();
        return false;
    });

    // 导出excel
    $('#btnExp').click(function () {
        VerificationTask.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + VerificationTask.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            VerificationTask.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            VerificationTask.onDeleteItem(data);
        } else if (layEvent === 'distr') {
            VerificationTask.onDistribute(data);
        } else if (layEvent === 'check') {
            VerificationTask.onCheck(data);
        }
    });
});