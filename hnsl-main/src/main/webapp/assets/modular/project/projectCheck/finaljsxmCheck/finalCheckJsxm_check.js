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
        shjg: "",
        tjlx: "",
        bhyj: "",
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'layarea', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layarea = layui.layarea;
    /**
     * 管理
     */
    var FinalCheckJsxmCopy1 = {
        tableId: "finalCheckJsxmCopy1Table",
        queryData: {}
    };
    // 渲染时间选择框
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    })

    var today = (new Date()).toLocaleDateString();
    laydate.render({
        elem: "#SXSJ",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });

    laydate.render({
        elem: "#DQSJ",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#pssjXs",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#pssjXf",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#pssjC",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#pssjS",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });


    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    if (result.data.pssjC != null) {
        result.data.pssjC = result.data.pssjC.substr(0, 10);
    }
    if (result.data.pssjS != null) {
        result.data.pssjS = result.data.pssjS.substr(0, 10);
    }
    if (result.data.pssjXf != null) {
        result.data.pssjXf = result.data.pssjXf.substr(0, 10);
    }
    if (result.data.pssjXs != null) {
        result.data.pssjXs = result.data.pssjXs.substr(0, 10);
    }
    form.val('finalCheckJsxmCopy1Form', result.data);

    var data2 = result.data;
    var lx = data2.tjlx;
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
        $("#a2").css("display", "");
        $("#a3").css("display", "");
        $("#a4").css("display", "");
        $("#a5").css("display", "");
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
        $("#a2").css("display", "");
        $("#a3").css("display", "none");
        $("#a4").css("display", "none");
        $("#a5").css("display", "none");
        $("#ad").css("display", "none");
        $("#ae").css("display", "none");
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
    FinalCheckJsxmCopy1.downPSYJ = function () {
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
    FinalCheckJsxmCopy1.downZJYJ = function () {
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


    var curNode = $("#shjg").val();
    form.on('select(shjg)', function (data) {
        var a = data2.psjd;
        if (data.value == 1) {
            if (a == 1) {
                document.getElementById("psjd").value = a;
                document.getElementById("psbhjd").value = "";
            } else if (a == 4) {
                document.getElementById("psbhjd").value = "";
            } else {
                document.getElementById("psjd").value = "3";
                document.getElementById("psbhjd").value = "";
            }
            document.getElementById("psbhjd").value = "";
            $("#a6").css("display", "none");
        } else if (data.value == 2) {
            document.getElementById("psbhjd").value = a;
            $("#a6").css("display", "");
        }
        curNode = data.value
    });

    // 方案评审PDF预览按钮点击事件
    $('#projectPDFBtn').click(function () {
        FinalCheckJsxmCopy1.downPSYJ();
    });

    // 专家意见预览按钮点击事件
    $('#firstAdPDFBtn').click(function () {
        FinalCheckJsxmCopy1.downZJYJ();
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/check", 'post', function (data) {
            if (data.success == true) {
                Feng.success("更新成功！");
                //传给上个页面，刷新table用
                admin.putTempData('formOk', true);
                //关掉对话框
                admin.closeThisDialog();
            } else if (data.message == "驳回成功") {
                Feng.success("驳回成功！");
            } else {
                Feng.error("更新失败！" + data.message)
            }
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

});