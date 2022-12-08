/**
 * 详情对话框
 */
var SpottableHistoricalmineInfoDlg = {
    data: {
        fileids: '',
        dq: '',
        xmmc: '',
        kfy: '',
        kfx: '',
        zlnd: '',
        xflx: '',
        yszzj: '',
        sbzj: '',
        mj: '',
        bz: '',
        tbbh: '',
        id: '',
        filenames: '',
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects', 'layarea', 'xmSelect', 'func'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var xmSelect = layui.xmSelect;
    var func = layui.func;

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
        console.log(data)
        func.open({
            width: "1000rem",
            title: '历史遗留矿山详情',
            // height: '650',
            content: Feng.ctxPath + '/spot/lsyl/detailHtml?id=' + data,
        });
    };

//多选
//     var Includingfiles = xmSelect.render({
//         el: '#includingfiles',
//         theme: {
//             color: '#8799a3',
//         },
//         autoRow: true,
//         disabled: true,
//         data: [
//             {name: '生态修复', value: '生态修复', selected: false},
//             {name: '文件2', value: '文件2', selected: false},
//             {name: '文件3', value: '文件3', selected: false},
//         ]
//     });
    var ajax = new HttpRequest(Feng.ctxPath + "/lsylProject/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    //包含文件回显
    // if (result.data.includingfiles != null) {
    //     var includef = result.data.includingfiles.split(',');
    //     Includingfiles.setValue(includef);
    // }
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
            if ( FileTYPE[i] != 10 ) {
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
    form.val('lsylInfoTable', result.data);

    //根据回显数据展示所需字段
    if (result.data.xflx == '生态修复' || result.data.xflx == '辅助再生') {
        $('#Province').css('display', '');
    } else {
        $('#Province').css('display', 'none');
    }


});