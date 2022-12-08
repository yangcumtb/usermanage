layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 在线用户记录管理
     */
    var SysUserOnline = {
        tableId: "sysUserOnlineTable"
    };

    /**
     * 初始化表格的列
     */
    SysUserOnline.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'sessionId', hide: true, title: '用户会话id'},
            {field: 'loginName', sort: true, title: '登录账号'},
            {field: 'deptName', sort: true, title: '部门名称'},
            {field: 'ipaddr', sort: true, title: '登录IP地址'},
            {field: 'loginLocation', sort: true, title: '登录地点'},
            {field: 'startTimestamp', sort: true, title: 'session创建时间'},
            {field: 'lastAccessTime', sort: true, title: 'session最后访问时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    SysUserOnline.search = function () {
        var queryData = {};
        queryData['loginName'] = $("#loginName").val();

        table.reload(SysUserOnline.tableId, {
            where: queryData, page: {curr: 1}
        });
    };



    // 渲染表格
    var tableResult = table.render({
        elem: '#' + SysUserOnline.tableId,
        url: Feng.ctxPath + '/system/online/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: SysUserOnline.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        SysUserOnline.search();
    });

    SysUserOnline.forceExist = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/system/online/forceExist",'post', function () {
                table.reload(SysUserOnline.tableId);
                Feng.success("强退成功!");
            }, function (data) {
                Feng.error("强退失败!" + data.message + "!");
            });
            ajax.set("sessionId", data.sessionId);
            ajax.start();
        };
        Feng.confirm("是否强退用户" + data.loginName + "?", operation);
    };


    // 工具条点击事件
    table.on('tool(' + SysUserOnline.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'forceExist') {
            SysUserOnline.forceExist(data);
        }
    });
});
