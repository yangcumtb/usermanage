layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 管理
     */
    var RecoverTask = {
        tableId: "recoverTaskTable",
        queryData: {}
    };

    /**
     * 初始化表格的列
     */
    RecoverTask.initColumn = function () {
        return [[
            {type: 'checkbox'},
            // {field: 'id', sort: true, title: '任务编号，为主键id'},
            {field: 'kqbh', sort: true, title: '矿权编号'},
            {field: 'zldx', sort: true, title: '治理对象/区域,按照方案内容填写'},
            {field: 'kssj', sort: true, title: '任务开始时间，格式：年-月-日，例：2021-03-22'},
            {field: 'jssj', sort: true, title: '任务结束时间，格式：年-月-日，例：2021-03-22'},
            {field: 'zygc', sort: true, title: '主要工程，参照《方案》，包括平整场地、削放坡、客土、种植乔（灌）木、播种草籽、截（排）水、网围栏、警示牌、挡土墙、其它'},
            {field: 'gcl', sort: true, title: '工程量'},
            {field: 'zlmj', sort: true, title: '治理面积'},
            {field: 'fkmj', sort: true, title: '复垦面积，（平方米）'},
            // {field: 'createUser', sort: true, title: '创建人'},
            // {field: 'createTime', sort: true, title: '创建时间'},
            // {field: 'updateUser', sort: true, title: '修改人'},
            // {field: 'updateTime', sort: true, title: '修改时间'},
            {align: 'center', fixed: 'right', width: 300, toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    RecoverTask.search = function () {
        RecoverTask.queryData.kqbh = $("#kqbh").val();
        RecoverTask.queryData.zldx = $("#zldx").val();
        table.reload(RecoverTask.tableId, {
            where: RecoverTask.queryData, page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    RecoverTask.Reset = function () {

        $("#kqbh").val('');
        $("#zldx").val('');
        RecoverTask.search();
        form.render();
        table.reload(RecoverTask.tableId);
    };

    /**
     * 弹出添加对话框
     */
    RecoverTask.openAddDlg = function () {
        func.open({
            title: '添加',
            content: Feng.ctxPath + '/recoverTask/add',
            tableId: RecoverTask.tableId
        });
    };

     /**
      * 点击编辑
      *
      * @param data 点击按钮时候的行数据
      */
      RecoverTask.openEditDlg = function (data) {
          func.open({
              width: "1000rem",
              title: '修改治理任务',
              content: Feng.ctxPath + '/recoverTask/edit?id=' + data.id,
              tableId: RecoverTask.tableId
          });
      };


    /**
     * 导出excel按钮
     */
    RecoverTask.exportExcel = function () {
        var checkRows = table.checkStatus(RecoverTask.tableId);
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
    RecoverTask.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/recoverTask/delete",'post', function (data) {
                Feng.success("删除成功!");
                table.reload(RecoverTask.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    /**
     * 根据excel批量导入数据
     */
    RecoverTask.batchInsertByExcel = function () {
        layer.open({
            title: '治理任务批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['70%', '80%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/recoverTask/recoverTaskImportExcelList',
        });
    };
    /**
     * 详情
     */
    RecoverTask.onDetails = function (data) {
        func.open({
            width: "1000rem",
            title: '详情',
            content: Feng.ctxPath + '/recoverTask/detailHtml?id=' + data.id,
            tableId: RecoverTask.tableId
        });
    }

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + RecoverTask.tableId,
        url: Feng.ctxPath + '/recoverTask/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: RecoverTask.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        RecoverTask.search();
        return false;
    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        RecoverTask.Reset();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

    RecoverTask.openAddDlg();

    });

    // 导出excel
    $('#btnExp').click(function () {
        RecoverTask.exportExcel();
    });

    // 批量导入
    $('#btnExp2').click(function () {
        RecoverTask.batchInsertByExcel();
    });


    // 工具条点击事件
    table.on('tool(' + RecoverTask.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            RecoverTask.openEditDlg(data);
        } else if (layEvent === 'delete') {
            RecoverTask.onDeleteItem(data);
        }else if (layEvent === 'detail') {
            RecoverTask.onDetails(data)
        }
    });
});
