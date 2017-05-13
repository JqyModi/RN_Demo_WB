//导入json数据
var homeData = require('../json/home.json');

//获取homeData中的retval数组
var retval = homeData.retval;
// alert('retval ===>'+retval);
// 获取retval中的list数组
var list = _getRowNamesFromJson(retval);
// alert('list ===>'+list);

var captions = _getCaptionsFromRetval(retval);
var captions_01 = JSON.stringify(captions[0]).toString();
var captions_02 = JSON.stringify(captions[1]).toString();
var captions_03 = JSON.stringify(captions[2]).toString();
var captions_04 = JSON.stringify(captions[3]).toString();
// alert('captions ===>'+captions_01);

var recommendNames = _getGoodsNamesFromList(list[0]);
var printNames = _getGoodsNamesFromList(list[1]);
var printStreetNames = _getGoodsNamesFromList(list[2]);
var modelStreetNames = _getGoodsNamesFromList(list[3]);
var txtRecommendNames = JSON.stringify(recommendNames);
var txtPrintNames = JSON.stringify(recommendNames);
var txtPrintStreetNames = JSON.stringify(recommendNames);
var txtModelStreetNames = JSON.stringify(recommendNames);
// alert('printNames ===>'+printNames.length);
// alert('txt ===>'+txt);

var recommendIcons = _getGoodsIconsFromList(list[0]);
var printIcons = _getGoodsIconsFromList(list[1]);
var printStreetIcons = _getGoodsIconsFromList(list[2]);
var modelStreetIcons = _getGoodsIconsFromList(list[3]);
// alert('printIcons ===>'+printIcons.length);

var recommendPrices = _getGoodsPricesFromList(list[0]);
var printPrices = _getGoodsPricesFromList(list[1]);
var printStreetPrices = _getGoodsPricesFromList(list[2]);
var modelStreetPrices = _getGoodsPricesFromList(list[3]);
// alert('printPrices ===>'+printPrices.length);

function _getRowNamesFromJson(retval){
  var lists = [];
  for (var i = 1; i < retval.length; i++) {
    lists.push(retval[i].list);
  }
  return lists;
};

function _getCaptionsFromRetval(retval){
  var Captions = [];
  for (var i = 1; i < retval.length; i++) {
    Captions.push(retval[i].caption);
  }
  return Captions;
}

function _getGoodsNamesFromList(list){
  var GoodsNames = [];
  for (var i = 0; i < list.length; i++) {
    if (i==0) {
      GoodsNames.push('');
    }
    GoodsNames.push(list[i].goods_name);
  }
  return GoodsNames;
}

function _getGoodsIconsFromList(list){
  var GoodsIcons = [];
  for (var i = 0; i < list.length; i++) {
    if (i==0) {
      GoodsIcons.push('');
    }
    GoodsIcons.push('http://www.winbo.cn/'+list[i].default_image);
  }
  return GoodsIcons;
}

function _getGoodsPricesFromList(list){
  var GoodsPrices = [];
  for (var i = 0; i < list.length; i++) {
    if (i==0) {
      GoodsPrices.push('');
    }
    GoodsPrices.push(list[i].price);
  }
  return GoodsPrices;
}

function setDatas(captions){
  var data = [];
  for (var i = 0; i < captions.length; i++) {
    if (i == 0) {
      // alert(captions[i]+':'+txtRecommendNames);
      data.push(captions[i]+':'+txtRecommendNames);
    }else if (i == 1) {
      data.push(captions[i]+':'+txtPrintNames);
    }else if (i == 2) {
      data.push(captions[i]+':'+txtPrintStreetNames);
    }else if (i == 3) {
      data.push(captions[i]+':'+txtModelStreetNames);
    }
  }

  data = {
    '精选推荐':recommendNames,
    '3D打印机':printNames,
    '3D打印街':printStreetNames,
    '3D模型街':modelStreetNames,
  };

  return data;
}

var Global = {
    'nameDatas' : setDatas(captions),
    'recommendIcons' : recommendIcons,
    'recommendPrices' : recommendPrices,
    'printIcons' : printIcons,
    'printPrices' : printPrices,
    'printStreetIcons' : printStreetIcons,
    'printStreetPrices' : printStreetPrices,
    'modelStreetIcons' : modelStreetIcons,
    'modelStreetPrices' : modelStreetPrices,
};
module.exports = Global;
