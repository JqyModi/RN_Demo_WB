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
} from 'react-native';
//第一部：导入库文件
const PubSub = require('pubsub-js');
const signals= require('signals');

//custom object that dispatch a `started` signal
var myObject = {
  started : new signals.Signal()
};
function onStarted(param1, param2){
  alert(param1 + param2);
}
myObject.started.add(onStarted); //add listener
myObject.started.dispatch('foo', 'bar'); //dispatch signal passing custom parameters
myObject.started.remove(onStarted); //remove a single listener

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

//第二部：定义一个全局事件名称
var switchDrawer = 'switchDrawer';


//使用PubSub.publish（）,第一个参数是公用的事件名称，第二个参数是你要传播的值
deleteItemHandler:function(){
    PubSub.publish(deleteItem, this.props.item);
},

//使用PubSub.subscribe（）,第一个参数是公用的事件名称，第二个参数是一个回调函数，可以是用箭头函数方式使它内部this指向组件对象，evName是事件对象，data就是子组件发布过来，这里接受到的data
componentDidMount:function(){
    PubSub.subscribe(deleteItem,(evName,data) =>{
        var newArr = this.state.listArr.filter(function(item,index){
            return item!= data;
        });
        this.setState({
            listArr:newArr
        });
    });
},


/*
var sections = ["我的账户","其它"];


var dataBlob = {
     0 : { ["我的账户"] },
     0:0 : {["短消息","我的订单","预售订单","收藏列表","收货地址"]},
     1 : { ["其它"] },
     1:0 : {["帮助中心","关于文搏","是否退出"]},
};

var sectionIDs = [ 0, 1];

var rowIDs = [ [ 0, 1 ], [ 0, 1 ]];
*/
export default class hello extends Component {

  /*constructor(props) {  //ES6设置状态写法
      //定义数据源变量
      var ds = new ListView.DataSource({
        //相同不渲染提高渲染效率
        rowHasChanged : (oldRow,newRow) => oldRow !== newRow
      });
      state = {
          dataSource : ds.cloneWithRows(menuItems)
      }
  }*/

  // ES6写法方法间不需要加","号,构造方法
  /*constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(menuItems),
    };
  }*/
  constructor(props) {
    super(props);
    alert("构造方法开始初始化状态属性等参数");

    var getSectionData = (dataBlob, sectionID) => {
          return dataBlob[sectionID];
     }
    var getRowData = (dataBlob, sectionID, rowID) => {
          return dataBlob[sectionID + ':' + rowID];
    }
    this.ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })

    //this.drawer =

    /*var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(menuItems,sections),
    };*/
    this.state = {
      dataSource : this.ds.cloneWithRowsAndSections(sectionMenuItems),
    }

    this.props = {
      drawer : null,
    }
  }
  /*render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
    );
  }*/

  /*getInitialState() {
    //定义数据源变量
    var ds = new ListView.DataSource({
      //相同不渲染提高渲染效率
      rowHasChanged : (oldRow,newRow) => oldRow !== newRow
    });
    return ({
      dataSource : ds.cloneWithRows(menuItems)
    });
  }*/

//第三部：触发事件之后发布事件：参数一表示：事件名称，参数二表示：发布事件需要传递的数据
  _onPressButton(drawer){
    alert("drawer = "+this.props.drawer);
    // dla.openDrawer();
    // return alert("modi:"+state);
    //开始发布事件
    PubSub.publish(switchDrawer, drawer);
  }

  openDrawer() {
    return this.drawer.openDrawer();
    }


  _renderHeader(){
    return (
      <View>
        <View style={styles.slide_row_line}></View>
        <View style={styles.slide_header}>
          <Image
            style={styles.img_50}
            source={require('./img/ccc.png')}
          />
          <View style={styles.slide_header_text}>
            <Text style={styles.slide_header_nick}>
              昵称
            </Text>
            <Text style={styles.slide_header_motto}>
              人生格言
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // (rowData) => <Text>{rowData}</Text>    ES6写法
  _renderRow(rowData,sectionID,rowID) {

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

  dlaComponentDidMount(drawer){
    alert("DLA子组件加载完成");
    this.props.drawer = drawer;
  }

  componentDidMount() {
    // 第四部：待组件全部渲染之后开始处理发布的事件列表
    alert("组件加载完成");
    this.pubsub_token = PubSub.subscribe(switchDrawer, function (topic, product) {
      this.setState({
        selection: product
      });
    }.bind(this));
  },
  componentWillUnmount: function () {
    // 第五部：卸载组件的时候取消订阅事件列表
    PubSub.unsubscribe(this.pubsub_token);
  }

  // create a function to subscribe to topics
 var mySubscriber = function( msg, data ){
   console.log( msg, data );
 };
 // add the function to the list of subscribers for a particular topic
 // we're keeping the returned token, in order to be able to unsubscribe
 // from the topic later on
 var token = PubSub.subscribe( 'MY TOPIC', mySubscriber );

 // 异步发布事件，非阻塞，无需等待订阅者处理结束
PubSub.publish( 'MY TOPIC', 'hello world!' );
// 同步发布事件，阻塞，需要等待订阅者处理结束
PubSub.publishSync( 'MY TOPIC', 'hello world!' );

  render() {
    alert("开始渲染组件");
    //抽屉页内容显示
    var navigationView = (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(rowData,sectionID,rowID)=>this._renderRow(rowData,sectionID,rowID)}
        renderHeader={this._renderHeader}
      />
    );

    return (
      <View style={styles.container}>
      <View style={styles.home_top}>
        <View style={styles.home_top_left}>
          <TouchableNativeFeedback
            onPress={this._onPressButton}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <Image
              style={styles.img_30}
              source={require('./img/wb_top_menu.png')}
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
            source={require('./img/top_ewm_01.png')}
          />
        </View>
      </View>
      <DrawerLayoutAndroid
        style={{flex:9}}
        drawerWidth={250}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        componentDidMount={this.dlaComponentDidMount(this)}
        renderNavigationView={() => navigationView}>

        <View style={styles.home_middle}>

        <Text>类目</Text>
        </View>
        <View style={styles.home_bottom}>
          <View style={styles.bottom_item}>
            <Image
              style={styles.img_30,styles.bottom_item_icon}
              source={require('./img/home_true.png')}
            />
            <Text style={styles.bottom_item_text}>首页</Text>
          </View>
          <View style={styles.bottom_item}>
            <Image
              style={styles.img_30,styles.bottom_item_icon}
              source={require('./img/categories_false.png')}
            />
            <Text style={styles.bottom_item_text}>分类</Text>
          </View>
          <View style={styles.bottom_item}>
            <Image
              style={styles.img_30,styles.bottom_item_icon}
              source={require('./img/cart_false.png')}
            />
            <Text style={styles.bottom_item_text}>购物车</Text>
          </View>
          <View style={styles.bottom_item}>
            <Image
              style={styles.img_30,styles.bottom_item_icon}
              source={require('./img/myediy_false.png')}
            />
            <Text style={styles.bottom_item_text}>用户中心</Text>
          </View>
        </View>
      </DrawerLayoutAndroid>


      </View>
    );
  }
}


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
    color:'#fff',
    backgroundColor: '#01a67c',
    justifyContent: 'space-between',
  },
  home_top_left:{
    flex:1,
    padding: 5,
    color:'#fff',
  },
  home_top_middle:{
    flex:8,
    padding: 5,
    color:'#fff',
  },
  home_top_right:{
    flex:1,
    padding: 5,
    color:'#fff',
  },
  home_middle:{
    flex:8,
    padding: 5,
    color:'#fff',
    backgroundColor: '#aaa',
  },
  home_bottom:{
    flexDirection: 'row',
    flex:0.8,
    padding: 10,
    backgroundColor: '#fff',
    color: '#4c4948',

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
    flex:2,
    marginLeft:10,
  },
  slide_header_text:{
    flex:2,
    textAlign: 'center',
    flexDirection: 'column',
  },
  slideheader_nick:{
    fontSize: 20,
    marginLeft:10,
    flex:1,
  },
  slideheader_motto:{
    fontSize: 18,
    marginLeft:10,
    flex:1,
  },
  slide_sectionID:{
    fontSize: 20,
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
    fontSize: 20,
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
    color: '#333333',
    marginBottom: 5,
  },

});
// 展示listview.js界面
// var hello = require('./listview');

AppRegistry.registerComponent('hello', () => hello);
