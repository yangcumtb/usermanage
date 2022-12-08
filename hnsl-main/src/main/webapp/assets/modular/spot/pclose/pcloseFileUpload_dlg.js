layui.use(['admin', 'HttpRequest', 'upload', 'form', 'layer', 'element'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var upload = layui.upload;
    var form = layui.form;
    var element = layui.element;

    var fileIds = "";
    var uploadedFileArray = [];
    var editUrl = $("#editUrl").val();
    var field = $("#field").val();
    var keyIdValue = $("#keyIdValue").val();
    var keyIdName = $("#keyIdName").val();
    var fileType = "image_assosicateid";
    var fileBusinessType = 1;
    var fileBusinessName = "图斑影像图";

    var associateid;

    //获取associateid
    var ajaxassociateid = new HttpRequest(Feng.ctxPath + '/spot/pclose/detail?id=' + keyIdValue, 'get');
    var result = ajaxassociateid.start();
    associateid = result.data.fileAssociationId;

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
            fileBusinessName = "图斑影像图";
        } else if (data.value == "HC") {
            fileBusinessType = 2;
            fileBusinessName = "核查";
        }

    });

    // 先获取图片ID，再获取图片详细信息
    $.ajax({
        type: 'get',
        url: Feng.ctxPath + '/spot/pclose/fileDetail/' + $("#keyIdValue").val(),
        success: function (res) {
            for (var m = 0; m < res.data.length; m++) {
                uploadedFileArray.push(res.data[m].fileId);
                associateid = res.data[m].associateId;
                if (uploadedFileArray.length == 0) {
                    return;
                }

            }
            for (let i = 0; i < uploadedFileArray.length; i++) {
                if (res.data[i].fileBusinessName == "规划图" || res.data[i].fileBusinessName == "图斑影像图" || res.data[i].fileBusinessName == "核查") {
                    let firstCol = '<td>' + res.data[i].fileName + '</td>';
                    firstCol = firstCol + '<td><img id="' + res.data[i].fileId + '", height="48" src="' + Feng.ctxPath + "/system/thumbImage/" + uploadedFileArray[i] + '"></td>';
                    firstCol = firstCol + '<td>' + res.data[i].fileBusinessName + '</td>';
                    let trHtml = '';
                    trHtml += '<tr id="uploaded-' + i + '" align="center">';
                    trHtml += firstCol;
                    trHtml += `    <td>` + res.data[i].fileSizeKb + `kb</td>
                               <td>已上传</td>`;
                    trHtml += '    <td hidden>' + uploadedFileArray[i] + '</td>';
                    trHtml += `    <td>
                                    <button class="layui-btn layui-btn-xs layui-hide file-reload">'重传</button>
                                    <button class="layui-btn layui-btn-xs layui-btn-danger file-delete">删除</button>
                               </td>
                           </tr>`;
                    let tr = $(trHtml);
                    let fileId = res.data[i].fileId;
                    // 响应删除按钮
                    tr.find('.file-delete').on('click', function (data) {
                        let fileID = tr.find("td:eq(5)").text();
                        let index = uploadedFileArray.indexOf(fileID);
                        if (index > -1) {
                            uploadedFileArray.splice(index, 1);
                        }
                        var operation = function () {
                            var data = {
                                fileId: fileID
                            };
                            var ajax = new HttpRequest(Feng.ctxPath + '/spot/pclose/deleteFileByFileId', 'post', function (data) {
                                Feng.success("删除成功!");
                                tr.remove();
                            }, function (data) {
                                Feng.error("删除失败!" + data.message + "!");
                            });
                            ajax.set(data);
                            ajax.start();
                        };
                        Feng.confirm("是否删除?如果确认删除，需要在后端也将图片记录、图片缩略图与图片都删除。", operation);
                    });

                    fileListView.append(tr);
                }
            }
            $("#fileList img").on("click", function (e) {
                var imageId = $(e.target).context.id;
                if (imageId) {
                    window.open(window.location.origin + '/spotmanage/system/previewImage/' + imageId);
                }
            });

        }
    });

    var uploadListIns = upload.render({
        elem: '#picList',
        url: Feng.ctxPath + '/system/upload/' + fileType + '?fileBusinessName=' + fileBusinessName + '&associateid=' + associateid,
        accept: fileType,
        multiple: true,
        auto: false,
        bindAction: '#uploadAction',
        before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致
            this.data = {
                associateId: associateid,
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
            }

        },
        done: function (res, index, upload) {
            if (res.code == 200) { //上传成功
                if (associateid != "") {
                    associateid = associateid;
                }
                layer.closeAll('loading');
                associateid = res.data.associateid;
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
