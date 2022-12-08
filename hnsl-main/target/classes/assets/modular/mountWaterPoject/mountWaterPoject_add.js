/**
 * 添加或者修改页面
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


    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/mountWaterPoject/add", 'post', function (data) {
            Feng.success("添加成功！");
            window.location.href = Feng.ctxPath + '/mountWaterPoject'
        }, function (data) {
            Feng.error("添加失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function () {
        window.location.href = Feng.ctxPath + '/mountWaterPoject'
    });

});