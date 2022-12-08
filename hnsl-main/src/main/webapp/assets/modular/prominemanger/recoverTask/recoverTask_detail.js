/**
 * 详情对话框
 */
var RecoverTaskInfoDlg = {
    data: {
        id: "",
        kqbh: "",
        zldx: "",
        kssj: "",
        jssj: "",
        zygc: "",
        gcl: "",
        zlmj: "",
        fkmj: "",
        createUser: "",
        createTime: "",
        updateUser: "",
        updateTime: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'layarea', 'laydate', 'upload', 'formSelects','xmSelect'], function () {
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
        elem: "#kssj",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#jssj",
        max: '2080-10',
        type: 'month',
        done: function (value, date, endDate) {

        }
    });
    //多选
    var zygc = xmSelect.render({
        el: '#zygc',
        tips: '请选择（可多选)',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        data: [
            {name: '平整场地', value: '1',selected:false},
            {name: '削放坡', value: '2',selected:false},
            {name: '客土', value: '3',selected:false},
            {name: '种植乔（灌）木', value: '4',selected:false},
            {name: '播种草籽', value: '5',selected:false},
            {name: '截（排）水', value: '6',selected:false},
            {name: '网围栏', value: '7',selected:false},
            {name: '警示牌', value: '8',selected:false},
            {name: '挡土墙', value: '9',selected:false},
            {name: '其它', value: '10',selected:false},
        ],
    });
    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/recoverTask/detail?id=" + Feng.getUrlParam("id"),"get");
    var result = ajax.start();
    if (result.data.zygcv) {
        zygc.append(result.data.zygcv.split(','));
    }
    form.val('recoverTaskForm', result.data);

/*    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/recoverTask/edit", 'post', function (data) {
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
    });*/

});
