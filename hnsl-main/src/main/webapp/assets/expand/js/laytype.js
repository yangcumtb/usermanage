layui.define(['layer', 'form', 'laytpl'], function (exports) {
  "use strict";

  let $ = layui.$
      , form = layui.form
      , laytype = {
    _id: 0
    , config: {}
    , set: function (options) {
      let that = this;
      that.config = $.extend({}, that.config, options);
      return that;
    }
    , on: function (events, callback) {
      return layui.onevent.call(this, 'laytype', events, callback);
    }
  }
      , thisArea = function () {
    let that = this;
    return {
      laytype: function (files) {
        that.laytype.call(that, files);
      }
      , config: that.config
    }
  }
      , Class = function (options) {
    let that = this;
    that.config = $.extend({}, that.config, laytype.config, options);
    that.render();
  };

  let areaList = {
    one_list: {
      210000: '用地',
    },
    yDFL_list: {
      210100: '农用地',
      210200: '建设用地',
      210300: '未利用地',
    },
    fKFX_list: {
      210102: '0101水田',
      210103: '0102水浇地',
      210104: '0103旱地',
      210105: '0201果园',
      210106: '0202茶园',
      210107: '0203橡胶园',
      210108: '0204其他园地',
      210109: '0301乔木林地',
      210110: '0302竹林地',
      210111: '0303红树林地',
      210112: '0304森林沼泽',
      210113: '0305灌木林地',
      210114: '0306灌木沼泽',
      210115: '0307其他林地',
      210116: '0401天然牧草地',
      210117: '0402沼泽草地',
      210118: '0403人工牧草地',
      210119: '0306灌木沼泽',
      210120: '0307其他林地',
      210121: '1006农村道路',
      210122: '1103水库水面',
      210123: '1104坑塘水面',
      210124: '1107沟渠',
      210125: '1202设施农用地',
      210126: '1230田坎',
      210201: '0501零售商业用地',
      210202: '0502批发市场用地',
      210203: '0503餐饮用地',
      210204: '0504旅馆用地',
      210205: '0505商务金融用地',
      210206: '0506娱乐用地',
      210207: '0507其他商服用地',
      210208: '0601工业用地',
      210209: '0602采矿用地',
      210210: '0603盐田',
      210211: '0604仓储用地',
      210212: '0701城镇住宅用地',
      210213: '0702农村宅基地',
      210214: '0801机关团体用地',
      210215: '0802新闻出版用地',
      210216: '0803教育用地',
      210217: '0804科研用地',
      210218: '0805医疗卫生用地',
      210219: '0806社会福利用地',
      210220: '0807文化设施用地',
      210221: '0808体育用地',
      210222: '0809仓储用地',
      210223: '0810公园与绿地',
      210224: '0901军事设施用地',
      210225: '0902使领馆用地',
      210226: '0903监教场所用地',
      210227: '0904宗教用地',
      210228: '0905殡葬用地',
      210229: '0906风景名胜设施用地',
      210230: '1001铁路用地',
      210231: '1002轨道交通用地',
      210232: '1003公路用地',
      210233: '1004城镇村道路用地',
      210234: '1005交通服务场站用地',
      210235: '1007机场用地',
      210236: '1008港口码头用地',
      210237: '1009管道运输用地',
      210238: '1109水工建筑用地',
      210239: '1201空闲地',
      210301: '0404其他草地',
      210302: '1101河流水面',
      210303: '1105沿海滩涂',
      210304: '1106内陆滩涂',
      210305: '1108沼泽地',
      210306: '1110冰川及永久积雪',
      210307: '1204盐碱地',
      210308: '1205沙地',
      210309: '1206裸土地',
      210310: '1207裸岩石砾地',
    }
  };


  Class.prototype.config = {
    elem: '',
    data: {
      one: '--选择省--',
      yDFL: '--选择市--',
      fKFX: '--选择区--',
    },
    change: function(result){}
  };

  Class.prototype.index = 0;

  Class.prototype.render = function () {
    let that = this, options = that.config;
    options.elem = $(options.elem);
    options.bindAction = $(options.bindAction);

    that.events();
  };

  Class.prototype.events = function () {
    let that = this, options = that.config, index;
    let oneFilter = 'one-' + laytype._id;
    let yDFLFilter = 'yDFL-' + laytype._id;
    let fKFXFilter = 'fKFX-' + laytype._id;

    let oneEl = options.elem.find('.one-selector');
    let yDFLEl = options.elem.find('.yDFL-selector');
    let fKFXEl = options.elem.find('.fKFX-selector');

    //filter
    if(oneEl.attr('lay-filter')){
      oneFilter = oneEl.attr('lay-filter');
    }
    if(yDFLEl.attr('lay-filter')){
      yDFLFilter = yDFLEl.attr('lay-filter');
    }
    if(fKFXEl.attr('lay-filter')){
      fKFXFilter = fKFXEl.attr('lay-filter');
    }
    oneEl.attr('lay-filter', oneFilter);
    yDFLEl.attr('lay-filter', yDFLFilter);
    fKFXEl.attr('lay-filter', fKFXFilter);

    //获取默认值
    if(oneEl.data('value')){
      options.data.one = oneEl.data('value');
    }
    if(yDFLEl.data('value')){
      options.data.yDFL = yDFLEl.data('value');
    }
    if(fKFXEl.data('value')){
      options.data.fKFX = fKFXEl.data('value');
    }
    oneEl.attr('lay-filter', oneFilter);
    yDFLEl.attr('lay-filter', yDFLFilter);
    fKFXEl.attr('lay-filter', fKFXFilter);

    //监听结果
    form.on('select('+oneFilter+')', function(data){
      options.data.one = data.value;
      let code = getCode('one', data.value);
      renderyDFL(code);

      options.change(options.data);
    });
    form.on('select('+yDFLFilter+')', function(data){
      options.data.yDFL = data.value;
      let code = getCode('yDFL', data.value);
      renderfKFX(code);

      options.change(options.data);
    });
    form.on('select('+fKFXFilter+')', function(data){
      options.data.fKFX = data.value;

      options.change(options.data);
    });

    renderone();

    //查找one
    function renderone(){
      let tpl = '';
      let oneList = getList("one");
      let currentCode = '';
      let currentName = '';
      oneList.forEach(function(_item){
        if (!currentCode){
          currentCode = _item.code;
          currentName = _item.name;
        }
        if(_item.name === options.data.one){
          currentCode = _item.code;
          currentName = _item.name;
        }
        tpl += '<option value="'+_item.name+'">'+_item.name+'</option>';
      });
      options.data.one = currentName;
      oneEl.html(tpl);
      oneEl.val(options.data.one);
      form.render('select');
      renderyDFL(currentCode);
    }

    function renderyDFL(oneCode){
      let tpl = '';
      let yDFLList = getList('yDFL', oneCode.slice(0, 2));
      let currentCode = '';
      let currentName = '';
      yDFLList.forEach(function(_item){
        if (!currentCode){
          currentCode = _item.code;
          currentName = _item.name;
        }
        if(_item.name === options.data.yDFL){
          currentCode = _item.code;
          currentName = _item.name;
        }
        tpl += '<option value="'+_item.name+'">'+_item.name+'</option>';
      });
      options.data.yDFL = currentName;
      yDFLEl.html(tpl);
      yDFLEl.val(options.data.yDFL);
      form.render('select');
      renderfKFX(currentCode);
    }

    function renderfKFX(yDFLCode){
      let tpl = '';
      let fKFXList = getList('fKFX', yDFLCode.slice(0, 4));
      let currentCode = '';
      let currentName = '';
      fKFXList.forEach(function(_item){
        if (!currentCode){
          currentCode = _item.code;
          currentName = _item.name;
        }
        if(_item.name === options.data.fKFX){
          currentCode = _item.code;
          currentName = _item.name;
        }
        tpl += '<option value="'+_item.name+'">'+_item.name+'</option>';
      });
      options.data.fKFX = currentName;
      fKFXEl.html(tpl);
      fKFXEl.val(options.data.fKFX);

      form.render('select');
    }

    function getList(type, code) {
      let result = [];

      if (type !== 'one' && !code) {
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
        if (code[0] === '9' && type === 'yDFL') {
          code = '9';
        }

        result = result.filter(function (item) {
          return item.code.indexOf(code) === 0;
        });
      }

      return result;
    }

    function getCode(type, name){
      let code = '';
      let list = areaList[type + "_list"] || {};
      layui.each(list, function(_code, _name){
        if(_name === name){
          code = _code;
        }
      });

      return code;
    }
  };

  laytype.render = function (options) {
    let inst = new Class(options);
    laytype._id++;
    return thisArea.call(inst);
  };

  //暴露接口
  exports('laytype', laytype);
});