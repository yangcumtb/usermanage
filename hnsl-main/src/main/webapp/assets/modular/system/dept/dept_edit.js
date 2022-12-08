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

    //获取部门信息
    var ajax = new HttpRequest(Feng.ctxPath + "/system/dept/detail/" + Feng.getUrlParam("deptId"), "get");
    var result = ajax.start();
    form.val('deptForm', result);

    //回显政区
    var ajax2 = new HttpRequest(Feng.ctxPath + "/base/baseAdmin/detail?adCode=" + result.adCode,"get");
    var result2 = ajax2.start();
    $('#adCode').val(result2.data.adFullName);
    $('#adName').val(result2.data.adFullName);

    // 点击上级角色时
    $('#pName').click(function () {
        var formName = encodeURIComponent("parent.DeptInfoDlg.data.pName");
        var formId = encodeURIComponent("parent.DeptInfoDlg.data.pid");
        var treeUrl = encodeURIComponent("/system/dept/tree");

        layer.open({
            type: 2,
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
        var ajax = new HttpRequest(Feng.ctxPath + "/system/dept/edit", "post", function (data) {
            Feng.success("修改成功！");

            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);

            //关掉对话框
            admin.closeThisDialog();

        }, function (data) {
            Feng.error("修改失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        //添加 return false 可成功跳转页面
        return false;
    });

});