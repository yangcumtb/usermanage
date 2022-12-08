/**
 * 详情对话框
 */
var PcloseInfoDlg = {
    data: {
        id: "",
        xzs: "",
        xzx: "",
        wz: "",
        tbmj: "",
        kfx: "",
        kfy: "",
        shlx: "",
        tbsx: "",
        sddl: "",
        syq: "",
        shyq: "",
        ydsx: "",
        kqbh: "",
        kqqxq: "",
        kqqxz: "",
        kqmc: "",
        xmdw: "",
        kz: "",
        kcfs: "",
        zrzt: "",
        gbsj: "",
        zlqk: "",
        zlmj: "",
        nxfsj: "",
        xczp: "",
        hcdw: "",
        hcry: "",
        hcrq: "",
        qtdz: "",
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
        elem: "#gbsj",
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
    laydate.render({
        elem: "#xfsj",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#nxfsj",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#kqqxq",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#kqqxz",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    form.on('select(select-shlx)', function (data) {
        $("#shlx").val(data.value);
    });
    form.on('select(select-kz)', function (data) {
        $("#kz").val(data.value);
    });
    form.on('select(select-tbsx)', function (data) {
        $("#tbsx").val(data.value);
    });
    form.on('select(select-sddl)', function (data) {
        $("#sddl").val(data.value);
    });
    form.on('select(select-zlqk)', function (data) {
        $("#zlqk").val(data.value);
    });
    form.on('select(select-kcfs)', function (data) {
        $("#kcfs").val(data.value);
    });
    form.on('select(select-ydsx)', function (data) {
        $("#ydsx").val(data.value);
    });
    form.on('select(select-shyq)', function (data) {
        $("#shyq").val(data.value);
    });
    form.on('select(select-syq)', function (data) {
        $("#syq").val(data.value);
    });
    form.on('select(select-ysjl)', function (data) {
        $("#ysjl").val(data.value);
    });
    form.on('select(select-fkfx)', function (data) {
        $("#fkfx").val(data.value);
    });
    form.verify({
        J: [/^[\S]{0,7}$/, '中心点经度应不超过6位数字，且不能出现空格'],
        W: [/^[\S]{0,7}$/, '中心点纬度应不超过6位数字，且不能出现空格'],
        Z: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '面积需为正数，请重新输入'],
        L: [/^[0-9]*$/, '输入错误，请输入数字']
    });
    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/spot/pclose/detail?id=" + Feng.getUrlParam("id"),"get");
    var result = ajax.start();
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
    if (result.data.kqqxz!= null) {
        result.data.kqqxz = result.data.kqqxz.substr(0, 10);
    }
    if (result.data.kqqxq!= null) {
        result.data.kqqxq = result.data.kqqxq.substr(0, 10);
    }
    form.val('pcloseInfoForm', result.data);

    //表单提交事件
    form.on('submit(submit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/spot/pclose/edit",'post', function (data) {
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