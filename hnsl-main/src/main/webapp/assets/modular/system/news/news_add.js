/**
 * 添加或者修改页面
 */
var SysNewsInfoDlg = {
    data: {
        newsId: "",
        newsTitle: "",
        newsType: "",
        newsThumb: "",
        newsSummary: "",
        mainFileId: "",
        attFileId: "",
        createTime: "",
        updateTime: "",
        createUser: "",
        updateUser: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest','laydate','upload','mutilImg', 'textool'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var mutilImg = layui.mutilImg;
    var textool = layui.textool;
    var upload = layui.upload;

    mutilImg.initialize();

    textool.init({
        maxlength: 200,
        zIndex: 1
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/system/news/add",'post', function (data) {
            Feng.success("添加成功！");
            window.location.href = Feng.ctxPath + '/system/news'
        }, function (data) {
            Feng.error("添加失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function(){
        window.location.href = Feng.ctxPath + '/system/news'
    });

    //选完文件后不自动上传
    upload.render({
        elem: '#fileName'
        ,accept: 'file'
        ,url: Feng.ctxPath + '/system/upload/file'
        ,choose: function(obj){
            obj.preview(function(index, file, result){
                $("#fileName").val(file.name);
            });
        }
        ,done: function(res){
            if(res.code == '200'){
                $("#mainFileId").val(res.data.fileId);
            }else{
                Feng.error("上传文件失败，请重新选择文件");
            }

        }
    });

});