/**
 * 添加或者修改页面
 */

layui.use(['admin', 'HttpRequest', 'upload', 'form', 'layer','formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var upload = layui.upload;
    var fileIds = "";
    var layer = layui.layer;
    var form = layui.form;
    var editUrl = $("#editUrl").val();
    var field = $("#field").val();
    var keyIdValue = $("#keyIdValue").val();
    var keyIdName = $("#keyIdName").val();
    var fileType = $("#fileType").val();

    //让当前iframe弹层高度适应
    admin.iframeAuto();

    // 文件列表
    let fileListView = $('#fileList');

    // 将已有文件添加到文件列表中
    $.ajax({
        type: 'get',
        url: Feng.ctxPath + '/source/source_detail_info/' + $('#sourceId').val(),
        success: function (res) {
            let uploadedFileIds = res[field];
            if (uploadedFileIds === undefined || uploadedFileIds === '') {
                return;
            }

            let uploadedFileArray = uploadedFileIds.split(',');
            for (let i = 0; i < uploadedFileArray.length; i++) {
                let firstCol = '';
                if (field === "scenePhotos") {
                    firstCol = '    <td><img height="48" src="' + Feng.getCtxPath() + "/upload/thumbImage/" + uploadedFileArray[i] + '"></td>';
                } else if (field === "videos") {
                    firstCol = '<td><i class="layui-icon">&#xe6ed;</i></td>';
                }

                let trHtml = '';
                trHtml += '<tr id="uploaded-' + i + '" align="center">';
                trHtml += firstCol;trHtml += `    <td>--kb</td>
                               <td>已上传</td>
                               <td hidden>1</td>`;
                trHtml += '    <td hidden>' + uploadedFileArray[i] + '</td>';
                trHtml += `    <td>
                                    <button class="layui-btn layui-btn-xs layui-hide file-reload">'重传</button>
                                    <button class="layui-btn layui-btn-xs layui-btn-danger file-delete">删除</button>
                               </td>
                           </tr>`;
                let tr = $(trHtml);

                // 响应删除按钮
                tr.find('.file-delete').on('click', function () {
                    let fileID = tr.find("td:eq(4)").text();
                    let tempFileIds = fileIds.split(',');
                    let index = tempFileIds.indexOf(fileID);
                    if (index > -1) {
                        tempFileIds.splice(index, 1);
                        fileIds = tempFileIds.join(',')
                    }
                    tr.remove();
                });

                fileListView.append(tr);
            }
            fileIds += uploadedFileIds;
        }
    });

    //多文件列表示例
    var demoListView = $('#demoList'),
        uploadListIns = upload.render({
            elem: '#picList',
            url: Feng.ctxPath + '/system/upload/' + fileType,
            accept: fileType,
            multiple: true,
            auto: false,
            bindAction: '#listAction',
            choose: function (obj) {
                var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                //读取本地文件
                obj.preview(function (index, file, result) {
                    var predom = file.name;
                    if (fileType == "image") {
                        predom = '<img height="48" src="' + result + '">';
                    }

                    var tr = $(['<tr id="upload-' + index + '">'
                        , '<td>' + predom + '</td>'
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

                    demoListView.append(tr);
                });
            },
            allDone: function (obj) { //当文件全部被提交后，才触发
                if (obj.total == obj.successful) {
                    var data = {};
                    data[keyIdName] = keyIdValue;
                    data[field] = fileIds;
                    var ajax = new HttpRequest(editUrl, "post", function (data) {
                        Feng.success("上传更新成功！");
                        //传给上个页面，刷新table用
                        admin.putTempData('formOk', true);
                        //关掉对话框
                        admin.closeThisDialog();
                    }, function (data) {
                        Feng.error("上传失败！" + data.message)
                    });
                    ajax.set(data);
                    ajax.start();
                }

            },
            done: function (res, index, upload) {
                if (res.code == 200) { //上传成功
                    if (fileIds != "") {
                        fileIds = fileIds + ",";
                    }
                    fileIds = fileIds + res.data.fileId;
                    var tr = demoListView.find('tr#upload-' + index)
                        , tds = tr.children();
                    tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                    tds.eq(3).html(''); //清空操作
                    return delete this.files[index]; //删除文件队列已经上传成功的文件
                }
                this.error(index, upload);
            },
            error: function (index, upload) {
                var tr = demoListView.find('tr#upload-' + index)
                    , tds = tr.children();
                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
            }
        });
});
