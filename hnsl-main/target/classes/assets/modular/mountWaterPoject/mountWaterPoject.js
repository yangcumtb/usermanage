layui.use(['table', 'admin', 'form', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;

    /**
     * 管理
     */
    var MountWaterPoject = {
        tableId: "mountWaterPojectTable",
        queryData: {}
    };

    /**
     * 初始化表格的列
     */
    MountWaterPoject.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left', sort: true},
            {field: 'zXmmc', sort: true, fixed: 'left', title: '子项目名称', width: 160},
            {field: 'gcXmmc', title: '工程项目名称', width: 160},
            {field: 'xmzjlx', sort: true, title: '项目资金类型', width: 160},
            {field: 'xmjszq', sort: true, title: '项目建设周期', width: 160},
            {field: 'jxmb', sort: true, title: '绩效目标', width: 160},
            {field: 'xmsj', sort: true, title: '项目时间', width: 160},
            {field: 'xmsjMonth', sort: true, title: '项目月份', width: 160},
            {field: 'zygznr', sort: true, title: '主要工作内容', width: 160},
            {field: 'xmdd', sort: true, title: '项目地点', width: 160},
            // {field: 'xmzb', sort: true, title: '项目坐标', width: 160},
            {field: 'jd', sort: true, title: '经度', width: 160},
            {field: 'wd', sort: true, title: '纬度', width: 160},
            {field: 'xmzrdw', sort: true, title: '项目责任单位', width: 160},
            {field: 'zrrxm', sort: true, title: '责任人姓名', width: 160},
            {field: 'bmzw', sort: true, title: '部门职务', width: 160},
            {field: 'lxdh', sort: true, title: '联系电话', width: 160},
            {field: 'zje', sort: true, title: '总金额（万元）', width: 160},
            {field: 'ptzj', sort: true, title: '配套资金（万元）', width: 160},
            {field: 'zyzj', sort: true, title: '中央资金（万元）', width: 160},
            {field: 'ptzjly', sort: true, title: '配套资金来源', width: 160},
            {field: 'tgzjdw', sort: true, title: '提供资金单位', width: 160},
            {field: 'ylsje', sort: true, title: '已落实金额（万元）', width: 180},
            {field: 'gwsj', sort: true, title: '挂网时间', width: 160},
            {field: 'jcsj', sort: true, title: '进场时间', width: 160},
            {field: 'zbdwsj', sort: true, title: '中标单位设计', width: 200},
            {field: 'sjlxr', sort: true, title: '中标单位设计联系人', width: 200},
            {field: 'sjlxrdh', sort: true, title: '中标单位设计联系人电话', width: 200},
            {field: 'zbdwsg', sort: true, title: '中标单位施工', width: 160},
            {field: 'sglxr', sort: true, title: '施工联系人', width: 160},
            {field: 'sglxrdh', sort: true, title: '施工联系人电话', width: 160},
            {field: 'zbdwjl', sort: true, title: '中标单位监理', width: 160},
            {field: 'jllxr', sort: true, title: '监理联系人', width: 160},
            {field: 'jllxrdh', sort: true, title: '建立联系人电话', width: 160},
            {field: 'xmjdbfb', sort: true, title: '项目进度百分比', width: 160},
            {field: 'jzqk', sort: true, title: '项目总体进展情况', width: 160},
            {field: 'jzqk1', sort: true, title: '项目月度进展', width: 160},
            {field: 'czwt', sort: true, title: '存在问题', width: 160},
            {field: 'htydbftj', sort: true, title: '合同约定的拨付资金条件', width: 200},
            {field: 'bfzj', sort: true, title: '按合同应拨付资金（万元）', width: 200},
            {field: 'ywcbf', sort: true, title: '已完成拨付（万元）', width: 200},
            {field: 'ywcptbf', sort: true, title: '已完成配套拨付（万元）', width: 200},
            {field: 'ywczybf', sort: true, title: '已完成中央拨付（万元）', width: 200},
            {field: 'ybwbzj', sort: true, title: '应拨未拨资金（万元）', width: 200},
            {field: 'ybwbxmsq', sort: true, title: '应拨未拨项目是否向财政递交书面申请', width: 250},
            {field: 'wbfyy', sort: true, title: '如未按照合同约定拨付请注明原因', width: 250},
            {field: 'mqssjd', sort: true, title: '目前实施阶段', width: 160},
            {field: 'sjgcl', sort: true, title: '设计工程量', width: 160},
            {field: 'ywcgcl', sort: true, title: '已完成工程量', width: 160},
            {field: 'wwcgcl', sort: true, title: '未完成工程量', width: 160},
            {field: 'yjwgsj', sort: true, title: '预计完工时间', width: 160},
            {align: 'center', fixed: 'right', width: 200, toolbar: '#tableBar', title: '操作'}
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
    MountWaterPoject.search = function () {
        MountWaterPoject.queryData.zXmmc = $("#zXmmc").val();
        MountWaterPoject.queryData.gcXmmc = $("#gcXmmc").val();
        MountWaterPoject.queryData.jxmb = $("#jxmb").val();
        MountWaterPoject.queryData.zygznr = $("#zygznr").val();
        MountWaterPoject.queryData.xmdd = $("#xmdd").val();
        MountWaterPoject.queryData.xmsj = $("#xmsj").val();
        MountWaterPoject.queryData.xmzrdw = $("#xmzrdw").val();
        MountWaterPoject.queryData.zrrxm = $("#zrrxm").val();
        MountWaterPoject.queryData.bmzw = $("#bmzw").val();
        MountWaterPoject.queryData.lxdh = $("#lxdh").val();
        MountWaterPoject.queryData.xmsjMonth = $("#xmsjMonth").val();
        MountWaterPoject.queryData.xmjszq = $("#xmjszq").val();

        table.reload(MountWaterPoject.tableId, {
            where: MountWaterPoject.queryData,
            page: {curr: 1},
            limit: 120
        });
    };

    /**
     * 点击重置按钮
     */
    MountWaterPoject.Reset = function () {
        $("#zXmmc").val('');
        $("#jxmb").val('');
        $("#zygznr").val('');
        $("#xmdd").val('');
        $("#xmsj").val('');
        $("#xmzrdw").val('');
        $("#zrrxm").val('');
        $("#bmzw").val('');
        $("#lxdh").val('');
        $("#xmsjMonth").val('');
        $("#xmjszq").val('');
        MountWaterPoject.search();
        form.render();
        table.reload(MountWaterPoject.tableId);
    };

    /**
     * 跳转到添加页面
     */
    MountWaterPoject.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/mountWaterPoject/add'
    };

    /**
     * 跳转到编辑页面
     *
     * @param data 点击按钮时候的行数据
     */
    MountWaterPoject.jumpEditPage = function (data) {
        window.location.href = Feng.ctxPath + '/mountWaterPoject/edit?id=' + data.id
    };


    /**
     * 导出实际情况表excel
     */
    $("#factOut").click(function () {
        console.log('fact')
        var checkRows = table.checkStatus(MountWaterPoject.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    });
    /**
     * 导出进展情况表excel
     */
    $("#excelOut").click(function () {
        console.log('excel')
        var checkRows1 = table.checkStatus(MountWaterPoject.tableId);
        if (checkRows1.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            var L = checkRows1.data.length;
            var ID = checkRows1.data[0].id;
            for (i = 1; i < L; i++) {
                var Date = checkRows1.data[i];
                ID = ID + "," + Date.id;
            }
            window.open(Feng.ctxPath + "/mountwaterCommon/multiexcelDownload?id=" + ID);

        }
    });

    /**
     * 导出进展情况表pdf
     */
    $("#pdfOut").click(function () {
        console.log('pdf')
        var checkRows2 = table.checkStatus(MountWaterPoject.tableId);
        if (checkRows2.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            var L = checkRows2.data.length;
            var ID = checkRows2.data[0].id;
            for (i = 1; i < L; i++) {
                var Date = checkRows2.data[i];
                ID = ID + "," + Date.id;
            }
            window.open(Feng.ctxPath + "/mountwaterCommon/multiPdfDownload?id=" + ID);

        }
    });

    /**
     * 导入excel按钮
     */
    MountWaterPoject.importExcel = function () {
        layer.open({
            title: '批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['80%', '90%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/mountwaterCommon/ImportExcelList',
        });
    };

    /**
     * 导入空间数据按钮
     */
    MountWaterPoject.importGeo = function () {
        layer.open({
            title: '空间数据导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['80%', '90%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/mountwaterCommon/ImportGeoList',
        });
    };
    /**
     * 批量删除
     */
    MountWaterPoject.batchDelete = function () {
        var checkRows2 = table.checkStatus(MountWaterPoject.tableId);
        var ids = "";
        if (checkRows2.data.length === 0) {
            Feng.error("请选择要删除的数据");
        } else {
            var operation = function () {
                var L = checkRows2.data.length;
                for (i = 0; i < L; i++) {
                    var Date = checkRows2.data[i];
                    ids = ids + Date.id + ",";
                }
                var ajax = new HttpRequest(Feng.ctxPath + "/mountWaterPoject/deletemore?ids=" + ids, 'post', function (data) {
                    Feng.success(data.message);
                    table.reload(MountWaterPoject.tableId);
                }, function (data) {
                    Feng.error("删除失败!" + data.message + "!");
                });
                // ajax.set("ids", ids);
                ajax.start();
            };
            Feng.confirm("是否删除?", operation);
        }
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    MountWaterPoject.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/mountWaterPoject/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(MountWaterPoject.tableId);
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
        elem: '#' + MountWaterPoject.tableId,
        url: Feng.ctxPath + '/mountWaterPoject/list',
        page: true,
        limit: 120,
        height: "full-100",
        cellMinWidth: 100,
        cols: MountWaterPoject.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        MountWaterPoject.search();
        return false;
    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        MountWaterPoject.Reset();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        MountWaterPoject.jumpAddPage();

    });

    // 导入excel
    $('#btnExcel').click(function () {
        MountWaterPoject.importExcel();
    });

    // 导入excel
    $('#btnDelete').click(function () {
        MountWaterPoject.batchDelete();
    });

    //导入Geojson
    $('#btnGeo').click(function () {
        MountWaterPoject.importGeo();
    });
    // 工具条点击事件
    table.on('tool(' + MountWaterPoject.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            MountWaterPoject.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            MountWaterPoject.onDeleteItem(data);
        }
    });
});
