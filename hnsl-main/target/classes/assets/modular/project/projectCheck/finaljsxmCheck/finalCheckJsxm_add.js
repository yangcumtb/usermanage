/**
 * 添加或者修改页面
 */
var FinalCheckJsxmCopy1InfoDlg = {
    actionType: null,
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
        pssjS: "",
        tjlx: "",
        fileids: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'layarea', 'laydate', 'upload', 'formSelects', 'layer','element'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layer = layui.layer;
    var upload = layui.upload;
    var layarea = layui.layarea;
    var element = layui.element;
    let fileid1;
    // var fileid1 = fileid1;
    let fileListView = $('#FileList');
    let fileListView1 = $('#FileList1');
    var fileBusinessType = 4;
    var fileBusinessName = "评审方案文件";
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    })
    var today = (new Date()).toLocaleDateString();
    laydate.render({
        elem: "#sxsj",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });

    laydate.render({
        elem: "#dqsj",
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


    //时间转换
    var symbol1 = '/';
    var symbol2 = '-';
    var day = today.replaceAll(symbol1, symbol2);
    var num = day[5];
    var num2 = day[8];
    //函数
    function insertstr (soure, start, newStr) {
        return soure.slice(0, start) + newStr +soure.slice(start);
    }
    if (num < 10 && day [6] == '-') {
        day = insertstr(day, 5, "0");
        console.log(day[9]);
        var num1 = parseInt(day[8]);
        if (num1 <10 && typeof(day[9]) == "undefined" ){
            day = insertstr(day, 8, "0");
            console.log(day)
        }
    } else {
        if (num2 <10 && typeof(day[9]) == "undefined" ){
            day = insertstr(day, 8, "0");
        }
    }
    document.getElementById("pssjXf").value = day;
    document.getElementById("pssjXs").value = day;
    form.on('select(tjlx)', function (data) {
        if (data.value == 1) {
            document.getElementById("psjd").value = "3";
            document.getElementById("pssjXf").value = day;
            document.getElementById("pssjXs").value = day;
            $("#a").css("display", "");
            $("#b").css("display", "");
            $("#c").css("display", "");
            $("#d").css("display", "");
            $("#e").css("display", "");
            $("#f").css("display", "");
            $("#g").css("display", "");
            $("#h").css("display", "");
            $("#j").css("display", "");
            $("#k").css("display", "");
            $("#l").css("display", "");
            $("#m").css("display", "");
            $("#n").css("display", "");
            $("#o").css("display", "");
            $("#p").css("display", "");
            $("#q").css("display", "");
            $("#x").css("display", "");
            $("#y").css("display", "");
            $("#ad").css("display", "");
            $("#ae").css("display", "");
            $("#a2").css("display", "");
            $("#a3").css("display", "");
            $("#a4").css("display", "none");
            $("#a5").css("display", "none");
            $("#shi").attr("lay-verify", "required");
            $("#xian").attr("lay-verify", "required");
            $("#ossJS").attr("lay-verify", "required");
            $("#pssjC").attr("lay-verify", "required");
            $("#kfx").attr("lay-verify", "required");
            $("#kfy").attr("lay-verify", "required");
            $("#ywr").attr("lay-verify", "required");
            $("#fkjf").attr("lay-verify", "required");
            $("#frdb").attr("lay-verify", "required");
            $("#dqsj").attr("lay-verify", "required");
            $("#fwnx").attr("lay-verify", "required");
            $("#sxsj").attr("lay-verify", "required");
        } else {
            $("#e").css("display", "none");
            $("#g").css("display", "none");
            $("#h").css("display", "none");
            $("#j").css("display", "none");
            $("#o").css("display", "none");
            $("#p").css("display", "none");
            $("#q").css("display", "none");
            $("#x").css("display", "none");
            $("#y").css("display", "");
            $("#k").css("display", "none");
            $("#n").css("display", "none");
            $("#m").css("display", "");
            $("#l").css("display", "");
            $("#a2").css("display", "");
            $("#a3").css("display", "none");
            $("#a4").css("display", "none");
            $("#a5").css("display", "none");
            $("#ad").css("display", "none");
            $("#ae").css("display", "none");
            $("#shi").attr("lay-verify", "");
            $("#xian").attr("lay-verify", "");
            $("#ossJS").attr("lay-verify", "");
            $("#pssjC").attr("lay-verify", "");
            $("#kfx").attr("lay-verify", "");
            $("#kfy").attr("lay-verify", "");
            $("#ywr").attr("lay-verify", "");
            $("#fkjf").attr("lay-verify", "");
            $("#frdb").attr("lay-verify", "");
            $("#dqsj").attr("lay-verify", "");
            $("#fwnx").attr("lay-verify", "");
            $("#sxsj").attr("lay-verify", "");
            $("#finalCheckJsxmCopy1Form").css("height", "800px");
            document.getElementById("psbhjd").value = null;
            document.getElementById("psjd").value = "3";
            document.getElementById("pssjXs").value = day;
            document.getElementById("pssjXf").value = "";
        }
    })
    let data = {};
    $("#btnnext").click(function () {
        element.tabChange('demo', '2');
        // $("#finalCheckProductivemineForm").css("height", "700px");
        // $("#tabpages").css("height", "700px");
        let value = $('#finalCheckJsxmCopy1Form').serializeArray();
        $.each(value, function (index, item) {
            data[item.name] = item.value;
        });
        console.log(data)
    });
    $("#close").click(function () {
        element.tabChange('demo', '1');
        // $("#twoOneSolutionForm").css("height", "1600px");
        // $("#tabpages").css("height", "1550px");
        setTimeout(function () {
            if (data.length != 0) {
                console.log(data);
                form.val("finalCheckJsxmCopy1Form", JSON.parse(JSON.stringify(data)));
            }
            data = {};
        }, 100);
    });

    //上传文件
    /**
     *
     */
    var uploadSchemeListIns = upload.render({
        elem: '#selectFile'                //绑定元素
        , url: Feng.ctxPath + '/spot/schemaReviewFilesUpload'     //上传接口
        , elemList: $('#FileList')
        //*********************传输限制
        , size: 2048                   //传输大小
        , exts: 'pdf'        //可传输文件的后缀
        , accept: 'file'
        //****************传输操作相关设置
        , data: {
            fileBusinessType: 4,
            fileBusinessName: "评审方案文件"
        }
        , auto: false      //自动上传,默认是打开
        , bindAction: '#uploadAction'                                //自动上传,默认是打开的
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType: 4,
                fileBusinessName: "评审方案文件"
            };
            loadingIndex = layer.load(); //上传loading
            element.render();
        },
        choose: function (obj) {
            var that = this;
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result, res) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>'+' 评审方案文件 </td>'
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
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    uploadSchemeListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
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
                // 预览
                tr.find('.demo-preview').on('click', function () {
                    var Id = FinalCheckJsxmCopy1InfoDlg.data.id;
                    if (Id) {
                        window.open(window.location.origin + '/system/preview/file/' + Id);
                    }
                    return false;
                });

                that.elemList.append(tr);
            });
        }
        , done: function (res,index) {
            Feng.success("项目文件上传成功！");
            var files = this.files;
            var tr = fileListView.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
            tds.eq(4).html('<button class="layui-btn layui-btn-xs demo-preview ">预览</button>'
                + ' <button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>');
            tds.find('.demo-delete').on('click', function (data) {
                delete files[index]; //删除对应的文件
                uploadSchemeListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
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
            tds.find('.demo-preview').on('click', function () {
                var Id = FinalCheckJsxmCopy1InfoDlg.data.id;
                if (Id != null) {
                    window.open(window.location.origin + '/system/preview/file/' + Id);
                }else{
                    parent.layer.msg('请先上传文件', {time: 1000});
                }
                return false;
            });
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
            parent.layer.closeAll();
            parent.layer.msg('上传成功', {time: 1000});
            if (!FinalCheckJsxmCopy1InfoDlg.actionType) {
                FinalCheckJsxmCopy1InfoDlg.actionType = "add";
            }
            var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/" + FinalCheckJsxmCopy1InfoDlg.actionType, 'post', function (data) {
                FinalCheckJsxmCopy1InfoDlg.actionType = "edit";
            }, function (data) {

            });
            fileid1 = FinalCheckJsxmCopy1InfoDlg.data.id;
            // ajax.set(FinalCheckJsxmCopy1InfoDlg.data);
            // ajax.start();
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });

    var uploadSchemeListIns1 = upload.render({
        elem: '#selectFile1'                //绑定元素
        , url: Feng.ctxPath + '/spot/schemaReviewFilesUpload'     //上传接口
        , elemList: $('#FileList1')
        //*********************传输限制
        , size: 2048                   //传输大小
        , exts: 'pdf'        //可传输文件的后缀
        , accept: 'file'
        //****************传输操作相关设置
        , data: {
            fileBusinessType: 5,
            fileBusinessName: "评审意见文件"
        }
        , auto: false      //自动上传,默认是打开
        , bindAction: '#uploadAction1'                               //自动上传,默认是打开的
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType: 5,
                fileBusinessName: "评审意见文件"
            };
            loadingIndex = layer.load(); //上传loading
            element.render();
        },
        choose: function (obj) {
            var that = this;
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result, res) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>'+' 评审意见文件 </td>'
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
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    uploadSchemeListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
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
                // 预览
                tr.find('.demo-preview').on('click', function () {
                    var Id = FinalCheckJsxmCopy1InfoDlg.data.id;
                    if (Id) {
                        window.open(window.location.origin + '/system/preview/file/' + Id);
                    }
                    return false;
                });

                that.elemList.append(tr);
            });
        }
        , done: function (res,index) {
            Feng.success("项目文件上传成功！");
            var files = this.files
            var tr = fileListView1.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
            tds.eq(4).html('<button class="layui-btn layui-btn-xs demo-preview ">预览</button>'
                + ' <button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>');
            tds.find('.demo-delete').on('click', function (data) {
                delete files[index]; //删除对应的文件
                uploadSchemeListIns1.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
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
            tds.find('.demo-preview').on('click', function () {
                var Id = FinalCheckJsxmCopy1InfoDlg.data.id;
                if (Id != null) {
                    window.open(window.location.origin + '/system/preview/file/' + Id);
                }else{
                    parent.layer.msg('请先上传文件', {time: 1000});
                }
                return false;
            });
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
            parent.layer.closeAll();
            parent.layer.msg('上传成功', {time: 1000});
            if (!FinalCheckJsxmCopy1InfoDlg.actionType) {
                FinalCheckJsxmCopy1InfoDlg.actionType = "add";
            }
            var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/" + FinalCheckJsxmCopy1InfoDlg.actionType, 'post', function (data) {
                FinalCheckJsxmCopy1InfoDlg.actionType = "edit";
            }, function (data) {

            });
            fileid1 = FinalCheckJsxmCopy1InfoDlg.data.id;
            // ajax.set(FinalCheckJsxmCopy1InfoDlg.data);
            // ajax.start();
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });
    function formReset() {
        document.getElementById("finalCheckJsxmCopy1Form").reset();
    }

    form.on('submit(btnSubmit)', function (data) {
        if (FinalCheckJsxmCopy1InfoDlg.actionType === "add") {
            var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/" + FinalCheckJsxmCopy1InfoDlg.actionType, 'post', function (data) {
                // Feng.success("添加成功！");
                //传给上个页面，刷新table用
                // layer.msg('添加成功', {time: 1000},)
                Feng.success("添加成功！");
                admin.putTempData('formOk', true);
                //关掉对话框
                admin.closeThisDialog();
                window.location.reload();
                // formReset();
            }, function (data) {
                Feng.error("添加失败！" + data.message)
                // layer.msg('添加失败', {time: 1000});
                // formReset();
            });
            data.field.id = FinalCheckJsxmCopy1InfoDlg.data.id;
            data.field.fileids = FinalCheckJsxmCopy1InfoDlg.data.fileids;
            ajax.set(data.field);
            ajax.start();

            return false;
        } else {
            layer.msg('请上传文件', {time: 1000});
            return false;
        }

    });
    $("#btnnext").click(function () {
        element.tabChange('demo', '2')
        return false;
    });
    $("#close").click(function () {
        element.tabChange('demo', '1')
        return false;
    });

});