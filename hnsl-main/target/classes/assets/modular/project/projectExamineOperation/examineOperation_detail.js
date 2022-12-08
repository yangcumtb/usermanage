var ExamineOperationInfoDlg = {
    data: {
        xmmc: "",
        xtj: "",
        sys: "",
        sjys: "",
        pdfsc: "",
        sbyy: "",
        zjyjsc: "",
        yjsbyy: "",
        bhyj: "",
        yshgz: "",
        hgzsbyy: "",
        zjyjup: "",
        zjyjsbyy: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var ExamineOperationCopy1 = {
        tableId: "finalCheckJsxmCopy1Table",
        queryData: {}
    };

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/project/examine/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    console.log(result.data);
    console.log(Feng.getUrlParam("id"));
    form.val('finalCheckJsxmCopy1Form', result.data);
    /**
     * 预览PDF文件
     */
    ExamineOperationCopy1.downPDF = function (data) {
        var Id = result.data.id;
        if (Id) {
            window.open(window.location.origin + '/system/preview/file/' + Id);
        }
    };

    /**
     * 预览评审意见文件
     */
    ExamineOperationCopy1.downYJ = function (data) {
        var Id = result.data.id;
        if (Id) {
            window.open(window.location.origin + '/system/preview/file/' + Id);
        }
    };



    // 方案评审PDF预览按钮点击事件
    $('#projectPDFBtn').click(function () {

        ExamineOperationCopy1.downPDF();

    });

    // 方案评审意见预览按钮点击事件
    $('#firstAdPDFBtn').click(function () {

        ExamineOperationCopy1.downYJ();

    });

    form.val('examineOperationForm', result.data);
    var data0 = result.data;
    var data1 = data0.xtj;
    var data2 = data0.sys;
    var data3 = data0.sjys;

    if (data1 == 1){
        if (data2 == 1){
            if (data3 ==1){
                var li =document.getElementById('1');
                li.className = 'done';
                var li =document.getElementById('2');
                li.className = 'done';
                var li =document.getElementById('3');
                li.className = 'done';
                var li =document.getElementById('4');
                li.className = 'done';
            }
            else {
                var li =document.getElementById('1');
                li.className = 'done';
                var li =document.getElementById('2');
                li.className = 'current_prev';
                var li =document.getElementById('3');
                li.className = 'current';
                var li =document.getElementById('4');
                li.className = 'last';
            }
        } else {
            var li =document.getElementById('1');
            li.className = 'current_prev';
            var li =document.getElementById('2');
            li.className = 'current';
            var li =document.getElementById('3');
            li.className = ' ';
            var li =document.getElementById('4');
            li.className = 'last';
        }
    }
    else {
        var li =document.getElementById('1');
        li.className = ' ';
        var li =document.getElementById('2');
        li.className = ' ';
        var li =document.getElementById('3');
        li.className = ' ';
        var li =document.getElementById('4');
        li.className = ' ';
    }

});