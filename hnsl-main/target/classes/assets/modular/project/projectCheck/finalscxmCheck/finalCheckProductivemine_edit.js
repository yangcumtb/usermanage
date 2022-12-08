var FinalCheckProductivemineCopy1InfoDlg = {
    data: {
        id: "",
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
        shjg: "",
        tjlx: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'layarea', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layarea = layui.layarea;
    var fileBusinessType = 1;
    var fileBusinessName = "评审方案文件";
    var layer = layui.layer;
    var upload = layui.upload;
    var element = layui.element;
    //var fileid1 = fileid1;
    let fileid1;
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
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#pssjXf",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#pssjC",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#pssjS",
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
    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    console.log(Feng.getUrlParam("id"));
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
    form.val('finalCheckProductivemineForm', result.data);
    console.log(result.data);
    var data1 = result.data;
    var lx = data1.tjlx;
    if (lx == 1) {
        $("#finalCheckProductivemineForm").css("height", "1800px");
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
    }

//监听tjxl
    form.on('select(tjlx)', function (data) {
        if (data.value == 1) {
            $("#finalCheckProductivemineForm").css("height", "1800px");
            document.getElementById("psjd").value = "3";
            document.getElementById("psbhjd").value = "1";
            document.getElementById("pssjXf").value = day;
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
            document.getElementById("psbhjd").value = "1";
            document.getElementById("psjd").value = "3";
        }
    })
    //上传文件
    var uploadSchemeListInsa = upload.render({
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
                fileBusinessType: fileBusinessType,
                fileBusinessName: fileBusinessName
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
                tr.find('.demo-delete').on('click', function (data) {
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
                    if (Id) {
                        window.open(window.location.origin + '/system/preview/file/' + Id);
                    }
                });

                that.elemList.append(tr);

            });
        }
        , done: function (res) {
            Feng.success("项目文件上传成功！");
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
            parent.layer.msg('上传成功', {time: 1000});
            // if (! FinalCheckProductivemineCopy1InfoDlg.actionType) {
            //     FinalCheckProductivemineCopy1InfoDlg.actionType = "add";
            // }
            // var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/editFile", 'post', function (data) {
            //     FinalCheckProductivemineCopy1InfoDlg.actionType = "edit";
            // }, function (data) {
            //
            // });
            fileid1 = FinalCheckProductivemineCopy1InfoDlg.data.id;
            // ajax.set("fileids",FinalCheckProductivemineCopy1InfoDlg.data.fileids);
            // ajax.start();
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });
    //上传文件
    var uploadSchemeListIns = upload.render({
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
                fileBusinessType: fileBusinessType,
                fileBusinessName: fileBusinessName
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
                tr.find('.demo-delete').on('click', function (data) {
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
                    if (Id) {
                        window.open(window.location.origin + '/system/preview/file/' + Id);
                    }
                });

                that.elemList.append(tr);

            });
        }
        , done: function (res) {
            Feng.success("项目文件上传成功！");
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
            parent.layer.msg('上传成功', {time: 1000});
            // if (! FinalCheckProductivemineCopy1InfoDlg.actionType) {
            //     FinalCheckProductivemineCopy1InfoDlg.actionType = "add";
            // }
            // var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/" +  FinalCheckProductivemineCopy1InfoDlg.actionType, 'post', function (data) {
            //     FinalCheckProductivemineCopy1InfoDlg.actionType = "edit";
            // }, function (data) {
            //
            // });
            fileid1 = FinalCheckProductivemineCopy1InfoDlg.data.id;
            // ajax.set(FinalCheckProductivemineCopy1InfoDlg.data);
            // ajax.start();
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });
    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/productivemineCheck/final/edit", 'post', function (data) {
            Feng.success("更新成功！");
            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);
            //关掉对话框
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        data.field.fileids = fileid1;
        ajax.set(data.field);
        ajax.start();

        return false;
    });

});