/**
 * 详情对话框
 */
var SpottableHistoricalmineInfoDlg = {
    data: {
        id: "",
        xzs: "",
        xzx: "",
        wz: "",
        tbmj: "",
        kfx: "",
        kfy: "",
        tbsx: "",
        sddl: "",
        sddlv: "",
        syq: "",
        shyq: "",
        xczp: "",
        hcdw: "",
        hcry: "",
        hcrq: "",
        base_admin: "",
        ztbh: "",
        tbdl: "",
        tbxl: "",
        bhdlx: "",
        bhdjb: "",
        ckzh: "",
        kz: "",
        kzv: "",
        kcfs: "",
        tbhdmj: "",
        gbnd: "",
        hfzlqk: "",
        sdzlmj: "",
        hdydsx: "",
        stwt: "",
        fkywr: "",
        nxffs: "",
        xfsjd: "",
        nxffx: "",
        nxffxv: "",
        bz: "",
        sxyj: "",
        rsspotyear: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'formSelects', 'layarea', 'xmSelect'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layarea = layui.layarea;
    var xmSelect = layui.xmSelect;

    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            if (res.cityCode) {
                $("#base_admin").val(res.cityCode);
            }
            if (res.countyCode) {
                $("#base_admin").val(res.countyCode);
            }
        }
    });
    // 渲染时间选择框
    var today = (new Date()).toLocaleDateString();
    laydate.render({
        elem: "#hcrq",
        max: '2080-10-14',
        type: 'date',
        trigger: 'click',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#xfsj",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });

    //多选三调地类及矿种，修复方向
    var sddl = xmSelect.render({
        el: '#sddl',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        data: [
            {
                name: '耕地', children: [
                    {name: '耕地', value: '01', select: false},
                    {name: '水田', value: '0101', select: false},
                    {name: '水浇地', value: '0102', select: false},
                    {name: '旱地', value: '0103', select: false},
                ]
            },
            {
                name: '园地', children: [
                    {name: '园地', value: '02', select: false},
                    {name: '果园', value: '0201', select: false},
                    {name: '茶园', value: '0202', select: false},
                    {name: '橡胶园', value: '0203', select: false},
                    {name: '其他园地', value: '0204', select: false},
                ]
            },
            {
                name: '林地', children: [
                    {name: '林地', value: '03', select: false},
                    {name: '乔木林地', value: '0301', select: false},
                    {name: '竹林地', value: '0302', select: false},
                    {name: '红树林地', value: '0303', select: false},
                    {name: '森林沼泽', value: '0304', select: false},
                    {name: '灌木林地', value: '0305', select: false},
                    {name: '灌丛沼泽', value: '0306', select: false},
                    {name: '其他林地', value: '0307', select: false},
                ]
            },
            {
                name: '草地', children: [
                    {name: '草地', value: '04', select: false},
                    {name: '天然牧草地', value: '0401', select: false},
                    {name: '沼泽草地', value: '0402', select: false},
                    {name: '人工牧草地', value: '0403', select: false},
                    {name: '其他草地', value: '0404', select: false},
                ]
            },
            {
                name: '商服用地', children: [
                    {name: '商服用地', value: '05', select: false},
                    {name: '零售商业用地', value: '0501', select: false},
                    {name: '批发市场用地', value: '0502', select: false},
                    {name: '餐饮用地', value: '0503', select: false},
                    {name: '旅馆用地', value: '0504', select: false},
                    {name: '商务金融用地', value: '0505', select: false},
                    {name: '娱乐用地', value: '0506', select: false},
                    {name: '其他商服用地', value: '0507', select: false},
                ]
            },
            {
                name: '工矿仓储用地', children: [
                    {name: '工矿仓储用地', value: '06', select: false},
                    {name: '工业用地', value: '0601', select: false},
                    {name: '采矿用地', value: '0602', select: false},
                    {name: '盐田', value: '0603', select: false},
                    {name: '仓储用地', value: '0604', select: false},
                ]
            },
            {
                name: '住宅用地', children: [
                    {name: '住宅用地', value: '07', select: false},
                    {name: '城镇住宅用地', value: '0701', select: false},
                    {name: '农村宅基地', value: '0702', select: false},
                ]
            },
            {
                name: '公共管理与公共服务用地', children: [
                    {name: '公共管理与公共服务用地', value: '08', select: false},
                    {name: '机关团体用地', value: '0801', select: false},
                    {name: '新闻出版用地', value: '0802', select: false},
                    {name: '教育用地', value: '0803', select: false},
                    {name: '科研用地', value: '0804', select: false},
                    {name: '医疗卫生用地', value: '0805', select: false},
                    {name: '社会福利用地', value: '0806', select: false},
                    {name: '文体设施用地', value: '0807', select: false},
                    {name: '体育用地', value: '0808', select: false},
                    {name: '公共设施用地', value: '0809', select: false},
                    {name: '公园与绿地', value: '0810', select: false},
                ]
            },
            {
                name: '特殊用地', children: [
                    {name: '特殊用地', value: '09', select: false},
                    {name: '军事设施用地', value: '0901', select: false},
                    {name: '使领馆用地', value: '0902', select: false},
                    {name: '监教场所用地', value: '0903', select: false},
                    {name: '宗教用地', value: '0904', select: false},
                    {name: '殡葬用地', value: '0905', select: false},
                    {name: '风景名胜设施用地', value: '0906', select: false},
                ]
            },
            {
                name: '交通运输用地', children: [
                    {name: '交通运输用地', value: '10', select: false},
                    {name: '铁路用地', value: '1001', select: false},
                    {name: '轨道交通用地', value: '1002', select: false},
                    {name: '公路用地', value: '1003', select: false},
                    {name: '城镇村道路用地', value: '1004', select: false},
                    {name: '交通服务场站用地', value: '1005', select: false},
                    {name: '农村道路', value: '1006', select: false},
                    {name: '机场用地', value: '1007', select: false},
                    {name: '港口码头用地', value: '1008', select: false},
                    {name: '管道运输用地', value: '1009', select: false},
                ]
            },
            {
                name: '水域及水利设施用地', children: [
                    {name: '水域及水利设施用地', value: '11', select: false},
                    {name: '河流水面', value: '1101', select: false},
                    {name: '湖泊水面', value: '1102', select: false},
                    {name: '水库水面', value: '1103', select: false},
                    {name: '坑塘水面', value: '1104', select: false},
                    {name: '沿海滩涂', value: '1105', select: false},
                    {name: '内陆滩涂', value: '1106', select: false},
                    {name: '沟渠', value: '1107', select: false},
                    {name: '沼泽地', value: '1108', select: false},
                    {name: '水工建筑用地', value: '1109', select: false},
                    {name: '冰川及永久积雪', value: '1110', select: false},
                ]
            },
            {
                name: '其他土地', children: [
                    {name: '其他土地', value: '12', select: false},
                    {name: '空闲地', value: '1201', select: false},
                    {name: '设施农用地', value: '1202', select: false},
                    {name: '田坎', value: '1203', select: false},
                    {name: '盐碱地', value: '1204', select: false},
                    {name: '沙地', value: '1205', select: false},
                    {name: '裸土地', value: '1206', select: false},
                    {name: '裸岩石砾地', value: '1207', select: false},
                ]
            },
        ],
    });
    var kz = xmSelect.render({
        el: '#kz',
        theme: {
            color: '#8799a3'
        },
        autoRow: true,
        filterable: true,
        filterMethod: function (val, item, index, prop) {
            if (val == item.value) {//把value相同的搜索出来
                return true;
            }
            if (item.name.indexOf(val) != -1) {//名称中包含的搜索出来
                return true;
            }
            return false;//不知道的就不管了
        },
        data: [
            {name: '饰面用玄武岩', value: '84553', select: false},
            {name: '建筑用玄武岩', value: '84555', select: false},
            {name: '饰面用角闪岩', value: '84561', select: false},
            {name: '建筑用角闪岩', value: '84562', select: false},
            {name: '辉绿岩', value: '84570', select: false},
            {name: '水泥用辉绿岩', value: '84571', select: false},
            {name: '铸石用辉绿岩', value: '84572', select: false},
            {name: '饰面用辉绿岩', value: '84573', select: false},
            {name: '建筑用辉绿岩', value: '84574', select: false},
            {name: '饰面用辉长岩', value: '84581', select: false},
            {name: '建筑用辉长岩', value: '84582', select: false},
            {name: '安山岩', value: '84590', select: false},
            {name: '饰面用安山岩', value: '84591', select: false},
            {name: '建筑用安山岩', value: '84592', select: false},
            {name: '水泥混合材料用安山岩', value: '84593', select: false},
            {name: '耐酸碱用安山岩', value: '84594', select: false},
            {name: '闪长岩', value: '84610', select: false},
            {name: '建筑用闪长岩', value: '84611', select: false},
            {name: '饰面用闪长岩', value: '84613', select: false},
            {name: '饰面用二长岩', value: '84621', select: false},
            {name: '建筑用二长岩', value: '84622', select: false},
            {name: '饰面用正长岩', value: '84631', select: false},
            {name: '建筑用正长岩', value: '84632', select: false},
            {name: '花岗岩', value: '84710', select: false},
            {name: '建筑用花岗石', value: '84711', select: false},
            {name: '饰面用花岗岩', value: '84712', select: false},
            {name: '麦饭石', value: '84720', select: false},
            {name: '珍珠岩', value: '84730', select: false},
            {name: '建筑用流纹岩', value: '84740', select: false},
            {name: '黑曜岩', value: '84750', select: false},
            {name: '松脂岩', value: '84770', select: false},
            {name: '浮石', value: '84790', select: false},
            {name: '粗面岩', value: '84810', select: false},
            {name: '水泥用粗面岩', value: '84811', select: false},
            {name: '铸石用粗面岩', value: '84812', select: false},
            {name: '霞石正长岩', value: '84830', select: false},
            {name: '凝灰岩', value: '84850', select: false},
            {name: '玻璃用凝灰岩', value: '84851', select: false},
            {name: '水泥用凝灰岩', value: '84852', select: false},
            {name: '建筑用凝灰岩', value: '84853', select: false},
            {name: '火山灰', value: '84870', select: false},
            {name: '水泥用火山灰', value: '84871', select: false},
            {name: '火山渣', value: '84890', select: false},
            {name: '大理岩', value: '84910', select: false},
            {name: '饰面用大理石', value: '84911', select: false},
            {name: '建筑大理石', value: '84912', select: false},
            {name: '水泥用大理石', value: '84913', select: false},
            {name: '玻璃用大理石', value: '84914', select: false},
            {name: '板岩', value: '84920', select: false},
            {name: '饰面用板岩', value: '84921', select: false},
            {name: '水泥配料用板岩', value: '84922', select: false},
            {name: '片石', value: '84923', select: false},
            {name: '片麻岩', value: '84930', select: false},
            {name: '千枚岩', value: '84940', select: false},
            {name: '砚石', value: '86610', select: false},
            {name: '贝壳', value: '86620', select: false},
            {name: '矿泉水', value: '97010', select: false},
            {name: '地下水', value: '97030', select: false},
            {name: '二氧化碳气', value: '97070', select: false},
            {name: '硫化氢气', value: '97090', select: false},
            {name: '氦气', value: '97110', select: false},
            {name: '氢气', value: '97120', select: false},
            {name: '氡气', value: '97130', select: false},
            {name: '其他矿产', value: '99999', select: false},
        ]
    })
    var nxffx = xmSelect.render({
        el: '#nxffx',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        data: [
            {name: '耕地', value: '1', selected: false},
            {name: '园地', value: '2', selected: false},
            {name: '林地', value: '3', selected: false},
            {name: '草地', value: '4', selected: false},
            {name: '商服用地', value: '5', selected: false},
            {name: '工矿仓储用地', value: '6', selected: false},
            {name: '住宅用地', value: '7', selected: false},
            {name: '公共管理与公共服务用地', value: '8', selected: false},
            {name: '特殊用地', value: '9', selected: false},
            {name: '交通运输用地', value: '10', selected: false},
            {name: '水域及水利设施用地', value: '11', selected: false},
            {name: '其他土地', value: '12', selected: false},
            {name: '/', value: '13', selected: false},
        ],
    });


    //获取详情信息，填充表单
    var ajax = new HttpRequest(Feng.ctxPath + "/spot/lsyl/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    console.log(result.data);
    if (result.data.xfsj != null) {
        result.data.xfsj = result.data.xfsj.substr(0, 10);
    }
    if (result.data.hcrq != null) {
        result.data.hcrq = result.data.hcrq.substr(0, 10);
    }
    var Tbdl = result.data.tbdl;
    if (Tbdl == '10') {
        var Options = "<option value=\" \"></option>\n" +
            "                    <option value=\"11\">无法确认治理恢复责任主体的无主废弃矿山</option>\n" +
            "                    <option value=\"12\">由政府承担治理恢复责任的政策性关闭矿山</option>"
        var $Options = $(Options);
        $Options.appendTo($("#tbxl"));
        $("#lsylmassage").css("display", "")
        $("#KW").css("display", "")

    } else if (Tbdl == "20") {
        $("#tbxl").append("<option value=\" \"></option>\n" +
            "                    <option value=\"21\">由企业履行治理恢复责任的政策性关闭矿山</option>\n" +
            "                    <option value=\"22\">由企业或个人履行治理恢复责任的有主废弃矿山</option>")
        $("#lsylmassage").css("display", "none")
        $("#KW").css("display", "none")
    } else if (Tbdl == "30") {
        $("#tbxl").append("<option value=\" \"></option>\n" +
            "                    <option value=\"31\">生产矿山</option>\n" +
            "                    <option value=\"32\">采矿权过期未注销矿山</option>\n" +
            "                    <option value=\"33\">自然灾毁</option>\n" +
            "                    <option value=\"34\">工程建设损毁</option>\n" +
            "                    <option value=\"35\">河道采砂损毁</option>\n" +
            "                    <option value=\"36\">尾矿库占用损毁</option>\n" +
            "                    <option value=\"37\">未损毁</option>")
        $("#lsylmassage").css("display", "none")
        $("#KW").css("display", "none")
    } else if (Tbdl == "40") {
        $("#tbxl").append("<option value=\" \"></option>\n" +
            "                    <option value=\"41\">有效矿业权范围内功能未损毁的采矿沉陷区</option>\n" +
            "                    <option value=\"42\">过期未注销矿业权范围内功能未损毁的采矿沉陷区</option>\n" +
            "                    <option value=\"43\">其他功能未损毁的采矿沉陷区</option>")
        $("#lsylmassage").css("display", "none")
        $("#KW").css("display", "none")
    }
    form.val('lsylInfoTable', result.data);
    console.log(Feng.ctxPath + "/spot/lsyl/detail?id=" + Feng.getUrlParam("id"), "get");
    console.log(result.data);

    //表单提交事件
    form.on('submit(submit)', function (data) {
        data.field.sddl = sddl.getValue('valueStr');
        // data.field.sddlv = sddl.getValue('valueStr');
        data.field.nxffx = nxffx.getValue('valueStr');
        data.field.kz = kz.getValue('valueStr');
        var ajax = new HttpRequest(Feng.ctxPath + "/spot/lsyl/edit", 'post', function (data) {
            Feng.success("更新成功！");
            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);
            //关掉对话框
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

});