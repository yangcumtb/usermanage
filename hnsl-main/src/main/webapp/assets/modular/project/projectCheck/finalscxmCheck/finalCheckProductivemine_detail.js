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
        bhyj: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'layarea','laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layarea = layui.layarea;

    // layarea.render({
    //     elem: '#area-picker',
    //     change: function (res) {
    //         //选择结果
    //         console.log(res);
    //     }
    // })

    // var today = (new Date()).toLocaleDateString();
    // laydate.render({
    //     elem: "#SXSJ",
    //     min: today,
    //     max: '2080-10-14',
    //     type: 'date',
    //     done: function (value, date, endDate) {
    //
    //     }
    // });
    //
    // laydate.render({
    //     elem: "#DQSJ",
    //     min: today,
    //     max: '2080-10-14',
    //     type: 'date',
    //     done: function (value, date, endDate) {
    //
    //     }
    // });
    // laydate.render({
    //     elem: "#pssjXs",
    //     min: today,
    //     max: '2080-10-14',
    //     type: 'date',
    //     done: function (value, date, endDate) {
    //
    //     }
    // });
    // laydate.render({
    //     elem: "#pssjXf",
    //     min: today,
    //     max: '2080-10-14',
    //     type: 'date',
    //     done: function (value, date, endDate) {
    //
    //     }
    // });
    // laydate.render({
    //     elem: "#pssjC",
    //     min: today,
    //     max: '2080-10-14',
    //     type: 'date',
    //     done: function (value, date, endDate) {
    //
    //     }
    // });
    // laydate.render({
    //     elem: "#pssjS",
    //     min: today,
    //     max: '2080-10-14',
    //     type: 'date',
    //     done: function (value, date, endDate) {
    //
    //     }
    // });

    form.verify({
        A: [/^[\S]{0,7}$/, '中心点经度应不超过6位数字，且不能出现空格'],
        B: [/^[\S]{0,7}$/, '中心点纬度应不超过6位数字，且不能出现空格'],
        C: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '面积需为正数，请重新输入'],
        D: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '经费需为正数，请重新输入'],
    });

    var FinalCheckProductivemine = {
        tableId: "finalCheckProductivemineTable"
    };

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
    console.log(Feng.getUrlParam("id"));
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
    form.val('finalCheckProductivemineForm', result.data);
    var data1 = result.data;
    var num = data1.psjd;
    if (data1.tjlx == 1) {
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
     * 预览PDF文件
     */
    FinalCheckProductivemine.downPDF = function () {
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
     * 预览评审意见文件
     */
    FinalCheckProductivemine.downYJ = function (data) {
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
    if (num == 3){
        var li =document.getElementById('1');
        li.className = 'current_prev';
        var li2 =document.getElementById('2');
        li2.className = 'current';
        var li3 = document.getElementById('3');
        li3.className = ' ';
        var li4 = document.getElementById('4');
        li4.className = 'last';
    } else if (num == 4){
        var li =document.getElementById('1');
        li.className = 'done';
        var li2 =document.getElementById('2');
        li2.className = 'current_prev';
        var li3 = document.getElementById('3');
        li3.className = 'current';
        var li4 = document.getElementById('4');
        li4.className = 'last';
    } else if (num == 5) {
        var li =document.getElementById('1');
        li.className = 'done';
        var li2 =document.getElementById('2');
        li2.className = 'done';
        var li3 = document.getElementById('3');
        li3.className = 'done';
        var li4 = document.getElementById('4');
        li4.className = 'done';
    }

    // 方案评审PDF下载按钮点击事件
    $('#projectPDFBtn').click(function () {

        FinalCheckProductivemine.downPDF();

    });

    // 方案评审意见预览按钮点击事件
    $('#firstAdPDFBtn').click(function () {

        FinalCheckProductivemine.downYJ();

    });


});