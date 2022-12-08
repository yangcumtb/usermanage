/**
 * 驳回方案重新送审
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
    var xmSelect = layui.xmSelect;
    var func = layui.func;
    var laydate = layui.laydate;
    var element = layui.element;
    var upload = layui.upload;
    let fileid1;
    let associateId;

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
    //
    //
    //图斑查看弹窗
    function PolygenDetail(data) {
        func.open({
            width: "1000rem",
            title: '历史遗留矿山详情',
            // height: '650',
            content: Feng.ctxPath + '/spot/lsyl/detailHtml?id=' + data,
        });
    };
    var today = (new Date()).toLocaleDateString();
    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    // 根据用户等级判断是否有权限操作
    if (result.data.curUserLevel == 4 ) {
        // Feng.success("已驳回，无权限操作");
        //关闭当前窗窗口
        var index = parent.layer.getFrameIndex(window.name); //获取当前窗口的name

        parent.layer.close(index);//关闭窗口
        parent.layer.msg('已驳回，无权限操作', {icon: 4});
    } else if (result.data.curUserLevel == 3){
        //通过有无县级初审时间，判断是否为市级立项
        var xs_time = result.data.pssjXs
        if (xs_time != null){
            // Feng.success("已驳回，无权限操作");
            //关闭当前窗窗口
            var index = parent.layer.getFrameIndex(window.name); //获取当前窗口的name
            parent.layer.close(index);//关闭窗口

            parent.layer.msg('已驳回，无权限操作', {icon: 4});}

    }
    //包含文件回显
    if (result.data.includingfiles != null) {
        var includef = result.data.includingfiles.split(',');
        Includingfiles.setValue(includef);
    }
    //图斑表格回显
    if (result.data.tbbh != null) {
        var PolygonIDs = result.data.tbbh.split(',');
        var Len = PolygonIDs.length;
        for (var i = 0; i < Len; i++) {
            if (PolygonIDs[i] != '') {
                var Polygonlist = $(['<tr id="upload-' + [i] + '">'
                    , '<td>' + PolygonIDs[i] + '</td>'
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
    form.val('lsylInfoForm', result.data);


    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/re_check", 'post', function (data) {
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