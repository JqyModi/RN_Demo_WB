'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  DrawerLayoutAndroid,
  StatusBar,
  ListView,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  ViewPagerAndroid,
  ScrollView,
} from 'react-native';
// 导入Dimensions库
var Dimensions = require('Dimensions');

var sectionNames = ['3D打印机','3D打印产品','3D模型','2D定制'];

var PrintRowNames = [
  '迷你','超值','藏龙',
  '卧虎','酷派','立式机',
  '多头机','超级助手','PLA材料',
  'PETG材料','ABS材料','3D打印机配件',
  '3D扫描','转盘',
];

var PrintRowIcons= [
  '',
  require('../img/mini.jpg'),
  require('../img/cz.jpg'),
  require('../img/cl.jpg'),
  require('../img/wh.jpg'),
  require('../img/kp.jpg'),
  require('../img/lsj.jpg'),
  require('../img/dtj.jpg'),
  require('../img/cjzs.jpg'),
  require('../img/PLA.jpg'),
  require('../img/PETG.jpg'),
  require('../img/ABS.jpg'),
  require('../img/3dpj.jpg'),
  require('../img/3dsm.jpg'),
  require('../img/zp.jpg'),
];
var PrintingRowNames = [
  '居家/灯饰','礼品/工艺品','文具',
  '玩具','服饰','建筑',
];

var PrintingRowIcons = [
  '',
  require('../img/jjds.jpg'),
  require('../img/lpgy.jpg'),
  require('../img/wj.jpg'),
  require('../img/wanj.jpg'),
  require('../img/fs.jpg'),
  require('../img/jz.jpg'),
];
var ModelRowNames = [
  '3D模型图','免费模型',
];

var ModelRowIcons = [
  '',
  require('../img/3dmx.jpg'),
  require('../img/mfmx.jpg'),
];
var CustomRowNames = [
  '礼品文具','居家用品','相框/板画',
  '相册/日历',
];

var CustomRowIcons = [
  '',
  require('../img/lpwj.jpg'),
  require('../img/jjyp.jpg'),
  require('../img/xkbh.jpg'),
  require('../img/xcrl.jpg'),
];

var datas = {
  '3D打印机':['','迷你','超值','藏龙','卧虎','酷派','立式机',
    '多头机','超级助手','PLA材料','PETG材料','ABS材料',
    '3D打印机配件','3D扫描','转盘'],
  '3D打印产品':['','居家/灯饰','礼品/工艺品','文具','玩具','服饰','建筑'],
  '3D模型':['','3D模型图','免费模型'],
  '2D定制':['','礼品文具','居家用品','相框/板画','相册/日历']
};

class CategoryView extends Component{
  constructor(props) {
    super(props);
    // alert("HomeContentView子类构造方法："+props.isOpenDrawer);
    this.ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
    this.state = {
      // dataSource : this.ds.cloneWithRows(PrintRowNames),
      dataSource : this.ds.cloneWithRowsAndSections(datas),
      // dataSource : this._getDataSource,
    }
  }

  _renderRow(rowData,sectionID, rowID) {
    var imgSource;
    if (sectionID === '3D打印机') {
      // alert('3D打印机');
      imgSource = PrintRowIcons[rowID];
    }else if (sectionID === '3D打印产品') {
      // alert('3D打印产品');
      imgSource = PrintingRowIcons[rowID];
    }else if (sectionID === '3D模型') {
      // alert('3D模型');
      imgSource = ModelRowIcons[rowID];
    }else if (sectionID === '2D定制') {
      // alert('2D定制');
      imgSource = CustomRowIcons[rowID];
    }
    return this._rowItem(sectionID,rowData,rowID,imgSource);
  }

  _rowItem(sectionID,rowData,rowID,imgSource){
    if (rowID == '0') {
      return (
        <View>
          <Text style={styles.sectionText}>{sectionID}</Text>
        </View>
      );
    }else{
      return (
        <View ref={rowCompent => { this.rowCompent = rowCompent; }}>
          <TouchableHighlight underlayColor="red">
            <View>
              <View style={styles.item}>
                <Image source={imgSource} />
                <Text style={[styles.text,{flex:1}]}>
                  {rowData}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  }

  render(){
    return (
      <ScrollView style={{flex:this.props.flex}}>
        <View style={styles.container}>
          <ListView
          initialListSize={30}
          dataSource={this.state.dataSource}
          renderRow={(rowData,sectionID,rowID)=>this._renderRow(rowData,sectionID,rowID)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  scroll_container:{
    flex:10,
    flexDirection: 'column',
    backgroundColor:'#cdf2dc',
  },
  container:{
    flex: 10,
    flexDirection: 'column',
    backgroundColor: '#cdf2dc',
  },
  img_30:{
    width:100,
    height:100,
  },
  list: { //设置grid布局
        flexDirection: 'row',
        flexWrap: 'wrap',
        //主轴方向
        justifyContent: 'flex-start',
        //次轴方向
        alignItems: 'center',
  },
  item: {
      // backgroundColor: 'red',
      marginLeft: (Dimensions.get('window').width-240)/4.3,
      width: 80
  },
  text:{
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionText:{
    // flex:1,
    // marginLeft:5,
    paddingLeft:10,
    width:Dimensions.get('window').width,
    fontSize:16,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#cdf2dc',
  },
});

//到处组件方便其他JS文件可以引用到
module.exports = CategoryView;
