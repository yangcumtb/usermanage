layui.use(['table', 'layarea', 'admin', 'form', 'HttpRequest', 'func', 'upload', 'element', 'layer'], function () {
    var $ = layui.jquery
        , upload = layui.upload
        , element = layui.element
        , form = layui.form
        , layer = layui.layer;

    var loadingIndex;
    var spotType = "KQBJ";

    // form.on('select(shptype)', function (data) {
    //     spotType = data.value;
    // });

    //演示多文件列表
    var uploadListIns = upload.render({
        elem: '#testList',
        elemList: $('#fileList'),
        url: Feng.ctxPath + '/prominemanger/mineEnterprise/proImportShp?spotType=' + spotType,
        accept: 'file',
        exts: 'zip',
        multiple: true,
        auto: false,
        bindAction: '#startUpload',
        before: function (obj) {
            //obj参数包含的信息，跟 choose回调完全一致
            this.url = Feng.ctxPath + '/prominemanger/mineEnterprise/proImportShp?spotType=' + spotType;
            loadingIndex = layer.open({
                type: 1,
                title: "上传进度", //不显示标题
                //closeBtn: 0, //不显示关闭按钮
                skin: 'layui-layer-demo', //样式类名
                area: ['420px', 'auto'], //宽高
                content: '<div style="margin: 10px 20px;"><div class="layui-progress layui-progress-big" lay-showPercent="yes" lay-filter="uploadfile"><div class="layui-progress-bar layui-bg-green" lay-percent="0%" id="uploadpercent"></div></div><p><span id="uploadfilemsg">正在上传</span></p></div>',
                success: function (layero, index) {
                    layer.setTop(layero); //重点2
                }
            });
            element.render();
        },
        choose: function (obj) {
            var that = this;
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });

                //删除
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                that.elemList.append(tr);
            });
        },
        done: function (res, index, upload) { //成功的回调
            layer.close(loadingIndex);
            var that = this;
            //if(res.code == 0){ //上传成功
            if (res.success) {
                layer.closeAll('loading');
                parent.layer.closeAll(),
                    parent.layer.msg('提交成功', {
                        offset: '15px',
                        icon: 1,
                        time: 5000
                    });
            } else {
                layer.closeAll('loading');
                layer.msg('提交失败：' + res.message, {
                    offset: '15px',
                    icon: 1,
                    time: 5000
                })
            }
            var tr = that.elemList.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(3).html(''); //清空操作
            delete this.files[index]; //删除文件队列已经上传成功的文件
            return;
            //}
            this.error(index, upload);
            layer.closeAll();
        },
        allDone: function (obj) { //多文件上传完毕后的状态回调
            if (obj.aborted != 0) {
                parent.layer.msg('上传失败', {time: 1000},);
            }
            else {
                parent.layer.msg('上传成功', {time: 1000},);
            }
            layer.close(loadingIndex);
            console.log(obj)
        },
        error: function (index, upload) { //错误回调
            layer.close(loadingIndex);
            layer.closeAll('loading');
            var that = this;
            var tr = that.elemList.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
        },
        progress: function (n, elem, e, index) {
            $("#uploadpercent").attr("lay-percent", e + '%');
            element.progress('uploadfile',e + '%')
        }
    });
});
