/**
 * 详情对话框
 */
var ProjectCheckOperationInfoDlg = {
    data: {
        czbh: "",
        shi: "",
        xian: "",
        xmmc: "",
        xmlx: "",
        shlx: "",
        falj: "",
        yjlj: "",
        tj: "",
        csh: "",
        psh: "",
        bhyj: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;


    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/project/check/detail?czbh=" + Feng.getUrlParam("czbh"), "get");
    var result = ajax.start();
    form.val('projectCheckOperationForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/project/check/edit", 'post', function (data) {
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