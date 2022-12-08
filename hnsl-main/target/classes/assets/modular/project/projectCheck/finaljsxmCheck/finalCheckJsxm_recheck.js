/**
 * 详情对话框
 */
var FinalCheckJsxmCopy1InfoDlg = {
    data: {
        id: "",
        xmmc: "",
        jsdw: "",
        dwdz: "",
        shi: "",
        xian: "",
        wz: "",
        xmmj: "",
        kfx: "",
        kfy: "",
        ywr: "",
        bzdw: "",
        bzdwdz: "",
        frdb: "",
        fkjf: "",
        sxsj: "",
        dqsj: "",
        fwnx: "",
        zgbm: "",
        psjd: "",
        psbhjd: "",
        pssjXs: "",
        pssjXf: "",
        pssjC: "",
        pssjS: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'layarea', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layarea = layui.layarea;
    var upload = layui.upload;
    var element = layui.element;
    let fileid1;
    var fileBusinessType = 1;
    var fileBusinessName = "评审方案文件";
    // 渲染时间选择框
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    })

    var today = (new Date()).toLocaleDateString();
    laydate.render({
        elem: "#SXSJ",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });

    laydate.render({
        elem: "#DQSJ",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#pssjXs",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#pssjXf",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#pssjC",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#pssjS",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
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
        , data: {
            fileBusinessType: fileBusinessType,
            fileBusinessName: fileBusinessName
        }
        , auto: true                                 //自动上传,默认是打开的
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType:fileBusinessType,
                fileBusinessName: fileBusinessName
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
                    , '<td>' + fileBusinessName + '</td>'
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

                //删除
                tr.find('.demo-delete').on('click', function () {
                    // delete files[index]; //删除对应的文件
                    // tr.remove();
                    // uploadSchemeListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                    var operation = function () {
                        var ajax = new HttpRequest(Feng.ctxPath + '/system/delete', 'post', function (data) {
                            Feng.success("删除成功!");
                            tr.remove();
                        }, function (data) {
                            Feng.error("删除失败!" + data.message + "!");
                        });
                        ajax.set("fileId", fileid1);
                        ajax.start();
                    };
                    Feng.confirm(" 是否删除? ", operation);
                    return false;
                });
                //预览
                tr.find('.demo-preview').on('click', function () {
                    var Id = FinalCheckJsxmCopy1InfoDlg.data.id;
                    if (Id) {
                        window.open(window.location.origin + '/system/preview/file/' + Id);
                    }
                });

                that.elemList.append(tr);
            });
        }
        , done: function (res) {
            Feng.success("项目文件上传成功！");
            if (!FinalCheckJsxmCopy1InfoDlg.data.id) {
                FinalCheckJsxmCopy1InfoDlg.data.id = res.data.fileId;
                FinalCheckJsxmCopy1InfoDlg.data.fileids = res.data.fileId;
            } else {
                FinalCheckJsxmCopy1InfoDlg.data.fileids = FinalCheckJsxmCopy1InfoDlg.data.fileids + "," + res.data.fileId;
            }
        },
        allDone: function (obj) {
            //多文件上传完毕后的状态回调
            layer.close(loadingIndex);
            parent.layer.msg('上传成功', {time: 1000});
            if (!FinalCheckJsxmCopy1InfoDlg.actionType) {
                FinalCheckJsxmCopy1InfoDlg.actionType = "edit";
            }
            fileid1 = FinalCheckJsxmCopy1InfoDlg.data.id;
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });
    var uploadSchemeListInss = upload.render({
        elem: '#firstAdPDFBtn'                //绑定元素
        , url: Feng.ctxPath + '/spot/schemaReviewFilesUpload'     //上传接口
        , elemList: $('#FileList')
        //*********************传输限制
        , size: 2048                   //传输大小
        , exts: 'pdf'        //可传输文件的后缀
        , accept: 'file'
        //****************传输操作相关设置
        , data: {
            fileBusinessType: fileBusinessType,
            fileBusinessName: fileBusinessName
        }
        , auto: true                                 //自动上传,默认是打开的
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType:fileBusinessType,
                fileBusinessName: fileBusinessName
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
                    , '<td>' + fileBusinessName + '</td>'
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

                //删除
                tr.find('.demo-delete').on('click', function () {
                    // delete files[index]; //删除对应的文件
                    // tr.remove();
                    // uploadSchemeListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                    var operation = function () {
                        var ajax = new HttpRequest(Feng.ctxPath + '/system/delete', 'post', function (data) {
                            Feng.success("删除成功!");
                            tr.remove();
                        }, function (data) {
                            Feng.error("删除失败!" + data.message + "!");
                        });
                        ajax.set("fileId", fileid1);
                        ajax.start();
                    };
                    Feng.confirm(" 是否删除? ", operation);
                    return false;
                });
                //预览
                tr.find('.demo-preview').on('click', function () {
                    var Id = FinalCheckJsxmCopy1InfoDlg.data.id;
                    if (Id) {
                        window.open(window.location.origin + '/system/preview/file/' + Id);
                    }
                });

                that.elemList.append(tr);
            });
        }
        , done: function (res) {
            Feng.success("项目文件上传成功！");
            if (!FinalCheckJsxmCopy1InfoDlg.data.id) {
                FinalCheckJsxmCopy1InfoDlg.data.id = res.data.fileId;
                FinalCheckJsxmCopy1InfoDlg.data.fileids = res.data.fileId;
            } else {
                FinalCheckJsxmCopy1InfoDlg.data.fileids = FinalCheckJsxmCopy1InfoDlg.data.fileids + "," + res.data.fileId;
            }
        },
        allDone: function (obj) {
            //多文件上传完毕后的状态回调
            layer.close(loadingIndex);
            parent.layer.msg('上传成功', {time: 1000});
            fileid1 = FinalCheckJsxmCopy1InfoDlg.data.id;
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    if (result.data.pssjC != null) {
        result.data.pssjC = result.data.pssjC.substr(0, 10);
    }
    if (result.data.pssjS != null) {
        result.data.pssjS = result.data.pssjS.substr(0, 10);
    }
    if (result.data.pssjXf != null) {
        result.data.pssjXf = result.data.pssjXf.substr(0, 10);
    }
    if (result.data.pssjXs != null) {
        result.data.pssjXs = result.data.pssjXs.substr(0, 10);
    }
    form.val('finalCheckJsxmCopy1Form', result.data);
    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/re_check", 'post', function (data) {
            if (data.success == true) {
                Feng.success("更新成功！");
                //传给上个页面，刷新table用
                admin.putTempData('formOk', true);
                //关掉对话框
                admin.closeThisDialog();
            } else {
                Feng.error("更新失败！" + data.message)
            }
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        data.field.fileids = fileid1;
        ajax.set(data.field);
        ajax.start();

        return false;
    });

});