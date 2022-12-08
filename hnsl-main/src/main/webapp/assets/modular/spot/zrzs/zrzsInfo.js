/**
 * 自然灾损图斑基础信息表管理
 */
layui.use(['table', 'layarea', 'admin', 'form', 'laydate', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var layarea = layui.layarea;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var laydate = layui.laydate;
    var form = layui.form;

    var zrzsInfo = {
        tableId: "zrzsInfoTable",
        queryData: {}
    };
    layarea.render({
        elem: '#area',
        change: function (res) {
            //选择结果
            zrzsInfo.queryData.xzs = res.xzs;
            zrzsInfo.queryData.xzx = res.xzx;
        }
    });

    // 渲染时间选择框
    var today = (new Date()).toLocaleDateString();
    laydate.render({
        elem: "#hcrq",
        // min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#fksj",
        // min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#yssj",
        // min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#nxfsj",
        // min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });


    /**
     * 初始化表格的列
     */
    zrzsInfo.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left', sort: true},
            {field: 'id', fixed: 'left', width: 200, title: '图斑编号', sort: true},
            {field: 'xzs', width: 150, title: '矿区所在市', sort: true},
            {field: 'xzx', width: 150, title: '矿区所在县', sort: true},
            {field: 'hdmj', width: 180, title: '土地损毁面积(m²)', sort: true},
            {field: 'wz', width: 200, title: '图斑位置', sort: true,},
            {field: 'kfx', width: 150, title: '中心点经度', sort: true,},
            {field: 'kfy', width: 150, title: '中心点纬度', sort: true,},
            {field: 'fkywr', width: 150, title: '复垦义务人', sort: true},
            {
                field: 'stwt', width: 150, title: '损毁原因', sort: true, templet: function (d) {
                    if (d.stwt == "TDSH") {
                        return "土地损毁";
                    } else if (d.stwt == "DZHJWT") {
                        return "地质环境问题";
                    } else if (d.stwt == "ZBPH") {
                        return "植被破坏";
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
            {field: 'zlmj', width: 150, title: '治理面积(㎡)', sort: true},
            {
                field: 'nxfsj', width: 200, title: '拟修复时间', sort: true, templet: function (a) {
                    if (a.nxfsj != null) {
                        var b = a.nxfsj.substring(0, 10);
                        return b

                    } else {
                        var c = null;
                        return c
                    }
                }
            },
            {field: 'damagetime', width: 200, title: '损毁时间', sort: true},
            {field: 'xczp', width: 150, title: '现场照片', sort: true},
            {field: 'hcdw', width: 150, title: '核查单位名称', sort: true},
            {field: 'hcry', width: 150, title: '核查人员姓名', sort: true},
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
            {field: 'ysdw', width: 150, title: '组织验收单位', sort: true},
            {
                field: 'ysjl', width: 150, title: '验收结论', sort: true, templet: function (d) {
                    if (d.ysjl == "TG") {
                        return "通过";
                    } else if (d.ysjl == "YTJTG") {
                        return "有条件通过";
                    } else if (d.ysjl == "WTG") {
                        return "未通过";
                    } else {
                        return d.ysjl;
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
            {fixed: 'right', toolbar: '#tableBar', title: '操作', align: 'center', width: 310}
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
    zrzsInfo.search = function () {
        zrzsInfo.queryData.id = $("#id").val();
        zrzsInfo.queryData.xzs = $("#xzs").val();
        zrzsInfo.queryData.xzx = $("#xzx").val();
        zrzsInfo.queryData.hcdw = $("#hcdw").val();
        zrzsInfo.queryData.hcry = $("#hcry").val();
        zrzsInfo.queryData.yssj = $("#yssj").val();
        zrzsInfo.queryData.fkfx = $("#fkfx").val();
        zrzsInfo.queryData.hdmj = $("#hdmj").val();
        zrzsInfo.queryData.wz = $("#wz").val();
        zrzsInfo.queryData.fkywr = $("#fkywr").val();
        zrzsInfo.queryData.zlmj = $("#zlmj").val()
        zrzsInfo.queryData.sszt = $("#sszt").val();
        zrzsInfo.queryData.ysdw = $("#ysdw").val();
        zrzsInfo.queryData.zttz = $("#zttz").val();
        zrzsInfo.queryData.stwt = $("#stwt").val();
        zrzsInfo.queryData.ysjl = $("#ysjl").val();
        zrzsInfo.queryData.zlqk = $("#zlqk").val();
        zrzsInfo.queryData.fksj = $("#fksj").val();
        zrzsInfo.queryData.nxfsj = $("#nxfsj").val();
        zrzsInfo.queryData.hcrq = $("#hcrq").val();

        table.reload(zrzsInfo.tableId, {
            where: zrzsInfo.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    zrzsInfo.Reset = function () {
        $("#id").val('');
        $("#xzs").val('');
        $("#xzx").val('');
        $("#hcdw").val('');
        $("#hcry").val('');
        $("#yssj").val('');
        $("#fkfx").val('');
        $("#hdmj").val('');
        $("#wz").val('');
        $("#fkywr").val('');
        $("#zlmj").val('')
        $("#sszt").val('');
        $("#ysdw").val('');
        $("#zttz").val('');
        $("#stwt").val('');
        $("#ysjl").val('');
        $("#zlqk").val('');
        $("#fksj").val('');
        $("#nxfsj").val('');
        $("#hcrq").val('');
        zrzsInfo.queryData.xzs = $("#xzs").val();
        zrzsInfo.queryData.xzx = $("#xzx").val();
        zrzsInfo.search();
        form.render();
        table.reload(zrzsInfo.tableId);

    };

    /**
     * 弹出添加对话框
     */
    zrzsInfo.openAddDlg = function () {
        func.open({
            width: "1000rem",
            title: '添加自然灾损图斑',
            content: Feng.ctxPath + '/spot/zrzs/add',
            shade: 0.6,
            tableId: zrzsInfo.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    zrzsInfo.openEditDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '修改自然灾损表',
            content: Feng.ctxPath + '/spot/zrzs/edit?id=' + data.id,
            tableId: zrzsInfo.tableId
        });
    };
    /**
     * 点击详情
     *
     * @param data 点击按钮时候的行数据
     */
    zrzsInfo.openDetailDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '自然灾损详情',
            content: Feng.ctxPath + '/spot/zrzs/detailHtml?id=' + data.id,
            tableId: zrzsInfo.tableId
        });
    };
    zrzsInfo.openLocationDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '自然灾损图斑位置',
            content: Feng.ctxPath + '/spot/zrzs/locationHtml?id=' + data.id,
            tableId: zrzsInfo.tableId
        });
    };

    /**
     * 导出excel按钮
     */
    zrzsInfo.exportExcel = function () {
        var checkRows = table.checkStatus(zrzsInfo.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 根据excel批量导入数据
     */
    zrzsInfo.batchInsertByExcel = function () {
        layer.open({
            title: '批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['70%', '80%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/spot/zrzs/batchImport',
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
    zrzsInfo.batchInsertByImage = function () {
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
    zrzsInfo.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/spot/zrzs/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(zrzsInfo.tableId);
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
        elem: '#' + zrzsInfo.tableId,
        url: Feng.ctxPath + '/spot/zrzs/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: zrzsInfo.initColumn(),
    });

    // 搜索按钮点击事件
    $(".icon-btn").click(function () {
        zrzsInfo.search();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        zrzsInfo.openAddDlg();

    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        zrzsInfo.Reset();
        return false;
    });

    // 导出excel
    $('#btnExp').click(function () {
        zrzsInfo.exportExcel();
    });
    // 根据Excel批量导入
    $('#btnExp2').click(function () {
        zrzsInfo.batchInsertByExcel();
    });
    // 图片批量导入
    $('#btnExp3').click(function () {
        zrzsInfo.batchInsertByImage();
    });

    zrzsInfo.uploadFile = function (data) {
        var editUrl = encodeURIComponent("/spot/zrzs/edit");
        var field = encodeURIComponent("fileids");
        var keyIdValue = encodeURIComponent(data.id);
        var keyIdName = encodeURIComponent("id");
        var fileType = encodeURIComponent("image");

        layer.open({
            type: 2,
            title: '文档类型',
            offset: '60px',
            area: ['70%', '80%'],
            content: Feng.ctxPath + '/spot/zrzs/zrzsFileUpload_dlg?editUrl=' + editUrl + '&field=' + field + "&keyIdValue=" + keyIdValue + "&keyIdName=" + keyIdName + "&fileType=" + fileType,
        });
    };
    // 工具条点击事件
    table.on('tool(' + zrzsInfo.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            zrzsInfo.openEditDlg(data);
        } else if (layEvent === 'detail') {
            zrzsInfo.openDetailDlg(data);
        } else if (layEvent === 'delete') {
            zrzsInfo.onDeleteItem(data);
        } else if (layEvent === 'location') {
            zrzsInfo.openLocationDlg(data);
        } else if (layEvent === 'uploadPic') {
            zrzsInfo.uploadFile(data, "scenePhotos");
        }
    });
});
