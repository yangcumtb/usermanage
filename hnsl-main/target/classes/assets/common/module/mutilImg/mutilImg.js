layui.define(['jquery', 'upload'], function (exports) {
    var $ = layui.$;
    var jQuery = layui.$;
    var upload = layui.upload;

    layui.link(layui.cache.base + "mutilImg/mutilImg.css")
    var delParent;
    var defaults = {
        fileType: ["jpg", "png", "bmp", "jpeg"],
        fileSize: 1024 * 1024 * 10
    };
    var domName;

    var mutilImg = {
        init: function (input, limit, imgs) {
            if (limit == undefined) {
                limit = 3;
            }

            var _this = this;
            input.attr("readonly", "true");
            input.wrap(" <div class='z_photo upimg-div clear'><section class='z_file fl'></section></div>");

            input.after("<input id='fileSel' class='file-dom' type='file' accept='image/jpg,image/jpeg,image/png,image/bmp' multiple hidden />");
            input.after("<a class='layui-form-label add layui-btn layui-btn-primary' style='height: 94px;width: 94px;margin:1px;padding:10px;text-align: center;border: 1px dashed #d6d6d6'><i class='layui-icon layui-icon-addition' style='color:#d6d6d6;font-size: 44px;line-height: 70px;'></i></a>");
            input.val(imgs);


            $(".add").click(function () {
                _this.add();
            });

            if (imgs != "") {
                var imgsArr = imgs.split(",");
                for (var i = 0; i < imgsArr.length; i++) {
                    var imgUrl = Feng.ctxPath + "/system/thumbImage/" + imgsArr[i];
                    _this.createImg(imgUrl, imgsArr[i])
                }
                var numUp = $(input).parents(".z_photo").find(".up-section").length;
                if (numUp >= limit) {
                    $(input).parent().hide();
                }

            }

            $("#fileSel").change(function () {
                var idFile = $(this).attr("id");
                var file = document.getElementById(idFile);
                var imgContainer = $(this).parents(".z_photo");
                var fileList = file.files;
                var numUp = imgContainer.find(".up-section").length;
                var totalNum = numUp + fileList.length;
                if (fileList.length > limit || totalNum > limit) {
                    alert("上传图片数目不可以超过" + limit + "个，请重新选择");
                } else if (numUp < limit) {
                    fileList = _this.validateUp(fileList);
                    _this.upload(fileList);
                }

                numUp = imgContainer.find(".up-section").length;
                if (numUp >= limit) {
                    $(this).parent().hide();
                }

            });


        },
        upload: function (fileList) {
            var _this = this;
            var formData = new FormData();
            for (var i = 0; i < fileList.length; i++) {
                formData.append("files[]", fileList[i]);
            }

            //提交文件
            var opts = {
                url: Feng.ctxPath + "/system/upload/images"
                , type: 'post' //统一采用 post 上传
                , data: formData
                , contentType: false
                , processData: false
                , dataType: 'json'
                //成功回调
                , success: function (res) {
                    var fileIds = res.data.fileIds.split(",");
                    for (var i = 0; i < fileIds.length; i++) {
                        var imgUrl = Feng.ctxPath + "/system/thumbImage/" + fileIds[i];
                        _this.createImg(imgUrl, fileIds[i]);
                    }
                }
                //异常回调
                , error: function () {

                }
            };

            $.ajax(opts);
        },
        createImg: function (imgUrl, fileId) {
            var _this = this;
            var imgContainer = $(".z_photo");
            var $section = $("<section class='up-section fl' data-id ='" + fileId + "'>");
            imgContainer.prepend($section);
            var $span = $("<span class='up-span'>");
            $span.appendTo($section);
            var $img0 = $("<img class='close-upimg'>").on("click", function (event) {
                delParent = $(this).parent();
                var numUp = delParent.siblings().length;
                if (numUp < 6) {
                    delParent.parent().find(".z_file").show();
                }
                delParent.remove();
                _this.getFileIds();
                event.preventDefault();
                event.stopPropagation();
            });
            $img0.attr("src", Feng.ctxPath + "/assets/common/module/mutilImg/img/close.png").appendTo($section);
            var $img = $("<img class='up-img'>");
            $img.attr("src", imgUrl);
            $img.appendTo($section);
            _this.getFileIds();
        },
        add: function () {
            document.getElementById("fileSel").click();
        },
        validateUp: function (files) {
            var arrFiles = [];
            for (var i = 0, file; file = files[i]; i++) {
                var newStr = file.name.split("").reverse().join("");
                if (newStr.split(".")[0] != null) {
                    var type = newStr.split(".")[0].split("").reverse().join("");
                    if (jQuery.inArray(type, defaults.fileType) > -1) {
                        if (file.size >= defaults.fileSize) {
                            alert(file.size);
                            alert('您这个"' + file.name + '"文件大小过大');
                        } else {
                            arrFiles.push(file);
                        }
                    } else {
                        alert('您这个"' + file.name + '"上传类型不符合');
                    }
                } else {
                    alert('您这个"' + file.name + '"没有类型, 无法识别');
                }
            }
            return arrFiles;
        },
        getFileIds: function () {
            var fileIds = "";
            $(".up-section").each(function () {
                fileIds = fileIds + $(this).data("id") + ",";
            });
            fileIds = (fileIds.substring(fileIds.length - 1) == ',') ? fileIds.substring(0, fileIds.length - 1) : fileIds;
            $("[name='" + domName + "']").val(fileIds);
        },
        initialize: function () {
            var dom = $(".layui-mutil-image")[0];
            var limit = $(dom).data("limit");
            var imgs = $(dom).val();
            domName = $(dom).attr("name");
            this.init($(dom), limit, imgs);
        },
    };

    exports('mutilImg', mutilImg);
});