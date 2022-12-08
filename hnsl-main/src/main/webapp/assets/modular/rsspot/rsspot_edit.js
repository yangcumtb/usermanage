/**
 * 详情对话框
 */
var RsspotInfoDlg = {
    data: {
        id: "",
        xzs: "",
        xzx: "",
        ckzh: "",
        kfx: "",
        kfy: "",
        changearea: "",
        changetype: "",
        minename: "",
        bz: "",
        createUser: "",
        createTime: "",
        updateUser: "",
        updateTime: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects', 'layarea', 'xmSelect', 'func'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var xmSelect = layui.xmSelect;
    var func = layui.func;

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/rsspot/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    if (result.data.rejectpoint == 1) {
        $("#comments").css("display","")
    }
    form.val('rsspotForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/rsspot/edit",'post', function (data) {
            Feng.success("更新成功！");
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();
        return false;
    });

});