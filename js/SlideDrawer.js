/**

  drawerItemLayout(rowData,sectionID,rowID){
    if (rowID === '0') {

  /* eslint no-bitwise: 0 */
  hashCode(str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
      hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
  }

    // alert("sectionID = "+sectionID);
    var pos = 0;
    if (sectionID === '首页') {
      pos = 0;
    }else if (sectionID === '分类') {
      pos = 1;
    }else if (sectionID === '购物车') {
      pos = 2;
    }else if (sectionID === '用户中心') {
      pos = 3;
    }
    this.go(pos);
  }