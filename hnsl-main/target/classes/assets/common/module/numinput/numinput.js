/**
 * Layui 数字输入组件
 *
 * @author  iTanken
 * @since   2019-03-29
 * @version 2020-01-19：数字键盘纵向定位自适应
 * @version 2020-04-02：添加功能按钮悬浮提示开关参数；添加悬浮提示内部键盘按钮样式；修复 number 类型输入框小数输入问题
 */
layui.define(['jquery'], function (exports) {
    var $ = layui.$;

    var numberInput = {
        inputs: [],
        init: function (input, step, max, min, digit) {
            var width = input.width() - 3;
            var height = input.width() / 4;
            var _this = this;
            input.attr("readonly", "readonly");
            input.css("border-left", "none");
            input.css("border-right", "none");
            input.css("text-align", "center");
            input.before("<a class='layui-form-label search-input-label layui-btn layui-btn-primary icon-btn number-minus' style='padding: 8px 10px;border-radius: 0;'><i class='layui-icon layui-icon-subtraction' style='color:#000;'></i></a>");
            input.after("<a class='layui-form-label search-input-label layui-btn layui-btn-primary icon-btn number-plus' style='padding: 8px 10px;border-radius: 0;'><i class='layui-icon layui-icon-addition' style='color:#000;'></i></a>");
            input.wrap(" <div class='layui-inline search-input number-value'></div>");
            $(".number-minus").click(function () {
                _this.execute(input, step, max, min, digit, true);
            });
            $(".number-plus").click(function () {
                _this.execute(input, step, max, min, digit, false);
            });
        },
        execute: function (input, step, max, min, digit, _do) {
            var _this = this;
            var val = parseFloat(this.format(input.val(), digit));
            var ori = val;
            if (_do)
                val -= step;
            if (!_do)
                val += step;
            if (val < min) {
                val = min;
                _this.tips($(".number-minus"), '最小值为 <kbd>' + min + '</kbd>！');
            } else if (val > max) {
                val = max;
                _this.tips($(".number-plus"), '最大值为 <kbd>' + max + '</kbd>！');
            }
            input.val(this.format(val, digit)).change();
        },
        format: function (val, digit) {
            if (isNaN(val)) {
                val = 0;
            }
            return parseFloat(val).toFixed(digit);
        },
        data: {
            default_data: {
                "step": 0.1,
                "min": 0,
                "max": 99,
                "digit": 1
            }
        },
        initialize: function () {
            var inputs = $("input[user_data], input[data-digit], input[data-step], input[data-min], input[data-max], input.layui-input-number");
            inputs.each(function () {
                numberInput.inputs.push(this.outerHTML);
                var data = numberInput.data;
                var user_data = eval("data." + $(this).attr("user_data"));
                if (user_data == null) {
                    user_data = JSON.parse(JSON.stringify(data.default_data));
                }
                var digit = $(this).data("digit");
                if (digit != null && !isNaN(parseFloat(digit))) {
                    digit = parseFloat(digit).toFixed(0);
                    user_data.digit = parseFloat(digit);
                }
                var step = $(this).data("step");
                if (step != null && !isNaN(parseFloat(step))) {
                    user_data.step = parseFloat(step);
                }
                var min = $(this).data("min");
                if (min != null && !isNaN(parseFloat(min))) {
                    user_data.min = parseFloat(min);
                }
                var max = $(this).data("max");
                if (max != null && !isNaN(parseFloat(max))) {
                    user_data.max = parseFloat(max);
                }
                numberInput.init($(this), user_data.step, user_data.max, user_data.min, user_data.digit);
                var data_edit = $(this).data("edit");
                if (data_edit) {
                    $(this).attr("readonly", null);
                }
            });
        },
        destroy: function () {
            var inputs = this.inputs;
            $.each(inputs, function (index, obj) {
                var input = $(obj)[0];
                var id = input.id;
                $("#" + id + "div").replaceWith(input);
            });
        },
        createType: function (types) {
            $.each(types, function (index, obj) {
                numberInput.data[obj.type] = obj.data;
            });
        },
        /** 提示 */
        tips: function ($input, msg) {
            return layer.tips(msg, $input, {tips: [1, '#ff2c1a'], time: 2e3, anim: 6, zIndex: 19999999999});
        }
    };


    exports('numinput', numberInput);
});
