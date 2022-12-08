layui.use(['table', 'layarea', 'form', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var layarea = layui.layarea;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;

    /**
     * 损毁/预损毁图斑信息表管理
     */
    var Damagespot = {
        tableId: "damagespotTable",
        queryData: {}
    };
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            Damagespot.queryData.xzs = res.xzs;
            Damagespot.queryData.xzx = res.xzx;
        }
    });

    /**
     * 检查列表避免null、undefined
     */
    var checkNull = function (data) {
        if (data == null || data == undefined) {
            return '/'
        } else {
            return data
        }
    }

    /**
     * 初始化表格的列
     */
    Damagespot.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left', sort: true},
            {field: 'id', fixed: 'left', sort: true, title: '图斑编号', width: 300},
            {
                field: 'tbmc', title: '图斑名称', width: 150, templet: function (param) {
                    return checkNull(param.tbmc)
                }
            },
            {
                field: 'xzs', title: '行政市', sort: true, width: 150, templet: function (param) {
                    return checkNull(param.xzs)
                }
            },
            {
                field: 'xzx', title: '行政县', sort: true, width: 150, templet: function (param) {
                    return checkNull(param.xzx)
                }
            },
            {
                field: 'sukq', sort: true, title: '图斑所属矿权名称', width: 160, templet: function (param) {
                    return checkNull(param.sukq)
                }
            },
            {
                field: 'kqbh', sort: true, title: '图斑所属矿权编号', width: 150, templet: function (param) {
                    return checkNull(param.kqbh)
                }
            },
            {
                field: 'tbmj', sort: true, title: '图斑面积(m²)', width: 150, templet: function (param) {
                    return checkNull(param.tbmj)
                }
            },
            {
                field: 'kfx', sort: true, title: '图斑中心点经度', width: 150, templet: function (param) {
                    return checkNull(param.kfx)
                }
            },
            {
                field: 'kfy', sort: true, title: '图斑中心点纬度', width: 150, templet: function (param) {
                    return checkNull(param.kfy)
                }
            },
            {
                field: 'sddl', sort: true, title: '二调地类', width: 150, templet: function (param) {
                    return checkNull(param.sddl)
                }
            },
            {
                field: 'tbsx', sort: true, title: '图斑属性', width: 160, templet: function (param) {
                    if (param.tbsx == "GYCD") {
                        return "工业场地"
                    } else if (param.tbsx == "GTDQDC") {
                        return "固体废弃堆场"
                    } else if (param.tbsx == "KSJZ") {
                        return "矿山建筑"
                    } else if (param.tbsx == "TXK") {
                        return "塌陷坑"
                    } else if (param.tbsx == "LTCC") {
                        return "露天采场"
                    } else if (param.tbsx == "WKK") {
                        return "尾矿库"
                    } else if (param.tbsx == "QTTBSX") {
                        return "其他"
                    } else {
                        return "未知"
                    }
                }
            },

            {
                field: 'shlx', sort: true, title: '损毁类型', width: 150, templet: function (param) {
                    if (param.shlx == "WS") {
                        return "挖损"
                    } else if (param.shlx == "YZ") {
                        return "压占"
                    } else if (param.shlx == "TX") {
                        return "塌陷"
                    } else {
                        return "/"
                    }
                }
            },
            {
                field: 'shsjq', sort: true, title: '损毁时间（起）', width: 160, templet: function (a) {
                    if (a.shsjq != null) {
                        var b = a.shsjq.substring(0, 7);
                        return b
                    } else {
                        var c = null;
                        return '/'
                    }

                }
            },
            {
                field: 'shsjz', sort: true, title: '损毁时间（止）', width: 160, templet: function (a) {
                    if (a.shsjz != null) {
                        var b = a.shsjz.substring(0, 7);
                        return b
                    } else {
                        var c = null;
                        return "/"
                    }

                }
            },
            {
                field: 'wsfs', sort: true, title: '挖损方式', width: 150, templet: function (param) {
                    if (param.wsfs == "1") {
                        return "采坑"
                    } else if (param.wsfs == "2") {
                        return "山坡"
                    } else if (param.wsfs == "3") {
                        return "地埋物"
                    } else if (param.wsfs == undefined) {
                        return "/"
                    }
                }
            },
            {
                field: 'zdwssd', sort: true, title: '最大挖损深度（m）', width: 170, templet: function (param) {
                    return checkNull(param.zdwssd)
                }
            },
            {
                field: 'zdtxsd', sort: true, title: '最大塌陷深度（m）', width: 170, templet: function (param) {
                    return checkNull(param.zdtxsd)
                }
            },
            {
                field: 'jsmj', sort: true, title: '积水面积(m²)', width: 160, templet: function (param) {
                    return checkNull(param.jsmj)
                }
            },
            {
                field: 'zdjssd', sort: true, title: '最大积水深度（m）', width: 170, templet: function (param) {
                    return checkNull(param.zdjssd)
                }
            },
            {
                field: 'zdyzgd', sort: true, title: '最大压占高度（m）', width: 170, templet: function (param) {
                    return checkNull(param.zdyzgd)
                }
            },
            {
                field: 'yzwlx', sort: true, title: '压占物类型', width: 170, templet: function (param) {
                    return checkNull(param.yzwlx)
                }
            },
            {
                field: 'ksdlcd', sort: true, title: '矿山道路长度（m）', width: 170, templet: function (param) {
                    return checkNull(param.ksdlcd)
                }
            },
            {
                field: 'ksdlkd', sort: true, title: '矿山道路宽度（m）', width: 170, templet: function (param) {
                    return checkNull(param.ksdlkd)
                }
            },
            {
                field: 'ksdlcz', sort: true, title: '矿山道路材质', width: 160, templet: function (param) {
                    if (param.ksdlcz == undefined) {
                        return "/"
                    } else {
                        return param.ksdlcz
                    }

                }
            },
            {
                field: 'jzwlx', sort: true, title: '建筑物类型', width: 160, templet: function (param) {
                    return checkNull(param.jzwlx)
                }
            },
            {
                field: 'stwt', sort: true, title: '主要生态问题', width: 160, templet: function (param) {
                    return checkNull(param.stwt)
                }
            },
            {
                field: 'fkywr', sort: true, title: '复垦义务人', width: 160, templet: function (param) {
                    return checkNull(param.fkywr)
                }
            },
            // {
            //     field: 'dztblx', sort: true, title: '点状图斑类型', width: 160, templet: function (param) {
            //         if (param.dztblx == "1") {
            //             return "井口"
            //         } else if (param.dztblx == "2") {
            //             return "硐口"
            //         } else if (param.dztblx == "3") {
            //             return "地灾隐患点"
            //         } else {
            //             return "/"
            //         }
            //     }
            // },
            // {
            //     field: 'dzyhlx', sort: true, title: '地质灾害隐患点类型', width: 160, templet: function (param) {
            //         return checkNull(param.dzyhlx)
            //     }
            // },
            {
                field: 'nxfsj', sort: true, title: '拟修复时间', width: 160, templet: function (a) {
                    if (a.nxfsj != null) {
                        var b = a.nxfsj.substring(0, 10);
                        return b
                    } else {
                        var c = "/";
                        return c
                    }
                }
            },
            {
                field: 'ghxffs', sort: true, title: '规划修复方式', width: 160, templet: function (param) {
                    if (param.ghxffs == undefined) {
                        return "/"
                    } else {
                        return param.ghxffs
                    }
                }
            },
            {
                field: 'ghxfmj', sort: true, title: '规划修复面积(m²)', width: 175, templet: function (param) {
                    return checkNull(param.ghxfmj)
                }
            },
            {
                field: 'fkfx', sort: true, title: '预计修复后土地利用类型', width: 235, templet: function (param) {
                    if (param.fkfx == undefined) {
                        return "/"
                    } else {
                        return param.fkfx;
                    }
                }
            },
            {
                field: 'ghyssj', sort: true, title: '规划验收时间', width: 160, templet: function (param) {
                    if (param.ghyssj == undefined) {
                        return "/"
                    } else {
                        return param.ghyssj.substring(0, 10);
                    }
                }
            },
            // {field: 'xczp', sort: true, title: '现场照片'},
            // {field: 'hcry', sort: true, title: '核查人员'},
            // {field: 'hcrq', sort: true, title: '核查日期'},
            // {field: 'qtdz', sort: true, title: '切图地址'},
            {align: 'center', fixed: 'right', width: 300, toolbar: '#tableBar', title: '操作'}
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
    Damagespot.search = function () {
        var queryData = {};


        table.reload(Damagespot.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    Damagespot.openAddDlg = function () {
        func.open({
            width: "1000rem",
            title: '添加损毁/预损毁图斑信息表',
            content: Feng.ctxPath + '/prominemanger/damagespot/add',
            tableId: Damagespot.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    Damagespot.openEditDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '修改损毁/预损毁图斑信息表',
            content: Feng.ctxPath + '/prominemanger/damagespot/edit?id=' + data.id,
            tableId: Damagespot.tableId
        });
    };


    /**
     * 导出excel按钮
     */
    Damagespot.exportExcel = function () {
        var checkRows = table.checkStatus(Damagespot.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            var L = checkRows.data.length;
            var ID = checkRows.data[0].id;
            for (i = 1; i < L; i++) {
                var Data= checkRows.data[i];
                ID = ID + "," + Data.id;
            }
            window.open(Feng.ctxPath + '/common/damagespot/excelsingleos?ids=' + ID);

        }


    };


    /**
     * 导出所有excel按钮
     */
    Damagespot.exportExcelAll = function () {
        window.open(Feng.ctxPath + '/common/damagespot/excelos');
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    Damagespot.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/damagespot/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Damagespot.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否删除?删除操作会删除该图斑所有的影像图、规划图以及外业核查图，请谨慎操作！", operation);
    };

    Damagespot.onDetails = function (data) {
        func.open({
            width: "1200rem",
            title: '详情',
            content: Feng.ctxPath + '/prominemanger/damagespot/detailHtml?id=' + data.id,
            tableId: Damagespot.tableId
        });
    }

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Damagespot.tableId,
        url: Feng.ctxPath + '/prominemanger/damagespot/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: Damagespot.initColumn()
    });


    Damagespot.openLocationDlg = function (data) {
        func.open({
            width: "1000rem",
            title: '损毁图斑位置',
            content: Feng.ctxPath + '/prominemanger/damagespot/locationHtml?id=' + data.id,
            tableId: Damagespot.tableId
        });
    };


    Damagespot.search = function () {
        Damagespot.queryData.id = $("#id").val();
        Damagespot.queryData.xzs = $("#xzs").val();
        Damagespot.queryData.xzx = $("#xzx").val();
        Damagespot.queryData.kqbh = $("#kqbh").val();
        Damagespot.queryData.sddl = $("#sddl").val();
        Damagespot.queryData.shlx = $("#shlx").val();
        Damagespot.queryData.ydsx = $("#ydsx").val();
        Damagespot.queryData.wsfs = $("#wsfs").val();
        Damagespot.queryData.sukq = $("#sukq").val();

        table.reload(Damagespot.tableId, {
            where: Damagespot.queryData,
            page: {curr: 1}
        });
    };
    /**
     * 点击重置按钮
     */
    Damagespot.Reset = function () {
        $("#id").val('');
        $("#xzs").val('');
        $("#xzx").val('');
        $("#kqbh").val('');
        $("#sddl").val('');
        $("#shlx").val('');
        $("#ydsx").val('');
        $("#wsfs").val('');
        $("#sukq").val('');
        Damagespot.queryData.xzs = $("#xzs").val();
        Damagespot.queryData.xzx = $("#xzx").val();
        Damagespot.search();
        form.render();
        table.reload(Damagespot.tableId);
    };


    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Damagespot.search();
        return false;
    });

    // 重置按钮事件
    $('#btnReset').click(function () {
        Damagespot.Reset();
        return false;
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        Damagespot.openAddDlg();

    });

    // 导出excel
    $('#btnExp').click(function () {
        Damagespot.exportExcel();
    });

    // 导出excel
    $('#btnExp1').click(function () {
        Damagespot.exportExcelAll();
    });

    /**
     * 根据excel批量导入数据
     */
    Damagespot.batchInsertByExcel = function () {
        layer.open({
            title: '批量导入',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['70%', '80%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: Feng.ctxPath + '/spot/damageImportExcelList',
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
    Damagespot.batchInsertByImage = function () {
        layer.open({
            type: 2,
            title: '文件批量上传',
            offset: '60px',
            area: ['70%', '80%'],
            content: Feng.ctxPath + '/prominemanger/damagespot/MoreImageUpload_dlg',
        });
    };

    /**
     * 批量转换图斑为已修复图斑
     */
    Damagespot.batchChangeSpot = function () {
        var checkRows2 = table.checkStatus(Damagespot.tableId);
        var ids = "";
        var changeType = 2;

        if (checkRows2.data.length === 0) {
            Feng.error("请选择要转换的数据");
        } else {
            var operation = function () {
                var L = checkRows2.data.length;
                for (i = 0; i < L; i++) {
                    var Date = checkRows2.data[i];
                    ids = ids + Date.id + ",";
                }
                var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/damagespot/changeSpotType", 'post', function (data) {
                    Feng.success(data.message);
                    table.reload(Damagespot.tableId);
                }, function (data) {
                    Feng.error("转换失败!" + data.message + "!");
                });
                var Data = {
                    "ids": ids,
                    "changeType": 2
                };
                ajax.set(Data);
                debugger;
                ajax.setContentType('application/json');
                ajax.start();
            };
            Feng.confirm("请确认是否转换所选图斑为已修复图斑?\n请注意转换后请及时在已修复图斑列表中添加缺失字段信息。", operation);
        }


    }

    /**
     * 导出全省shp数据
     */
    Damagespot.exportSql = function () {
        var ajax = new HttpRequest(Feng.ctxPath + '/prominemanger/damagespot/pgsql2shp', 'POST')
        var result = ajax.start();
        if (result.success !== true) {
            Feng.error("请求数据为空！");
        } else {
            window.open(Feng.ctxPath + "/prominemanger/damagespot/shpDownload");
            Feng.success("导出成功!");
        }

    };


    // 批量导入
    $('#btnExp2').click(function () {
        Damagespot.batchInsertByExcel();
    });

    // 图片批量导入
    $('#btnExp3').click(function () {
        Damagespot.batchInsertByImage();
    });

    // 转换图斑为已修复图斑
    $('#btnChangeSpot').click(function () {
        Damagespot.batchChangeSpot();
    });

    // 导出全省shp数据
    $('#btnSql').click(function () {
        Damagespot.exportSql();
    });


    Damagespot.openFileuplod = function (data) {
        var editUrl = encodeURIComponent("/prominemanger/damagespot/edit");
        var field = encodeURIComponent("fileids");
        var keyIdValue = encodeURIComponent(data.id);
        var keyIdName = encodeURIComponent("id");
        var fileType = encodeURIComponent("image");
        layer.open({
            type: 2,
            title: '文件类型',
            offset: '60px',
            area: ['70%', '80%'],
            content: Feng.ctxPath + '/prominemanger/damagespot/damageFileUpload_dlg?editUrl=' + editUrl + '&field=' + field + "&keyIdValue=" + keyIdValue + "&keyIdName=" + keyIdName + "&fileType=" + fileType,
        });
    };


    // 工具条点击事件
    table.on('tool(' + Damagespot.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Damagespot.openEditDlg(data);
        } else if (layEvent === 'delete') {
            Damagespot.onDeleteItem(data);
        } else if (layEvent === 'location') {
            Damagespot.openLocationDlg(data);
        } else if (layEvent === 'uploadPic') {
            Damagespot.openFileuplod(data, "scenePhotos");
        } else if (layEvent === 'detail') {
            Damagespot.onDetails(data);
        }
    });
});
