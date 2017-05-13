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
  ViewPagerAndroid,
  ScrollView,
} from 'react-native';
// 导入Dimensions库
var Dimensions = require('Dimensions');

var homeMenuOneNames = [
  '3D打印机','3D打印','3D模型',
  '2D定制',
];
var homeMenuTwoNames = [
  '只能微工厂','合作','服务',
  '社区',
];
var homeMenuOneIcons = [
  require('../img/printer.png'),require('../img/printting.png'),
  require('../img/parent.png'),require('../img/custom.png'),
];
var homeMenuTwoIcons = [
  require('../img/smf.png'),require('../img/cooperation.png'),
  require('../img/service.png'),require('../img/community.png'),
];

class HomeMenuView extends Component{

  constructor(props) {
    super(props);
    // alert("HomeContentView子类构造方法："+props.isOpenDrawer);
    this.ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource : this.ds.cloneWithRows(homeMenuOneNames),
    }
  }

  _renderRow(sectionID,rowData,rowID){
    var imgSource = homeMenuOneIcons[rowID];
    return (
      <View ref={rowCompent => { this.rowCompent = rowCompent; }}>
        <TouchableHighlight underlayColor="red">
          <View>
            <View style={styles.item}>
              <Image style={styles.img_50}
                source={imgSource} />
                <Text style={[styles.text,{flex:1}]}
                  //这是属性跟样式有区别
                  numberOfLines={1}
                  ellipsizeMode='middle'
                  >
                  {sectionID}
                </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  render(){
    return (
      <ScrollView>
        <View style={styles.container}>
          <ListView
          initialListSize={30}
          dataSource={this.state.dataSource}
          renderRow={(rowData,sectionID,rowID)=>this._renderRow(rowData,sectionID,rowID)}
          contentContainerStyle={styles.list}
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
    backgroundColor:'#fdc',
    marginBottom:10,
  },
  container:{
    flex: 10,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  img_50:{
    width:50,
    height:50,
  },
  top:{
    flex:2,
    backgroundColor:'#cfd',
    width:Dimensions.get('window').width,
  },
  middle:{
    flex:1,
    flexWrap:'wrap',
    backgroundColor:'#fcd',
    width:Dimensions.get('window').width,
    // height:100,
  },
  bottom:{
    flex:7,
    backgroundColor:'#fdc',
    width:Dimensions.get('window').width,
  },
  img_100:{
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
    marginLeft: (Dimensions.get('window').width-200)/5.3,
    width: 50,
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionText:{
    // flex:1,
    // marginLeft:5,
    paddingLeft:5,
    width:Dimensions.get('window').width,
    fontSize:16,
    backgroundColor:'#afc',
  }
});

//到处组件方便其他JS文件可以引用到
module.exports = HomeMenuView;
