/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { SearchBar } from 'react-native-elements'
import { width, height, totalSize } from 'react-native-dimension';

import { Actions, ActionConst } from 'react-native-router-flux';

import {AuthUtil,ensureAccessTokenIsValid} from './lilayoutauthentication/authutil'
import * as commonFunction from './lib/responseFunction';
import * as LocalSettings from './lib/localsettings';

import LiSearchBar from './lisearchbar'
import LiMultiTerm from './lib/limultiterm';
const muobj = new LiMultiTerm("", "");

 
export default class HomeScreen extends Component {

    constructor(props){
    super(props);
    this.state={
      isLogging: true
    }
  }

      componentWillUnmount() {
        muobj.setupText();
      }
      componentDidUpdate() {
        muobj.setupText();
      }

    componentDidMount() {
        console.log('====================================');
        console.log("$%$%", LocalSettings.getStorageItem("config.baseurl"));
        console.log('====================================');
      if (LocalSettings.getStorageItem("config.baseurl") === null || LocalSettings.getStorageItem("config.baseurl") === undefined){
             LocalSettings.initializeLocalSettings(this.callBackAfterStorageInit.bind(this));
      }
      else{
        muobj.setupText();
        this.setState({isLogging:false})
      }
    }
      componentWillReceiveProps(nextProps){
       if(nextProps.isLogging !== this.state.isLogging){
           this.setState({isLogging:nextProps.isLogging})
       }
       
   }
     checkForLogin() {
         console.log('====================================');
         console.log("2222222222222222222", this.props.username, LocalSettings.getStorageItem("config.username"));
         console.log('====================================');
        let baseurl = LocalSettings.getStorageItem("config.baseurl");
        let loggedIn = LocalSettings.getStorageItem("config.loggedin");

        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        console.log("############", baseurl, this.props.baseurl, this.props.username, LocalSettings.getStorageItem("config.username"));
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');

        if(this.props.extra !== undefined && baseurl === undefined){
          var list = this.props.extra;

          for (var i = 0; i < list.length; i++) {
              var val = list[i];
              var result = val.split(",");
              var value = result[1];
              if(result.length >= 2){
                if (result[0].includes("last.loaded")){
                    value = new Date(result);
                }
                else if (result[0].includes("text.")) {
                  value = value.replace(/["']/g, "");
                }
                else if (result[0].includes("core.app.language.id3")) {
                  value = value.replace(/["']/g, "");
                }
                else if (result[0].includes("delayTime")) {
                  value = value.replace(/["']/g, "");
                  value = parseInt(value,10);

                }
                console.log('====================================');
                console.log("Hereeeeeee",this.props.selectedSiteId,this.props.username);
                console.log('====================================');
                LocalSettings.setStorageItem(result[0],value);
                
              }
          }
        }
       if (baseurl !== undefined && this.props.extra !== undefined && this.props.extra !== [] && (this.props.baseurl !== baseurl || this.props.username !== LocalSettings.getStorageItem("config.username"))) {
           var list = this.props.extra;
           console.log('====================================');
           console.log("111111111111111111",list);
           console.log('====================================');

           
               for (var i = 0; i < list.length; i++) {
              var val = list[i];
              var result = val.split(",");
              var value = result[1];
              if(result.length >= 2){
                if (result[0].includes("last.loaded")){
                    value = new Date(result);
                }
                else if (result[0].includes("text.")) {
                  value = value.replace(/["']/g, "");
                }
                else if (result[0].includes("core.app.language.id3")) {
                  value = value.replace(/["']/g, "");
                }
                else if (result[0].includes("delayTime")) {
                  value = value.replace(/["']/g, "");
                  value = parseInt(value,10);

                }

                   console.log('====================================');
                   console.log("Hereeeeeee", this.props.selectedSiteId, this.props.username);
                   console.log('====================================');
                   LocalSettings.setStorageItem(result[0], value);
              }


          }
            let siteName = this.props.sitename;
            baseurl = this.props.baseurl;

            console.log('====================================');
            console.log("dscsds", baseurl, siteName);
            console.log('====================================');

            LocalSettings.setStorageItem("config.baseurl", baseurl);
            LocalSettings.setStorageItem("config.baseurl", baseurl);
            LocalSettings.setStorageItem("config.username", this.props.username);
            LocalSettings.setStorageItem("config.sitename", siteName);
            LocalSettings.setStorageItem("config.selectedSiteID", this.props.selectedSiteId);
            LocalSettings.setStorageItem("config.accessToken." + siteName, this.props.accessToken);
            LocalSettings.setStorageItem("config.refreshToken." + siteName, this.props.refreshToken);
            LocalSettings.setStorageItem("config.loggedin", loggedIn);

            console.log('====================================');
            console.log("#$#$$$$$$$$$$$$$$$$$$$", this.props.selectedSiteId);
            console.log('====================================');

            ensureAccessTokenIsValid(this.callBackLoginCheck.bind(this));
        }
        else if (baseurl === undefined || baseurl === []) {
            baseurl = this.props.baseurl;
            loggedIn = this.props.isloggedin;
            if(loggedIn !== undefined && loggedIn === true){

                let siteName = this.props.sitename;
                LocalSettings.setStorageItem("config.baseurl",baseurl);
                LocalSettings.setStorageItem("config.username", this.props.username);
                LocalSettings.setStorageItem("config.sitename", siteName);
                LocalSettings.setStorageItem("config.selectedSiteID", this.props.selectedSiteId);
                LocalSettings.setStorageItem("config.accessToken."+siteName, this.props.accessToken);
                LocalSettings.setStorageItem("config.refreshToken." + siteName, this.props.refreshToken);
                LocalSettings.setStorageItem("config.loggedin", loggedIn);


                ensureAccessTokenIsValid(this.callBackLoginCheck.bind(this));
            }
            else if(baseurl === undefined){
                    Actions.Login({
                isBaseURLAvailable: false
            });
            }
            else{
                LocalSettings.setStorageItem("config.baseurl",baseurl);
                Actions.Login();

            }
            
        }

        else if (loggedIn === false || loggedIn === undefined) {
            Actions.Login();
        } else
            ensureAccessTokenIsValid(this.callBackLoginCheck.bind(this));
    }
     callBackAfterStorageInit(){
        // muobj.setupText();
        console.log('====================================');
        console.log("After ASToregareeeeee");
        console.log('====================================');
       this.checkForLogin(); 
  }

  callBackLoginCheck(accessToken){
    console.log('====================================');
    console.log(accessToken);
    console.log('====================================');
        this.setState({isLogging:false})
          muobj.setupText();
        
  }
  
  render() {
    return (
      <View style={styles.container}>
      {this.state.isLogging === true
        ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                    height: height(30), width: width(50), paddingVertical: height(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    }}>
                    <ActivityIndicator />
                    <Text>
                     <LiMultiTerm textId="99028980" textVal="Logging in..." />
                      </Text>
                    </View>
            </View> 
       
        :
      <LiSearchBar/>
    }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
