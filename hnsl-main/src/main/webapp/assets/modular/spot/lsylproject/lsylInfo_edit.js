/**
 * 详情对话框
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

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'formSelects', 'upload', 'xmSelect','func'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var xmSelect = layui.xmSelect;
    var upload = layui.upload;
    var func = layui.func
    let fileid1;

    let fileListView = $('#FileList');

    // 渲染时间选择框
    laydate.render({
        elem: "#zlnd",
        min: '2021-01-01',
        max: '2025-12-31',
        type: 'year',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
//多选
    var Tbbh = xmSelect.render({
        el: '#tbbh',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        filterable: true,
        paging: true,
        pageSize: 5,
        remoteSearch: true,
        remoteMethod: function (val, cb) {
            //这里如果val为空, 则不触发搜索
            if (!val) {
                cb([])
            } else {
                var ajaxTB = new HttpRequest(Feng.ctxPath + "/lsylProject/tbbhlist?tbbh=" + val, "get");
                var result = ajaxTB.start()
                cb(result.data)
            }
        },
        data: []
    });
//文件清单回显
    var ajaxfile = new HttpRequest(Feng.ctxPath + "/system/config/detailbycode?code=HNSL_LSYLFILE_NAME", "get");
    var ajaxfiletyle = ajaxfile.start();
    $("#filetype").html(ajaxfiletyle.data.value)


    var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();


    //图斑编号回显
    if (result.data.tbbh != null) {
        var bha = [];
        var bh = result.data.tbbh.split(',');
        var L = bh.length;
        for (var i = 0; i < L; i++) {
            if (bh[i] != '') {
                var Obj = new Object();
                Obj.name = bh[i];
                Obj.value = bh[i];
                Obj.selected = "false";
                bha.push(Obj);
            }
        }
        Tbbh.update({
            data: bha
        })
        Tbbh.append(bh);
    }
    //文件表格回显
    if (result.data.fileids != null) {
        var FileIDs = result.data.fileids.split(',');
        var FileNAMEs = result.data.filenames.split(',');
        var FileSIZE = result.data.filesize.split(',');
        var FileTYPE = result.data.fileBusinessType.split(',');
        var L = FileIDs.length;
        for (var i = 0; i < L; i++) {
            if ( FileTYPE[i] != "10" ) {
                if (FileIDs[i] != '') {
                    var num = FileNAMEs[i].indexOf('.');
                    var Type = FileNAMEs[i].substr(num + 1);
                    console.log(Type)
                    var fileList = $(['<tr id="upload-' + [i] + '">'
                        , '<td>' + FileNAMEs[i] + '</td>'
                        , '<td>' + FileSIZE[i] + 'kb</td>'
                        , '<td>' + ' 项目文件 </td>'
                        , '<td><span style="color: #5FB878;">已上传</span></td>'
                        , '<td>'
                        , '<button class="layui-btn layui-btn-xs preview" type="button">预览</button>'
                        , '<button class="layui-btn layui-btn-xs layui-btn-danger delete" type="button">删除</button>'
                        , '</td>'
                        , '</tr>'].join(''));
                    var Pre = fileList.find('.preview')
                    Pre.attr('name', FileIDs[i])
                    Pre.addClass(Type)
                    var Del = fileList.find('.delete')
                    Del.attr('name', FileIDs[i])
                    $('#FileList').append(fileList);
                }
            }
        }
        $(".preview").on('click', function () {
            var ID = this.name;
            var Class = this.className
            if (Class.indexOf("pdf") !== -1) {
                window.open(window.location.origin + '/spotmanage/system/preview/file/' + ID);
            } else if (Class.indexOf("jpg") !== -1 || Class.indexOf("jpeg") !== -1) {
                    window.open(window.location.origin + '/spotmanage/system/previewImage/' + ID);
            }
            return false;
        })
        $(".delete").on('click', function () {
            var ID = this.name;
            var TD = $(this).parent();
            var TR = $(TD).parent();
            console.log(TR)
            var Delete = function () {
                var ajax = new HttpRequest(Feng.ctxPath + '/system/delete', 'post', function (data) {
                    Feng.success("删除成功!");
                    TR.remove();
                }, function (data) {
                    Feng.error("删除失败!" + data.message + "!");
                });
                ajax.set("fileId", ID);
                ajax.start();
            };
            Feng.confirm(" 是否删除? ", Delete);
            return false;
        })
    }
    //form表单填充
    form.val('lsylInfoTable', result.data);

    //查看清单鼠标经过事件及点击
    $("#clicktolist").hover(function () {
        $(this).css("color", "red")
    }, function () {
        $(this).css("color", "#0B74C9")
    })
    $("#clicktolist").click(function () {
        func.open({
            title: '文件清单修改',
            content: Feng.ctxPath + '/lsylProject/filelist',
            width: "900rem",
            height: "650"
        });
    })

    //根据回显数据展示所需字段
    if (result.data.xflx == '生态修复' || result.data.xflx == '辅助再生') {
        $('#Province').css('display', '');
    } else {
        $('#Province').css('display', 'none');
    }

    //监听xflx
    form.on('select(xflx)', function (data) {
        if (data.value == '生态修复' || data.value == '辅助再生') {
            $('#Province').css('display', '');
        } else {
            $('#Province').css('display', 'none');
        }
    })

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
            fileBusinessType: 9,
            fileBusinessName: "历史遗留项目立项文件"
        }
        , auto: false      //自动上传,默认是打开
        , bindAction: '#uploadAction'
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType: 9,
                fileBusinessName: "历史遗留项目立项文件"
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
            tr.find('.demo-delete').attr('name',res.data.fileId)
            tr.find('.demo-preview').attr('name',res.data.fileId)
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

    //表单提交事件
    form.on('submit(submit)', function (data) {
        if (result.data.fyjd == "2") {
            data.field.fyjd = 0;
        }
        data.field.tbbh = Tbbh.getValue('nameStr');
        // data.field.includingfiles = Includingfiles.getValue('nameStr');
        if (SpottableHistoricalmineInfoDlg.data.fileids != null || SpottableHistoricalmineInfoDlg.data.fileids != '') {
            data.field.fileids = SpottableHistoricalmineInfoDlg.data.fileids;
        }
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
    });

});