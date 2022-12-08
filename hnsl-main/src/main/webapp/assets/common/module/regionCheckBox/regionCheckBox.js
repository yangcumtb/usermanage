/**
 @ Name：layui.regionCheckBox 中国省市复选框
 @ Author：wanmianji
 */

;!function(){
	'use strict';
	
	var new_element = document.createElement('script');
	new_element.setAttribute('type', 'text/javascript');
	new_element.setAttribute('src', layui.cache.base + 'regionCheckBox/data/region.json');
	document.body.appendChild(new_element);
}();
var regionCheckBoxList = [
	{'VALUE': '华北', 'TITLE': '华北：', 'TYPE': 'area', 'CHILDREN': [
			{'VALUE': '北京', 'TITLE': '北京', 'TYPE': 'province'},
			{'VALUE': '天津', 'TITLE': '天津', 'TYPE': 'province'},
			{'VALUE': '河北', 'TITLE': '河北', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '河北-石家庄', 'TITLE': '石家庄', 'TYPE': 'city'},
					{'VALUE': '河北-唐山', 'TITLE': '唐山', 'TYPE': 'city'},
					{'VALUE': '河北-秦皇岛', 'TITLE': '秦皇岛', 'TYPE': 'city'},
					{'VALUE': '河北-邯郸', 'TITLE': '邯郸', 'TYPE': 'city'},
					{'VALUE': '河北-邢台', 'TITLE': '邢台', 'TYPE': 'city'},
					{'VALUE': '河北-保定', 'TITLE': '保定', 'TYPE': 'city'},
					{'VALUE': '河北-张家界', 'TITLE': '张家界', 'TYPE': 'city'},
					{'VALUE': '河北-承德', 'TITLE': '承德', 'TYPE': 'city'},
					{'VALUE': '河北-廊坊', 'TITLE': '廊坊', 'TYPE': 'city'},
					{'VALUE': '河北-衡水', 'TITLE': '衡水', 'TYPE': 'city'},
					{'VALUE': '河北-沧州', 'TITLE': '沧州', 'TYPE': 'city'}
				]},
			{'VALUE': '山西', 'TITLE': '山西', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '山西-太原', 'TITLE': '太原', 'TYPE': 'city'},
					{'VALUE': '山西-大同', 'TITLE': '大同', 'TYPE': 'city'},
					{'VALUE': '山西-阳泉', 'TITLE': '阳泉', 'TYPE': 'city'},
					{'VALUE': '山西-长治', 'TITLE': '长治', 'TYPE': 'city'},
					{'VALUE': '山西-晋城', 'TITLE': '晋城', 'TYPE': 'city'},
					{'VALUE': '山西-朔州', 'TITLE': '朔州', 'TYPE': 'city'},
					{'VALUE': '山西-晋中', 'TITLE': '晋中', 'TYPE': 'city'},
					{'VALUE': '山西-运城', 'TITLE': '运城', 'TYPE': 'city'},
					{'VALUE': '山西-忻州', 'TITLE': '忻州', 'TYPE': 'city'},
					{'VALUE': '山西-临汾', 'TITLE': '临汾', 'TYPE': 'city'},
					{'VALUE': '山西-吕梁', 'TITLE': '吕梁', 'TYPE': 'city'}
				]},
			{'VALUE': '内蒙古', 'TITLE': '内蒙古', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '内蒙古-呼和浩特', 'TITLE': '呼和浩特', 'TYPE': 'city'},
					{'VALUE': '内蒙古-包头', 'TITLE': '包头', 'TYPE': 'city'},
					{'VALUE': '内蒙古-乌海', 'TITLE': '乌海', 'TYPE': 'city'},
					{'VALUE': '内蒙古-赤峰', 'TITLE': '赤峰', 'TYPE': 'city'},
					{'VALUE': '内蒙古-通辽', 'TITLE': '通辽', 'TYPE': 'city'},
					{'VALUE': '内蒙古-鄂尔多斯', 'TITLE': '鄂尔多斯', 'TYPE': 'city'},
					{'VALUE': '内蒙古-呼伦贝尔', 'TITLE': '呼伦贝尔', 'TYPE': 'city'},
					{'VALUE': '内蒙古-乌兰察布盟', 'TITLE': '乌兰察布盟', 'TYPE': 'city'},
					{'VALUE': '内蒙古-锡林郭勒盟', 'TITLE': '锡林郭勒盟', 'TYPE': 'city'},
					{'VALUE': '内蒙古-巴彦淖尔盟', 'TITLE': '巴彦淖尔盟', 'TYPE': 'city'},
					{'VALUE': '内蒙古-阿拉善盟', 'TITLE': '阿拉善盟', 'TYPE': 'city'},
					{'VALUE': '内蒙古-兴安盟', 'TITLE': '兴安盟', 'TYPE': 'city'}
				]}
		]},

	{'VALUE': '华东', 'TITLE': '华东：', 'TYPE': 'area', 'CHILDREN': [
			{'VALUE': '上海', 'TITLE': '上海', 'TYPE': 'province'},
			{'VALUE': '江苏', 'TITLE': '江苏', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '江苏-南京', 'TITLE': '南京', 'TYPE': 'city'},
					{'VALUE': '江苏-徐州', 'TITLE': '徐州', 'TYPE': 'city'},
					{'VALUE': '江苏-连云港', 'TITLE': '连云港', 'TYPE': 'city'},
					{'VALUE': '江苏-淮安', 'TITLE': '淮安', 'TYPE': 'city'},
					{'VALUE': '江苏-宿迁', 'TITLE': '宿迁', 'TYPE': 'city'},
					{'VALUE': '江苏-盐城', 'TITLE': '盐城', 'TYPE': 'city'},
					{'VALUE': '江苏-扬州', 'TITLE': '扬州', 'TYPE': 'city'},
					{'VALUE': '江苏-泰州', 'TITLE': '泰州', 'TYPE': 'city'},
					{'VALUE': '江苏-南通', 'TITLE': '南通', 'TYPE': 'city'},
					{'VALUE': '江苏-镇江', 'TITLE': '镇江', 'TYPE': 'city'},
					{'VALUE': '江苏-常州', 'TITLE': '常州', 'TYPE': 'city'},
					{'VALUE': '江苏-无锡', 'TITLE': '无锡', 'TYPE': 'city'},
					{'VALUE': '江苏-苏州', 'TITLE': '苏州', 'TYPE': 'city'}
				]},
			{'VALUE': '浙江', 'TITLE': '浙江', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '浙江-杭州', 'TITLE': '杭州', 'TYPE': 'city'},
					{'VALUE': '浙江-宁波', 'TITLE': '宁波', 'TYPE': 'city'},
					{'VALUE': '浙江-温州', 'TITLE': '温州', 'TYPE': 'city'},
					{'VALUE': '浙江-嘉兴', 'TITLE': '嘉兴', 'TYPE': 'city'},
					{'VALUE': '浙江-湖州', 'TITLE': '湖州', 'TYPE': 'city'},
					{'VALUE': '浙江-绍兴', 'TITLE': '绍兴', 'TYPE': 'city'},
					{'VALUE': '浙江-金华', 'TITLE': '金华', 'TYPE': 'city'},
					{'VALUE': '浙江-衢州', 'TITLE': '衢州', 'TYPE': 'city'},
					{'VALUE': '浙江-舟山', 'TITLE': '舟山', 'TYPE': 'city'},
					{'VALUE': '浙江-台州', 'TITLE': '台州', 'TYPE': 'city'},
					{'VALUE': '浙江-丽水', 'TITLE': '丽水', 'TYPE': 'city'}
				]},
			{'VALUE': '安徽', 'TITLE': '安徽', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '安徽-合肥', 'TITLE': '合肥', 'TYPE': 'city'},
					{'VALUE': '安徽-芜湖', 'TITLE': '芜湖', 'TYPE': 'city'},
					{'VALUE': '安徽-蚌埠', 'TITLE': '蚌埠', 'TYPE': 'city'},
					{'VALUE': '安徽-淮南', 'TITLE': '淮南', 'TYPE': 'city'},
					{'VALUE': '安徽-马鞍山', 'TITLE': '马鞍山', 'TYPE': 'city'},
					{'VALUE': '安徽-淮北', 'TITLE': '淮北', 'TYPE': 'city'},
					{'VALUE': '安徽-铜陵', 'TITLE': '铜陵', 'TYPE': 'city'},
					{'VALUE': '安徽-安庆', 'TITLE': '安庆', 'TYPE': 'city'},
					{'VALUE': '安徽-黄山', 'TITLE': '黄山', 'TYPE': 'city'},
					{'VALUE': '安徽-滁州', 'TITLE': '滁州', 'TYPE': 'city'},
					{'VALUE': '安徽-阜阳', 'TITLE': '阜阳', 'TYPE': 'city'},
					{'VALUE': '安徽-宿州', 'TITLE': '宿州', 'TYPE': 'city'},
					{'VALUE': '安徽-六安', 'TITLE': '六安', 'TYPE': 'city'},
					{'VALUE': '安徽-亳州', 'TITLE': '亳州', 'TYPE': 'city'},
					{'VALUE': '安徽-池州', 'TITLE': '池州', 'TYPE': 'city'},
					{'VALUE': '安徽-宣城', 'TITLE': '宣城', 'TYPE': 'city'}
				]},
			{'VALUE': '福建', 'TITLE': '福建', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '福建-福州', 'TITLE': '福州', 'TYPE': 'city'},
					{'VALUE': '福建-厦门', 'TITLE': '厦门', 'TYPE': 'city'},
					{'VALUE': '福建-三明', 'TITLE': '三明', 'TYPE': 'city'},
					{'VALUE': '福建-莆田', 'TITLE': '莆田', 'TYPE': 'city'},
					{'VALUE': '福建-泉州', 'TITLE': '泉州', 'TYPE': 'city'},
					{'VALUE': '福建-漳州', 'TITLE': '漳州', 'TYPE': 'city'},
					{'VALUE': '福建-南平', 'TITLE': '南平', 'TYPE': 'city'},
					{'VALUE': '福建-龙岩', 'TITLE': '龙岩', 'TYPE': 'city'},
					{'VALUE': '福建-宁德', 'TITLE': '宁德', 'TYPE': 'city'},
					{'VALUE': '福建-平潭', 'TITLE': '平潭', 'TYPE': 'city'}
				]},
			{'VALUE': '江西', 'TITLE': '江西', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '江西-南昌', 'TITLE': '南昌', 'TYPE': 'city'},
					{'VALUE': '江西-景德镇', 'TITLE': '景德镇', 'TYPE': 'city'},
					{'VALUE': '江西-萍乡', 'TITLE': '萍乡', 'TYPE': 'city'},
					{'VALUE': '江西-九江', 'TITLE': '九江', 'TYPE': 'city'},
					{'VALUE': '江西-新余', 'TITLE': '新余', 'TYPE': 'city'},
					{'VALUE': '江西-鹰潭', 'TITLE': '鹰潭', 'TYPE': 'city'},
					{'VALUE': '江西-赣州', 'TITLE': '赣州', 'TYPE': 'city'},
					{'VALUE': '江西-吉安', 'TITLE': '吉安', 'TYPE': 'city'},
					{'VALUE': '江西-宜春', 'TITLE': '宜春', 'TYPE': 'city'},
					{'VALUE': '江西-抚州', 'TITLE': '抚州', 'TYPE': 'city'},
					{'VALUE': '江西-上饶', 'TITLE': '上饶', 'TYPE': 'city'}
				]},
			{'VALUE': '山东', 'TITLE': '山东', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '山东-济南', 'TITLE': '济南', 'TYPE': 'city'},
					{'VALUE': '山东-青岛', 'TITLE': '青岛', 'TYPE': 'city'},
					{'VALUE': '山东-淄博', 'TITLE': '淄博', 'TYPE': 'city'},
					{'VALUE': '山东-枣庄', 'TITLE': '枣庄', 'TYPE': 'city'},
					{'VALUE': '山东-东营', 'TITLE': '东营', 'TYPE': 'city'},
					{'VALUE': '山东-潍坊', 'TITLE': '潍坊', 'TYPE': 'city'},
					{'VALUE': '山东-烟台', 'TITLE': '烟台', 'TYPE': 'city'},
					{'VALUE': '山东-威海', 'TITLE': '威海', 'TYPE': 'city'},
					{'VALUE': '山东-济宁', 'TITLE': '济宁', 'TYPE': 'city'},
					{'VALUE': '山东-泰安', 'TITLE': '泰安', 'TYPE': 'city'},
					{'VALUE': '山东-日照', 'TITLE': '日照', 'TYPE': 'city'},
					{'VALUE': '山东-莱芜', 'TITLE': '莱芜', 'TYPE': 'city'},
					{'VALUE': '山东-临沂', 'TITLE': '临沂', 'TYPE': 'city'},
					{'VALUE': '山东-德州', 'TITLE': '德州', 'TYPE': 'city'},
					{'VALUE': '山东-聊城', 'TITLE': '聊城', 'TYPE': 'city'},
					{'VALUE': '山东-滨州', 'TITLE': '滨州', 'TYPE': 'city'},
					{'VALUE': '山东-菏泽', 'TITLE': '菏泽', 'TYPE': 'city'}

				]}
		]},

	{'VALUE': '华中', 'TITLE': '华中：', 'TYPE': 'area', 'CHILDREN': [
			{'VALUE': '河南', 'TITLE': '河南', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '河南-郑州', 'TITLE': '郑州', 'TYPE': 'city'},
					{'VALUE': '河南-开封', 'TITLE': '开封', 'TYPE': 'city'},
					{'VALUE': '河南-洛阳', 'TITLE': '洛阳', 'TYPE': 'city'},
					{'VALUE': '河南-平顶山', 'TITLE': '平顶山', 'TYPE': 'city'},
					{'VALUE': '河南-焦作', 'TITLE': '焦作', 'TYPE': 'city'},
					{'VALUE': '河南-鹤壁', 'TITLE': '鹤壁', 'TYPE': 'city'},
					{'VALUE': '河南-新乡', 'TITLE': '新乡', 'TYPE': 'city'},
					{'VALUE': '河南-安阳', 'TITLE': '安阳', 'TYPE': 'city'},
					{'VALUE': '河南-濮阳', 'TITLE': '濮阳', 'TYPE': 'city'},
					{'VALUE': '河南-许昌', 'TITLE': '许昌', 'TYPE': 'city'},
					{'VALUE': '河南-漯河', 'TITLE': '漯河', 'TYPE': 'city'},
					{'VALUE': '河南-三门峡', 'TITLE': '三门峡', 'TYPE': 'city'},
					{'VALUE': '河南-南阳', 'TITLE': '南阳', 'TYPE': 'city'},
					{'VALUE': '河南-商丘', 'TITLE': '商丘', 'TYPE': 'city'},
					{'VALUE': '河南-信阳', 'TITLE': '信阳', 'TYPE': 'city'},
					{'VALUE': '河南-周口', 'TITLE': '周口', 'TYPE': 'city'},
					{'VALUE': '河南-驻马店', 'TITLE': '驻马店', 'TYPE': 'city'},
					{'VALUE': '河南-济源', 'TITLE': '济源', 'TYPE': 'city'}
				]},
			{'VALUE': '湖北', 'TITLE': '湖北', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '湖北-武汉', 'TITLE': '武汉', 'TYPE': 'city'},
					{'VALUE': '湖北-黄石', 'TITLE': '黄石', 'TYPE': 'city'},
					{'VALUE': '湖北-襄阳', 'TITLE': '襄阳', 'TYPE': 'city'},
					{'VALUE': '湖北-十堰', 'TITLE': '十堰', 'TYPE': 'city'},
					{'VALUE': '湖北-荆州', 'TITLE': '荆州', 'TYPE': 'city'},
					{'VALUE': '湖北-宜昌', 'TITLE': '宜昌', 'TYPE': 'city'},
					{'VALUE': '湖北-荆门', 'TITLE': '荆门', 'TYPE': 'city'},
					{'VALUE': '湖北-鄂州', 'TITLE': '鄂州', 'TYPE': 'city'},
					{'VALUE': '湖北-孝感', 'TITLE': '孝感', 'TYPE': 'city'},
					{'VALUE': '湖北-黄冈', 'TITLE': '黄冈', 'TYPE': 'city'},
					{'VALUE': '湖北-咸宁', 'TITLE': '咸宁', 'TYPE': 'city'},
					{'VALUE': '湖北-随州', 'TITLE': '随州', 'TYPE': 'city'},
					{'VALUE': '湖北-恩施土家族苗族自治州', 'TITLE': '恩施土家族苗族自治州', 'TYPE': 'city'},
					{'VALUE': '湖北-仙桃', 'TITLE': '仙桃', 'TYPE': 'city'},
					{'VALUE': '湖北-天门', 'TITLE': '天门', 'TYPE': 'city'},
					{'VALUE': '湖北-潜江', 'TITLE': '潜江', 'TYPE': 'city'},
					{'VALUE': '湖北-神农架林区', 'TITLE': '神农架林区', 'TYPE': 'city'}
				]},
			{'VALUE': '湖南', 'TITLE': '湖南', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '湖南-长沙', 'TITLE': '长沙', 'TYPE': 'city'},
					{'VALUE': '湖南-株洲', 'TITLE': '株洲', 'TYPE': 'city'},
					{'VALUE': '湖南-湘潭', 'TITLE': '湘潭', 'TYPE': 'city'},
					{'VALUE': '湖南-衡阳', 'TITLE': '衡阳', 'TYPE': 'city'},
					{'VALUE': '湖南-邵阳', 'TITLE': '邵阳', 'TYPE': 'city'},
					{'VALUE': '湖南-岳阳', 'TITLE': '岳阳', 'TYPE': 'city'},
					{'VALUE': '湖南-常德', 'TITLE': '常德', 'TYPE': 'city'},
					{'VALUE': '湖南-张家界', 'TITLE': '张家界', 'TYPE': 'city'},
					{'VALUE': '湖南-益阳', 'TITLE': '益阳', 'TYPE': 'city'},
					{'VALUE': '湖南-郴州', 'TITLE': '郴州', 'TYPE': 'city'},
					{'VALUE': '湖南-永州', 'TITLE': '永州', 'TYPE': 'city'},
					{'VALUE': '湖南-怀化', 'TITLE': '怀化', 'TYPE': 'city'},
					{'VALUE': '湖南-娄底', 'TITLE': '娄底', 'TYPE': 'city'},
					{'VALUE': '湖南-湘西土家族苗族自治州', 'TITLE': '湘西土家族苗族自治州', 'TYPE': 'city'}
				]}
		]},

	{'VALUE': '华南', 'TITLE': '华南：', 'TYPE': 'area', 'CHILDREN': [
			{'VALUE': '广东', 'TITLE': '广东', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '广东-广州', 'TITLE': '广州', 'TYPE': 'city'},
					{'VALUE': '广东-深圳', 'TITLE': '深圳', 'TYPE': 'city'},
					{'VALUE': '广东-珠海', 'TITLE': '珠海', 'TYPE': 'city'},
					{'VALUE': '广东-汕头', 'TITLE': '汕头', 'TYPE': 'city'},
					{'VALUE': '广东-韶关', 'TITLE': '韶关', 'TYPE': 'city'},
					{'VALUE': '广东-河源', 'TITLE': '河源', 'TYPE': 'city'},
					{'VALUE': '广东-梅州', 'TITLE': '梅州', 'TYPE': 'city'},
					{'VALUE': '广东-汕尾', 'TITLE': '汕尾', 'TYPE': 'city'},
					{'VALUE': '广东-东莞', 'TITLE': '东莞', 'TYPE': 'city'},
					{'VALUE': '广东-中山', 'TITLE': '中山', 'TYPE': 'city'},
					{'VALUE': '广东-江门', 'TITLE': '江门', 'TYPE': 'city'},
					{'VALUE': '广东-佛山', 'TITLE': '佛山', 'TYPE': 'city'},
					{'VALUE': '广东-阳江', 'TITLE': '阳江', 'TYPE': 'city'},
					{'VALUE': '广东-湛江', 'TITLE': '湛江', 'TYPE': 'city'},
					{'VALUE': '广东-茂名', 'TITLE': '茂名', 'TYPE': 'city'},
					{'VALUE': '广东-肇庆', 'TITLE': '肇庆', 'TYPE': 'city'},
					{'VALUE': '广东-清远', 'TITLE': '清远', 'TYPE': 'city'},
					{'VALUE': '广东-潮州', 'TITLE': '潮州', 'TYPE': 'city'},
					{'VALUE': '广东-揭阳', 'TITLE': '揭阳', 'TYPE': 'city'},
					{'VALUE': '广东-云浮', 'TITLE': '云浮', 'TYPE': 'city'},
					{'VALUE': '广东-惠州', 'TITLE': '惠州', 'TYPE': 'city'}
				]},
			{'VALUE': '广西', 'TITLE': '广西', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '广西-南宁', 'TITLE': '南宁', 'TYPE': 'city'},
					{'VALUE': '广西-柳州', 'TITLE': '柳州', 'TYPE': 'city'},
					{'VALUE': '广西-桂林', 'TITLE': '桂林', 'TYPE': 'city'},
					{'VALUE': '广西-梧州', 'TITLE': '梧州', 'TYPE': 'city'},
					{'VALUE': '广西-北海', 'TITLE': '北海', 'TYPE': 'city'},
					{'VALUE': '广西-防城港', 'TITLE': '防城港', 'TYPE': 'city'},
					{'VALUE': '广西-钦州', 'TITLE': '钦州', 'TYPE': 'city'},
					{'VALUE': '广西-贵港', 'TITLE': '贵港', 'TYPE': 'city'},
					{'VALUE': '广西-玉林', 'TITLE': '玉林', 'TYPE': 'city'},
					{'VALUE': '广西-百色', 'TITLE': '百色', 'TYPE': 'city'},
					{'VALUE': '广西-贺州', 'TITLE': '贺州', 'TYPE': 'city'},
					{'VALUE': '广西-河池', 'TITLE': '河池', 'TYPE': 'city'},
					{'VALUE': '广西-来宾', 'TITLE': '来宾', 'TYPE': 'city'},
					{'VALUE': '广西-崇左', 'TITLE': '崇左', 'TYPE': 'city'}
				]},
			{'VALUE': '海南', 'TITLE': '海南', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '海南-海口', 'TITLE': '海口', 'TYPE': 'city'},
					{'VALUE': '海南-三亚', 'TITLE': '三亚', 'TYPE': 'city'},
					{'VALUE': '海南-文昌', 'TITLE': '文昌', 'TYPE': 'city'},
					{'VALUE': '海南-琼海', 'TITLE': '琼海', 'TYPE': 'city'},
					{'VALUE': '海南-万宁', 'TITLE': '万宁', 'TYPE': 'city'},
					{'VALUE': '海南-五指山', 'TITLE': '五指山', 'TYPE': 'city'},
					{'VALUE': '海南-东方', 'TITLE': '东方', 'TYPE': 'city'},
					{'VALUE': '海南-儋州', 'TITLE': '儋州', 'TYPE': 'city'},
					{'VALUE': '海南-临高', 'TITLE': '临高', 'TYPE': 'city'},
					{'VALUE': '海南-澄迈', 'TITLE': '澄迈', 'TYPE': 'city'},
					{'VALUE': '海南-定安', 'TITLE': '定安', 'TYPE': 'city'},
					{'VALUE': '海南-屯昌', 'TITLE': '屯昌', 'TYPE': 'city'},
					{'VALUE': '海南-昌江黎族自治县', 'TITLE': '昌江黎族自治县', 'TYPE': 'city'},
					{'VALUE': '海南-白沙黎族自治县', 'TITLE': '白沙黎族自治县', 'TYPE': 'city'},
					{'VALUE': '海南-琼中黎族苗族自治县', 'TITLE': '琼中黎族苗族自治县', 'TYPE': 'city'},
					{'VALUE': '海南-陵水黎族自治县', 'TITLE': '陵水黎族自治县', 'TYPE': 'city'},
					{'VALUE': '海南-保亭黎族苗族自治县', 'TITLE': '保亭黎族苗族自治县', 'TYPE': 'city'},
					{'VALUE': '海南-乐东黎族自治县', 'TITLE': '乐东黎族自治县', 'TYPE': 'city'},
					{'VALUE': '海南-三沙', 'TITLE': '三沙', 'TYPE': 'city'},
					{'VALUE': '海南-洋浦', 'TITLE': '洋浦', 'TYPE': 'city'}
				]}
		]},

	{'VALUE': '西南', 'TITLE': '西南：', 'TYPE': 'area', 'CHILDREN': [
			{'VALUE': '重庆', 'TITLE': '重庆', 'TYPE': 'province'},
			{'VALUE': '四川', 'TITLE': '四川', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '四川-成都', 'TITLE': '成都', 'TYPE': 'city'},
					{'VALUE': '四川-自贡', 'TITLE': '自贡', 'TYPE': 'city'},
					{'VALUE': '四川-攀枝花', 'TITLE': '攀枝花', 'TYPE': 'city'},
					{'VALUE': '四川-泸州', 'TITLE': '泸州', 'TYPE': 'city'},
					{'VALUE': '四川-德阳', 'TITLE': '德阳', 'TYPE': 'city'},
					{'VALUE': '四川-绵阳', 'TITLE': '绵阳', 'TYPE': 'city'},
					{'VALUE': '四川-广元', 'TITLE': '广元', 'TYPE': 'city'},
					{'VALUE': '四川-遂宁', 'TITLE': '遂宁', 'TYPE': 'city'},
					{'VALUE': '四川-内江', 'TITLE': '内江', 'TYPE': 'city'},
					{'VALUE': '四川-乐山', 'TITLE': '乐山', 'TYPE': 'city'},
					{'VALUE': '四川-南充', 'TITLE': '南充', 'TYPE': 'city'},
					{'VALUE': '四川-宜宾', 'TITLE': '宜宾', 'TYPE': 'city'},
					{'VALUE': '四川-广安', 'TITLE': '广安', 'TYPE': 'city'},
					{'VALUE': '四川-达州', 'TITLE': '达州', 'TYPE': 'city'},
					{'VALUE': '四川-眉山', 'TITLE': '眉山', 'TYPE': 'city'},
					{'VALUE': '四川-雅安', 'TITLE': '雅安', 'TYPE': 'city'},
					{'VALUE': '四川-巴中', 'TITLE': '巴中', 'TYPE': 'city'},
					{'VALUE': '四川-资阳', 'TITLE': '资阳', 'TYPE': 'city'},
					{'VALUE': '四川-阿坝藏族羌族自治州', 'TITLE': '阿坝藏族羌族自治州', 'TYPE': 'city'},
					{'VALUE': '四川-甘孜藏族自治州', 'TITLE': '甘孜藏族自治州', 'TYPE': 'city'},
					{'VALUE': '四川-凉山彝族自治州', 'TITLE': '凉山彝族自治州', 'TYPE': 'city'}
				]},
			{'VALUE': '贵州', 'TITLE': '贵州', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '贵州-贵阳', 'TITLE': '贵阳', 'TYPE': 'city'},
					{'VALUE': '贵州-六盘山', 'TITLE': '六盘山', 'TYPE': 'city'},
					{'VALUE': '贵州-遵义', 'TITLE': '遵义', 'TYPE': 'city'},
					{'VALUE': '贵州-安顺', 'TITLE': '安顺', 'TYPE': 'city'},
					{'VALUE': '贵州-铜仁', 'TITLE': '铜仁', 'TYPE': 'city'},
					{'VALUE': '贵州-毕节', 'TITLE': '毕节', 'TYPE': 'city'},
					{'VALUE': '贵州-黔西南布依族苗族自治州', 'TITLE': '黔西南布依族苗族自治州', 'TYPE': 'city'},
					{'VALUE': '贵州-黔东南苗族侗族自治州', 'TITLE': '黔东南苗族侗族自治州', 'TYPE': 'city'},
					{'VALUE': '贵州-黔南布依族苗族自治州', 'TITLE': '黔南布依族苗族自治州', 'TYPE': 'city'}
				]},
			{'VALUE': '云南', 'TITLE': '云南', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '云南-昆明', 'TITLE': '昆明', 'TYPE': 'city'},
					{'VALUE': '云南-曲靖', 'TITLE': '曲靖', 'TYPE': 'city'},
					{'VALUE': '云南-玉溪', 'TITLE': '玉溪', 'TYPE': 'city'},
					{'VALUE': '云南-宝山', 'TITLE': '宝山', 'TYPE': 'city'},
					{'VALUE': '云南-昭通', 'TITLE': '昭通', 'TYPE': 'city'},
					{'VALUE': '云南-普洱', 'TITLE': '普洱', 'TYPE': 'city'},
					{'VALUE': '云南-临沧', 'TITLE': '临沧', 'TYPE': 'city'},
					{'VALUE': '云南-丽江', 'TITLE': '丽江', 'TYPE': 'city'},
					{'VALUE': '云南-文山壮族苗族自治州', 'TITLE': '文山壮族苗族自治州', 'TYPE': 'city'},
					{'VALUE': '云南-红河哈尼族彝族自治州', 'TITLE': '红河哈尼族彝族自治州', 'TYPE': 'city'},
					{'VALUE': '云南-西双版纳傣族自治州', 'TITLE': '西双版纳傣族自治州', 'TYPE': 'city'},
					{'VALUE': '云南-楚雄彝族自治州', 'TITLE': '楚雄彝族自治州', 'TYPE': 'city'},
					{'VALUE': '云南-大理白族自治州', 'TITLE': '大理白族自治州', 'TYPE': 'city'},
					{'VALUE': '云南-德宏傣族景颇族自治州', 'TITLE': '德宏傣族景颇族自治州', 'TYPE': 'city'},
					{'VALUE': '云南-怒江傈傈族自治州', 'TITLE': '怒江傈傈族自治州', 'TYPE': 'city'},
					{'VALUE': '云南-迪庆藏族自治州', 'TITLE': '迪庆藏族自治州', 'TYPE': 'city'}
				]},
			{'VALUE': '西藏', 'TITLE': '西藏', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '西藏-拉萨', 'TITLE': '拉萨', 'TYPE': 'city'},
					{'VALUE': '西藏-那曲', 'TITLE': '那曲', 'TYPE': 'city'},
					{'VALUE': '西藏-昌都', 'TITLE': '昌都', 'TYPE': 'city'},
					{'VALUE': '西藏-山南', 'TITLE': '山南', 'TYPE': 'city'},
					{'VALUE': '西藏-日喀则', 'TITLE': '日喀则', 'TYPE': 'city'},
					{'VALUE': '西藏-阿里', 'TITLE': '阿里', 'TYPE': 'city'},
					{'VALUE': '西藏-林芝', 'TITLE': '林芝', 'TYPE': 'city'}
				]}
		]},

	{'VALUE': '西北', 'TITLE': '西北：', 'TYPE': 'area', 'CHILDREN': [
			{'VALUE': '陕西', 'TITLE': '陕西', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '陕西-西安', 'TITLE': '西安', 'TYPE': 'city'},
					{'VALUE': '陕西-铜川', 'TITLE': '铜川', 'TYPE': 'city'},
					{'VALUE': '陕西-宝鸡', 'TITLE': '宝鸡', 'TYPE': 'city'},
					{'VALUE': '陕西-咸阳', 'TITLE': '咸阳', 'TYPE': 'city'},
					{'VALUE': '陕西-渭南', 'TITLE': '渭南', 'TYPE': 'city'},
					{'VALUE': '陕西-延安', 'TITLE': '延安', 'TYPE': 'city'},
					{'VALUE': '陕西-汉中', 'TITLE': '汉中', 'TYPE': 'city'},
					{'VALUE': '陕西-榆林', 'TITLE': '榆林', 'TYPE': 'city'},
					{'VALUE': '陕西-安康', 'TITLE': '安康', 'TYPE': 'city'},
					{'VALUE': '陕西-商洛', 'TITLE': '商洛', 'TYPE': 'city'}
				]},
			{'VALUE': '甘肃', 'TITLE': '甘肃', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '甘肃-兰州', 'TITLE': '兰州', 'TYPE': 'city'},
					{'VALUE': '甘肃-金昌', 'TITLE': '金昌', 'TYPE': 'city'},
					{'VALUE': '甘肃-白银', 'TITLE': '白银', 'TYPE': 'city'},
					{'VALUE': '甘肃-天水', 'TITLE': '天水', 'TYPE': 'city'},
					{'VALUE': '甘肃-嘉峪关', 'TITLE': '嘉峪关', 'TYPE': 'city'},
					{'VALUE': '甘肃-武威', 'TITLE': '武威', 'TYPE': 'city'},
					{'VALUE': '甘肃-张掖', 'TITLE': '张掖', 'TYPE': 'city'},
					{'VALUE': '甘肃-平凉', 'TITLE': '平凉', 'TYPE': 'city'},
					{'VALUE': '甘肃-酒泉', 'TITLE': '酒泉', 'TYPE': 'city'},
					{'VALUE': '甘肃-庆阳', 'TITLE': '庆阳', 'TYPE': 'city'},
					{'VALUE': '甘肃-定西', 'TITLE': '定西', 'TYPE': 'city'},
					{'VALUE': '甘肃-陇南', 'TITLE': '陇南', 'TYPE': 'city'},
					{'VALUE': '甘肃-甘南藏族自治州', 'TITLE': '甘南藏族自治州', 'TYPE': 'city'},
					{'VALUE': '甘肃-临夏回族自治州', 'TITLE': '临夏回族自治州', 'TYPE': 'city'}
				]},
			{'VALUE': '青海', 'TITLE': '青海', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '青海-西宁', 'TITLE': '西宁', 'TYPE': 'city'},
					{'VALUE': '青海-海东', 'TITLE': '海东', 'TYPE': 'city'},
					{'VALUE': '青海-海北藏族自治州', 'TITLE': '海北藏族自治州', 'TYPE': 'city'},
					{'VALUE': '青海-海南藏族自治州', 'TITLE': '海南藏族自治州', 'TYPE': 'city'},
					{'VALUE': '青海-果洛藏族自治州', 'TITLE': '果洛藏族自治州', 'TYPE': 'city'},
					{'VALUE': '青海-玉树藏族自治州', 'TITLE': '玉树藏族自治州', 'TYPE': 'city'},
					{'VALUE': '青海-海西蒙古族藏族自治州', 'TITLE': '海西蒙古族藏族自治州', 'TYPE': 'city'},
					{'VALUE': '青海-黄南藏族自治州', 'TITLE': '黄南藏族自治州', 'TYPE': 'city'}
				]},
			{'VALUE': '宁夏', 'TITLE': '宁夏', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '宁夏-银川', 'TITLE': '银川', 'TYPE': 'city'},
					{'VALUE': '宁夏-石嘴山', 'TITLE': '石嘴山', 'TYPE': 'city'},
					{'VALUE': '宁夏-吴忠', 'TITLE': '吴忠', 'TYPE': 'city'},
					{'VALUE': '宁夏-固原', 'TITLE': '固原', 'TYPE': 'city'},
					{'VALUE': '宁夏-中卫', 'TITLE': '中卫', 'TYPE': 'city'}
				]},
			{'VALUE': '新疆', 'TITLE': '新疆', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '新疆-乌鲁木齐', 'TITLE': '乌鲁木齐', 'TYPE': 'city'},
					{'VALUE': '新疆-克拉玛依', 'TITLE': '克拉玛依', 'TYPE': 'city'},
					{'VALUE': '新疆-石河子', 'TITLE': '石河子', 'TYPE': 'city'},
					{'VALUE': '新疆-阿拉尔', 'TITLE': '阿拉尔', 'TYPE': 'city'},
					{'VALUE': '新疆-图木舒克', 'TITLE': '图木舒克', 'TYPE': 'city'},
					{'VALUE': '新疆-五家渠', 'TITLE': '五家渠', 'TYPE': 'city'},
					{'VALUE': '新疆-吐鲁番', 'TITLE': '吐鲁番', 'TYPE': 'city'},
					{'VALUE': '新疆-哈密', 'TITLE': '哈密', 'TYPE': 'city'},
					{'VALUE': '新疆-和田', 'TITLE': '和田', 'TYPE': 'city'},
					{'VALUE': '新疆-阿克苏', 'TITLE': '阿克苏', 'TYPE': 'city'},
					{'VALUE': '新疆-喀什', 'TITLE': '喀什', 'TYPE': 'city'},
					{'VALUE': '新疆-克孜勒苏柯尔克孜自治州', 'TITLE': '克孜勒苏柯尔克孜自治州', 'TYPE': 'city'},
					{'VALUE': '新疆-巴音郭楞蒙古自治州', 'TITLE': '巴音郭楞蒙古自治州', 'TYPE': 'city'},
					{'VALUE': '新疆-昌吉回族自治州', 'TITLE': '昌吉回族自治州', 'TYPE': 'city'},
					{'VALUE': '新疆-博尔塔拉蒙古自治州', 'TITLE': '博尔塔拉蒙古自治州', 'TYPE': 'city'},
					{'VALUE': '新疆-伊犁哈萨克自治州', 'TITLE': '伊犁哈萨克自治州', 'TYPE': 'city'},
					{'VALUE': '新疆-塔城', 'TITLE': '塔城', 'TYPE': 'city'},
					{'VALUE': '新疆-阿勒泰', 'TITLE': '阿勒泰', 'TYPE': 'city'}
				]}
		]},

	{'VALUE': '东北', 'TITLE': '东北：', 'TYPE': 'area', 'CHILDREN': [
			{'VALUE': '辽宁', 'TITLE': '辽宁', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '辽宁-沈阳', 'TITLE': '沈阳', 'TYPE': 'city'},
					{'VALUE': '辽宁-大连', 'TITLE': '大连', 'TYPE': 'city'},
					{'VALUE': '辽宁-鞍山', 'TITLE': '鞍山', 'TYPE': 'city'},
					{'VALUE': '辽宁-抚顺', 'TITLE': '抚顺', 'TYPE': 'city'},
					{'VALUE': '辽宁-本溪', 'TITLE': '本溪', 'TYPE': 'city'},
					{'VALUE': '辽宁-丹东', 'TITLE': '丹东', 'TYPE': 'city'},
					{'VALUE': '辽宁-锦州', 'TITLE': '锦州', 'TYPE': 'city'},
					{'VALUE': '辽宁-葫芦岛', 'TITLE': '葫芦岛', 'TYPE': 'city'},
					{'VALUE': '辽宁-营口', 'TITLE': '营口', 'TYPE': 'city'},
					{'VALUE': '辽宁-盘锦', 'TITLE': '盘锦', 'TYPE': 'city'},
					{'VALUE': '辽宁-阜新', 'TITLE': '阜新', 'TYPE': 'city'},
					{'VALUE': '辽宁-辽阳', 'TITLE': '辽阳', 'TYPE': 'city'},
					{'VALUE': '辽宁-铁岭', 'TITLE': '铁岭', 'TYPE': 'city'},
					{'VALUE': '辽宁-朝阳', 'TITLE': '朝阳', 'TYPE': 'city'}
				]},
			{'VALUE': '吉林', 'TITLE': '吉林', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '吉林-长春', 'TITLE': '长春', 'TYPE': 'city'},
					{'VALUE': '吉林-吉林', 'TITLE': '吉林', 'TYPE': 'city'},
					{'VALUE': '吉林-四平', 'TITLE': '四平', 'TYPE': 'city'},
					{'VALUE': '吉林-辽源', 'TITLE': '辽源', 'TYPE': 'city'},
					{'VALUE': '吉林-通化', 'TITLE': '通化', 'TYPE': 'city'},
					{'VALUE': '吉林-白山', 'TITLE': '白山', 'TYPE': 'city'},
					{'VALUE': '吉林-延边朝鲜族自治州', 'TITLE': '延边朝鲜族自治州', 'TYPE': 'city'},
					{'VALUE': '吉林-白城', 'TITLE': '白城', 'TYPE': 'city'},
					{'VALUE': '吉林-松原', 'TITLE': '松原', 'TYPE': 'city'}
				]},
			{'VALUE': '黑龙江', 'TITLE': '黑龙江', 'TYPE': 'province', 'CHILDREN': [
					{'VALUE': '黑龙江-哈尔滨', 'TITLE': '哈尔滨', 'TYPE': 'city'},
					{'VALUE': '黑龙江-齐齐哈尔', 'TITLE': '齐齐哈尔', 'TYPE': 'city'},
					{'VALUE': '黑龙江-鹤岗', 'TITLE': '鹤岗', 'TYPE': 'city'},
					{'VALUE': '黑龙江-双鸭山', 'TITLE': '双鸭山', 'TYPE': 'city'},
					{'VALUE': '黑龙江-鸡西', 'TITLE': '鸡西', 'TYPE': 'city'},
					{'VALUE': '黑龙江-大庆', 'TITLE': '大庆', 'TYPE': 'city'},
					{'VALUE': '黑龙江-伊春', 'TITLE': '伊春', 'TYPE': 'city'},
					{'VALUE': '黑龙江-牡丹江', 'TITLE': '牡丹江', 'TYPE': 'city'},
					{'VALUE': '黑龙江-佳木斯', 'TITLE': '佳木斯', 'TYPE': 'city'},
					{'VALUE': '黑龙江-七台河', 'TITLE': '七台河', 'TYPE': 'city'},
					{'VALUE': '黑龙江-黑河', 'TITLE': '黑河', 'TYPE': 'city'},
					{'VALUE': '黑龙江-绥化', 'TITLE': '绥化', 'TYPE': 'city'},
					{'VALUE': '黑龙江-大兴安岭', 'TITLE': '大兴安岭', 'TYPE': 'city'}
				]}
		]},

	{'VALUE': '其他', 'TITLE': '其他：', 'TYPE': 'area', 'CHILDREN': [
			{'VALUE': '香港', 'TITLE': '香港', 'TYPE': 'province'},
			{'VALUE': '澳门', 'TITLE': '澳门', 'TYPE': 'province'},
			{'VALUE': '台湾', 'TITLE': '台湾', 'TYPE': 'province'}
		]}
];
layui.define('form', function(exports){

	'use strict';

	var $ = layui.$
	,form = layui.form
	,MOD_NAME = 'regionCheckBox', ELEM_CLASS = 'layui-regionContent'
	,regionCheckBox = {
		index: layui.regionCheckBox ? (layui.regionCheckBox.index + 10000) : 0
		
		,set: function(options){
			var that = this;
			that.config = $.extend({}, that.config, options);
			return that;
		}
		
		,on: function(events, callback){
			return layui.onevent.call(this, MOD_NAME, events, callback);
		}
	}
	,thisIns = function(){
		var that = this
		,options = that.config
		,id = options.id || options.index;
		
		return {
			reload: function(options){
				that.config = $.extend({}, that.config, options);
				that.render();
			}			
			,val: function(valueArr){
				setValue(options, valueArr);
			}
			,config: options
		};
	}
	,Class = function(options){
		var that = this;
		that.index = ++regionCheckBox.index;
		that.config = $.extend({}, that.config, regionCheckBox.config, options);
		that.render();
	};
	
	
	Class.prototype.config = {
		data: regionCheckBoxList
		,all: ['所有地域', '所有地域']
		,value: []
		,width: '400px'
		,border: true
		,change: function(result){}
		,ready: function(){}
	};
	
	Class.prototype.render = function(){
		var that = this
		,options = that.config;

		options.elem = $(options.elem);	
		var id = options.elem.attr('id');	
		
		if(!options.elem.hasClass('layui-form')){
			options.elem.addClass('layui-form');
		}
		options.elem.addClass(ELEM_CLASS);
		options.elem.css('width', options.width);
		if(!options.border){
			options.elem.css('border', 'none');
		}
		options.elem.attr('lay-filter', 'region-' + id);
		
		options.elem.html(getCheckBoxs(options));
		
		//初始值
		setValue(options, options.value);
		
		options.elem.find('.parent').mouseover(function() {
			$(this).find('.city').show();
		});
		options.elem.find('.parent').mouseout(function() {
			$(this).find('.city').hide();
		});
		
		form.on('checkbox(regionCheckBox-'+id+')', function(data) {
			if($(data.elem).parents('.all').length > 0) { //选择全部
				if(data.elem.checked) {
					options.elem.find(':checkbox').prop('checked', true);
				} else {
					options.elem.find(':checkbox').prop('checked', false);
				}
			} else {
				//选择省（不包括直辖市）
				if($(data.elem).parent().hasClass('parent')) { 
					if(data.elem.checked) {
						$(data.elem).parent().find('.city :checkbox').prop('checked', true);
					} else {
						$(data.elem).parent().find('.city :checkbox').prop('checked', false);
					}
				}
				//选择城市
				if($(data.elem).parent().hasClass('city')) {
					$(data.elem).parents('.parent').attr('name', options.name);
					if(data.elem.checked) {
						var is_all = true;
						$(data.elem).parent().find(':checkbox').each(function(i, item) {
							if(! item.checked) {
								is_all = false;
								return false;
							}
						});
						if(is_all) {
							$(data.elem).parents('.parent').find(':checkbox:first').prop('checked', true);
						}
					} else {
						$(data.elem).parents('.parent').find(':checkbox:first').prop('checked', false);						
					}
				}
				//选择除全部外任意
				if(data.elem.checked) { 
					var is_all = true;
					options.elem.find('.province :checkbox').each(function(i, item) {
						if(! item.checked) {
							is_all = false;
							return false;
						}
					});
					if(is_all) {
						options.elem.find('.all :checkbox').prop('checked', true);
					}
				} else {
					options.elem.find('.all :checkbox').prop('checked', false);
				}
			}
			form.render('checkbox', options.elem.attr('lay-filter'));
			
			renderParentDom(options.elem);
			initName(options);
			
			options.change(data);
		});
		
		options.ready();
	}
	
	function getCheckBoxs(options){
		var data = options.data,
		all = options.all,
		name = options.name,
		id = options.elem.attr('id'),
		skin = 'primary',
		filter = 'regionCheckBox-' + id,
		boxs = '',
		hasArea = true;

		if(all != null && all.length == 2){
			boxs = '<div class="layui-form-item all">' +
				   '<input type="checkbox" name="' + name + '" value="' + all[0] + '" title="' + all[1] + '" lay-skin="' + skin + '" lay-filter="' + filter + '">' +
				   '</div>' + boxs;
		}

		if(data[0].TYPE == 'province'){
			hasArea = false;
		}

		if(!hasArea){
			boxs += '<div class="layui-form-item" style="margin-bottom: 0;">' +
					'<div class="province">' +
					'<ul>';
		}

		for(var i=0; i<data.length; i++){
			var area = data[i];

			if(area.TYPE == 'area'){
				boxs += '<div class="layui-form-item area">' +
						'<label class="layui-form-label">' + area.TITLE + '</label>' +
						'<div class="province">' +
						'<ul>';

				var provinceList = area.CHILDREN;
				for(var j=0; j<provinceList.length; j++){
					boxs += getProvinceLi(provinceList[j], options);
				}

				boxs += '</ul></div></div>';
			}else if(area.TYPE == 'province'){
				boxs += getProvinceLi(area, options);
			}
		}

		if(!hasArea){
			boxs += '</ul></div>';
		}
				   
		return boxs;
	}

	function getProvinceLi(province, options){
		var name = options.name,
		id = options.elem.attr('id'),
		skin = 'primary',
		filter = 'regionCheckBox-' + id,
		li = '';

		var cityList = province.CHILDREN;
		var city_num = cityList == null ? 0 : cityList.length;

		li += '<li' + (city_num > 0 ? ' class="parent"' : '') + '>' +
				'<input type="checkbox" name="' + name + '" value="' + province.VALUE + '" title="' + province.TITLE + '" lay-skin="' + skin + '" lay-filter="' + filter + '">';
		
		if(city_num > 0){
			li += '<div class="city">';
			for(var k=0; k<city_num; k++){
				var city = cityList[k];
				li += '<input type="checkbox" name="' + name + '" value="' + city.VALUE + '" title="' + city.TITLE + '" lay-skin="' + skin + '" lay-filter="' + filter + '">';
			}	
			li += '</div>';					
		}

		li += '</li>';

		return li;
	}

	function setValue(options, valueArr){
		options.elem.find(':checkbox').prop('checked', false);
		var all_value = options.elem.find('.all :checkbox').val();
		if(valueArr.indexOf(all_value) > -1){
			options.elem.find(':checkbox').prop('checked', true);
		}else{
			if(typeof valueArr == 'string'){
				valueArr = valueArr.split(',');
			}
			for(var i=0; i<valueArr.length; i++){
				var value = valueArr[i]
				,$elem = options.elem.find(':checkbox[value="'+value+'"]');
				
				$elem.prop('checked', true);
				
				if(value.indexOf('-') < 0){ //省
					$elem.parent().find('.city :checkbox').prop('checked', true);
				}
			}
		}
		form.render('checkbox', options.elem.attr('lay-filter'));

		renderParentDom(options.elem);
		initName(options);
	}
	
	function initName(options){
		var $elem = options.elem;
		
		$elem.find(':checkbox').attr('name', options.name);
		
		if($elem.find('.all :checkbox').prop('checked')){
			$elem.find('.province :checkbox').removeAttr('name');
		}else{
			$elem.find('.parent').find(':checkbox:first:checked').each(function() {
				$(this).parent().find('.city :checkbox').removeAttr('name');
			});
		}
	}
	
	function renderParentDom(elem){
		elem.find('.parent').find(':checkbox:first').not(':checked').each(function() {
			var is_yes_all = true;
			var is_no_all = true;
			$(this).parent().find('.city :checkbox').each(function(i, item) {
				if(item.checked) {
					is_no_all = false;
				} else {
					is_yes_all = false;
				}
			});
			if(!is_yes_all && !is_no_all) {
				$(this).parent().find('.layui-icon:first').removeClass('layui-icon-ok');
				$(this).parent().find('.layui-icon:first').css('border-color', '#5FB878');
				$(this).parent().find('.layui-icon:first').css('background-color', '#5FB878');
			}
		});
	}
	
	regionCheckBox.render = function(options){
		var ins = new Class(options);
		return thisIns.call(ins);
	};
	
	layui.link(layui.cache.base + 'regionCheckBox/regionCheckBox.css?v=2', function(){
		
	}, 'regionCheckBox');

	exports('regionCheckBox', regionCheckBox);
});    