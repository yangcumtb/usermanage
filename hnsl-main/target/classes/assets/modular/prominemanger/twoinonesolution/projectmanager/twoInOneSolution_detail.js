/**
 * 详情对话框
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
        ysjl: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects', 'layarea'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layer = layui.layer;
    var layarea = layui.layarea;
    var laydate = layui.laydate;

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
        elem: "#kqq",
        max: '2080-10-14',
        type: 'year',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#kqz",
        max: '2080-10-14',
        type: 'year',
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
        elem: "#yssj",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    var Span = document.getElementsByTagName("span");
    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/twoInOneSolution/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    if (result.data.kqq != null) {
        result.data.kqq = result.data.kqq.substring(0, 4)
    }
    if (result.data.kqz != null) {
        result.data.kqz = result.data.kqz.substring(0, 4)
    }
    if (result.data.scnldw != null) {
        if (result.data.scnl != null) {
            result.data.scnl = result.data.scnl + result.data.scnldw
        }
        if (result.data.sjscnl != null) {
            result.data.sjscnl = result.data.sjscnl + result.data.scnldw
        }
    }
    form.val('twoInOneSolutionForm', result.data);
    //回显
    if (result.data.fazt == 2) {
        $("#m").css("display","none");
        $("#b").css("display","none");
        for (i = 0; i <Span.length; i++) {
            Span[i].style.display = "none";
        }
    }else {
        $("#m").css("display","");
        $("#b").css("display","");
        for (i = 0; i <Span.length; i++) {
            Span[i].style.display = " ";
        }
    }


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
            window.open(window.location.origin + '/spotmanage/system/preview/file/' + associateid + ',' + businesstype);
        } else {
            Feng.error("未找到方案文件！")
        }
    };
    // 预览pdf按钮点击事件
    $('#projectPDFBtn').click(function () {
        TwoInOneSolution.downPDF();
    });


    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/twoInOneSolution/edit", 'post', function (data) {
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