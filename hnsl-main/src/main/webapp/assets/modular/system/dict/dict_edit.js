/**
 * 详情对话框
 */
var DictInfoDlg = {
    data: {
        dictTypeId: "",
        code: "",
        name: "",
        parentId: "",
        status: "",
        description: "",
        createTime: "",
        updateTime: "",
        createUser: "",
        updateUser: ""
    }
};

layui.use(['form', 'HttpRequest', 'admin'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/system/dict/detail?dictId=" + Feng.getUrlParam("dictId"), "get");
    var result = ajax.start();
    form.val('dictForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/system/dict/editItem",'post', function (data) {
            Feng.success("更新成功！");

            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);

            //关掉对话框
            admin.closeThisDialog();

        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();
        return false;
    });

    //父级字典时
    $('#parentName').click(function () {
        var formName = encodeURIComponent("parent.DictInfoDlg.data.parentName");
        var formId = encodeURIComponent("parent.DictInfoDlg.data.parentId");
        var treeUrl = encodeURIComponent("/system/dict/ztree?dictTypeId=" + $("#dictTypeId").val() + "&dictId=" + $("#dictId").val());

        layer.open({
            type: 2,
            title: '父级字典',
            area: ['300px', '400px'],
            content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl,
            end: function () {
                $("#parentId").val(DictInfoDlg.data.parentId);
                $("#parentName").val(DictInfoDlg.data.parentName);
            }
        });
    });
});