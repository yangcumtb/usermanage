layui.define(['jquery', 'HttpRequest'], function (exports) {

    var $ = layui.$;
    var HttpRequest = layui.HttpRequest;

    var $ZTree = function (id, url, _leaf) {
        this.id = id;
        this.url = url;
        this.onClick = null;
        this.settings = null;
        this.ondblclick = null;
        if (_leaf === "true") {
            this.onlyLeaf = true;
        } else {
            this.onlyLeaf = false;
        }

    };

    $ZTree.prototype = {
        /**
         * 初始化ztree的设置
         */
        initSetting: function () {
            var settings = {
                view: {
                    dblClickExpand: true,
                    selectedMulti: false
                },
                data: {simpleData: {enable: true}},
                callback: {
                    onClick: this.onClick,
                    onDblClick: this.ondblclick,
                    beforeClick: this.onlyLeaf ? this.bindBeforeClick : null
                }
            };
            return settings;
        },

        /**
         * 手动设置ztree的设置
         */
        setSettings: function (val) {
            this.settings = val;
        },

        /**
         * 初始化ztree
         */
        init: function () {
            var zNodeSeting = null;
            if (this.settings != null) {
                zNodeSeting = this.settings;
            } else {
                zNodeSeting = this.initSetting();
            }
            var zNodes = this.loadNodes();
            $.fn.zTree.init($("#" + this.id), zNodeSeting, zNodes);
        },

        /**
         * 绑定onclick事件
         */
        bindOnClick: function (func) {
            this.onClick = func;
        },
        /**
         * 绑定双击事件
         */
        bindOnDblClick: function (func) {
            this.ondblclick = func;
        },

        bindBeforeClick: function (treeId, treeNode, clickFlag) {
            if (treeNode.isParent) {
                Feng.info("无法选中，请重新选择!");
                return !treeNode.isParent;
            }


        },


        /**
         * 加载节点
         */
        loadNodes: function () {
            var zNodes = null;
            var ajax = new HttpRequest(Feng.ctxPath + this.url, 'get', function (data) {
                zNodes = data;
            }, function (data) {
                Feng.error("加载ztree信息失败!");
            });
            ajax.start();
            return zNodes;
        },

        /**
         * 获取选中的值
         */
        getSelectedVal: function () {
            var zTree = $.fn.zTree.getZTreeObj(this.id);
            var nodes = zTree.getSelectedNodes();
            return nodes[0].name;
        }
    };

    exports('ztree', $ZTree);

});