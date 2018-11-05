/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Picker,
  ScrollView, 
  ActivityIndicator
} from 'react-native';

import * as Action from './liaction/index';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { SearchBar } from 'react-native-elements'
import { width, height, totalSize } from 'react-native-dimension';

import OpenApiClient_editor from './openapi/openapiclient_editor';
import { OpenApiBody } from './openapi/openapibody';
import { MimeTypes } from './openapi/openapibody';

import LiCustomerDetails from './licustomerdetails'
import LiOrderDetails from './liorderdetails'
import LiProductionSummaryCharts from './liproductionsummarycharts'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import LiOrderIntent from './liorderintent';
import {AuthUtil,ensureAccessTokenIsValid} from './lilayoutauthentication/authutil'
import * as commonFunction from './lib/responseFunction';
import * as LocalSettings from './lib/localsettings';
import LiMultiTerm from './lib/limultiterm';
const muobj = new LiMultiTerm("", "");



import { Actions, ActionConst } from 'react-native-router-flux';

// var obj = new OpenApiClient_editor('http://swpdmsrv4.lisec.internal:18714', 'DEMO', 'PROD');

class LiSearchBar extends Component {
  constructor(props){
    super(props);
    this.state={
      item:'',
      headerInfo:'',
      customerInfo:'',
      itemDetails:'',
      orderNo: '',
      isLogging: true
    }
  }
    checkForLogin = async () => {
      let baseurl = null;
      baseurl = LocalSettings.getStorageItem("config.baseurl");
      let loggedIn = null;
      loggedIn =  LocalSettings.getStorageItem("config.loggedin");
      if (baseurl === undefined || baseurl === [] || baseurl === null) {
        Actions.Login({
          isBaseURLAvailable: false
        });
      }
      else if(loggedIn === false || loggedIn === undefined || loggedIn === null){
        Actions.Login();
      }
      else
        ensureAccessTokenIsValid(this.callBackLoginCheck.bind(this));
    }
    callBackLoginCheck(){
      this.setState({isLogging:false});
      muobj.setupText();
    }
  componentDidMount(){
      LocalSettings.initializeLocalSettings(this.callBackAfterStorageInit.bind(this));
  }
  callBackAfterStorageInit() {
    this.checkForLogin();
  }
  loadItemNos() {
    if(this.state.itemArray === []) return <View/>
    return this.state.itemArray.map((value,index) => {
      <Picker.Item label={value.val} value={value.index} />
    });
  }
   componentWillUnmount() {
     muobj.setupText();
   }
   componentDidUpdate() {
     muobj.setupText();
   }
   getPlaceHolder(){

     return(
       "Enter Order No."
      //  <Text>
      //    <LiMultiTerm textId="99019225" textVal="Enter Order No." />
      //  </Text>
     );
   }

  render() {

    var string = <LiMultiTerm textId="99001948" textVal="Technical"/>;
    
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
        <View  style={{flex:1}}>

        <View  style={{width:"100%",height:height(10)}}>
          <ScrollView scrollEnabled={false}>
            <TextInput
              style={{margin:3,width:"100%",height:height(10),fontSize:24,alignItems: 'center',textAlign:'center', justifyContent: 'center',fontWeight: 'bold',fontFamily: 'roboto'}}
              underlineColorAndroid={'#881b4c'}
              onSubmitEditing={(event) => this.onOrderEntered( event.nativeEvent.text)}
              keyboardType= {'numeric'}
              maxLength={10}
              placeholder="Enter Order No."
            >
            {/* <Text style={{width:"100%",color:"#989c9e"}}>
            <LiMultiTerm textId="99019225" textVal="Enter Order No." />
            </Text> */}
            </TextInput>
            <KeyboardSpacer/>
          </ScrollView>
        </View>
        <View style={{height:height(24),width:"100%"}}>
          <LiProductionSummaryCharts
            orderNo = {this.state.orderNo}
          />
        </View>
        <View  style={{height:height(56),padding:2}}>
          <LiOrderDetails
            headerInfo={this.state.customerInfo}
            itemDetails = {this.state.itemDetails}
            orderNo = {this.state.orderNo}
          />
        </View>
       </View>
      }
      </View>

    );
  }

  //  getSiteName = async () => {
  //    return await commonFunction.getStorageItem("config.sitename");
  //  }
   getOrderItem =  (text) => {
      let siteName = LocalSettings.getStorageItem("config.sitename");
      OpenApiClient_editor.getClient(siteName).GET_orders_category_order(this.callbackWithArg.bind(this), 0, text);
   }
     callbackWithArg(responseData){
       
    if(responseData !== null && responseData.state.response.data !== undefined){
      var binary = '';
      var responseDataJson = commonFunction.convertToUint(responseData.state.response.data);
      
      console.log('====================================');
      console.log("###############",responseDataJson);
      console.log('====================================');
      // this.props.setItem(responseDataJson);
      var itemDetails = responseDataJson;
      var custInfo = itemDetails.header;
      // var itemdDetails = itemDetails;
      // this.setStateData(responseDataJson);
      
      
      if(custInfo !== undefined && itemDetails !== undefined && itemDetails !== undefined){
        console.log("#####################", itemDetails.ordNo);
        // this.setData(itemDetails);
        this.setState({
          customerInfo:custInfo,
          itemDetails:itemDetails,
          orderNo:itemDetails.ordNo,
          isDataLoading:false
        });
      }
    }
  }
//  setStateData(itemDetails){
//   console.log('====================================');
//   console.log(itemDetails);
//   console.log('====================================');
//    var custInfo = itemDetails.header;
//             this.setState({
//           customerInfo:custInfo,
//           itemDetails:itemDetails,
//           orderNo:itemDetails.ordNo,
//           isDataLoading:false
//         });
//  }
  onOrderEntered(text){
    this.setState({
      isDataLoading:true,
      orderNo:text
    });
    this.getOrderItem(text);
  }
}
function mapStateToProps(state) {
  return {
    obj: state.ItemReady

  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setItem: Action.setItem
  },dispatch)
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(LiSearchBar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
