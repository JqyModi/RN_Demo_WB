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

// import AdView from './TopAd';
// var AdView = require('./Lunbo');
import AdView from './AdView';
// 导入Dimensions库
var Dimensions = require('Dimensions');

var HomeMenuView = require('./HomeMenu');

//定义一个全局常量
const Global = require('./Global');

class HomeView extends Component{
  constructor(props) {
    super(props);

    // var datas = this.datas;

    this.ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
    // alert("datas ===>" +datas);
    this.state = {
      // dataSource : this.ds.cloneWithRows(PrintRowNames),
      dataSource : this.ds.cloneWithRowsAndSections(Global.nameDatas),
      // dataSource : this._getDataSource,
    }
  }

  _genRows(pressData): Array<string> {
      var dataBlob = [];
      for (var ii = 0; ii < pressData.length; ii++) {
        var pressedText = pressData[ii];
        // alert('pressedText ===>'+pressedText);
        dataBlob.push(pressedText);
      }
      return dataBlob;
    }

    /* eslint no-bitwise: 0 */
    hashCode(str) {
      var hash = 15;
      for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
      }
      return hash;
    }

    _renderRow(rowData,sectionID, rowID) {
      var imgSource;
      var price;

      var rowHash = Math.abs(this.hashCode(rowData));

      if (sectionID === '精选推荐') {
        imgSource = Global.recommendIcons[rowHash % Global.recommendIcons.length];
        price = Global.recommendPrices[rowID];
      }else if (sectionID === '3D打印机') {
        // alert('3D打印产品');
        imgSource = Global.printIcons[rowID];
        price = Global.printPrices[rowID];
      }else if (sectionID === '3D打印街') {
        // alert('3D模型');
        imgSource = Global.printStreetIcons[rowID];
        price = Global.printStreetPrices[rowID];
      }else if (sectionID === '3D模型街') {
        // alert('2D定制');
        imgSource = Global.modelStreetIcons[rowID];
        price = Global.modelStreetPrices[rowID];
      }
      return this._rowItem(sectionID,rowData,rowID,imgSource,price);
    }

    _rowItem(sectionID,rowData,rowID,imgSource,price){
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
                  <Image style={styles.img_150}
                    source={{uri: imgSource}} />
                    <Text style={[styles.text,{flex:1}]}
                      //这是属性跟样式有区别
                      numberOfLines={1}

                      ellipsizeMode='middle'
                      >
                      {rowData}
                    </Text>
                    <Text style={[styles.text,{flex:1}]}>
                      {price}元
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
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.top}>
            <AdView />
          </View>
          <View style={styles.line}/>
          <View style={styles.middle}>
            <HomeMenuView />
          </View>
          <View style={styles.line}/>
          <View style={styles.bottom}>
            <ListView
            initialListSize={30}
            dataSource={this.state.dataSource}
            renderRow={(rowData,sectionID,rowID)=>this._renderRow(rowData,sectionID,rowID)}
            contentContainerStyle={styles.list}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  scroll_container:{
    flex:1,
    // backgroundColor:'#fdc',
  },
  container:{
    flex: 10,
    flexDirection: 'column',
    justifyContent:'space-between',
    // backgroundColor: '#fff',
    // height:500,
    width:Dimensions.get('window').width,
  },
  top:{
    flex:2,
    // backgroundColor:'#cfd',
    width:Dimensions.get('window').width,
  },
  middle:{
    flex:1,
    flexDirection:'column',
    // backgroundColor:'#fcd',
    width:Dimensions.get('window').width,
  },
  bottom:{
    flex:7,
    backgroundColor:'#cdf2dc',
    width:Dimensions.get('window').width,
  },
  img_30:{
    width:100,
    height:100,
  },
  img_100:{
    width:100,
    height:100,
  },
  img_150:{
    width:150,
    height:150,
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
    marginLeft: (Dimensions.get('window').width-370)/3.5,
    width: 180,
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:5,
    paddingRight:5,
  },
  sectionText:{
    // flex:1,
    // marginLeft:5,
    paddingLeft:5,
    width:Dimensions.get('window').width,
    fontSize:16,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#cdf2dc',
  },
  line:{
    width:Dimensions.get('window').width,
    height:5,
    backgroundColor:'#aaa',
  }
});

//到处组件方便其他JS文件可以引用到
module.exports = HomeView;
