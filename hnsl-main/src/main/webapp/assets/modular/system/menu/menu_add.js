/**
 * 详情对话框
 */
var MenuInfoDlg = {
    data: {
        parentId: "",
        parentName: ""
    }
};

layui.use(['layer', 'form', 'admin', 'laydate', 'HttpRequest', 'iconPicker'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layer = layui.layer;
    var iconPicker = layui.iconPicker;

    // 点击父级菜单
    $('#parentName').click(function () {
        var formName = encodeURIComponent("parent.MenuInfoDlg.data.parentName");
        var formId = encodeURIComponent("parent.MenuInfoDlg.data.parentId");
        var treeUrl = encodeURIComponent("/system/menu/selectMenuTreeList");

        layer.open({
            type: 2,
            title: '父级菜单',
            area: ['600px', '400px'],
            content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl,
            end: function () {
                $("#parentId").val(MenuInfoDlg.data.parentId);
                $("#parentName").val(MenuInfoDlg.data.parentName);
            }
        });
    });

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/system/menu/add",'post', function (data) {
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

    //初始化图标选择
    iconPicker.render({
        elem: '#icon',
        type: 'fontClass',
        search: true,
        page: true,
        limit: 12,
        click: function (data) {
        }
    });

    iconPicker.checkIcon('iconPicker', 'layui-icon-star-fill');

    //初始化字典详细列表
    $("#dictDetails").html('');
    var ajax = new HttpRequest(Feng.ctxPath + "/dict/listDictsByCode",'get', function (data) {

        for (var i = 0; i < data.data.length; i++) {
            var name = data.data[i].name;
            var code = data.data[i].code;
            $("#dictDetails").append('<input type="radio" name="systemType" value="' + code + '" title="' + name + '">');
        }
        form.render();

    }, function (data) {
    });
    ajax.set("dictTypeCode", "SYSTEM_TYPE");
    ajax.start();

});