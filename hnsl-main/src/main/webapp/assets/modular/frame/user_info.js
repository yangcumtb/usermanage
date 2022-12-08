layui.use(['form', 'upload', 'element', 'HttpRequest', 'laydate'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var upload = layui.upload;
    var element = layui.element;
    var HttpRequest = layui.HttpRequest;
    var laydate = layui.laydate;

    //渲染时间选择框
    laydate.render({
        elem: '#birthday'
    });

    //获取用户详情
    var ajax = new HttpRequest(Feng.ctxPath + "/system/currentUserInfo", "get");
    var result = ajax.start();

    //用这个方法必须用在class有layui-form的元素上
    form.val('userInfoForm', result.data);

    //表单提交事件
    form.on('submit(userInfoSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/system/mgr/edit",'post', function (data) {
            Feng.success("修改成功!");
        }, function (data) {
            Feng.error("修改失败!" + data.message + "!");
        });
        ajax.set(data.field);
        ajax.start();
    });

    upload.render({
        elem: '#imgHead'
        , url: Feng.ctxPath + '/system/upload/image'
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $('#avatarPreview').attr('src', result);
            });
        }
        , done: function (res) {
            var ajax = new HttpRequest(Feng.ctxPath + "/system/updateAvatar",'post', function (data) {
                Feng.success(res.message);
            }, function (data) {
                Feng.error("修改失败!" + data.message + "!");
            });
            ajax.set("fileId", res.data.fileId);
            ajax.start();
        }
        , error: function () {
            Feng.error("上传头像失败！");
        }
    });
});