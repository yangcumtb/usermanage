/**
 * 详情对话框
 */
var SysNewsInfoDlg = {
    data: {
        newsId: "",
        newsTitle: "",
        newsType: "",
        newsThumb: "",
        newsSummary: "",
        mainFileId: "",
        attFileId: "",
        createTime: "",
        updateTime: "",
        createUser: "",
        updateUser: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest','laydate','upload','formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/system/news/detail?newsId=" + Feng.getUrlParam("newsId"),"get");
    var result = ajax.start();
    form.val('sysNewsForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/system/news/edit",'post', function (data) {
            Feng.success("更新成功！");
            window.location.href = Feng.ctxPath + '/system/news'
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function(){
        window.location.href = Feng.ctxPath + '/system/news'
    });
});