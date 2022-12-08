layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 系统消息管理
     */
    var SysMessage = {
        tableId: "sysMessageTable"
    };

    /**
     * 初始化表格的列
     */
    SysMessage.initColumn = function () {
        return [[
            {field: 'messageId', hide: true, title: '主键'},
            {field: 'messageTitle', sort: true, title: '标题'},
            {field: 'messageType', sort: true, title: '消息类型'},
            {field: 'sender', sort: true, title: '发布人'},
            {field: 'messageSendTime', sort: true, title: '发布时间'},
            {field: 'priorityLevel', sort: true, title: '优先级'},
            {field: 'readFlag', sort: true, title: '阅读状态'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    SysMessage.search = function () {
        var queryData = {};


        table.reload(SysMessage.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    SysMessage.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/sysMessage/add'
    };

    /**
    * 跳转到编辑页面
    *
    * @param data 点击按钮时候的行数据
    */
    SysMessage.jumpEditPage = function (data) {
        window.location.href = Feng.ctxPath + '/sysMessage/edit?messageId=' + data.messageId
    };

    /**
     * 导出excel按钮
     */
    SysMessage.exportExcel = function () {
        var checkRows = table.checkStatus(SysMessage.tableId);
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
    SysMessage.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/sysMessage/delete",'post', function (data) {
                Feng.success("删除成功!");
                table.reload(SysMessage.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("messageId", data.messageId);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + SysMessage.tableId,
        url: Feng.ctxPath + '/sysMessage/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: SysMessage.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        SysMessage.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

    SysMessage.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        SysMessage.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + SysMessage.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            SysMessage.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            SysMessage.onDeleteItem(data);
        }
    });
});
