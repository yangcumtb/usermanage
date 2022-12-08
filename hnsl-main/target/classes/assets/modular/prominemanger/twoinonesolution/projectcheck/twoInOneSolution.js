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
        psjd: "",
        psbhjd: "",
        pssjXs: "",
        pssjXf: "",
        pssjC: "",
        pssjS: "",
        shjg: "",
        tjlx: "",
        bhyj: "",
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
            elem: '#area-picker',
            change: function (res) {
                //选择结果
                TwoInOneSolution.queryData.xzs = res.xzs;
                TwoInOneSolution.queryData.xzs = res.xzx;
            }
        });


        /**
         * 初始化表格的列
         */
        TwoInOneSolution.initColumn = function () {
            return [[
                {type: 'checkbox', fixed: 'left', sort: true},
                {field: 'id', fixed: 'left', hide: true, title: '矿业权人', sort: true},
                {field: 'kyqr', fixed: 'left', title: '企业名称', width: 150, sort: true},
                {field: 'frdb', sort: true, title: '法人代表', width: 150},
                {field: 'bzdw', sort: true, title: '编制单位', width: 150},
                {
                    field: 'ksgm', sort: true, title: '主管部门', templet: function (pro) {
                        if (pro.kqgm==="1" || pro.kqgm==="2"){
                            return "市管";
                        }else if (pro.kqgm==="3"){
                            return "省管";
                        }else {
                            return "省管"
                        }
                    }
                },
                {
                    field: 'psjd', sort: true, title: '审批进展', templet: function (pro) {
                        var item = pro.psjd;
                        if (item == 1) {
                            return "县级提交"
                        } else if (item == 2) {
                            return "县级终审"
                        } else if (item == 3) {
                            return "市级审批"
                        } else if (item == 4) {
                            return "省级审批"
                        } else if (item == 5) {
                            return "已入库"
                        } else {
                            return "节点追踪失败"
                        }
                    }
                },
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
                {field: 'badwdh', sort: true, title: '编制单位联系方式', width: 180},
                {field: 'xzs', sort: true, title: '行政市', width: 180},
                {field: 'xzx', sort: true, title: '行政县', width: 180},
                {field: 'kqwz', sort: true, title: '矿区位置', width: 150},
                {field: 'ckzh', sort: true, title: '采矿权证号', width: 150},
                {field: 'kqnx', sort: true, title: '采矿权年限', width: 180},
                {field: 'kqq', sort: true, title: '采矿权生效年限', width: 150, templet: function (a) {
                        if (a.kqq != null) {
                            var b = a.kqq.substring(0, 4);
                            return b
                        } else {
                            var c = null;
                            return c
                        }

                    }},
                {field: 'kqz', sort: true, title: '采矿权失效年限', width: 150, templet: function (a) {
                        if (a.kqz != null) {
                            var b = a.kqz.substring(0, 4);
                            return b
                        } else {
                            var c = null;
                            return c
                        }

                    }},
                {field: 'kqmj', sort: true, title: '采矿权面积'},
                {field: 'zkz', sort: true, title: '开采主矿种', width: 150},
                {field: 'qtkz', sort: true, title: '其他开采矿种', width: 150},
                {
                    field: 'kcfs', sort: true, title: '开采方式', width: 150, templet: function (param) {
                        if (param.kcfs == "1") {
                            return "井下开采";
                        } else if (param.kcfs == "2") {
                            return "露天开采";
                        } else if (param.kcfs == "3") {
                            return "露井联采";
                        }
                    }
                },
                {field: 'synx', sort: true, title: '采矿证剩余年限', width: 180},
                {field: 'sjscnl', sort: true, title: '设计生产能力（年/万吨）', width: 205},
                {field: 'scnl', sort: true, title: '实际生产能力（年/万吨）', width: 205},
                {field: 'kscl', sort: true, title: '矿石开采量（万吨）', width: 200},
                // {field: 'wsmj', sort: true, title: '挖损土地面积（公顷）'},
                // {field: 'yzmj', sort: true, title: '压占土地面积（公顷）'},
                // {field: 'jzzd', sort: true, title: '占用土地面积（公顷）'},
                // {field: 'lszd', sort: true, title: '设施、道路等临时占用的土地面积（公顷）'},
                // {field: 'phmj', sort: true, title: '矿山总体破坏面积'},
                // {field: 'stshmj', sort: true, title: '矿山生态损毁范围面积（公顷）'},
                // {field: 'xzshmj', sort: true, title: '现状生态损毁总面积（公顷）'},
                // {field: 'ycshmj', sort: true, title: '预测矿业权终了生态损毁区总面积（公顷）'},
                // {field: 'stxfmj', sort: true, title: '生态修复范围面积'},
                {field: 'fatz', sort: true, title: '方案总投资', width: 150},
                {field: 'bzcs', sort: true, title: '方案编制次数', width: 230},
                {field: 'sxsj', sort: true, title: '生效时间', width: 150},
                {field: 'dqsj', sort: true, title: '到期时间', width: 150},
                {field: 'fwnx', sort: true, title: '服务年限', width: 150},
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
                        }
                    }
                },
                // {field: 'yssj', sort: true, title: '验收时间', width: 150},
                // {field: 'ysdw', sort: true, title: '验收单位', width: 150},
                // {
                //     field: 'ysjl', sort: true, title: '验收结论', width: 150, templet: function (param) {
                //         if (param.ysjl == "TG") {
                //             return "通过"
                //         } else if (param.ysjl == "YTJTG") {
                //             return "有条件通过"
                //         } else {
                //             return "未通过，整改"
                //         }
                //     }
                // },
                {align: 'center', width: 200, toolbar: '#tableBar', fixed: 'right', title: '操作'}
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
                title: '添加二合一方案',
                content: Feng.ctxPath + '/prominemanger/twoInOneSolution/add',
                tableId: TwoInOneSolution.tableId,
                area: ['1000px', '1000px']
            });
        };

        /**
         * 点击编辑
         *
         * @param data 点击按钮时候的行数据
         */
        TwoInOneSolution.openEditDlg = function (data) {
            func.open({
                title: '修改二合一',
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
         * 点击删除
         *
         * @param data 点击按钮时候的行数据
         */
        TwoInOneSolution.onDeleteItem = function (data) {
            debugger;
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
            Feng.confirm("是否删除?", operation);
        };

        TwoInOneSolution.onDetails = function (data) {
            func.open({
                title: '详情',
                content: Feng.ctxPath + '/prominemanger/twoInOneSolution/detailHtml?id=' + data.id,
                tableId: TwoInOneSolution.tableId
            });
        }
        TwoInOneSolution.onCheck = function (data) {
            func.open({
                title: '审批',
                content: Feng.ctxPath + '/prominemanger/twoInOneSolution/check?id=' + data.id,
                tableId: TwoInOneSolution.tableId
            });
        }
        // 渲染表格
        var tableResult = table.render({
            elem: '#' + TwoInOneSolution.tableId,
            url: Feng.ctxPath + '/prominemanger/twoInOneSolution/checkList',
            page: true,
            height: "full-100",
            cellMinWidth: 100,
            cols: TwoInOneSolution.initColumn()
        });

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

        // 工具条点击事件
        table.on('tool(' + TwoInOneSolution.tableId + ')', function (obj) {
            var data = obj.data;
            var layEvent = obj.event;

            if (layEvent === 'edit') {
                TwoInOneSolution.openEditDlg(data);
            } else if (layEvent === 'delete') {
                TwoInOneSolution.onDeleteItem(data);
            } else if (layEvent === 'check') {
                TwoInOneSolution.onCheck(data);
            }
        });
    }
)
;
