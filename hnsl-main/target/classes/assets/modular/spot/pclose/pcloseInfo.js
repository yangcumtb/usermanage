layui.use(['table', 'layarea', 'admin', 'form', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var layarea = layui.layarea;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;
    layarea.render({
        elem: '#area',
        change: function (res) {
            //选择结果
            PcloseInfo.queryData.xzs = res.xzs;
            PcloseInfo.queryData.xzx = res.xzx;
        }
    });
    /**
     * 政策性关闭待复垦矿山信息表管理
     */
    var PcloseInfo = {
        tableId: "pcloseInfoTable",
        queryData: {}
    };

    /**
     * 初始化表格的列
     */
    PcloseInfo.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left', sort: true},
            // {field: 'id', hide: true, title: 'ID'},
            {field: 'id', fixed: 'left', width: 200, title: '图斑编号', fixed: 'left', sort: true},
            {field: 'xzs', width: 150, title: '所在地市', sort: true},
            {field: 'xzx', width: 150, title: '所在区县', sort: true},
            {field: 'wz', width: 150, title: '图斑位置', sort: true},
            {field: 'tbmj', width: 150, title: '图斑面积(㎡)', width: 120, sort: true},
            {field: 'kfx', width: 150, title: '中心点经度', sort: true},
            {field: 'kfy', width: 150, title: '中心点纬度', sort: true},
            {
                field: 'shlx', width: 120, title: '损毁类型', sort: true, templet: function (d) {
                    if (d.shlx == "挖损") {
                        return "挖损";
                    } else if (d.shlx == "压占") {
                        return "压占";
                    } else if(d.shlx == "塌陷"){
                        return "塌陷";
                    }else{
                        return "无";
                    }
                }
            },
            {
                field: 'tbsx', width: 150, title: '图斑属性', sort: true, templet: function (d) {
                    if (d.tbsx == "露天矿场") {
                        return "露天矿场";
                    } else if (d.tbsx == "堆煤场") {
                        return "堆煤场";
                    } else if (d.tbsx == "洗煤厂") {
                        return "洗煤厂";
                    } else if (d.tbsx == "煤矸石堆") {
                        return "煤矸石堆";
                    } else if (d.tbsx == "其他矿石堆场") {
                        return "其他矿石堆场";
                    } else if (d.tbsx == "选矿厂") {
                        return "选矿厂";
                    } else if (d.tbsx == "选矿池") {
                        return "选矿池";
                    } else if (d.tbsx == "表土堆场") {
                        return "表土堆场";
                    } else if (d.tbsx == "内排土场") {
                        return "内排土场";
                    } else if (d.tbsx == "外排土场") {
                        return "外排土场";
                    } else if (d.tbsx == "废石堆") {
                        return "废石堆";
                    } else if (d.tbsx == "尾矿库") {
                        return "尾矿库";
                    } else if (d.tbsx == "工业广场建筑") {
                        return "工业广场建筑";
                    } else if (d.tbsx == "塌陷坑") {
                        return "塌陷坑";
                    } else if (d.tbsx == "油气井场") {
                        return "油气井场";
                    } else if (d.tbsx == "油气场站") {
                        return "油气场站";
                    } else if (d.tbsx == "炸药库") {
                        return "炸药库";
                    } else if (d.tbsx == "矿山道路") {
                        return "矿山道路";
                    } else if (d.tbsx == "地裂缝") {
                        return "地裂缝";
                    } else if (d.tbsx == "崩塌") {
                        return "崩塌";
                    } else if (d.tbsx == "滑坡") {
                        return "滑坡";
                    } else if (d.tbsx == "其他") {
                        return "其他";
                    }else{
                        return "无";
                    }
                }
            },
            {
                field: 'sddl', width: 200, title: '三调地类', sort: true, templet: function (d) {
                    if (d.sddl == "耕地") {
                        return "耕地";
                    } else if (d.sddl == "园地") {
                        return "园地";
                    } else if (d.sddl == "林地") {
                        return "林地";
                    } else if (d.sddl == "草地") {
                        return "草地";
                    } else if (d.sddl == "商服用地") {
                        return "商服用地";
                    } else if (d.sddl == "工矿仓储用地") {
                        return "工矿仓储用地";
                    } else if (d.sddl == "住宅用地") {
                        return "住宅用地";
                    } else if (d.sddl == "公共管理与公共服务用地") {
                        return "公共管理与公共服务用地";
                    } else if (d.sddl == "特殊用地") {
                        return "特殊用地";
                    } else if (d.sddl == "交通运输用地") {
                        return "交通运输用地";
                    } else if (d.sddl == "水域及水利设施用地") {
                        return "水域及水利设施用地";
                    } else if (d.sddl == "其他用地") {
                        return "其他用地";
                    }else{
                        return "无";
                    }
                }
            },
            {
                field: 'syq', width: 180, title: '所有权权属', sort: true, templet: function (d) {
                    if (d.syq == "GYTDSYQ") {
                        return "国有土地所有权";
                    } else {
                        return "集体土地所有权";
                    }
                }
            },
            {
                field: 'shyq', width: 180, title: '使用权权属', sort: true, templet: function (d) {
                    if (d.shyq == "GYSYQ") {
                        return "国有土地使用权";
                    } else if (d.shyq == "JTSYQ") {
                        return "集体土地使用权";
                    } else {
                        return "其他";
                    }
                }
            },
            {
                field: 'ydsx', width: 180, title: '有无合法用地手续', sort: true, templet: function (d) {
                    if (d.ydsx == "1") {
                        return "有";
                    } else {
                        return "无";
                    }
                }
            },
            {field: 'kqbh', width: 150, title: '采矿权证编号', sort: true},
            {
                field: 'kqqxq', width: 200, title: '采矿权证有效期起', sort: true, templet: function (a) {
                    if (a.kqqxq != null) {
                        var b = a.kqqxq.substring(0, 10);
                        return b
                    } else {
                        return ''
                    }

                }
            },
            {
                field: 'kqqxz', width: 200, title: '采矿权证有效期止', sort: true, templet: function (a) {
                    if (a.kqqxz != null) {
                        var b = a.kqqxz.substring(0, 10);
                        return b
                    } else {
                        return ''
                    }

                }
            },
            {field: 'kqmc', width: 150, title: '采矿权名称', sort: true},
            {field: 'xmdw', width: 150, title: '项目单位', sort: true},
            {field: 'kz', width: 120, title: '矿种', sort: true},
            {
                field: 'kcfs', width: 140, title: '开采方式', sort: true, templet: function (d) {
                    if (d.kcfs == "地下开采") {
                        return "地下开采";
                    } else if (d.kcfs == "露天开采") {
                        return "露天开采";
                    } else {
                        return "露井联采";
                    }
                }
            },
            {
                field: 'zlqk', width: 140, title: '修复情况', sort: true, templet: function (d) {
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
            {field: 'zlmj', width: 180, title: '实地治理面积(㎡)', sort: true},
            {
                field: 'nxfsj', width: 200, title: '拟修复时间', sort: true, templet: function (a) {
                    if (a.nxfsj != null) {
                        var b = a.nxfsj.substring(0, 10);
                        return b
                    } else {
                        return ''
                    }

                }
            },
            {field: 'damagetime', width: 200, title: '损毁时间', sort: true},
            {
                field: 'xczp', width: 180, title: '核查现场的照片', sort: true, templet: function (d) {
                    if (d.dd == null || d.dd == undefined) {
                        return "上传照片";
                    } else {
                        return "查看照片";
                    }
                }
            },
            {field: 'hcdw', width: 160, title: '核查单位名称', sort: true},
            {field: 'hcry', width: 160, title: '核查人员姓名', sort: true},
            {
                field: 'hcrq', width: 200, title: '核查具体日期', sort: true, templet: function (a) {
                    if (a.hcrq != null) {
                        var b = a.hcrq.substring(0, 10);
                        return b
                    } else {
                        return ''
                    }

                }
            },
            // {field: 'qTDZ', width: 180, title: '切图文件存储地址', sort: true},
            {field: 'sszt', width: 180, title: '实施主体', sort: true},
            {
                field: 'fksj', width: 200, title: '复垦/治理时间', sort: true, templet: function (a) {
                    if (a.fksj != null) {
                        var b = a.fksj.substring(0, 10);
                        return b
                    } else {
                        return ''
                    }

                }
            },
            {
                field: 'yssj', width: 200, title: '验收时间', sort: true, templet: function (a) {
                    if (a.yssj != null) {
                        var b = a.yssj.substring(0, 10);
                        return b
                    } else {
                        return ''
                    }

                }
            },
            {field: 'ysdw', width: 180, title: '组织验收单位', sort: true},
            {
                field: 'ysjl', width: 180, title: '验收结论', sort: true, templet: function (d) {
                    if (d.ysjl == "通过") {
                        return "通过";
                    } else if (d.ysjl == "有条件通过") {
                        return "有条件通过";
                    } else {
                        return "未通过，整改";
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
            {field: 'zttz', width: 310, title: '总体投资（万元）', sort: true},
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
    PcloseInfo.search = function () {
        PcloseInfo.queryData.id = $("#id").val();
        PcloseInfo.queryData.xzs = $("#xzs").val();
        PcloseInfo.queryData.xzx = $("#xzx").val();
        PcloseInfo.queryData.hcdw = $("#hcdw").val();
        PcloseInfo.queryData.hcry = $("#hcry").val();
        PcloseInfo.queryData.ysdw = $("#ysdw").val();
        PcloseInfo.queryData.shlx = $("#shlx").val();
        PcloseInfo.queryData.tbsx = $("#tbsx").val();
        PcloseInfo.queryData.shyq = $("#shyq").val();
        PcloseInfo.queryData.syq = $("#syq").val();
        PcloseInfo.queryData.zlqk = $("#zlqk").val();
        PcloseInfo.queryData.zrzt = $("#zrzt").val();
        table.reload(PcloseInfo.tableId, {
            where: PcloseInfo.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    PcloseInfo.Reset = function () {
        $("#id").val('');
        $("#xzs").val('');
        $("#xzx").val('');
        $("#hcdw").val('');
        $("#hcry").val('');
        $("#ysdw").val('');
        $("#shlx").val('');
        $("#tbsx").val('');
        $("#shyq").val('');
        $("#syq").val('');
        $("#zlqk").val('');
        $("#zrzt").val('');
        PcloseInfo.queryData.xzs = $("#xzs").val();
        PcloseInfo.queryData.xzx = $("#xzx").val();
        PcloseInfo.search();
        form.render();
        table.reload(PcloseInfo.tableId);

    };

    /**
     * 弹出添加对话框
     */
    PcloseInfo.openAddDlg = function () {
        func.open({
            width: "1000rem",
            title: '添加政策性关闭待复垦矿山信息表',
            content: Feng.ctxPath + '/spot/pclose/add',
            tableId: PcloseInfo.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    PcloseInfo.openEditDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '修改政策性关闭待复垦矿山信息表',
            content: Feng.ctxPath + '/spot/pclose/edit?id=' + data.id,
            tableId: PcloseInfo.tableId
        });
    };

    /**
     * 点击查看
     *
     * @param data 点击按钮时候的行数据
     */
    PcloseInfo.openDetailDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '政策关闭矿山详情',
            content: Feng.ctxPath + '/spot/pclose/detailHtml?id=' + data.id,
            tableId: PcloseInfo.tableId
        });
    };

    PcloseInfo.openLocationDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '政策性关闭矿山图斑位置',
            content: Feng.ctxPath + '/spot/pclose/locationHtml?id=' + data.id,
            tableId: PcloseInfo.tableId
        });
    };
    /**
     * 导出excel按钮
     */
    PcloseInfo.exportExcel = function () {
        var checkRows = table.checkStatus(PcloseInfo.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    PcloseInfo.batchInsertByExcel = function () {
        layer.open({
            title: '批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['70%', '80%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/spot/pclose/batchImport'
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
    PcloseInfo.batchInsertByImage = function () {
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
    PcloseInfo.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/spot/pclose/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(PcloseInfo.tableId);
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
        elem: '#' + PcloseInfo.tableId,
        url: Feng.ctxPath + '/spot/pclose/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: PcloseInfo.initColumn(),
    });

    // 搜索按钮点击事件
    $(".icon-btn").click(function () {
        PcloseInfo.search();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        PcloseInfo.openAddDlg();

    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        PcloseInfo.Reset();
        return false;
    });

    // 导出excel
    $('#btnExp').click(function () {
        PcloseInfo.exportExcel();
    });
    // 根据Excel批量导入
    $('#btnExp2').click(function () {
        PcloseInfo.batchInsertByExcel();
    });

    // 图片批量导入
    $('#btnExp3').click(function () {
        PcloseInfo.batchInsertByImage();
    });

    PcloseInfo.uploadFile = function (data) {
        var editUrl = encodeURIComponent("/spot/pclose/edit");
        var field = encodeURIComponent("fileids");
        var keyIdValue = encodeURIComponent(data.id);
        var keyIdName = encodeURIComponent("id");
        var fileType = encodeURIComponent("image");
        layer.open({
            type: 2,
            title: '文档类型',
            offset: '60px',
            area: ['70%', '80%'],
            content: Feng.ctxPath + '/spot/pclose/pcloseFileUpload_dlg?editUrl=' + editUrl + '&field=' + field + "&keyIdValue=" + keyIdValue + "&keyIdName=" + keyIdName + "&fileType=" + fileType,
        });
    };
    // 工具条点击事件
    table.on('tool(' + PcloseInfo.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'edit') {
            PcloseInfo.openEditDlg(data);
        } else if (layEvent === 'detail') {
            PcloseInfo.openDetailDlg(data);
        } else if (layEvent === 'delete') {
            PcloseInfo.onDeleteItem(data);
        } else if (layEvent === 'location') {
            PcloseInfo.openLocationDlg(data);
        } else if (layEvent === 'uploadPic') {
            PcloseInfo.uploadFile(data, "scenePhotos");
        }
    });
});
