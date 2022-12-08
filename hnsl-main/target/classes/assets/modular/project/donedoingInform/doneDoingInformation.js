layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 管理
     */
    var DoneDoingInformation = {
        tableId: "doneDoingInformationTable"
    };

    /**
     * 初始化表格的列
     */
    DoneDoingInformation.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'xmmc', hide: true, title: '项目名称'},
            {field: 'xjdw', sort: true, title: '提交下级单位'},
            {
                field: 'xmlx', sort: true, title: '项目类型', templet: function (d) {
                    if (d.xmlx == "1") {
                        return "生产项目";
                    } else  {
                        return "建设项目";
                    }
                }
            },
            {
                field: 'shlx', sort: true, title: '审核类型', templet: function (d) {
                    if (d.shlx == "1") {
                        return "初审";
                    } else  {
                        return "终审";
                    }
                }
            },
            {align: 'center', toolbar: '#tableBar', title: '操作'}
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
    DoneDoingInformation.search = function () {
        var queryData = {};

        queryData['xmmc'] = $('#xmmc').val();
        queryData['xjdw'] = $('#xjdw').val();
        queryData['xmlx'] = $('#xmlx').val();
        queryData['shlx'] = $('#shlx').val();

        table.reload(DoneDoingInformation.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    DoneDoingInformation.openAddDlg = function () {
        func.open({
            title: '添加',
            content: Feng.ctxPath + '/done/doing/add',
            tableId: DoneDoingInformation.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    DoneDoingInformation.jumpEditPage = function (data) {
        func.open({
            title: '修改',
            content: Feng.ctxPath + '/done/doing/edit?xmmc=' + data.xmmc,
            tableId: DoneDoingInformation.tableId
        });
    };


    /**
     * 导出excel按钮
     */
    DoneDoingInformation.exportExcel = function () {
        var checkRows = table.checkStatus(DoneDoingInformation.tableId);
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
    DoneDoingInformation.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/done/doing/delete",'post', function (data) {
                Feng.success("删除成功!");
                table.reload(DoneDoingInformation.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("xmmc", data.xmmc);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + DoneDoingInformation.tableId,
        url: Feng.ctxPath + '/done/doing/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: DoneDoingInformation.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        DoneDoingInformation.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        DoneDoingInformation.openAddDlg();

    });

    // 导出excel
    $('#btnExp').click(function () {
        DoneDoingInformation.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + DoneDoingInformation.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            DoneDoingInformation.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            DoneDoingInformation.onDeleteItem(data);
        }
    });
});