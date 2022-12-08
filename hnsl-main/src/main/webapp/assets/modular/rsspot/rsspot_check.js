/**
 * 方案审批
 */
layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects', 'layarea', 'xmSelect', 'func',"layarea"], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var element = layui.element;
    var upload = layui.upload;
    var xmSelect = layui.xmSelect;
    var func = layui.func;
    var layarea = layui.layarea

    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            if (res.cityCode) {
            }
            if (res.countyCode) {
            }
        }
    });
    var ajax = new HttpRequest(Feng.ctxPath + "/map/loginDetail/", "get");
    var Dis = ajax.start();
    var ajax = new HttpRequest(Feng.ctxPath + "/rsspot/checkdetail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    let rsspot = result.data.rsspot;
    let rsspotCheck = result.data.rsspotcheck
    var id = rsspot.id;

    if (rsspot.rejectpoint == 1) {
        $("#checkpoint").empty()
        $("#comments").css("display", "");
        $("#checkpoint").append(
            "                    <option value=\"1\">通过</option>\n" +
            "                    <option value=\"2\" selected>驳回</option>")
    } else {
        $("#checkpoint").empty()
        $("#checkpoint").append("<option value=\" \"></option>\n" +
            "                    <option value=\"1\" selected>通过</option>\n" +
            "                    <option value=\"2\" >驳回</option>")
    }


    // 根据用户等级判断是否有权限操作
    if (rsspot.checkpoint == 4) {
        var index = parent.layer.getFrameIndex(window.name); //获取当前窗口的name

        parent.layer.close(index);//关闭窗口
        parent.layer.msg('已入库，无权限操作', {icon: 4});
    } else if (rsspot.checkpoint == 1) {
        if (Dis.data.userLevel == "市级" || Dis.data.userLevel == "省级") {
            var index = parent.layer.getFrameIndex(window.name); //获取当前窗口的name
            parent.layer.close(index);//关闭窗口
            parent.layer.msg('县级未提交', {icon: 4});
        }
    } else if (rsspot.checkpoint == 2) {
        if (Dis.data.userLevel == "县级") {
            var index = parent.layer.getFrameIndex(window.name); //获取当前窗口的name
            parent.layer.close(index);//关闭窗口
            parent.layer.msg('已提交，无权限操作', {icon: 4});
        } else if (Dis.data.userLevel == "省级") {
            var index = parent.layer.getFrameIndex(window.name); //获取当前窗口的name
            parent.layer.close(index);//关闭窗口
            parent.layer.msg('市级未提交', {icon: 4});
        }
    } else if (rsspot.checkpoint == 3) {
        if (Dis.data.userLevel == "县级" || Dis.data.userLevel == "市级") {
            var index = parent.layer.getFrameIndex(window.name); //获取当前窗口的name
            parent.layer.close(index);//关闭窗口
            parent.layer.msg('已提交，无权限操作', {icon: 4});
        }
    }

    //文件表格回显
    if (result.data.fileInfoList != null) {
        for (var i = 0; i < result.data.fileInfoList.length; i++) {
            var FileIDs = result.data.fileInfoList[i].fileId
            var FileNAMEs = result.data.fileInfoList[i].fileName
            var FileSIZE = result.data.fileInfoList[i].fileSizeKb
            var num = FileNAMEs.indexOf('.');
            var Type = FileNAMEs.substr(num + 1);
            var fileList = $(['<tr id="upload-' + [i] + '">'
                , '<td>' + FileNAMEs + '</td>'
                , '<td>' + FileSIZE + 'kb</td>'
                , '<td>' + ' 项目文件 </td>'
                , '<td><span style="color: #5FB878;">已上传</span></td>'
                , '<td>'
                , '<button class="layui-btn layui-btn-xs demo-preview" type="button">预览</button>'
                , '</td>'
                , '</tr>'].join(''));
            var Pre = fileList.find('.demo-preview')
            Pre.attr('name', FileIDs)
            Pre.addClass(Type)
            $('#FileList').append(fileList);
        }
        $(".demo-preview").on('click', function () {
            var ID = this.name;
            var Class = this.className
            if (Class.indexOf("pdf") !== -1) {
                window.open(window.location.origin + '/spotmanage/system/preview/file/' + ID);
            } else if (Class.indexOf("jpg") !== -1 || Class.indexOf("jpeg") !== -1 || Class.indexOf("png") !== -1) {
                window.open(window.location.origin + '/spotmanage/system/previewImage/' + ID);
            }
            return false;
        })
    }
    //form表单填充
    form.val('rsspotInfoForm', rsspot);
    form.val('rsspotCheckInfoForm', rsspotCheck);

    //监听审核结果
    var curNode = $("#checkpoint").val();
    form.on('select(select-checkpoint)', function (data) {
        if (data.value == "1") {
            $("#a6").css("display", "none");
            $("#rejectcomment").val("")
        } else if (data.value == "2") {
            $("#a6").css("display", "");
        }
        curNode = data.value
    });



    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        data.field.id = id
        if (curNode == '2'){
            data.field.rejectpoint = 1;
        }
        var ajax = new HttpRequest(Feng.ctxPath + "/rsspot/check", 'post', function (data) {
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