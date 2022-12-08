/**
 * 添加或者修改页面
 */
var DamagespotInfoDlg = {
    data: {
        id: "",
        tbmc: "",
        xzs: "",
        xzx: "",
        sukq: "",
        kqbh: "",
        tbmj: "",
        kfx: "",
        kfy: "",
        sddl: "",
        ydsx: "",
        shlx: "",
        shsjq: "",
        shsjz: "",
        wsfs: "",
        zdwssd: "",
        zdtxsd: "",
        jsmj: "",
        zdjssd: "",
        zdyzgd: "",
        ksdlcd: "",
        ksdlkd: "",
        ksdlcz: "",
        dztblx: "",
        dzyhlx: "",
        tbsx: "",
        stwt: "",
        fkywr: "",
        nxfsj: "",
        ghxffs: "",
        ghxfmj: "",
        fkfx: "",
        ghyssj: "",
        xczp: "",
        hcry: "",
        hcrq: "",
        qtdz: "",
        associateid: "",
        geoJsonBeforeRepair: "",
        geoJsonAfterRepair: "",
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'layarea', 'laydate', 'upload', 'formSelects', 'laydate', 'element', 'xmSelect'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layarea = layui.layarea;
    var layer = layui.layer;
    var upload = layui.upload;
    var element = layui.element;
    var xmSelect = layui.xmSelect;
    var today = (new Date()).toLocaleDateString();
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    })
    laydate.render({
        elem: "#shsjq",
        max: '2080-10-14',
        format: 'yyyy-MM',
        type: 'month',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#shsjz",
        max: '2080-10-14',
        format: 'yyyy-MM',
        type: 'month',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#nxfsj",
        max: '2080-10-14',
        type: 'date',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#ghyssj",
        max: '2080-10-14',
        type: 'date',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#hcrq",
        max: '2080-10-14',
        type: 'date',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    //多选
    var stwt = xmSelect.render({
        el: '#stwt',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        data: [
            {name: '土地损毁', value: 1, selected: false},
            {name: '地质环境问题', value: 2, selected: false},
            {name: '植被破坏', value: 3, selected: false},
        ],
    });
    var sddl = xmSelect.render({
        el: '#sddl',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        data: [
            {name: '耕地', value: '01', selected: false},
            {name: '园地', value: '02', selected: false},
            {name: '林地', value: '03', selected: false},
            {name: '草地', value: '04', selected: false},
            {name: '商服用地', value: '05', selected: false},
            {name: '工矿仓储用地', value: '06', selected: false},
            {name: '住宅用地', value: '07', selected: false},
            {name: '公共管理与公共服务用地', value: '08', selected: false},
            {name: '特殊用地', value: '09', selected: false},
            {name: '交通运输用地', value: '10', selected: false},
            {name: '水域及水利设施用地', value: '11', selected: false},
            {name: '其他用地', value: '12', selected: false},
            {name: '城镇村及工矿用地', value: '20', selected: false},
        ],
    });
    var ghxffs = xmSelect.render({
        el: '#ghxffs',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        data: [
            {name: '平整场地', value: 1, selected: false},
            {name: '削放坡', value: 2, selected: false},
            {name: '客土', value: 3, selected: false},
            {name: '种植乔（灌）木', value: 4, selected: false},
            {name: '播种草籽', value: 5, selected: false},
            {name: '截（排）水', value: 6, selected: false},
            {name: '网围栏', value: 7, selected: false},
            {name: '警示牌', value: 8, selected: false},
            {name: '挡土墙', value: 9, selected: false},
            {name: '其他', value: 10, selected: false},
        ],
    });
    //表单验证
    form.verify({
        Ndouble: [
            /^[1-9]\d*$/
            , '只能输入整数哦'
        ],
        One: [
            /^[0-9]+(\.[0,9])?$/, '保留一位小数'
        ],
        Two: [
            /^[0-9]+([.]\d{1,2})?$/, '保留两位小数'
        ],
        Eight: [
            /^[0-9]+([.]\d{1,8})?$/, '保留八位小数'
        ]
    });
    //监听修改
    form.on('select(shlx)', function (data) {
        if (data.value == 'WS') {
            $("#ws1").css("display", "");
            $("#wsfs").attr("lay-verify", "required");
            $("#ws2").css("display", "");
            $("#zdwssd").attr("lay-verify", "required");
            $("#tx1").css("display", "none");
            $("#zdtxsd").attr("lay-verify", "");
            $("#tx2").css("display", "none");
            $("#jsmj").attr("lay-verify", "");
            $("#tx3").css("display", "none");
            $("#zdjssd").attr("lay-verify", "");
            $("#yz1").css("display", "none");
            $("#zdyzgd").attr("lay-verify", "");
            $("#yz2").css("display", "none");
            $("#yzwlx").attr("lay-verify", "");
            $("#yz3").css("display", "none");
            $("#ksdlcd").attr("lay-verify", "");
            $("#yz4").css("display", "none");
            $("#ksdlkd").attr("lay-verify", "");
            $("#yz5").css("display", "none");
            $("#ksdlcz").attr("lay-verify", "");
            $("#yz6").css("display", "none");
            $("#jzwlx").attr("lay-verify", "");
            $("#damagespotForm").css("height", "1100px");

        } else if (data.value == 'TX') {
            $("#ws1").css("display", "none");
            $("#wsfs").attr("lay-verify", "");
            $("#ws2").css("display", "none");
            $("#zdwssd").attr("lay-verify", "");
            $("#tx1").css("display", "");
            $("#zdtxsd").attr("lay-verify", "required");
            $("#tx2").css("display", "");
            $("#jsmj").attr("lay-verify", "required");
            $("#tx3").css("display", "");
            $("#zdjssd").attr("lay-verify", "required");
            $("#yz1").css("display", "none");
            $("#zdyzgd").attr("lay-verify", "");
            $("#yz2").css("display", "none");
            $("#yzwlx").attr("lay-verify", "");
            $("#yz3").css("display", "none");
            $("#ksdlcd").attr("lay-verify", "");
            $("#yz4").css("display", "none");
            $("#ksdlkd").attr("lay-verify", "");
            $("#yz5").css("display", "none");
            $("#ksdlcz").attr("lay-verify", "");
            $("#yz6").css("display", "none");
            $("#jzwlx").attr("lay-verify", "");
            $("#damagespotForm").css("height", "1100px");

        } else if (data.value == 'YZ') {
            $("#ws1").css("display", "none");
            $("#wsfs").attr("lay-verify", "");
            $("#ws2").css("display", "none");
            $("#zdwssd").attr("lay-verify", "");
            $("#tx1").css("display", "none");
            $("#zdtxsd").attr("lay-verify", "");
            $("#tx2").css("display", "none");
            $("#jsmj").attr("lay-verify", "");
            $("#tx3").css("display", "none");
            $("#zdjssd").attr("lay-verify", "");
            $("#yz1").css("display", "");
            $("#zdyzgd").attr("lay-verify", "required");
            $("#yz2").css("display", "");
            $("#yzwlx").attr("lay-verify", "required");
            $("#yz3").css("display", "");
            $("#ksdlcd").attr("lay-verify", "required");
            $("#yz4").css("display", "");
            $("#ksdlkd").attr("lay-verify", "required");
            $("#yz5").css("display", "");
            $("#ksdlcz").attr("lay-verify", "required");
            $("#yz6").css("display", "");
            $("#jzwlx").attr("lay-verify", "");
            $("#damagespotForm").css("height", "1200px");
        }  else {
            $("#damagespotForm").css("height", "1100px");
        }
    });
    form.on('select(dztblx)', function (data) {
        if (data.value == "3") {
            $("#dz2").css("display", "");
            $("#dzyhlx").attr("lay-verify", "required");
        } else {
            $("#dz2").css("display", "none");
            $("#dzyhlx").attr("lay-verify", "");
        }
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        /**
         * 获取表单数据之后，对损毁时间进行处理，以适应后端Date类型的传值要求
         */
        if (data.field.shsjq != "") {
            data.field.shsjq = data.field.shsjq + "-" + "01";
        }
        if (data.field.shsjz != "") {
            data.field.shsjz = data.field.shsjz + "-" + "01";
        }
        data.field.ghxffs = ghxffs.getValue('nameStr');
        data.field.sddl = sddl.getValue('nameStr');
        data.field.stwt = stwt.getValue('nameStr');
        data.field.ghxffsV = ghxffs.getValue('valueStr');
        data.field.sddlV = sddl.getValue('valueStr');
        data.field.stwtV = stwt.getValue('valueStr');
        var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/damagespot/add", 'post', function (data) {
            if (data.code == "500") {
                Feng.error("添加失败！" + data.message)
            } else {
                Feng.success("添加成功！");
                //传给上个页面，刷新table用
                admin.putTempData('formOk', true);
                //关掉对话框
                admin.closeThisDialog();
            }
        }, function (data) {
            Feng.error("添加失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });


});