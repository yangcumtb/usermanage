layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 短信发送记录管理
     */
    var Sms = {
        tableId: "smsTable"
    };

    /**
     * 初始化表格的列
     */
    Sms.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'smsId', hide: true, title: '主键'},
            {field: 'phoneNumber', sort: true, title: '手机号'},
            {field: 'content', sort: true, title: '短信内容'},
            {field: 'bizType', sort: true, title: '业务类型'},
            {field: 'smsNum', sort: true, title: '短信数量'},
            {field: 'statusFlag', sort: true, title: '发送状态'},
            {field: 'source', sort: true, title: '来源'},
            {field: 'createTime', sort: true, title: '发送时间'},
            {field: 'createUser', sort: true, title: '发送人'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Sms.search = function () {
        var queryData = {};


        table.reload(Sms.tableId, {
            where: queryData, page: {curr: 1}
        });
    };


    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Sms.tableId,
        url: Feng.ctxPath + '/sms/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: Sms.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Sms.search();
    });

    // 工具条点击事件
    table.on('tool(' + Sms.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
    });
});
