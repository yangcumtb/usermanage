layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects', 'layarea', 'xmSelect', 'upload', 'func'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layarea = layui.layarea;
    var xmSelect = layui.xmSelect;
    var upload = layui.upload;
    var func = layui.func;
    let fileid1;
    let fileListView = $('#FileList');
    let associateid = Feng.getUrlParam("id")
    //上传方案文件
    var uploadSchemeListIns = upload.render({
        elem: '#selectFile'                //绑定元素
        , url: Feng.ctxPath + '/rsspot/uploadfile'     //上传接口
        , elemList: $('#FileList')
        //*********************传输限制
        // , size: 2048                   //传输大小
        , exts: 'pdf|jpg|jpeg|doc|docx|xls|xlsx|xlsm|xlt|xltx|xltm|png'        //可传输文件的后缀
        , accept: 'file'
        //****************传输操作相关设置
        , data: {
            id: associateid
        }
        , auto: false      //自动上传,默认是打开
        , bindAction: '#uploadAction'
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                id: associateid
            }
            loadingIndex = layer.load(); //上传loading
        },
        choose: function (obj) {
            var that = this;
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>' + ' 佐证材料 </td>'
                    , '<td>等待上传</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide" type="button">重传</button>'
                    , '<button class="layui-btn layui-btn-xs demo-preview layui-hide" type="button">预览</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" type="button">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });
                that.elemList.append(tr);
                //删除
                tr.find('.demo-delete').on('click', function (data) {
                    console.log("delete")
                    var operation = function () {
                        tr.remove();
                        delete files[index]; //删除对应的文件
                        console.log(index)
                        uploadSchemeListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        var L = Object.keys(files).length;
                        if (L == 0) {
                            console.log("close")
                            $("#uploadAction").attr("disabled", "disabled")
                        }
                    };
                    Feng.confirm(" 是否删除? ", operation);
                    return false;
                });
                //预览
                tr.find('.demo-preview').on('click', function () {
                    var Id = this.name;
                    if (Id != null) {
                        window.open(window.location.origin + '/spotmanage/system/preview/file/' + Id);
                    } else {
                        parent.layer.msg('请先上传文件', {time: 1000});
                    }
                    return false;
                });

            });
            if (Object.keys(files).length != 0) {
                console.log("open")
                $("#uploadAction").attr("disabled", false)
            }
        }
        , done: function (res, index, upload) {
            Feng.success("佐证材料上传成功！");
            delete this.files[index]
            var files = this.files;
            var tr = fileListView.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
            tds.eq(4).html('<button class="layui-btn layui-btn-xs demo-preview " type="button">预览</button>'
                + ' <button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" type="button">删除</button>');
            tr.find('.demo-delete').attr('name', res.data.fileId)
            tr.find('.demo-preview').attr('name', res.data.fileId)
            tr.find('.demo-preview').addClass(res.data.fileSuffix)

            //删除
            tds.find('.demo-delete').on('click', function (data) {
                var ID = this.name
                delete files[index]; //删除对应的文件
                console.log(index)
                uploadSchemeListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                var operation = function () {
                    var ajax = new HttpRequest(Feng.ctxPath + '/system/deleteInterim', 'post', function (data) {
                        Feng.success("删除成功!");
                        tr.remove();
                    }, function (data) {
                        Feng.error("删除失败!" + data.message + "!");
                    });
                    ajax.set("fileId", ID);
                    ajax.start();
                };
                Feng.confirm(" 是否删除? ", operation);
                return false;
            });

            //预览
            tds.find('.demo-preview').on('click', function () {
                var Id = this.name;
                var Class = this.className
                if (Class.indexOf("pdf") !== -1) {
                    if (Id != null) {
                        window.open(window.location.origin + '/spotmanage/system/preview/file/' + Id);
                    } else {
                        parent.layer.msg('请先上传文件', {time: 1000});
                    }
                } else if (Class.indexOf("jpg") !== -1 || Class.indexOf("jpeg") !== -1 || Class.indexOf("png") !== -1) {
                    if (Id != null) {
                        window.open(window.location.origin + '/spotmanage/system/previewImageFromInterim/' + Id);
                    } else {
                        parent.layer.msg('请先上传文件', {time: 1000});
                    }
                }
                return false;
            });

        },
        allDone: function (obj) {
            //多文件上传完毕后的状态回调
            layer.close(loadingIndex);
            // parent.layer.closeAll();
            parent.layer.msg('上传成功', {time: 1000});
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });
})