var TwoInOneSolutionInfoDlg = {
    data: {
        id: "",
        kyqr: "",
        frdb: "",
        bzdw: "",
        badwdh: "",
        xzs: "",
        xzx: "",
        kqwz: "",
        ckzh: "",
        kqnx: "",
        kqq: "",
        kqz: "",
        kqmj: "",
        geoJsonBorder: "",
        zkz: "",
        qtkz: "",
        kcfs: "",
        synx: "",
        sjscnl: "",
        scnl: "",
        kscl: "",
        wsmj: "",
        yzmj: "",
        jzzd: "",
        lszd: "",
        phmj: "",
        stshmj: "",
        xzshmj: "",
        ycshmj: "",
        stxfmj: "",
        fatz: "",
        bzcs: "",
        sxsj: "",
        dqsj: "",
        fwnx: "",
        bzlx: "",
        yssj: "",
        ysdw: "",
        ysjl: "",
        fazt: ""
    }
};
layui.use(['table', 'admin', 'layarea', 'form', 'HttpRequest', 'func'], function () {
        var $ = layui.$;
        var table = layui.table;
        var HttpRequest = layui.HttpRequest;
        var admin = layui.admin;
        var func = layui.func;

        /**
         * 二合一方案基本情况表填表说明：方案编制类型：1-新申请矿业权编制、2-扩大矿区范围修编、3-变更开采方式修编、4-采矿权到期延续修编、5-矿业权到期延续修编、6-适用年限到期修编、7-其他情况编制管理
         */
        var TwoInOneSolution = {
            tableId: "twoInOneSolutionTable",
            queryData: {}
        };

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
                TwoInOneSolution.queryData.xzs = res.xzs;
                TwoInOneSolution.queryData.xzs = res.xzx;
            }
        });
        /**
         * 检查列表避免null、undefined
         */
        var checkNull = function (data) {
            if (data == null || data == undefined || data == '') {
                return '/'
            } else {
                return data
            }
        }

        /**
         * 初始化表格的列
         */
        TwoInOneSolution.initColumn = function () {
            return [[
                {type: 'checkbox', fixed: 'left', sort: true},
                {field: 'id', fixed: 'left', hide: true, title: '矿业权人', sort: true},
                {field: 'kyqr', fixed: 'left', title: '企业名称', width: 300, sort: true},
                {
                    field: 'frdb', sort: true, title: '法人代表', width: 150, templet: function (param) {
                        return checkNull(param.frdb)
                    }
                },
                {
                    field: 'fazt', sort: true, title: '方案状态', width: 250, templet: function (param) {
                        if (param.fazt == '0') {
                            return "有效期内二合一方案"
                        } else if (param.fazt == '1') {
                            return "二合一方案过期"
                        } else if (param.fazt == '2') {
                            return "无二合一方案"
                        } else {
                            return "未知"
                        }
                    }
                },
                {
                    field: 'bzdw', sort: true, title: '编制单位', width: 150, templet: function (param) {
                        return checkNull(param.bzdw)
                    }
                },
                {
                    field: 'badwdh', sort: true, title: '编制单位联系方式', width: 180, templet: function (param) {
                        return checkNull(param.badwdh)
                    }
                },
                {field: 'xzs', sort: true, title: '该矿区所在市', width: 180},
                {field: 'xzx', sort: true, title: '该矿区所在县', width: 180},
                {
                    field: 'kqwz', sort: true, title: '矿区位置', width: 150, templet: function (param) {
                        return checkNull(param.kqwz)
                    }
                },
                {field: 'ckzh', sort: true, title: '采矿证号', width: 150},
                {
                    field: 'kqnx', sort: true, title: '采矿许可证有效期', width: 180, templet: function (param) {
                        return checkNull(param.kqnx)
                    }
                },
                {
                    field: 'kqq', sort: true, title: '采矿许可证生效时间', width: 150, templet: function (a) {
                        if (a.kqq != null) {
                            var b = a.kqq.substring(0, 4);
                            return b
                        } else {
                            // var c = null;
                            return "/"
                        }

                    }
                },
                {
                    field: 'kqz', sort: true, title: '采矿许可证失效时间', width: 150, templet: function (a) {
                        if (a.kqz != null) {
                            var b = a.kqz.substring(0, 4);
                            return b
                        } else {
                            // var c = null;
                            return "/"
                        }

                    }
                },
                {
                    field: 'kqmj', sort: true, title: '矿权面积（km²）', width: 180, templet: function (param) {
                        return checkNull(param.kqmj)
                    }
                },
                {
                    field: 'zkz', sort: true, title: '主矿种', width: 150, templet: function (param) {
                        return checkNull(param.zkz)
                    }
                },
                {
                    field: 'qtkz', sort: true, title: '其他开采矿种', width: 150, templet: function (param) {
                        return checkNull(param.qtkz)
                    }
                },
                {
                    field: 'kcfs', sort: true, title: '开采方式', width: 150, templet: function (param) {
                        if (param.kcfs == "1") {
                            return "井下开采";
                        } else if (param.kcfs == "2") {
                            return "露天开采";
                        } else if (param.kcfs == "3") {
                            return "露井联采";
                        } else {
                            return checkNull(param.kcfs)
                        }
                    }
                },
                {
                    field: 'synx', sort: true, title: '采矿证剩余年限', width: 180, templet: function (param) {
                        return checkNull(param.synx)
                    }
                },
                {
                    field: 'sjscnl', sort: true, title: '设计生产能力', width: 205, templet: function (param) {
                        return checkNull(param.sjscnl)
                    }
                },
                {
                    field: 'scnl', sort: true, title: '实际生产能力', width: 205, templet: function (param) {
                        return checkNull(param.scnl)
                    }
                },
                {
                    field: 'kscl', sort: true, title: '矿山矿石开采量', width: 200, templet: function (param) {
                        return checkNull(param.kscl)
                    }
                },
                {
                    field: 'scnldw', sort: true, title: '单位', width: 100, templet: function (param) {
                        return checkNull(param.scnldw)
                    }
                },
                {
                    field: 'fatz', sort: true, title: '方案投资', width: 150, templet: function (param) {
                        return checkNull(param.fatz)
                    }
                },
                {
                    field: 'bzcs', sort: true, title: '方案编制次数方案第几次编制', width: 230, templet: function (param) {
                        return checkNull(param.bzcs)
                    }
                },
                {
                    field: 'sxsj', sort: true, title: '方案生效时间', width: 150, templet: function (param) {
                        if (param.sxsj != null && param.sxsj != '') {
                            return param.sxsj.substring(0, 7)
                        } else {
                            return "/"
                        }
                    }
                },
                {
                    field: 'dqsj', sort: true, title: '方案到期时间', width: 150, templet: function (param) {
                        if (param.dqsj != null && param.dqsj != '') {
                            return param.dqsj.substring(0, 7)
                        } else {
                            return "/"
                        }
                    }
                },
                {
                    field: 'fwnx', sort: true, title: '方案服务年限', width: 150, templet: function (param) {
                        return checkNull(param.fwnx)
                    }
                },
                {
                    field: 'bzlx', sort: true, title: '方案编制类型', width: 150, templet: function (param) {
                        if (param.bzlx == "1") {
                            return "新申请矿业权编制"
                        } else if (param.bzlx == "2") {
                            return "扩大矿区范围修编"
                        } else if (param.bzlx == "3") {
                            return "变更开采方式修编"
                        } else if (param.bzlx == "4") {
                            return "采矿权到期延续修编"
                        } else if (param.bzlx == "5") {
                            return "矿业权到期延续修编"
                        } else if (param.bzlx == "6") {
                            return "适用年限到期修编"
                        } else if (param.bzlx == "7") {
                            return "其他情况修编"
                        } else {
                            return checkNull(param.bzlx)
                        }
                    }
                },
                {align: 'center', width: 350, toolbar: '#tableBar', fixed: 'right', title: '操作'}
            ]]
                ;
        }
        ;

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
        TwoInOneSolution.search = function () {
            TwoInOneSolution.queryData.kyqr = $("#kyqr").val();
            TwoInOneSolution.queryData.xzs = $("#xzs").val();
            TwoInOneSolution.queryData.xzx = $("#xzx").val();
            TwoInOneSolution.queryData.frdb = $("#frdb").val();
            TwoInOneSolution.queryData.ckzh = $("#ckzh").val();
            TwoInOneSolution.queryData.zkz = $("#zkz").val();
            TwoInOneSolution.queryData.bzdw = $("#bzdw").val();
            TwoInOneSolution.queryData.kcfs = $("#kcfs").val();
            TwoInOneSolution.queryData.bzlx = $("#bzlx").val();
            TwoInOneSolution.queryData.ysjl = $("#ysjl").val();
            TwoInOneSolution.queryData.fazt = $("#fazt").val();
            table.reload(TwoInOneSolution.tableId, {
                where: TwoInOneSolution.queryData,
                page: {curr: 1}
            });
        };
        /**
         * 点击重置按钮
         */
        TwoInOneSolution.Reset = function () {
            $("#kyqr").val('');
            $("#xzs").val('');
            $("#xzx").val('');
            $("#frdb").val('');
            $("#ckzh").val('');
            $("#zkz").val('');
            $("#bzdw").val('');
            $("#kcfs").val('');
            $("#bzlx").val('');
            $("#ysjl").val('');
            TwoInOneSolution.queryData.xzs = $("#xzs").val();
            TwoInOneSolution.queryData.xzx = $("#xzx").val();
            TwoInOneSolution.search();
            form.render();
            table.reload(TwoInOneSolution.tableId);

        };


        /**
         * 弹出添加对话框
         */
        TwoInOneSolution.openAddDlg = function () {
            func.open({
                width: "1000rem",
                title: '添加二合一方案',
                content: Feng.ctxPath + '/prominemanger/twoInOneSolution/add',
                tableId: TwoInOneSolution.tableId,
                // area: ['1000px', '1000px']
            });
        };

        /**
         * 点击编辑
         *
         * @param data 点击按钮时候的行数据
         */
        TwoInOneSolution.openEditDlg = function (data) {
            func.open({
                width: "1200rem",
                title: '修改二合一方案',
                content: Feng.ctxPath + '/prominemanger/twoInOneSolution/edit?id=' + data.id,
                tableId: TwoInOneSolution.tableId
            });
        };


        /**
         * 导出excel按钮
         */
        TwoInOneSolution.exportExcel = function () {
            var checkRows = table.checkStatus(TwoInOneSolution.tableId);
            if (checkRows.data.length === 0) {
                Feng.error("请选择要导出的数据");
            } else {
                table.exportFile(tableResult.config.id, checkRows.data, 'xls');
            }
        };

        /**
         * 导出所有excel按钮
         */
        TwoInOneSolution.exportExcelAll = function () {
            var ajax = new HttpRequest(Feng.ctxPath + '/prominemanger/twoInOneSolution/listnopage', 'POST')
            var result = ajax.start();
            if (result.success !== true) {
                Feng.error("请求数据为空！");
            } else {
                table.exportFile(tableResult.config.id, result.data, 'xls');
            }

        };
        /**
         * 导出全省shp数据
         */
        TwoInOneSolution.exportSql = function () {
            var ajax = new HttpRequest(Feng.ctxPath + '/prominemanger/twoInOneSolution/pgsql2shp', 'POST')
            var result = ajax.start();
            window.open(Feng.ctxPath + "/prominemanger/twoInOneSolution/shpDownload");
            if (result.success !== true) {
                Feng.error("请求数据为空！");
            } else {
                Feng.success("导出成功!");
            }

        };

        /**
         * 点击删除
         *
         * @param data 点击按钮时候的行数据
         */
        TwoInOneSolution.onDeleteItem = function (data) {
            var operation = function () {
                var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/twoInOneSolution/delete", 'post', function (data) {
                    Feng.success("删除成功!");
                    table.reload(TwoInOneSolution.tableId);
                }, function (data) {
                    Feng.error("删除失败!" + data.message + "!");
                });
                ajax.set("id", data.id);
                ajax.start();
            };
            Feng.confirm("是否删除?删除操作会删除该方案的方案文件，请谨慎操作！", operation);
        };

        TwoInOneSolution.onDetails = function (data) {
            func.open({
                width: "1200rem",
                title: '二合一方案详情',
                content: Feng.ctxPath + '/prominemanger/twoInOneSolution/detailHtml?id=' + data.id,
                tableId: TwoInOneSolution.tableId
            });
        }

        // 渲染表格
        var tableResult = table.render({
            elem: '#' + TwoInOneSolution.tableId,
            url: Feng.ctxPath + '/prominemanger/twoInOneSolution/list',
            page: true,
            height: "full-100",
            cellMinWidth: 100,
            cols: TwoInOneSolution.initColumn()
        });

        TwoInOneSolution.openLocationDlg = function (data) {
            func.open({
                width: '1000rem',
                title: '方案包含图斑位置',
                content: Feng.ctxPath + '/prominemanger/twoInOneSolution/locationHtml?id=' + data.id,
                tableId: TwoInOneSolution.tableId
            });
        };
        // 搜索按钮点击事件
        $('#btnSearch').click(function () {
            TwoInOneSolution.search();
            return false;
        });

        // 重置按钮事件
        $('#btnReset').click(function () {
            TwoInOneSolution.Reset();
            return false;
        });

        // 添加按钮点击事件
        $('#btnAdd').click(function () {

            TwoInOneSolution.openAddDlg();

        });

        // 导出excel
        $('#btnExp').click(function () {
            TwoInOneSolution.exportExcel();
        });

        // 导出全部excel
        $('#btnExp1').click(function () {
            TwoInOneSolution.exportExcelAll();
        });

        // 导出全省shp数据
        $('#btnSql').click(function () {
            TwoInOneSolution.exportSql();
        });

        // 工具条点击事件
        table.on('tool(' + TwoInOneSolution.tableId + ')', function (obj) {
            var data = obj.data;
            var layEvent = obj.event;

            if (layEvent === 'edit') {
                TwoInOneSolution.openEditDlg(data);
            } else if (layEvent === 'delete') {
                TwoInOneSolution.onDeleteItem(data);
            } else if (layEvent === 'detail') {
                TwoInOneSolution.onDetails(data);
            } else if (layEvent === 'location') {
                TwoInOneSolution.openLocationDlg(data);
            }
        });
    }
)
;
