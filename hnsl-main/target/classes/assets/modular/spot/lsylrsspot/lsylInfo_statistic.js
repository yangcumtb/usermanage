layui.use(['table', 'layarea', 'admin', 'form', 'HttpRequest', 'func', 'laydate'], function () {
    var $ = layui.$;
    var layarea = layui.layarea;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;
    var form = layui.form;
    var laydate = layui.laydate;
    /**
     * 历史遗留废弃图斑基础信息表管理
     */
    layui.use('table',function(){
        var table = layui.table;//加载表格模块
        table.init('demo', {
            height: 500 //设置高度
            ,page: true //开启分页
        });

    });
    laydate.render({
        elem: '#sj'
        ,type: 'month'
    });
    var lsylInfo = {
        tableId: "table",
        queryData: {}
    };
    layarea.render({
        elem: '#area',
        change: function (res) {
            //选择结果
            lsylInfo.queryData.xzs = res.xZS;
            lsylInfo.queryData.xzx = res.xZX;
        }
    });



    /**
     * 初始化表格的列
     */
    lsylInfo.initColumn = function () {
        return [[
            {type: 'checkbox', fixed: 'left', sort: true,},
            {field: 'sj', title: '时间', fixed: 'left', sort: true, width: 180},
            {field: 'nshmj', title: '拟损毁面积(㎡)', width: 180, sort: true},
            {field: 'nshsl', title: '拟损毁图斑数量', sort: true, width: 150},
            {field: 'tblx', title: '图斑类型', sort: true, width: 150},
            {field: 'tbshmj', title: '图斑位置', sort: true, width: 150},
            {field: 'tbshsl', title: '损毁图斑数量', sort: true, width: 150},
            {field: 'xfzt', title: '修复状态', sort: true, width: 150},
            {field: 'yxfmj', title: '已修复面积(㎡)', sort: true, width: 150},
            {field: 'yxfsl', title: '已修复数量', sort: true, width: 150},
            {fixed: 'right', width: 310, toolbar: "#tool", title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    lsylInfo.search = function () {
        lsylInfo.queryData.fksj = $("#sj").val();
        table.reload(lsylInfo.tableId, {
            where: lsylInfo.queryData,
            page: {curr: 1}
        });
    };

    /**
     * 点击详情
     *
     * @param data 点击按钮时候的行数据
     */
    lsylInfo.openDetailDlg = function (data) {
        func.open({
            title: '历史遗留矿山详情',
            content: Feng.ctxPath + '/spot/lsyl/detailHtml?fksj=' + data.fksj,
            tableId: lsylInfo.tableId
        });
    };


    /**
     * 导出报表
     */
    lsylInfo.exportExcel = function () {
        var checkRows = table.checkStatus(lsylInfo.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 统计详情
     */
    lsylInfo.statistic = function () {
        layer.open({
            title: '统计详情',
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            area: ['80%', '90%'],
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            // content: Feng.ctxPath + '/home/statistics'
            content: Feng.ctxPath + '/spot/lsyl/statisticDetails'
            // content: Feng.ctxPath + '/spot/lsyl/lsylInfo_statistic'

        });
    };


    // 渲染表格
    // var tableResult = table.render({
    //     elem: '#' + lsylInfo.tableId,
    //     url: Feng.ctxPath + '/spot/lsyl/list',
    //     // url: Feng.ctxPath + '/home/statistics',
    //     page: true,
    //     height: "full-100",
    //     cellMinWidth: 100,
    //     cols: lsylInfo.initColumn()
    // });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        lsylInfo.search();
        return false;
    });



    // 导出报表
    $('#btnExp').click(function () {
        lsylInfo.exportExcel();
    });

    // 统计详情
    $('#btnExp2').click(function () {
        lsylInfo.statistic();
    });


    // 工具条点击事件
    table.on('tool(' + lsylInfo.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            lsylInfo.openEditDlg(data);
        } else if (layEvent === 'detail') {
            lsylInfo.openDetailDlg(data);
        }else if (layEvent === 'delete') {
            lsylInfo.onDeleteItem(data);
        } else if(layEvent === 'location'){
            lsylInfo.openLocationDlg();
        }else if(layEvent === 'uploadPic'){
            lsylInfo.uploadFile(data, "scenePhotos");
        }
    });

});
