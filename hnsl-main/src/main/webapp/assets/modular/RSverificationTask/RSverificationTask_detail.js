/**
 * 详情对话框
 */
var RSverificationTaskInfoDlg = {
    data: {
    //    RSsoptcheck
        id:'',
        minechangetype:'',
        rsarea:'',
        confirm:'',
        checkarea:'',
        damagemode:'',
        reclaimmode:'',
        damagelandtype:'',
        recoverlandtype:'',
        rtk:'',
        pointcoordinate:'',
        memark:'',
        checkman:'',
        checktime:'',
    //    RSspot
        jpgid:'',
        xzs:'',
        xzx:'',
        ckzh:'',
        kfx:'',
        kfy:'',
        changearea:'',
        changetype:'',
        minename:'',
        bz:'',
      //tag
        //遥感解译图斑信息
        rsspotResult:'',
        //遥感解译核查信息
        rsspotcheckResult:''
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
    var RSverificationTask = {
        tableId: "RSverificationTaskTable",
    };

    // form.on('select(select-tbtype)', function (data) {
    //     $("#tbtype").val(data.value);
    // });
    // form.on('select(select-hcnr)', function (data) {
    //     $("#hcnr").val(data.value);
    // });
    // form.on('select(select-taskStatus)', function (data) {
    //     $("#taskStatus").val(data.value);
    // });


    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/RSverification/RSverificationTask/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    var data = result.data;
    var type = data.taskStatus;

//判断页面调转
    //遥感图斑基本情况
    if (result.data.rsspotResult != null) {
        $("#RSverificationTaskForm").css("display", "");
        form.val('RSverificationTaskForm', result.data.rsspotResult);
    }
    //遥感解译核查信息
    if (result.data.rsspotcheckResult != null) {
        $("#RSverificationTaskCheckForm").css("display", "");
        form.val('RSverificationTaskCheckForm', result.data.rsspotcheckResult);
    }
    //目前暂无核查信息
    if (result.data.rsspotcheckResult == null ) {
        $("#alarm").css("display", "");
    }

    var fileids = data.fileBusinessName;
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