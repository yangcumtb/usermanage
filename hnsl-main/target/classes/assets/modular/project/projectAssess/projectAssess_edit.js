/**
 * 详情对话框
 */
var ProjectAssessInfoDlg = {
    data: {
        id: "",
        projectName: "",
        projectAssessNode: "",
        //projectCheckStatus: "",
        projectCompany: "",
        projectDesc: "",
        createTime: "",
        updateTime: "",
        createUser: "",
        updateUser: ""
    }
};
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
        pssjS: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layer = layui.layer;
    //获取详情信息，填充表单

    var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    if (result.data != '') {
        console.log("生产");
        form.val('finalCheckProductivemineForm', result.data);
    } else {
        console.log("建设");
        var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/detail?id=" + Feng.getUrlParam("id"), "get");
        var result = ajax.start();
        form.val('projectAssessInfoForm', result.data);
    }


    var curNode = $("#projectAssessNode").val(); //将来用来避免审批回退的控制变量
    var curProjectType = $("#projectType").val(); //当前项目类型
    form.on('select(projectAssessNode)', function (data) {

        if (data.value == 1) {
            $("#firstBtn").css("display", "");
            $("#secendBtn").css("display", "none");
        } else if (data.value == 2) {
            $("#firstBtn").css("display", "none");
            $("#secendBtn").css("display", "");
        } else {
            $("#firstBtn").css("display", "none");
            $("#secendBtn").css("display", "none");
        }
        curNode = data.value;
    });
    form.on('select(projectType)', function (data) {
        curProjectType = data.value;
    });

    $("#firstBtn").click(function () {
        var url = "";
        if (curProjectType == 1) {
            url = "/productivemineCheck/begin";
        } else {
            url = "/jsxmCheck/begin";
        }
        layer.open({
            type: 2,
            title: '请填写初审方案信息',
            shadeClose: true,
            shade: 0.8,
            area: ['580px', '90%'],
            shadeClose: false,
            content: url //iframe的url
        });
    });

    $("#secendBtn").click(function () {
        var url = "";
        if (curProjectType == 1) {
            url = "/productivemineCheck/final";
        } else {
            url = "/jsxmCheck/final";
        }
        layer.open({
            type: 2,
            title: '请填写二审方案信息',
            shadeClose: true,
            shade: 0.8,
            area: ['580px', '90%'],
            shadeClose: false,
            content: url //iframe的url
        });
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/project/projectAssess/edit", 'post', function (data) {
            Feng.success("更新成功！");
            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);
            //关掉对话框
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

});
