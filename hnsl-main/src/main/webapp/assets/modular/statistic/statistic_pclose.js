layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
        var $ = layui.$;
        var table = layui.table;
        var HttpRequest = layui.HttpRequest;
        var admin = layui.admin;
        var func = layui.func;

        /**
         * 管理
         */
        var Statistic = {
            tableId: "statisticTable"
        };


        /**
         * 初始化表格的列
         */
        Statistic.initColumn = function () {
            return [[
                {type: 'checkbox', fixed: 'left', sort: true,},
                {field: 'nxfsjYear', title: '统计截至年份', fixed: 'left', sort: true,},
                {
                    field: 'nxfsjMonth', title: '统计截至月', fixed: 'left', sort: true, templet: function (a) {
                        if (a.nxfsjMonth != null) {
                            return a.nxfsjMonth + 1;
                        } else {
                            return '/';
                        }
                    }
                },
                {field: 'shsl', title: '损毁图斑数量', sort: true},
                {field: 'yxfsl', title: '已修复数量', sort: true},
                {
                    field: 'yxfslzb', title: '已修复数量占比', sort: true, width: 150, templet: function (pro) {
                        var shsl = pro.shsl;
                        var yxfsl = pro.yxfsl;
                        if ((shsl + yxfsl) == 0) {
                            return ''
                        } else {
                            var res = (yxfsl / (shsl + yxfsl)) * 100;
                            return res.toFixed(2) + "%";
                        }
                    }
                },
                {field: 'shmj', title: '损毁图斑面积(㎡)', sort: true},
                {field: 'yxfmj', title: '已修复面积(㎡)', sort: true},
                {
                    field: 'yxfzb', title: '已修复面积占比', sort: true, width: 150, templet: function (pro) {
                        var shmj = pro.shmj;
                        var yxfmj = pro.yxfmj;
                        var res = (yxfmj / (shmj + yxfmj)) * 100;
                        return res.toFixed(2) + "%";
                    }
                },
                {fixed: 'right', width: 310, toolbar: "#tableBar", title: '操作'}
            ]];
        }
        ;

        /**
         * 点击查询按钮
         */
        Statistic.search = function () {
            var queryData = {};


            table.reload(Statistic.tableId, {
                where: queryData, page: {curr: 1}
            });
        };

        /**
         * 导出excel按钮
         */
        Statistic.exportExcel = function () {
            var checkRows = table.checkStatus(Statistic.tableId);
            if (checkRows.data.length === 0) {
                Feng.error("请选择要导出的数据");
            } else {
                table.exportFile(tableResult.config.id, checkRows.data, 'xls');
            }
        };
        /**
         * 导出word按钮
         */
        Statistic.exportWord = function () {
            /**
             * 不知道怎么写
             */
        };

        // 渲染表格
        var tableResult = table.render({
            elem: '#' + Statistic.tableId,
            url: Feng.ctxPath + '/statistic/pclose/list',
            page: true,
            height: "full-100",
            cellMinWidth: 100,
            cols: Statistic.initColumn()
        });

        // 导出excel
        $('#btnExpExcel').click(function () {
            Statistic.exportExcel();
        });
        // 导出Word
        $('#btnExpWord').click(function () {
            Statistic.exportWord();
        });

        // 工具条点击事件
        table.on('tool(' + Statistic.tableId + ')', function (obj) {
            var data = obj.data;
            var layEvent = obj.event;

            if (layEvent === 'edit') {
                Statistic.openEditDlg(data);
            } else if (layEvent === 'delete') {
                Statistic.onDeleteItem(data);
            }
        });
    }
)
;
