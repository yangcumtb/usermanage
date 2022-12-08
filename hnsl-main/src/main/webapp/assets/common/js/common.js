// 用common.js必须加上Feng.addCtx("${ctxPath}");
Feng.info = function (info) {
    top.notice.msg(info, {icon: 3});
};
Feng.success = function (info) {
    top.notice.success({
        title: '操作提醒',
        message: info
    });
};
Feng.warning = function (info) {
    top.notice.warning({
        title: '操作提醒',
        message: info
    });
};
Feng.error = function (info) {
    top.notice.error({
        title: '操作提醒',
        message: info
    });
};
Feng.confirm = function (tip,ensure) {
    top.layer.confirm(tip,{
        skin: 'layui-layer-admin warn',
        btn: ['确定'],
    }, function (index) {
        top.layer.close(index);
        ensure();
    }
    );
};
Feng.warnConfirm = function (tip, btn, ensure) {
    top.layer.confirm(tip, {
        skin: 'layui-layer-admin warn',
        title: '危险操作提醒',
        btn: btn
    }, function (pIndex) {
        top.layer.confirm('如果您确认执行此操作，请再次确认', {
            skin: 'layui-layer-admin warn',
            title: '再次提醒',
            btn: btn
        }, function (index) {
            ensure();
            top.layer.close(index);

        });
        top.layer.close(pIndex);
    });

};

Feng.isNotEmpty = function (elm) {
    if (elm === 0) {
        return true;
    }
    return (elm != undefined && elm != null && elm != "")
};
Feng.isNum = function (s) {
    if (s == 0) {
        return true;
    }
    if (s != null && s != "") {
        return !isNaN(s);
    }
    return false;
};
Feng.toThousands = function (num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
};
Feng.currentDate = function () {
    // 获取当前日期
    var date = new Date();

    // 获取当前月份
    var nowMonth = date.getMonth() + 1;

    // 获取当前是几号
    var strDate = date.getDate();

    // 添加分隔符“-”
    var seperator = "-";

    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }

    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
    return date.getFullYear() + seperator + nowMonth + seperator + strDate;
};
Feng.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
};
Feng.infoDetail = function (title, info) {
    var display = "";
    if (typeof info === "string") {
        display = info;
    } else {
        if (info instanceof Array) {
            for (var x in info) {
                display = display + info[x] + "<br/>";
            }
        } else {
            display = info;
        }
    }
    top.layer.open({
        title: title,
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['950px', '600px'], //宽高
        content: '<div style="padding: 20px;">' + display + '</div>'
    });
};
Feng.zTreeCheckedNodes = function (zTreeId) {
    var zTree = $.fn.zTree.getZTreeObj(zTreeId);
    var nodes = zTree.getCheckedNodes();
    var ids = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        ids += "," + nodes[i].id;
    }
    return ids.substring(1);
};
Feng.closeAllLoading = function () {
    layer.closeAll('loading');
};
Feng.getClientHeight = function () {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
};
Feng.getClientHeightPx = function () {
    return Feng.getClientHeight() + 'px';
};

// 以下代码是配置layui扩展模块的目录，每个页面都需要引入
layui.config({
    version: Feng.version,
    defaultTheme: 'theme-blue',
    navArrow: 'arrow3',
    cacheTab: false,
    base: Feng.ctxPath + '/assets/common/module/'
}).extend({
    steps: 'steps/steps',
    notice: 'notice/notice',
    cascader: 'cascader/cascader',
    dropdown: 'dropdown/dropdown',
    numinput: 'numinput/numinput',
    mutilImg: 'mutilImg/mutilImg',
    textool: 'textool/textool',
    fileChoose: 'fileChoose/fileChoose',
    treeTable: 'treeTable/treeTable',
    Split: 'Split/Split',
    Cropper: 'Cropper/Cropper',
    tagsInput: 'tagsInput/tagsInput',
    inputTag: 'inputTag/inputTag',
    citypicker: 'city-picker/city-picker',
    distpicker: 'dist-picker/dist-picker',
    introJs: 'introJs/introJs',
    zTree: 'zTree/zTree',
    jsonViewer: 'jsonViewer/jsonViewer',
    xmSelect: 'xmSelect',
    layarea:'../../expand/module/layarea',
    laytype:'../../expand/js/laytype',
    formSelects: '../../expand/module/formSelects/formSelects-v4',
    selectPlus: '../../expand/module/selectPlus/selectPlus',
    iconPicker: '../../expand/module/iconPicker/iconPicker',
    ztree: '../../expand/module/ztree/ztree-object',
    HttpRequest: '../../expand/module/HttpRequest/HttpRequest',
    handsonTable: '../../expand/module/excel/handsonTable',
    xlsxUtil: '../../expand/module/excel/xlsxUtil',
    func: '../../expand/module/func/func',
    ws: '../../expand/module/webSocket/webSocket'
}).use(['layer', 'admin', "notice", 'index'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var admin = layui.admin;
    window.notice = layui.notice;
    var index = layui.index;

    // 移除loading动画
    setTimeout(function () {
        admin.removeLoading();
    }, window === top ? 300 : 0);


    admin.events.toggleAdSearch = function () {
        $(this).parents('body').find('.advanced-search_dialog').toggleClass("layui-hide");
    }


    admin.events.hideSide = function () {
        hideSide();
    }

    admin.events.showSide = function () {
        showSide();
    }

    admin.on('tab', function (d) {

        var $layui_nav = $(".layui-side .layui-nav a[lay-href='" + d.layId + "']").parents('.layui-nav');

        if ($layui_nav.attr("lay-event") == undefined) {
            $(".header-menu li.layui-this").removeClass("layui-this");
            hideSide();
        }

        if ($layui_nav.attr("lay-event") == 'hideSide'
            || d.layId == Feng.homePage.menuPath) {
            hideSide();
        }

        if ($layui_nav.attr("lay-event") == 'showSide') {
            showSide();
        }
    });

    //注册session超时的操作
    $.ajaxSetup({
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        complete: function (XMLHttpRequest, textStatus) {

            //如果超时就处理 ，指定要跳转的页面
            if (XMLHttpRequest.getResponseHeader("Guns-Session-Timeout") === "true") {
                window.location = Feng.ctxPath + "/global/sessionError";
            }

        }
    });

    function showSide() {
        $(".layui-body").removeClass("home");
        $(".layui-side").removeClass("home");
        $(".layui-footer").removeClass("home");
    }

    function hideSide() {
        $(".layui-body").addClass("home");
        $(".layui-side").addClass("home");
        $(".layui-footer").addClass("home");
    }

});