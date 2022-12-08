/**
 * 复议对话框
 */
var SpottableHistoricalmineInfoDlg = {
    data: {
        fileids: '',
        dq: '',
        xmmc: '',
        kfy: '',
        kfx: '',
        zlnd: '',
        xflx: '',
        yszzj: '',
        sbzj: '',
        mj: '',
        bz: '',
        tbbh: '',
        id: '',
        filename: '',
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'formSelects', 'upload', 'xmSelect'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var xmSelect = layui.xmSelect;
    var upload = layui.upload;
    let fileid1;

    let fileListView = $('#FileList');
    //获取用户等级
    var ajaxUser = new HttpRequest(Feng.ctxPath + "/map/loginDetail/", "get");
    var Dis = ajaxUser.start();
    var userlevel = Dis.data.userLevel;
    //获取数据信息
    var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    var fyjd = result.data.fyjd;
    if (userlevel == "省级") {
        if (fyjd == "0") {
            var index=parent.layer.getFrameIndex(window.name); //获取当前窗口的name
            parent.layer.close(index);//关闭窗口
            parent.layer.msg('没有复议申请', {icon: 4});
        } else if (fyjd == "1") {
            $("#selectFile").css("display", "none")
            $("#uploadAction").css("display", "none")
            $("#cityL").css("display", "none")
            $("#provinceL").css("display", "")
            $("#fytitle").css("display", "")
            $("#fybh").css("display", "")
        } else if ( fyjd == "2" || fyjd == "3") {
            console.log("close")
            var index=parent.layer.getFrameIndex(window.name); //获取当前窗口的name
            parent.layer.close(index);//关闭窗口
            parent.layer.msg('该申请已处理', {icon: 4});
        }
    } else {
        console.log(userlevel)
        if (fyjd == "1") {
            var index=parent.layer.getFrameIndex(window.name); //获取当前窗口的name
            parent.layer.close(index);//关闭窗口
            parent.layer.msg('复议申请中', {icon: 4});
        } else if (fyjd == "3") {
            console.log(userlevel)
            $("#selectFile").css("display", "")
            $("#uploadAction").css("display", "")
            $("#cityL").css("display", "none")
            $("#provinceL").css("display", "none")
            $("#cityL2").css("display", "")
            $("#fytitle").css("display", "")
            $("#fybh").css("display", "")
            $("#fybhyj").attr("disabled", "disabled")
        }
    }
    //文件表格回显
    if (result.data.fileids != null) {
        var FileIDs = result.data.fileids.split(',');
        var FileNAMEs = result.data.filenames.split(',');
        var FileSIZE = result.data.filesize.split(',');
        var FileTYPE = result.data.fileBusinessType.split(',');
        var L = FileIDs.length;
        for (var i = 0; i < L; i++) {
            if (FileTYPE[i] == "10") {
                var num = FileNAMEs[i].indexOf('.');
                var Type = FileNAMEs[i].substr(num + 1);
                console.log(Type)
                var fileList = $(['<tr id="upload-' + [i] + '">'
                    , '<td>' + FileNAMEs[i] + '</td>'
                    , '<td>' + FileSIZE[i] + 'kb</td>'
                    , '<td>' + ' 项目文件 </td>'
                    , '<td><span style="color: #5FB878;">已上传</span></td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-preview" type="button">预览</button>'
                    , '</td>'
                    , '</tr>'].join(''));
                var Pre = fileList.find('.demo-preview')
                Pre.attr('name', FileIDs[i])
                Pre.addClass(Type)
                $('#FileList').append(fileList);
            }
        }
        $(".demo-preview").on('click', function () {
            var ID = this.name;
            var Class = this.className
            if (Class.indexOf("pdf") !== -1) {
                window.open(window.location.origin + '/spotmanage/system/preview/file/' + ID);
            } else if (Class.indexOf("jpg") !== -1 || Class.indexOf("jpeg") !== -1) {
                window.open(window.location.origin + '/spotmanage/system/previewImage/' + ID);
            }
            return false;
        })
    }
    form.val('lsylInfoTable', result.data);

    //上传方案文件
    var uploadSchemeListIns = upload.render({
        elem: '#selectFile'                //绑定元素
        , url: Feng.ctxPath + '/spot/schemaReviewFilesUpload'     //上传接口
        , elemList: $('#FileList')
        //*********************传输限制
        // , size: 2048                   //传输大小
        , exts: 'pdf|jpg|jpeg'        //可传输文件的后缀
        , accept: 'file'
        //****************传输操作相关设置
        , data: {
            fileBusinessType: 10,
            fileBusinessName: "历史遗留复议文件"
        }
        , auto: false      //自动上传,默认是打开
        , bindAction: '#uploadAction'
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType: 10,
                fileBusinessName: "历史遗留复议文件"
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
                    , '<td>' + ' 项目文件 </td>'
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
                //删除
                $('.demo-delete').on('click', function (data) {
                    var operation = function () {
                        delete files[index]; //删除对应的文件
                        tr.remove();
                        uploadSchemeListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                    };
                    Feng.confirm(" 是否删除? ", operation);
                    return false;
                });
                //预览
                $('.demo-preview').on('click', function () {
                    var Id = this.name;
                    if (Id != null) {
                        window.open(window.location.origin + '/spotmanage/system/preview/file/' + Id);
                    } else {
                        parent.layer.msg('请先上传文件', {time: 1000});
                    }
                    return false;
                });

                that.elemList.append(tr);

            });
        }
        , done: function (res, index, upload) {
            console.log(res)
            Feng.success("项目文件上传成功！");
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
                    var ajax = new HttpRequest(Feng.ctxPath + '/system/delete', 'post', function (data) {
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
                } else if (Class.indexOf("jpg") !== -1 || Class.indexOf("jpeg") !== -1) {
                    if (Id != null) {
                        window.open(window.location.origin + '/spotmanage/system/previewImageFromInterim/' + Id);
                    } else {
                        parent.layer.msg('请先上传文件', {time: 1000});
                    }
                }
                return false;
            });
            if (!SpottableHistoricalmineInfoDlg.data.id) {
                SpottableHistoricalmineInfoDlg.data.id = res.data.fileId;
                SpottableHistoricalmineInfoDlg.data.fileids = res.data.fileId;
            } else {
                SpottableHistoricalmineInfoDlg.data.fileids = SpottableHistoricalmineInfoDlg.data.fileids + "," + res.data.fileId;
            }
        },
        allDone: function (obj) {
            //多文件上传完毕后的状态回调
            layer.close(loadingIndex);
            // parent.layer.closeAll();
            parent.layer.msg('上传成功', {time: 1000});
            if (!SpottableHistoricalmineInfoDlg.actionType) {
                SpottableHistoricalmineInfoDlg.actionType = "add";
            }
            fileid1 = SpottableHistoricalmineInfoDlg.data.id;
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });
//省级同意复议按钮事件
    form.on('submit(agree)', function (data) {
        data.field.id = result.data.associateId;
        data.field.fyjd = "2";
        var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/edit", 'post', function (data) {
            Feng.success("通过复议！");
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
//省级拒绝复议按钮事件
    form.on('submit(refuse)', function (data) {
        data.field.id = result.data.associateId;
        data.field.fyjd = "3";
        var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/edit", 'post', function (data) {
            Feng.success("驳回复议！");
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
//市县认可复议按钮事件
    form.on('submit(cityagree)', function (data) {
        data.field.id = result.data.associateId;
        var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/cancelFyjd", 'post', function (data) {
            Feng.success("认可复议结果！");
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
    //市县复议提交事件
    form.on('submit(submit)', function (data) {
        data.field.id = result.data.associateId;
        data.field.fyjd = "1";
        if (SpottableHistoricalmineInfoDlg.data.fileids != null || SpottableHistoricalmineInfoDlg.data.fileids != '') {
            data.field.fileids = SpottableHistoricalmineInfoDlg.data.fileids;
        }
        if (SpottableHistoricalmineInfoDlg.actionType === "add") {
            var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/edit", 'post', function (data) {
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
        } else {
            if ( fyjd == 0) {
                layer.msg('请上传文件', {time: 1000},)
                return false;
            } else {
                layer.msg('请上传新的复议文件', {time: 1000},)
                return false;
            }
        }
    });

});