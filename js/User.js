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
var rowNames = [
  '查看所有订单','查看预售订单','收货地址管理',
  '我的优惠券','发票管理','账户安全',
  '账户资金','预约管理','微信收款',
  '退出登录',
];

class UserView extends Component{

  constructor(props) {
    super(props);
    // alert("HomeContentView子类构造方法："+props.isOpenDrawer);
    this.ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource : this.ds.cloneWithRows(rowNames),
    }
  }

  drawerItemLayout(rowData,rowID){
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
  //列表行布局
  _renderRow(rowData,rowID) {
    return this.drawerItemLayout(rowData,rowID);
 }

  render(){
    return (
      <ScrollView style={{flex:this.props.flex}}>
        <View style={styles.container}>
          <Image
            style={styles.user_top}
            // style={[styles.img_30,{resizeMethod:'auto'}]}
            source={require('../img/member_head_bj.png')}
            ref={image => { this.image = image; }}
            >
            <View>
              <View style={styles.user_top_img}>
                <Image
                style={styles.img_circle_bg}
                source={require('../img/ccc.png')}
                />
              </View>
              <View style={styles.user_top_name}>
                <Text style={styles.user_top_bottom_text}>
                  admin
                </Text>
              </View>
              <View style={styles.user_top_bottom}>
                <View style={styles.user_top_msg}>
                  <Text style={styles.user_top_bottom_text}>
                    短信息(7)
                  </Text>
                </View>
                <View style={styles.user_top_info}>
                  <Text style={styles.user_top_bottom_text}>
                    修改个人资料
                  </Text>
                </View>
              </View>
            </View>
          </Image>

          <View style={styles.user_middle}>
            <Text>
              您目前还没有已生成的订单去<Text style={{color:'#106FB2'}}>商城首页</Text>，
              挑选喜爱的商品，体验购物乐趣吧。
            </Text>
          </View>
          <View style={styles.user_bottom}>
            <ListView
              style={styles.container}
              dataSource={this.state.dataSource}
              renderRow={(rowData,rowID)=>this._renderRow(rowData,rowID)}
              />
          </View>
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
  },
  container:{
    flex: 10,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  img_30:{
    width:30,
    height:30,
  },
  img_circle_bg:{
    width:80,
    height:80,
    // 设置图片填充模式
    resizeMode:'cover',
    // 设置圆角
    borderRadius:40,
    borderColor:'#fff',
    borderWidth :2,
    overflow: 'hidden',
  },
  user_top:{
    flex:3,
    alignItems:'center',
    // 设置背景颜色
    backgroundColor:'green',
    // 设置宽度
    width:Dimensions.get('window').width,
    // 设置高度
    height:180,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  user_middle:{
    flex:1,
    padding: 5,
    backgroundColor: '#aca',
  },
  user_bottom:{
    flex:6,
    backgroundColor: '#f56',
  },
  user_top_img:{
    flex:2,
    width:Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems:'center',

  },
  user_top_name:{
    flex:1,
    width:Dimensions.get('window').width,
    alignItems:'center',
    justifyContent: 'center',
    color:'#fff',
    borderBottomColor:'#aaa',
    borderBottomWidth:1,
  },
  user_top_bottom:{
    flex:1,
    width:Dimensions.get('window').width,
    flexDirection: 'row',
    color:'#fff',
    alignItems:'center',
    // flexWrap:'nowrap',
    // backgroundColor:'#dfa',
  },
  user_top_bottom_text:{
    flex:1,
    alignItems:'center',
    // height:50,
    justifyContent: 'center',
    textAlign:'center',
    color:'#fff',
    textShadowColor:'#aac',
    //设置字体居中
    textAlignVertical:'center'
  },
  user_top_msg:{
    flex:1,
    width:Dimensions.get('window').width/2,
    alignItems:'center',
    borderRightColor:'#aaa',
    borderRightWidth:1,
    // height:50,
    justifyContent: 'center',
    textAlign:'center',
    // backgroundColor: '#aac',
  },
  user_top_info:{
    flex:1,
    width:Dimensions.get('window').width/2,
    alignItems:'center',
    // height:50,
    justifyContent: 'center',
    textAlign:'center',
    // backgroundColor: '#aca',
  },
  user_middle_order:{

  },
  user_middle_linkText:{

  },
  user_bottom_container:{

  },
  user_bottom_row:{

  },
  user_bottom_seperater:{

  },
  user_bottom_row_img:{
    width:30,
    height:30,
  },
  user_bottom_row_name:{

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
});

//到处组件方便其他JS文件可以引用到
module.exports = UserView;
