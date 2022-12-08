layui.use(['table', 'admin', 'HttpRequest', 'func',"form"], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;

    /**
     * 管理
     */
    var Rsspot = {
        tableId: "rsspotTable",
        queryData: {}
    };

    /**
     * 初始化表格的列
     */
    Rsspot.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: "left"},
            {field: 'id', align: 'center', width: 200, title: '遥感解译图斑编号', fixed: "left"},
            {field: 'checkpoint', align: 'center',width:150, title: '审核进程',templet: function (pro) {
                    var item = pro.checkpoint;
                    var psbh = pro.rejectpoint;
                    if (psbh == 1) {
                        return "已驳回"
                    } else {
                        if (item == 1) {
                            return "县级未提交"
                        } else if (item == 2) {
                            return "县级提交"
                        } else if (item == 3) {
                            return "市级提交"
                        } else if (item == 4) {
                            return "省级入库"
                        } else {
                            return "节点追踪失败"
                        }
                    }
                }},
            {field: 'xzs', align: 'center', sort: true, title: '所在市'},
            {field: 'xzx', align: 'center', sort: true, title: '所在县'},
            {field: 'minename', align: 'center', width: 200, sort: true, title: '矿山名称'},
            {field: 'ckzh', align: 'center', width: 150, sort: true, title: '采矿证号'},
            {field: 'kfx', align: 'center', title: '中心点经度'},
            {field: 'kfy', align: 'center', title: '中心点纬度'},
            {field: 'changearea', align: 'center', sort: true, title: '变化面积(m²)'},
            {field: 'changetype', align: 'center', sort: true, title: '变化类型'},
            {field: 'bz', title: '备注'},
            {align: 'center', toolbar: '#tableBar', title: '操作', width: 400, fixed: "right"}
        ]];
    };

    $(".more-btn").click(function () {
        if ($(".more-container").is(":hidden")) {
            $(".more-container").show(); //如果元素为隐藏,则将它显现
            $(".more-btn").html('<i class="layui-icon layui-icon-subtraction"></i>收起')
        } else {
            $(".more-container").hide(); //如果元素为显现,则将其隐藏
            $(".more-btn").html('<i class="layui-icon layui-icon-addition"></i>展开')
        }
        return false;
    })
    /**
     * 点击查询按钮
     */
    Rsspot.search = function () {
        Rsspot.queryData.id = $("#id").val();
        Rsspot.queryData.xzs = $("#xzs").val();
        Rsspot.queryData.xzx = $("#xzx").val();
        Rsspot.queryData.minename= $("#ksmc").val();
        Rsspot.queryData.checkpoint = $("#shjd").val();
        Rsspot.queryData.rejectpoint = $("#bhjd").val();
        table.reload(Rsspot.tableId, {
            where: Rsspot.queryData,
            page: {curr: 1}
        });
    };
    /**
     * 点击重置按钮
     */
    Rsspot.Reset = function () {
        $("#id").val('');
        $("#xzs").val('');
        $("#xzx").val('');
        $("#ksmc").val('');
        $("#shjd").val('');
        Rsspot.queryData.xzs = $("#xzs").val();
        Rsspot.queryData.xzx = $("#xzx").val();
        Rsspot.search();
        form.render();
        table.reload(Rsspot.tableId);

    };
    /**
     * 跳转到添加页面
     */
    Rsspot.jumpAddPage = function (data) {
        func.open({
            width: "1000rem",
            title: '编辑',
            content: Feng.ctxPath + '/rsspot/add',
            tableId: Rsspot.tableId
        });
    };

    /**
     * 根据excel批量导入数据
     */
    Rsspot.batchInsertByExcel = function () {
        layer.open({
            title: '批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['70%', '80%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/rsspot/Imports'
        });
    };

    /**
     * 跳转到编辑页面
     *
     * @param data 点击按钮时候的行数据
     */
    Rsspot.jumpEditPage = function (data) {
        // if (data.checkpoint == 2 || data.checkpoint == 3 ) {
        //     parent.layer.msg('已提交，不可修改', {icon: 4});
        // } else if (data.checkpoint == 4) {
        //     parent.layer.msg('已入库，不可修改', {icon: 4});
        // }else {
            func.open({
                width: "1000rem",
                title: '编辑',
                content: Feng.ctxPath + '/rsspot/edit?id=' + data.id,
                tableId: Rsspot.tableId
            });
        // }

    };

    /**
     * 跳转到详情页面
     *
     * @param data 点击按钮时候的行数据
     */
    Rsspot.onDetail = function (data) {
        func.open({
            width: "1000rem",
            title: "详情",
            content: Feng.ctxPath + '/rsspot/Detail?id=' + data.id,
            tableId: Rsspot.tableId
        });
    };
    /**
     * 佐证文件上传
     */
    Rsspot.uploadFile = function (data) {
        func.open({
            width: "1000rem",
            title: '佐证材料上传',
            content: Feng.ctxPath + '/rsspot/Upload?id=' + data.id,
            tableId: Rsspot.tableId
        });
    };
    /**
     * 导出excel按钮
     */
    Rsspot.exportExcel = function () {
        var checkRows = table.checkStatus(Rsspot.tableId);
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
    Rsspot.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/rsspot/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Rsspot.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };
    Rsspot.onCheck = function (data) {
        func.open({
            width: "1000rem",
            title: '审批',
            content: Feng.ctxPath + '/rsspot/Check?id=' + data.id,
            tableId: Rsspot.tableId,
        })
    }
    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Rsspot.tableId,
        url: Feng.ctxPath + '/rsspot/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        sort: true,
        cols: Rsspot.initColumn(),
        done: function (res, curr, count) {
            $.each(res['data'], function (i, j) {
                if (j['rejectpoint'] == 1) {
                    var a = $("tr[data-index = '" + i + "']").find("a");
                    let b = a[3]
                    $("tr[data-index = '" + i + "']").css("background-color", "rgba(227,152,152,0.5)")
                } else {
                    if (j['checkpoint'] == 2) {
                        $("tr[data-index = '" + i + "']").css("background-color", "rgba(255,236,139,0.4)")
                    } else if (j['checkpoint'] == 3) {
                        $("tr[data-index = '" + i + "']").css("background-color", "rgba(255,165,0,0.4)")
                    } else if (j['checkpoint'] == 4) {
                        $("tr[data-index = '" + i + "']").css("background-color", "rgba(198,224,180,0.5)")
                    }

                }
            })
        }
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Rsspot.search();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        Rsspot.jumpAddPage();

    });
// 重置按钮事件
    $('#btnReset').click(function () {
        Rsspot.Reset();
        return false;
    });
    // 导出excel
    $('#btnExp').click(function () {
        Rsspot.exportExcel();
    });
// 根据Excel批量导入
    $('#btnExp2').click(function () {
        Rsspot.batchInsertByExcel();
    });
    // 工具条点击事件
    table.on('tool(' + Rsspot.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Rsspot.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            Rsspot.onDeleteItem(data);
        } else if (layEvent === 'check') {
            Rsspot.onCheck(data);
        } else if (layEvent === 'detail') {
            Rsspot.onDetail(data);
        } else if (layEvent == "file") {
            Rsspot.uploadFile(data)
        }
    });
});
