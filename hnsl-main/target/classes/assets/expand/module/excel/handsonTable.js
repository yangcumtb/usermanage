/**
 * 初始化 Handson Table 的封装
 *
 *
 * @author fengshuonan
 */

layui.define(["xlsxUtil"], function (exports) {

    var xlsxUtil = layui.xlsxUtil;

    var HandsonTable = function (hstableId, infoData, height) {
        this.hsInstance = null;
        this.hotSettings = null; //jquery和BootStrapTable绑定的对象
        this.hstableId = hstableId;
        this.infoData = infoData;
        this.colHeaders = [];
        this.columns = [];
        if (height == undefined) {
            this.height = 665; //默认表格高度665
        } else {
            this.height = height;
        }

    };

    HandsonTable.prototype = {
        /**
         * 初始化Handson Table
         */
        init: function () {
            var tableId = this.hstableId;
            var me = this;
            for (var key in this.infoData) {
                if (this.infoData[key].visible != false) {
                    this.columns.push(this.infoData[key]);
                    this.colHeaders.push(this.infoData[key].label);
                }

            }

            this.hotSettings = {
                licenseKey: 'dce68-5c723-aade1-cac51-db0f7',
                colHeaders: this.colHeaders,
                height: this.height,
                data: [],
                columns: this.columns,
                autoWrapRow: true,
                minRows: 1,
                manualColumnResize: true,
                manualRowResize: true,
                stretchH: "all",
                manualColumnMove: true,
                manualRowMove: true,
                rowHeaders: true,
                columnSorting: true,
                sortIndicator: true,
                contextMenu: {
                    items: {
                        "row_above": {
                            name: '向上插入一行',
                        },
                        "row_below": {
                            name: '向下插入一行',
                        },
                        "remove_row": {
                            name: '删除行',
                        },
                        "hsep1": "---------",
                        "undo": {
                            name: '撤销'
                        },
                        "redo": {
                            name: '重做'
                        },
                    }
                },
                autoColumnSize: true
            };

            this.hsInstance = new Handsontable(document.querySelector('#' + tableId), this.hotSettings);

            return this;
        },
        /**
         * 导入excel
         * @param param
         */
        import: function (emt) {
            var self = this;
            xlsxUtil.XLSX.onImport(emt, function () {
                var rt = xlsxUtil.XLSX.getSheetsByIndex();
                var tmp = [];
                rt.forEach(function (value, index, array) {
                    var t = new Object();
                    for (var k in value) {
                        for (var key in self.infoData) {
                            if (self.infoData[key].label == k) {
                                t[key] = value[k];

                            }
                        }
                    }
                    tmp.push(t);

                });
                self.hsInstance.loadData(tmp);
                self.hsInstance.validateCells(function (_result) {
                    if (!_result) {
                        Feng.error('您传入的文件数据有问题')
                    }
                });
            });
        },
        /**
         * 上传数据
         * @param param
         */
        upload: function (_filterVal, _callback) {
            var self = this;
            self.hsInstance.validateCells(function (_result) {
                if (_result) {
                    var tmp = [];
                    self.hsInstance.getSourceData().forEach(function (value, index, array) {
                        var t = new Object();
                        for (var k in value) {
                            t[k] = _filterVal[k] ? _filterVal[k](value[k]) : value[k];
                        }
                        tmp.push(t);
                    });
                    _callback(tmp);
                } else {
                    Feng.error('数据问题没有修改,无法上传');
                }

            });
        },
        /**
         * 清空数据
         */
        clear: function () {
            var self = this;
            self.hsInstance.loadData(null);
        }
    };

    exports('handsonTable', HandsonTable);

});