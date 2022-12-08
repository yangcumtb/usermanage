layui.use(['layer', 'form', 'ztree', 'laydate', 'admin', 'HttpRequest', 'treeTable', 'func'], function () {
    var layer = layui.layer;
    var form = layui.form;
    var $ZTree = layui.ztree;
    var HttpRequest = layui.HttpRequest;
    var laydate = layui.laydate;
    var admin = layui.admin;
    var treeTable = layui.treeTable;
    var func = layui.func;

    //table的初始化实例
    var insTb;

    /**
     * 系统管理--菜单管理
     */
    var Menu = {
        tableId: "menuTable",    //表格id
        condition: {
            menuId: "",
            menuName: "",
            level: ""
        }
    };

    /**
     * 初始化表格的列
     */
    Menu.initColumn = function () {
        return [
            {type: 'numbers'},
            {field: 'menuName', align: "left", sort: true, title: '菜单名称', style: 'height:40px'},
            {field: 'perms', align: "center", sort: true, title: '权限标识'},
            {field: 'orderNum', align: "center", sort: true, title: '排序'},
            {
                field: 'menuType', align: "center", sort: true, title: '类型', templet: function (d) {
                    if (d.menuType === "M") {
                        return "目录";
                    } else if (d.menuType === "C") {
                        return "菜单";
                    } else {
                        return "功能";
                    }
                }
            },
            {
                field: 'visible', align: "center", sort: true, title: '状态', templet: function (d) {
                    if (d.visible === "0") {
                        return "显示";
                    } else {
                        return "隐藏";
                    }
                }
            },
            {align: 'center', toolbar: '#menuTableBar', title: '操作', minWidth: 200}
        ];
    };

    /**
     * 点击查询按钮
     */
    Menu.search = function () {
        var queryData = {};
        queryData['menuName'] = $("#menuName").val();
        queryData['level'] = $("#level").val();
        Menu.initTable(Menu.tableId, queryData);
        console.log(queryData);
    };

    /**
     * 弹出添加菜单对话框
     */
    Menu.openAddMenu = function () {
        func.open({
            width: "1000rem",
            title: '添加菜单',
            content: Feng.ctxPath + '/system/menu/menu_add',
            tableId: Menu.tableId,
            endCallback: function () {
                Menu.initTable(Menu.tableId);
            }
        });
    };

    /**
     * 点击编辑菜单按钮时
     *
     * @param data 点击按钮时候的行数据
     */
    Menu.onEditMenu = function (data) {
        func.open({
            width: "1000rem",
            title: '修改菜单',
            content: Feng.ctxPath + "/system/menu/menu_edit?menuId=" + data.menuId,
            tableId: Menu.tableId,
            endCallback: function () {
                Menu.initTable(Menu.tableId);
            }
        });
    };

    /**
     * 点击删除菜单按钮
     *
     * @param data 点击按钮时候的行数据
     */
    Menu.onDeleteMenu = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/system/menu/remove", 'post', function () {
                Feng.success("删除成功!");
                Menu.condition.menuId = "";
                Menu.initTable(Menu.tableId);
            }, function (xhr) {
                Feng.error("删除失败!" + xhr.responseJSON.message + "!");
            });
            ajax.set("menuId", data.menuId);
            ajax.start();
        };
        Feng.confirm("是否删除菜单:" + data.menuName + "?", operation);
    };

    /**
     * 初始化表格
     */
    Menu.initTable = function (menuId, reqData) {
        return treeTable.render({
            elem: '#' + menuId,
            tree: {
                iconIndex: 1,           // 折叠图标显示在第几列
                idName: 'menuId',         // 自定义id字段的名称
                pidName: 'parentId',       // 自定义标识是否还有子节点的字段名称
                haveChildName: 'haveChild',  // 自定义标识是否还有子节点的字段名称
                isPidData: true         // 是否是pid形式数据
            },
            page: true,
            height: "full-98",
            cellMinWidth: 100,
            cols: Menu.initColumn(),
            reqData: function (data, callback) {
                if (reqData === undefined) {
                    var ajax = new HttpRequest(Feng.ctxPath + '/system/menu/list', 'get', function (res) {
                        callback(res.data);
                    }, function (res) {
                        Feng.error("查询失败!" + res.responseJSON.message + "!");
                    });
                    ajax.setData(reqData);
                    ajax.start();
                } else {
                    var ajax1 = new HttpRequest(Feng.ctxPath + '/system/menu/search?menuName=' + reqData.menuName + "&level=" + reqData.level, 'POST', function (res) {
                        callback(res.data);
                    }, function (res) {
                        Feng.error("查询失败!" + res.responseJSON.message + "!");
                    });
                    // ajax1.setData(reqData);
                    ajax1.start();
                }
            }
        });
    };

    // 渲染表格
    insTb = Menu.initTable(Menu.tableId);
    $('#expandAll').click(function () {
        insTb.expandAll();
    });
    $('#foldAll').click(function () {
        insTb.foldAll();
    });

    //渲染时间选择框
    laydate.render({
        elem: '#timeLimit',
        range: true,
        max: Feng.currentDate()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Menu.search();
    });

    // 添加按钮点击事件
    $('#menuAdd').click(function () {
        Menu.openAddMenu();
    });

    // 工具条点击事件
    treeTable.on('tool(menuTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Menu.onEditMenu(data);
        } else if (layEvent === 'delete') {
            Menu.onDeleteMenu(data);
        }
    });

});
