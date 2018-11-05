import React, { Component } from 'react';
import {  View ,TouchableOpacity , AsyncStorage,TextInput,Picker,StyleSheet,Image,Modal,TouchableHighlight,Alert,CheckBox,Text,Keyboard,ActivityIndicator } from 'react-native'
import { Router, Scene, Actions, ActionConst, Drawer } from 'react-native-router-flux';
import { width, height, totalSize } from 'react-native-dimension';
import * as LocalSettings from '../lib/localsettings';
import * as commonFunction from '../lib/responseFunction';
import { sha3_512 } from 'js-sha3';
import {decode as atob, encode as btoa} from 'base-64'
import {Buffer} from 'buffer'
import axios from 'axios';
import LiMultiTerm from '../lib/limultiterm';
const muobj = new LiMultiTerm("", "");

import OpenApiClient_auth from '../openapi/openapiclient_auth';
import OpenApiClient_usr_mgmt from '../openapi/openapiclient_user_management';
import {getSiteName,decodeToken} from './authutil';
// import { CheckBox,Text,Body } from 'react-native-elements';
import * as MenuConnector from '../nativeconnector/menuconnector'

let siteNameGlobal = null;


export default class Login extends Component {

    constructor(props){
        super(props);
       
        console.log("###########3", LocalSettings.getStorageItem("config.loggedin"), LocalSettings.getStorageItem("config.selectedSiteID"));
        
        this.state = {
                        username: 'lisec',
                        password: 'lisec',
                        selectedSite: LocalSettings.getStorageItem("config.selectedSiteID") === undefined ? 0 : LocalSettings.getStorageItem("config.selectedSiteID"),
                        sites: [],
                        keepsignedin:false,
                        isLoggedIn: LocalSettings.getStorageItem("config.loggedin") === undefined ? false : LocalSettings.getStorageItem("config.loggedin"),
                        isBaseURLAvailable: true,
                       baseurl: 'http://swmesse3.lisec.internal:18700/',
                       avatar: LocalSettings.getStorageItem("config.avatardata") === undefined ? '' : LocalSettings.getStorageItem("config.avatardata"),
                       userfirstname: LocalSettings.getStorageItem("config.usernamedata") === undefined ? '' : LocalSettings.getStorageItem("config.usernamedata").split(" ")[0],
                       userlastname: LocalSettings.getStorageItem("config.usernamedata") === undefined ? '' : LocalSettings.getStorageItem("config.usernamedata").split(" ")[1],
                    }

        this.onBaseURLEnetered = this.onBaseURLEnetered.bind(this);
         
    }
       componentWillUnmount() {
     muobj.setupText();
   }
   componentDidUpdate() {
     muobj.setupText();
   }
  
    componentDidMount(){
        muobj.setupText();
          if (this.props.isBaseURLAvailable === false) {
              this.setState({
                  isBaseURLAvailable: false
              });
          } else{
                var baseURL = LocalSettings.getStorageItem("config.baseurl");
                var loggedin = LocalSettings.getStorageItem("config.loggedin");
                
                if (loggedin !== undefined && loggedin === true) {
                         siteNameGlobal = LocalSettings.getStorageItem("config.sitename");
                        this.setState({baseurl:baseURL,isLoggedIn:loggedin})
                        this.loadUserData();
                }
                else
                     this.setState({baseurl:baseURL})

                this.loadSites();

          }
    }
    loadUserData() {
        
        let accessToken = LocalSettings.getStorageItem("config.accessToken." + siteNameGlobal);
        let parts = accessToken.split(".");
        var decodedPayload = JSON.parse(atob(parts[1]));
        OpenApiClient_usr_mgmt.getClient(siteNameGlobal).GET_users_userId(this.callbackLoadUserData.bind(this), decodedPayload.user);
    }

    callbackLoadUserData(responseData) {
        if (responseData.state.response !== undefined /*&& responseData.state.response.response !== undefined*/ ) {
       
            var jsonData = commonFunction.convertToUint(responseData.state.response.data);
            if (jsonData !== undefined && Object.keys(jsonData).length !== 0) {
                LocalSettings.setStorageItem("config.usernamedata", jsonData.userData.firstNameField + " " + jsonData.userData.lastNameField);
                LocalSettings.setStorageItem("config.avatardata", (jsonData.avatar !== undefined ? 'data:image/gif;base64,' + jsonData.avatar.data : ''));
            }
             var final = 'data:image/gif;base64,' + jsonData.avatar.data;
                if (jsonData.avatar.data !== '')
                        this.setState({avatar:final,userfirstname:jsonData.userData.firstNameField,userlastname:jsonData.userData.lastNameField});

            // history.push(basename + "liorderstatus");
            // history.go(0);

            this.loadNewsFeedTime();
        } else {
            console.log("RESPONSE : " + responseData.state.response);
        }
    }


    loadSites() {
        OpenApiClient_auth.getClient("default").GET_sites(this.callbackLoadSites.bind(this));
    }

    loadNewsFeedTime() {
        axios.get("https://business-portal.lisec.com/newsfeed/newsfeednewcount.php")
        .then(function (response) {
            console.log(response);

            let newFeedCounter = 0;

            if(response.data !== undefined){
                response.data.map((eachObj, index) => {
                    let userLastVisitTime = LocalSettings.getStorageItem('newsfeed.lastaccesstime');
                    if(parseInt(eachObj.publishedTimeStamp) > userLastVisitTime)
                    {
                        newFeedCounter++;                        
                    }                    
                })
            } 
            if(newFeedCounter > 0){
                       LocalSettings.setStorageItem('newsfeed.newcount', newFeedCounter);
                       MenuConnector.setBadgeNewsFeed(newFeedCounter);
            }
            // Actions.HomeScreen({isLogging:false});

            // history.push(basename + "liorderstatus");
            // history.go(0);

        })
        .catch(function (error) {
            console.error(error, "Error in loading news feed data");
        })
    }


    callbackLoadSites(responseData) {
      
        if (responseData.state.response !== undefined) {
            if (responseData.state.response.status === 200) {
                var result = commonFunction.convertToUint(responseData.state.response.data)
               if(this.state.selectedSite !== 0){
                            
                this.setState({sites: result.sites,selectedSite:this.state.selectedSite})
                }
                else{
                   
                this.setState({sites: result.sites,selectedSite:result.sites[0].name})  
                }
            }
            else {
                console.log("Error in load sites");
            }
        }
        else {
            console.log("RESPONSE : " + responseData.state.response);
        }
    }

    generateSitesList(siteList) {
        return (
                <Picker 
                selectedValue={this.state.selectedSite}
                onValueChange={(site,index) => this.handleComboChange(site,index)}
                >
                {
                    siteList.map((siteDetails, siteIndex) => (
                            <Picker.Item key={siteIndex} label = {siteDetails.name} value = {siteDetails.name}/>
                    ))}
                </Picker>
            )
    }

    handleComboChange(site,index) {
        // console.log("COMBO VALUE", event.target.value)
        this.setState({selectedSite: site });     
        
        LocalSettings.setStorageItem("config.selectedSiteID", site);
    }

    doLogin = async () => {
        Keyboard.dismiss();
        let username = this.state.username;
        let password = this.state.password;
        let siteName = this.state.selectedSite; // initial set

        LocalSettings.setStorageItem("config.username", username);
        LocalSettings.setStorageItem("config.sitename", siteName);

        siteNameGlobal = LocalSettings.getStorageItem("config.sitename");

        var arrayBuffer = sha3_512.arrayBuffer(password);
        var base64StringPassword = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))) 
        // var base64StringPassword = Buffer.from(arrayBuffer).toString('base64');

        // console.log(username + "<<<<<<<>>>>>>>" + btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))));

        OpenApiClient_auth.getClient(siteName).POST_tokens(this.callbackDoLogin.bind(this), username, base64StringPassword, null, null);
                // let siteName = await LocalSettings.getStorageItem("config.sitename");
          
        // OpenApiClient_auth.getClient(siteName).POST_tokens(this.callbackDoLogin.bind(this), null, null, username, base64StringPassword);
    }

    doLogout = async () =>{
                Keyboard.dismiss();
                this.setState({isLoggedIn:false,avatar:''})
                LocalSettings.removeStorageItem("config.avatardata");
                  let siteName = LocalSettings.getStorageItem("config.sitename");
                  let refreshToken =  LocalSettings.getStorageItem("config.refreshToken." + siteName);
                 console.log("Logging Outttttttttttt", refreshToken,siteName);
                  OpenApiClient_auth.getClient(siteName).DELETE_tokens(this.callbackDoLogout.bind(this), refreshToken);
    }
    callbackDoLogout = async (responseData) => {
        console.log(responseData);
        
        if (responseData.state.response !== undefined) {
            if (responseData.state.response.status === 200) {
                    console.log('Logout success=================');
                    let siteName = LocalSettings.getStorageItem("config.sitename");
                    LocalSettings.removeStorageItem("core.refreshToken." + siteName);
                    LocalSettings.removeStorageItem("config.accessToken." + siteName);
                    LocalSettings.removeStorageItem("config.avatardata" + siteName);
                    LocalSettings.removeStorageItem("config.usernamedata" + siteName);
                    

                    LocalSettings.setStorageItem("config.loggedin",false);
                    // this.setState({isLoggedIn:false,avatar:''})
                    // Actions.HomeScreen();
            }
        }
    }

    callbackDoLogin = async  (responseData) => {
        if (responseData.state.response !== undefined) {
            if (responseData.state.response.status === 200) {
                var result = commonFunction.convertToUint(responseData.state.response.data)
                
                let siteName = LocalSettings.getStorageItem("config.sitename");
                console.log(siteName, 'Login success=================');

                
                LocalSettings.setStorageItem("config.refreshToken." + siteName, result.refreshToken);
                LocalSettings.setStorageItem("config.accessToken." + siteName, result.accessToken);
                LocalSettings.setStorageItem("config.loggedin", true);
                
                this.setState({isLoggedIn:true,userfirstname:'',userlastname:''})
                this.loadUserData();
                // Actions.LiHomeScreen({isLogging:false});
                // history.push("/webapp1/orderStatus");
                // history.go();
            }
            else {
                console.log("Error in login");
            }
        }
        else {
            console.log("RESPONSE : " + responseData.state.response);
        }
    }


    verifyAccessToken() {
        let siteName = getSiteName();
        let accessToken = AsyncStorage.getItem("config.accessToken." + siteName);

        return OpenApiClient_auth.getClient(siteName).GET_tokens(this.callbackVerifyAccessToken.bind(this), null, accessToken);
    }

    callbackVerifyAccessToken(responseData) {
        //return new Promise(function (resolve, reject) {
            if (responseData.state.response !== undefined) {
                if (responseData.state.response.status === 200) {
                    var result = LocalSettings.convertToJSON(responseData.state.response.data)
                    console.log('recieved result.........');
                }
                else if (responseData.state.response.response.status === 406) {
                    console.log(responseData.state.response.response.statusText + " :: Token expired");
                }
                else {
                    console.log("Error in verification");
                }
            }
            else {
                console.log("RESPONSE : " + responseData.state.response);
            }
        //})
    }
    callBackTest(responseData) {
        
        if (responseData.state.response !== undefined && responseData.state.response.status !== undefined) {
            if (responseData.state.response.status === 200) {
                this.loadSites();
                this.setState({isBaseURLAvailable:true});
            }
        }
        else{
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$",responseData);
            // MenuConnector.showToast("Error in URL....")
            
        }
    }
    onBaseURLEnetered =  () => {
        LocalSettings.setStorageItem("config.baseurl", this.state.baseurl);
        OpenApiClient_auth.getClient("default").GET_sites(this.callBackTest.bind(this));
    }
    onClearBaseURLEntered = () => {
        this.doLogout();
        this.setState({isBaseURLAvailable:false});
    }

     onClearBaseURLEntered = () => {
        this.doLogout();
        this.setState({isLoggedIn:"false"});
        LocalSettings.setStorageItem("config.baseurl", this.state.baseurl);
        OpenApiClient_auth.getClient("default").GET_sites(this.callBackTest.bind(this));
    }


    render() {
        console.log('====================================');
        console.log(this.state.selectedSite);
        console.log('====================================');
        return (
               <View style={styles.container}>
               {this.state.isBaseURLAvailable === false
                ?
                 <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    hardwareAccelerated={true}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={
                        {
                            marginHorizontal: width(12), marginVertical: height(40),
                            height: height(20), width: width(75),  borderColor: '#881b4c', borderWidth: 1.5,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            flexDirection: 'column'
                        }}>
                        <Text style={{ color: '#881b4c', fontSize: 16, marginTop: 10 }} textAlign> Enter the Base URL </Text>

                        <TextInput
                            style={{ width: width(55) }}
                            placeholder="Base URL..."
                            value={this.state.baseurl}
                            onChangeText={(text) => this.setState({ baseurl: text })}
                        />
                        <TouchableOpacity
                             onPress={() => this.onBaseURLEnetered()}>
                            <Text style={{ color: '#881b4c', fontSize: 20, marginTop: 10 }}> OK </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                :
                 <View style={{ width: width(100), height: height(98), alignItems: 'center' }}>
                    <View style={{ width: width(95),height:height(8),flexDirection:'row'}}>
                     <TextInput
                        style={{ width: width(85), height: height(8), fontWeight: 'bold', fontFamily: 'Cochin' }}
                        placeholder="Enter Base URL...."
                        value={this.state.baseurl}
                         onChangeText={(text) => this.setState({ baseurl: text })}
                        onSubmitEditing={(event) => this.onClearBaseURLEntered()}
                    />
                     <TouchableOpacity
                             onPress={() => this.onClearBaseURLEntered()}>
                           
                             <Image style={styles.ImageIconStyle3} source={{ uri: 'src_image_clear' }} />
                            
                   
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: width(95), height: height(45), alignItems: 'center', }}>
                    {this.state.isLoggedIn === true
                    ?
                        <View style={{alignContent:'center'}}>
                            {this.state.avatar !== ''
                            ?
                             <Image style={styles.ImageIconStyle2}
                                source={{uri:this.state.avatar}} resizeMode='contain'/>
                            :
                            <ActivityIndicator style={{width: width(95), height: height(18), alignItems: 'center',justifyContent:'center' }}/>
                            }
                            
                                <Text
                                style={styles.GridViewInsideTextItemStyle}
                                 >
                                   {this.state.userfirstname} {this.state.userlastname}
                                 </Text>
                        </View>
                    
                    :
                        <View style={{alignContent:'center'}}>
                            <View>
                            <Image style={styles.ImageIconStyle4} source={{ uri: 'src_image_user' }}/> 
                            </View>
                            <TextInput
                            style={{ width: width(90), height: height(8), fontSize: 17, fontWeight: 'bold', fontFamily: 'Cochin' }}
                            placeholder="Enter your Username"
                            onChangeText={(text) => this.setState({ username: text})}
                            value={this.state.username}
                            underlineColorAndroid='#881b4c'
                            />
                            <TextInput
                            style={{ width: width(90), height: height(8), fontSize: 17, fontWeight: 'bold', fontFamily: 'Cochin' }}
                            placeholder="Enter your Password"
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                            underlineColorAndroid='#881b4c'
                            />
                        </View>
                    }
                    </View>
                    
                   
                    <View style={{width:width(95)}}>
                        <Text style={styles.loadText} textAlign='flex-start'> <LiMultiTerm textId="99001698" textVal="Site" /></Text>
                    </View>
                    <View style={{alignItems:"center",justifyContent:"center"}}>
                        <View style={{ width: width(98), height: height(7), borderWidth: 1.5, borderColor: '#881b4c', borderRadius: 15}}>
                            {this.state.sites !== null
                            ?
                            this.generateSitesList(this.state.sites)
                            : <View/>
                            }
                        </View>
                    </View>
                    <View style={{ alignItems: "center", marginTop: height(5) }}>
                        {this.state.isLoggedIn === true
                            ?
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.doLogout()}>
                                <Text style={styles.textContainer}>
                                <LiMultiTerm textId="99023849" textVal="Logout" /></Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.doLogin()}>
                                <Text style={styles.textContainer}> <LiMultiTerm textId="99023848" textVal="Login" /> </Text>
                            </TouchableOpacity>
                        }
                        <View style={{ flexDirection: 'row', height: height(8), alignItems: 'center' }}>
                            <CheckBox checked={this.state.keepsignedin} containerStyle={{ backgroundColor: 'whitesmoke' }}
                                onValueChange={() => this.setState({ keepsignedin: !this.state.keepsignedin })} />
                            <Text> 
                                <LiMultiTerm textId="99028981" textVal="Keep Me Signed In" />
                            </Text>
                        </View>
                    </View>
                </View>
                }
               

               
            </View>
        )
    }
}
const styles = StyleSheet.create({
                container: {
                flex: 1,
                },
                 loadText: {
                fontSize: 20,
                // marginTop: height(8),
                justifyContent:'flex-start',
                fontFamily: 'Cochin',
                alignItems: 'flex-start',
                color: '#881b4c'
                },
                buttonContainer:{
                backgroundColor: '#a0185c',
                borderRadius: 25,
                width:300,
                height:height(8),
                justifyContent: 'center',
                alignItems: 'center',
                },
                buttonURLContainer:{
                backgroundColor: '#a0185c',
                paddingVertical:15,
                borderRadius: 25,
                width:width(15),
                height:height(5),
                margin:5,
                justifyContent: 'flex-end',
                alignItems: 'center',
                },
                textContainer:{
                fontSize: 24,
                color: '#FFF',
                textAlign: 'center',
                fontWeight: 'bold',
                },
                 ImageIconStyle2: {
                height: height(18),
                width: width(98),
                marginTop: height(5),
                resizeMode : 'contain',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50
            },
             ImageIconStyle3: {
                 height: height(8),
                 width: width(12),
                 resizeMode: 'contain',
                 justifyContent: 'center',
                 alignItems: 'center'
             },
             ImageIconStyle4: {
                 height: height(18),
                 width: width(98),
                     marginTop: height(5),
                 resizeMode: 'contain',
                 justifyContent: 'center',
                 alignItems: 'center'
             },
                 GridViewInsideTextItemStyle: {
      paddingTop: 1,
      paddingBottom: 1,
      fontSize: 20,
      textShadowOffset:{wdith:2.5,height:2},
      fontWeight: '200',
      textShadowColor:'lightgrey',
      justifyContent: 'center',
      marginLeft:3,
      textAlign:'center'
    },
        });