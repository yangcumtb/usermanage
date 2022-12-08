/**
 * 添加或者修改页面
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
        // geoJsonBorder: "",
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
        fileids: "",
        pssj_xs: "",
        scnldw: ""

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
    let fileid1;
    let associateId;

    let fileListView = $('#FileList');
    var today = (new Date()).toLocaleDateString();
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    })
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
        max: '2080-10-14',
        type: 'date',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#dqsj",
        max: '2080-10-14',
        type: 'date',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#yssj",
        max: '2080-10-14',
        type: 'date',
        trigger: 'click',
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

    form.verify({
        A: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '面积需为正数，请重新输入'],
        B: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '经费需为正数，请重新输入'],
    });
    let data = {};
    $("#btnnext").click(function () {
        element.tabChange('demo', '2');
        $("#twoOneSolutionForm").css("height", "700px");
        $("#tabpages").css("height", "700px");
        let value = $('#twoOneSolutionForm').serializeArray();
        $.each(value, function (index, item) {
            data[item.name] = item.value;
        });
        console.log(data)
    });
    $("#close").click(function () {
        element.tabChange('demo', '1');
        $("#twoOneSolutionForm").css("height", "1600px");
        $("#tabpages").css("height", "1550px");
        setTimeout(function () {
            if (data.length != 0) {
                console.log(data);
                form.val("twoOneSolutionForm", JSON.parse(JSON.stringify(data)));
            }
            data = {};
        }, 100);
    });
    var Span = document.getElementsByTagName("span");
    console.log(Span);

    //监听
    form.on('select(fazt)', function (data) {
        if (data.value == 2) {
            console.log('1')
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
            for (i = 0; i <Span.length; i++) {
                Span[i].style.display = "none";
            }
        } else{
            console.log('1')
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
                console.log('1')
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
//传方案文件
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
                        tr.remove();
                        delete files[index]; //删除对应的文件
                        console.log(index)
                        uploadSchemeListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        var L = Object.keys(files).length;
                        if (L == 0 ) {
                            console.log("close")
                            $("#uploadAction").attr("disabled","disabled")
                        }
                    };
                    Feng.confirm(" 是否删除? ", operation);
                    return false;
                });

                //预览
                tr.find('.demo-preview').on('click', function () {
                    var id = TwoInOneSolutionInfoDlg.data.id;
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
                if (Id != null) {
                    window.open(window.location.origin + '/spotmanage/system/preview/file/' + Id);
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
        if (data.field.fazt == "2") {
            TwoInOneSolutionInfoDlg.actionType = "add"
        }
        data.field.kscl = data.field.kscl + data.field.kcldw;
        delete data.field.kcldw;
        data.field.pssjXs = day;
        if (TwoInOneSolutionInfoDlg.actionType === "add") {
            var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/twoInOneSolution/" + TwoInOneSolutionInfoDlg.actionType, 'post', function (data) {
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
            data.field.id = TwoInOneSolutionInfoDlg.data.id;
            data.field.fileids = TwoInOneSolutionInfoDlg.data.fileids;
            ajax.set(data.field);
            ajax.start();
            return false;
        } else {
            layer.msg('请上传文件', {time: 1000},)
            return false;
        }

    });

});