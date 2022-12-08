/**
 * 添加或者修改页面
 */
var MineEnterpriseInfoDlg = {
    data: {
        id: "",
        qymc: "",
        frdb: "",
        qyxz: "",
        dwdz: "",
        ksmc: "",
        ckxkz: "",
        ckzh: "",
        lmzh: "",
        bfz: "",
        sfjgxy: "",
        sjlsylsl: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        debugger;
        var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/mineEnterprise/add", 'post', function (data) {
            Feng.success("添加成功！");
            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);
            //关掉对话框
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("添加失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });


});