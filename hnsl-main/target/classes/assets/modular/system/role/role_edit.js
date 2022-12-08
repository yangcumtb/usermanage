/**
 * 角色详情对话框
 */
var RoleInfoDlg = {
    data: {
        pid: "",
        pName: ""
    }
};

layui.use(['layer', 'form', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layer = layui.layer;

    //初始化角色的详情数据
    var ajax = new HttpRequest(Feng.ctxPath + "/system/role/view/" + Feng.getUrlParam("roleId"), "get");
    var result = ajax.start();
    form.val('roleForm',result.data);

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/system/role/edit",'post', function (data) {
            Feng.success("修改成功!");

            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);

            //关掉对话框
            admin.closeThisDialog();

        }, function (data) {
            Feng.error("修改失败!" + data.message + "!");
        });
        ajax.set(data.field);
        ajax.start();

        //添加 return false 可成功跳转页面
        return false;
    });
});