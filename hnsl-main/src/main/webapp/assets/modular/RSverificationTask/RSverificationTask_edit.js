/**
 * 详情对话框
 */
var RSverificationTaskInfoDlg = {
    data: {
        id: "",
        xzs: "",
        xzx: "",
        tbtype: "",
        hcnr: "",
        tbStatus: "",
        taskStatus: "",
        bz: "",
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
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    })
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
    var ajax = new HttpRequest(Feng.ctxPath + "/RSverification/RSverificationTask/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    form.val('RSverificationTaskForm', result.data);
    form.val('RSverificationTaskForm2', result.data);

    var data = result.data;
    var datasource = data.datasource;
    var num = data.tbtype;
    var type = data.taskStatus;
    console.log(result.data);
    //图片显示判断
    // if (type == 4 || type == 5) {
    //     $("#photo").css("display", "")
    // } else {
    //     $('#photo').css("display", "none")
    // }

    var fileids = data.fileBusinessName;
    var imageId_array = fileids.split(',');
    console.log(imageId_array);
    var L = imageId_array.length;
    for (var i = 0; i < L; i++) {
        var newImage = document.createElement("img");
        newImage.id = "a" + [i];
        var GfatherDiv = document.getElementById("a");
        GfatherDiv.appendChild(newImage);
        $("#a" + [i]).attr('src', Feng.ctxPath + '/system/previewImage/' + imageId_array[i])
        var imgtest = document.getElementById("a" + [i]);
        console.log(imgtest);
    }

    //字段显示判断
    if (num == 1) {
        $("#ywr").css("display", "none")
        $("#mj").css("display", "")
        $("#sx").css("display", "")
        $("#dl").css("display", "")
        $("#sy").css("display", "")
        $("#shy").css("display", "")
        $("#zl").css("display", "")
        $("#zlm").css("display", "")
        $("#nxf").css("display", "")
        $("#zr").css("display", "")
        $("#hdm").css("display", "none")
        $("#xm").css("display", "none")
        $("#js").css("display", "none")
        $("#yd").css("display", "none")
        $("#nfk").css("display", "none")
    } else if (num == 4) {
        $("#mj").css("display", "none")
        $("#sx").css("display", "none")
        $("#dl").css("display", "none")
        $("#sy").css("display", "none")
        $("#shy").css("display", "none")
        $("#zlm").css("display", "none")
        $("#nxf").css("display", "none")
        $("#zr").css("display", "none")
        $("#zl").css("display", "")
        $("#ywr").css("display", "")
        $("#hdm").css("display", "")
        $("#xm").css("display", "")
        $("#js").css("display", "")
        $("#yd").css("display", "")
        $("#nfk").css("display", "")
    } else if (datasource == 'damage') {
        $("#ywr").css("display", "")
        $("#mj").css("display", "")
        $("#sx").css("display", "")
        $("#dl").css("display", "")
        $("#sy").css("display", "")
        $("#shy").css("display", "")
        $("#zl").css("display", "")
        $("#zlm").css("display", "")
        $("#nxf").css("display", "")
        $("#zr").css("display", "none")
        $("#hdm").css("display", "none")
        $("#xm").css("display", "none")
        $("#js").css("display", "none")
        $("#yd").css("display", "none")
        $("#nfk").css("display", "none")
        $("#yds").css("display", "")
        $("#kbh").css("display", "")
        $("#kmc").css("display", "")
        $("#q").css("display", "")
        $("#z").css("display", "")
        $("#x").css("display", "")
        $("#k").css("display", "")
        $("#s").css("display", "")
    } else if (datasource == 'recovered') {
        $("#ywr").css("display", "none")
        $("#mj").css("display", "")
        $("#sx").css("display", "")
        $("#dl").css("display", "")
        $("#sy").css("display", "none")
        $("#shy").css("display", "none")
        $("#zl").css("display", "none")
        $("#zlm").css("display", "")
        $("#nxf").css("display", "none")
        $("#zr").css("display", "")
        $("#hdm").css("display", "none")
        $("#xm").css("display", "none")
        $("#js").css("display", "none")
        $("#yd").css("display", "none")
        $("#nfk").css("display", "none")
        $("#yds").css("display", "")
        $("#kbh").css("display", "none")
        $("#kmc").css("display", "none")
        $("#q").css("display", "none")
        $("#z").css("display", "none")
        $("#x").css("display", "none")
        $("#k").css("display", "none")
        $("#s").css("display", "none")
        $("#ghyssjline").css("display", "none")
        $("#hcdw1").css("display", "none")
        $("#hcbm").css("display", "")
        $("#sszt1").css("display", "")
        $("#damage3").css("display", "none")
        $("#damage4").css("display", "none")
        $("#damage5").css("display", "none")
        $("#tbwz").css("display", "none")
        $("#fksj1").css("display", "")
        $("#yssj1").css("display", "none")
        $("#tz").css("display", "none")
        $("#onlymonth").css("display", "none")
        $("#dzyhlx1").css("display", "none")
        $("#shlx1").css("display", "none")
        $("#ywr").css("display", "")
        $("#xffs1").css("display", "")
    } else if (num == 2) {
        $("#ywr").css("display", "")
        $("#mj").css("display", "")
        $("#sx").css("display", "")
        $("#dl").css("display", "")
        $("#sy").css("display", "")
        $("#shy").css("display", "")
        $("#zl").css("display", "")
        $("#zlm").css("display", "")
        $("#nxf").css("display", "")
        $("#zr").css("display", "none")
        $("#hdm").css("display", "none")
        $("#xm").css("display", "none")
        $("#js").css("display", "none")
        $("#yd").css("display", "none")
        $("#nfk").css("display", "none")
        $("#yds").css("display", "")
        $("#kbh").css("display", "")
        $("#kmc").css("display", "")
        $("#q").css("display", "")
        $("#z").css("display", "")
        $("#x").css("display", "")
        $("#k").css("display", "")
        $("#s").css("display", "")
        $("#gb").css("display", "")
    } else if (num == 5) {
        $("#mj").css("display", "none")
        $("#sx").css("display", "none")
        $("#dl").css("display", "none")
        $("#sy").css("display", "none")
        $("#shy").css("display", "none")
        $("#zlm").css("display", "none")
        $("#nxf").css("display", "none")
        $("#zr").css("display", "none")
        $("#zl").css("display", "")
        $("#ywr").css("display", "")
        $("#hdm").css("display", "")
        $("#xm").css("display", "")
        $("#js").css("display", "")
        $("#yd").css("display", "")
        $("#nfk").css("display", "")
        $("#st").css("display", "")
    }

    // $.ajax({
    //     type: 'get',
    //     responseType: 'json'
    // })
    //     .then(function(obj){
    //         // let list = obj.data
    //         // for(var i=0;i<list.length;i++){
    //         //     $("#tuu"+[i]).attr('src','http://127.0.0.1:8000/upload/'+list[i]['fields']['img'])
    //         // }
    //         $("#a").attr('src',Feng.ctxPath + '/system/previewImage/' + imageId_array[1])
    //     })

    //图片轮播
    carousel.render({
        elem: '#card'
        , width: '100%' //设置容器宽度
        , height: '100%' //设置容器高度
        , arrow: 'hover'
        , indicator: 'outside'
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/RSverification/RSverificationTask/edit", 'post', function (data) {
            Feng.success("更新成功！");
            window.location.href = Feng.ctxPath + '/RSverification/RSverificationTask'
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });
});