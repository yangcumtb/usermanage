layui.use(['table', 'layarea', 'admin', 'form', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var layarea = layui.layarea;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;
    /**
     * 历史遗留废弃图斑基础信息表管理
     */
    var lsylInfo = {
        tableId: "lsylInfoTable",
        queryData: {}
    };
    layarea.render({
        elem: '#area',
        change: function (res) {
            //选择结果
            lsylInfo.queryData.xzs = res.xzs;
            lsylInfo.queryData.xzx = res.xzx;
        }
    });


    /**
     * 初始化表格的列
     */
    lsylInfo.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left', sort: true,},
            {field: 'id', title: '图斑编号', fixed: 'left', width: 180, sort: true},
            {field: 'xzs', title: '所在地市', sort: true, width: 150},
            {field: 'xzx', title: '所在区县', sort: true, width: 150},
            {
                field: 'ztbh', title: '主体编号', sort: true, width: 180, templet: function (param) {
                    if (param.ztbh == null) {
                        return "";
                    } else {
                        return param.ztbh;
                    }

                }
            },
            {field: 'kfx', title: '中心点经度', sort: true, width: 150},
            {field: 'kfy', title: '中心点纬度', sort: true, width: 150},
            {field: 'tbmj', title: '图斑面积(㎡)', sort: true, width: 150},
            {
                field: 'tbdl', title: '图斑大类', sort: true, width: 150, templet: function (param) {
                    if (param.tbdl == "10") {
                        return "历史遗留矿山";
                    } else if(param.tbdl == "20"){
                        return "有责任主体的废弃矿山";
                    } else if(param.tbdl == "30"){
                        return "其他情形";
                    } else if(param.tbdl == "40"){
                        return "功能未损毁采矿沉陷区";
                    } else {
                        return "/";
                    }

                }
            },
            {
                field: 'tbxl', title: '图斑小类', sort: true, width: 150, templet: function (param) {
                    if (param.tbxl == "11") {
                        return "无法确认治理恢复责任主体的无主废弃矿山";
                    } else if(param.tbxl == "12"){
                        return "由政府承担治理恢复责任的政策性关闭矿山";
                    } else if(param.tbxl == "21"){
                        return "由企业履行治理恢复责任的政策性关闭矿山";
                    } else if(param.tbxl == "22"){
                        return "由企业或个人履行治理恢复责任的有主废弃矿山";
                    } else if(param.tbxl == "31"){
                        return "生产矿山";
                    } else if(param.tbxl == "32"){
                        return "采矿权过期未注销矿山";
                    } else if(param.tbxl == "33"){
                        return "自然灾毁";
                    } else if(param.tbxl == "34"){
                        return "建设类损毁";
                    } else if(param.tbxl == "35"){
                        return "河道采砂损毁";
                    } else if(param.tbxl == "36"){
                        return "尾矿库占用损毁";
                    } else if(param.tbxl == "37"){
                        return "伪变化";
                    } else if(param.tbxl == "41"){
                        return "有效矿业权范围内功能未损毁的采矿沉陷区";
                    } else if(param.tbxl == "42"){
                        return "过期未注销矿业权范围内功能未损毁的采矿沉陷区";
                    } else if(param.tbxl == "43"){
                        return "其他功能未损毁的采矿沉陷区";
                    }else {
                        return "/";
                    }
                }
            },
            {
                field: 'bhdlx', title: '保护地类型', sort: true, width: 150, templet: function (param) {
                    if (param.bhdlx == "1") {
                        return "国家公园";
                    } else if(param.bhdlx == "2") {
                        return "自然保护区";
                    } else if(param.bhdlx == "3") {
                        return "自然公园";
                    } else if(param.bhdlx == "4") {
                        return "其他";
                    } else if(param.bhdlx == "5") {
                        return "无";
                    } else {
                        return "/";
                    }
                }
            },

            {
                field: 'bhdjb', title: '保护地级别', sort: true, width: 150, templet: function (param) {
                    if (param.bhdjb == "1") {
                        return "国家级";
                    } else if (param.bhdjb == "2") {
                        return "省级";
                    }  else if (param.bhdjb == "3") {
                        return "市级";
                    } else if (param.bhdjb == "4") {
                        return "县级";
                    } else if (param.bhdjb == "5") {
                        return "无";
                    }else {
                        return "/";
                    }
                }
            },
            {
                field: 'wz', title: '矿山位置', sort: true, width: 150, templet: function (param) {
                    if (param.wz == null) {
                        return "";
                    } else {
                        return param.wz;
                    }
                }
            },
            {
                field: 'ckzh', title: '采矿证号', sort: true, width: 150, templet: function (param) {
                    if (param.ckzh == null) {
                        return "";
                    } else {
                        return param.ckzh;
                    }
                }
            },
            {
                field: 'kz', title: '矿种', sort: true, width: 150, templet: function (param) {
                    if (param.kz == null) {
                        return "";
                    } else {
                        return param.kz;
                    }
                }
            },
            {
                field: 'kcfs', title: '开采方式', sort: true, width: 150, templet: function (param) {
                    if (param.kcfs == "A") {
                        return "露天开采";
                    } else if (param.kcfs == "B") {
                        return "井工开采";
                    } else if (param.kcfs == "C") {
                        return "联合开采";
                    } else {
                        return "/";
                    }
                }
            },
            {
                field: 'tbhdmj', title: '图斑核定面积', sort: true, width: 150, templet: function (param) {
                    if (param.tbhdmj == null) {
                        return "";
                    } else {
                        return param.tbhdmj;
                    }
                }
            },
            {
                field: 'sdzlmj', title: '实地治理面积', sort: true, width: 150, templet: function (param) {
                    if (param.sdzlmj == null) {
                        return "";
                    } else {
                        return param.sdzlmj;
                    }
                }
            },
            {
                field: 'gbnd', title: '关闭年度', sort: true, width: 150, templet: function (param) {
                    if (param.gbnd == null) {
                        return "";
                    } else {
                        return param.gbnd;
                    }
                }
            },
            {
                field: 'hdydsx', title: '用地手续', sort: true, width: 150, templet: function (param) {
                    if (param.hdydsx == "A") {
                        return "有";
                    } else if (param.hdydsx == "B") {
                        return "无";
                    } else {
                        return '/';
                    }
                }
            },
            {
                field: 'hfzlqk', title: '恢复治理', sort: true, width: 150, templet: function (param) {
                    if (param.hfzlqk == "A") {
                        return "未治理";
                    } else if (param.hfzlqk == "B") {
                        return "已恢复治理";
                    } else {
                        return param.hfzlqk;
                    }
                }
            },
            {
                field: 'tbsx', title: '图斑属性', sort: true, width: 150, templet: function (param) {
                    if (param.tbsx == "1") {
                        return "采场";
                    } else if (param.tbsx == "2") {
                        return "中转场(堆煤场、其他矿石堆、选矿场等)";
                    } else if (param.tbsx == "3") {
                        return "固体废弃物堆场(煤矸石堆、废石堆、排土场等)";
                    } else if (param.tbsx == "4") {
                        return "矿山建筑";
                    } else if (param.tbsx == "5") {
                        return "塌陷坑";
                    } else if (param.tbsx == "6") {
                        return "井口/硐口";
                    } else if (param.tbsx == "7") {
                        return "其他";
                    } else if (param.tbsx == "12") {
                        return "其他重大工程建设";
                    } else if (param.tbsx == "13") {
                        return "独立选址的选矿厂等";
                    } else if (param.tbsx == "14") {
                        return "功能未损毁的采矿塌陷";
                    } else if (param.tbsx == "17") {
                        return "交通工程建设";
                    } else if (param.tbsx == "8") {
                        return "伪变化";
                    } else {
                        return "/";
                    }
                }
            },
            {
                field: 'sddl', title: '三调地类', sort: true, width: 150, templet: function (param) {
                    if (param.sddl == null) {
                        return "";
                    } else {
                        return param.sddl;
                    }
                }
            },
            {
                field: 'syq', title: '所有权权属', sort: true, width: 150, templet: function (param) {
                    if (param.syq == "A") {
                        return "国有土地所有权";
                    } else if (param.syq == "B") {
                        return "集体土地所有权";
                    } else {
                        return "/";
                    }
                }
            },
            {
                field: 'shyq', title: '使用权权属', sort: true, width: 150, templet: function (param) {
                    if (param.shyq == "A") {
                        return "国有土地使用权";
                    } else if (param.shyq == "B") {
                        return "集体土地使用权";
                    } else if (param.shyq == "C") {
                        return "其他";
                    } else {
                        return "/";
                    }
                }
            },
            {
                field: 'stwt', title: '生态问题', sort: true, width: 150, templet: function (param) {
                    if (param.stwt == "1") {
                        return "土地损毁";
                    } else if (param.stwt == "2") {
                        return "地质环境问题";
                    } else if (param.stwt == "3") {
                        return "植被破坏";
                    } else if (param.stwt == "4") {
                        return "/";
                    } else {
                        return "/";
                    }
                }
            },
            {
                field: 'nxffs', title: '修复方式', sort: true, width: 150, templet: function (param) {
                    if (param.nxffs == "1") {
                        return "自然恢复";
                    } else if (param.nxffs == "2") {
                        return "辅助再生";
                    } else if (param.nxffs == "3") {
                        return "生态重建";
                    } else if (param.nxffs == "4") {
                        return "转型利用";
                    } else if (param.nxffs == "5") {
                        return "/";
                    } else if (param.nxffs == null) {
                        return "";
                    } else {
                        return param.nxffs;
                    }
                }
            },
            {
                field: 'nxffx', title: '修复方向', sort: true, width: 150, templet: function (param) {
                    if (param.nxffx == null) {
                        return "";
                    } else {
                        return param.nxffx;
                    }
                }
            },
            {
                field: 'nxfsjd', title: '修复时间段', sort: true, width: 150, templet: function (param) {
                    if (param.nxfsjd == "A") {
                        return '"十四五"期间';
                    } else if (param.nxfsjd == "B") {
                        return '"十四五"之后';
                    } else if (param.nxfsjd == null) {
                        return "";
                    } else {
                        return param.nxfsjd;
                    }
                }
            },
            {
                field: 'fkywr', title: '复垦义务人', sort: true, width: 150, templet: function (param) {
                    if (param.fkywr == null) {
                        return "";
                    } else {
                        return param.fkywr;
                    }
                }
            },
            {
                field: 'hcdw', title: '核查单位', sort: true, width: 150, templet: function (param) {
                    if (param.hcdw == null) {
                        return "";
                    } else {
                        return param.hcdw;
                    }
                }
            },
            {
                field: 'hcry', title: '核查人', sort: true, width: 150, templet: function (param) {
                    if (param.hcry == null) {
                        return "";
                    } else {
                        return param.hcry;
                    }
                }
            },
            {
                field: 'hcrq', title: '核查日期', sort: true, width: 150, templet: function (param) {
                    if (param.hcrq == null) {
                        return "";
                    } else {
                        return param.hcrq.substring(0, 10);
                    }
                }
            },
            {
                field: 'bz', title: '备注', sort: true, width: 150, templet: function (param) {
                    if (param.bz == null) {
                        return "";
                    } else {
                        return param.bz;
                    }
                }
            },
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
    lsylInfo.search = function () {
        lsylInfo.queryData.id = $("#id").val();
        lsylInfo.queryData.xzs = $("#xzs").val();
        lsylInfo.queryData.xzx = $("#xzx").val();
        lsylInfo.queryData.ztbh= $("#ztbh").val();
        lsylInfo.queryData.tbdl = $("#tbdl").val();
        lsylInfo.queryData.bhdlx = $("#bhdlx").val();
        lsylInfo.queryData.ckzh = $("#ckzh").val();
        lsylInfo.queryData.nxfsjd = $("#nxfsjd").val();
        lsylInfo.queryData.shyq = $("#shyq").val();
        lsylInfo.queryData.syq = $("#syq").val();
        // lsylInfo.queryData.zlqk = $("#zlqk").val();
        lsylInfo.queryData.wz = $("#wz").val();
        table.reload(lsylInfo.tableId, {
            where: lsylInfo.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击重置按钮
     */
    lsylInfo.Reset = function () {
        $("#id").val('');
        $("#xzs").val('');
        $("#xzx").val('');
        $("#ztbh").val('');
        $("#tbdl").val('');
        $("#bhdlx").val('');
        $("#ckzh").val('');
        $("#nxfsjd").val('');
        $("#shyq").val('');
        $("#sszt").val('');
        $("#syq").val('');
        // $("#zlqk").val('');
        $("#wz").val('');
        lsylInfo.queryData.xzs = $("#xzs").val();
        lsylInfo.queryData.xzx = $("#xzx").val();
        lsylInfo.search();
        form.render();
        table.reload(lsylInfo.tableId);

    };

    /**
     * 弹出添加对话框
     */
    lsylInfo.openAddDlg = function () {
        func.open({
            width: "1000rem",
            title: '添加历史遗留矿山信息表',
            content: Feng.ctxPath + '/spot/lsyl/rs/add',
            tableId: lsylInfo.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    lsylInfo.openEditDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '修改历史遗留矿山信息表',
            content: Feng.ctxPath + '/spot/lsyl/rs/edit?id=' + data.id,
            tableId: lsylInfo.tableId
        });
    };
    /**
     * 点击详情
     *
     * @param data 点击按钮时候的行数据
     */
    lsylInfo.openDetailDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '历史遗留矿山详情',
            // height: '650',
            content: Feng.ctxPath + '/spot/lsyl/rs/detailHtml?id=' + data.id,
            tableId: lsylInfo.tableId
        });
    };
    /**
     * 点击定位
     *
     * @param data 点击按钮时候的行数据
     */
    lsylInfo.openLocationDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '历史遗留矿山图斑位置',
            content: Feng.ctxPath + '/spot/lsyl/locationHtml?id=' + data.id,
            tableId: lsylInfo.tableId
        });
    };


    /**
     * 导出excel按钮
     */
    lsylInfo.exportExcel = function () {
        var checkRows = table.checkStatus(lsylInfo.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 根据excel批量导入数据
     */
    lsylInfo.batchInsertByExcel = function () {
        layer.open({
            title: '批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['70%', '80%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/spot/lsylRs/batchImport'
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
    lsylInfo.batchInsertByImage = function () {
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
    lsylInfo.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/spot/lsyl/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(lsylInfo.tableId);
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
        elem: '#' + lsylInfo.tableId,
        url: Feng.ctxPath + '/spot/lsyl/rs/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: lsylInfo.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        lsylInfo.search();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        lsylInfo.openAddDlg();

    });
    // 图片批量导入
    $('#btnExp3').click(function () {
        lsylInfo.batchInsertByImage();
    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        lsylInfo.Reset();
        return false;
    });

    // 导出excel
    $('#btnExp').click(function () {
        lsylInfo.exportExcel();
    });

    // 根据Excel批量导入
    $('#btnExp2').click(function () {
        lsylInfo.batchInsertByExcel();
    });

    lsylInfo.uploadFile = function (data) {
        var editUrl = encodeURIComponent("/spot/lsyl/edit");
        var field = encodeURIComponent("fileids");
        var keyIdValue = encodeURIComponent(data.id);
        var keyIdName = encodeURIComponent("id");
        var fileType = encodeURIComponent("image");
        layer.open({
            type: 2,
            title: '文档类型',
            offset: '60px',
            area: ['70%', '80%'],
            content: Feng.ctxPath + '/spot/lsyl/lsylFileUpload_dlg?editUrl=' + editUrl + '&field=' + field + "&keyIdValue=" + keyIdValue + "&keyIdName=" + keyIdName + "&fileType=" + fileType,
        });
    };
    // 工具条点击事件
    table.on('tool(' + lsylInfo.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            lsylInfo.openEditDlg(data);
        } else if (layEvent === 'detail') {
            lsylInfo.openDetailDlg(data);
        } else if (layEvent === 'delete') {
            lsylInfo.onDeleteItem(data);
        } else if (layEvent === 'location') {
            lsylInfo.openLocationDlg(data);
        } else if (layEvent === 'uploadPic') {
            lsylInfo.uploadFile(data, "scenePhotos");
        }
    });

});
