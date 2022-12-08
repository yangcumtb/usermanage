layui.use(['table', 'admin', 'HttpRequest', 'ztree', 'func', 'tree'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var $ZTree = layui.ztree;
    var func = layui.func;
    var tree = layui.tree;

    var DistributeTask = {
        tableId: "userTable",
        condition: {
            deptId: ""
        }
    };

    /**
     * 初始化表格的列
     */
    DistributeTask.initColumn = function () {
        return [[
            {field: 'deptId', hide: true, sort: true, title: '主键'},
            {field: 'userId', hide: true, sort: true, title: '用户id'},
            {field: 'account', align: "center", sort: true, title: '账户'},
            {field: 'name', align: "center", sort: true, title: '姓名'},
            {field: 'deptName', align: "center", sort: true, title: '部门', minWidth: 220},
            {field: 'phone', align: "center", sort: true, title: '手机', minWidth: 117},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 120}
        ]];
    };

    /**
     * 点击查询按钮
     */
    DistributeTask.search = function () {
        var queryData = {};
        queryData['deptId'] = DistributeTask.condition.deptId;
        queryData['name'] = $("#name").val();
        queryData['timeLimit'] = $("#timeLimit").val();
        queryData['deptType'] = "2";
        table.reload(DistributeTask.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 选择部门时
     */
    DistributeTask.onClickDistributeTask = function (obj) {
        DistributeTask.condition.deptId = obj.data.id;
        DistributeTask.search();
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + DistributeTask.tableId,
        url: Feng.ctxPath + '/system/user/outCheckList',
        where: {
            deptType: "2"
        },
        width: "600rem",
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: DistributeTask.initColumn()
    });

    /**
     * 左侧树加载
     */
    DistributeTask.loadDistributeTaskTree = function () {
        var ajax = new HttpRequest(Feng.ctxPath + "/system/dept/layuiTree", "get", function (data) {
            tree.render({
                elem: '#deptTree',
                data: data,
                click: DistributeTask.onClickDistributeTask,
                onlyIconControl: true
            });
        }, function (data) {
        });
        ajax.set("deptType", "2");
        ajax.start();
    };
    //初始化左侧部门树
    DistributeTask.loadDistributeTaskTree();
    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        DistributeTask.search();
    });


    // 工具条点击事件
    table.on('tool(' + DistributeTask.tableId + ')', function (obj) {
        var id = Feng.getUrlParam("id")
        var data = obj.data;
        var layEvent = obj.event;
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/verification/verificationTask/distribute", 'post', function () {
                admin.closeThisDialog();
                Feng.success("分配成功!");
                //传给上个页面，刷新table用
                admin.putTempData('formOk', true);
            }, function (data) {
                admin.closeThisDialog();
                Feng.error("分配失败!" + data.message + "!");
            });
            ajax.set({
                "id": id,
                "userId": data.userId,
                "deptId": data.deptId,
            });
            ajax.start();
        };
        if (layEvent === 'distributeTask') {
            Feng.confirm("是否把任务分配给用户:" + obj.data.name + "?", operation);
        }
    });
});

$(function () {
    var panehHidden = false;
    if ($(this).width() < 769) {
        panehHidden = true;
    }
    $('#myContiner').layout({initClosed: panehHidden, west__size: 260});
});