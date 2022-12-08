/**
 * 详情对话框
 */
var TwoInOneSolutionInfoDlg = {
    data: {
        id: "",
        kyqr: "",
        frdb: "",
        bzdw: "",
        badwdh: "",
        xzs: "",
        xzx: "",
        kqwz: "",
        ckzh: "",
        kqnx: "",
        kqq: "",
        kqz: "",
        kqmj: "",
        geoJsonBorder: "",
        zkz: "",
        qtkz: "",
        kcfs: "",
        synx: "",
        sjscnl: "",
        scnl: "",
        kscl: "",
        wsmj: "",
        yzmj: "",
        jzzd: "",
        lszd: "",
        phmj: "",
        stshmj: "",
        xzshmj: "",
        ycshmj: "",
        stxfmj: "",
        fatz: "",
        bzcs: "",
        sxsj: "",
        dqsj: "",
        fwnx: "",
        bzlx: "",
        yssj: "",
        ysdw: "",
        ysjl: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects', 'layarea'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layarea = layui.layarea;
    var laydate = layui.laydate;
    var element = layui.element;
    var upload = layui.upload;
    let fileid1;
    let associateId;

    let fileListView = $('#FileList');
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    })
    var today = (new Date()).toLocaleDateString();
    laydate.render({
        elem: "#kqq",
        max: '2080-10-14',
        type: 'year',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#kqz",
        max: '2080-10-14',
        type: 'year',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#sxsj",
        min: today,
        max: '2080-10-14',
        type: 'date',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#dqsj",
        min: today,
        max: '2080-10-14',
        type: 'date',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#yssj",
        min: today,
        max: '2080-10-14',
        type: 'date',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    var Span = document.getElementsByTagName("span");
    //获取详情信息，填充表单
    var param = window.location.href;
    var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/twoInOneSolution/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    if (result.data.kqq != null) {
        result.data.kqq = result.data.kqq.substring(0, 4)
    }
    if (result.data.kqz != null) {
        result.data.kqz = result.data.kqz.substring(0, 4)
    }
    if (result.data.kscl != null) {
        if (result.data.kscl.search("万") != -1) {
            var posion = result.data.kscl.indexOf("万");
            var last = result.data.kscl.length;
            var Kcldw = result.data.kscl.substring(posion,last);
            result.data.kscl = result.data.kscl.substring(0, posion);
            console.log(Kcldw)
            $("#kcldw").val(Kcldw)
        }
    }
    form.val('twoInOneSolutionForm', result.data);
    //回显
    if (result.data.fazt == 2) {
        $("#m").css("display", "none");
        $("#b").css("display", "none");
        $('#qymc').attr("lay-verify", "");
        $('#ckzh').attr("lay-verify", "");
        $('#kqwz').attr("lay-verify", "");
        $('#badwdh').attr("lay-verify", "");
        $('#xzs').attr("lay-verify", "");
        $('#xzx').attr("lay-verify", "");
        $('#frdb').attr("lay-verify", "");
        $('#bzdw').attr("lay-verify", "");
        $('#kqnx').attr("lay-verify", "");
        $('#kqq').attr("lay-verify", "");
        $('#kqz').attr("lay-verify", "");
        $('#zkz').attr("lay-verify", "");
        $('#qtkz').attr("lay-verify", "");
        $('#kcfs').attr("lay-verify", "");
        $('#synx').attr("lay-verify", "");
        $('#scnldw').attr("lay-verify", "");
        $('#sjscnl').attr("lay-verify", "");
        $('#scnl').attr("lay-verify", "");
        $('#kscl').attr("lay-verify", "");
        $('#fatz').attr("lay-verify", "");
        $('#bzcs').attr("lay-verify", "");
        $('#sxsj').attr("lay-verify", "");
        $('#dqsj').attr("lay-verify", "");
        $('#bzlx').attr("lay-verify", "");
        $('#fwnx').attr("lay-verify", "");
        for (i = 0; i < Span.length; i++) {
            Span[i].style.display = "none";
        }
    } else {
        $("#m").css("display", "");
        $("#b").css("display", "");
        $('#qymc').attr("lay-verify", "required");
        $('#ckzh').attr("lay-verify", "required");
        $('#kqwz').attr("lay-verify", "required");
        $('#badwdh').attr("lay-verify", "required");
        $('#xzs').attr("lay-verify", "required");
        $('#xzx').attr("lay-verify", "required");
        $('#frdb').attr("lay-verify", "required");
        $('#bzdw').attr("lay-verify", "required");
        $('#kqnx').attr("lay-verify", "required");
        $('#kqq').attr("lay-verify", "required");
        $('#kqz').attr("lay-verify", "required");
        $('#zkz').attr("lay-verify", "required");
        $('#qtkz').attr("lay-verify", "required");
        $('#kcfs').attr("lay-verify", "required");
        $('#synx').attr("lay-verify", "required");
        $('#scnldw').attr("lay-verify", "required");
        $('#sjscnl').attr("lay-verify", "required");
        $('#scnl').attr("lay-verify", "required");
        $('#kscl').attr("lay-verify", "required");
        $('#fatz').attr("lay-verify", "required");
        $('#bzcs').attr("lay-verify", "required");
        $('#sxsj').attr("lay-verify", "required");
        $('#dqsj').attr("lay-verify", "required");
        $('#bzlx').attr("lay-verify", "required");
        for (i = 0; i < Span.length; i++) {
            Span[i].style.display = "";
        }
    }
    if (result.data.scnldw == '万吨/年') {
        $(".DW").html('万吨/年')
        $(".sjs").css('width','90rem')
        $(".DW").css("display", "");
    } if (result.data.scnldw == '万立方米/年') {
        $(".DW").html('万立方米/年')
        $(".sjs").css('width','105rem')
        $(".DW").css("display", "");
    }

    form.on('select(fazt)', function (data) {
        if (data.value == 2) {
            $("#m").css("display", "none");
            $("#b").css("display", "none");
            $('#qymc').attr("lay-verify", "");
            $('#ckzh').attr("lay-verify", "");
            $('#kqwz').attr("lay-verify", "");
            $('#badwdh').attr("lay-verify", "");
            $('#xzs').attr("lay-verify", "");
            $('#xzx').attr("lay-verify", "");
            $('#frdb').attr("lay-verify", "");
            $('#bzdw').attr("lay-verify", "");
            $('#kqnx').attr("lay-verify", "");
            $('#kqq').attr("lay-verify", "");
            $('#kqz').attr("lay-verify", "");
            $('#zkz').attr("lay-verify", "");
            $('#qtkz').attr("lay-verify", "");
            $('#kcfs').attr("lay-verify", "");
            $('#synx').attr("lay-verify", "");
            $('#scnldw').attr("lay-verify", "");
            $('#sjscnl').attr("lay-verify", "");
            $('#scnl').attr("lay-verify", "");
            $('#kscl').attr("lay-verify", "");
            $('#fatz').attr("lay-verify", "");
            $('#bzcs').attr("lay-verify", "");
            $('#sxsj').attr("lay-verify", "");
            $('#dqsj').attr("lay-verify", "");
            $('#bzlx').attr("lay-verify", "");
            $('#fwnx').attr("lay-verify", "");
            for (i = 0; i < Span.length; i++) {
                Span[i].style.display = "none";
            }
        } else {
            $("#m").css("display", "");
            $("#b").css("display", "");
            $('#qymc').attr("lay-verify", "required");
            $('#ckzh').attr("lay-verify", "required");
            $('#kqwz').attr("lay-verify", "required");
            $('#badwdh').attr("lay-verify", "required");
            $('#xzs').attr("lay-verify", "required");
            $('#xzx').attr("lay-verify", "required");
            $('#frdb').attr("lay-verify", "required");
            $('#bzdw').attr("lay-verify", "required");
            $('#kqnx').attr("lay-verify", "required");
            $('#kqq').attr("lay-verify", "required");
            $('#kqz').attr("lay-verify", "required");
            $('#zkz').attr("lay-verify", "required");
            $('#qtkz').attr("lay-verify", "required");
            $('#kcfs').attr("lay-verify", "required");
            $('#synx').attr("lay-verify", "required");
            $('#scnldw').attr("lay-verify", "required");
            $('#sjscnl').attr("lay-verify", "required");
            $('#scnl').attr("lay-verify", "required");
            $('#kscl').attr("lay-verify", "required");
            $('#fatz').attr("lay-verify", "required");
            $('#bzcs').attr("lay-verify", "required");
            $('#sxsj').attr("lay-verify", "required");
            $('#dqsj').attr("lay-verify", "required");
            $('#bzlx').attr("lay-verify", "required");
            for (i = 0; i < Span.length; i++) {
                Span[i].style.display = "";
            }
        }
    })
    //单位监听
    form.on('select(scnldw)',function (data) {
        if (data.value == '万吨/年') {
            $(".DW").html('万吨/年')
            $(".sjs").css('width','90rem')
            $(".DW").css("display", "");
        } if (data.value == '万立方米/年') {
            $(".DW").html('万立方米/年')
            $(".sjs").css('width','105rem')
            $(".DW").css("display", "");
        }
    })

    //上传方案文件
    var uploadSchemeListIns = upload.render({
        elem: '#selectFile'                //绑定元素
        , url: Feng.ctxPath + '/spot/schemaReviewFilesUpload'     //上传接口
        , elemList: $('#FileList')
        //*********************传输限制
        , size: 1024000                   //传输大小
        , exts: 'pdf'        //可传输文件的后缀
        , accept: 'file'
        //****************传输操作相关设置
        , data: {
            fileBusinessType: 6,
            fileBusinessName: "二合一方案文件"
        }
        , auto: false      //自动上传,默认是打开
        , bindAction: '#uploadAction'
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType: 6,
                fileBusinessName: "二合一方案文件"
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
                    , '<td>' + ' 评审方案文件 </td>'
                    , '<td>等待上传</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-xs demo-preview layui-hide">预览</button>'
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
                        var ajax = new HttpRequest(Feng.ctxPath + '/system/delete', 'post', function (data) {
                            Feng.success("删除成功!");
                            tr.remove();
                        }, function (data) {
                            Feng.error("删除失败!" + data.message + "!");
                        });
                        ajax.set("fileId", file.name);
                        ajax.start();
                    };
                    delete files[index]; //删除对应的文件
                    uploadSchemeListIns.config.elem.next()[0].value = ''; // 清空 input file 值，以免删除后出现同名文件不可选
                    Feng.confirm(" 是否删除? ", operation);
                    return false;
                });

                //预览
                tr.find('.demo-preview').on('click', function () {
                    var id = TwoInOneSolutionInfoDlg.data.id;
                    if (id != null) {
                        window.open(window.location.origin + Feng.ctxPath + '/system/preview/file/' + id);
                    } else {
                        parent.layer.msg('请先上传文件', {time: 1000});
                    }
                    return false;
                });

                that.elemList.append(tr);

            });
        }
        , done: function (res, index, upload) {
            Feng.success("项目文件上传成功！");
            var tr = fileListView.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
            tds.eq(4).html('<button class="layui-btn layui-btn-xs demo-preview ">预览</button>'
                + ' <button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>');
            tds.find('.demo-delete').on('click', function (data) {
                var operation = function () {
                    var ajax = new HttpRequest(Feng.ctxPath + '/system/delete', 'post', function (data) {
                        Feng.success("删除成功!");
                        TwoInOneSolutionInfoDlg.data.fileids = null;
                        tr.remove();
                    }, function (data) {
                        Feng.error("删除失败!" + data.message + "!");
                    });
                    delete files[index]; //删除对应的文件
                    uploadSchemeListIns.config.elem.next()[0].value = ''; // 清空 input file 值，以免删除后出现同名文件不可选
                    ajax.set("fileId", file.name);
                    ajax.start();
                };
                Feng.confirm(" 是否删除? ", operation);
                return false;
            });

            //预览
            tds.find('.demo-preview').on('click', function () {
                var id = TwoInOneSolutionInfoDlg.data.id;
                if (id != null) {
                    window.open(window.location.origin + Feng.ctxPath + '/system/preview/file/' + id);
                } else {
                    parent.layer.msg('请先上传文件', {time: 1000});
                }
                return false;
            });
            if (!TwoInOneSolutionInfoDlg.data.id) {
                TwoInOneSolutionInfoDlg.data.id = res.data.fileId;
                TwoInOneSolutionInfoDlg.data.fileids = res.data.fileId;
            } else {
                TwoInOneSolutionInfoDlg.data.fileids = TwoInOneSolutionInfoDlg.data.fileids + ";" + res.data.fileId;
            }
        },
        allDone: function (obj) {
            //多文件上传完毕后的状态回调
            layer.close(loadingIndex);
            // parent.layer.closeAll();
            parent.layer.msg('上传成功', {time: 1000});
            if (!TwoInOneSolutionInfoDlg.actionType) {
                TwoInOneSolutionInfoDlg.actionType = "add";
            }
            var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/twoInOneSolution/" + TwoInOneSolutionInfoDlg.actionType, 'post', function (data) {
                TwoInOneSolutionInfoDlg.actionType = "edit";
            }, function (data) {

            });
            fileid1 = TwoInOneSolutionInfoDlg.data.id;
            // ajax.set(TwoInOneSolutionInfoDlg.data);
            // ajax.start();
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });


    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        if (data.field.kqq != "") {
            data.field.kqq = data.field.kqq + "-" + "01" + "-" + "01";
        }
        if (data.field.kqz != "") {
            data.field.kqz = data.field.kqz + "-" + "01" + "-" + "01";
        }
        data.field.kscl = data.field.kscl + data.field.kcldw;
        delete data.field.kcldw;
        var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/twoInOneSolution/edit", 'post', function (data) {
            Feng.success("更新成功！");
            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);
            //关掉对话框
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        data.field.id = result.data.id;
        data.field.fileids = TwoInOneSolutionInfoDlg.data.fileids;
        ajax.set(data.field);
        ajax.start();

        return false;
    });

});