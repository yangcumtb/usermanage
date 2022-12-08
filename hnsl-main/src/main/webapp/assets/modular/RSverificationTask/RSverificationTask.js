layui.use(['table', 'layarea', 'admin', 'form', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;
    var layarea = layui.layarea;

    /**
     *
     * 遥感解译任务管理
     */
    var RSverificationTask = {
        tableId: "RSverificationTaskTable",
        queryData: {}
    };
    layarea.render({
        elem: '#area',
        change: function (res) {
            //选择结果
            RSverificationTask.queryData.xzs = res.xzs;
            RSverificationTask.queryData.xzx = res.xzx;
        }
    });
    /**
     * 初始化表格的列
     */
    RSverificationTask.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'id', title: '任务编号', hide: true},
            {field: 'spottableId', fixed: 'left', title: '图斑编号', width: 300},
            {field: 'xzs', sort: true, title: '所在地市'},
            {field: 'xzx', sort: true, title: '所在区县'},
            {
                field: 'tbtype', sort: true, title: '图斑类型', width: 180, templet: function (d) {
                    return "遥感动态监测图斑"
                }
            },
            {
                field: 'hcnr', sort: true, title: '核查内容', width: 180, templet: function (d) {
                    if (d.hcnr == 1) {
                        return "损毁图斑的损毁情况"
                    } else if (d.hcnr == 2) {
                        return "复垦图斑的复垦情况"
                    } else if (d.hcnr == 4) {
                        return "遥感图斑实际情况"
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

    form.on('select(tbtype)', function (data) {
        if (data.value == 1) {
            $("#a").css("display", "none");
            $("#b").css("display", "none");
            $("#c").css("display", "none");
            $("#d").css("display", "none");
        }
        if (data.value == 2) {
            $("#a").css("display", "");
            $("#b").css("display", "none");
            $("#c").css("display", "");
            $("#d").css("display", "none");
        }
        if (data.value == 3) {
            $("#a").css("display", "");
            $("#b").css("display", "none");
            $("#c").css("display", "");
            $("#d").css("display", "none");
        }
        if (data.value == 4) {
            $("#a").css("display", "none");
            $("#b").css("display", "");
            $("#c").css("display", "");
            $("#d").css("display", "none");
        }
        if (data.value == 5) {
            $("#a").css("display", "");
            $("#b").css("display", "none");
            $("#c").css("display", "");
            $("#d").css("display", "");
        }
    })
    /**
     * 点击查询按钮
     */
    RSverificationTask.search = function () {
        RSverificationTask.queryData.xzs = $("#xzs").val();
        RSverificationTask.queryData.xzx = $("#xzx").val();
        // RSverificationTask.queryData.tbtype = $("#tbtype").val();
        // RSverificationTask.queryData.hcnr = $("#hcnr").val();
        // RSverificationTask.queryData.taskStatus = $("#taskStatus").val();
        RSverificationTask.queryData.spottableId = $("#spottableId").val();
        // RSverificationTask.queryData.sukq = $("#sukq").val();
        table.reload(RSverificationTask.tableId, {
            where: RSverificationTask.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    RSverificationTask.Reset = function () {
        $("#xzs").val(null);
        $("#xzx").val(null);
        $("#tbtype").val(null);
        $("#hcnr").val(null);
        $("#taskStatus").val(null);
        $("#spottableId").val(null);
        $("#sukq").val(null);
        RSverificationTask.search();
        form.render();
        table.reload(RSverificationTask.tableId);

    };

    /**
     * 跳转到添加页面
     */
    RSverificationTask.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/RSverificationTask/add'
    };

    // /**
    //  * 跳转到编辑页面
    //  *
    //  * @param data 点击按钮时候的行数据
    //  */
    // VerificationTask.jumpEditPage = function (data) {
    //     window.location.href = Feng.ctxPath + '/verification/verificationTask/edit?id=' + data.id
    // };

    /**
     * 导出excel按钮
     */
    RSverificationTask.exportExcel = function () {
        var checkRows = table.checkStatus(RSverificationTask.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 批量下发功能
     */
    RSverificationTask.batchdistribute = function () {

        var checkRows = table.checkStatus(RSverificationTask.tableId);
        console.log(checkRows);
        console.log(checkRows.data);
        console.log(checkRows.data.length);
        if (checkRows.data.length === 1) {
            func.open({
                width: "1000rem",
                title: '外业核查任务下发',
                content: Feng.ctxPath + '/RSverification/RSverificationTask/distributeHtml?id=' + data.id,
                tableId: RSverificationTask.tableId,

            })
        } else {
            var taskkey = '';
            for (let i = 0; i < checkRows.data.length; i++) {
                taskkey = taskkey + checkRows.data[i].id + ',';
            }
            console.log(taskkey);
            func.open({
                width: "1000rem",
                title: '外业核查任务下发',
                content: Feng.ctxPath + '/RSverification/RSverificationTask/distributeHtml?id=' + taskkey,
                tableId: RSverificationTask.tableId,

            })
        }
    }

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    RSverificationTask.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/RSverification/RSverificationTask/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(RSverificationTask.tableId);
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
    RSverificationTask.jumpEditPage = function (data) {

        func.open({
            width: "1000rem",
            title: '查看详细',
            content: Feng.ctxPath + '/RSverification/RSverificationTask/detailHtml?id=' + data.id,
            tableId: RSverificationTask.tableId,
        })
    }
    /**
     *点击下发按钮
     * @param data
     */
    RSverificationTask.onDistribute = function (data) {
        console.log(data);
        func.open({
            width: "1000rem",
            title: '外业核查任务下发',
            content: Feng.ctxPath + '/RSverification/RSverificationTask/distributeHtml?id=' + data.id,
            tableId: RSverificationTask.tableId,

        })
    }
    // 渲染表格
    var tableResult = table.render({
        elem: '#' + RSverificationTask.tableId,
        url: Feng.ctxPath + '/RSverification/RSverificationTask/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols:RSverificationTask.initColumn()
    });

    // 搜索按钮点击事件
    $('.icon-btn').click(function () {
        RSverificationTask.search();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        RSverificationTask.jumpAddPage();

    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        RSverificationTask.Reset();
        return false;
    });

    // 导出excel
    $('#btnExp').click(function () {
        RSverificationTask.exportExcel();
    });

    //批量下发
    $('#btnBatch').click(function () {
        RSverificationTask.batchdistribute();
    });

    // 工具条点击事件
    table.on('tool(' + RSverificationTask.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            RSverificationTask.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            RSverificationTask.onDeleteItem(data);
        } else if (layEvent === 'distr') {
            RSverificationTask.onDistribute(data);
        }
    });
});
