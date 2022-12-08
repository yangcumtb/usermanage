/**
 * 详情对话框
 */
var PlannedRecoverspotInfoDlg = {
    data: {
        id: "",
        tbmc: "",
        xzs: "",
        xzx: "",
        sukq: "",
        tbmj: "",
        kfx: "",
        kfy: "",
        xzShlx: "",
        xzTbsx: "",
        stwt: "",
        ghxfsj: "",
        ghxffs: "",
        ghxfdl: "",
        ghssdw: "",
        tzgs: "",
        zjly: "",
        yqyssj: "",
        createUser: "",
        createTime: "",
        updateUser: "",
        updateTime: "",
        geoShp: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest','laydate', 'layarea','upload','formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layarea = layui.layarea;

    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    });

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/plannedRecoverspot/detail?id=" + Feng.getUrlParam("id"),"get");
    var result = ajax.start();
    form.val('plannedRecoverspotForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/plannedRecoverspot/edit",'post', function (data) {
            Feng.success("更新成功！");
            window.location.href = Feng.ctxPath + '/prominemanger/plannedRecoverspot'
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function(){
        window.location.href = Feng.ctxPath + '/prominemanger/plannedRecoverspot'
    });
});