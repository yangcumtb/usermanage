layui.use(['table', 'form', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var form = layui.form;
    var func = layui.func;

    /**
     * 复垦方案表管理
     */
    var AdmReclaimProject = {
        tableId: "admReclaimProjectTable",
        queryData: {}
    };
    var ProjectTableJsxm = {
        tableId: "ProjectTableJsxm",
        queryData: {}
    }
    var ProjectTableScxm = {
        tableId: "ProjectTableScxm",
        queryData: {}
    }
    /**
     * 初始化表格的列
     */
    ProjectTableScxm.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'id', hide: true, title: '项目编号', fixed: 'left', width: 180},
            {field: 'xmmc', sort: true, title: '项目名称', fixed: 'left', width: 150},
            {
                field: 'psbhjd', width: 200, sort: true, title: '初审驳回节点', templet: function (pro) {
                    var item = pro.psbhjd;
                    if (item == 1) {
                        return "县级审核驳回"
                    } else if (item == 3) {
                        return "市级审核驳回"
                    } else if (item == 4) {
                        return "省级审核驳回"
                    } else if (item == 5) {
                        return "省级审核通过（已入库）"
                    } else {
                        return "审核中"
                    }
                }
            },
            {
                field: 'psjd', sort: true, title: '终审审批进展', templet: function (pro) {
                    var item = pro.psjd;
                    if (item == 1) {
                        return "县级初审"
                    } else if (item == 2) {
                        return "县级终审"
                    } else if (item == 3) {
                        return "市级审批"
                    } else if (item == 4) {
                        return "省级审批"
                    } else if (item == 5) {
                        return "已入库"
                    } else {
                        return "数据错误"
                    }

                }
            },
            // {field: 'pssjXs', sort: true, title: '县级重审时间'},
            {
                field: 'pssjXf', sort: true, title: '县终审时间', width: 150, templet: function (a) {
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
                    if (a.pssjXs != null) {
                        var b = a.pssjXs.substring(0, 10);
                        return b
                    } else {
                        var c = '/';
                        return c
                    }
                }
            },
            {toolbar: '#tableBar', title: '操作', align: 'center', fixed: 'right', width: 300}
        ]];
    };
    ProjectTableJsxm.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'id', hide: true, title: '项目编号', fixed: 'left', width: 180},
            {field: 'xmmc', sort: true, title: '项目名称', fixed: 'left', width: 150},
            {
                field: 'psbhjd', width: 200, sort: true, title: '初审驳回节点', templet: function (pro) {
                    var item = pro.psbhjd;
                    if (item == 1) {
                        return "县级审核驳回"
                    } else if (item == 3) {
                        return "市级审核驳回"
                    } else if (item == 4) {
                        return "省级审核驳回"
                    } else if (item == 5) {
                        return "省级审核通过（已入库）"
                    } else {
                        return "审核中"
                    }
                }
            },
            {
                field: 'psjd', sort: true, title: '终审审批进展', templet: function (pro) {
                    var item = pro.psjd;
                    if (item == 1) {
                        return "县级初审"
                    } else if (item == 2) {
                        return "县级终审"
                    } else if (item == 3) {
                        return "市级审批"
                    } else if (item == 4) {
                        return "省级审批"
                    } else if (item == 5) {
                        return "已入库"
                    } else {
                        return "数据错误"
                    }

                }
            },
            // {field: 'pssjXs', sort: true, title: '县级重审时间'},
            {
                field: 'pssjXf', sort: true, title: '县终审时间', width: 150, templet: function (a) {
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
                    if (a.pssjXs != null) {
                        var b = a.pssjXs.substring(0, 10);
                        return b
                    } else {
                        var c = '/';
                        return c
                    }
                }
            },
            {toolbar: '#tableBar', title: '操作', align: 'center', fixed: 'right', width: 300}
        ]];
    };
    AdmReclaimProject.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'id', hide: true, title: '项目编号', fixed: 'left', width: 180},
            {field: 'xmmc', sort: true, title: '项目名称', fixed: 'left', width: 150},
            {
                field: 'psbhjd', width: 200, sort: true, title: '初审驳回节点', templet: function (pro) {
                    var item = pro.psbhjd;
                    if (item == 1) {
                        return "县级审核驳回"
                    } else if (item == 3) {
                        return "市级审核驳回"
                    } else if (item == 4) {
                        return "省级审核驳回"
                    } else if (item == 5) {
                        return "省级审核通过（已入库）"
                    } else {
                        return "审核中"
                    }
                }
            },
            {
                field: 'psjd', sort: true, title: '终审审批进展', templet: function (pro) {
                    var item = pro.psjd;
                    if (item == 1) {
                        return "县级初审"
                    } else if (item == 2) {
                        return "县级终审"
                    } else if (item == 3) {
                        return "市级审批"
                    } else if (item == 4) {
                        return "省级审批"
                    } else if (item == 5) {
                        return "已入库"
                    } else {
                        return "数据错误"
                    }

                }
            },
            // {field: 'pssjXs', sort: true, title: '县级重审时间'},
            {
                field: 'pssjXf', sort: true, title: '县终审时间', width: 150, templet: function (a) {
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
                    if (a.pssjXs != null) {
                        var b = a.pssjXs.substring(0, 10);
                        return b
                    } else {
                        var c = '/';
                        return c
                    }
                }
            },
            {toolbar: '#tableBar', title: '操作', align: 'center', fixed: 'right', width: 300}
        ]];
    };

    /**
     * 点击查询按钮
     */
    AdmReclaimProject.search = function (data) {
        // var queryData = {};
        //
        // AdmReclaimProject.queryData.xmmc = $("#xmmc").val();
        // table.reload(AdmReclaimProject.tableId, {
        //     where: queryData, page: {curr: 1}
        // });
        // if( data == "" || data == undefined){
        //     var queryData = {};
        //     console.log(data);
        //     table.reload(AdmReclaimProject.tableId, {
        //         where: queryData, page: {curr: 1}
        //     });
        // }else {
        var tableResult = table.render({
            elem: '#' + AdmReclaimProject.tableId,
            url: Feng.ctxPath + '/project/projectAssess/search?xmmc=' + data,
            page: true,
            height: "full-100",
            cellMinWidth: 100,
            cols: AdmReclaimProject.initColumn()
        });
        // }
    };

    /**
     * 点击重置按钮
     */
    AdmReclaimProject.Reset = function () {
        $('#xmmc').val("");
        form.render();
        var xmmc = "";
        AdmReclaimProject.search(xmmc);
    };
    /**
     * 弹出添加对话框
     */
    AdmReclaimProject.openAddDlg = function () {
        func.open({
            title: '添加生产项目评审方案',
            content: Feng.ctxPath + '/productivemineCheck/final/add',
            tableId: AdmReclaimProject.tableId,
            area: ['1500px', '90%'],
        });
    };
    AdmReclaimProject.openAddDlg2 = function () {
        func.open({
            title: '添加建设项目评审方案',
            content: Feng.ctxPath + '/jsxmCheck/final/add',
            tableId: AdmReclaimProject.tableId,
            area: ['1500px', '90%'],
        });
    };
    /**
     * 点击送审
     *
     * @param data 点击按钮时候的行数据
     */
    // var curProjectType = $("#projectType").val();
    // form.on('select(projectType)', function (data) {
    //     curProjectType = data.value;
    // });

    AdmReclaimProject.openEditDlg = function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/detail?id=" + data.id);
        var result = ajax.start();
        console.log(result.data);
        if (result.data != null) {
            func.open({
                width: "1000rem",
                title: '建设项目方案送审',
                content: Feng.ctxPath + '/jsxmCheck/final/re_check?id=' + data.id,
                tableId: AdmReclaimProject.tableId
            });
        } else {
            func.open({
                width: "1000rem",
                title: '生产矿山项目送审',
                content: Feng.ctxPath + '/productivemineCheck/final/re_check?id=' + data.id,
                tableId: AdmReclaimProject.tableId
            });
        }
    };
    AdmReclaimProject.onDetailItem = function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/detail?id=" + data.id);
        var result = ajax.start();
        console.log(result.data);
        if (result.data != null) {
            func.open({
                width: "1000rem",
                title: '建设项目方案详情',
                content: Feng.ctxPath + '/jsxmCheck/final/detailHtml?id=' + data.id,
                tableId: AdmReclaimProject.tableId
            });
        } else {
            func.open({
                width: "1000rem",
                title: '生产矿山项目详情',
                content: Feng.ctxPath + '/productivemineCheck/final/detailHtml?id=' + data.id,
                tableId: AdmReclaimProject.tableId
            });
        }
    };

    /**
     * 导出excel按钮
     */
    AdmReclaimProject.exportExcel = function () {
        var checkRows = table.checkStatus(AdmReclaimProject.tableId);
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
    AdmReclaimProject.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/delete?id=" + data.id, 'post', function (data) {
                // Feng.success("删除成功!");
                table.reload(AdmReclaimProject.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");

            });
            var ajax2 = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/delete?id=" + data.id, 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(AdmReclaimProject.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set();
            ajax.start();
            ajax2.set();
            ajax2.start();
        };
        Feng.confirm("是否删除?", operation);
    };
    ProjectTableScxm.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/delete?id=" + data.id, 'post', function (data) {
                // Feng.success("删除成功!");
                table.reload(ProjectTableScxm.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");

            });
            ajax.set();
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + AdmReclaimProject.tableId,
        url: Feng.ctxPath + '/project/projectAssess/list?xmlx=' + 0,
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: AdmReclaimProject.initColumn()
    });
    var tableResult2 = table.render({
        elem: '#' + ProjectTableJsxm.tableId,
        url: Feng.ctxPath + '/project/projectAssess/list?xmlx=' + 1,
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: ProjectTableJsxm.initColumn()
    });
    var tableResult3 = table.render({
        elem: '#' + ProjectTableScxm.tableId,
        url: Feng.ctxPath + '/project/projectAssess/list?xmlx=' + 2,
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: ProjectTableScxm.initColumn()
    });
    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        AdmReclaimProject.queryData.xmmc = $("#xmmc").val();
        var xmmc = AdmReclaimProject.queryData.xmmc;
        AdmReclaimProject.search(xmmc);
    });

    $('#btnReset').click(function () {
        AdmReclaimProject.Reset();
    });
    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        AdmReclaimProject.openAddDlg();

    });
    $('#btnAdd2').click(function () {

        AdmReclaimProject.openAddDlg2();

    });

    // 导出excel
    $('#btnExp').click(function () {
        AdmReclaimProject.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + AdmReclaimProject.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            AdmReclaimProject.openEditDlg(data);
        } else if (layEvent === 'delete') {
            AdmReclaimProject.onDeleteItem(data);
        } else if (layEvent === 'detail') {
            AdmReclaimProject.onDetailItem(data);
        }
    });
    table.on('tool(' + ProjectTableScxm.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            AdmReclaimProject.openEditDlg(data);
        } else if (layEvent === 'delete') {
            AdmReclaimProject.onDeleteItem(data);
        } else if (layEvent === 'detail') {
            AdmReclaimProject.onDetailItem(data);
        }
    });
    table.on('tool(' + ProjectTableJsxm.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            AdmReclaimProject.openEditDlg(data);
        } else if (layEvent === 'delete') {
            AdmReclaimProject.onDeleteItem(data);
        } else if (layEvent === 'detail') {
            AdmReclaimProject.onDetailItem(data);
        }
    });
});
