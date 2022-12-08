layui.use(['table', 'admin', 'HttpRequest', 'func', 'tree', 'form'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;
    var tree = layui.tree;

    /**
     * 河流信息管理
     */
    var User = {
        tableId: "userTable"
    };

    var _data = admin.getLayerData()._data;

    var _userIds = ""

    for (let i = 0; i < _data.length; i++) {
        _userIds = _userIds + _data[i].value + ","
    }

    var queryData = {
        name: "",
        userIds: _userIds
    };

    if (_data.length != 0) {
        $(".more-check").removeClass("layui-btn-disabled").attr("disabled", false);
    }

    User.onClickDept = function (obj) {
        queryData["deptId"] = obj.data.id;
        User.search();
    };


    /**
     * 初始化表格的列
     */
    User.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'userId', hide: true, title: '主键ID'},
            {field: 'name', sort: true, align: 'center', title: '用户'},
            {field: 'deptName', sort: true, align: 'center', title: '部门'},
            {field: 'positionName', sort: true, align: 'center', title: '职务'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    User.search = function () {
        queryData["name"] = $("#name").val();
        table.reload(User.tableId, {
            where: queryData, page: {curr: 1}
        });
    };


    // 渲染表格
    var tableResult = table.render({
        elem: '#' + User.tableId,
        url: Feng.ctxPath + '/system/user/pickerUser',
        where: queryData,
        page: true,
        height: "full-100",
        cellMinWidth: 100,
        cols: User.initColumn(),
        done: function (res, curr, count) {
            $('.layui-table-header input[type="checkbox"]').prop('disabled', true); // 禁止全选
        }
    });

    // 初始化部门树
    var ajax = new HttpRequest(Feng.ctxPath + "/system/dept/layuiTree",'get', function (data) {
        tree.render({
            elem: '#deptTree',
            data: data,
            click: User.onClickDept,
            onlyIconControl: true
        });
    }, function (data) {
    });
    ajax.start();


    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        User.search();
    });

    // 搜索按钮点击事件
    $('#btnDone').click(function () {
        var checkStatus = table.checkStatus(User.tableId); //idTest 即为基础参数 id 对应的值
        admin.putLayerData('userList', _data);
        //关掉对话框
        admin.closeThisDialog();
    });

    //判断表格是否选中,来控制多选按钮是否启用
    table.on('checkbox(' + User.tableId + ')', function (obj) {
        var checkStatus = table.checkStatus(User.tableId);
        if (checkStatus.data.length != 0) {
            $(".more-check").removeClass("layui-btn-disabled").attr("disabled", false);
        } else {
            $(".more-check").addClass("layui-btn-disabled").attr("disabled", true);
        }

        if (!obj.checked) {
            for (let i = 0; i < _data.length; i++) {
                if (obj.data.userId === _data[i].value) {
                    _data.splice(i, 1);
                    break;
                }
            }
        } else {
            _data.push({
                text: obj.data.name,
                value: obj.data.userId
            })
        }


    });

    //移除掉就从数组中删除，没有移除掉的，遍历一遍加入


})


$(function () {
    var panehHidden = false;
    if ($(this).width() < 769) {
        panehHidden = true;
    }
    $('#myContiner').layout({initClosed: panehHidden, west__size: 260});
});