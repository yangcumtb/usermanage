layui.define(['layer', 'form', 'laytpl'], function (exports) {
  "use strict";

  let $ = layui.$
      , form = layui.form
      , layarea = {
    _id: 0
    , config: {}
    , set: function (options) {
      let that = this;
      that.config = $.extend({}, that.config, options);
      return that;
    }
    , on: function (events, callback) {
      return layui.onevent.call(this, 'layarea', events, callback);
    }
  }
      , thisArea = function () {
    let that = this;
    return {
      layarea: function (files) {
        that.layarea.call(that, files);
      }
      , config: that.config
      , reload: that.reload
      , events: that.events
    }
  }
      , Class = function (options) {
    let that = this;
    that.config = $.extend({}, {
      elem: '',
      data: {
        province: '',
        city: '',
        county: '',
        provinceCode: 0,
        cityCode: 0,
        countyCode: 0,
      }
    }, options);
    that.render();
  };

  let areaList = {
    province_list: {
      210000: '辽宁省',
    },
    city_list: {
      210100: '沈阳市',
      210200: '大连市',
      210300: '鞍山市',
      210400: '抚顺市',
      210500: '本溪市',
      210600: '丹东市',
      210700: '锦州市',
      210800: '营口市',
      210900: '阜新市',
      211000: '辽阳市',
      211100: '盘锦市',
      211200: '铁岭市',
      211300: '朝阳市',
      211400: '葫芦岛市',
      211500: ' ',
    },
    county_list: {
      210102: '和平区',
      210103: '沈河区',
      210104: '大东区',
      210105: '皇姑区',
      210106: '铁西区',
      210111: '苏家屯区',
      210112: '浑南区',
      210113: '沈北新区',
      210114: '于洪区',
      210115: '辽中区',
      210123: '康平县',
      210124: '法库县',
      210181: '新民市',
      210190: '经济技术开发区',
      210202: '中山区',
      210203: '西岗区',
      210204: '沙河口区',
      210211: '甘井子区',
      210212: '旅顺口区',
      210213: '金州区',
      210214: '普兰店区',
      210224: '长海县',
      210281: '瓦房店市',
      210283: '庄河市',
      210302: '铁东区',
      210303: '铁西区',
      210304: '立山区',
      210311: '千山区',
      210321: '台安县',
      210323: '岫岩满族自治县',
      210381: '海城市',
      210390: '高新区',
      210402: '新抚区',
      210403: '东洲区',
      210404: '望花区',
      210411: '顺城区',
      210421: '抚顺县',
      210422: '新宾满族自治县',
      210423: '清原满族自治县',
      210502: '平山区',
      210503: '溪湖区',
      210504: '明山区',
      210505: '南芬区',
      210521: '本溪满族自治县',
      210522: '桓仁满族自治县',
      210602: '元宝区',
      210603: '振兴区',
      210604: '振安区',
      210624: '宽甸满族自治县',
      210681: '东港市',
      210682: '凤城市',
      210702: '古塔区',
      210703: '凌河区',
      210711: '太和区',
      210726: '黑山县',
      210727: '义县',
      210781: '凌海市',
      210782: '北镇市',
      210793: '经济技术开发区',
      210802: '站前区',
      210803: '西市区',
      210804: '鲅鱼圈区',
      210811: '老边区',
      210881: '盖州市',
      210882: '大石桥市',
      210902: '海州区',
      210903: '新邱区',
      210904: '太平区',
      210905: '清河门区',
      210911: '细河区',
      210921: '阜新蒙古族自治县',
      210922: '彰武县',
      211002: '白塔区',
      211003: '文圣区',
      211004: '宏伟区',
      211005: '弓长岭区',
      211011: '太子河区',
      211021: '辽阳县',
      211081: '灯塔市',
      211102: '双台子区',
      211103: '兴隆台区',
      211104: '大洼区',
      211122: '盘山县',
      211202: '银州区',
      211204: '清河区',
      211221: '铁岭县',
      211223: '西丰县',
      211224: '昌图县',
      211281: '调兵山市',
      211282: '开原市',
      211302: '双塔区',
      211303: '龙城区',
      211321: '朝阳县',
      211322: '建平县',
      211324: '喀喇沁左翼蒙古族自治县',
      211381: '北票市',
      211382: '凌源市',
      211402: '连山区',
      211403: '龙港区',
      211404: '南票区',
      211421: '绥中县',
      211422: '建昌县',
      211481: '兴城市',
      2115104: '和平区',
      211502: '沈河区',
      211503: '大东区',
      211504: '皇姑区',
      211505: '铁西区',
      211506: '苏家屯区',
      211507: '浑南区',
      211508: '沈北新区',
      211509: '于洪区',
      211510: '辽中区',
      211511: '康平县',
      211512: '法库县',
      211513: '新民市',
      211514: '经济技术开发区',
      211515: '中山区',
      211516: '西岗区',
      211517: '沙河口区',
      211518: '甘井子区',
      211519: '旅顺口区',
      211520: '金州区',
      211521: '普兰店区',
      211522: '长海县',
      211523: '瓦房店市',
      211524: '庄河市',
      211525: '铁东区',
      211526: '铁西区',
      211527: '立山区',
      211528: '千山区',
      211529: '台安县',
      211530: '岫岩满族自治县',
      211531: '海城市',
      211532: '高新区',
      211533: '新抚区',
      211534: '东洲区',
      211535: '望花区',
      211536: '顺城区',
      211537: '抚顺县',
      211538: '新宾满族自治县',
      211539: '清原满族自治县',
      211540: '平山区',
      211541: '溪湖区',
      211542: '明山区',
      211543: '南芬区',
      211544: '本溪满族自治县',
      211545: '桓仁满族自治县',
      211546: '元宝区',
      211547: '振兴区',
      211548: '振安区',
      211549: '宽甸满族自治县',
      211550: '东港市',
      211551: '凤城市',
      211552: '古塔区',
      211553: '凌河区',
      211554: '太和区',
      211555: '黑山县',
      211556: '义县',
      211557: '凌海市',
      211558: '北镇市',
      211559: '经济技术开发区',
      211560: '站前区',
      211561: '西市区',
      211562: '鲅鱼圈区',
      211563: '老边区',
      211564: '盖州市',
      211565: '大石桥市',
      211566: '海州区',
      211567: '新邱区',
      211568: '太平区',
      211569: '清河门区',
      211570: '细河区',
      211571: '阜新蒙古族自治县',
      211572: '彰武县',
      211573: '白塔区',
      211574: '文圣区',
      211575: '宏伟区',
      211576: '弓长岭区',
      211577: '太子河区',
      211578: '辽阳县',
      211579: '灯塔市',
      211580: '双台子区',
      211581: '兴隆台区',
      211582: '大洼区',
      211583: '盘山县',
      211584: '银州区',
      211585: '清河区',
      211586: '铁岭县',
      211587: '西丰县',
      211588: '昌图县',
      211589: '调兵山市',
      211590: '开原市',
      211591: '双塔区',
      211592: '龙城区',
      211593: '朝阳县',
      211594: '建平县',
      211595: '喀喇沁左翼蒙古族自治县',
      211596: '北票市',
      211597: '凌源市',
      211598: '连山区',
      211599: '龙港区',
      2115100: '南票区',
      2115101: '绥中县',
      2115102: '建昌县',
      2115103: '兴城市',
    }
  };


  Class.prototype.config = {
    elem: '',
    data: {
      province: '',
      city: '',
      county: '',
      provinceCode: 0,
      cityCode: 0,
      countyCode: 0,
    },
    change: function(result){}
  };

  Class.prototype.index = 0;

  Class.prototype.render = function () {
    let that = this, options = that.config;
    options.elem = $(options.elem);

    that.events();
  };

  Class.prototype.reload = function (op) {
    let options = this.config;
    options.data = $.extend(options.data, op.data || {});
    this.events(true);
  };

  Class.prototype.events = function (reload = false) {
    let that = this, options = that.config;
    let provinceFilter = 'province-' + layarea._id;
    let cityFilter = 'city-' + layarea._id;
    let countyFilter = 'county-' + layarea._id;

    let provinceEl = options.elem.find('.province-selector');
    let cityEl = options.elem.find('.city-selector');
    let countyEl = options.elem.find('.county-selector');

    if (reload){
      options.data.provinceCode = getCode('province', options.data.province);
      let code = getCode('city', options.data.city, options.data.provinceCode.slice(0, 2));
      options.data.cityCode = code;
      options.data.countyCode = getCode('county', options.data.county, options.data.cityCode.slice(0, 4));
      renderProvince();
      return;
    }
    //filter
    if(provinceEl.attr('lay-filter')){
      provinceFilter = provinceEl.attr('lay-filter');
    }
    if(cityEl.attr('lay-filter')){
      cityFilter = cityEl.attr('lay-filter');
    }
    if(countyEl.attr('lay-filter')){
      countyFilter = countyEl.attr('lay-filter');
    }
    provinceEl.attr('lay-filter', provinceFilter);
    cityEl.attr('lay-filter', cityFilter);
    countyEl.attr('lay-filter', countyFilter);

    //获取默认值
    if(provinceEl.data('value')){
      options.data.province = provinceEl.data('value');
      options.data.provinceCode = getCode('province', options.data.province);
    } else if (!options.data.province) {
      options.data.province = '';
    }
    if(cityEl.data('value')){
      options.data.city = cityEl.data('value');
      let code = getCode('city', options.data.city, options.data.provinceCode.slice(0, 2));
      options.data.cityCode = code;
    } else if (!options.data.city) {
      options.data.city = '';
    }
    if(countyEl.data('value')){
      options.data.county = countyEl.data('value');
      options.data.countyCode = getCode('county', options.data.county, options.data.cityCode.slice(0, 4));
    } else if (!options.data.county) {
      options.data.county = '';
    }
    provinceEl.attr('lay-filter', provinceFilter);
    cityEl.attr('lay-filter', cityFilter);
    countyEl.attr('lay-filter', countyFilter);

    //监听结果
    form.on('select('+provinceFilter+')', function(data){
      options.data.province = data.value;
      options.data.provinceCode = getCode('province', data.value);
      renderCity(options.data.provinceCode);

      options.change(options.data);
    });
    form.on('select('+cityFilter+')', function(data){
      options.data.city = data.value;
      if(options.data.provinceCode){
        options.data.cityCode = getCode('city', data.value, options.data.provinceCode.slice(0, 2));
        renderCounty(options.data.cityCode);
      }

      options.change(options.data);
    });
    form.on('select('+countyFilter+')', function(data){
      options.data.county = data.value;
      if(options.data.cityCode){
        options.data.countyCode = getCode('county', data.value, options.data.cityCode.slice(0, 4));
      }
      options.change(options.data);
    });

    renderProvince();

    //查找province
    function renderProvince(){
      let tpl = '<option value="">--选择省--</option>';
      let provinceList = getList("province");
      let currentCode = '';
      let currentName = '';
      provinceList.forEach(function(_item){
        // if (!currentCode){
        //   currentCode = _item.code;
        //   currentName = _item.name;
        // }
        if(_item.name === options.data.province){
          currentCode = _item.code;
          currentName = _item.name;
        }
        tpl += '<option value="'+_item.name+'">'+_item.name+'</option>';
      });
      provinceEl.html(tpl);
      provinceEl.val(options.data.province);
      form.render('select');
      renderCity(currentCode);
    }

    function renderCity(provinceCode){
      let tpl = '<option value="">--选择市--</option>';
      let cityList = getList('city', provinceCode.slice(0, 2));
      let currentCode = '';
      let currentName = '';
      cityList.forEach(function(_item){
        // if (!currentCode){
        //   currentCode = _item.code;
        //   currentName = _item.name;
        // }
        if(_item.name === options.data.city){
          currentCode = _item.code;
          currentName = _item.name;
        }
        tpl += '<option value="'+_item.name+'">'+_item.name+'</option>';
      });
      options.data.city = currentName;
      cityEl.html(tpl);
      cityEl.val(options.data.city);
      form.render('select');
      renderCounty(currentCode);
    }

    function renderCounty(cityCode){
      let tpl = '<option value="">--选择区--</option>';
      let countyList = getList('county', cityCode.slice(0, 4));
      let currentCode = '';
      let currentName = '';
      countyList.forEach(function(_item){
        // if (!currentCode){
        //   currentCode = _item.code;
        //   currentName = _item.name;
        // }
        if(_item.name === options.data.county){
          currentCode = _item.code;
          currentName = _item.name;
        }
        tpl += '<option value="'+_item.name+'">'+_item.name+'</option>';
      });
      options.data.county = currentName;
      countyEl.html(tpl);
      countyEl.val(options.data.county);

      form.render('select');
    }

    function getList(type, code) {
      let result = [];

      if (type !== 'province' && !code) {
        return result;
      }

      let list = areaList[type + "_list"] || {};
      result = Object.keys(list).map(function (code) {
        return {
          code: code,
          name: list[code]
        };
      });

      if (code) {
        // oversea code
        if (code[0] === '9' && type === 'city') {
          code = '9';
        }

        result = result.filter(function (item) {
          return item.code.indexOf(code) === 0;
        });
      }

      return result;
    }

    function getCode(type, name, parentCode = 0){
      let code = '';
      let list = areaList[type + "_list"] || {};
      let result = {};
      Object.keys(list).map(function (_code) {
        if(parentCode){
          if(_code.indexOf(parentCode) === 0){
            result[_code] = list[_code];
          }
        }else{
          result[_code] = list[_code];
        }
      });
      layui.each(result, function(_code, _name){
        if(_name === name){
          code = _code;
        }
      });

      return code;
    }
  };

  layarea.render = function (options) {
    let inst = new Class(options);
    layarea._id++;
    return thisArea.call(inst);
  };

  //暴露接口
  exports('layarea', layarea);
});