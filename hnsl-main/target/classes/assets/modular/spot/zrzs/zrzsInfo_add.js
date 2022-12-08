/**
 * 添加或者修改页面
 */
var  SpottableZrzsInfoDlg = {
    data: {
        id: "",
        xzs: "",
        xzx: "",
        hdmj: "",
        wz: "",
        kfx: "",
        kfy: "",
        fkywr: "",
        stwt: "",
        zlqk: "",
        zlmj: "",
        nxfsj: "",
        xczp: "",
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
        damagetime:""
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
        elem: "#damagetime",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#hcrq",
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
    form.on('select(select-stwt)', function (data) {
        $("#stwt").val(data.value);
    });

    form.on('select(select-zlqk)', function (data) {
        $("#zlqk").val(data.value);
    });

    form.on('select(select-xzs)', function (data) {
        $("#xzs").val(data.value);
    });

    form.on('select(select-xzx)', function (data) {
        $("#xzx").val(data.value);
    });

    form.on('select(select-xfzt)', function (data) {
        $("#xfzt").val(data.value);
    });
    form.on('select(select-ysjl)', function (data) {
        $("#ysjl").val(data.value);
    });
    laydate.render({
        elem: "#nxfsj",
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    form.verify({
        A: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '面积需为正数，请重新输入'],
        // B: [/^[\S]{0,7}$/, '中心点纬度应不超过6位数字，且不能出现空格'],
        // C: [/^[\S]{0,7}$/, '中心点纬度应不超过6位数字，且不能出现空格'],
        D: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '面积需为正数，请重新输入'],
        E: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '总投资额需为正数，请重新输入'],
    });

    //表单提交事件
    form.on('submit(submit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/spot/zrzs/add",'post', function (data) {
            Feng.success("添加成功！");
            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);
            //关掉对话框
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("添加失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });


});
