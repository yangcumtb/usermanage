/**
 * 详情对话框
 */

var FinalCheckProductivemineCopy1InfoDlg = {
    data: {
        id: "",
        xmmc: "",
        scdw: "",
        dwdz: "",
        xkz: "",
        nx: "",
        xkzqk: "",
        shi: "",
        xian: "",
        wz: "",
        kz: "",
        kqgm: "",
        zycl: "",
        kqmj: "",
        scnl: "",
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

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'layarea', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layarea = layui.layarea;

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

    var FinalCheckProductivemine = {
        tableId: "finalCheckProductivemineTable"
    };

    form.verify({
        A: [/^[\S]{0,7}$/, '中心点经度应不超过6位数字，且不能出现空格'],
        B: [/^[\S]{0,7}$/, '中心点纬度应不超过6位数字，且不能出现空格'],
        C: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '面积需为正数，请重新输入'],
        D: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '经费需为正数，请重新输入'],
    });

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/detail?id=" + Feng.getUrlParam("id"), "get");
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
    form.val('finalCheckProductivemineForm', result.data);
    var data2 = result.data;

    if (data2.tjlx == 1) {
        $("#e").css("display", "");
        $("#f").css("display", "");
        $("#g").css("display", "");
        $("#h").css("display", "");
        $("#i").css("display", "");
        $("#j").css("display", "");
        $("#k").css("display", "");
        $("#l").css("display", "");
        $("#m").css("display", "");
        $("#n").css("display", "");
        $("#o").css("display", "");
        $("#p").css("display", "");
        $("#q").css("display", "");
        $("#r").css("display", "");
        $("#s").css("display", "");
        $("#t").css("display", "");
        $("#u").css("display", "");
        $("#v").css("display", "");
        $("#y").css("display", "");
        $("#z").css("display", "");
        $("#ab").css("display", "none");
        $("#ac").css("display", "none");
        $("#ad").css("display", "");
        $("#ae").css("display", "");
        $("#shi").attr("lay-verify", "required");
        $("#xian").attr("lay-verify", "required");
        $("#xkzqk").attr("lay-verify", "required");
        $("#kz").attr("lay-verify", "required");
        $("#kfx").attr("lay-verify", "required");
        $("#kfy").attr("lay-verify", "required");
        $("#dqsj").attr("lay-verify", "required");
        $("#xmmj").attr("lay-verify", "required");
        $("#sxsj").attr("lay-verify", "required");
        $("#fwnx").attr("lay-verify", "required");
        $("#nx").attr("lay-verify", "required");
        $("#pssJS").attr("lay-verify", "required");
        $("#pssjXf").attr("lay-verify", "");
        $("#pssJXs").attr("lay-verify", "");
        $("#fkjf").attr("lay-verify", "required");
        $("#pssJC").attr("lay-verify", "required");
        $("#dwdz").attr("lay-verify", "required");
        $("#bzdw").attr("lay-verify", "required");
        $("#zycl").attr("lay-verify", "required");
    } else {
        $("#e").css("display", "none");
        $("#f").css("display", "none");
        $("#g").css("display", "");
        $("#h").css("display", "none");
        $("#i").css("display", "none");
        $("#j").css("display", "");
        $("#k").css("display", "none");
        $("#l").css("display", "");
        $("#m").css("display", "none");
        $("#n").css("display", "none");
        $("#o").css("display", "");
        $("#p").css("display", "");
        $("#q").css("display", "");
        $("#r").css("display", "");
        $("#s").css("display", "none");
        $("#t").css("display", "none");
        $("#u").css("display", "none");
        $("#v").css("display", "none");
        $("#y").css("display", "");
        $("#z").css("display", "none");
        $("#ab").css("display", "none");
        $("#ac").css("display", "none");
        $("#ad").css("display", "none");
        $("#ae").css("display", "none");
        $("#shi").attr("lay-verify", "");
        $("#xian").attr("lay-verify", "");
        $("#xkzqk").attr("lay-verify", "");
        $("#kz").attr("lay-verify", "");
        $("#kfx").attr("lay-verify", "");
        $("#kfy").attr("lay-verify", "");
        $("#dqsj").attr("lay-verify", "");
        $("#xmmj").attr("lay-verify", "");
        $("#sxsj").attr("lay-verify", "");
        $("#fwnx").attr("lay-verify", "");
        $("#nx").attr("lay-verify", "");
        $("#pssJS").attr("lay-verify", "");
        $("#pssjXf").attr("lay-verify", "");
        $("#pssJXs").attr("lay-verify", "");
        $("#fkjf").attr("lay-verify", "");
        $("#pssJC").attr("lay-verify", "");
        $("#dwdz").attr("lay-verify", "");
        $("#bzdw").attr("lay-verify", "");
        $("#zycl").attr("lay-verify", "");
        $("#finalCheckProductivemineForm").css("height", "800px");
    }

    /**
     * 预览PDF方案文件
     */
    FinalCheckProductivemine.downPSYJ = function () {
        var Id = result.data.id;
        /**
         * 首先从方案表中获取方案生成时候的文件关联id
         */
        var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/detail?id=" + Id, "POST")
        var selectdata = ajax.start();
        var associateId = selectdata.data.associateId;
        var businesstype = '4';
        if (associateId) {
            window.open(window.location.origin + '/system/preview/file/' + associateId + ',' + businesstype);
        }
    };

    /**
     * 预览专家意见文件
     */
    FinalCheckProductivemine.downZJYJ = function () {
        var Id = result.data.id;
        /**
         * 首先从方案表中获取方案生成时候的文件关联id
         */
        var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/detail?id=" + Id, "POST")
        var selectdata = ajax.start();
        var associateId = selectdata.data.associateId;
        var businesstype = '5';
        if (Id) {
            window.open(window.location.origin + '/system/preview/file/' + associateId + ',' + businesstype);
        }
    };

    var curNode = $("#shjg").val();
    form.on('select(shjg)', function (data) {
        var a = data2.psjd;
        if (data.value == 1) {
            if (a == 1) {
                document.getElementById("pssjC").value = today;
            } else if (a == 2) {
                document.getElementById("pssjC").value = today;
            } else if (a == 3) {
                document.getElementById("pssjC").value = today;
            } else if (a == 4) {
                document.getElementById("pssjS").value = today;
            }
            $("#a6").css("display", "none");
        } else {
            if (a == 1) {
                document.getElementById("pssjC").value = today;
            } else if (a == 2) {
                document.getElementById("pssjC").value = today;
            } else if (a == 3) {
                document.getElementById("pssjC").value = today;
                document.getElementById("psbhjd").value = a;
            } else if (a == 4) {
                document.getElementById("pssjS").value = today;
                document.getElementById("psbhjd").value = a;
            }
            $("#a6").css("display", "");
        }
        curNode = data.value
    });


    // 方案评审PDF预览按钮点击事件
    $('#projectPDFBtn').click(function () {
        FinalCheckProductivemine.downPSYJ();
    });

    // 专家意见预览按钮点击事件
    $('#firstAdPDFBtn').click(function () {
        FinalCheckProductivemine.downZJYJ();
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/check", 'post', function (data) {
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