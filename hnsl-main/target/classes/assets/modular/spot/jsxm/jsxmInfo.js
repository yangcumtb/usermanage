layui.use(['table', 'layarea', 'admin', 'form', 'HttpRequest', 'func', 'formSelects'], function () {
    var $ = layui.$;
    var table = layui.table;
    var layarea = layui.layarea;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;

    /**
     * 建设项目图斑基础信息表管理
     */
    var JSXMInfo = {
        tableId: "jsxmInfoTable",
        queryData: {}
    };
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            JSXMInfo.queryData.xzs = res.xzs;
            JSXMInfo.queryData.xzx = res.xzx;
            //选择结果
            console.log(res);
        }
    });

    layarea.render({
        elem: '#area',
        change: function (res) {
            //选择结果
            JSXMInfo.queryData.xzs = res.xZS;
            JSXMInfo.queryData.xzx = res.xZX;
        }
    });

    /**
     * 初始化表格的列
     */
    JSXMInfo.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'id', fixed: 'left', width: 200, title: '图斑编号', sort: true},
            {field: 'xzs', width: 150, title: '矿区所在市', sort: true},
            {field: 'xzx', width: 150, title: '矿区所在县', sort: true},
            {field: 'wz', width: 200, title: '矿区具体位置', sort: true},
            {field: 'kfx', width: 150, title: '中心点经度', sort: true},
            {field: 'kfy', width: 150, title: '中心点纬度', sort: true},
            {field: 'hdmj', width: 120, title: '损毁面积(㎡)', sort: true},
            {field: 'xmmc', width: 150, title: '项目名称', sort: true},
            {field: 'jsdw', width: 150, title: '建设单位', sort: true},
            {field: 'fkywr', width: 200, title: '复垦义务人', sort: true},
            {
                field: 'ydsj', width: 200, title: '用地时间', sort: true, templet: function (a) {
                    if (a.ydsj != null) {
                        var b = a.ydsj.substring(0, 10);
                        return b
                    } else {
                        var c = null;
                        return c
                    }

                }
            },
            {field: 'damagetime', width: 200, title: '损毁时间', sort: true},
            {
                field: 'shlx', width: 200, title: '损毁类型', sort: true, templet: function (d) {
                    if (d.shlx == "WS") {
                        return "挖损"
                    } else if (d.shlx == "YZ") {
                        return "压占"
                    } else {
                        return "塌陷"
                    }
                }
            },
            {
                field: 'zlqk', width: 150, title: '治理情况', sort: true, templet: function (d) {
                    if (d.zlqk == "XFZ") {
                        return "治理中";
                    } else if (d.zlqk == "WXF") {
                        return "未治理";
                    } else if (d.zlqk == "XF") {
                        return "已治理";
                    }else{
                        return "无";
                    }
                }
            },
            {
                field: 'nfksj', width: 200, title: '拟修复时间', sort: true, templet: function (a) {
                    if (a.nfksj != null) {
                        var b = a.nfksj.substring(0, 10);
                        return b
                    } else {
                        var c = null;
                        return c
                    }

                }
            },
            {field: 'hcdw', width: 200, title: '核查单位', sort: true},
            {field: 'hcry', width: 150, title: '核查人员', sort: true},
            {
                field: 'hcrq', width: 200, title: '核查具体日期', sort: true, templet: function (a) {
                    if (a.hcrq != null) {
                        var b = a.hcrq.substring(0, 10);
                        return b
                    } else {
                        var c = null;
                        return c
                    }

                }
            },
            {field: 'sszt', width: 150, title: '实施主体', sort: true},
            {
                field: 'fksj', width: 200, title: '复垦/治理时间', sort: true, templet: function (a) {
                    if (a.fksj != null) {
                        var b = a.fksj.substring(0, 10);
                        return b
                    } else {
                        var c = null;
                        return c
                    }

                }
            },
            {
                field: 'yssj', width: 200, title: '验收时间', sort: true, templet: function (a) {
                    if (a.yssj != null) {
                        var b = a.yssj.substring(0, 10);
                        return b
                    } else {
                        var c = null;
                        return c
                    }

                }
            },
            {field: 'ysdw', width: 200, title: '组织验收单位', sort: true},
            {
                field: 'ysjl', width: 200, title: '验收结论', sort: true, templet: function (d) {
                    if (d.ysjl == "TG") {
                        return "通过"
                    } else if (d.ysjl == "YTJTG") {
                        return "有条件通过"
                    } else if (d.ysjl == "WTG") {
                        return "未通过"
                    }
                }
            },
            {
                field: 'fkfx', width: 200, title: '治理/复垦后土地利用类型', sort: true, templet: function (d) {
                    if (d.fkfx == "01") {
                        return "耕地";
                    } else if (d.fkfx == "02") {
                        return "园地";
                    } else if (d.fkfx == "03") {
                        return "林地";
                    } else if (d.fkfx == "04") {
                        return "草地";
                    } else if (d.fkfx == "05") {
                        return "商服用地";
                    } else if (d.fkfx == "06") {
                        return "工矿仓储用地";
                    } else if (d.fkfx == "07") {
                        return "住宅用地";
                    } else if (d.fkfx == "08") {
                        return "公共管理与公共服务用地";
                    } else if (d.fkfx == "09") {
                        return "特殊用地";
                    } else if (d.fkfx == "10") {
                        return "交通运输用地";
                    } else if (d.fkfx == "11") {
                        return "水域及水利设施用地";
                    } else {
                        return "其他用地";
                    }
                }
            },
            {field: 'zttz', width: 200, title: '总体投资（万元）', sort: true},
            {fixed: 'right', width: 310, toolbar: "#tool", title: '操作'}
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
    //清除
    $(".delete-btn").click(function () {
        $("#xzs").val('');
        form.render();
    })
    $(".delete-btn1").click(function () {
        $("#xzx").val('');
        form.render();
    })
    /**
     * 点击查询按钮
     */
    JSXMInfo.search = function () {
        JSXMInfo.queryData.id = $("#id").val();
        JSXMInfo.queryData.xzs = $("#xzs").val();
        JSXMInfo.queryData.xzx = $("#xzx").val();
        JSXMInfo.queryData.hcdw = $("#hcdw").val();
        JSXMInfo.queryData.hcry = $("#hcry").val();
        JSXMInfo.queryData.xmmc = $("#xmmc").val();
        JSXMInfo.queryData.shlx = $("#shlx").val();
        JSXMInfo.queryData.jsdw = $("#jsdw").val();
        JSXMInfo.queryData.fkywr = $("#fkywr").val();
        JSXMInfo.queryData.zlqk = $("#zlqk").val();
        JSXMInfo.queryData.sszt = $("#sszt").val();
        JSXMInfo.queryData.ysdw = $("#ysdw").val();
        JSXMInfo.queryData.fkfx = $("#fkfx").val();
        JSXMInfo.queryData.ysjl = $("#ysjl").val();

        table.reload(JSXMInfo.tableId, {
            where: JSXMInfo.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    JSXMInfo.Reset = function () {
        $("#id").val('');
        $("#xzs").val('');
        $("#xzx").val('');
        $("#hcdw").val('');
        $("#hcry").val('');
        $("#xmmc").val('');
        $("#shlx").val('');
        $("#jsdw").val('');
        $("#fkywr").val('');
        $("#zlqk").val('');
        $("#sszt").val('');
        $("#ysdw").val('');
        $("#fkfx").val('');
        $("#ysjl").val('');
        JSXMInfo.queryData.xzs = $("#xzs").val();
        JSXMInfo.queryData.xzx = $("#xzx").val();
        console.log(JSXMInfo.queryData.xzs);

        JSXMInfo.search();
        table.reload(JSXMInfo.tableId);
        form.render();

    };

    /**
     * 弹出添加对话框
     */
    JSXMInfo.openAddDlg = function () {
        func.open({
            width: "1000rem",
            title: '添加建设项目图斑基础信息表',
            content: Feng.ctxPath + '/spot/jsxm/add',
            tableId: JSXMInfo.tableId
        });
    };
    JSXMInfo.openLocationDlg = function (data) {

        func.open({
            width: "1000rem",
            title: '建设项目图斑位置',
            content: Feng.ctxPath + '/spot/jsxm/locationHtml?id=' + data.id,
            tableId: JSXMInfo.tableId
        });
    };
    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    JSXMInfo.openEditDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '修改建设项目图斑基础信息表',
            content: Feng.ctxPath + '/spot/jsxm/edit?id=' + data.id,
            tableId: JSXMInfo.tableId
        });
    };

    /**
     * 点击详情
     *
     * @param data 点击按钮时候的行数据
     */
    JSXMInfo.openDetailDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '建设项目详情',
            content: Feng.ctxPath + '/spot/jsxm/detailHtml?id=' + data.id,
            tableId: JSXMInfo.tableId
        });
    };
    /**
     * 导出excel按钮
     */
    JSXMInfo.exportExcel = function () {
        var checkRows = table.checkStatus(JSXMInfo.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };
    /**
     * 根据excel批量导入数据
     */
    JSXMInfo.batchInsertByExcel = function () {
        layer.open({
            title: '批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['70%', '80%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/spot/jsxm/batchImport',
        });
    };
    $(document).ready(function () {
    }).keydown(
        function (e) {
            undefined

            if (e.which === 27) {
                undefined

                layer.closeAll();

            }

        });
    /**
     * 批量导入image数据
     */
    JSXMInfo.batchInsertByImage = function () {
        layer.open({
            type: 2,
            title: '文件批量上传',
            offset: '60px',
            area: ['70%', '80%'],
            content: Feng.ctxPath + '/prominemanger/damagespot/MoreImageUpload_dlg',
        });
    };
    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    JSXMInfo.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/spot/jsxm/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(JSXMInfo.tableId);
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
        elem: '#' + JSXMInfo.tableId,
        url: Feng.ctxPath + '/spot/jsxm/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: JSXMInfo.initColumn()
    });
    // 搜索按钮点击事件
    $(".icon-btn").click(function () {
        JSXMInfo.search();
        return false;
    });
    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        JSXMInfo.openAddDlg();

    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        JSXMInfo.Reset();
        return false;
    });

    // 导出excel
    $('#btnExp').click(function () {
        JSXMInfo.exportExcel();
    });

    // 根据Excel批量导入
    $('#btnExp2').click(function () {
        JSXMInfo.batchInsertByExcel();
    });
    // 图片批量导入
    $('#btnExp3').click(function () {
        JSXMInfo.batchInsertByImage();
    });

    JSXMInfo.uploadFile = function (data) {
        var editUrl = encodeURIComponent("/spot/jsxm/edit");
        var field = encodeURIComponent("fileids");
        var keyIdValue = encodeURIComponent(data.id);
        var keyIdName = encodeURIComponent("id");
        var fileType = encodeURIComponent("image");

        layer.open({
            type: 2,
            title: '文件类型',
            offset: '60px',
            area: ['70%', '80%'],
            content: Feng.ctxPath + '/spot/jsxm/jsxmFileUpload_dlg?editUrl=' + editUrl + '&field=' + field + "&keyIdValue=" + keyIdValue + "&keyIdName=" + keyIdName + "&fileType=" + fileType,
        });
    };
    // 工具条点击事件
    table.on('tool(' + JSXMInfo.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'edit') {
            JSXMInfo.openEditDlg(data);
        } else if (layEvent === 'detail') {
            JSXMInfo.openDetailDlg(data);
        } else if (layEvent === 'delete') {
            JSXMInfo.onDeleteItem(data);
        } else if (layEvent === 'location') {
            JSXMInfo.openLocationDlg(data);
        } else if (layEvent === 'uploadPic') {
            JSXMInfo.uploadFile(data, "scenePhotos");
        }
    });
});
