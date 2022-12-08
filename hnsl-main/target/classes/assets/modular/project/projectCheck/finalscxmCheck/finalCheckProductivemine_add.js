/**
 * 添加或者修改页面
 */
var FinalCheckProductivemineCopy1InfoDlg = {
    data: {
        id: "",
        projectType: "",
        projectAssessNode: "",
        createTime: "",
        updateTime: "",
        createUser: "",
        updateUser: "",
        xmmc: "",
        scdw: "",
        dwdz: "",
        xkz: "",
        nx: "",
        xkzqk: "",
        shi: "",
        xian: "",
        wz: "",
        kz: "",
        kqgm: "",
        zycl: "",
        kqmj: "",
        scnl: "",
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
layui.use(['form', 'admin', 'HttpRequest', 'layarea', 'laydate', 'upload', 'formSelects', 'layer', 'element'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layer = layui.layer;
    var upload = layui.upload;
    var layarea = layui.layarea;
    var element = layui.element;
    //var fileid1 = fileid1;
    let fileid1;
    var uploadedFileArray = [];
    let fileListView = $('#FileList');
    let fileListView1 = $('#FileList1');
    var keyIdValue = $("#keyIdValue").val();
    let associateId;
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

    form.verify({
        A: [/^[\S]{0,7}$/, '中心点经度应不超过6位数字，且不能出现空格'],
        B: [/^[\S]{0,7}$/, '中心点纬度应不超过6位数字，且不能出现空格'],
        C: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '面积需为正数，请重新输入'],
        D: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '经费需为正数，请重新输入'],
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
            $("#e").css("display", "");
            $("#f").css("display", "");
            $("#g").css("display", "");
            $("#h").css("display", "");
            $("#i").css("display", "");
            $("#j").css("display", "");
            $("#k").css("display", "");
            $("#l").css("display", "");
            $("#m").css("display", "");
            $("#n").css("display", "");
            $("#o").css("display", "");
            $("#p").css("display", "");
            $("#q").css("display", "");
            $("#r").css("display", "");
            $("#s").css("display", "");
            $("#t").css("display", "");
            $("#u").css("display", "");
            $("#v").css("display", "");
            $("#y").css("display", "");
            $("#z").css("display", "");
            $("#ab").css("display", "none");
            $("#ac").css("display", "none");
            $("#ad").css("display", "");
            $("#ae").css("display", "");
            $("#shi").attr("lay-verify", "required");
            $("#xian").attr("lay-verify", "required");
            $("#xkzqk").attr("lay-verify", "required");
            $("#kz").attr("lay-verify", "required");
            $("#kfx").attr("lay-verify", "required");
            $("#kfy").attr("lay-verify", "required");
            $("#dqsj").attr("lay-verify", "required");
            $("#xmmj").attr("lay-verify", "required");
            $("#sxsj").attr("lay-verify", "required");
            $("#fwnx").attr("lay-verify", "required");
            $("#nx").attr("lay-verify", "required");
            $("#pssJS").attr("lay-verify", "required");
            $("#pssjXf").attr("lay-verify", "");
            $("#pssJXs").attr("lay-verify", "");
            $("#fkjf").attr("lay-verify", "required");
            $("#pssJC").attr("lay-verify", "required");
            $("#dwdz").attr("lay-verify", "required");
            $("#bzdw").attr("lay-verify", "required");
            $("#zycl").attr("lay-verify", "required");
        } else {
            $("#e").css("display", "none");
            $("#f").css("display", "none");
            $("#g").css("display", "");
            $("#h").css("display", "none");
            $("#i").css("display", "none");
            $("#j").css("display", "");
            $("#k").css("display", "none");
            $("#l").css("display", "");
            $("#m").css("display", "none");
            $("#n").css("display", "none");
            $("#o").css("display", "");
            $("#p").css("display", "");
            $("#q").css("display", "");
            $("#r").css("display", "");
            $("#s").css("display", "none");
            $("#t").css("display", "none");
            $("#u").css("display", "none");
            $("#v").css("display", "none");
            $("#y").css("display", "");
            $("#z").css("display", "none");
            $("#ab").css("display", "none");
            $("#ac").css("display", "none");
            $("#ad").css("display", "none");
            $("#ae").css("display", "none");
            $("#shi").attr("lay-verify", "");
            $("#xian").attr("lay-verify", "");
            $("#xkzqk").attr("lay-verify", "");
            $("#kz").attr("lay-verify", "");
            $("#kfx").attr("lay-verify", "");
            $("#kfy").attr("lay-verify", "");
            $("#dqsj").attr("lay-verify", "");
            $("#xmmj").attr("lay-verify", "");
            $("#sxsj").attr("lay-verify", "");
            $("#fwnx").attr("lay-verify", "");
            $("#nx").attr("lay-verify", "");
            $("#pssJS").attr("lay-verify", "");
            $("#pssjXf").attr("lay-verify", "");
            $("#pssJXs").attr("lay-verify", "");
            $("#fkjf").attr("lay-verify", "");
            $("#pssJC").attr("lay-verify", "");
            $("#dwdz").attr("lay-verify", "");
            $("#bzdw").attr("lay-verify", "");
            $("#zycl").attr("lay-verify", "");
            $("#finalCheckProductivemineForm").css("height", "800px");
            document.getElementById("psjd").value = "3";
            document.getElementById("psbhjd").value = null;
            document.getElementById("pssjXs").value = day;
            document.getElementById("pssjXf").value = "";
        }
    })
    let data = {};
    $("#btnnext").click(function () {
        element.tabChange('demo', '2');
        // $("#finalCheckProductivemineForm").css("height", "700px");
        // $("#tabpages").css("height", "700px");
        let value = $('#finalCheckProductivemineForm').serializeArray();
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
                form.val("finalCheckProductivemineForm", JSON.parse(JSON.stringify(data)));
            }
            data = {};
        }, 100);
    });

    //上传方案文件
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
        , bindAction: '#uploadAction'
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType: 4,
                fileBusinessName: "评审方案文件"
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
                tr.find('.demo-delete').on('click', function (data) {
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
                tr.find('.demo-preview').on('click', function () {
                    var Id = FinalCheckProductivemineCopy1InfoDlg.data.id;
                    if (Id != null) {
                        window.open(window.location.origin + '/system/preview/file/' + Id);
                    }else{
                        parent.layer.msg('请先上传文件', {time: 1000});
                    }
                    return false;
                });

                that.elemList.append(tr);

            });
        }
        , done: function (res,index, upload) {
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
                var Id = FinalCheckProductivemineCopy1InfoDlg.data.id;
                if (Id != null) {
                    window.open(window.location.origin + '/system/preview/file/' + Id);
                }else{
                    parent.layer.msg('请先上传文件', {time: 1000});
                }
                return false;
            });
            if (!FinalCheckProductivemineCopy1InfoDlg.data.id) {
                FinalCheckProductivemineCopy1InfoDlg.data.id = res.data.fileId;
                FinalCheckProductivemineCopy1InfoDlg.data.fileids = res.data.fileId;
            } else {
                FinalCheckProductivemineCopy1InfoDlg.data.fileids = FinalCheckProductivemineCopy1InfoDlg.data.fileids + ";" + res.data.fileId;
            }
        },
        allDone: function (obj) {
            //多文件上传完毕后的状态回调
            layer.close(loadingIndex);
            parent.layer.closeAll();
            parent.layer.msg('上传成功', {time: 1000});
            if (!FinalCheckProductivemineCopy1InfoDlg.actionType) {
                FinalCheckProductivemineCopy1InfoDlg.actionType = "add";
            }
            var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/" + FinalCheckProductivemineCopy1InfoDlg.actionType, 'post', function (data) {
                FinalCheckProductivemineCopy1InfoDlg.actionType = "edit";
            }, function (data) {

            });
            fileid1 = FinalCheckProductivemineCopy1InfoDlg.data.id;
            // ajax.set(FinalCheckProductivemineCopy1InfoDlg.data);
            // ajax.start();
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });

    function formReset() {
        document.getElementById("finalCheckProductivemineForm").reset();
    }
    //上传意见文件
    var uploadSchemeListIns = upload.render({
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
        , bindAction: '#uploadAction1'
        , multiple: true                             //多文件上传
        , number: 10
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType: 5,
                fileBusinessName: "评审意见文件"
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
                tr.find('.demo-delete').on('click', function (data) {
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
                tr.find('.demo-preview').on('click', function () {
                    var Id = FinalCheckProductivemineCopy1InfoDlg.data.id;
                    if (Id != null) {
                        window.open(window.location.origin + '/system/preview/file/' + Id);
                    }else{
                        parent.layer.msg('请先上传文件', {time: 1000});
                    }
                    return false;
                });

                that.elemList.append(tr);

            });
        }
        , done: function (res,index) {
            Feng.success("项目文件上传成功！");
            var files = this.files;
            var tr = fileListView1.find('tr#upload-' + index)
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
                var Id = FinalCheckProductivemineCopy1InfoDlg.data.id;
                if (Id != null) {
                    window.open(window.location.origin + '/system/preview/file/' + Id);
                }else{
                    parent.layer.msg('请先上传文件', {time: 1000});
                }
                return false;
            });
            if (!FinalCheckProductivemineCopy1InfoDlg.data.id) {
                FinalCheckProductivemineCopy1InfoDlg.data.id = res.data.fileId;
                FinalCheckProductivemineCopy1InfoDlg.data.fileids = res.data.fileId;
            } else {
                FinalCheckProductivemineCopy1InfoDlg.data.fileids = FinalCheckProductivemineCopy1InfoDlg.data.fileids + ";" + res.data.fileId;
            }
        },
        allDone: function (obj) {
            //多文件上传完毕后的状态回调
            layer.close(loadingIndex);
            parent.layer.closeAll();
            parent.layer.msg('上传成功', {time: 1000});
            if (!FinalCheckProductivemineCopy1InfoDlg.actionType) {
                FinalCheckProductivemineCopy1InfoDlg.actionType = "add";
            }
            var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/" + FinalCheckProductivemineCopy1InfoDlg.actionType, 'post', function (data) {
                FinalCheckProductivemineCopy1InfoDlg.actionType = "edit";
            }, function (data) {

            });
            fileid1 = FinalCheckProductivemineCopy1InfoDlg.data.id;
            // ajax.set(FinalCheckProductivemineCopy1InfoDlg.data);
            // ajax.start();
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });

    function formReset() {
        document.getElementById("finalCheckProductivemineForm").reset();
    }

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        if (FinalCheckProductivemineCopy1InfoDlg.actionType === "add") {
            var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/" + FinalCheckProductivemineCopy1InfoDlg.actionType, 'post', function (data) {
                // Feng.success("添加成功！");
                //传给上个页面，刷新table用
                // layer.msg('添加成功', {time: 1000},)
                Feng.success("添加成功！");
                admin.putTempData('formOk', true);
                //关掉对话框
                admin.closeThisDialog();
                window.location.reload();
                //formReset();
            }, function (data) {
                // layer.msg('添加失败', {time: 1000},)
                Feng.error("添加失败！" + data.message)
                //formReset();
            });
            data.field.id = FinalCheckProductivemineCopy1InfoDlg.data.id;
            data.field.fileids = FinalCheckProductivemineCopy1InfoDlg.data.fileids;
            ajax.set(data.field);
            ajax.start();
            return false;
        } else {
            layer.msg('请上传文件', {time: 1000},)
            return false;
        }


    });
    // $("#btnnext").click(function () {
    //     element.tabChange('demo', '2')
    // });
    // $("#close").click(function () {
    //     element.tabChange('demo', '1')
    // });

});