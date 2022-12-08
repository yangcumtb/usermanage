/**
 * 详情对话框
 */
var ExamineOperationInfoDlg = {
    data: {
        xmmc: "",
        xtj: "",
        sys: "",
        sjys: "",
        pdfsc: "",
        sbyy: "",
        zjyjsc: "",
        yjsbyy: "",
        bhyj: "",
        yshgz: "",
        hgzsbyy: "",
        zjyjup: "",
        zjyjsbyy: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layer = layui.layer;
    var upload = layui.upload;
    var layarea = layui.layarea;
    var element = layui.element;
    let fileid1;

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/project/examine/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    console.log(Feng.getUrlParam("id"));
    form.val('examineOperationForm', result.data);

    //上传文件
    var uploadSchemeListIns = upload.render({
        elem: '#projectPDFBtn'                //绑定元素
        , url: Feng.ctxPath + '/spot/schemaReviewFilesUpload'     //上传接口
        , elemList: $('#FileList')
        //*********************传输限制
        , size: 2048                   //传输大小
        , exts: 'pdf'        //可传输文件的后缀
        , accept: 'file'
        //****************传输操作相关设置
        , auto: true                                 //自动上传,默认是打开的
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType:"",
                fileBusinessName: ""
            };
            loadingIndex = layer.load(); //上传loading
            element.render();
        },
        choose: function (obj) {
            var that = this;
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result,res) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-xs demo-preview">预览</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });
                //预览
                tr.find('.demo-preview').on('click', function () {
                    var Id = ExamineOperationInfoDlg.data.id;
                    if (Id) {
                        window.open(window.location.origin + '/system/preview/file/' + Id);
                    }
                });
                that.elemList.append(tr);
            });
        }
        , done: function (res) {
            Feng.success("项目文件上传成功！");
            document.getElementById("pdfsc").value = 1;
            if (!ExamineOperationInfoDlg.data.id) {
                ExamineOperationInfoDlg.data.id = res.data.fileId;
                ExamineOperationInfoDlg.data.fileids = res.data.fileId;
            } else {
                ExamineOperationInfoDlg.data.fileids = ExamineOperationInfoDlg.data.fileids + "," + res.data.fileId;
            }
        },
        allDone: function (obj) {
            //多文件上传完毕后的状态回调
            layer.close(loadingIndex);
            document.getElementById("pdfsc").value = 1;
            parent.layer.msg('上传成功', {time: 1000});
            if (!ExamineOperationInfoDlg.actionType) {
                ExamineOperationInfoDlg.actionType = "add";
            }
            var ajax = new HttpRequest(Feng.ctxPath + "/project/examine/" + ExamineOperationInfoDlg.actionType, 'post', function (data) {
                ExamineOperationInfoDlg.actionType = "edit";
            }, function (data) {

            });
            fileid1 = ExamineOperationInfoDlg.data.id;
            console.log(fileid1)
            ajax.set(ExamineOperationInfoDlg.data);
            ajax.start();
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });
    var uploadSchemeListIns = upload.render({
        elem: '#firstAdPDFBtn'                //绑定元素
        , url: Feng.ctxPath + '/spot/schemaReviewFilesUpload'     //上传接口
        , elemList: $('#FileList')
        //*********************传输限制
        , size: 2048                   //传输大小
        , exts: 'pdf'        //可传输文件的后缀
        , accept: 'file'
        //****************传输操作相关设置
        , auto: true                                 //自动上传,默认是打开的
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType:"",
                fileBusinessName: ""
            };
            loadingIndex = layer.load(); //上传loading
            element.render();
        },
        choose: function (obj) {
            var that = this;
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result,res) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-xs demo-preview">预览</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });
                //预览
                tr.find('.demo-preview').on('click', function () {
                    var Id = ExamineOperationInfoDlg.data.id;
                    if (Id) {
                        window.open(window.location.origin + '/system/preview/file/' + Id);
                    }
                });
                that.elemList.append(tr);
            });
        }
        , done: function (res) {
            Feng.success("项目文件上传成功！");
            document.getElementById("yshgz").value = 1;
            if (!ExamineOperationInfoDlg.data.id) {
                ExamineOperationInfoDlg.data.id = res.data.fileId;
                ExamineOperationInfoDlg.data.fileids = res.data.fileId;
            } else {
                ExamineOperationInfoDlg.data.fileids = ExamineOperationInfoDlg.data.fileids + "," + res.data.fileId;
            }
        },
        allDone: function (obj) {
            //多文件上传完毕后的状态回调
            layer.close(loadingIndex);
            parent.layer.msg('上传成功', {time: 1000});
            document.getElementById("yshgz").value = 1;
            if (!ExamineOperationInfoDlg.actionType) {
                ExamineOperationInfoDlg.actionType = "add";
            }
            var ajax = new HttpRequest(Feng.ctxPath + "/project/examine/" + ExamineOperationInfoDlg.actionType, 'post', function (data) {
                ExamineOperationInfoDlg.actionType = "edit";
            }, function (data) {

            });
            fileid1 = ExamineOperationInfoDlg.data.id;
            console.log(fileid1)
            ajax.set(ExamineOperationInfoDlg.data);
            ajax.start();
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });
    var uploadSchemeListIns = upload.render({
        elem: '#secondPDFBtn'                //绑定元素
        , url: Feng.ctxPath + '/spot/schemaReviewFilesUpload'     //上传接口
        , elemList: $('#FileList')
        //*********************传输限制
        , size: 2048                   //传输大小
        , exts: 'pdf'        //可传输文件的后缀
        , accept: 'file'
        //****************传输操作相关设置
        , auto: true                                 //自动上传,默认是打开的
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType:"",
                fileBusinessName: ""
            };
            loadingIndex = layer.load(); //上传loading
            element.render();
        },
        choose: function (obj) {
            var that = this;
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result,res) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-xs demo-preview">预览</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });
                //预览
                tr.find('.demo-preview').on('click', function () {
                    var Id = ExamineOperationInfoDlg.data.id;
                    if (Id) {
                        window.open(window.location.origin + '/system/preview/file/' + Id);
                    }
                });
                that.elemList.append(tr);
            });
        }
        , done: function (res) {
            Feng.success("项目文件上传成功！");
            document.getElementById("zjyjup").value = 1;
            if (!ExamineOperationInfoDlg.data.id) {
                ExamineOperationInfoDlg.data.id = res.data.fileId;
                ExamineOperationInfoDlg.data.fileids = res.data.fileId;
            } else {
                ExamineOperationInfoDlg.data.fileids = ExamineOperationInfoDlg.data.fileids + "," + res.data.fileId;
            }
        },
        allDone: function (obj) {
            //多文件上传完毕后的状态回调
            layer.close(loadingIndex);
            parent.layer.msg('上传成功', {time: 1000});
            document.getElementById("zjyjup").value = 1;
            if (!ExamineOperationInfoDlg.actionType) {
                ExamineOperationInfoDlg.actionType = "add";
            }
            var ajax = new HttpRequest(Feng.ctxPath + "/project/examine/" + ExamineOperationInfoDlg.actionType, 'post', function (data) {
                ExamineOperationInfoDlg.actionType = "edit";
            }, function (data) {

            });
            fileid1 = ExamineOperationInfoDlg.data.id;
            console.log(fileid1)
            ajax.set(ExamineOperationInfoDlg.data);
            ajax.start();
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });
    function formReset() {
        document.getElementById("finalCheckJsxmCopy1Form").reset();
    }

    form.on('submit(btnSubmit)', function (data) {
        if(ExamineOperationInfoDlg.actionType==="edit"){
            var ajax = new HttpRequest(Feng.ctxPath + "/project/examine/" + ExamineOperationInfoDlg.actionType, 'post', function (data) {
                // Feng.success("添加成功！");
                //传给上个页面，刷新table用
                // layer.msg('添加成功', {time: 1000},)
                Feng.success("添加成功！");
                admin.putTempData('formOk', true);
                //关掉对话框
                admin.closeThisDialog();
                window.location.reload( );
                // formReset();
            }, function (data) {
                Feng.error("添加失败！" + data.message)
                // layer.msg('添加失败', {time: 1000});
                // formReset();
            });
            data.field.id = ExamineOperationInfoDlg.data.id;
            ajax.set(data.field);
            ajax.start();

            return false;
        }else{
            layer.msg('请上传文件', {time: 1000});
            return false;
        }

    });
    // //表单提交事件
    // form.on('submit(btnSubmit)', function (data) {
    //     var ajax = new HttpRequest(Feng.ctxPath + "/project/examine/exam", 'post', function (data) {
    //         Feng.success("更新成功！");
    //         //传给上个页面，刷新table用
    //         admin.putTempData('formOk', true);
    //         //关掉对话框
    //         admin.closeThisDialog();
    //     }, function (data) {
    //         Feng.error("更新失败！" + data.message)
    //     });
    //     ajax.set(data.field);
    //     ajax.start();
    //
    //     return false;
    // });

});