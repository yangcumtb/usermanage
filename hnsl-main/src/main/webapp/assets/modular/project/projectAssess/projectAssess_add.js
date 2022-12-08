/**
 * 添加或者修改页面
 */
var ProjectAssessInfoDlg = {
    data: {
        id: "",
        //projectName: "",
        projectAssessNode: "",
        //projectCheckStatus: "",
        projectType: "",
        //projectCompany: "",
        //projectDesc: "",
        createTime: "",
        updateTime: "",
        createUser: "",
        updateUser: ""
    }
};
debugger;
layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var upload = layui.upload;

    // 渲染时间选择框
    laydate.render({
        elem: '#shafShnkTime'
    });
    // 渲染时间选择框
    laydate.render({
        elem: '#startMonitorTime'
    });

    var curNode = $("#projectAssessNode").val(); //将来用来避免审批回退的控制变量
    var curProjectType = $("#projectType").val(); //当前项目类型
    // form.on('select(projectAssessNode)', function (data) {
    //
    //     if (data.value == 1) {
    //         $("#firstBtn").css("display", "");
    //         $("#secendBtn").css("display", "none");
    //     } else if (data.value == 2) {
    //         $("#firstBtn").css("display", "none");
    //         $("#secendBtn").css("display", "");
    //     } else {
    //         $("#firstBtn").css("display", "none");
    //         $("#secendBtn").css("display", "none");
    //     }
    //     curNode = data.value;
    // });
    form.on('select(projectAssessNode)', function (data) {
        curNode = data.value;
    });
    form.on('select(projectType)', function (data) {
        curProjectType = data.value;
    });
    $("#firstBtn").click(function () {
        var url = "";
        if (curNode == 1) {
            if (curProjectType == 1) {
            url = "/productivemineCheck/final/add_begin";
            }
            else if (curProjectType == 2){
                url = "/jsxmCheck/final/add";
            }
        } else if (curNode == 2) {
            if (curProjectType == 1){
            url = "/productivemineCheck/final/add";
            }
            else if (curNode == 2){
                url = "/jsxmCheck/final/add"
            }
        }
        layer.open({
            type: 2,
            title: '请填写初审方案信息',
            shadeClose: true,
            shade: 0.8,
            area: ['1000px', '90%'],
            shadeClose: false,
            content: url //iframe的url
        });
    });


    upload.render({
        elem: '#projectPDFBtn'                //绑定元素
        , url: '/project/projectAssess/uploadFile'      //上传接口


        //*********************传输限制
        , size: 2048                   //传输大小
        , exts: 'jpg|png|gif|doc|pdf'        //可传输文件的后缀
        , accept: 'file'


        //****************传输操作相关设置
        , data: { projectId: "1234567",innerPath:""+new Date().getFullYear()+new Date().getMonth() }    //额外传输的参数
        , auto: true                                 //自动上传,默认是打开的
        //, bindAction: '#btnUpload'                    //auto为false时，点击触发上传
        , multiple: false                             //多文件上传
        //, number: 100                               //multiple:true时有效

        , done: function (res) {
            Feng.success("项目文件上传成功！");
            var ajax=new HttpRequest(Feng.ctxPath + "/project/projectAssess/getProjectFiles?projectId=1234567",'get', function (data) {
                var aList=data.data;
                var aHtml="";
                aList?aList.forEach(function(item){
                    aHtml+="<a href=\"http://www.w3school.com.cn\">"+item.fileName+"</a><br/>";
                }):"";
                $('#projectFiles')[0].innerHTML= aHtml;
            }, function (data) {
                Feng.error("查询失败！" + data.message)
            });
            ajax.set("1234567");
            ajax.start();
            //$('#myPic').attr("src", res.Src);
        }
        , error: function () {                         //传输失败的回调
            //请求异常回调
        }
    });

    // xmSelect.render({
    //     searchTips: "请输入公司名称搜索",
    //     el: '#projectCompanyName',
    //     filterable: true,//是否开启搜索
    //     remoteSearch: true,//是否开启自定义搜索 (远程搜索)
    //     radio: true,//单选
    //     clickClose: true,//是否点击选项后自动关闭下拉框
    //     delay: 1000,//输入文字1秒后搜索
    //     //layVerify: 'required',//提交校验是否选了数据
    //     model: {
    //         label: {
    //             type: 'text' //把选中的数据变成文字样式
    //         }
    //     },
    //     //选中执行此方法(自定)
    //     on: function (data) {
    //         //data.arr:  当前已选中的数据
    //         if (data.arr.length > 0) {
    //             $("#projectCompany").val(data.arr[0].id);
    //         } else {
    //             $("#projectCompany").val(null);
    //         }
    //     },
    //     remoteMethod: function (val, cb, show) {
    //         var array = new Array();
    //         $.ajax({
    //             url: Feng.ctxPath  + '/project/admCompany/search',
    //             type: 'get',
    //             data: {
    //                 'name': val,//请求参数
    //             },
    //             dataType: 'json',
    //             success: function (result) {
    //                 var data=result.data;
    //                 for (var i = 0; i < data.length; i++) {
    //                     array.push({
    //                         name: data[i].companyName,
    //                         id: data[i].id,
    //                     })
    //                 }
    //                 cb(array);
    //             },
    //             error: function (data) {
    //                 cb([]);
    //             }
    //         });
    //     },
    //     data: []
    // })

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new HttpRequest(Feng.ctxPath + "/project/projectAssess/add", 'post', function (data) {
            Feng.success("添加成功！");
            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);
            //关掉对话框
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("添加失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });


});
