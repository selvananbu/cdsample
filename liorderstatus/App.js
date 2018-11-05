
/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  DeviceEventEmitter,
  BackHandler
} from 'react-native';

import HomeScreen from './src/homescreen'
import LiOrderHeaderDetails from './src/liorderheaderdetails';
import LiWelcomeScreen from "./welcomescreen"

import NewsFeed from './src/newsfeed'
import LiWorkStepInfoDetails from './src/liworkstepinfodetails';
import LiItemDetails from './src/liitemdetails';
import LiGeneraInfo from './src/ligeneralinfo';
import LiGeometryInfo from './src/ligeometryinfo';
import LiBuildUpInfo from './src/libuildupinfo';
import LiOrderHistory from './src/liorderhistory';
import LiProcessingInfo from './src/liprocessinginfo';
import LiItemWorkStepInfo from './src/liitemworkstepinfo';
import LiRemakeInfo from './src/liremakeinfo';
import LiSettings from './src/lisettings';
import { width, height, totalSize } from 'react-native-dimension';
import Login from './src/lilayoutauthentication/login'
import allReducers from './src/liscannerreducer/index';
import { Router, Scene, Actions, ActionConst, Drawer } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as LocalSettings from './src/lib/localsettings';
const store = createStore(allReducers);

type Props = {};
export default class App extends Component<Props> {

  componentDidMount(){
    console.log('====================================');
    console.log(this.props);
    console.log('====================================');
        BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress.bind(this));
         DeviceEventEmitter.addListener('showSettings', function (e: Event) {
            Actions.LiSettings();
        });
         DeviceEventEmitter.addListener('showHome', function (e: Event) {
           Actions.HomeScreen();
         });
           DeviceEventEmitter.addListener('showNewsFeed', function (e: Event) {
             Actions.NewsFeed();
           });
          DeviceEventEmitter.addListener('showLogin', function (e: Event) {
            let baseurl = LocalSettings.getStorageItem("config.baseurl");
            if (baseurl === undefined || baseurl === null) {
              Actions.Login({
                isBaseUrlAvailable: false
              });
            } else 
              Actions.Login();
          }); 
      // }
     if(this.props.orderNo != undefined && this.props.orderNo != null && this.props.orderNo != -1){
      Actions.LiItemDetails({orderNo:this.props.orderNo,triggerType:this.props.triggerType,
        isLogging:true});
    }
    else if (this.props.customerNo != undefined && this.props.customerNo != null && this.props.customerNo != -1) {
      Actions.LiItemDetails({
        orderNo: this.props.customerNo,
        triggerType: this.props.triggerType,
        isLogging:true
      });
    }
    else {
      // Actions.HomeScreen({isLogging:false});
    }

    DeviceEventEmitter.addListener('showLogin', function (e: Event) {
      let baseurl = LocalSettings.getStorageItem("config.baseurl");
      if (baseurl === undefined || baseurl === null) {
        Actions.Login({
          isBaseUrlAvailable: false
        });
      }
      else
           Actions.Login();
    });
  }
  hardwareBackPress() {
    const scene = Actions.currentScene;
    if (scene == 'LiSettings') {
      Actions.HomeScreen();
      return true;
    }
  }

  render() {
    return (
      <Provider store={store}> 
        <Router>
           <Scene key="root">
           <Scene key="Login" component={Login} animation='fade' hideNavBar={true} initial={false} />
           <Scene key="LiSettings" component={LiSettings} animation='fade' hideNavBar={true} initial={false} />
           <Scene key="LiWelcomeScreen" component={LiWelcomeScreen} baseurl={this.props.baseurl} username={this.props.username} sitename={this.props.sitename}
               selectedSiteId={this.props.selectedid} refreshToken={this.props.refreshToken} accessToken={this.props.accessToken} isloggedin={this.props.isLoggedIn} extra={this.props.extra} animation='fade' hideNavBar={true}  initial={false}  />
            <Scene key="HomeScreen" component={HomeScreen}  baseurl={this.props.baseurl} username={this.props.username} sitename={this.props.sitename}
               selectedSiteId={this.props.selectedid} refreshToken={this.props.refreshToken} accessToken={this.props.accessToken} isloggedin={this.props.isLoggedIn} extra={this.props.extra} animation='fade' hideNavBar={true} initial={true}/>
            <Scene key="LiOrderHeaderDetails" component={LiOrderHeaderDetails} animation='fade' hideNavBar={true} initial={false} />
            <Scene key="LiItemDetails" component={LiItemDetails} animation='fade' hideNavBar={true} initial={false} />
            <Scene key="LiGeneraInfo" component={LiGeneraInfo} animation='fade' hideNavBar={true} initial={false} />
            <Scene key="LiGeometryInfo" component={LiGeometryInfo} animation='fade' hideNavBar={true} initial={false} />
            <Scene key="LiWorkStepInfoDetails" component={LiWorkStepInfoDetails} animation='fade' hideNavBar={true} initial={false} />
            <Scene key="LiBuildUpInfo" component={LiBuildUpInfo} animation='fade' hideNavBar={true} initial={false} />
            <Scene key="LiProcessingInfo" component={LiProcessingInfo} animation='fade' hideNavBar={true} initial={false} />
            <Scene key="LiOrderHistory" component={LiOrderHistory} animation='fade' hideNavBar={true} initial={false} />
            <Scene key="LiItemWorkStepInfo" component={LiItemWorkStepInfo} animation='fade' hideNavBar={true} initial={false} />
            <Scene key="LiRemakeInfo" component={LiRemakeInfo} animation='fade' hideNavBar={true} initial={false} />
            <Scene key="LiSettings" component={LiSettings} animation='fade' hideNavBar={true} initial={false} />
            <Scene key="Login" component={Login} animation='fade' hideNavBar={true} initial={false} />
            <Scene key="NewsFeed" component={NewsFeed} animation='fade' hideNavBar={true}  /> 
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
