layui.use(['layer', 'table', 'HttpRequest', 'laydate'], function () {
    var $ = layui.$;
    var HttpRequest = layui.HttpRequest;
    var layer = layui.layer;
    var table = layui.table;
    var laydate = layui.laydate;

    /**
     * 系统管理--操作日志
     */
    var LoginLog = {
        tableId: "logTable"   //表格id
    };

    /**
     * 初始化表格的列
     */
    LoginLog.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'operationLogId', hide: true, sort: true, title: 'id'},
            {field: 'title', align: "center", sort: true, width: 300, title: '系统模块'},
            {field: 'businessType', align: "center", sort: true, title: '操作类型', width: 100, templet: '#typeTpl'},
            {field: 'method', align: "center", sort: true, title: '请求方式'},
            {field: 'operName', align: "center", sort: true, title: '操作人员'},
            {field: 'deptName', align: "center", sort: true, title: '所属部门'},
            {field: 'operIp', align: "center", sort: true, title: '操作地址'},
            {field: 'operLocation', align: "center", sort: true, title: '操作地点'},
            {field: 'status', align: "center", sort: true, title: '操作状态', width: 100, templet: '#statusTpl'},
            {field: 'operTime', align: "center", sort: true, title: '操作日期'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 100}
        ]];
    };

    /**
     * 点击查询按钮
     */
    LoginLog.search = function () {
        var queryData = {};
        queryData['beginTime'] = $("#beginTime").val();
        queryData['endTime'] = $("#endTime").val();
        queryData['title'] = $("#title").val();
        queryData['operName'] = $("#operName").val();
        queryData['businessType'] = $("#businessType").val();
        queryData['status'] = $("#status").val();
        table.reload(LoginLog.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 导出excel按钮
     */
    LoginLog.exportExcel = function () {
        var checkRows = table.checkStatus(LoginLog.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 日志详情
     */
    LoginLog.logDetail = function (param) {
        layer.open({
            title: "日志详情",
            type: 2,
            skin: 'layui-layer-rim', //加上边框
            area: ['950px', '600px'], //宽高
            content: Feng.ctxPath + '/system/log/detail/' + param.operationLogId
        });
    };

    /**
     * 清空日志
     */
    LoginLog.cleanLog = function () {
        Feng.confirm("是否清空所有日志?", function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/system/log/delLog",'post', function (data) {
                Feng.success("清空日志成功!");
                LoginLog.search();
            }, function (data) {
                Feng.error("清空日志失败!");
            });
            ajax.start();
        });
    };

    //渲染时间选择框
    laydate.render({
        elem: '#beginTime'
    });

    //渲染时间选择框
    laydate.render({
        elem: '#endTime'
    });

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + LoginLog.tableId,
        url: Feng.ctxPath + '/system/log/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: LoginLog.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        LoginLog.search();
    });

    // 搜索按钮点击事件
    $('#btnClean').click(function () {
        LoginLog.cleanLog();
    });

    // 工具条点击事件
    table.on('tool(' + LoginLog.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'detail') {
            LoginLog.logDetail(data);
        }
    });
});
