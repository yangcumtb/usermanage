/**
 * 添加或者修改页面
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

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'layarea', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layarea = layui.layarea;
    var laydate = layui.laydate;
    var today = (new Date()).toLocaleDateString();

    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    })
    laydate.render({
        elem: "#ghxfsj",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#yqyssj",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/plannedRecoverspot/add", 'post', function (data) {
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