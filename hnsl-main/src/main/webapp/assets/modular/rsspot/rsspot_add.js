/**
 * 添加或者修改页面
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

layui.use(['form', 'admin', 'HttpRequest','laydate','upload','formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "//rsspot/add",'post', function (data) {
            Feng.success("添加成功！");
            window.location.href = Feng.ctxPath + '/rsspot'
        }, function (data) {
            Feng.error("添加失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function(){
        window.location.href = Feng.ctxPath + '/rsspot'
    });

});