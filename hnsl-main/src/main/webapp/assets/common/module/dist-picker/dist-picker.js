layui.define(['jquery'], function (exports) {
    var $ = layui.jquery,
        baseClassName = 'dist-picker',
        defaultOptions = {
            // 根据元素 id 值单独渲染，为空默认根据 class='dist-picker' 批量渲染
            eleId: null,
        },
        distPicker = function (options) {
            var _this = this;
            _this.tipsAttr = null;
            _this.selector = null;
            _this.init(_this, options || {});
        };
    layui.link(layui.cache.base + 'dist-picker/dist-picker.css');

    /** 初始化 */
    distPicker.prototype.init = function (_this, options) {
        _this.options = $.extend({}, defaultOptions, options);
        _this.selector = $.trim(_this.options.eleId) === '' ? '.' + baseClassName : '#' + _this.options.eleId;
        alert(1);
    };

    /** 初始化默认方法，处理 JS 兼容问题 */
    distPicker.prototype.initPrototype = function () {
        // 获取数组元素下标
        !Array.prototype.indexOf && (Array.prototype.indexOf = function (array, value) {
            array = array || [];
            for (var i = array.length; i--;) {
                if (array[i] == value) {
                    return i;
                }
            }

            return -1;
        });
    };
    //输出接口
    exports('distpicker', {
        /** 初始化入口方法 */
        init: function (options) {
            return new distPicker(options);
        }
    });
});