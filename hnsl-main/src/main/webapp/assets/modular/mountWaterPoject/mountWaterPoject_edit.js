/**
 * 详情对话框
 */
var MountWaterPojectInfoDlg = {
    data: {
        id: "",
        zXmmc: "",
        gcXmmc: "",
        xmzjlx: "",
        xmjszq: "",
        jxmb: "",
        zygznr: "",
        xmdd: "",
        jd: "",
        wd: "",
        xmzrdw: "",
        zrrxm: "",
        bmzw: "",
        lxdh: "",
        zje: "",
        ptzj: "",
        zyzj: "",
        jzqk: "",
        ptzjly: "",
        tgzjdw: "",
        ylsje: "",
        gwsj: "",
        jcsj: "",
        zbdwsj: "",
        sjlxr: "",
        sjlxrdh: "",
        zbdwsg: "",
        sglxr: "",
        sglxrdh: "",
        zbdwjl: "",
        jllxr: "",
        jllxrdh: "",
        xmjdbfb: "",
        jzqk1: "",
        czwt: "",
        htydbftj: "",
        bfzj: "",
        ywcbf: "",
        ywcptbf: "",
        ywczybf: "",
        ybwbzj: "",
        ybwbxmsq: "",
        wbfyy: "",
        mqssjd: "",
        sjgcl: "",
        ywcgcl: "",
        wwcgcl: "",
        yjwgsj: "",
        createUser: "",
        createTime: "",
        updateUser: "",
        updateTime: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;


    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/mountWaterPoject/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    form.val('mountWaterPojectForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/mountWaterPoject/edit", 'post', function (data) {
            Feng.success("更新成功！");
            window.location.href = Feng.ctxPath + '/mountWaterPoject'
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function () {
        window.location.href = Feng.ctxPath + '/mountWaterPoject'
    });
});