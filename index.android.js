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

// 展示listview.js界面
// var hello = require('./js/listView');
// var hello = require('./eventbus');
// var hello = require('./js/SlideDrawer');
// var hello = require('./js/ViewPagerAndroidDemo');
// var hello = require('./js/Lunbo');
var hello = require('./js/simpleDrawer');


AppRegistry.registerComponent('hello', () => hello);
