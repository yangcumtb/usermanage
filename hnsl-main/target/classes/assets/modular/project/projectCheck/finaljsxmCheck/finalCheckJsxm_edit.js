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

layui.use(['form', 'admin', 'HttpRequest', 'layarea', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layer = layui.layer;
    var upload = layui.upload;
    var element = layui.element;
    let fileid1;
    var layarea = layui.layarea;
    var fileBusinessType = 1;
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
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });

    laydate.render({
        elem: "#dqsj",
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

    var data2 = result.data;
    var lx = data2.tjlx;
    if (lx == 1) {
        $("#finalCheckJsxmCopy1Form").css("height", "1400px");
        document.getElementById("psjd").value = "3";
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
        $("#a4").css("display", "");
        $("#a5").css("display", "");
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
    }


    //监听tjlx
    form.on('select(tjlx)', function (data) {
        if (data.value == 1) {
            $("#finalCheckJsxmCopy1Form").css("height", "1400px");
            document.getElementById("psjd").value = "3";
            document.getElementById("pssjXf").value = day;
            console.log(data.value);
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
            // var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/" + FinalCheckJsxmCopy1InfoDlg.actionType, 'post', function (data) {
            //     FinalCheckJsxmCopy1InfoDlg.actionType = "edit";
            // }, function (data) {
            //
            // });
            fileid1 = FinalCheckJsxmCopy1InfoDlg.data.id;
            // console.log(fileid1)
            // ajax.set(FinalCheckJsxmCopy1InfoDlg.data);
            // ajax.start();
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
            // if (!FinalCheckJsxmCopy1InfoDlg.actionType) {
            //     FinalCheckJsxmCopy1InfoDlg.actionType = "add";
            // }
            // var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/" + FinalCheckJsxmCopy1InfoDlg.actionType, 'post', function (data) {
            //     FinalCheckJsxmCopy1InfoDlg.actionType = "edit";
            // }, function (data) {
            //
            // });
            fileid1 = FinalCheckJsxmCopy1InfoDlg.data.id;
            // console.log(fileid1)
            // ajax.set(FinalCheckJsxmCopy1InfoDlg.data);
            // ajax.start();
        },
        error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });
    //上传文件
    // upload.render({
    //     elem: '#projectPDFBtn'                //绑定元素
    //     , url: '/project/projectAssess/uploadFile'      //上传接口
    //
    //
    //     //*********************传输限制
    //     , size: 2048                   //传输大小
    //     , exts: 'jpg|png|gif|doc|pdf'        //可传输文件的后缀
    //     , accept: 'file'
    //
    //
    //     //****************传输操作相关设置
    //     , data: { projectId: "1234567",innerPath:""+new Date().getFullYear()+new Date().getMonth() }    //额外传输的参数
    //     , auto: true                                 //自动上传,默认是打开的
    //     //, bindAction: '#btnUpload'                    //auto为false时，点击触发上传
    //     , multiple: false                             //多文件上传
    //     //, number: 100                               //multiple:true时有效
    //
    //     , done: function (res) {
    //         Feng.success("项目文件上传成功！");
    //         var ajax=new HttpRequest(Feng.ctxPath + "/project/projectAssess/getProjectFiles?projectId=1234567",'get', function (data) {
    //             var aList=data.data;
    //             var aHtml="";
    //             aList?aList.forEach(function(item){
    //                 aHtml+="<a href=\"http://www.w3school.com.cn\">"+item.fileName+"</a><br/>";
    //             }):"";
    //             $('#projectFiles')[0].innerHTML= aHtml;
    //         }, function (data) {
    //             Feng.error("查询失败！" + data.message)
    //         });
    //         ajax.set("1234567");
    //         ajax.start();
    //         //$('#myPic').attr("src", res.Src);
    //     }
    //     , error: function () {                         //传输失败的回调
    //         //请求异常回调
    //     }
    // });
    //表单提交事件


    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/jsxmCheck/final/edit", 'post', function (data) {
            Feng.success("添加成功！");
            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);
            //关掉对话框
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("添加失败！" + data.message)
        });
        data.field.fileids = fileid1;
        ajax.set(data.field);
        ajax.start();

        return false;
    });


});