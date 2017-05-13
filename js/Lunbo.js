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
import type { ViewPagerScrollState } from 'ViewPagerAndroid';
var indicatorWidth = 0;
var indicatorHeight = 0;

var indicatorIcons = [
  require('../img/circle.png'),
  require('../img/circle_01.png'),
  require('../img/circle_02.png'),
  require('../img/circle_03.png'),
  require('../img/circle_04.png'),
];

export default class Lunbo extends Component{
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged : (oldRow,newRow) => oldRow !== newRow,
      sectionHeaderHasChanged : (oldSec,newSec) => oldSec !== newSecs,
    });
    this.state = {
      page: 0,
      animationsAreEnabled: true,
      scrollEnabled: true,
      scrollState:'idle',
      dataSource : ds.cloneWithRows(indicatorIcons),
    }
  }

  go(page) {
    if (this.state.animationsAreEnabled) {
      this.viewPager.setPage(page);
    } else {
      this.viewPager.setPageWithoutAnimation(page);
    }
    this.setState({page});
  }

  onPageSelected(e) {
    this.setState({page: e.nativeEvent.position});
  }

  onPageScroll(e) {
    this.setState({page: e.nativeEvent.position});
  }

  onPageScrollStateChanged(state : ViewPagerScrollState) {
    this.setState({scrollState: state});
  }

  // componentDidMount() {
  //   var pagePos = this.state.page % 5;
  //   alert("pagePos === "+pagePos);
  //     this.timer = setTimeout(
  //       this.go(pagePos),
  //       500
  //     );
  //   }
  // componentWillUnmount() {
  //   // 如果存在this.timer，则使用clearTimeout清空。
  //   // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
  //   this.timer && clearTimeout(this.timer);
  // }

  // indicatorX_Y(e){
  //   // console.log(e);
  //   alert(e.layout.width);
  // }

  _renderRow(rowData, sectionID, rowID, highlightRow){
    // alert("rowData ===>"+rowData);
    return (
      <View>
        <TouchableOpacity onPress={() => highlightRow(sectionID, rowID)}>
          <Image
          style={styles.img_circle_bg}
            source={rowData}
          />
        </TouchableOpacity>
      </View>
    );
  }
  _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
   return (
     <View
       key={`${sectionID}-${rowID}`}
       style={{
         height: 1,
         backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
       }}
     />
   );
 }

  render(){
    return (
      <View style={styles.container}>
          <ViewPagerAndroid
            style={[styles.home_middle_viewPager,styles.ad_zIndex2]}
            initialPage={0}
            scrollEnabled={this.state.scrollEnabled}
            onPageScroll={(event)=>{this.onPageScroll(event)}}
            onPageSelected={(event)=>{this.onPageSelected(event)}}
            onPageScrollStateChanged={()=>{this.onPageScrollStateChanged()}}
            pageMargin={10}
            ref={viewPager => { this.viewPager = viewPager; }}
            >
            <View style={styles.ad_img}>
              <Image source={require('../img/banner.jpg')} style={{width:Dimensions.get('window').width,height:200}}/>
            </View>
            <View style={styles.ad_img}>
              <Image source={require('../img/banner1.jpg')} style={{width:Dimensions.get('window').width,height:200}}/>
            </View>
            <View style={styles.ad_img}>
              <Image source={require('../img/banner2.jpg')} style={{width:Dimensions.get('window').width,height:200}}/>
            </View>
            <View style={styles.ad_img}>
              <Image source={require('../img/banner3.jpg')} style={{width:Dimensions.get('window').width,height:200}}/>
            </View>
            <View style={styles.ad_img}>
              <Image source={require('../img/banner4.jpg')} style={{width:Dimensions.get('window').width,height:200}}/>
            </View>
          </ViewPagerAndroid>
          <View style={[styles.ad_zIndex3,styles.ad_indicator]}
            ref={indicator => { this.indicator = indicator; }}
            // onLayout={({nativeEvent:e})=>this.indicatorX_Y(e)}
          >
            <ListView
              style={styles.lv_indicator}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              contentContainerStyle={styles.list}
              renderSeparator={this._renderSeperator}
            />
          </View>
      </View>
    );
  }
}

class Indicator extends Component{
  render(){
    return (
      <View style={styles.ad_indicator}>
        <Image style={styles.img_circle_bg}
          source={require('../img/circle.png')}
        />
        <Image style={styles.img_circle_bg}
          source={require('../img/circle_01.png')}
        />
        <Image style={styles.img_circle_bg}
          source={require('../img/circle_02.png')}
        />
        <Image style={styles.img_circle_bg}
          source={require('../img/circle_03.png')}
        />
        <Image style={styles.img_circle_bg}
          source={require('../img/circle_04.png')}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    // flexDirection: 'row',
    // width:Dimensions.get('window').width,
    // height:Dimensions.get('window').height,
    // backgroundColor: '#F5FCFF',
  },
  lv_indicator:{
    flex: 1,
    flexDirection: 'row',
    flexWrap:'wrap',
    width:Dimensions.get('window').width/3,
    height:20,
    // backgroundColor: '#F5456F',
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
  home_middle_viewPager:{
    // flexDirection: 'column',
    // flexWrap:1,
    // flex: 1,
    // backgroundColor: '#dca',
    width:Dimensions.get('window').width,
    height:200,
  },
  img_circle_bg:{
    width:10,
    height:10,
    // 设置图片填充模式
    resizeMode:'cover',
    // 设置圆角
    borderRadius:5,
    // borderColor:'#fff',
    // backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
    borderWidth :1,
    overflow: 'hidden',
    marginLeft:10,
  },
  img_30:{
    width:30,
    height:30,
  },
  ad_img:{
    width:Dimensions.get('window').width,
    height:210,
  },
  ad_indicator:{
    // flexWrap:'wrap',
    // flex:1,
    flexDirection:"row",
    justifyContent:'center',
    alignItems:'flex-end',
    marginBottom:100,
  },
  ad_zIndex2:{
    // width:100,
    // height:100,
    // backgroundColor:'red',
    // left:20,
    position: 'absolute',
    zIndex:2
  },
  ad_zIndex3:{
    // width:100,
    // height:100,
    // backgroundColor:'green',
    left:(Dimensions.get('window').width-100)/2,
    top:(200-10),
    position: 'absolute',
    zIndex:3
  }

});

//到处组件方便其他JS文件可以引用到
module.exports = Lunbo;
