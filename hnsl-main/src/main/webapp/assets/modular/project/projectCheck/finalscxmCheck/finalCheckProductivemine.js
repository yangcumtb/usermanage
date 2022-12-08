var FinalCheckProductivemineCopy1InfoDlg = {
    data: {
        id: "",
        projectType: "",
        projectAssessNode: "",
        createTime: "",
        updateTime: "",
        createUser: "",
        updateUser: "",
        xmmc: "",
        scdw: "",
        dwdz: "",
        xkz: "",
        nx: "",
        xkzqk: "",
        shi: "",
        xian: "",
        wz: "",
        kz: "",
        kqgm: "",
        zycl: "",
        kqmj: "",
        scnl: "",
        kfx: "",
        kfy: "",
        ywr: "",
        bzdw: "",
        bzdwdz: "",
        frdb: "",
        fkjf: "",
        sxsj: "",
        dqsj: "",
        fwnx: "",
        psjd: "",
        psbhjd: "",
        pssjXs: "",
        pssjXf: "",
        pssjC: "",
        pssjS: "",
        tjlx: "",
    }
};
layui.use(['table', 'admin', 'HttpRequest', 'func', 'form'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;

    /**
     * 管理
     */
    var FinalCheckProductivemine = {
        tableId: "finalCheckProductivemineTable",
        queryData: {}
    };

    /**
     * 初始化表格的列
     */
    FinalCheckProductivemine.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'id', hide: true, title: ''},
            {field: 'xmmc', sort: true, title: '生产项目名称', fixed: 'left', width: 180},
            {
                field: 'kqgm', sort: true, title: '主管部门', templet: function (pro) {
                        if (pro.kqgm==="1" || pro.kqgm==="2"){
                            return "市管";
                        }else if (pro.kqgm==="3"){
                            return "省管";
                        }else {
                            return "省管"
                        }
                }
            },
            {
                field: 'tjlx', sort: true, title: '提交类型', templet: function (d) {
                    if (d.tjlx == 0) {
                        return "初审"
                    } else if (d.tjlx == 1) {
                        return "终审"
                    } else {
                        return "数据错误"
                    }
                }
            },
            {
                field: 'psjd', sort: true, title: '审批进展', templet: function (pro) {
                    var item = pro.psjd;
                    if (item == 1) {
                        return "县级提交"
                    } else if (item == 2) {
                        return "县级终审"
                    } else if (item == 3) {
                        return "市级审批"
                    } else if (item == 4) {
                        return "省级审批"
                    } else if (item == 5) {
                        return "已入库"
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
    FinalCheckProductivemine.search = function () {
        FinalCheckProductivemine.queryData.xmmc = $("#xmmc").val();
        FinalCheckProductivemine.queryData.scdw = $("#scdw").val();
        FinalCheckProductivemine.queryData.bzdw = $("#bzdw").val();
        FinalCheckProductivemine.queryData.xkz = $("#xkz").val();
        FinalCheckProductivemine.queryData.kqgm = $("#kqgm").val();
        FinalCheckProductivemine.queryData.xkzqk = $("#xkzqk").val();
        FinalCheckProductivemine.queryData.ywr = $("#ywr").val();
        table.reload(FinalCheckProductivemine.tableId, {
            where: FinalCheckProductivemine.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    FinalCheckProductivemine.Reset = function () {
        $("#xmmc").val('');
        $("#scdw").val('');
        $("#bzdw").val('');
        $("#xkz").val('');
        $("#kqgm").val('');
        $("#xkzqk").val('');
        $("#ywr").val('');
        FinalCheckProductivemine.search();
        form.render();
        table.reload(FinalCheckProductivemine.tableId);

    };

    /**
     * 弹出添加对话框
     */
    FinalCheckProductivemine.openAddDlg = function () {
        func.open({
            width: "1000rem",
            title: '添加',
            content: Feng.ctxPath + '/productivemineCheck/final/add',
            tableId: FinalCheckProductivemine.tableId,
            //area: ['1050px', '1000px'],
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    FinalCheckProductivemine.openEditDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '修改',
            content: Feng.ctxPath + '/productivemineCheck/final/edit?id=' + data.id,
            tableId: FinalCheckProductivemine.tableId,
            //area: ['80%', '80%'],
        });
    };


    /**
     * 导出excel按钮
     */
    FinalCheckProductivemine.exportExcel = function () {
        var checkRows = table.checkStatus(FinalCheckProductivemine.tableId);
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
    FinalCheckProductivemine.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(FinalCheckProductivemine.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };
    /**
     * 点击查看详情按钮
     * @param data
     */
    FinalCheckProductivemine.onDetail = function (data) {
        func.open({
            width: "1000rem",
            title: '查看详情',
            content: Feng.ctxPath + '/productivemineCheck/final/detailHtml?id=' + data.id,
            tableId: FinalCheckProductivemine.tableId,
            //area: ['1050px', '1000px'],
        });
    }
    /**
     * 点击查看审批按钮
     * @param data
     */
    FinalCheckProductivemine.onCheck = function (data) {
        func.open({
            width: "1000rem",
            title: '审批',
            content: Feng.ctxPath + '/productivemineCheck/final/check?id=' + data.id,
            tableId: FinalCheckProductivemine.tableId,
            //area: ['1050px', '1000px'],
        });
    }

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + FinalCheckProductivemine.tableId,
        url: Feng.ctxPath + '/productivemineCheck/final/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: FinalCheckProductivemine.initColumn()
    });

    // 搜索按钮点击事件
    $(".icon-btn").click(function () {
        FinalCheckProductivemine.search();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        FinalCheckProductivemine.openAddDlg();

    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        FinalCheckProductivemine.Reset();
        return false;
    });

    // 导出excel
    $('#btnExp').click(function () {
        FinalCheckProductivemine.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + FinalCheckProductivemine.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            FinalCheckProductivemine.openEditDlg(data);
        } else if (layEvent === 'delete') {
            FinalCheckProductivemine.onDeleteItem(data);
        } else if (layEvent === 'detail') {
            FinalCheckProductivemine.onDetail(data);
        } else if (layEvent === 'check') {
            FinalCheckProductivemine.onCheck(data);
        }
    });
});