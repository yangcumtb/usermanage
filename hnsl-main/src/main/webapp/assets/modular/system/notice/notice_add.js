var NoticeDlg = {};

layui.use(['layer', 'form', 'admin', 'HttpRequest', 'laydate', 'textool', 'inputTag'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layer = layui.layer;
    var textool = layui.textool;
    var laydate = layui.laydate;
    var inputTag = layui.inputTag;

    //实例化编辑器
    var ue = UE.getEditor('container', {
        enableAutoSave: false,
        autoHeightEnabled: true,
        autoFloatEnabled: false,
        scaleEnabled: true,         //滚动条
        initialFrameHeight: 400     //默认的编辑区域高度
    });

    UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl = function (action) {
        if (action === 'uploadimage' || action === 'uploadscrawl' || action === 'uploadimage') {
            return Feng.ctxPath + '/ueditor/imgUpdate';
        } else if (action === 'uploadfile') {
            return Feng.ctxPath + '/ueditor/uploadfile';
        } else if (action === 'uploadvideo') {
            return Feng.ctxPath + '/ueditor/uploadvideo';
        } else {
            return this._bkGetActionUrl.call(this, action);
        }
    };

    lay('input.date-input').each(function () {
        laydate.render({
            elem: this
            , trigger: 'click'
            , type: 'datetime'
        });
    });

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/system/notice/add",'post', function (data) {
            Feng.success("添加成功！");
            window.location.href = Feng.ctxPath + '/system/notice';
        }, function (data) {
            Feng.error("添加失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();
        //添加 return false 可成功跳转页面
        return false;
    });

    // 通知范围切换
    form.on('select(noticeScopeFilter)', function (data) {
        NoticeDlg.userSelectDiv(data.value);
    });

    NoticeDlg.userSelectDiv = function (value) {
        if (value === "select") {
            $("#userName").attr("lay-verify", "required");
            $("#userSelectDiv").show();
        } else {
            $("#userSelectDiv").hide();
            $("#userList").val(null);
            $("#userName").attr("lay-verify", "");
        }
    }

    //取消按钮
    $('#cancel').click(function () {
        window.location.href = Feng.ctxPath + "/system/notice";
    });

    textool.init({
        maxlength: 200,
        zIndex: 1
    });

    var userTags = inputTag.render({
        elem: '#userName',//定义输入框input对象
        data: []
    })

    /**
     * 指定用户选择
     */
    $("#userPicker").click(function () {
        var layIndex = admin.open({
            type: 2,
            title: '选择用户',
            shadeClose: true,
            area: ['75%', '90%'],
            offset: '30px',
            shade: 0.5,
            content: Feng.ctxPath + '/system/user/user_sel',
            data: {
                _data: userTags.getData()
            },
            end: function () {
                var userList = admin.getLayerData(layIndex, 'userList');
                if (Feng.isNotEmpty(userList)) {
                    var _tags = [];
                    var _userIds = "";
                    for (let i = 0; i < userList.length; i++) {
                        _tags.push({
                            text: userList[i].text,
                            value: userList[i].value
                        })
                        _userIds = _userIds + userList[i].value + ","
                    }
                    userTags.importTags(_tags);
                    $('#userIds').val(_userIds);
                }
            }
        });
    })

});