/**
 * 驳回方案重新送审
 */
var TwoInOneSolutionInfoDlg = {
    data: {
        id:"",
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
        ysjl: "",
        psjd: "",
        psbhjd: "",
        pssjXs: "",
        pssjXf: "",
        pssjC: "",
        pssjS: "",
        shjg: "",
        tjlx: "",
        bhyj: "",
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
        elem: "#kqnx",
        max: '2080-10-14',
        type: 'year',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#kqq",
        max: '2080-10-14',
        type: 'year',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#kqz",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
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
        elem: "#fwnx",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#yssj",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });

    //获取详情信息，填充表单
    var param=window.location.href;
    console.log(param);
    var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/twoInOneSolution/detail?id=" + Feng.getUrlParam("id"),"get");
    var result = ajax.start();
    result.data.kqq = result.data.kqq.substring(0,4)
    result.data.kqz = result.data.kqz.substring(0,4)
    form.val('twoInOneSolutionForm', result.data);

//意见文件上传
    var uploadSchemeListIns2 = upload.render({
        elem: 'projectPushPushPDFBtn'             //绑定元素
        , url: Feng.ctxPath + '/spot/schemaReviewFilesUpload'     //上传接口
        , elemList: $('#FileList')
        //*********************传输限制
        , size: 2048                   //传输大小
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
                    var id = TwoInOneSolutionInfoDlg.data.id;
                    if (id != null) {
                        window.open(window.location.origin + '/system/preview/file/' + id);
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
            var tr = fileListView.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
            tds.eq(4).html('<button class="layui-btn layui-btn-xs demo-preview ">预览</button>'
                + ' <button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>');
            tds.find('.demo-delete').on('click', function (data) {
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
                var id = TwoInOneSolutionInfoDlg.data.id;
                if (id != null) {
                    window.open(window.location.origin + '/system/preview/file/' + id);
                }else{
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
    /**
     * 预览PDF文件
     */
    var TwoInOneSolution = {
        tableId: "twoInOneSolutionTable"
    };
    TwoInOneSolution.downPDF = function () {
        var businesstype = '6'
        var associateid = result.data.associateid;
        if (associateid) {
            window.open(window.location.origin + '/system/preview/file/' + associateid + ',' + businesstype);
        } else {
            Feng.error("未找到方案文件！")
        }
    };

    /**
     * 预览意见文件
     */
    var TwoInOneSolution = {
        tableId: "twoInOneSolutionTable"
    };
    TwoInOneSolution.downIdeaPDF = function () {
        var businesstype = '6'
        var associateid = result.data.associateid;
        if (associateid) {
            window.open(window.location.origin + '/system/preview/file/' + associateid + ',' + businesstype);
        } else {
            Feng.error("未找到方案文件！")
        }
    };
// 预览pdf按钮点击事件
    $('#projectPDFBtn').click(function () {
        TwoInOneSolution.downPDF();
    });
    $('#IdeaPDFBtn').click(function () {
        TwoInOneSolution.downIdeaPDF();
    });





    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        data.field.psjd = 3;
        data.field.pssjXs = day;
        data.field.psbhjd = null;
        var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/twoInOneSolution/recheck", 'post', function (data) {
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