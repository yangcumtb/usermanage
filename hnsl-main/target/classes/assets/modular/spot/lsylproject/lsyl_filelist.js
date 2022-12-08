/**
 * 详情对话框
 */
var SysConfigInfoDlg = {
    data: {
        name: "",
        dictFlag: "",
        code: "",
        value: "",
        remark: "",
        createTime: "",
        createUser: "",
        updateTime: "",
        updateUser: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest','xmSelect'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var xmSelect = layui.xmSelect;

    //历史遗留清单的多选
    var Value = xmSelect.render({
        el: '#valuefile1',
        autoRow: true,
        toolbar:{
            show: true,
        },
        filterable: true,
        pageSize:3,
        paging: true,
        disabled: true,
        create: function(val, arr){
            if(arr.length === 0){
                return {
                    name: val,
                    value: val
                }
            }
        },
        data: [
            {name: '专家验收意见', value: "专家验收意见"},
            {name: '项目实施方案', value: "项目实施方案"},
            {name: '项目设计书', value: "项目设计书"},
            {name: '审查意见', value: "审查意见"},
            {name: '项目开工前卫星(航飞)高清影像(标注治理区范图)', value: "项目开工前卫星(航飞)高清影像(标注治理区范图)"},
            {name: '项目竣工后卫星(航飞)高清影像(标注治理区范图)', value: "项目竣工后卫星(航飞)高清影像(标注治理区范图)"},
            {name: '项目变更调整批准意见', value: "项目变更调整批准意见"},
            {name: '项目竣工报告', value: "项目竣工报告"},
            {name: "项目监理报告", value: "项目监理报告"},
            {name: '2020年度闭坑矿山治理工作总结', value: "2020年度闭坑矿山治理工作总结"},
            {name: '技术复核报告', value: "技术复核报告"},
            {name: '项目预算指标文', value: "项目预算指标文"},
            {name: '项目计划或任务书', value: "项目计划或任务书"},
            {name: '开工报告', value: "开工报告"},
            {name: '施工日志', value: "施工日志"},
            {name: '工程竣工图', value: "工程竣工图"},
            {name: '施工总结', value: "施工总结"},
            {name: '工程参建单位相应的资质复印件', value: "工程参建单位相应的资质复印件"}
        ]
    })

    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/system/config/detail?id=15", "get");
    var result = ajax.start();
    if (result.data.code == "HNSL_LSYLFILE_NAME") {
        if (result.data.value != null && result.data.value != "") {
            var bha = [];
            var bh = result.data.value.split(',');
            var L = bh.length;
            for (var i = 0; i < L; i++) {
                if (bh[i] != '') {
                    var Obj = new Object();
                    Obj.name = bh[i];
                    Obj.value = bh[i];
                    Obj.selected = "false";
                    bha.push(Obj);
                }
            }
            Value.update({
                data: bha
            })
            Value.append(bh);
        }
    }

});