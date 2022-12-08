/**
 * 详情对话框
 */
var VerificationLsylTaskInfoDlg = {
    data: {
        id: "",
        xzs: "",
        xzx: "",
        tbtype: "",
        hcnr: "",
        tbStatus: "",
        taskStatus: "",
        bz: "",
        lsylResult: "",
        spotHistoricalmineBakResult: "",
        hcqk: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest', 'laydate', 'upload', 'layarea', 'formSelects', 'carousel','xmSelect'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layarea = layui.layarea;
    var carousel = layui.carousel;
    var laydate = layui.laydate;
    var xmSelect = layui.xmSelect

    layarea.render({
        elem: '#area-picker',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    });
    layarea.render({
        elem: '#area-picker1',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    });
    layarea.render({
        elem: '#area-picker1',
        change: function (res) {
            //选择结果
            console.log(res);
        }
    })
// 渲染时间选择框
    var today = (new Date()).toLocaleDateString();
    laydate.render({
        elem: "#hcrq",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#hcrqcheck",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#fksj",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#fksjcheck",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#yssj",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#yssjcheck",
        max: '2080-10-14',
        type: 'date',
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
    laydate.render({
        elem: "#xfsjcheck",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#nxfsj",
        max: '2080-10-14',
        type: 'date',
        done: function (value, date, endDate) {

        }
    });
    laydate.render({
        elem: "#nxfsjcheck",
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
        disabled: true,
        data: [
            {name: '耕地', children: [
                    {name: '耕地', value: '01', select: false},
                    {name: '水田', value: '0101', select: false},
                    {name: '水浇地', value: '0102', select: false},
                    {name: '旱地', value: '0103',select: false},
                ]},
            {name: '园地', children: [
                    {name: '园地', value: '02', select: false},
                    {name: '果园', value: '0201', select: false},
                    {name: '茶园', value: '0202', select: false},
                    {name: '橡胶园', value: '0203', select: false},
                    {name: '其他园地', value: '0204', select: false},
                ]},
            {name: '林地', children: [
                    {name: '林地', value: '03', select: false},
                    {name: '乔木林地', value: '0301', select: false},
                    {name: '竹林地', value: '0302', select: false},
                    {name: '红树林地', value: '0303', select: false},
                    {name: '森林沼泽', value: '0304', select: false},
                    {name: '灌木林地', value: '0305', select: false},
                    {name: '灌丛沼泽', value: '0306', select: false},
                    {name: '其他林地', value: '0307', select: false},
                ]},
            {name: '草地', children: [
                    {name: '草地', value: '04', select: false},
                    {name: '天然牧草地', value: '0401', select: false},
                    {name: '沼泽草地', value: '0402', select: false},
                    {name: '人工牧草地', value: '0403', select: false},
                    {name: '其他草地', value: '0404', select: false},
                ]},
            {name: '商服用地', children: [
                    {name: '商服用地', value: '05', select: false},
                    {name: '零售商业用地', value: '0501', select: false},
                    {name: '批发市场用地', value: '0502', select: false},
                    {name: '餐饮用地', value: '0503', select: false},
                    {name: '旅馆用地', value: '0504', select: false},
                    {name: '商务金融用地', value: '0505', select: false},
                    {name: '娱乐用地', value: '0506', select: false},
                    {name: '其他商服用地', value: '0507', select: false},
                ]},
            {name: '工矿仓储用地', children: [
                    {name: '工矿仓储用地', value: '06', select: false},
                    {name: '工业用地', value: '0601', select: false},
                    {name: '采矿用地', value: '0602', select: false},
                    {name: '盐田', value: '0603', select: false},
                    {name: '仓储用地', value: '0604', select: false},
                ]},
            {name: '住宅用地', children: [
                    {name: '住宅用地', value: '07', select: false},
                    {name: '城镇住宅用地', value: '0701', select: false},
                    {name: '农村宅基地', value: '0702', select: false},
                ]},
            {name: '公共管理与公共服务用地', children: [
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
                ]},
            {name: '特殊用地', children: [
                    {name: '特殊用地', value: '09', select: false},
                    {name: '军事设施用地', value: '0901', select: false},
                    {name: '使领馆用地', value: '0902', select: false},
                    {name: '监教场所用地', value: '0903', select: false},
                    {name: '宗教用地', value: '0904', select: false},
                    {name: '殡葬用地', value: '0905', select: false},
                    {name: '风景名胜设施用地', value: '0906', select: false},
                ]},
            {name: '交通运输用地', children: [
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
                ]},
            {name: '水域及水利设施用地', children: [
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
                ]},
            {name: '其他土地', children: [
                    {name: '其他土地', value: '12', select: false},
                    {name: '空闲地', value: '1201', select: false},
                    {name: '设施农用地', value: '1202', select: false},
                    {name: '田坎', value: '1203', select: false},
                    {name: '盐碱地', value: '1204', select: false},
                    {name: '沙地', value: '1205', select: false},
                    {name: '裸土地', value: '1206', select: false},
                    {name: '裸岩石砾地', value: '1207', select: false},
                ]},
        ],
    });
    var kz = xmSelect.render({
        el: '#kz',
        theme: {
            color: '#8799a3'
        },
        autoRow: true,
        disabled: true,
        filterable: true,
        filterMethod: function(val, item, index, prop){
            if(val == item.value){//把value相同的搜索出来
                return true;
            }
            if(item.name.indexOf(val) != -1){//名称中包含的搜索出来
                return true;
            }
            return false;//不知道的就不管了
        },
        data: [
            {name: '煤', value: '11001', select: false},
            {name: '油页岩', value: '11002', select: false},
            {name: '石油', value: '11003', select: false},
            {name: '天然气', value: '11004', select: false},
            {name: '煤层气', value: '11005', select: false},
            {name: '石煤', value: '11006', select: false},
            {name: '油砂', value: '11008', select: false},
            {name: '铀', value: '12712', select: false},
            {name: '钍', value: '12713', select: false},
            {name: '天然沥青', value: '14970', select: false},
            {name: '地热', value: '17050', select: false},
            {name: '铁矿', value: '22001', select: false},
            {name: '锰矿', value: '22002', select: false},
            {name: '铬铁矿', value: '22003', select: false},
            {name: '钛矿', value: '22004', select: false},
            {name: '钒矿', value: '22005', select: false},
            {name: '金红石', value: '22006', select: false},
            {name: '铜矿', value: '32006', select: false},
            {name: '铅矿', value: '32007', select: false},
            {name: '锌矿', value: '32008', select: false},
            {name: '铝土矿', value: '32009', select: false},
            {name: '镁矿', value: '32011', select: false},
            {name: '镍矿', value: '32012', select: false},
            {name: '钴矿', value: '32013', select: false},
            {name: '钨矿', value: '32014', select: false},
            {name: '锡矿', value: '32015', select: false},
            {name: '铋矿', value: '32016', select: false},
            {name: '钼矿', value: '32017', select: false},
            {name: '汞矿', value: '32018', select: false},
            {name: '锑矿', value: '32019', select: false},
            {name: '多金属', value: '32020', select: false},
            {name: '铂矿', value: '42101', select: false},
            {name: '钯矿', value: '42102', select: false},
            {name: '铱矿', value: '42103', select: false},
            {name: '铑矿', value: '42104', select: false},
            {name: '锇矿', value: '42105', select: false},
            {name: '钌矿', value: '42106', select: false},
            {name: '砂金', value: '42200', select: false},
            {name: '金矿', value: '42201', select: false},
            {name: '银矿', value: '42202', select: false},
            {name: '铌钽矿', value: '52300', select: false},
            {name: '铌矿', value: '52301', select: false},
            {name: '钽矿', value: '52302', select: false},
            {name: '铍矿', value: '52401', select: false},
            {name: '锂矿', value: '52402', select: false},
            {name: '锆矿', value: '52403', select: false},
            {name: '锶矿(天青石)', value: '52404', select: false},
            {name: '铷矿', value: '52405', select: false},
            {name: '铯矿', value: '52406', select: false},
            {name: '重稀土矿', value: '52500', select: false},
            {name: '钇矿', value: '52501', select: false},
            {name: '钆矿', value: '52502', select: false},
            {name: '铽矿', value: '52503', select: false},
            {name: '镝矿', value: '52504', select: false},
            {name: '钬矿', value: '52505', select: false},
            {name: '铒矿', value: '52506', select: false},
            {name: '铥矿', value: '52507', select: false},
            {name: '镱矿', value: '52508', select: false},
            {name: '镥矿', value: '52509', select: false},
            {name: '轻稀土矿', value: '52600', select: false},
            {name: '铈矿', value: '52601', select: false},
            {name: '镧矿', value: '52602', select: false},
            {name: '镨矿', value: '52603', select: false},
            {name: '钕矿', value: '52604', select: false},
            {name: '钐矿', value: '52605', select: false},
            {name: '铕矿', value: '52606', select: false},
            {name: '锗矿', value: '52701', select: false},
            {name: '镓矿', value: '52702', select: false},
            {name: '铟矿', value: '52703', select: false},
            {name: '铊矿', value: '52704', select: false},
            {name: '铪矿', value: '52705', select: false},
            {name: '铼矿', value: '52706', select: false},
            {name: '镉矿', value: '52707', select: false},
            {name: '钪矿', value: '52708', select: false},
            {name: '硒矿', value: '52709', select: false},
            {name: '碲矿', value: '52711', select: false},
            {name: '蓝晶石', value: '63200', select: false},
            {name: '硅线石', value: '63210', select: false},
            {name: '红柱石', value: '63220', select: false},
            {name: '菱镁矿', value: '63640', select: false},
            {name: '萤石(普通)', value: '63701', select: false},
            {name: '熔剂用石灰岩', value: '63904', select: false},
            {name: '冶金用白云岩', value: '63941', select: false},
            {name: '冶金用石英岩', value: '63951', select: false},
            {name: '冶金用砂岩', value: '63971', select: false},
            {name: '铸型用砂岩', value: '63976', select: false},
            {name: '铸型用砂', value: '63992', select: false},
            {name: '冶金用脉石英', value: '64031', select: false},
            {name: '耐火粘土', value: '64190', select: false},
            {name: '铁钒土', value: '64310', select: false},
            {name: '其它粘土', value: '64410', select: false},
            {name: '铸型用粘土', value: '64411', select: false},
            {name: '耐火用橄榄岩', value: '64511', select: false},
            {name: '熔剂用蛇纹岩', value: '64531', select: false},
            {name: '自然硫', value: '73030', select: false},
            {name: '硫铁矿', value: '73070', select: false},
            {name: '钠硝石', value: '73240', select: false},
            {name: '明矾石', value: '73500', select: false},
            {name: '芒硝(含钙芒硝)', value: '73510', select: false},
            {name: '重晶石', value: '73530', select: false},
            {name: '毒重石', value: '73600', select: false},
            {name: '天然碱(Na2CO3)', value: '73610', select: false},
            {name: '赭石', value: '73860', select: false},
            {name: '颜料矿物', value: '73870', select: false},
            {name: '颜料黄土', value: '73880', select: false},
            {name: '电石用灰岩', value: '73901', select: false},
            {name: '制碱用灰岩', value: '73902', select: false},
            {name: '化肥用石灰岩', value: '73903', select: false},
            {name: '化肥用白云岩', value: '73942', select: false},
            {name: '化肥用石英岩', value: '73953', select: false},
            {name: '化肥用砂岩', value: '73975', select: false},
            {name: '含钾岩石', value: '74080', select: false},
            {name: '含钾砂页岩', value: '74090', select: false},
            {name: '化肥用橄榄岩', value: '74512', select: false},
            {name: '化肥用蛇纹岩', value: '74532', select: false},
            {name: '泥炭', value: '74950', select: false},
            {name: '钾盐', value: '75550', select: false},
            {name: '岩盐', value: '75511', select: false},
            {name: '湖盐', value: '75512', select: false},
            {name: '镁盐', value: '75530', select: false},
            {name: '天然卤水', value: '75540', select: false},
            {name: '碘', value: '75610', select: false},
            {name: '溴', value: '75630', select: false},
            {name: '砷', value: '75650', select: false},
            {name: '磷矿(主矿、共生矿)', value: '75690', select: false},
            {name: '金刚石', value: '83010', select: false},
            {name: '水晶', value: '83100', select: false},
            {name: '压电水晶', value: '83101', select: false},
            {name: '熔炼水晶', value: '83102', select: false},
            {name: '光学水晶', value: '83103', select: false},
            {name: '工艺水晶', value: '83104', select: false},
            {name: '蓝石棉', value: '83270', select: false},
            {name: '云母', value: '83280', select: false},
            {name: '电气石', value: '83300', select: false},
            {name: '方解石', value: '83620', select: false},
            {name: '冰洲石', value: '83630', select: false},
            {name: '光学萤石', value: '83702', select: false},
            {name: '硼矿', value: '85670', select: false},
            {name: '石墨', value: '83020', select: false},
            {name: '刚玉', value: '83110', select: false},
            {name: '硅灰石', value: '83230', select: false},
            {name: '滑石', value: '83250', select: false},
            {name: '石棉(温石棉)', value: '83260', select: false},
            {name: '长石', value: '83290', select: false},
            {name: '石榴子石', value: '83310', select: false},
            {name: '黄玉', value: '83320', select: false},
            {name: '叶腊石', value: '83330', select: false},
            {name: '透辉石', value: '83340', select: false},
            {name: '蛭石', value: '83350', select: false},
            {name: '沸石', value: '83360', select: false},
            {name: '透闪石', value: '83370', select: false},
            {name: '石膏', value: '83520', select: false},
            {name: '宝石', value: '83750', select: false},
            {name: '玉石', value: '83800', select: false},
            {name: '玛瑙', value: '83850', select: false},
            {name: '石灰岩', value: '83900', select: false},
            {name: '玻璃用灰岩', value: '83905', select: false},
            {name: '水泥用灰岩', value: '83906', select: false},
            {name: '建筑石料用灰岩', value: '83907', select: false},
            {name: '饰面用灰岩', value: '83908', select: false},
            {name: '制灰用灰岩', value: '83909', select: false},
            {name: '含钾岩石', value: '83910', select: false},
            {name: '泥灰岩', value: '83920', select: false},
            {name: '白垩', value: '83930', select: false},
            {name: '白云岩', value: '83940', select: false},
            {name: '玻璃用白云岩', value: '83943', select: false},
            {name: '建筑用白云岩', value: '83944', select: false},
            {name: '建筑用白云岩', value: '83945', select: false},
            {name: '石英岩', value: '83950', select: false},
            {name: '冶金用石英岩', value: '83951', select: false},
            {name: '玻璃用石英岩', value: '83952', select: false},
            {name: '砂岩', value: '83970', select: false},
            {name: '玻璃用砂岩', value: '83972', select: false},
            {name: '水泥配料用砂岩', value: '83973', select: false},
            {name: '砖瓦用砂岩', value: '83974', select: false},
            {name: '陶瓷用砂岩', value: '83977', select: false},
            {name: '建筑用砂岩', value: '83978', select: false},
            {name: '天然石英砂', value: '83990', select: false},
            {name: '玻璃用砂', value: '83991', select: false},
            {name: '海砂', value: '83992', select: false},
            {name: '建筑用砂', value: '83993', select: false},
            {name: '水泥配料用砂', value: '83994', select: false},
            {name: '水泥标准砂', value: '83995', select: false},
            {name: '砖瓦用砂', value: '83996', select: false},
            {name: '脉石英', value: '84030', select: false},
            {name: '玻璃用脉石英', value: '84032', select: false},
            {name: '粉石英', value: '84050', select: false},
            {name: '天然油石', value: '84070', select: false},
            {name: '硅藻土', value: '84110', select: false},
            {name: '页岩', value: '84130', select: false},
            {name: '陶粒页岩', value: '84131', select: false},
            {name: '砖瓦用页岩', value: '84132', select: false},
            {name: '水泥配料用页岩', value: '84133', select: false},
            {name: '建筑用页岩', value: '84134', select: false},
            {name: '高岭土', value: '84150', select: false},
            {name: '陶瓷土', value: '84170', select: false},
            {name: '凹凸棒石粘土', value: '84210', select: false},
            {name: '海泡石粘土', value: '84230', select: false},
            {name: '伊利石粘土', value: '84250', select: false},
            {name: '累托石粘土', value: '84270', select: false},
            {name: '膨润土', value: '84290', select: false},
            {name: '砖瓦用粘土', value: '84412', select: false},
            {name: '陶粒用粘土', value: '84413', select: false},
            {name: '水泥用粘土', value: '84414', select: false},
            {name: '水泥配料用红土', value: '84415', select: false},
            {name: '水泥配料用黄土', value: '84416', select: false},
            {name: '水泥配料用泥岩', value: '84417', select: false},
            {name: '保温材料用粘土', value: '84418', select: false},
            {name: '白云母粘土矿', value: '84419', select: false},
            {name: '橄榄岩', value: '84510', select: false},
            {name: '建筑用橄榄岩', value: '84513', select: false},
            {name: '蛇纹岩', value: '84530', select: false},
            {name: '饰面用蛇纹岩', value: '84533', select: false},
            {name: '建筑用辉石岩', value: '84542', select: false},
            {name: '玄武岩', value: '84550', select: false},
            {name: '铸石用玄武岩', value: '84551', select: false},
            {name: '岩棉用玄武岩', value: '84552', select: false},
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
        disabled: true,
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
    var sddl1 = xmSelect.render({
        el: '#sddl1',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        disabled: true,
        data: [
            {name: '耕地', children: [
                    {name: '耕地', value: '01', select: false},
                    {name: '水田', value: '0101', select: false},
                    {name: '水浇地', value: '0102', select: false},
                    {name: '旱地', value: '0103',select: false},
                ]},
            {name: '园地', children: [
                    {name: '园地', value: '02', select: false},
                    {name: '果园', value: '0201', select: false},
                    {name: '茶园', value: '0202', select: false},
                    {name: '橡胶园', value: '0203', select: false},
                    {name: '其他园地', value: '0204', select: false},
                ]},
            {name: '林地', children: [
                    {name: '林地', value: '03', select: false},
                    {name: '乔木林地', value: '0301', select: false},
                    {name: '竹林地', value: '0302', select: false},
                    {name: '红树林地', value: '0303', select: false},
                    {name: '森林沼泽', value: '0304', select: false},
                    {name: '灌木林地', value: '0305', select: false},
                    {name: '灌丛沼泽', value: '0306', select: false},
                    {name: '其他林地', value: '0307', select: false},
                ]},
            {name: '草地', children: [
                    {name: '草地', value: '04', select: false},
                    {name: '天然牧草地', value: '0401', select: false},
                    {name: '沼泽草地', value: '0402', select: false},
                    {name: '人工牧草地', value: '0403', select: false},
                    {name: '其他草地', value: '0404', select: false},
                ]},
            {name: '商服用地', children: [
                    {name: '商服用地', value: '05', select: false},
                    {name: '零售商业用地', value: '0501', select: false},
                    {name: '批发市场用地', value: '0502', select: false},
                    {name: '餐饮用地', value: '0503', select: false},
                    {name: '旅馆用地', value: '0504', select: false},
                    {name: '商务金融用地', value: '0505', select: false},
                    {name: '娱乐用地', value: '0506', select: false},
                    {name: '其他商服用地', value: '0507', select: false},
                ]},
            {name: '工矿仓储用地', children: [
                    {name: '工矿仓储用地', value: '06', select: false},
                    {name: '工业用地', value: '0601', select: false},
                    {name: '采矿用地', value: '0602', select: false},
                    {name: '盐田', value: '0603', select: false},
                    {name: '仓储用地', value: '0604', select: false},
                ]},
            {name: '住宅用地', children: [
                    {name: '住宅用地', value: '07', select: false},
                    {name: '城镇住宅用地', value: '0701', select: false},
                    {name: '农村宅基地', value: '0702', select: false},
                ]},
            {name: '公共管理与公共服务用地', children: [
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
                ]},
            {name: '特殊用地', children: [
                    {name: '特殊用地', value: '09', select: false},
                    {name: '军事设施用地', value: '0901', select: false},
                    {name: '使领馆用地', value: '0902', select: false},
                    {name: '监教场所用地', value: '0903', select: false},
                    {name: '宗教用地', value: '0904', select: false},
                    {name: '殡葬用地', value: '0905', select: false},
                    {name: '风景名胜设施用地', value: '0906', select: false},
                ]},
            {name: '交通运输用地', children: [
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
                ]},
            {name: '水域及水利设施用地', children: [
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
                ]},
            {name: '其他土地', children: [
                    {name: '其他土地', value: '12', select: false},
                    {name: '空闲地', value: '1201', select: false},
                    {name: '设施农用地', value: '1202', select: false},
                    {name: '田坎', value: '1203', select: false},
                    {name: '盐碱地', value: '1204', select: false},
                    {name: '沙地', value: '1205', select: false},
                    {name: '裸土地', value: '1206', select: false},
                    {name: '裸岩石砾地', value: '1207', select: false},
                ]},
        ],
    });
    var kz1 = xmSelect.render({
        el: '#kz1',
        theme: {
            color: '#8799a3'
        },
        autoRow: true,
        disabled: true,
        filterable: true,
        filterMethod: function(val, item, index, prop){
            if(val == item.value){//把value相同的搜索出来
                return true;
            }
            if(item.name.indexOf(val) != -1){//名称中包含的搜索出来
                return true;
            }
            return false;//不知道的就不管了
        },
        data: [
            {name: '煤', value: '11001', select: false},
            {name: '油页岩', value: '11002', select: false},
            {name: '石油', value: '11003', select: false},
            {name: '天然气', value: '11004', select: false},
            {name: '煤层气', value: '11005', select: false},
            {name: '石煤', value: '11006', select: false},
            {name: '油砂', value: '11008', select: false},
            {name: '铀', value: '12712', select: false},
            {name: '钍', value: '12713', select: false},
            {name: '天然沥青', value: '14970', select: false},
            {name: '地热', value: '17050', select: false},
            {name: '铁矿', value: '22001', select: false},
            {name: '锰矿', value: '22002', select: false},
            {name: '铬铁矿', value: '22003', select: false},
            {name: '钛矿', value: '22004', select: false},
            {name: '钒矿', value: '22005', select: false},
            {name: '金红石', value: '22006', select: false},
            {name: '铜矿', value: '32006', select: false},
            {name: '铅矿', value: '32007', select: false},
            {name: '锌矿', value: '32008', select: false},
            {name: '铝土矿', value: '32009', select: false},
            {name: '镁矿', value: '32011', select: false},
            {name: '镍矿', value: '32012', select: false},
            {name: '钴矿', value: '32013', select: false},
            {name: '钨矿', value: '32014', select: false},
            {name: '锡矿', value: '32015', select: false},
            {name: '铋矿', value: '32016', select: false},
            {name: '钼矿', value: '32017', select: false},
            {name: '汞矿', value: '32018', select: false},
            {name: '锑矿', value: '32019', select: false},
            {name: '多金属', value: '32020', select: false},
            {name: '铂矿', value: '42101', select: false},
            {name: '钯矿', value: '42102', select: false},
            {name: '铱矿', value: '42103', select: false},
            {name: '铑矿', value: '42104', select: false},
            {name: '锇矿', value: '42105', select: false},
            {name: '钌矿', value: '42106', select: false},
            {name: '砂金', value: '42200', select: false},
            {name: '金矿', value: '42201', select: false},
            {name: '银矿', value: '42202', select: false},
            {name: '铌钽矿', value: '52300', select: false},
            {name: '铌矿', value: '52301', select: false},
            {name: '钽矿', value: '52302', select: false},
            {name: '铍矿', value: '52401', select: false},
            {name: '锂矿', value: '52402', select: false},
            {name: '锆矿', value: '52403', select: false},
            {name: '锶矿(天青石)', value: '52404', select: false},
            {name: '铷矿', value: '52405', select: false},
            {name: '铯矿', value: '52406', select: false},
            {name: '重稀土矿', value: '52500', select: false},
            {name: '钇矿', value: '52501', select: false},
            {name: '钆矿', value: '52502', select: false},
            {name: '铽矿', value: '52503', select: false},
            {name: '镝矿', value: '52504', select: false},
            {name: '钬矿', value: '52505', select: false},
            {name: '铒矿', value: '52506', select: false},
            {name: '铥矿', value: '52507', select: false},
            {name: '镱矿', value: '52508', select: false},
            {name: '镥矿', value: '52509', select: false},
            {name: '轻稀土矿', value: '52600', select: false},
            {name: '铈矿', value: '52601', select: false},
            {name: '镧矿', value: '52602', select: false},
            {name: '镨矿', value: '52603', select: false},
            {name: '钕矿', value: '52604', select: false},
            {name: '钐矿', value: '52605', select: false},
            {name: '铕矿', value: '52606', select: false},
            {name: '锗矿', value: '52701', select: false},
            {name: '镓矿', value: '52702', select: false},
            {name: '铟矿', value: '52703', select: false},
            {name: '铊矿', value: '52704', select: false},
            {name: '铪矿', value: '52705', select: false},
            {name: '铼矿', value: '52706', select: false},
            {name: '镉矿', value: '52707', select: false},
            {name: '钪矿', value: '52708', select: false},
            {name: '硒矿', value: '52709', select: false},
            {name: '碲矿', value: '52711', select: false},
            {name: '蓝晶石', value: '63200', select: false},
            {name: '硅线石', value: '63210', select: false},
            {name: '红柱石', value: '63220', select: false},
            {name: '菱镁矿', value: '63640', select: false},
            {name: '萤石(普通)', value: '63701', select: false},
            {name: '熔剂用石灰岩', value: '63904', select: false},
            {name: '冶金用白云岩', value: '63941', select: false},
            {name: '冶金用石英岩', value: '63951', select: false},
            {name: '冶金用砂岩', value: '63971', select: false},
            {name: '铸型用砂岩', value: '63976', select: false},
            {name: '铸型用砂', value: '63992', select: false},
            {name: '冶金用脉石英', value: '64031', select: false},
            {name: '耐火粘土', value: '64190', select: false},
            {name: '铁钒土', value: '64310', select: false},
            {name: '其它粘土', value: '64410', select: false},
            {name: '铸型用粘土', value: '64411', select: false},
            {name: '耐火用橄榄岩', value: '64511', select: false},
            {name: '熔剂用蛇纹岩', value: '64531', select: false},
            {name: '自然硫', value: '73030', select: false},
            {name: '硫铁矿', value: '73070', select: false},
            {name: '钠硝石', value: '73240', select: false},
            {name: '明矾石', value: '73500', select: false},
            {name: '芒硝(含钙芒硝)', value: '73510', select: false},
            {name: '重晶石', value: '73530', select: false},
            {name: '毒重石', value: '73600', select: false},
            {name: '天然碱(Na2CO3)', value: '73610', select: false},
            {name: '赭石', value: '73860', select: false},
            {name: '颜料矿物', value: '73870', select: false},
            {name: '颜料黄土', value: '73880', select: false},
            {name: '电石用灰岩', value: '73901', select: false},
            {name: '制碱用灰岩', value: '73902', select: false},
            {name: '化肥用石灰岩', value: '73903', select: false},
            {name: '化肥用白云岩', value: '73942', select: false},
            {name: '化肥用石英岩', value: '73953', select: false},
            {name: '化肥用砂岩', value: '73975', select: false},
            {name: '含钾岩石', value: '74080', select: false},
            {name: '含钾砂页岩', value: '74090', select: false},
            {name: '化肥用橄榄岩', value: '74512', select: false},
            {name: '化肥用蛇纹岩', value: '74532', select: false},
            {name: '泥炭', value: '74950', select: false},
            {name: '钾盐', value: '75550', select: false},
            {name: '岩盐', value: '75511', select: false},
            {name: '湖盐', value: '75512', select: false},
            {name: '镁盐', value: '75530', select: false},
            {name: '天然卤水', value: '75540', select: false},
            {name: '碘', value: '75610', select: false},
            {name: '溴', value: '75630', select: false},
            {name: '砷', value: '75650', select: false},
            {name: '磷矿(主矿、共生矿)', value: '75690', select: false},
            {name: '金刚石', value: '83010', select: false},
            {name: '水晶', value: '83100', select: false},
            {name: '压电水晶', value: '83101', select: false},
            {name: '熔炼水晶', value: '83102', select: false},
            {name: '光学水晶', value: '83103', select: false},
            {name: '工艺水晶', value: '83104', select: false},
            {name: '蓝石棉', value: '83270', select: false},
            {name: '云母', value: '83280', select: false},
            {name: '电气石', value: '83300', select: false},
            {name: '方解石', value: '83620', select: false},
            {name: '冰洲石', value: '83630', select: false},
            {name: '光学萤石', value: '83702', select: false},
            {name: '硼矿', value: '85670', select: false},
            {name: '石墨', value: '83020', select: false},
            {name: '刚玉', value: '83110', select: false},
            {name: '硅灰石', value: '83230', select: false},
            {name: '滑石', value: '83250', select: false},
            {name: '石棉(温石棉)', value: '83260', select: false},
            {name: '长石', value: '83290', select: false},
            {name: '石榴子石', value: '83310', select: false},
            {name: '黄玉', value: '83320', select: false},
            {name: '叶腊石', value: '83330', select: false},
            {name: '透辉石', value: '83340', select: false},
            {name: '蛭石', value: '83350', select: false},
            {name: '沸石', value: '83360', select: false},
            {name: '透闪石', value: '83370', select: false},
            {name: '石膏', value: '83520', select: false},
            {name: '宝石', value: '83750', select: false},
            {name: '玉石', value: '83800', select: false},
            {name: '玛瑙', value: '83850', select: false},
            {name: '石灰岩', value: '83900', select: false},
            {name: '玻璃用灰岩', value: '83905', select: false},
            {name: '水泥用灰岩', value: '83906', select: false},
            {name: '建筑石料用灰岩', value: '83907', select: false},
            {name: '饰面用灰岩', value: '83908', select: false},
            {name: '制灰用灰岩', value: '83909', select: false},
            {name: '含钾岩石', value: '83910', select: false},
            {name: '泥灰岩', value: '83920', select: false},
            {name: '白垩', value: '83930', select: false},
            {name: '白云岩', value: '83940', select: false},
            {name: '玻璃用白云岩', value: '83943', select: false},
            {name: '建筑用白云岩', value: '83944', select: false},
            {name: '建筑用白云岩', value: '83945', select: false},
            {name: '石英岩', value: '83950', select: false},
            {name: '冶金用石英岩', value: '83951', select: false},
            {name: '玻璃用石英岩', value: '83952', select: false},
            {name: '砂岩', value: '83970', select: false},
            {name: '玻璃用砂岩', value: '83972', select: false},
            {name: '水泥配料用砂岩', value: '83973', select: false},
            {name: '砖瓦用砂岩', value: '83974', select: false},
            {name: '陶瓷用砂岩', value: '83977', select: false},
            {name: '建筑用砂岩', value: '83978', select: false},
            {name: '天然石英砂', value: '83990', select: false},
            {name: '玻璃用砂', value: '83991', select: false},
            {name: '海砂', value: '83992', select: false},
            {name: '建筑用砂', value: '83993', select: false},
            {name: '水泥配料用砂', value: '83994', select: false},
            {name: '水泥标准砂', value: '83995', select: false},
            {name: '砖瓦用砂', value: '83996', select: false},
            {name: '脉石英', value: '84030', select: false},
            {name: '玻璃用脉石英', value: '84032', select: false},
            {name: '粉石英', value: '84050', select: false},
            {name: '天然油石', value: '84070', select: false},
            {name: '硅藻土', value: '84110', select: false},
            {name: '页岩', value: '84130', select: false},
            {name: '陶粒页岩', value: '84131', select: false},
            {name: '砖瓦用页岩', value: '84132', select: false},
            {name: '水泥配料用页岩', value: '84133', select: false},
            {name: '建筑用页岩', value: '84134', select: false},
            {name: '高岭土', value: '84150', select: false},
            {name: '陶瓷土', value: '84170', select: false},
            {name: '凹凸棒石粘土', value: '84210', select: false},
            {name: '海泡石粘土', value: '84230', select: false},
            {name: '伊利石粘土', value: '84250', select: false},
            {name: '累托石粘土', value: '84270', select: false},
            {name: '膨润土', value: '84290', select: false},
            {name: '砖瓦用粘土', value: '84412', select: false},
            {name: '陶粒用粘土', value: '84413', select: false},
            {name: '水泥用粘土', value: '84414', select: false},
            {name: '水泥配料用红土', value: '84415', select: false},
            {name: '水泥配料用黄土', value: '84416', select: false},
            {name: '水泥配料用泥岩', value: '84417', select: false},
            {name: '保温材料用粘土', value: '84418', select: false},
            {name: '白云母粘土矿', value: '84419', select: false},
            {name: '橄榄岩', value: '84510', select: false},
            {name: '建筑用橄榄岩', value: '84513', select: false},
            {name: '蛇纹岩', value: '84530', select: false},
            {name: '饰面用蛇纹岩', value: '84533', select: false},
            {name: '建筑用辉石岩', value: '84542', select: false},
            {name: '玄武岩', value: '84550', select: false},
            {name: '铸石用玄武岩', value: '84551', select: false},
            {name: '岩棉用玄武岩', value: '84552', select: false},
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
    var nxffx1 = xmSelect.render({
        el: '#nxffx1',
        theme: {
            color: '#8799a3',
        },
        autoRow: true,
        disabled: true,
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
    var ajax = new HttpRequest(Feng.ctxPath + "/LsylTask/detail?id=" + Feng.getUrlParam("id"), "get");
    var result = ajax.start();
    var data = result.data;
    // var type = data.taskStatus;
    console.log(result.data.lsylResult);

    if (data.lsylResult != null) {
        $("#verificationLsylTaskForm").css("display", "");
        if (data.lsylResult.sddl != null) {
            sddl.append(data.lsylResult.sddl.split(','));
        }
        if (data.lsylResult.kz != null) {
            kz.append(data.lsylResult.kz.split(','));
        }
        if (data.lsylResult.nxffx != null) {
            nxffx.append(data.lsylResult.nxffx.split(','));
        }
        if (data.lsylResult.tbdl != null){
            var TBdl = data.lsylResult.tbdl;
            if ( TBdl == "10") {
                var Options = "<option value=\" \"></option>\n" +
                    "                    <option value=\"11\">无法确认治理恢复责任主体的无主废弃矿山</option>\n" +
                    "                    <option value=\"12\">由政府承担治理恢复责任的政策性关闭矿山</option>"
                var $Options = $(Options);
                $Options.appendTo($("#tbxl"));
                $("#lsylmassage").css("display","")
                $("#KW").css("display","")
            } else if ( TBdl == "20") {
                $("#tbxl").append("<option value=\" \"></option>\n" +
                    "                    <option value=\"21\">由企业履行治理恢复责任的政策性关闭矿山</option>\n" +
                    "                    <option value=\"22\">由企业或个人履行治理恢复责任的有主废弃矿山</option>")
                $("#lsylmassage").css("display","none")
                $("#KW").css("display","none")
            } else if ( TBdl == "30") {
                $("#tbxl").append("<option value=\" \"></option>\n" +
                    "                    <option value=\"31\">生产矿山</option>\n" +
                    "                    <option value=\"32\">采矿权过期未注销矿山</option>\n" +
                    "                    <option value=\"33\">自然灾毁</option>\n" +
                    "                    <option value=\"34\">工程建设损毁</option>\n" +
                    "                    <option value=\"35\">河道采砂损毁</option>\n" +
                    "                    <option value=\"36\">尾矿库占用损毁</option>\n" +
                    "                    <option value=\"37\">未损毁</option>")
                $("#lsylmassage").css("display","none")
                $("#KW").css("display","none")
            } else if ( TBdl == "40") {
                $("#tbxl").append("<option value=\" \"></option>\n" +
                    "                    <option value=\"41\">有效矿业权范围内功能未损毁的采矿沉陷区</option>\n" +
                    "                    <option value=\"42\">过期未注销矿业权范围内功能未损毁的采矿沉陷区</option>\n" +
                    "                    <option value=\"43\">其他功能未损毁的采矿沉陷区</option>")
                $("#lsylmassage").css("display","none")
                $("#KW").css("display","none")
            }
        }
        form.val('verificationLsylTaskForm', data.lsylResult);
    }

    if (data.spotHistoricalmineBakResult != null) {
        $("#verificationLsylTaskForm1").css("display", "");
        if (data.spotHistoricalmineBakResult.tbmj != null) {
            var tbmj = data.spotHistoricalmineBakResult.tbmj;
            var tbmjM = 0.0015*tbmj;
            $("[name='tbmjm']").val(tbmjM)
        }
        if (data.spotHistoricalmineBakResult.sddl != null) {
            sddl1.append(data.spotHistoricalmineBakResult.sddl.split(','));
        }
        if (data.spotHistoricalmineBakResult.kz != null) {
            kz1.append(data.spotHistoricalmineBakResult.kz.split(','));
        }
        if (data.spotHistoricalmineBakResult.nxffx != null) {
            nxffx1.append(data.spotHistoricalmineBakResult.nxffx.split(','));
        }
        if (data.spotHistoricalmineBakResult.tbdl != null){
            var TBdl = data.spotHistoricalmineBakResult.tbdl;
            if ( TBdl == "10") {
                var Options = "<option value=\" \"></option>\n" +
                    "                    <option value=\"11\">无法确认治理恢复责任主体的无主废弃矿山</option>\n" +
                    "                    <option value=\"12\">由政府承担治理恢复责任的政策性关闭矿山</option>"
                var $Options = $(Options);
                $Options.appendTo($("#tbxl1"));
                $("#lsylverimassage").css("display","")
            } else if ( TBdl == "20") {
                $("#tbxl1").append("<option value=\" \"></option>\n" +
                    "                    <option value=\"21\">由企业履行治理恢复责任的政策性关闭矿山</option>\n" +
                    "                    <option value=\"22\">由企业或个人履行治理恢复责任的有主废弃矿山</option>")
                $("#lsylverimassage").css("display","none")
            } else if ( TBdl == "30") {
                $("#tbxl1").append("<option value=\" \"></option>\n" +
                    "                    <option value=\"31\">生产矿山</option>\n" +
                    "                    <option value=\"32\">采矿权过期未注销矿山</option>\n" +
                    "                    <option value=\"33\">自然灾毁</option>\n" +
                    "                    <option value=\"34\">工程建设损毁</option>\n" +
                    "                    <option value=\"35\">河道采砂损毁</option>\n" +
                    "                    <option value=\"36\">尾矿库占用损毁</option>\n" +
                    "                    <option value=\"37\">未损毁</option>")
                $("#lsylverimassage").css("display","none")
            } else if ( TBdl == "40") {
                $("#tbxl1").append("<option value=\" \"></option>\n" +
                    "                    <option value=\"41\">有效矿业权范围内功能未损毁的采矿沉陷区</option>\n" +
                    "                    <option value=\"42\">过期未注销矿业权范围内功能未损毁的采矿沉陷区</option>\n" +
                    "                    <option value=\"43\">其他功能未损毁的采矿沉陷区</option>")
                $("#lsylverimassage").css("display","none")
            }
        }
        form.val('verificationLsylTaskForm1', data.spotHistoricalmineBakResult);
    }
    if (data.spotHistoricalmineBakResult == null) {
        $("#alarm").css("display", "");
    }


    //图片显示判断
    // if ( type==4 || type == 5){
    //     $("#photo").css("display","")
    // }
    // else {
    //     $('#photo').css("display","none")
    // }
    var fileids = data.fileBusinessName;
    if (fileids != null) {
        var imageId_array = fileids.split(',');
        var L = imageId_array.length;
        for (var i = 0; i < L; i++) {
            var newImage = document.createElement("img");
            newImage.id = "a" + [i];
            var GfatherDiv = document.getElementById("a");
            GfatherDiv.appendChild(newImage);
            $("#a" + [i]).attr('src', Feng.ctxPath + '/system/previewImage/' + imageId_array[i])
        }
        var img = document.querySelectorAll("img");
        let FirW = new Array();
        console.log("action")
        setTimeout(function () {
            for (var i = 0; i < L; i++) {
                FirW.push((img[i].width / img[i].height) * 550)
            }
            ;
            console.log(FirW)
            setTimeout(function () {
                for (var i = 0; i < L; i++) {
                    img[i].style.width = FirW[i] + "px";
                    img[i].style.height = "550px"
                }
                $("#photo").css("display", "")
            }, 1000);
        }, 500);
    }


    //图片轮播
    carousel.render({
        elem: '#card'
        , width: '100%' //设置容器宽度
        , height: '100%' //设置容器高度
        , arrow: 'hover'
        , indicator: 'outside'
    });


    // if (type == 4) {
    //     $("#sh").css("display", "")
    // } else {
    //     $("#sh").css("display", "none")
    // }

});