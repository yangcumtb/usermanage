/**
 * 详情对话框
 */
var VerificationTaskInfoDlg = {
    data: {
        id: "",
        xzs: "",
        xzx: "",
        tbtype: "",//图斑类型
        hcnr: "",
        tbStatus: "",
        taskStatus: "",
        bz: "",
        recoverCheckParam: "",//已修复图斑的核查信息
        recoveredspotParam: "",//已修复图斑的基础信息
        damagespotParam: "",//损毁图斑的基础信息
        damageCheckParam: "",//损毁图斑的核查信息
        hcqk: "",
        dept_name: "",
        user_id: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'layarea', 'formSelects', 'carousel'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layarea = layui.layarea;
    var carousel = layui.carousel;

    layarea.render({
        elem: '#area-picker1',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    })
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    })
    var VerificationTask = {
        tableId: "verificationTaskTable",
    };

    form.on('select(select-tbtype)', function (data) {
        $("#tbtype").val(data.value);
    });
    form.on('select(select-hcnr)', function (data) {
        $("#hcnr").val(data.value);
    });
    form.on('select(select-taskStatus)', function (data) {
        $("#taskStatus").val(data.value);
    });


    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/productivemineTask/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    var data = result.data;
    var type = data.taskStatus;


    if (result.data.recoveredspotParam != null) {
        $("#verificationTaskForm2").css("display", "");
        form.val('verificationTaskForm2', result.data.recoveredspotParam);
    }
    if (result.data.recoverCheckParam != null) {
        $("#verificationTaskForm").css("display", "");
        form.val('verificationTaskForm', result.data.recoverCheckParam);
    }
    if (result.data.damagespotParam != null) {
        $("#verificationTaskForm3").css("display", "");
        var dshlx = result.data.damagespotParam.shlx;
        form.val('verificationTaskForm3', result.data.damagespotParam);
    }
    if (result.data.recoverCheckParam == null && result.data.damageCheckParam == null) {
        $("#alarm").css("display", "");
    }
    if (result.data.damageCheckParam != null) {
        $("#verificationTaskForm1").css("display", "");
        var hcshlx = result.data.damageCheckParam.hcshlx;
        form.val('verificationTaskForm1', result.data.damageCheckParam);
    }

    //damage判断
    if (dshlx == "WS") {
        $("#ws").css("display", "")
    } else if (dshlx == "TX") {
        $("#tx").css("display", "")
    } else if (dshlx == "YZ") {
        $("#yz").css("display", "")
    } else if (dshlx == "ZY") {
        $("#zy").css("display", "")
    }
    if (hcshlx == "WS") {
        $("#hcws").css("display", "")
    } else if (hcshlx == "TX") {
        $("#hctx").css("display", "")
    } else if (hcshlx == "YZ") {
        $("#hcyz").css("display", "")
    } else if (hcshlx == "ZY") {
        $("#hczy").css("display", "")
    }

    var fileids = data.fileBusinessName;
    console.log(fileids)
    if (fileids != null) {
        var imageId_array = fileids.split(',');
        var L = imageId_array.length;
        for (var i = 0; i < L; i++) {
            var newImage = document.createElement("img");
            newImage.id = "a" + [i];
            var GfatherDiv = document.getElementById("a");
            GfatherDiv.appendChild(newImage);
            $("#a" + [i]).attr('src', Feng.ctxPath + '/system/previewImage/' + imageId_array[i])
        }
        var img = document.querySelectorAll("img");
        let FirW = new Array();
        console.log("action")
        setTimeout(function () {
            for (var i = 0; i < L; i++) {
                FirW.push((img[i].width / img[i].height) * 550)
            }
            ;
            console.log(FirW)
            setTimeout(function () {
                for (var i = 0; i < L; i++) {
                    img[i].style.width = FirW[i] + "px";
                    img[i].style.height = "550px"
                }
                $("#photo").css("display", "")
            }, 1000);
        }, 500);
    }


    //图片轮播
    carousel.render({
        elem: '#card'
        , width: '100%' //设置容器宽度
        , height: '100%' //设置容器高度
        , arrow: 'hover'
        , indicator: 'outside'
    });

});