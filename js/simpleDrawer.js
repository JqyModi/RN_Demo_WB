/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
} from 'react-native';

import type { ViewPagerScrollState } from 'ViewPagerAndroid';

var HomeView = require('./Home');
var CategoryView = require('./Category');
var CartView = require('./Cart');
var UserView = require('./User');

// StatusBar.setHidden(true);
var menuItems = [
  "短消息","我的订单","预售订单",
  "收藏列表","收货地址","帮助中心",
  "关于文搏","是否退出",
];
//模拟待section的数据源
var sectionMenuItems = {
  "我的账户":["短消息","我的订单","预售订单","收藏列表","收货地址"],
  "其它":["帮助中心","关于文搏","是否退出"]
};

var sectionBottomItems = {
  "首页":["../img/home_true.png"],
  "分类":["../img/categories_false.png"],
  "购物车":["../img/cart_false.png"],
  "用户中心":["../img/myediy_false.png"],
};

var icons = [
  require('../img/home_true.png'),
  require('../img/categories_false.png'),
  require('../img/cart_false.png'),
  require('../img/myediy_false.png'),
];
//主页内容和底部导航栏布局
export class HomeContentView extends Component{
  constructor(props) {
    super(props);
    // alert("HomeContentView子类构造方法："+props.isOpenDrawer);
    this.ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
    this.state = {
      dataSource : this.ds.cloneWithRowsAndSections(sectionMenuItems),
      // isOpenDrawer : 'unlocked',
      bottomDataSource : this.ds.cloneWithRowsAndSections(sectionBottomItems),
      pagePosition : 0,
      page: 0,
      animationsAreEnabled: true,
      scrollEnabled: true,
      scrollState:'idle',
      progress: {
        position: 0,
        offset: 0,
      },
    }
  }
  // 列表的表头布局
  //同时引用多个样式文件用数组形式中间用逗号分隔
  _renderHeader(){
    return (
      <View>
        <View style={styles.slide_row_line}></View>
        <View style={styles.slide_header}>
          <Image
            style={[styles.img_circle_bg,styles.slide_header_icon]}
            source={require('../img/ccc.png')}
          />
          <View style={styles.slide_header_text}>
            <Text style={styles.slide_header_nick}>
              昵称
            </Text>
            <Text style={styles.slide_header_motto}>
              个性签名
            </Text>
          </View>
        </View>
      </View>
    );
  }

  drawerItemLayout(rowData,sectionID,rowID){
    if (rowID === '0') {
      return (
        <View>
          <Text style={styles.slide_sectionID}>{sectionID}</Text>
          <View>
            <View style={styles.slide_row}>
              <Text style={styles.slide_row_text}>
                {rowData}
              </Text>
              <Text style={styles.slide_row_icon}> > </Text>
            </View>
            <View style={styles.slide_row_line}></View>
          </View>
        </View>
      );
    }
    return (
      <View>
        <View style={styles.slide_row}>
          <Text style={styles.slide_row_text}>
            {rowData}
          </Text>
          <Text style={styles.slide_row_icon}> > </Text>
        </View>
        <View style={styles.slide_row_line}></View>
      </View>
    );
  }

  /* eslint no-bitwise: 0 */
  hashCode(str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
      hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
  }

  //列表行布局
  _renderRow(rowData,sectionID,rowID) {
    if (sectionID === '我的账户' || sectionID === '其它') {
      return this.drawerItemLayout(rowData,sectionID,rowID);
    }else {
      var imgPath = JSON.stringify({rowData});

      var rowHash = Math.abs(this.hashCode(rowData));
      var imgSource = icons[rowHash % icons.length];
      //
      var strImagePath = imgPath.substring(imgPath.indexOf(':')+2,imgPath.lastIndexOf('\"'));
      // var icon = require(icons[rowID].val);
      // alert("rowData === "+rowData + ":"+sectionID+":"+rowID);
      if (rowID === '0') {
          return(
        //参照官方的本地图片显示方式
        <View style={styles.home_bottom}>
          <TouchableNativeFeedback
             onPress={() => {
              this._onPressButton(sectionID);
              }
            }
             background={TouchableNativeFeedback.SelectableBackground()}
             >
             <View style={styles.bottom_item}>
              <Image
                style={styles.img_30,styles.bottom_item_icon}
                source={imgSource}
              />
              <Text style={styles.bottom_item_text}>{sectionID}</Text>
            </View>
            </TouchableNativeFeedback>
            </View>
          );
        }else {
          return null;
        }
   }
 }
  _onPressButton(sectionID){
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
  move(delta) {
    var page = this.state.page + delta;
    this.go(page);
  }

  go(page) {
    if (this.state.animationsAreEnabled) {
      this.viewPager.setPage(page);
    } else {
      this.viewPager.setPageWithoutAnimation(page);
    }

    this.setState({page});
  }

  render(){
    // 抽屉页内容显示
    var navigationView = (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(rowData,sectionID,rowID)=>this._renderRow(rowData,sectionID,rowID)}
        renderHeader={this._renderHeader}
      />
    );
    var pagePos = this._getCurrent;
    return (
      <DrawerLayoutAndroid
        style={{flex:9}}
        drawerWidth={250}
        drawerLockMode={this.props.isOpenDrawer = ''? 'unlocked':this.props.isOpenDrawer}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        >

        <View style={styles.home_middle}>
          <ViewPagerAndroid
            style={styles.home_middle_viewPager}
            initialPage={0}
            ref={viewPager => { this.viewPager = viewPager; }}
            >
            <View style={styles.home_middle_viewPager_home}>
              <View style={{flex:1}}>
                <HomeView />
              </View>
            </View>
            <View style={styles.home_middle_viewPager_category}>
              <View style={{flex:1}}>
                <CategoryView />
              </View>
            </View>
            <View style={styles.home_middle_viewPager_cart}>
              <View style={{flex:1}}>
                <CartView />
              </View>
            </View>
            <View style={styles.home_middle_viewPager_user}>
              <View style={{flex:1}}>
                <UserView style={{flex:1}} />
              </View>
            </View>
          </ViewPagerAndroid>
        </View>

          <ListView
            style={styles.container}
            dataSource={this.state.bottomDataSource}
            horizontal={true}
            renderRow={(rowData,sectionID,rowID)=>this._renderRow(rowData,sectionID,rowID)}
          />

      </DrawerLayoutAndroid>
    );
  }
}
// 入口组件
export default class hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDrawer : 'locked-closed',
    }
  }
  changeDrawer(isOpenDrawer){
    if (isOpenDrawer === 'locked-open') {
      isOpenDrawer = 'locked-closed';
    }else {
      isOpenDrawer = 'locked-open';
    }
    // alert("changeDrawer : "+isOpenDrawer);
    return isOpenDrawer;
  }
  _onPressButton(){
    this.setState({
      isOpenDrawer : this.changeDrawer(this.state.isOpenDrawer),
    });
  }

  render() {
    // alert("开始渲染组件");
    return (
      <View style={styles.container}>
        <View style={styles.home_top}>
          <View style={styles.home_top_left}>
            <TouchableNativeFeedback
              onPress={this._onPressButton.bind(this)}
              background={TouchableNativeFeedback.SelectableBackground()}>
              <Image
                style={styles.img_30}
                source={require('../img/wb_top_menu.png')}
              />
            </TouchableNativeFeedback>
          </View>
          <View style={styles.home_top_middle}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            />
          </View>
          <View style={styles.home_top_right}>
            <Image
              style={styles.img_30}
              source={require('../img/top_ewm_01.png')}
            />
          </View>
        </View>
        <HomeContentView isOpenDrawer={this.state.isOpenDrawer} />
      </View>
    );
  }
}
// console.log( msg, data );
/*
  拼接样式：多个样式同时作用时：用数组对象：用[]将多个样式对象括起来也可以将对象直接写到数组中【不推荐】
  写到前面的样式优先级较高
*/
const styles = StyleSheet.create({
  container: {
    flex: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  img_30:{
    width:30,
    height:30,
  },
  img_50:{
    width:50,
    height:50,
  },
  img_circle_bg:{
    width:50,
    height:50,
    // 设置图片填充模式
    resizeMode:'cover',
    // 设置圆角
    borderRadius:25,
    borderColor:'#fff',
    borderWidth :1,
    overflow: 'hidden',
  },
  flex:{
    flex:1,
  },
  center:{
    justifyContent: 'space-around',
    alignItems:'center',
  },
  home_top:{
    flexDirection: 'row',
    flex:1,
    padding: 5,
    backgroundColor: '#01a67c',
    justifyContent: 'space-between',
  },
  home_top_left:{
    flex:1,
    padding: 5,
  },
  home_top_middle:{
    flex:8,
    padding: 5,
  },
  home_top_right:{
    flex:1,
    padding: 5,
  },
  home_middle:{
    flex:8,
    padding: 5,
    backgroundColor: '#aaa',
  },
  home_middle_viewPager:{
    // flexDirection: 'column',
    flex:1,
    // backgroundColor: '#153',
  },
  home_middle_viewPager_home:{
    backgroundColor: '#af0',
    flex:1,
  },
  home_middle_viewPager_category:{
    backgroundColor: '#af5',
    flex:1,
  },
  home_middle_viewPager_cart:{
    backgroundColor: '#afa',
    flex:1,
  },
  home_middle_viewPager_user:{
    backgroundColor: '#aff',
    flex:1,
  },
  home_bottom:{
    flexDirection: 'row',
    flex:0.8,
    padding: 10,
    backgroundColor: '#fff',

    // display: 'flex',
    justifyContent: 'space-around',
  },
  bottom_item:{
    flexDirection: 'column',
    justifyContent: 'center',
    //设置内容居中
    alignItems:'center',
  },
  bottom_item_icon:{
    width:20,
    height:20,
    alignItems:'center',
  },
  bottom_item_text:{
    textAlign:'center',
    fontSize: 14,
  },
  slide_header:{
    backgroundColor:'#01a67c',
    flexDirection: 'row',
  },
  slide_header_icon:{
    margin:10,
  },
  slide_header_text:{
    flex:2,
    textAlign: 'center',
    flexDirection: 'column',
    margin:15,
  },
  slide_header_nick:{
    fontSize: 18,
    textAlign: 'left',
    flex:1,
  },
  slide_header_motto:{
    fontSize: 16,
    textAlign: 'left',
    flex:1,
  },
  slide_sectionID:{
    fontSize: 18,
    backgroundColor:'#ccc',
  },
  slide_row:{
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slide_row_line:{
    backgroundColor:'#ccc',
    height:1,
  },
  slide_row_text:{
    fontSize: 16,
    textAlign: 'left',
    flex:1,
  },
  slide_row_icon:{
    textAlign:'right',
    paddingTop:3,
    flex:1,
  },

  row: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  content: {
    textAlign: 'center',
    marginBottom: 5,
  },

});

// 展示listview.js界面
// var hello = require('../listview');
// var hello = require('../eventbus');
module.exports = hello;
// AppRegistry.registerComponent('hello', () => hello);
