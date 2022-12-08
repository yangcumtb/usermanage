layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 项目立项表，用于存储历史遗留图斑的申请项目管理
     */
    var Projectbuild = {
        tableId: "projectbuildTable"
    };

    /**
     * 初始化表格的列
     */
    Projectbuild.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'id', hide: true, title: '主键'},
            {field: 'xmmc', sort: true, title: '项目名称'},
            {field: 'xzs', sort: true, title: '所在市'},
            {field: 'xzx', sort: true, title: '所在县'},
            {
                field: 'ckqz', sort: true, title: '采矿许可证', templet: function (param) {
                    if (param.ckqz == 0) {
                        return "新申请"
                    } else if (param.ckqz == 1) {
                        return "持有"
                    } else {
                        return "变更"
                    }
                }
            },
            {field: 'ckqzh', sort: true, title: '采矿权证号'},
            // {field: 'spotId', sort: true, title: '图斑编号，多个以逗号隔开'},
            // {field: 'associateid', sort: true, title: '文件关联id'},
            // {field: 'createUser', sort: true, title: '创建人'},
            // {field: 'createTime', sort: true, title: '创建时间'},
            // {field: 'updateUser', sort: true, title: '修改人'},
            // {field: 'updateTime', sort: true, title: '修改时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Projectbuild.search = function () {
        var queryData = {};

        queryData['xmmc'] = $('#xmmc').val();
        queryData['xzs'] = $('#xzs').val();
        queryData['xzx'] = $('#xzx').val();
        queryData['ckqz'] = $('#ckqz').val();
        queryData['ckqzh'] = $('#ckqzh').val();
        queryData['spotId'] = $('#spotId').val();

        table.reload(Projectbuild.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    Projectbuild.openAddDlg = function () {
        func.open({
            title: '添加项目立项表，用于存储历史遗留图斑的申请项目',
            content: Feng.ctxPath + '/projectbuild/add',
            tableId: Projectbuild.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    Projectbuild.openEditDlg = function (data) {
        func.open({
            title: '修改项目立项表，用于存储历史遗留图斑的申请项目',
            content: Feng.ctxPath + '/projectbuild/edit?id=' + data.id,
            tableId: Projectbuild.tableId
        });
    };


    /**
     * 导出excel按钮
     */
    Projectbuild.exportExcel = function () {
        var checkRows = table.checkStatus(Projectbuild.tableId);
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
    Projectbuild.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/projectbuild/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Projectbuild.tableId);
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
        elem: '#' + Projectbuild.tableId,
        url: Feng.ctxPath + '/projectbuild/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: Projectbuild.initColumn()
    });

    /**
     * 根据excel批量导入数据
     */
    Projectbuild.batchInsertByExcel = function () {
        layer.open({
            title: '批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['80%', '90%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/spot/projectImportExcelList',
        });
    };



    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Projectbuild.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        Projectbuild.openAddDlg();

    });

    // 批量导入
    $('#btnAddpro').click(function () {
        Projectbuild.batchInsertByExcel();
    });

    // 导出excel
    $('#btnExp').click(function () {
        Projectbuild.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + Projectbuild.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Projectbuild.openEditDlg(data);
        } else if (layEvent === 'delete') {
            Projectbuild.onDeleteItem(data);
        }
    });
});
