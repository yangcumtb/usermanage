/**
 * 详情对话框
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
        geoJsonAfterRepair: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'layarea', 'formSelects', 'carousel','xmSelect'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layarea = layui.layarea;
    var carousel = layui.carousel;
    var xmSelect = layui.xmSelect;

    layarea.render({
        elem: '#area-picker1',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    })
    var stwt = xmSelect.render({
        el: '#stwt',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        data: [
            {name: '土地损毁', value: 1,selected:false},
            {name: '地质环境问题', value: 2,selected:false},
            {name: '植被破坏', value: 3,selected:false},
        ],
    });
    var sddl = xmSelect.render({
        el: '#sddl',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        data: [
            {name: '耕地', value: 1,selected:false},
            {name: '园地', value: 2,selected:false},
            {name: '林地', value: 3,selected:false},
            {name: '草地', value: 4,selected:false},
            {name: '商服用地', value: 5,selected:false},
            {name: '工矿仓储用地', value: 6,selected:false},
            {name: '住宅用地', value: 7,selected:false},
            {name: '公共管理与公共服务用地', value: 8,selected:false},
            {name: '特殊用地', value: 9,selected:false},
            {name: '交通运输用地', value: 10,selected:false},
            {name: '水域及水利设施用地', value: 11,selected:false},
            {name: '其他土地', value: 12,selected:false},
            {name: '城镇村及工矿用地', value: 13,selected:false},
        ],
    });
    var ghxffs = xmSelect.render({
        el: '#ghxffs',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        data: [
            {name: '平整场地', value: 1,selected:false},
            {name: '削放坡', value: 2,selected:false},
            {name: '客土', value: 3,selected:false},
            {name: '种植乔（灌）木', value: 4,selected:false},
            {name: '播种草籽', value: 5,selected:false},
            {name: '截（排）水', value: 6,selected:false},
            {name: '网围栏', value: 7,selected:false},
            {name: '警示牌', value: 8,selected:false},
            {name: '挡土墙', value: 9,selected:false},
            {name: '其他', value: 10,selected:false},
        ],
    });

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/damagespot/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    if (result.data.damagespotParam.shsjq != null) {
        result.data.damagespotParam.shsjq = result.data.damagespotParam.shsjq.substr(0, 7);
    }
    if (result.data.damagespotParam.shsjz != null) {
        result.data.damagespotParam.shsjz = result.data.damagespotParam.shsjz.substr(0, 7);
    }
    if (result.data.damagespotParam.nxfsj != null) {
        result.data.damagespotParam.nxfsj = result.data.damagespotParam.nxfsj.substr(0, 10);
    }
    if (result.data.damagespotParam.ghyssj != null) {
        result.data.damagespotParam.ghyssj = result.data.damagespotParam.ghyssj.substr(0, 10);
    }
    if (result.data.damagespotParam.sddlV != null) {
        sddl.setValue(result.data.damagespotParam.sddlV.split(','));
    }
    if (result.data.damagespotParam.stwtV != null) {
        stwt.append(result.data.damagespotParam.stwtV.split(','));
    }
    if (result.data.damagespotParam.ghxffsV != null) {
        ghxffs.append(result.data.damagespotParam.ghxffsV.split(','));
    }
    if (result.data.damageCheckParam != null){
        form.val('damageCheckForm', result.data.damageCheckParam);
        $("#damageCheckForm").css("display", "");
        if (result.data.damageCheckParam.hcshlx != null) {
            var hcshlx = result.data.damageCheckParam.hcshlx;
            if (hcshlx == "WS") {
                $("#hcws").css("display", "")
            } else if (hcshlx == "TX") {
                $("#hctx").css("display", "")
            } else if (hcshlx == "YZ") {
                $("#hcyz").css("display", "")
            }
            console.log("damage");
        }
    }
    if (result.data.recoverCheckParam != null){
        form.val('recoveredCheckForm', result.data.recoverCheckParam);
        $("#recoveredCheckForm").css("display", "");
        console.log("recovered");
    }
    if (result.data.recoverCheckParam == null && result.data.damageCheckParam == null) {
        $("#alarm").css("display","");
    }
    form.val('damageSpotForm', result.data.damagespotParam);
    var dshlx = result.data.damagespotParam.shlx;
//获取数据库数据回显

    if (dshlx == "WS") {
        $("#ws").css("display", "")
    } else if (dshlx == "TX") {
        $("#tx").css("display", "")
    } else if (dshlx == "YZ") {
        $("#yz").css("display", "")
    }
    // if (dztblx == "3") {
    //     $("#dz2").css("display", "");
    //     $("#dzyhlx").attr("lay-verify", "required");
    // } else {
    //     $("#dz2").css("display", "none");
    //     $("#dzyhlx").attr("lay-verify", "");
    // }
    // if (hdz == "3") {
    //     $("#dz2").css("display", "");
    //     $("#dzyhlx").attr("lay-verify", "required");
    // } else {
    //     $("#dz2").css("display", "none");
    //     $("#dzyhlx").attr("lay-verify", "");
    // }
});