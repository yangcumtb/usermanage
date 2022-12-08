/**
 * 添加或者修改页面
 */
var BaseAdminInfoDlg = {
    data: {
        adCode: "",
        adName: "",
        adAbbrName: "",
        adGrad: "",
        adFullName: "",
        hasUp: "",
        upAdCode: "",
        upAdName: "",
        note: "",
        createTime: "",
        updateTime: "",
        createUser: "",
        updateUser: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;


    //生成政区编码
    $("#createAdCode").click(function () {
        var upAdCode = $("#upAdCode").val();
        if (upAdCode != "") {
            var ajax = new HttpRequest(Feng.ctxPath + "/base/baseAdmin/createAdCode",'post', function (data) {
                $("#adCode").val(data.data);
            }, function (data) {
                Feng.error("获取失败！" + data.message)
            });
            ajax.set({upAdCode: upAdCode});
            ajax.start();
        } else {
            Feng.warning("请先选择上级政区");
        }

    })

    // 点击上级政区
    $('#upAdName').click(function () {
        var formName = encodeURIComponent("parent.BaseAdminInfoDlg.data.upAdName");
        var formId = encodeURIComponent("parent.BaseAdminInfoDlg.data.upAdCode");
        var treeUrl = encodeURIComponent("/base/baseAdmin/tree");

        layer.open({
            type: 2,
            title: '上级政区',
            area: ['300px', '400px'],
            content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl,
            end: function () {
                $("#upAdCode").val(BaseAdminInfoDlg.data.upAdCode);
                $("#upAdName").val(BaseAdminInfoDlg.data.upAdName);
            }
        });
    });

    form.verify({
        adCodeVerify: [
            /^21\d{12}$/
            , '政区编码不足12位或者未以21开头'
        ]
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/base/baseAdmin/add",'post', function (data) {
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
        };
        Feng.confirm("政区编码不可修改,请再一次确认?", operation);
        return false;
    });


});