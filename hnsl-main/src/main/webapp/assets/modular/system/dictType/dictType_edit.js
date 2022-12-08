/**
 * 详情对话框
 */
var DictTypeInfoDlg = {
    data: {
        systemFlag: "",
        code: "",
        name: "",
        description: "",
        status: "",
        createTime: "",
        createUser: "",
        updateTime: "",
        updateUser: ""
    }
};

layui.use(['form', 'HttpRequest', 'admin'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/system/dictType/detail?dictTypeId=" + Feng.getUrlParam("dictTypeId"), "get");
    var result = ajax.start();
    form.val('dictTypeForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/system/dictType/edit",'post', function (data) {
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