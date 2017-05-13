// 'use strict';
//
// var React = require('react');
// var ReactNative = require('react-native');
// var {
//   Image,
//   ListView,
//   TouchableHighlight,
//   StyleSheet,
//   RecyclerViewBackedScrollView,
//   Text,
//   View,
//   UIExplorerPage,
// } = ReactNative;
//
// var Tabs=React.createClass({//顶层组件
//         getInitialState:function(){
//             return {
//                 iNow:0,
//                 bCheck:true
//             };
//         },
//         setInow:function(index){//核心状态计算工具：依赖定时器进行实时刷新
//             if(index!==undefined){//如果参数有内容。
//                 this.setState({
//                     iNow:index
//                 });
//             }else{
//                 var _this=this;
//                 this.timer=setInterval(function(){
//                     if(_this.state.bCheck){
//                         //console.log(_this.state.bCheck)
//                         _this.setState(function(prev){
//                             if(prev.iNow==this.props.nums-1){
//                                 return {
//                                     iNow:0
//                                 };
//                             }else{
//                                 return {
//                                     iNow:prev.iNow+1
//                                 };
//                             }
//                         });
//                     }else{
//                         //console.log('该停了!')
//                         return false;
//                     }
//                 },this.props.timer);
//             }
//         },
//         checkSwitch:function(){
//             //console.log(this.state.bCheck)
//             this.setState(function(prev){
//                 return {
//                     bCheck:!prev.bCheck
//                 };
//             });
//         },
//         render:function(){
//             return (
//                 <div
//                   id={this.props.idNames.main}
//                   onMouseOver={this.checkSwitch}
//                   onMouseOut={this.checkSwitch}>
//
//                     <Btns iNow={this.state.iNow}
//                       setInow={this.setInow}
//                       nums={this.props.nums}
//                       idNames={this.props.idNames} />
//
//                     <Imgs iNow={this.state.iNow}
//                     nums={this.props.nums}
//                     idNames={this.props.idNames}
//                     imgType={this.props.imgType} />
//
//                 </div>
//             );
//         }
//     });
//
//     var Btns=React.createClass({
//         componentDidMount:function(){
//             this.props.setInow();
//         },
//         getIndex:function(e){//获取a的父级索引值
//             var list=e.target.parentNode.parentNode.childNodes;
//             for(var i=0;i<list.length;i++){
//                 if(list[i]===e.target.parentNode){
//                     return i;
//                 }
//             }
//         },
//         changeInow:function(e){//回调方法
//             //console.log($(e.target).parent().index());
//             //console.log(this.getIndex(e));
//             var index=this.getIndex(e);
//             this.props.setInow(index)
//         },
//
//         render:function(){
//             var arr=[];
//             for(var i=0;i<this.props.nums;i++){
//                 var btnsContent=null;
//                 var index=i;
//                 if(i==this.props.iNow){
//                     btnsContent=
//                         <li key={i.toString()}>
//                             <a onMouseOver={this.changeInow} id={this.props.idNames.active} href="javascript:;"></a>
//                         </li>
//                 }else{
//                     btnsContent=
//                         <li key={i.toString()}>
//                             <a  onMouseOver={this.changeInow} href="javascript:;"></a>
//                         </li>
//                 }
//                 arr.push(btnsContent);
//             }
//
//             return (
//                 <ul id={this.props.idNames.btns}>{arr}</ul>
//             );
//         }
//     });
//
//     var Imgs=React.createClass({
//         componentDidMount:function(){//刚开始加载时，就执行动画函数
//             var iNow=this.props.iNow;
//             var obj=document.getElementById(this.props.idNames.imgs).getElementsByTagName('li')[iNow].childNodes[0];
//             startMove(obj,{'opacity':100});
//         },
//         componentWillReceiveProps:function(nextProps){//每当收到新的props就执行动画
//             var obj=document.getElementById(this.props.idNames.imgs).getElementsByTagName('li')[nextProps.iNow].childNodes[0];
//             //console.log(obj)
//             startMove(obj,{'opacity':100});
//         },
//
//         render:function(){
//             var arr=[];
//             for(var i=0;i<this.props.nums;i++){
//                 var imgsContent=null;
//                 var src=this.props.imgType.url+this.props.imgType.name+(i+1)+'.'+this.props.imgType.type;
//                 if(i==this.props.iNow){
//                     imgsContent=
//                         <li key={i.toString()}>
//                             <img style={{opacity:'0'}} src={src} />
//                         </li>
//                     arr.push(imgsContent);
//                 }else{
//                     imgsContent=
//                         <li key={i.toString()}>
//                             <img style={{display:'none'}} src={src} />
//                         </li>
//                     arr.push(imgsContent);
//                 }
//             }
//
//             return (
//                 <ul id={this.props.idNames.imgs}>{arr}</ul>
//             )
//         }
//     })
//
//     ReactDOM.render(
//         <Tabs
//           nums={6}
//           timer={2000}
//           idNames={
//               {
//                   main:"tabs",
//                   btns:"btns",
//                   imgs:"imgs",
//                   active:"btn-active"
//               }
//           }
//           imgType={
//               {
//                   type:"jpg",
//                   url:"images/",
//                   name:"banner"
//               }
//           }
//            />,
//         document.getElementById('example')
//     );
//
// module.exports = Tabs;
