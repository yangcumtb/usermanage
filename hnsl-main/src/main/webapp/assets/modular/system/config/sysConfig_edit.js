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
    var ajax = new HttpRequest(Feng.ctxPath + "/system/config/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    form.val('sysConfigForm', result.data);
    if (result.data.code == "HNSL_LSYLFILE_NAME") {
        $("#a1").css("display","none")
        $("#a2").css("display","none")
        $("#a3").css("display","none")
        $("#a4").css("display","none")
        $("#value").css("display", "none")
        $("#valuefile1").css("display", "")
        $("#changename").html("文件清单")
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


    //初始化字典选择框
    var activeDictSelect = function () {
        $("#dictCodeDiv").show();
        $("#customCodeDiv").hide();
        status = "dict";

        //初始化所有字典类型
        $("#dictTypeId").html('<option value="">请选择系统字典类型</option>');
        var ajax = new HttpRequest(Feng.ctxPath + "/system/dictType/listTypes",'get', function (data) {

            for (var i = 0; i < data.data.length; i++) {
                var dictTypeId = data.data[i].dictTypeId;
                var name = data.data[i].name;
                var code = data.data[i].code;
                $("#dictTypeId").append('<option value="' + dictTypeId + '">' + code + '--' + name + '</option>');
            }
            form.render();

        }, function (data) {
        });
        ajax.start();
    };

    //初始化非字典选择
    var activeCustomSelect = function () {
        $("#dictCodeDiv").hide();
        $("#customCodeDiv").show();
        status = "custom";
    };

    //更新字典详情列表
    var updateDictDetail = function (dictTypeId, activeCode) {
        $("#dictDetails").html('');
        var ajax = new HttpRequest(Feng.ctxPath + "/system/dict/listDicts",'get', function (data) {

            for (var i = 0; i < data.data.length; i++) {
                var name = data.data[i].name;
                var code = data.data[i].code;

                if (activeCode === code) {
                    $("#dictDetails").append('<input type="radio" name="dictValue" value="' + code + '" title="' + name + '" checked="checked">');
                } else {
                    $("#dictDetails").append('<input type="radio" name="dictValue" value="' + code + '" title="' + name + '">');
                }

            }
            form.render();

        }, function (data) {
        });
        ajax.set("dictTypeId", dictTypeId);
        ajax.start();
    };

    //监听单选切换
    form.on('radio(dictChecked)', function (data) {
        if (data.value === "Y") {
            activeDictSelect();
        } else {
            activeCustomSelect();
        }
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        if (result.data.code == "HNSL_LSYLFILE_NAME") {
            data.field.value = Value.getValue('nameStr');
        } else if (status === "dict") {

            var radio = $('input:radio[name="dictValue"]:checked').val();

            if (!$("#dictTypeId").val() || !radio) {
                Feng.error("请选择具体字典！");
                return false;
            }
        } else {
            if (!$("#value").val()) {
                Feng.error("请填写参数值！");
                return false;
            }
        }

        var ajax = new HttpRequest(Feng.ctxPath + "/system/config/edit",'post', function (data) {
            Feng.success("更新成功！");
            // window.location.href = Feng.ctxPath + '/system/config'
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    //监听字典选择
    form.on('select(dictTypeId)', function (data) {

        var dictTypeId = data.value;

        //初始化字典详细列表
        updateDictDetail(dictTypeId);

    });

    //返回按钮
    $("#backupPage").click(function () {
        // window.location.href = Feng.ctxPath + '/system/config'
        admin.closeThisDialog();
    });

    //如果当前配置是带字典类型，则初始化字典类型选择
    if (result.data.dictFlag === 'Y') {
        activeDictSelect();

        //更新选项
        $("#dictTypeId").val(result.data.dictTypeId);
        form.render();

        //更新字典类型的详情
        updateDictDetail(result.data.dictTypeId, result.data.value);
    } else {
        activeCustomSelect();
    }

    //如果是系统类型，则不能改变取值范围和字典类型
    if(result.data.code.indexOf('GUNS_') === 0){
        $("[name='dictFlag']").attr("disabled","disabled");
        $("#dictTypeId").attr("disabled","disabled");
        form.render();
    }
});