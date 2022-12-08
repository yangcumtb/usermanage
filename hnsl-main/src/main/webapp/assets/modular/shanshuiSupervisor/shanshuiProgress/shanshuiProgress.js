layui.use(['table', 'admin', 'HttpRequest','layer', 'func', 'upload'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var layer = layui.layer;
    var func = layui.func;
    var form = layui.form;
    var upload = layui.upload;
    let fileid1;
    let fileListView = $('#FileList');
    var files = '';
    var fileids = '' ;
    var fileidImg = '';
    var fileidPdf = '';
    /**
     * 管理
     */
    var ShanshuiProgress = {
        tableId: "shanshuiProgressTable",
        queryData: {}
    };
    var ShanshuiProgressInfoDlg = {
        data: {
            id: "",
            projectid: "",
            percent: "",
            createtime: "",
            createuser: "",
            associateid: "",
            fileids: ""
        }
    };
    var photoId = '';
    var actionType = '';
    var actionType1 = '';

    form.verify({
        numberH: function(value) {
            console.log(value)
            if (value.substr(value.length - 1, 1) != "%") {
                return '只能输入百分数，例如10%';
            }
        }
    });

    var ajax = new HttpRequest(Feng.ctxPath + "/shanshuiProgress/getXmmc", "get");
    var result = ajax.start();
    var ajax2 = new HttpRequest(Feng.ctxPath + '/shanshuiProgress/list', "get");
    var NearData = ajax2.start().data
    var L = ajax2.start().data.length;
    var ajax3 = new HttpRequest(Feng.ctxPath + "/shanshuiProgress/istoday", "get");
    var istoday = ajax3.start();
    console.log(istoday);
    if (NearData.length !== 0) {
        //var Time = NearData[L - 1].createtime.substring(0, 10);
        //console.log(Time)
        //var Today = new Date().toLocaleDateString().replaceAll('/', '-');
        //var todaytime = new Date();
        //var year = todaytime.getFullYear();
        //var month = (todaytime.getMonth() + 1).toString().padStart(2,'0');
        //var date = todaytime.getDate().toString().padStart(2,'0');
        //var Today = year + '-' + month + '-' + date;
        //console.log(Today);
        //if (Time == Today) {
        if (istoday) {
            $("#Finish").css("display", '');
            $("#Recall").click(function (data) {
                var ID = this.name;
                console.log(ID);
                var ajax = new HttpRequest(Feng.ctxPath + '/shanshuiProgress/recall', 'post', function (data) {
                    Feng.success("撤回成功!");
                    actionType = "";
                    actionType1 = "";
                }, function (data) {
                    Feng.error("撤回失败!" + data.message + "!");
                });
                ajax.set("fileId", ID);
                ajax.start();
                //window.open(Feng.ctxPath + "/shanshuiProgress/recall");
                window.location.reload()
            });
            $("#shanshuiProgressForm").css("display", 'none');
        } else {
            $("#Finish").css("display", 'none');
            $("#shanshuiProgressForm").css("display", '');
        }
    }
    $("#projectName").html(result.data.xmmc)
    //传方案文件
//传方案文件
    var uploadSchemeListIns = upload.render({
        elem: '#selectFile'                //绑定元素
        , url: Feng.ctxPath + '/shanshuiFile/uploadpdf'     //上传接口
        , elemList: $('#FileList')
        //*********************传输限制
        , size: 5120                  //传输大小
        , exts: 'pdf|jpg|jpeg|png'       //可传输文件的后缀
        , accept: 'file'
        //****************传输操作相关设置
        , data: {
            fileBusinessType: 6,
            fileBusinessName: "监理文件"
        }
        , auto: false      //自动上传,默认是打开
        , bindAction: '#uploadAction'
        //, multiple: true                             //多文件上传
        //, number: 1
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType: 6,
                fileBusinessName: "监理文件"
            }
            loadingIndex = layer.load(); //上传loading
        },
        choose: function (obj) {
            var that = this;
            files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            clearFile();
            //读取本地文件
            obj.preview(function (index, file, result) {
                files = obj.pushFile();
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>等待上传</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    //, '<button class="layui-btn layui-btn-xs demo-preview layui-hide">预览</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });
                //删除
                tr.find('.demo-delete').on('click', function (data) {
                    var operation = function () {
                        tr.remove();
                        delete files[index]; //删除对应的文件
                        console.log(index)
                        actionType1 = "";
                        uploadSchemeListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        var L = Object.keys(files).length;
                        if (L == 0 ) {
                            console.log("close")
                            $("#uploadAction").attr("disabled","disabled")
                        }
                    };
                    Feng.confirm(" 是否删除? ", operation);
                    actionType1 = "";
                    return false;
                });

                //预览
                tr.find('.demo-preview').on('click', function () {
                    var id = ShanshuiProgressInfoDlg.data.id;
                    if (id != null) {
                        window.open(window.location.origin + '/system/preview/file/' + id);
                    } else {
                        parent.layer.msg('请先上传文件', {time: 1000});
                    }
                    return false;
                });
                if (Object.keys(files).length != 0) {
                    console.log("open")
                    $("#uploadAction").attr("disabled",false)
                }
                that.elemList.append(tr);

            });
        }
        , done: function (res, index, upload) {
            clearFile();
            fileidPdf = res.data;
            //fileids = fileids + fileidPdf + ',';
            console.log(fileidPdf);
            actionType1 = 'add1';
            Feng.success("项目文件上传成功！");
            layer.close(loadingIndex);//loading关闭代码。
            delete this.files[index]
            var files = this.files;
            var tr = fileListView.find('tr#upload-' + index)
                , tds = tr.children();
            tr.siblings().remove()
            tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
            //tds.eq(3).html('<button class="layui-btn layui-btn-xs demo-preview " type="button">预览</button>'
            //    + ' <button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" type="button">删除</button>');
            tds.eq(3).html('<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" type="button">删除</button>');
            tr.find('.demo-delete').attr('name', res.data.fileId)
            tr.find('.demo-preview').attr('name', res.data.fileId)
            tds.find('.demo-delete').on('click', function (data) {
                var ID = this.name
                delete files[index]; //删除对应的文件
                console.log(index)
                uploadSchemeListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                var operation = function () {
                    var ajax = new HttpRequest(Feng.ctxPath + '/system/delete', 'post', function (data) {
                        Feng.success("删除成功!");
                        actionType1 = "";
                        tr.remove();
                    }, function (data) {
                        Feng.error("删除失败!" + data.message + "!");
                    });
                    ajax.set("fileId", ID);
                    ajax.start();
                };
                Feng.confirm(" 是否删除? ", operation);
                actionType1 = "";
                return false;
            });

            //预览
            tds.find('.demo-preview').on('click', function () {
                var Id = this.name;
                if (Id != null) {
                    window.open(window.location.origin + '/shanshuiFile/previewPdf/' + Id);
                } else {
                    parent.layer.msg('请先上传文件', {time: 1000});
                }
                return false;
            });
            if (!ShanshuiProgressInfoDlg.data.id) {
                ShanshuiProgressInfoDlg.data.id = res.data.fileId;
                ShanshuiProgressInfoDlg.data.fileids = res.data.fileId;
            } else {
                ShanshuiProgressInfoDlg.data.fileids = ShanshuiProgressInfoDlg.data.fileids + ";" + res.data.fileId;
            }
        },
        // allDone: function (obj) {
        //     //多文件上传完毕后的状态回调
        //     layer.close(loadingIndex);
        //     // parent.layer.closeAll();
        //     parent.layer.msg('上传成功', {time: 1000});
        //     // ajax.set(ShanshuiProgressInfoDlg.data);
        //     // ajax.start();
        // },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });
    function clearFile(){
        for(let x in files){
            delete files[x];
        }
    }
    // 渲染表格
    table.render({
        elem: '#' + ShanshuiProgress.tableId,
        url: Feng.ctxPath + '/shanshuiProgress/list',
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: [[
            {type: 'checkbox'},
            {field: 'id', hide: true, title: 'id'},
            {field: 'createtime', sort: true, title: '上传时间'},
            {field: 'percent', title: '百分比'},
            {
                field: 'associateid', title: '图片', templet:
                    function (d) {
                        return '<div class="checkPhoto" ><img src="' + Feng.ctxPath + "/shanshuiFile/previewImage/" + d.id + '"></div>'
                    }
            },
        ]],
    });
    setTimeout(function () {
        $(".checkPhoto").click(function (val) {
            var t = val.currentTarget.children[0]
            //页面层
            layer.open({
                type: 1,
                title: '查看图片',
                // skin: 'layui-layer-rim', //加上边框
                area: ['60%', '80%'], //宽高 t.width() t.height()
                shadeClose: true, //开启遮罩关闭
                end: function (index, layero) {
                    return false;
                },//content里面图片的长宽高
                content: '<div id="targetimg" style="text-align:center;margin-top: 30px"><img src="' + $(t).attr('src') + '" style="display:none"/></div>',
                success:function (layero, index) {
                    setTimeout (function(){
                        var div = document.querySelector("#targetimg");
                        var tarimg = div.querySelector("img");
                        var IMG = document.querySelector("img");
                        console.log(tarimg);//判断获取到是的是否是弹窗里的

                        let NewL = (IMG.width / IMG.height) * 300;
                        console.log(IMG);
                        console.log(NewL);
                        tarimg.style.width = NewL + "px";
                        tarimg.style.height = "300px";
                        tarimg.style.display = "inline";
                        tarimg.style.padding = "auto";
                    },500);
                }
            });
        })
    }, 500)


    //拖拽上传,限制大小为5m
    upload.render({
        elem: '#imgUpload'
        , url: Feng.ctxPath + '/shanshuiFile/uploadimage'
        , exts: 'jpg|jpeg|png'
        , size: 5120
        , done: function (res) {
            setTimeout(function () {
                photoId = res.data;
                actionType = 'add';
                layer.msg('图片上传成功');
                fileidImg = res.data;
                //fileids = fileids +res.data+ ',';
                layui.$('#uploadDemoView').removeClass('layui-hide').find('img').attr('src', Feng.ctxPath + "/shanshuiFile/thumbImage/" + res.data);
            },600)
        }
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        if (actionType === "add" && actionType1 === "add1") {
            var ajax = new HttpRequest(Feng.ctxPath + "/shanshuiProgress/add", 'post', function (data) {
                Feng.success("添加成功！");
                //传给上个页面，刷新table用
                // admin.putTempData('formOk', true);
                // //关掉对话框
                // admin.closeThisDialog();
                window.location.reload()
            }, function (data) {
                Feng.error("添加失败！" + data.message)
            });
            data.field.num = result.data.num;
            // data.field.associateid = photoId;
            fileids = fileidImg + ',' + fileidPdf;
            //console.log(fileids)
            data.field.fileids = fileids;
            console.log(data.field);
            ajax.set(data.field);
            ajax.start();
            return false;
        } else if(actionType === "" && actionType1 === "add1"){
            layer.msg('请上传图片', {time: 1000},)
            return false;
        } else if(actionType1 === "" && actionType === "add"){
            layer.msg('请上传pdf文件', {time: 1000},)
            return false;
        } else if(actionType === "" && actionType1 === ""){
            layer.msg('请上传文件', {time: 1000},)
            return false;
        }
    });
    //form.render();

});
