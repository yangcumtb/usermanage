layui.use(['table', 'admin', 'HttpRequest', 'func', 'dropdown', 'tree'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var tree = layui.tree;
    var dropdown = layui.dropdown;  // 加载模块

    /**
     * 行政区划管理
     */
    var BaseAdmin = {
        tableId: "baseAdminTable"
    };

    /**
     * 初始化表格的列
     */
    BaseAdmin.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'adCode', title: '政区编码'},
            {
                field: 'adName', sort: true, title: '政区名称', templet: function (d) {
                    if (d.hasUp == "1") {
                        return '<span class="layui-badge layui-badge_lg layui-badge-red" style="margin-right: 5px">辖</span>' + d.adName;
                    } else {
                        return d.adName;
                    }
                }
            },
            {field: 'adAbbrName', sort: true, title: '政区简称'},
            {field: 'adFullName', sort: true, title: '政区全称'},
            {field: 'upAdName', sort: true, title: '上级政区'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    BaseAdmin.search = function () {
        var queryData = {};

        queryData['adName'] = $('#adName').val();
        queryData['adCode'] = BaseAdmin.adCode;

        table.reload(BaseAdmin.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    BaseAdmin.openAddDlg = function () {
        func.open({
            width: "1000rem",
            title: '添加行政区划',
            content: Feng.ctxPath + '/base/baseAdmin/add',
            tableId: BaseAdmin.tableId,
            endCallback: function () {
                BaseAdmin.loadTree();
            }
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    BaseAdmin.openEditDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '修改行政区划',
            content: Feng.ctxPath + '/base/baseAdmin/edit?adCode=' + data.adCode,
            tableId: BaseAdmin.tableId,
            endCallback: function () {
                BaseAdmin.loadTree();
            }
        });
    };


    /**
     * 导出excel按钮
     */
    BaseAdmin.exportExcel = function () {
        var checkRows = table.checkStatus(BaseAdmin.tableId);
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
    BaseAdmin.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/base/baseAdmin/delete",'post', function (data) {
                Feng.success("删除成功!");
                table.reload(BaseAdmin.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("adCode", data.adCode);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };


    BaseAdmin.createDept = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/base/baseAdmin/createDept",'post', function (data) {
                Feng.success("创建成功!");
                table.reload(BaseAdmin.tableId);
            }, function (data) {
                Feng.error("创建失败!" + data.message + "!");
            });
            ajax.set("adCode", data.adCode);
            ajax.start();
        };
        Feng.confirm("一旦创建部门，政区部门信息将无法修改，请仔细核对??", operation);
    };

    /**
     * 选择部门时
     */
    BaseAdmin.onClickTree = function (obj) {
        BaseAdmin.adCode = obj.data.id;
        console.log(obj.data.id);
        BaseAdmin.search();
    };

    /**
     * 左侧树加载
     */
    BaseAdmin.loadTree = function () {
        var ajax = new HttpRequest(Feng.ctxPath + "/base/baseAdmin/layuiTree", 'get', function (data) {
            tree.render({
                elem: '#tree',
                data: data,
                click: BaseAdmin.onClickTree,
                onlyIconControl: true
            });
        }, function (data) {
        });
        ajax.start();
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + BaseAdmin.tableId,
        url: Feng.ctxPath + '/base/baseAdmin/list',
        page: true,
        height: "full-100",
        cellMinWidth: 120,
        cols: BaseAdmin.initColumn()
    });

    //初始化左侧部门树
    BaseAdmin.loadTree();

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        BaseAdmin.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        BaseAdmin.openAddDlg();

    });

    // 导出excel
    $('#btnExp').click(function () {
        BaseAdmin.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + BaseAdmin.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            BaseAdmin.openEditDlg(data);
        } else if (layEvent === 'delete') {
            if (data.hasDept == "1") {
                Feng.error("当前政区已创建河长机构完成，无法删除!");
            } else {
                BaseAdmin.onDeleteItem(data);
            }

        } else if (layEvent === 'createDept') {
            if (data.hasDept == "1") {
                Feng.error("当前政区的河长机构已创建完成，无需重复创建!");
            } else {
                BaseAdmin.createDept(data);
            }

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