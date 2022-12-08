var MineEnterpriseInfoDlg = {
    data: {
        id: "",
        qymc: "",
        frdb: "",
        qyxz: "",
        dwdz: "",
        ksmc: "",
        ckxkz: "",
        ckzh: "",
        lmzh: "",
        bfz: "",
        sfjgxy: "",
        sjlsylsl: ""
    }
};
layui.use(['table', 'admin', 'HttpRequest', 'layer', 'func', 'upload', 'jquery'], function () {
    var $ = layui.jquery
    var HttpRequest = layui.HttpRequest;
    var upload = layui.upload;
    var ajax = new HttpRequest(Feng.ctxPath + "/productivecheckreport/previewPdf?adcode=" + Feng.getUrlParam("adcode"));
    var result = ajax.start();
    console.log(result)
    //拖拽上传,限制大小为5m
    if (result.data.length == 0) {
        $("#re").css('display', "none")
        $("#up").css('display', "")
    } else {
        $("#up").css('display', "none")
        $("#re").css('display', "")
    }

    $(document).on('click', "#reload", function () {
        layer.msg("正在覆盖上传");
        $("#re").css('display', "none")
        $("#up").css('display', "")
    });

    upload.render({
        elem: '#pdfUpload'
        , url: Feng.ctxPath + '/productivecheckreport/uploadpdfreport?adcode=' + Feng.getUrlParam("adcode")
        , exts: 'jpg|jpeg|png|pdf'
        , size: 5120
        , done: function (res) {
            parent.layer.closeAll();
            Feng.success("上传成功！")
        }
    });
})