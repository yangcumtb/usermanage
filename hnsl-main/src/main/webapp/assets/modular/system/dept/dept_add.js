/**
 * 角色详情对话框
 */
var DeptInfoDlg = {
    data: {
        pid: "",
        pName: ""
    }
};

layui.use(['layer', 'form', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layer = layui.layer;

    // 点击上级角色时
    $('#pName').click(function () {
        var formName = encodeURIComponent("parent.DeptInfoDlg.data.pName");
        var formId = encodeURIComponent("parent.DeptInfoDlg.data.pid");
        var treeUrl = encodeURIComponent("/system/dept/tree");
        layer.open({
            type: 2,
            deptType: 2,
            title: '父级部门',
            area: ['300px', '400px'],
            content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl,
            end: function () {
                $("#pid").val(DeptInfoDlg.data.pid);
                $("#pName").val(DeptInfoDlg.data.pName);
            }
        });
    });

    // 点击上级政区
    $('#adName').click(function () {
        var formName = encodeURIComponent("parent.DeptInfoDlg.data.adName");
        var formId = encodeURIComponent("parent.DeptInfoDlg.data.adCode");
        var treeUrl = encodeURIComponent("/base/baseAdmin/tree");

        layer.open({
            type: 2,
            deptType: 2,
            title: '上级政区',
            area: ['300px', '400px'],
            content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl,
            end: function () {
                $("#adCode").val(DeptInfoDlg.data.adCode);
                $("#adName").val(DeptInfoDlg.data.adName);
            }
        });
    });

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/system/dept/add", "post", function (data) {
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

        //添加 return false 可成功跳转页面
        return false;
    });

});