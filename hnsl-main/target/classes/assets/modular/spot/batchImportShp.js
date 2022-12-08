layui.use(['table', 'layarea', 'admin', 'form', 'HttpRequest', 'func', 'upload', 'element', 'layer'], function () {
    var $ = layui.jquery
        , upload = layui.upload
        , element = layui.element
        , form = layui.form
        , layer = layui.layer;

    var loadingIndex;
    var spotType = "LS";
    var FileListView = $("#FileList")


    form.on('select(shptype)',function (data){
        spotType = data.value;
    });
    var uploadListIns = upload.render({
        elem: '#testList',
        elemList: $('#fileList'),
        url: './batchImportShp?spotType=' + spotType,
        accept: 'file',
        exts: 'zip',
        multiple: false,
        auto: false,
        bindAction: '#startUpload',
        before: function (obj) {
            //obj参数包含的信息，跟 choose回调完全一致
            this.url = './batchImportShp?spotType=' + spotType;
            loadingIndex = layer.open({
                type: 1,
                title: "上传进度", //不显示标题
                //closeBtn: 0, //不显示关闭按钮
                skin: 'layui-layer-demo', //样式类名
                area: ['420px', 'auto'], //宽高
                content: '<div style="margin: 10px 20px;"><div class="layui-progress layui-progress-big" lay-showpercent="true" lay-filter="uploadfile"><div class="layui-progress-bar layui-bg-green" lay-percent=""></div></div><p><span id="uploadfilemsg">正在上传</span></p></div>',
            });
            element.progress('uploadfile', '0%'); //进度条复位
            $("#uploadfilemsg").html("上传中");
        },
        choose: function (obj) {
            var that = this;
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            console.log(Object.keys(that.files).length)
            if (Object.keys(that.files).length > 1) {
                Feng.error("请先上传已选文件")
            } else {
                obj.preview(function (index, file, result) {
                    var tr = $(['<tr id="upload-' + index + '">'
                        , '<td>' + file.name + '</td>'
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
                        var operation = function () {
                            tr.remove();
                            delete files[index]; //删除对应的文件
                            tr.remove();
                            uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        }
                        Feng.confirm(" 是否删除? ", operation);
                        return false;
                    });

                    that.elemList.append(tr);
                });
            }
        },
        // allDone: function (obj) { //多文件上传完毕后的状态回调
        //     if (obj.successful != 0) {
        //         layer.close(loadingIndex);
        //         parent.layer.closeAll();
        //         parent.layer.msg('上传成功', {time: 1000},);
        //     } else {
        //         parent.layer.closeAll();
        //         layer.msg('提交失败');
        //     }
        //     console.log(obj)
        // },
        done: function (res, index, upload) { //成功的回调
            console.log(res)
            var progressnum = res.data.uploadtime/100;
            async function beginprogress(b,index,that,file) {
                console.log(b)
                for (var i = 1; i <= b; i++) {
                    console.log(i)
                     let mypromise = new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            var PN = (i / b)*100;
                            element.progress ("uploadfile",PN + '%')
                            if ( i == b) {
                                Feng.success("项目文件上传成功！");
                                $("#uploadfilemsg").html("上传成功");
                                setTimeout(function () {
                                    layer.close(loadingIndex);
                                    delete that.files[index]
                                    var tr = $('tr#upload-' + index);
                                    console.log(tr)
                                    var tds = tr.children();
                                    console.log(tds)
                                    tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                    tds.eq(3).html(''); //清空操作
                                },2000)
                            }
                            resolve();
                        }, 150)
                    })
                    await mypromise
                }

            }
            beginprogress(progressnum,index,this,FileListView);
            return false;
        },
        error: function (index, upload) { //错误回调
            layer.close(loadingIndex);
            layer.closeAll('loading');
            var that = this;
            var tr = that.elemList.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
        }
    });
});
