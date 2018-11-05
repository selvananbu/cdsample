import React, { Component } from 'react';
import {  View ,TouchableOpacity , AsyncStorage,TextInput,Picker,StyleSheet,Image,Modal,TouchableHighlight,Alert } from 'react-native'
import { Router, Scene, Actions, ActionConst, Drawer } from 'react-native-router-flux';
import { width, height, totalSize } from 'react-native-dimension';
import * as LocalSettings from '../lib/localsettings';
import * as commonFunction from '../lib/responseFunction';
import { sha3_512 } from 'js-sha3';
import {decode as atob, encode as btoa} from 'base-64'
import {Buffer} from 'buffer'

import OpenApiClient_auth from '../openapi/openapiclient_auth';
import {getSiteName} from './authutil';
import { CheckBox,Text,Body } from 'react-native-elements';
import * as MenuConnector from '../nativeconnector/menuconnector'


export default class Login extends Component {

    constructor(props){
        super(props);
       
        console.log("###########3",LocalSettings.getStorageItem("config.loggedin"));
        
        this.state = {
                        username: 'test',
                        password: 'test',
                        selectedSite: LocalSettings.getStorageItem("config.selectedSiteID") === undefined ? 0 : LocalSettings.getStorageItem("config.selectedSiteID"),
                        sites: [],
                        keepsignedin:false,
                        isLoggedIn: LocalSettings.getStorageItem("config.loggedin") === undefined ? false : LocalSettings.getStorageItem("config.loggedin"),
                        isBaseURLAvailable: true,
                       baseurl: ''
                    }

        this.onBaseURLEnetered = this.onBaseURLEnetered.bind(this);
         
    }
  
    componentDidMount(){
          
          if (this.props.isBaseURLAvailable === false) {
              console.log("############# In Mounttttttttttttttttttt");
              this.setState({
                  isBaseURLAvailable: false
              });
          } else{
                var baseURL = LocalSettings.getStorageItem("config.baseurl");
                var user = LocalSettings.getStorageItem("config.loggedin");
                if(user !== []){

                        this.setState({baseurl:baseURL,isLoggedIn:user})
                }
                else
                     this.setState({baseurl:baseURL})
                this.loadSites();

          }
    }

    loadSites() {
        OpenApiClient_auth.getClient("dummy").GET_sites(this.callbackLoadSites.bind(this));
    }

    callbackLoadSites(responseData) {
        console.log('====================================');
        console.log(responseData.state.response);
        console.log('====================================');
        if (responseData.state.response !== undefined) {
            if (responseData.state.response.status === 200) {
                var result = commonFunction.convertToUint(responseData.state.response.data)
                this.setState({sites: result.sites})
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

            console.log("Came ehereeeeeeeeeeeeee",siteList,this.state.selectedSite);
            
            
        return (
                <Picker 
                selectedValue={this.state.selectedSite}
                onValueChange={(site,index) => this.handleComboChange(site,index)}
                >
                {
                    siteList.map((siteDetails, siteIndex) => (
                            <Picker.Item key={siteIndex} label = {siteDetails.name} value = {siteDetails.name}/>
                    ))}
                 
                    {/* {
                        siteList.map((siteDetails, siteIndex) => {
                            <Picker.Item value={siteDetails.type} key={siteIndex}  label = {siteDetails.name}/>
                            console.log('====================================');
                            console.log(siteDetails);
                            console.log('====================================');
                        })
                    } */}
                </Picker>
            )
    }

    handleComboChange(site,index) {
        // console.log("COMBO VALUE", event.target.value)
        this.setState({selectedSite: site });     
        
        LocalSettings.setStorageItem("config.selectedSiteID", site);
    }

    doLogin = async () => {
        let username = this.state.username;
        let password = this.state.password;
        let siteName = this.state.selectedSite; // initial set

        LocalSettings.setStorageItem("config.username", username);
        LocalSettings.setStorageItem("config.sitename", siteName);

        var arrayBuffer = sha3_512.arrayBuffer(password);
        var base64StringPassword = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))) 
        // var base64StringPassword = Buffer.from(arrayBuffer).toString('base64');

        // console.log(username + "<<<<<<<>>>>>>>" + btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))));

        OpenApiClient_auth.getClient(siteName).POST_tokens(this.callbackDoLogin.bind(this), username, base64StringPassword, null, null);
                // let siteName = await LocalSettings.getStorageItem("config.sitename");
          
        // OpenApiClient_auth.getClient(siteName).POST_tokens(this.callbackDoLogin.bind(this), null, null, username, base64StringPassword);
    }

    doLogout = async () =>{
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
                    LocalSettings.removeStorageItem("core.refreshToken." + siteName)
                    LocalSettings.removeStorageItem("config.accessToken." + siteName);
                    LocalSettings.setStorageItem("config.loggedin",false);
                    this.setState({isLoggedIn:false})
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
                
                this.setState({isLoggedIn:true})
                Actions.HomeScreen();
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
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            MenuConnector.showToast("Error in URL....")
            
        }
    }
    onBaseURLEnetered =  () => {
        LocalSettings.setStorageItem("config.baseurl", this.state.baseurl);
        OpenApiClient_auth.getClient("dummy").GET_sites(this.callBackTest.bind(this));
    }
    onClearBaseURLEntered = () => {
        this.doLogout();
        this.setState({isBaseURLAvailable:false});
    }


    render() {
        console.log("$$$$$$$$$$$$$$$$$4", this.state.isBaseURLAvailable);
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
                 <View style={{ width: width(95), height: height(98), alignItems: 'center' }}>
                    <View style={{ width: width(95),height:height(8),flexDirection:'row',paddingLeft:height(2)}}>
                     <TextInput
                        style={{ width: width(85), height: height(8), fontWeight: 'bold', fontFamily: 'Cochin' }}
                        placeholder="Enter Base URL...."
                        value={this.state.baseurl}
                    />
                     <TouchableOpacity
                             onPress={() => this.onClearBaseURLEntered()}>
                    <Image style={styles.ImageIconStyle3} source={{ uri: 'src_image_clear' }} />
                        </TouchableOpacity>
                    </View>
                    {this.state.isLoggedIn === true
                            ?
                    <View style={{ width: width(85), height: height(22), alignItems: 'center' }}>
                        <Image style={styles.ImageIconStyle2} source={{ uri: 'src_image_user' }} />
                    </View>
                    :
                    <View/>
                    }
                    <TextInput
                        style={{ width: width(85), height: height(8), fontSize: 17, fontWeight: 'bold', fontFamily: 'Cochin' }}
                        placeholder="Enter your Username"
                        onChange={event => this.setState({ username: event.target.value })}
                        value={this.state.username}
                        underlineColorAndroid='#881b4c'
                    />
                    <TextInput
                        style={{ width: width(85), height: height(8), fontSize: 17, fontWeight: 'bold', fontFamily: 'Cochin' }}
                        placeholder="Enter your Password"
                        secureTextEntry={true}
                        onChange={event => this.setState({ password: event.target.value })}
                        value={this.state.password}
                        underlineColorAndroid='#881b4c'
                    />
                    <View style={{width:width(95),paddingLeft:height(2)}}>
                        <Text style={styles.loadText} textAlign='flex-start'> Site</Text>
                    </View>
                    <View style={{ width: width(85), height: height(7), margin: 3, borderWidth: 1.5, borderColor: '#881b4c', borderRadius: 15 }}>
                        {this.state.sites !== null
                            ?
                            this.generateSitesList(this.state.sites)
                            : <View />
                        }
                    </View>
                    <View style={{ alignItems: "center", marginTop: height(5) }}>
                        {this.state.isLoggedIn === true
                            ?
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.doLogout()}>
                                <Text style={styles.textContainer}>Logout</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.doLogin()}>
                                <Text style={styles.textContainer}> Login </Text>
                            </TouchableOpacity>
                        }
                        <View style={{ flexDirection: 'row', height: height(8), alignItems: 'center' }}>
                            <CheckBox checked={this.state.keepsignedin} title=' Keep Me Signed In' containerStyle={{ backgroundColor: 'whitesmoke' }}
                                onPress={() => this.setState({ keepsignedin: !this.state.keepsignedin })} />
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
                marginTop: height(8),
                justifyContent:'flex-start',
                fontFamily: 'Cochin',
                alignItems: 'flex-start',
                color: '#881b4c'
                },
                buttonContainer:{
                backgroundColor: '#a0185c',
                paddingVertical:15,
                borderRadius: 25,
                width:300,
                height:height(8),
                margin:5,
                justifyContent: 'flex-end',
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
                height: height(16),
                width: width(98),
                marginTop: height(7),
                resizeMode : 'contain',
                justifyContent: 'center',
                alignItems: 'center'
            },
             ImageIconStyle3: {
                 height: height(8),
                 width: width(12),
                 resizeMode: 'contain',
                 justifyContent: 'center',
                 alignItems: 'center'
             },
        });