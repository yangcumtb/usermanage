layui.use(['jsonViewer'], function () {
    var $ = layui.$;

    var options = {};
    $('#json-renderer').jsonViewer(JSON.parse($("#json-renderer").text()), options);
});
