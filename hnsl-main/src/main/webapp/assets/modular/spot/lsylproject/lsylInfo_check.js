/**
 * 方案审批
 */
var SpottableHistoricalmineInfoDlg = {
    data: {
        fileids: '',
        filename: '',
        tbbh: '',
        id: "",
        num: "",
        dq: "",
        xmmc: "",
        kfx: "",
        kfy: "",
        yszzj: "",
        sbzj: "",
        xflx: "",
        zlnd: "",
        bz: "",
        mj: "",
        associate_id: "",
        psjd: "",
        psbhjd: "",
        pssj_xs: "",
        pssj_xf: "",
        pssj_c: "",
        pssj_s: "",
        tjlx: "",
        bhyj: "",
        curUserLevel: "",
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects', 'layarea', 'xmSelect', 'func'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var element = layui.element;
    var upload = layui.upload;
    var xmSelect = layui.xmSelect;
    var func = layui.func;
    let fileid1;

    let fileListView = $('#FileList');
    var today = (new Date()).toLocaleDateString();


    //时间转换
    var symbol1 = '/';
    var symbol2 = '-';
    var day = today.replaceAll(symbol1, symbol2);
    var num = day[5];
    var num2 = day[8];

    //函数
    function insertstr(soure, start, newStr) {
        return soure.slice(0, start) + newStr + soure.slice(start);
    }

    if (num < 10 && day [6] == '-') {
        day = insertstr(day, 5, "0");
        console.log(day[9]);
        var num1 = parseInt(day[8]);
        if (num1 < 10 && typeof (day[9]) == "undefined") {
            day = insertstr(day, 8, "0");
            console.log(day)
        }
    } else {
        if (num2 < 10 && typeof (day[9]) == "undefined") {
            day = insertstr(day, 8, "0");
        }
    }
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
    ///
    //
    //图斑查看弹窗
    function PolygenDetail(data) {
        console.log(data)
        func.open({
            width: "1000rem",
            title: '历史遗留矿山详情',
            // height: '650',
            content: Feng.ctxPath + '/spot/lsyl/detailHtml?id=' + data,
        });
    };
    var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    // 根据用户等级判断是否有权限操作
    if (result.data.curUserLevel == 1) {
        // Feng.success("已提交，无权限操作");
        //关闭当前窗窗口
        var index = parent.layer.getFrameIndex(window.name); //获取当前窗口的name

        parent.layer.close(index);//关闭窗口
        parent.layer.msg('已提交，无权限操作', {icon: 4});
    }
    // 根据用户等级判断是否有权限操作
    if (result.data.psjd == 5) {
        //关闭当前窗窗口
        var index = parent.layer.getFrameIndex(window.name); //获取当前窗口的name

        parent.layer.close(index);//关闭窗口
        parent.layer.msg('已入库，无权限操作', {icon: 4});
    }
    if (result.data.curUserLevel == 3 && result.data.psjd == 3) {
        //关闭当前窗窗口
        var index = parent.layer.getFrameIndex(window.name); //获取当前窗口的name

        parent.layer.close(index);//关闭窗口
        parent.layer.msg('已审核，无权限操作', {icon: 4});
    }
    if (result.data.curUserLevel == 4 && result.data.psjd == 1) {
        //关闭当前窗窗口
        var index = parent.layer.getFrameIndex(window.name); //获取当前窗口的name

        parent.layer.close(index);//关闭窗口
        parent.layer.msg('市级未审核', {icon: 4});
    }
    //图斑表格回显
    if (result.data.tbbh != null) {
        var PolygonIDs = result.data.tbbh.split(',');
        var mj = result.data.tbmj.split(',');
        var Len = PolygonIDs.length;
        for (var i = 0; i < Len; i++) {
            if (PolygonIDs[i] != '') {
                var Polygonlist = $(['<tr id="upload-' + [i] + '">'
                    , '<td>' + PolygonIDs[i] + '</td>'
                    , '<td>' + mj[i] + '</td>'
                    , '<td><span style="color: #5FB878;">已入库</span></td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs check" type="button">查看</button>'
                    , '</td>'
                    , '</tr>'].join(''));
                var Che = Polygonlist.find('.check')
                Che.attr('name', PolygonIDs[i])
                $('#PolygonList').append(Polygonlist);
            }
        }
        $(".check").on('click', function () {
            var Id = this.name
            PolygenDetail(Id);
        })
    }

    //
    //
    //文件表格回显
    if (result.data.fileids != null) {
        var FileIDs = result.data.fileids.split(',');
        var FileNAMEs = result.data.filenames.split(',');
        var FileSIZE = result.data.filesize.split(',');
        var FileTYPE = result.data.fileBusinessType.split(',');
        var L = FileIDs.length;
        for (var i = 0; i < L; i++) {
            if (FileTYPE[i] != 10) {
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
                        , '<button class="layui-btn layui-btn-xs demo-preview" type="button">预览</button>'
                        , '</td>'
                        , '</tr>'].join(''));
                    var Pre = fileList.find('.demo-preview')
                    Pre.attr('name', FileIDs[i])
                    Pre.addClass(Type)
                    $('#FileList').append(fileList);
                }
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
    //form表单填充
    form.val('lsylInfoForm', result.data);

    //根据回显数据展示所需字段
    if (result.data.xflx == '生态修复' || result.data.xflx == '辅助再生') {
        $('#Province').css('display', '');
    } else {
        $('#Province').css('display', 'none');
    }
    //监听审核结果
    var curNode = $("#shjg").val();
    form.on('select(shjg)', function (data) {
        if (data.value == "1") {
            $("#a6").css("display", "none");
        } else if (data.value == "2") {
            $("#a6").css("display", "");
        }
        curNode = data.value
    });
    //意见文件上传
//     var uploadSchemeListIns2 = upload.render({
//         elem: 'IdeaPushPDFBtn'             //绑定元素
//         , url: Feng.ctxPath + '/spot/schemaReviewFilesUpload'     //上传接口
//         , elemList: $('#FileList')
//         //*********************传输限制
//         , size: 2048                   //传输大小
//         , exts: 'pdf'        //可传输文件的后缀
//         , accept: 'file'
//         //****************传输操作相关设置
//         , data: {
//             fileBusinessType: 6,
//             fileBusinessName: "二合一方案文件"
//         }
//         , auto: false      //自动上传,默认是打开
//         , bindAction: '#uploadAction'
//         , multiple: true                             //多文件上传
//         , number: 10
//         , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
//             this.data = {
//                 fileBusinessType: 6,
//                 fileBusinessName: "二合一方案文件"
//             }
//             loadingIndex = layer.load(); //上传loading
//         },
//         choose: function (obj) {
//             var that = this;
//             var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
//             //读取本地文件
//             obj.preview(function (index, file, result) {
//                 var tr = $(['<tr id="upload-' + index + '">'
//                     , '<td>' + file.name + '</td>'
//                     , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
//                     , '<td>' + ' 评审方案文件 </td>'
//                     , '<td>等待上传</td>'
//                     , '<td>'
//                     , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
//                     , '<button class="layui-btn layui-btn-xs demo-preview layui-hide">预览</button>'
//                     , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
//                     , '</td>'
//                     , '</tr>'].join(''));
//
//                 //单个重传
//                 tr.find('.demo-reload').on('click', function () {
//                     obj.upload(index, file);
//                 });
//
//                 //删除
//                 tr.find('.demo-delete').on('click', function (data) {
//                     var operation = function () {
//                         var ajax = new HttpRequest(Feng.ctxPath + '/system/delete', 'post', function (data) {
//                             Feng.success("删除成功!");
//                             tr.remove();
//                         }, function (data) {
//                             Feng.error("删除失败!" + data.message + "!");
//                         });
//                         ajax.set("fileId", fileid1);
//                         ajax.start();
//                     };
//                     Feng.confirm(" 是否删除? ", operation);
//                     return false;
//                 });
//
//                 //预览
//                 tr.find('.demo-preview').on('click', function () {
//                     var id = SpottableHistoricalmineInfoDlg.data.id;
//                     if (id != null) {
//                         window.open(window.location.origin + '/system/preview/file/' + id);
//                     } else {
//                         parent.layer.msg('请先上传文件', {time: 1000});
//                     }
//                     return false;
//                 });
//
//                 that.elemList.append(tr);
//
//             });
//         }
//         , done: function (res, index, upload) {
//             Feng.success("项目文件上传成功！");
//             var tr = fileListView.find('tr#upload-' + index)
//                 , tds = tr.children();
//             tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
//             tds.eq(4).html('<button class="layui-btn layui-btn-xs demo-preview ">预览</button>'
//                 + ' <button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>');
//             tds.find('.demo-delete').on('click', function (data) {
//                 var operation = function () {
//                     var ajax = new HttpRequest(Feng.ctxPath + '/system/delete', 'post', function (data) {
//                         Feng.success("删除成功!");
//                         tr.remove();
//                     }, function (data) {
//                         Feng.error("删除失败!" + data.message + "!");
//                     });
//                     ajax.set("fileId", fileid1);
//                     ajax.start();
//                 };
//                 Feng.confirm(" 是否删除? ", operation);
//                 return false;
//             });
//
//             //预览
//             tds.find('.demo-preview').on('click', function () {
//                 var id = SpottableHistoricalmineInfoDlg.data.id;
//                 if (id != null) {
//                     window.open(window.location.origin + '/system/preview/file/' + id);
//                 } else {
//                     parent.layer.msg('请先上传文件', {time: 1000});
//                 }
//                 return false;
//             });
//             if (!SpottableHistoricalmineInfoDlg.data.id) {
//                 SpottableHistoricalmineInfoDlg.data.id = res.data.fileId;
//                 SpottableHistoricalmineInfoDlg.data.fileids = res.data.fileId;
//             } else {
//                 SpottableHistoricalmineInfoDlg.data.fileids = SpottableHistoricalmineInfoDlg.data.fileids + ";" + res.data.fileId;
//             }
//         },
//         allDone: function (obj) {
//             //多文件上传完毕后的状态回调
//             layer.close(loadingIndex);
//             // parent.layer.closeAll();
//             parent.layer.msg('上传成功', {time: 1000});
//             if (!SpottableHistoricalmineInfoDlg.actionType) {
//                 SpottableHistoricalmineInfoDlg.actionType = "add";
//             }
//             var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/" + SpottableHistoricalmineInfoDlg.actionType, 'post', function (data) {
//                 SpottableHistoricalmineInfoDlg.actionType = "edit";
//             }, function (data) {
//
//             });
//             fileid1 = SpottableHistoricalmineInfoDlg.data.id;
//             // ajax.set(SpottableHistoricalmineInfoDlg.data);
//             // ajax.start();
//         },
//         error: function () {                         //传输失败的回调
//             //请求异常回调
//         }
//     });
//
//
//     /**
//      * 预览PDF文件
//      */
//     var lsylInfo = {
//         tableId: "lsylInfoTable"
//     };
//     lsylInfo.downPDF = function () {
//         var businesstype = '6'
//         var associateid = result.data.associateid;
//         if (associateid) {
//             window.open(window.location.origin + '/system/preview/file/' + associateid + ',' + businesstype);
//         } else {
//             Feng.error("未找到方案文件！")
//         }
//     };
// // 预览pdf按钮点击事件
//     $('#projectPDFBtn').click(function () {
//         lsylInfo.downPDF();
//     });


    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        data.field.fyjd = 0;
        if (curNode == '2'){
            data.field.psbhjd = 1;
        }
        var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/check", 'post', function (data) {
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