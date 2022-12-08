/**
 * 详情对话框
 */
var SpottableJsxmInfoDlg = {
    data: {
        id: "",
        xzs: "",
        xzx: "",
        wz: "",
        kfx: "",
        kfy: "",
        hdmj: "",
        xmmc: "",
        jsdw: "",
        fkywr: "",
        ydsj: "",
        shlx: "",
        zlqk: "",
        nfksj: "",
        hcdw: "",
        hcry: "",
        hcrq: "",
        sszt: "",
        fksj: "",
        yssj: "",
        ysdw: "",
        ysjl: "",
        fkfx: "",
        zttz: "",
        base_admin: "",
        damagetime: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest','laydate','upload','formSelects','layarea'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layarea = layui.layarea;

    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            if (res.cityCode) {
                $("#base_admin").val(res.cityCode);
            }
            if (res.countyCode) {
                $("#base_admin").val(res.countyCode);
            }
        }
    });
   // 渲染时间选择框
    var today = (new Date()).toLocaleDateString();
    laydate.render({
        elem: "#hcrq",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#damagetime",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#fksj",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#yssj",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#xfsj",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#ydsj",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#nfksj",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    form.on('select(select-shlx)', function (data) {
        $("#shlx").val(data.value);
    });
    form.on('select(select-zlqk)', function (data) {
        $("#zlqk").val(data.value);
    });
    form.on('select(select-ysjl)', function (data) {
        $("#ysjl").val(data.value);
    });
    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/spot/jsxm/detail?id=" + Feng.getUrlParam("id"),"get");
    var result = ajax.start();
    if (result.data.ydsj!= null) {
        result.data.ydsj = result.data.ydsj.substr(0, 10);
    }
    if (result.data.nfksj!= null) {
        result.data.nfksj = result.data.nfksj.substr(0, 10);
    }
    if (result.data.xfsj!= null) {
        result.data.xfsj = result.data.xfsj.substr(0, 10);
    }
    if (result.data.yssj!= null) {
        result.data.yssj = result.data.yssj.substr(0, 10);
    }
    if (result.data.fksj!= null) {
        result.data.fksj = result.data.fksj.substr(0, 10);
    }
    if (result.data.hcrq!= null) {
        result.data.hcrq = result.data.hcrq.substr(0, 10);
    }
    form.val('jsxmInfoTable', result.data);

    //表单提交事件
    form.on('submit(submit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/spot/jsxm/edit",'post', function (data) {
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