layui.use(['admin', 'HttpRequest', 'upload', 'form', 'layer', 'element'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var upload = layui.upload;
    var form = layui.form;
    var element = layui.element;
    var fileType = "image_assosicateid_more";
    var fileBusinessType = 1;
    var fileBusinessName = "图斑影像图";
    //让当前iframe弹层高度适应
    admin.iframeAuto();

    // 文件列表
    let fileListView = $('#fileList');

    form.on('select(imageTypeSelect)', function (data) {
        if (data.value == "GH") {
            fileBusinessType = 3;
            fileBusinessName = "规划图";
        } else if (data.value == "TB") {
            fileBusinessType = 1;
            fileBusinessName = "卫星影像图";
        } else if (data.value == "HC") {
            fileBusinessType = 2;
            fileBusinessName = "核查";
        }

    });

    var uploadListIns = upload.render({
        elem: '#picList',
        url: Feng.ctxPath + '/system/upload/' + fileType + '?fileBusinessName=' + fileBusinessName,
        accept: fileType,
        multiple: true,
        auto: false,
        bindAction: '#uploadAction',
        before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                fileBusinessType: fileBusinessType,
                fileBusinessName: fileBusinessName
            };
            layer.load(0, {
                shade: false
            });
        },
        choose: function (obj) {
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td><img height="48" src="' + result + '"></td>'
                    , '<td>' + fileBusinessName + '</td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td>等待上传</td>'
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

                fileListView.append(tr);
            });
        },
        allDone: function (obj) { //当文件全部被提交后，才触发
            if (obj.total == obj.successful) {
                layer.closeAll('loading');
                // var data = {};
                // data[keyIdName] = keyIdValue;
                // data[field] = fileIds;
                // var ajax = new HttpRequest(editUrl, "post", function (data) {
                //     Feng.success("上传更新成功！");
                //     //传给上个页面，刷新table用
                //     admin.putTempData('formOk', true);
                //     //关掉对话框
                //     admin.closeThisDialog();
                // }, function (data) {
                //     Feng.error("上传失败！" + data.message)
                // });
                // ajax.set(data);
                // ajax.start();
            }

        },
        done: function (res, index, upload) {
            if (res.code == 200) { //上传成功
                layer.closeAll('loading');
                var tr = fileListView.find('tr#upload-' + index)
                    , tds = tr.children();
                tds.eq(4).html('<span style="color: #5FB878;">上传成功</span>');
                // tds.eq(3).html(''); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        },
        error: function (index, upload) {
            layer.closeAll('loading');
            var tr = fileListView.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
        }
    });
});
