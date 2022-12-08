layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 生产矿山一市一核查报告表管理
     */
    var Productivecheckreport = {
        tableId: "productivecheckreportTable"
    };

    /**
     * 初始化表格的列
     */
    Productivecheckreport.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left'},
            // {field: 'id', hide: true, title: 'id'},
            {field: 'xzs', sort: true, width: 150, title: '所在市', fixed: 'left'},
            {field: 'damagecount', width: 180, sort: true, title: '损毁图斑数量'},
            {field: 'damagearea', width: 180, sort: true, title: '损毁图斑面积(m²)'},
            {field: 'recoveredcount', width: 180, sort: true, title: '已修复图斑数量'},
            {field: 'recoveredarea', width: 180, sort: true, title: '已修复图斑面积(m²)'},
            {field: 'createTime', sort: true, width: 200, title: '数据创建时间'},
            {field: 'updateTime', sort: true, width: 200, title: '数据更新时间'},
            {align: 'center', toolbar: '#tableBar', width: 300, title: '操作', fixed: 'right'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Productivecheckreport.search = function () {
        var queryData = {};


        table.reload(Productivecheckreport.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    Productivecheckreport.openAddDlg = function () {
        func.open({
            title: '添加生产矿山一市一核查报告表',
            content: Feng.ctxPath + '/productivecheckreport/add',
            tableId: Productivecheckreport.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    Productivecheckreport.openEditDlg = function (data) {
        func.open({
            title: '修改生产矿山一市一核查报告表',
            content: Feng.ctxPath + '/productivecheckreport/edit?id=' + data.id,
            tableId: Productivecheckreport.tableId
        });
    };


    /**
     * 导出excel按钮
     */
    Productivecheckreport.exportExcel = function () {
        var checkRows = table.checkStatus(Productivecheckreport.tableId);
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
    Productivecheckreport.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/productivecheckreport/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Productivecheckreport.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Productivecheckreport.tableId,
        url: Feng.ctxPath + '/productivecheckreport/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: Productivecheckreport.initColumn()
    });

    /**
     * 导入核查文件
     */
    Productivecheckreport.uploadpdfreport = function (data) {
        func.open({
            title: "上传 " + data.xzs + " 的核查pdf报告",
            width: "1000rem",
            height: "500",
            content: Feng.ctxPath + '/productivecheckreport/uploadpdf?adcode=' + data.adcode,
        });
    }

    /**
     * 预览核查文件
     */
    Productivecheckreport.previewpdfreport = function (data) {
        var businesstype = '11'
        var associateid = data.adcode;
        if (associateid) {
            window.open(window.location.origin + '/spotmanage/system/preview/file/' + associateid + ',' + businesstype);
        } else {
            Feng.error("未找到方案文件！")
        }
    }

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Productivecheckreport.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        Productivecheckreport.openAddDlg();

    });

    // 导出excel
    $('#btnExp').click(function () {
        Productivecheckreport.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + Productivecheckreport.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Productivecheckreport.openEditDlg(data);
        } else if (layEvent === 'delete') {
            Productivecheckreport.onDeleteItem(data);
        } else if (layEvent === 'uploadpdfreport') {
            Productivecheckreport.uploadpdfreport(data);
        } else if (layEvent === 'previewpdfreport') {
            Productivecheckreport.previewpdfreport(data);
        }
    });
});
