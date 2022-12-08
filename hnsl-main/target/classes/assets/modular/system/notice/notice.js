layui.use(['layer', 'form', 'table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 系统管理--消息管理
     */
    var Notice = {
        tableId: "noticeTable"    //表格id
    };

    /**
     * 初始化表格的列
     */
    Notice.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'noticeId', align: "center", hide: true, sort: true, title: 'id'},
            {field: 'noticeTitle', align: "center", sort: true, title: '通知标题'},
            {field: 'noticeSummary', align: "center", sort: true, title: '通知摘要'},
            {field: 'noticeScope', align: "center", sort: true, title: '通知范围'},
            {field: 'sendUnit', align: "center", sort: true, title: '发布单位'},
            {field: 'createUser', align: "center", sort: true, title: '发布者'},
            {field: 'createTime', align: "center", sort: true, title: '创建时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 230}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Notice.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(Notice.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加通知
     */
    Notice.openAddNotice = function () {
        window.location.href = Feng.ctxPath + '/system/notice/add';
    };

    /**
     * 点击编辑通知
     *
     * @param data 点击按钮时候的行数据
     */
    Notice.onEditNotice = function (data) {
        window.location.href = Feng.ctxPath + "/system/notice/edit?noticeId=" + data.noticeId;
    };

    /**
     * 点击删除通知
     *
     * @param data 点击按钮时候的行数据
     */
    Notice.onDeleteNotice = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/system/notice/delete",'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Notice.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("noticeId", data.noticeId);
            ajax.start();
        };
        Feng.confirm("是否删除通知 " + data.title + "?", operation);
    };

    /**
     * 点击推送通知
     *
     * @param data 点击按钮时候的行数据
     */
    Notice.onPushNotice = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/system/notice/push",'post', function (data) {
                Feng.success("推送成功!");
                table.reload(Notice.tableId);
            }, function (data) {
                Feng.error("推送失败!" + data.message + "!");
            });
            ajax.set("noticeId", data.noticeId);
            ajax.start();
        };
        Feng.confirm("是否推送通知 " + data.title + "?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Notice.tableId,
        url: Feng.ctxPath + '/system/notice/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Notice.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Notice.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Notice.openAddNotice();
    });

    // 工具条点击事件
    table.on('tool(' + Notice.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Notice.onEditNotice(data);
        } else if (layEvent === 'delete') {
            Notice.onDeleteNotice(data);
        }else if (layEvent === 'push') {
            Notice.onPushNotice(data);
        }
    });
});
