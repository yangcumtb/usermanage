layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 新闻管理管理
     */
    var SysNews = {
        tableId: "sysNewsTable"
    };

    /**
     * 初始化表格的列
     */
    SysNews.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'newsId', hide: true, title: '主键'},
            {field: 'newsTitle', sort: true, title: '通知标题'},
            {field: 'newsType', sort: true, title: '新闻类型'},
            {field: 'newsThumb', sort: true, title: '缩略图'},
            {field: 'newsSummary', sort: true, title: '通知摘要'},
            {field: 'mainFileId', sort: true, title: '正文文件'},
            {field: 'attFileId', sort: true, title: '附件文件'},
            {field: 'createTime', sort: true, title: '创建时间'},
            {field: 'updateTime', sort: true, title: '修改时间'},
            {field: 'createUser', sort: true, title: '创建用户'},
            {field: 'updateUser', sort: true, title: '修改用户'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    SysNews.search = function () {
        var queryData = {};


        table.reload(SysNews.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    SysNews.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/system/news/add'
    };

    /**
    * 跳转到编辑页面
    *
    * @param data 点击按钮时候的行数据
    */
    SysNews.jumpEditPage = function (data) {
        window.location.href = Feng.ctxPath + '/system/news/edit?newsId=' + data.newsId
    };

    /**
     * 导出excel按钮
     */
    SysNews.exportExcel = function () {
        var checkRows = table.checkStatus(SysNews.tableId);
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
    SysNews.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/system/news/delete",'post', function (data) {
                Feng.success("删除成功!");
                table.reload(SysNews.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("newsId", data.newsId);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + SysNews.tableId,
        url: Feng.ctxPath + '/system/news/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: SysNews.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        SysNews.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

    SysNews.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        SysNews.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + SysNews.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            SysNews.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            SysNews.onDeleteItem(data);
        }
    });
});
