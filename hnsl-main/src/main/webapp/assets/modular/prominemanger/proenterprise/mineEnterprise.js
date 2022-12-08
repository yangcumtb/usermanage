layui.use(['table', 'layarea', 'form', 'admin', 'HttpRequest', 'func', 'upload', 'element', 'layer'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;
    var element = layui.element
    var layer = layui.layer
    var upload = layui.upload;

    /**
     * 矿权、矿山企业信息表。填表说明：企业性质：1-国有企业、2-集体所有制、3-私营企业、4-股份制企业、5-有限合伙企业、6-联营企业、7-外商投资企业、8-个人独资企业管理
     */
    var MineEnterprise = {
        tableId: "mineEnterpriseTable",
        queryData: {}
    };

    /**
     * 初始化表格的列
     */
    MineEnterprise.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left', sort: true},
            {field: 'qymc', fixed: 'left', title: '企业名称', sort: true, width: 360},
            {field: 'frdb', sort: true, title: '法人代表'},
            {
                field: 'qyxz', sort: true, title: '企业性质', width: 160, sort: true, templet: function (param) {
                    if (param.qyxz == "1") {
                        return "国有企业";
                    } else if (param.qyxz == "2") {
                        return "集体所有制";
                    } else if (param.qyxz == "3") {
                        return "私营企业";
                    } else if (param.qyxz == "4") {
                        return "股份制企业";
                    } else if (param.qyxz == "5") {
                        return "有限合伙企业";
                    } else if (param.qyxz == "6") {
                        return "联营企业";
                    } else if (param.qyxz == "7") {
                        return "外商投资企业";
                    } else if (param.qyxz == "8") {
                        return "个人独资企业";
                    } else {
                        return "/"
                    }
                }
            },
            {field: 'dwdz', sort: true, width: 160, title: '单位地址'},
            {field: 'ksmc', sort: true, width: 160, title: '矿权矿山名称'},
            {
                field: 'ckxkz', sort: true, width: 160, title: '采矿许可证', templet: function (param) {
                    if (param.ckxkz == "新申请") {
                        return "新申请"
                    } else if (param.ckxkz == "持有") {
                        return "持有"
                    } else if (param.ckxkz == "变更") {
                        return "变更"
                    } else if (param.ckxkz == "过期") {
                        return "过期"
                    } else {
                        return "/"
                    }
                }
            },
            {field: 'ckzh', sort: true, width: 300, title: '采矿权证号'},
            {
                field: 'sfjgxy', sort: true, title: '签订三方监管协议', templet: function (param) {
                    if (param.sfjgxy == 1) {
                        return "是"
                    } else if (param.sfjgxy == 0) {
                        return "否"
                    } else {
                        return "未知"
                    }

                }
            },
            {
                field: 'sjlsylsl', sort: true, width: 300, title: '涉及历史遗留三类矿山矿权', templet: function (param) {
                    if (param.sjlsylsl === 1) {
                        return "是"
                    } else if (param.sjlsylsl == 0) {
                        return "否"
                    } else {
                        return "未知"
                    }
                }
            },
            {
                field: 'lmzh', sort: true, width: 300, title: '属于全省菱镁采矿权整合方案', templet: function (param) {
                    if (param.lmzh === 1) {
                        return "是"
                    } else if (param.lmzh === 0) {
                        return "否"
                    } else {
                        return "未知"
                    }
                }
            },
            {
                field: 'bfz', sort: true, width: 300, title: '是否原部发证下放矿山', templet: function (param) {
                    if (param.bfz === 1) {
                        return "是"
                    } else if (param.bfz === 0) {
                        return "否"
                    } else {
                        return "未知"
                    }
                }
            },
            {align: 'center', fixed: 'right', toolbar: '#tableBar', title: '操作', width: 450}
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
    MineEnterprise.search = function () {
        MineEnterprise.queryData.qymc = $("#qymc").val();
        MineEnterprise.queryData.frdb = $("#frdb").val();
        MineEnterprise.queryData.qyxz = $("#qyxz").val();
        MineEnterprise.queryData.ksmc = $("#ksmc").val();
        MineEnterprise.queryData.ckxkz = $("#ckxkz").val();
        MineEnterprise.queryData.ckzh = $("#ckzh").val();
        MineEnterprise.queryData.lmzh = $("#lmzh").val();
        MineEnterprise.queryData.bfz = $("#bfz").val();
        MineEnterprise.queryData.sfjgxy = $("#sfjgxy").val();
        MineEnterprise.queryData.sjlsylsl = $("#sjlsylsl").val();

        table.reload(MineEnterprise.tableId, {
            where: MineEnterprise.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    MineEnterprise.Reset = function () {
        $("#qymc").val('');
        $("#frdb").val('');
        $("#qyxz").val('');
        $("#ksmc").val('');
        $("#ckxkz").val('');
        $("#ckzh").val('');
        $("#lmzh").val('');
        $("#bfz").val('');
        $("#sfjgxy").val('');
        $("#sjlsylsl").val('');

        MineEnterprise.search();
        form.render();
        table.reload(MineEnterprise.tableId);
    };

    /**
     * 弹出添加对话框
     */
    MineEnterprise.openAddDlg = function () {
        func.open({
            width: "1000rem",
            title: '添加矿权信息表',
            content: Feng.ctxPath + '/prominemanger/mineEnterprise/add',
            tableId: MineEnterprise.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    MineEnterprise.openEditDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '修改矿权信息表',
            content: Feng.ctxPath + '/prominemanger/mineEnterprise/edit?id=' + data.id,
            tableId: MineEnterprise.tableId
        });
    };

    /**
     * 点击详情
     *
     * @param data 点击按钮时候的行数据
     */
    MineEnterprise.openDetail = function (data) {
        func.open({
            width: "1000rem",
            title: '查看详情',
            content: Feng.ctxPath + '/prominemanger/mineEnterprise/detailHtml?id=' + data.id,
            tableId: MineEnterprise.tableId
        });
    };


    /**
     * 导出excel按钮
     */
    MineEnterprise.exportExcel = function () {
        var checkRows = table.checkStatus(MineEnterprise.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 导出所有excel按钮
     */
    MineEnterprise.exportExcelAll = function () {
        var ajax = new HttpRequest(Feng.ctxPath + '/prominemanger/mineEnterprise/listnopage', 'POST')
        var result = ajax.start();
        if (result.success !== true) {
            Feng.error("请求数据为空！");
        } else {
            table.exportFile(tableResult.config.id, result.data, 'xls');
        }

    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    MineEnterprise.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/mineEnterprise/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(MineEnterprise.tableId);
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
        elem: '#' + MineEnterprise.tableId,
        url: Feng.ctxPath + '/prominemanger/mineEnterprise/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: MineEnterprise.initColumn(),
    });

    /**
     * 根据excel批量导入数据
     */
    MineEnterprise.batchInsertByExcel = function () {
        layer.open({
            title: '批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['70%', '80%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/spot/mineImportExcelList',
        });
    };

    /**
     * 导入核查文件
     */
    MineEnterprise.uploadpdfreport = function (data) {
        func.open({
            title: "上传 " + data.qymc + " 的核查pdf报告",
            width: "1000rem",
            height: "500",
            content: Feng.ctxPath + '/prominemanger/mineEnterprise/uploadpdf?id=' + data.id,
        });

    }

    /**
     * 导入核查文件
     */
    MineEnterprise.previewpdfreport = function (data) {
        var businesstype = '10'
        var associateid = data.id;
        debugger;
        if (associateid) {
            window.open(window.location.origin + '/spotmanage/system/preview/file/' + associateid + ',' + businesstype);
        } else {
            Feng.error("未找到方案文件！")
        }
    }

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        MineEnterprise.search();
        return false;
    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        MineEnterprise.Reset();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        MineEnterprise.openAddDlg();

    });

    // 导出excel
    $('#btnExp').click(function () {
        MineEnterprise.exportExcel();
    });

    // 导出全部excel
    $('#btnExp1').click(function () {
        MineEnterprise.exportExcelAll();
    });

    // 批量导入
    $('#btnExp2').click(function () {
        MineEnterprise.batchInsertByExcel();
    });

    // 工具条点击事件
    table.on('tool(' + MineEnterprise.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            MineEnterprise.openEditDlg(data);
        } else if (layEvent === 'delete') {
            MineEnterprise.onDeleteItem(data);
        } else if (layEvent === 'detail') {
            MineEnterprise.openDetail(data);
        } else if (layEvent === 'previewpdfreport') {
            MineEnterprise.previewpdfreport(data);
        } else if (layEvent === "uploadpdfreport") {
            MineEnterprise.uploadpdfreport(data)
        }
    });
});
