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

    //获取用户等级
    var ajaxUser = new HttpRequest(Feng.ctxPath + "/map/loginDetail/", "get");
    var Dis = ajaxUser.start();
    var userlevel = Dis.data.userLevel;

    /**
     * 初始化表格的列
     */
    lsylInfo.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left', sort: true,},
            {field: 'xmmc', title: '项目名称', fixed: 'left', sort: true, width: 400},
            {
                field: 'psjd', sort: true, title: '审批进展', templet: function (pro) {
                    var item = pro.psjd;
                    var psbh = pro.psbhjd;
                    var fyjd = pro.fyjd;
                    if (psbh == 1) {
                        return "已驳回"
                    } else {
                        if (item == 1) {
                            return "县级提交"
                        } else if (item == 2) {
                            return "县级终审"
                        } else if (item == 3) {
                            return "市级审批"
                        } else if (item == 4) {
                            return "省级审批"
                        } else if (item == 5) {
                            if (fyjd == 0) {
                                return "已入库"
                            } else if (fyjd == 1) {
                                return "申请复议"
                            } else if (fyjd == 2) {
                                return "复议中"
                            } else if (fyjd == 3) {
                                return "驳回复议"
                            }
                        } else {
                            return "节点追踪失败"
                        }
                    }
                }
            },
            {field: 'dq', title: '地区', sort: true, width: 150},
            {field: 'kfx', title: '中心点经度', sort: true, width: 150},
            {field: 'kfy', title: '中心点纬度', sort: true, width: 150},
            {field: 'yszzj', title: '预算总资金(万元)', sort: true, width: 150},
            {field: 'sbzj', title: '省补资金(万元)', sort: true, width: 150},
            {field: 'xflx', title: '修复类型', sort: true, width: 150},
            {field: 'zlnd', title: '治理年度', sort: true, width: 150},
            {field: 'mj', title: '面积(m²)', sort: true, width: 150},
            {field: 'bz', title: '备注', sort: true, width: 150},
            // {field: 'associateId', title: '文件关联id', sort: true, width: 150},
            // {field: 'psbhjd', title: '项目驳回节点', sort: true, width: 150},
            // {field: 'pssjXf', title: '县级终审时间', sort: true, width: 150},
            {
                field: 'pssjXs', sort: true, title: '县级提交时间', width: 150, templet: function (a) {
                    if (a.pssjXs != null) {
                        var b = a.pssjXs.substring(0, 10);
                        return b
                    } else {
                        var c = '/';
                        return c
                    }
                }
            },
            {
                field: 'pssjC', sort: true, title: '市级评审时间', width: 150, templet: function (a) {
                    if (a.pssjC != null) {
                        var b = a.pssjC.substring(0, 10);
                        return b
                    } else {
                        var c = '/';
                        return c
                    }
                }
            },
            {
                field: 'pssjS', sort: true, title: '省级评审时间', width: 150, templet: function (a) {
                    if (a.pssjS != null) {
                        var b = a.pssjS.substring(0, 10);
                        return b
                    } else {
                        var c = '/';
                        return c
                    }
                }
            },
            // {
            //     field: 'tjlx', title: '提交类型', sort: true, width: 150, templet: function (d) {
            //         if (d.tjlx == 0) {
            //             return "初审"
            //         } else if (d.tjlx == 1) {
            //             return "终审"
            //         } else {
            //             return "数据错误"
            //         }
            //     }
            // },
            {field: 'bhyj', title: '驳回意见', sort: true, width: 150},

            {align: 'center',fixed: 'right', width: 310, toolbar: "#tool", title: '操作'}
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
        lsylInfo.queryData.xmmc = $("#xmmc").val();
        lsylInfo.queryData.dq = $("#dq").val();
        lsylInfo.queryData.zlnd = $("#zlnd").val();
        lsylInfo.queryData.xflx = $("#xflx").val();
        lsylInfo.queryData.xmzt = $("#xmzt").val();

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
        $("#xmmc").val('');
        $("#dq").val('');
        $("#zlnd").val('');
        $("#xflx").val('');
        $("#xmzt").val('');
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
            title: '添加项目立项',
            content: Feng.ctxPath + '/lsylProject/add',
            tableId: lsylInfo.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    lsylInfo.openEditDlg = function (data) {
        console.log(data.psjd);
        if (data.psbhjd != 1) {
            if (data.psjd == "5") {
                if (data.fyjd == "2") {
                    if (userlevel == "省级") {
                        func.open({
                            width: "1000rem",
                            title: '复议文件上传',
                            content: Feng.ctxPath + '/lsylProject/ReconHtml?id=' + data.id,
                            tableId: lsylInfo.tableId
                        });
                    } else {
                        func.open({
                            width: "1000rem",
                            title: '项目立项编辑',
                            content: Feng.ctxPath + '/lsylProject/editHtml?id=' + data.id,
                            tableId: lsylInfo.tableId
                        });
                    }
                } else {
                    func.open({
                        width: "1000rem",
                        title: '复议文件上传',
                        content: Feng.ctxPath + '/lsylProject/ReconHtml?id=' + data.id,
                        tableId: lsylInfo.tableId
                    });
                }
            } else {
                func.open({
                    width: "1000rem",
                    title: '项目立项编辑',
                    content: Feng.ctxPath + '/lsylProject/editHtml?id=' + data.id,
                    tableId: lsylInfo.tableId
                });
            }
        } else {
            func.open({
                width: "1000rem",
                title: '项目立项编辑',
                content: Feng.ctxPath + '/lsylProject/editHtml?id=' + data.id,
                tableId: lsylInfo.tableId
            });
        }
    };
    /**
     * 点击详情
     *
     * @param data 点击按钮时候的行数据
     */
    lsylInfo.openDetailDlg = function (data) {
        // console.log(data.id);
        func.open({
            width: "1000rem",
            title: '项目立项详情',
            // height: '650',
            content: Feng.ctxPath + '/lsylProject/detailHtml?id=' + data.id,
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
            content: Feng.ctxPath + '/lsylProject/locationHtml?id=' + data.id,
            tableId: lsylInfo.tableId
        });
    };
    /**
     * 点击查看审批按钮
     */
    lsylInfo.onCheck = function (data) {
        if (data.tjlx == 0) {
            func.open({
                width: "1000rem",
                title: '审批',
                content: Feng.ctxPath + '/lsylProject/check?id=' + data.id,
                tableId: lsylInfo.tableId,
            })
        } else if (data.tjlx == 1) {
            func.open({
                width: "1000rem",
                title: '审批',
                content: Feng.ctxPath + '/lsylProject/recheck?id=' + data.id,
                tableId: lsylInfo.tableId,
            })
        }
    }

    /**
     * 修改材料清单
     */
    lsylInfo.openEditFile = function (data) {
        func.open({
            title: '文件清单修改',
            content: Feng.ctxPath + '/system/config/edit?id=' + "15",
            width: "900rem",
            height: "650"
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
            content: Feng.ctxPath + '/lsylProject/proImportExcelList'
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
            var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/delete", 'post', function (data) {
                if (data.success == 0) {
                    Feng.error("删除失败!" + data.message + "!");
                } else if (data.success == 1) {
                    Feng.success("删除成功!");
                    table.reload(lsylInfo.tableId);
                } else {
                    console.log("fail");
                }

            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            ajax.set("id", data.id);
            ajax.set("psjd", data.psjd)
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + lsylInfo.tableId,
        url: Feng.ctxPath + '/lsylProject/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        sort: true,
        cols: lsylInfo.initColumn(),
        done: function (res, curr, count) {
            $.each(res['data'], function (i, j) {
                if (j['psbhjd'] == 1) {
                    $("tr[data-index = '" + i + "']").css("background-color", "rgba(227,152,152,0.3)")
                } else {
                    if (j['psjd'] == 5) {
                        var a = $("tr[data-index = '" + i + "']").find("a");
                        var b = a[4];
                        if (j['fyjd'] == 1) {
                            $("tr[data-index = '" + i + "']").css("background-color", "rgba(255,165,0,0.4)")
                            $(b).html("复议")
                        } else if (j['fyjd'] == 0) {
                            $("tr[data-index = '" + i + "']").css("background-color", "rgba(198,224,180,0.4)")
                            $(b).html("复议")
                        } else if (j['fyjd'] == 2) {
                        } else if (j['fyjd'] == 3) {
                            $("tr[data-index = '" + i + "']").css("background-color", "rgba(227,152,152,0.3)")
                            $(b).html("复议")
                        }
                    }
                }
            })
        }
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
    // 清单文件修改
    $('#btnFile').click(function () {
        lsylInfo.openEditFile();
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
        } else if (layEvent === 'check') {
            lsylInfo.onCheck(data);
        }
    });

});
