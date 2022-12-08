/**
 * 详情对话框
 */
var FinalCheckJsxmCopy1InfoDlg = {
    data: {
        id: "",
        xmmc: "",
        jsdw: "",
        dwdz: "",
        shi: "",
        xian: "",
        wz: "",
        xmmj: "",
        kfx: "",
        kfy: "",
        ywr: "",
        bzdw: "",
        bzdwdz: "",
        frdb: "",
        fkjf: "",
        sxsj: "",
        dqsj: "",
        fwnx: "",
        zgbm: "",
        psjd: "",
        psbhjd: "",
        pssjXs: "",
        pssjXf: "",
        pssjC: "",
        pssjS: "",
        bhyj: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'layarea', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layarea = layui.layarea;
    var FinalCheckJsxmCopy1 = {
        tableId: "finalCheckProductivemineTable"
    };

    form.on('document.getElementById("psbhjd")', function (data) {
        if (data.value == 1) {
            $("#a7").css("display", "none");
        } else {
            $("#a7").css("display", "");
        }
    });

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    /**
     * 填充表单时候截取时间
     */
    if (result.data.pssjC != null) {
        var pssjC = result.data.pssjC;
        result.data.pssjC = pssjC.substr(0, 10);
    }
    if (result.data.pssjS != null) {
        var pssjS = result.data.pssjS;
        result.data.pssjS = pssjS.substr(0, 10);

    }
    if (result.data.pssjXf != null) {
        var pssjXf = result.data.pssjXf;
        result.data.pssjXf = pssjXf.substr(0, 10);

    }
    if (result.data.pssjXs != null) {
        var pssjXs = result.data.pssjXs;
        result.data.pssjXs = pssjXs.substr(0, 10);

    }
    form.val('finalCheckJsxmCopy1Form', result.data);
    var data1 = result.data;
    var num = data1.psjd;

    var lx = data1.tjlx;
    if (lx == 1) {
        $("#finalCheckJsxmCopy1Form").css("height", "1400px");
        document.getElementById("psjd").value = "3";
        $("#a").css("display", "");
        $("#b").css("display", "");
        $("#c").css("display", "");
        $("#d").css("display", "");
        $("#e").css("display", "");
        $("#f").css("display", "");
        $("#g").css("display", "");
        $("#h").css("display", "");
        $("#j").css("display", "");
        $("#k").css("display", "");
        $("#l").css("display", "");
        $("#m").css("display", "");
        $("#n").css("display", "");
        $("#o").css("display", "");
        $("#p").css("display", "");
        $("#q").css("display", "");
        $("#x").css("display", "");
        $("#y").css("display", "");
        $("#ad").css("display", "");
        $("#ae").css("display", "");
        $("#shi").attr("lay-verify", "required");
        $("#xian").attr("lay-verify", "required");
        $("#ossJS").attr("lay-verify", "required");
        $("#pssjC").attr("lay-verify", "required");
        $("#kfx").attr("lay-verify", "required");
        $("#kfy").attr("lay-verify", "required");
        $("#ywr").attr("lay-verify", "required");
        $("#fkjf").attr("lay-verify", "required");
        $("#frdb").attr("lay-verify", "required");
        $("#dqsj").attr("lay-verify", "required");
        $("#fwnx").attr("lay-verify", "required");
        $("#sxsj").attr("lay-verify", "required");
    } else {
        $("#e").css("display", "none");
        $("#g").css("display", "none");
        $("#h").css("display", "none");
        $("#j").css("display", "none");
        $("#o").css("display", "none");
        $("#p").css("display", "none");
        $("#q").css("display", "none");
        $("#x").css("display", "none");
        $("#y").css("display", "");
        $("#k").css("display", "none");
        $("#n").css("display", "none");
        $("#m").css("display", "");
        $("#l").css("display", "");
        $("#shi").attr("lay-verify", "");
        $("#xian").attr("lay-verify", "");
        $("#ossJS").attr("lay-verify", "");
        $("#pssjC").attr("lay-verify", "");
        $("#kfx").attr("lay-verify", "");
        $("#kfy").attr("lay-verify", "");
        $("#ywr").attr("lay-verify", "");
        $("#fkjf").attr("lay-verify", "");
        $("#frdb").attr("lay-verify", "");
        $("#dqsj").attr("lay-verify", "");
        $("#fwnx").attr("lay-verify", "");
        $("#sxsj").attr("lay-verify", "");
        $("#finalCheckJsxmCopy1Form").css("height", "800px");
        document.getElementById("psbhjd").value = null;
        document.getElementById("psjd").value = "3";
    }

    /**
     * 预览PDF文件
     */
    FinalCheckJsxmCopy1.downPDF = function () {
        var Id = result.data.id;
        /**
         * 首先从方案表中获取方案生成时候的文件关联id
         */
        var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/detail?id=" + Id, "POST")
        var selectdata = ajax.start();
        var associateId = selectdata.data.associateId;
        var businesstype = '4';
        if (associateId) {
            window.open(window.location.origin + '/system/preview/file/' + associateId + ',' + businesstype);
        }
    };

    /**
     * 预览评审意见文件
     */
    FinalCheckJsxmCopy1.downYJ = function () {
        var Id = result.data.id;
        /**
         * 首先从方案表中获取方案生成时候的文件关联id
         */
        var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/detail?id=" + Id, "POST")
        var selectdata = ajax.start();
        var associateId = selectdata.data.associateId;
        var businesstype = '5';
        if (associateId) {
            window.open(window.location.origin + '/system/preview/file/' + associateId + ',' + businesstype);
        }
    };

    if (num == 3) {
        var li = document.getElementById('1');
        li.className = 'current_prev';
        var li2 = document.getElementById('2');
        li2.className = 'current';
        var li3 = document.getElementById('3');
        li3.className = ' ';
        var li4 = document.getElementById('4');
        li4.className = 'last';
    } else if (num == 4) {
        var li = document.getElementById('1');
        li.className = 'done';
        var li2 = document.getElementById('2');
        li2.className = 'current_prev';
        var li3 = document.getElementById('3');
        li3.className = 'current';
        var li4 = document.getElementById('4');
        li4.className = 'last';
    } else if (num == 5) {
        var li = document.getElementById('1');
        li.className = 'done';
        var li2 = document.getElementById('2');
        li2.className = 'done';
        var li3 = document.getElementById('3');
        li3.className = 'done';
        var li4 = document.getElementById('4');
        li4.className = 'done';
    }


    // 方案评审PDF下载按钮点击事件
    $('#projectPDFBtn').click(function () {

        FinalCheckJsxmCopy1.downPDF();

    });

    // 方案评审意见预览按钮点击事件
    $('#firstAdPDFBtn').click(function () {

        FinalCheckJsxmCopy1.downYJ();

    });

});