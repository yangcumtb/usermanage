/**
 * 详情对话框
 */
var  ProductivemineInfoInfoDlg = {
    data: {
        ID: "",
        tBBH: "",
        xzs: "",
        xzx: "",
        wZ: "",
        tBMJ: "",
        kFX: "",
        kFY: "",
        sHLX: "",
        tBSX: "",
        sDDL: "",
        sYQ: "",
        sHYQ: "",
        yDSX: "",
        kQBH: "",
        kQQXQ: "",
        kQQXZ: "",
        kQMC: "",
        xMDW: "",
        kZ: "",
        kCFS: "",
        zLQK: "",
        zLMJ: "",
        nXFSJ: "",
        xCZP: "",
        hCDW: "",
        hCRY: "",
        hCRQ: "",
        qTDZ: "",
        sSZT: "",
        fKSJ: "",
        ySSJ: "",
        ySDW: "",
        ySJL: "",
        fKFX: "",
        fKYWR: "",
        zTTZ: "",
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
            //选择结果
            console.log(res);
        }
    });
    // 渲染时间选择框
    var today = (new Date()).toLocaleDateString();
    laydate.render({
        elem: "#hCRQ",
        // min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#fKSJ",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#ySSJ",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#xFSJ",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#nXFSJ",
        min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#kQQXQ",
        // min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#kQQXZ",
        // min: today,
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    form.verify({
        J: [/^[\S]{0,7}$/, '中心点经度应不超过6位数字，且不能出现空格'],
        W: [/^[\S]{0,7}$/, '中心点纬度应不超过6位数字，且不能出现空格'],
        Z: [/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, '面积需为正数，请重新输入'],
        L: [/^[0-9]*$/, '输入错误，请输入数字']
    });
    form.on('select(select-xzs)', function (data) {
        $("#xzs").val(data.value);
    });

    form.on('select(select-xzx)', function (data) {
        $("#xzx").val(data.value);
    });
    form.on('select(select-sHLX)', function (data) {
        $("#sHLX").val(data.value);
    });
    form.on('select(select-tBSX)', function (data) {
        $("#tBSX").val(data.value);
    });
    form.on('select(select-sDDL)', function (data) {
        $("#sDDL").val(data.value);
    });
    form.on('select(select-zLQK)', function (data) {
        $("#zLQK").val(data.value);
    });
    form.on('select(select-kCFS)', function (data) {
        $("#kCFS").val(data.value);
    });
    form.on('select(select-yDSX)', function (data) {
        $("#yDSX").val(data.value);
    });
    form.on('select(select-sHYQ)', function (data) {
        $("#sHYQ").val(data.value);
    });
    form.on('select(select-sYQ)', function (data) {
        $("#sYQ").val(data.value);
    });
    form.on('select(select-ySJL)', function (data) {
        $("#ySJL").val(data.value);
    });
    form.on('select(select-fKFX)', function (data) {
        $("#fKFX").val(data.value);
    });
    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/spot/productivemine/detail?iD=" + Feng.getUrlParam("iD"),"get");
    var result = ajax.start();
    if (result.data.hCRQ!= null) {
        result.data.hCRQ = result.data.hCRQ.substr(0, 10);
    }
    if (result.data.fKSJ!= null) {
        result.data.fKSJ = result.data.fKSJ.substr(0, 10);
    }
    if (result.data.ySSJ!= null) {
        result.data.ySSJ = result.data.ySSJ.substr(0, 10);
    }
    if (result.data.xFSJ!= null) {
        result.data.xFSJ = result.data.xFSJ.substr(0, 10);
    }
    if (result.data.nXFSJ!= null) {
        result.data.nXFSJ = result.data.nXFSJ.substr(0, 10);
    }
    if (result.data.kQQXQ!= null) {
        result.data.kQQXQ = result.data.kQQXQ.substr(0, 10);
    }
    if (result.data.kQQXZ!= null) {
        result.data.kQQXZ = result.data.kQQXZ.substr(0, 10);
    }
    form.val('productivemineForm', result.data);

    //表单提交事件
    form.on('submit(submit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/spot/productivemine/edit",'post', function (data) {
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
