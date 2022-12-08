/**
 * 详情对话框
 */
var RecoveredspotInfoDlg = {
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
        zlmj: "",
        fksj: "",
        sszt: "",
        xffs: "",
        fkfx: "",
        fkywr: "",
        xczp: "",
        hcry: "",
        hcrq: "",
        qtdz: "",
        associateid: "",
        geoJsonBeforeRepair: "",
        geoJsonAfterRepair: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'layarea', 'laydate', 'upload', 'formSelects', 'layarea', 'xmSelect'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layarea = layui.layarea;
    var laydate = layui.laydate;
    var xmSelect = layui.xmSelect;
    var today = (new Date()).toLocaleDateString();
    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    });
    laydate.render({
        elem: "#fksj",
        max: '2080-10-14',
        type: 'date',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#yssj",
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
    var xffs = xmSelect.render({
        el: '#xffs',
        tips: '请选择（可多选)',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        data: [
            {name: '平整场地', value: '1', selected: false},
            {name: '削放坡', value: '2', selected: false},
            {name: '客土', value: '3', selected: false},
            {name: '种植乔（灌）木', value: '4', selected: false},
            {name: '播种草籽', value: '5', selected: false},
            {name: '截（排）水', value: '6', selected: false},
            {name: '网围栏', value: '7', selected: false},
            {name: '警示牌', value: '8', selected: false},
            {name: '挡土墙', value: '9', selected: false},
            {name: '其它', value: '10', selected: false},
        ],
    });
    var sddl = xmSelect.render({
        el: '#sddl',
        tips: '请选择（可多选)',
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
    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/recoveredspot/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    if (result.data.recoveredspotParam.fksj != null) {
        result.data.recoveredspotParam.fksj = result.data.recoveredspotParam.fksj.substr(0, 10);
    }
    if (result.data.recoveredspotParam.yssj != null) {
        result.data.recoveredspotParam.yssj = result.data.recoveredspotParam.yssj.substr(0, 10);
    }
    if (result.data.recoveredspotParam.sddlV) {
        sddl.append(result.data.recoveredspotParam.sddlV.split(','));
    }
    if (result.data.recoveredspotParam.xffsV) {
        xffs.append(result.data.recoveredspotParam.xffsV.split(','));
    }
    // form.val('recoveredspotForm', result.data.recoverCheckParam);
    form.val('recoveredspotForm', result.data.recoveredspotParam);


    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        data.field.xffs = xffs.getValue('nameStr');
        data.field.sddl = sddl.getValue('nameStr');
        data.field.xffsV = xffs.getValue('valueStr');
        data.field.sddlV = sddl.getValue('valueStr');
        var ajax = new HttpRequest(Feng.ctxPath + "/prominemanger/recoveredspot/edit", 'post', function (data) {
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