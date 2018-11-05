/* @flow */

import React, { Component } from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import MenuExample from './src/nativeconnector/menuconnector';

import { Router, Scene, Actions, ActionConst, Drawer } from 'react-native-router-flux';
import {AuthUtil,ensureAccessTokenIsValid} from './src/lilayoutauthentication/authutil';
// import * as commonFunction from './src/lib/responseFunction';
// import { setCriteriaName } from '.src/liaction';
import LiMultiTerm from './src/lib/limultiterm';
import * as LocalSettings from './src/lib/localsettings';

import { width, height, totalSize } from 'react-native-dimension';
const muobj = new LiMultiTerm("", "");

export default class Welcome extends Component {

   constructor(props){
      super(props);
      this.state ={
          isLogging:true,
      }
  }
 componentDidUpdate() {
      muobj.setupText();
    }

  onPress = () => {
         MenuExample.startConnectionActivity();
    }

    componentDidMount() {
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
     checkForLogin = async () => {
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
       if (baseurl !== undefined && (this.props.baseurl !== baseurl || this.props.username !== LocalSettings.getStorageItem("config.username"))) {
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
                
                let siteName = this.props.sitename;
                baseurl = this.props.baseurl;

                LocalSettings.setStorageItem("config.baseurl", baseurl);
                LocalSettings.setStorageItem("config.baseurl",baseurl);
                LocalSettings.setStorageItem("config.username", this.props.username);
                LocalSettings.setStorageItem("config.sitename", siteName);
                LocalSettings.setStorageItem("config.selectedSiteID", this.props.selectedSiteId);
                LocalSettings.setStorageItem("config.accessToken."+siteName, this.props.accessToken);
                LocalSettings.setStorageItem("config.refreshToken." + siteName, this.props.refreshToken);
                LocalSettings.setStorageItem("config.loggedin", loggedIn);

                console.log('====================================');
                console.log("#$#$$$$$$$$$$$$$$$$$$$",this.props.selectedSiteId);
                console.log('====================================');
                
                  ensureAccessTokenIsValid(this.callBackLoginCheck.bind(this));
                
              }
          }
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
      <ActivityIndicator/>
      :
       
      <View style={styles.container}>
        <Text style={styles.welcome}>
              <LiMultiTerm textId="99001171" textVal="Welcome" /> 
      </Text> 
         <Text style={styles.welcome}>       
              <LiMultiTerm textId="99003526" textVal="Lisec" /> 
          </Text>
        <Text style={styles.welcome}>
              <LiMultiTerm textId="06005908" textVal="Mobile" /> 
          </Text>
         <Text style={styles.welcome}>
              <LiMultiTerm textId="123" textVal="Development" /> !
          </Text>
      <Text style={styles.instructions}>
        To get started, download a bundle using connect button or you can add download bundle from menu.
      </Text>
         <Image style={styles.ImageIconStyle3}  source={{uri:'src_image_bundle_box'}}></Image>
        <TouchableOpacity style = {styles.buttonContainer}  onPress={this.onPress}>
           <Text style={styles.textContainer}>
             <LiMultiTerm textId="99000947" textVal="Download" />
           </Text>
        </TouchableOpacity>
      </View>
      }
      </View>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       padding: 25,
       margin:10
  },

  buttonContainer:{
      backgroundColor: '#a0185c',
      paddingVertical:15,
        width:300,
        height:60,
        justifyContent: 'center',
        alignItems: 'center',
  },
  textContainer:{
            color: '#FFF',
            textAlign: 'center',
            fontWeight: '700',
            padding:10,
   },
    ImageIconStyle3: {
      paddingHorizontal: 1,
      margin: 2,
      height: height(50),
      width: width(50),
      resizeMode: 'contain',

    },
  image:{
    height:100,
    width:100
  },
  titleText: {
   fontSize: 20,
   fontWeight: 'bold',
    fontFamily: 'Cochin',
    paddingBottom:10
 },
 instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 2,
  },
});
