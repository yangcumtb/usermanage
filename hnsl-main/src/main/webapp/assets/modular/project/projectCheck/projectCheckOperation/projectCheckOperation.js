layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 管理
     */
    var ProjectCheckOperation = {
        tableId: "projectCheckOperationTable"
    };

    /**
     * 初始化表格的列
     */
    ProjectCheckOperation.initColumn = function () {
        return [[
            {fixed: 'left',type: 'checkbox',sort: true},
            {fixed:'left',field: 'czbh', hide: true, title: ''},
            {fixed:'left',field: 'shi', sort: true, title: '提交单位所在市'},
            {field: 'xian', sort: true, title: '提交单位所在县'},
            {field: 'xmmc', sort: true, title: '该项目名称'},
            {
                field: 'xmlx', sort: true, title: '项目类型', templet: function (d) {
                    if (d.xmlx == "1") {
                        return "生产项目";
                    } else {
                        return "建设项目";
                    }
                }
            },
            {
                field: 'shlx', sort: true, title: '审核类型', templet: function (d) {
                    if (d.shlx == "1") {
                        return "初审";
                    } else {
                        return "终审";
                    }
                }
            },
            {field: 'falj', sort: true, title: '上传项目书的存储路径'},
            {field: 'yjlj', sort: true, title: '上传初审意见书的存储路径'},
            {
                field: 'tj', sort: true, title: '县级提交', templet: function (d) {
                    if (d.tj == "1") {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
            {
                field: 'csh', sort: true, title: '市级审核：待审核、已通过、未通过', templet: function (d) {
                    if (d.csh == "1") {
                        return "待审核";
                    } else if (d.csh == "2") {
                        return "已通过";
                    } else {
                        return "未通过";
                    }
                }
            },
            {
                field: 'psh', sort: true, title: '省级审核', templet: function (d) {
                    if (d.psh == "1") {
                        return "待审核";
                    } else if (d.psh == "2") {
                        return "已通过";
                    } else {
                        return "未通过";
                    }
                }
            },
            {field: 'bhyj', sort: true, title: '驳回意见'},
            {fixed:'right',align: 'center', toolbar: '#tableBar', title: '操作',width: 120}
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
    ProjectCheckOperation.search = function () {
        var queryData = {};


        table.reload(ProjectCheckOperation.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    ProjectCheckOperation.openAddDlg = function () {
        func.open({
            title: '添加',
            content: Feng.ctxPath + '/project/check/add',
            area:['1050px','600px'],
            tableId: ProjectCheckOperation.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    ProjectCheckOperation.openEditDlg = function (data) {
        func.open({
            title: '修改',
            content: Feng.ctxPath + '/project/check/edit?czbh=' + data.czbh,
            tableId: ProjectCheckOperation.tableId
        });
    };


    /**
     * 导出excel按钮
     */
    ProjectCheckOperation.exportExcel = function () {
        var checkRows = table.checkStatus(ProjectCheckOperation.tableId);
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
    ProjectCheckOperation.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/project/check/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(ProjectCheckOperation.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("czbh", data.czbh);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + ProjectCheckOperation.tableId,
        url: Feng.ctxPath + '/project/check/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: ProjectCheckOperation.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        ProjectCheckOperation.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        ProjectCheckOperation.openAddDlg();

    });

    // 导出excel
    $('#btnExp').click(function () {
        ProjectCheckOperation.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + ProjectCheckOperation.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            ProjectCheckOperation.openEditDlg(data);
        } else if (layEvent === 'delete') {
            ProjectCheckOperation.onDeleteItem(data);
        }
    });
});
