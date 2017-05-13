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

import CheckBox from 'react-native-check-box';

var rowNames = [
  '查看所有订单','查看预售订单','收货地址管理',
  '我的优惠券','发票管理','账户安全',
  '账户资金','预约管理','微信收款',
  '退出登录',
];

class CartView extends Component{

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
      <ItemView />
      <View style={styles.item_line}></View>
      </View>
    );
  }
  //列表行布局
  _renderRow(rowData,rowID) {
    return this.drawerItemLayout(rowData,rowID);
 }
 _renderFooter(){
   return (
     <MaterialView />
  );
 }
  render(){
    return (
      <View style={styles.container}>
        <TopView />
        <View style={styles.middle}>
          <View style={styles.middle_top}>
            <ScrollView style={styles.scroll_container}>
              <ListView
                // style={styles.container}
                initialListSize={15}
                dataSource={this.state.dataSource}
                renderRow={(rowData,rowID)=>this._renderRow(rowData,rowID)}
                renderFooter={this._renderFooter}
                />
            </ScrollView>
          </View>
        </View>
        <View style={styles.bottom}>
          <BottomView />
        </View>
      </View>
    );
  }
}
class TopView extends Component{
  render(){
    return(
      <View style={styles.top}>
        <Text style={styles.top_text_center}>购物车</Text>
        <Text style={styles.top_text_right}>管理</Text>
      </View>
    );
  }
}
class MaterialView extends Component{
  render(){
    return(
      <View style={styles.middle_material}>
        <View style={styles.middle_material_left}>
          <Text style={styles.middle_material_icon}>+</Text>
          <Text>PLA材料</Text>
        </View>
        <View style={styles.middle_material_middle}>
          <Text style={styles.middle_material_icon}>+</Text>
          <Text>PLA材料</Text>
        </View>
        <View style={styles.middle_material_right}>
          <Text style={styles.middle_material_icon}>+</Text>
          <Text>PLA材料</Text>
        </View>
      </View>
    );
  }
}

//自定义复选框
// <CheckBox
//             style={{flex: 1, padding: 10}}
//             onClick={()=>this.onClick(data)}
//             isChecked={data.checked}
//             leftText={leftText}
//             checkedImage={<Image source={require('../../page/my/img/ic_check_box.png')} style={this.props.theme.styles.tabBarSelectedIcon}/>}
//             unCheckedImage={<Image source={require('../../page/my/img/ic_check_box_outline_blank.png')} style={this.props.theme.styles.tabBarSelectedIcon}/>}
//         />

class BottomView extends Component{

  onClick(data){
    alert("data === > "+data);
  }

  render(){
    return(
      <View style={styles.bottom}>
        <View style={styles.bottom_left}>
          <CheckBox
           style={{flex: 1, padding: 0}}
          //  onClick={()=>this.onClick(data)}
           isChecked={true}
          //  leftText={'leftTex'}
           rightText={'全选'}
          />
        </View>
        <View style={styles.bottom_middle}>
          <View style={styles.bottom_middle_top}>
            <Text>合计：￥20495.99</Text>
          </View>
          <View style={styles.bottom_middle_bottom}>
            <Text>(不含运费)</Text>
          </View>
        </View>
        <View style={styles.bottom_right}>
          <Text>结算</Text>
        </View>
      </View>
    );
  }
}

class ItemView extends Component{
  render(){
    return(
      <View style={styles.item}>
        <View style={styles.item_left}>
          <CheckBox
           style={{flex: 1, padding: 0}}
          //  onClick={()=>this.onClick(data)}
           isChecked={true}
          //  leftText={'leftTex'}
          //  rightText={'全选'}
          />
          <Image source={require('../img/ccc.png')} style={styles.img_30} />
        </View>
        <View style={styles.item_middle}>
          <Text>3D打印-龙椅B款 缕空靠背</Text>
          <Text>￥20495.99</Text>
          <Text>(适用耗材:1.75mmPLA)</Text>
          <View style={styles.item_middle_bottom}>
            <View style={styles.item_middle_bottom_left}>
              <Text style={[styles.text_center,{flex:0.3}]}>-</Text>
              <Text style={styles.item_middle_bottom_left_middle}>1</Text>
              <Text style={[styles.text_center,{flex:0.3}]}>+</Text>
            </View>
            <View style={styles.item_middle_bottom_right}>
              <Text>x1</Text>
            </View>
          </View>
        </View>
        <View style={styles.item_right}>
          <Text>删除</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  img_30:{
    width:30,
    height:30,
  },
  text_center:{
    textAlign:'center',
  },
  scroll_container:{
    // flex:1,
    // flexDirection: 'column',
    // backgroundColor:'#fdc',
    paddingBottom:150,
  },
  container:{
    flex: 10,
    flexDirection: 'column',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    backgroundColor: '#F5FCFF',
  },
  lv_content:{

  },
  top:{
    flex:0.5,
    // 设置背景颜色
    backgroundColor:'#01a67c',
    // 设置宽度
    width:Dimensions.get('window').width,
    // 设置高度
    // height:30,
    color:'#fff',
  },
  top_text_center:{
    textAlign:'center',
    flex:1,
    flexDirection: 'column',
    justifyContent:'center',
    // backgroundColor: '#Faf',
    position:'absolute',
    left:(Dimensions.get('window').width-50)/2,
    zIndex:1,
  },
  top_text_right:{
    textAlign:'center',
    flex:1,
    flexDirection: 'column',
    justifyContent:'center',
    // backgroundColor: '#f55',
    position:'absolute',
    left:(Dimensions.get('window').width-40),
    zIndex:2,
  },
  top_text_left:{
    textAlign:'left',
    flex:1,
    flexDirection: 'row',
    justifyContent:'flex-start',
  },
  middle:{
    flex:9,
    padding: 0,
    // backgroundColor: '#aca',
    // height:
  },
  middle_top:{
    backgroundColor: '#cda',
  },
  middle_bottom:{
    backgroundColor: '#ffc',
  },
  middle_material:{
    flexDirection:'row',
    flex:1,
    height:50,
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#afc',
  },
  middle_material_left:{
    height:50,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
  },
  middle_material_middle:{
    height:50,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
  },
  middle_material_right:{
    height:50,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
  },
  middle_material_icon:{
    marginRight:3,
    borderWidth:1,
    borderLeftColor:'#ff6b00',
    borderTopColor:'#ff6b00',
    borderRightColor:'#ff6b00',
    borderBottomColor:'#ff6b00',
    color:'#ff6b00',
    paddingLeft:5,
    paddingRight:5,
  },
  bottom:{
    flex:1,
    flexDirection:'row',
    height:50,
    backgroundColor: '#cce',
  },
  bottom_left:{
    flex:1.5,
    height:50,
    flexDirection:'row',
    backgroundColor: '#aec',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  bottom_middle:{
    flex:4,
    height:50,
    backgroundColor: '#ace',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'flex-end',
  },
  // bottom_middle_top:{
  //   flex:1,
  //   width:150,
  //   backgroundColor: '#cae',
  // },
  // bottom_middle_bottom:{
  //   flex:1,
  //   width:150,
  //   textAlign:'right',
  //   backgroundColor: '#eea',
  // },
  bottom_right:{
    flex:1,
    height:50,
    backgroundColor: '#aec',
    justifyContent:'center',
    paddingRight:8,
    alignItems:'center',
  },
  item:{
    flexDirection:'row',
    flex:1,
    height:100,
    backgroundColor: '#aec',
    justifyContent:'center',
    alignItems:'center',
  },
  item_line:{
    height:2,
    flexDirection:'row',
    flex:1,
    backgroundColor:'gray',
  },
  item_left:{
    flexDirection:'row',
    flex:2,
    height:100,
    // backgroundColor: '#aca',
    justifyContent:'space-around',
    alignItems:'center',
  },
  item_middle:{
    flexDirection:'column',
    flex:7,
    height:100,
    // backgroundColor: '#aca',
    justifyContent:'space-around',
    alignItems:'flex-start',
  },
  item_right:{
    flexDirection:'row',
    flex:2,
    height:100,
    // backgroundColor: '#aca',
    justifyContent:'center',
    alignItems:'center',
  },
  item_middle_bottom:{
    flexDirection:'row',
    flex:1,
    height:20,
    // backgroundColor: '#aca',
    justifyContent:'space-around',
    alignItems:'center',
  },
  item_middle_bottom_left:{
    flexDirection:'row',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#aaa',
    color:'#000',
    height:20,
    borderTopLeftRadius:5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // paddingLeft:5,
    // paddingRight:5,
    margin:0,
    padding:0,
    textAlign:'center',
  },
  item_middle_bottom_left_middle:{
    borderColor:'#aaa',
    borderTopWidth :0,
    borderRightWidth :1,
    borderBottomWidth :0,
    borderLeftWidth :1,
    flex:0.3,
    textAlign:'center',
  },
  item_middle_bottom_right:{
    flex:1,
    height:20,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    paddingRight:13,
  },
  item_middle_bottom_right_text:{
    flex:1,
    height:20,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    paddingRight:13,
  },
});

//到处组件方便其他JS文件可以引用到
module.exports = CartView;
