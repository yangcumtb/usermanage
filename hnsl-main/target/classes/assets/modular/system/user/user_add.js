/**
 * 用户详情对话框
 */
var UserInfoDlg = {
    data: {
        deptId: "",
        deptName: ""
    }
};

layui.use(['layer', 'form', 'admin', 'laydate', 'HttpRequest', 'xmSelect'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layer = layui.layer;
    var xmSelect = layui.xmSelect;

    // 点击部门时
    $('#deptName').click(function () {
        var formName = encodeURIComponent("parent.UserInfoDlg.data.deptName");
        var formId = encodeURIComponent("parent.UserInfoDlg.data.deptId");
        var treeUrl = encodeURIComponent("/system/dept/tree");
        var onlyLeaf = encodeURIComponent("true");

        layer.open({
            type: 2,
            title: '部门选择',
            area: ['300px', '600px'],
            content: Feng.ctxPath + '/system/commonTree?onlyLeaf=' + onlyLeaf + '&formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl,
            end: function () {
                $("#deptId").val(UserInfoDlg.data.deptId);
                $("#deptName").val(UserInfoDlg.data.deptName);
            }
        });
    });

    // 添加表单验证方法
    form.verify({
        psw: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repsw: function (value) {
            if (value !== $('#userForm input[name=password]').val()) {
                return '两次密码输入不一致';
            }
        }
    });

    // 渲染时间选择框
    laydate.render({
        elem: '#birthday'
    });

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/system/user/add", 'post', function (data) {
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

    //初始化所有的职位列表
    var selRole = xmSelect.render({
        el: '#selRole',
        name: "roleId",
        toolbar: {show: true},
        layVerify: 'required',
        prop: {
            name: 'roleName',
            value: 'roleId',
        },
        data: []
    })

    new HttpRequest(Feng.ctxPath + "/system/role/roleListByUserId", 'get', function (data) {
        selRole.update({
            data: data.data,
            autoRow: true,
        })
    }).start();

    //初始化所有的职位列表
    var selPosition = xmSelect.render({
        el: '#selPosition',
        name: "positionId",
        toolbar: {show: true},
        layVerify: 'required',
        prop: {
            name: 'name',
            value: 'positionId',
        },
        data: []
    })

    new HttpRequest(Feng.ctxPath + "/system/post/listPositions", 'get', function (data) {
        selPosition.update({
            data: data.data,
            autoRow: true,
        })
    }).start();

});
