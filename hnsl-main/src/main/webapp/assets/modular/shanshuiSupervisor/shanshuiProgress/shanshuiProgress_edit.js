/**
 * 详情对话框
 */
var ShanshuiProgressInfoDlg = {
    data: {
        id: "",
        projectid: "",
        percent: "",
        createtime: "",
        createuser: "",
        associateid: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest','laydate','upload','formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;





    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/shanshuiProgress/detail?id=" + Feng.getUrlParam("id"),"get");
    var result = ajax.start();
    form.val('shanshuiProgressForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/shanshuiProgress/edit",'post', function (data) {
            Feng.success("更新成功！");
            window.location.href = Feng.ctxPath + '/shanshuiProgress'
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function(){
        window.location.href = Feng.ctxPath + '/shanshuiProgress'
    });
});