/**
 * 添加或者修改页面
 */
var DatabaseInfoInfoDlg = {
    data: {
        dbName: "",
        jdbcDriver: "",
        userName: "",
        password: "",
        jdbcUrl: "",
        remarks: "",
        createTime: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;

    //让当前iframe弹层高度适应
    admin.iframeAuto();

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/databaseInfo/addItem",'post', function (data) {
            Feng.success("添加成功！");
            window.location.href = Feng.ctxPath + '/databaseInfo'
        }, function (data) {
            Feng.error("添加失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    //返回按钮
    $("#backupPage").click(function () {
        window.location.href = Feng.ctxPath + '/databaseInfo'
    });

});