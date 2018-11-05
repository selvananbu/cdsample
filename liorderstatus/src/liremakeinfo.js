/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Timeline from 'react-native-timeline-listview'
import OpenApiClient_status from './openapi/openapiclient_status';
import { OpenApiBody } from './openapi/openapibody';
import { MimeTypes } from './openapi/openapibody';
import OpenApiClient_prod_feedback from './openapi/openapiclient_prod_feedback';

import * as Progress from 'react-native-progress';


import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Action from './liaction/index';
import * as commonFunction from './lib/responseFunction';
import * as LocalSettings from './lib/localsettings';
import * as MenuConnector from './nativeconnector/menuconnector';
import LiMultiTerm from './lib/limultiterm';
const muobj = new LiMultiTerm("", "");


var obj = new OpenApiClient_status('http://swpdmsrv4.lisec.internal:18711', 'DEMO', 'PROD');
var obj_prod_feedback = new OpenApiClient_prod_feedback('http://swpdmsrv4.lisec.internal:18720', 'DEMO', 'PROD');

class LiRemakeInfo extends Component {
  constructor(props){
    super(props)
    this.state ={
      chartData: [],
      isDataAvailable: false,
      isNoDataAvail: false
    }
  }

   componentWillUnmount() {
     muobj.setupText();
   }
   componentDidUpdate() {
     muobj.setupText();
   }


  componentDidMount(){
    let siteName = LocalSettings.getStorageItem("config.sitename");
    if(this.props.orderNo !== undefined && this.props.orderNo !== '' && this.state.chartData !== []){
  
      // console.log("&&***************************",this.state.chartData);
      
  
      if (Object.keys(this.props.obj.reasonlist).length === 0){
          OpenApiClient_prod_feedback.getClient(siteName).GET_reason_codes(this.callbackWithArgForReasonList.bind(this), null, '405');
      }
  
      else if(this.props.orderNo !== undefined && this.props.orderNo !== ''){
        OpenApiClient_status.getClient(siteName).GET_orders_category_order_remakes(this.callbackWithArg.bind(this), 0, this.props.orderNo, this.props.itemNo);
      }
    }
    else{
      console.log('NO DATA FOUND')
  
    }
    muobj.setupText();
  
  }

  getDescriptionName(stepNo)
  {
    var stepName = '';
    // console.log("STEP",stepNo);
    if (Object.keys(this.props.obj.machinelist).length !== 0){
      var list;
      list = this.props.obj.machinelist.MACHINELIST.mach;
      for(var i = 0;i< list.length;i++){
        var value =  list[i];
        if(value.no === stepNo){
          stepName = value.name;
          break;
        }
      }
    }
    if(stepName === '')
    stepName = 'No Data';
    return stepName;
  }
  getReasonName(reasonId)
  {
    var reasonName = '';
    console.log("STEP",reasonId);
    if (Object.keys(this.props.obj.reasonlist).length !== 0){
      var list;
      list = this.props.obj.reasonlist.REASONLIST.reason;
      for(var i = 0;i< list.length;i++){
        var value =  list[i];
        if(value.code === reasonId){
          reasonName = value.desc;
          break;
        }
      }
    }
    if(reasonName === '')
    reasonName = 'No Reason Found';
    return reasonName;
  }
  callbackWithArg = (responseData) => {
    var timeDetails = [];
    var resultTime = [];
    if(responseData !== null && responseData.state.response.status == 200 && this.state.resultTime !== [])
    {
      // var binary = '';
      // var result = responseData.state.response.data;
      // var bytes = new Uint8Array(result);
      // var len = bytes.byteLength;
      // for (var i = 0; i < len; i++) {
      //   binary += String.fromCharCode( bytes[ i ] );
      // }

      var responseDataJson = commonFunction.convertToUint(responseData.state.response.data);
      remakes = responseDataJson.remake;
      // console.log("RESPONSEEEEEEEEEEEEEEE",remakes);
      // for(var index = 0 ;index <= remakes.length;index++)
      // {
      //   // console.log("INNNNNNNNNNNNN",remakes[i].machNo);
      //   this.getDescriptionName(remakes[index].machNo);
      // }


      {remakes.map((value,index) => {
        // console.log(this.getDescriptionName(value.machNo));
        // if(value.time !== undefined)
        {
          resultTime.push({
            'time': value.date + "\n\n" + value.time,
            'title': this.getReasonName(value.reasonNo) ,
            'description': "Item: " + value.itemNo + "  (" + value.pane.toString()  + "/" + value.comp.toString() +")" +"\t@\t"+this.getDescriptionName(value.machNo)
          }
        )
      }
    });
  }
}
else if (responseData.state.response.status == 204){
        this.setState({isNoDataAvail:true});
}
  // MenuConnector.showToast("No Data Found for this Order No")
else {
    
        this.setState({isNoDataAvail:true});
}
  // MenuConnector.showToast("Data Not Found!")

if(resultTime!== undefined && resultTime !== []){
  this.setState({chartData:resultTime,
    isDataAvailable:true});
  }
}
callbackMachineList(responseData){
  if(responseData !== null && responseData.state.response.data !== undefined )
  {
    // var binary = '';
    // var result = responseData.state.response.data;
    // var bytes = new Uint8Array(result);
    // var len = bytes.byteLength;
    // for (var i = 0; i < len; i++) {
    //   binary += String.fromCharCode( bytes[ i ] );
    // }

    var machineList = commonFunction.convertToUint(responseData.state.response.data);
    let siteName = LocalSettings.getStorageItem("config.sitename");
    this.props.setMachineList(machineList);
    // console.log(this.props.orderNo, this.props.itemNo,'beforeGET_orders_category_order_remakesss')
    OpenApiClient_status.getClient(siteName).GET_orders_category_order_remakes(this.callbackWithArg.bind(this), 0, this.props.orderNo, this.props.itemNo);
  }
}
callbackWithArgForReasonList(responseData){
  if(responseData !== null && responseData.state.response.data !== undefined )
  {

    var reasonList = commonFunction.convertToUint(responseData.state.response.data);
    let siteName = LocalSettings.getStorageItem("config.sitename");
    this.props.setReasonList(reasonList);
    OpenApiClient_status.getClient(siteName).GET_machines(this.callbackMachineList.bind(this));
  }
}


render() {

  if(this.state.isDataAvailable){
    return (
      <View style={styles.container}>
        <TouchableOpacity style = {styles.header}>	
          <Text style = {styles.headerText}>
             <LiMultiTerm textId="99009868" textVal="Remake Info"/> - {this.props.orderNo}
          </Text>
        </TouchableOpacity>
        <View style={{width:"100%",height:"80%",margin:3,padding:3}}>
        {this.state.isNoDataAvail === false
        ?
         <Timeline
            circleSize={20}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, marginTop: -5}}
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray'}}
            options={{
              style:{paddingTop:5}
            }}
            data={this.state.chartData}
            onEventPress={(e) => {
              Alert.alert("Item Selected")
            }}
          />
        :
         <View style={{width:'95%',height:'95%',alignItems: 'center',justifyContent: 'center'}}>
                  <Text>
                        <LiMultiTerm textId="08005669 " textVal="No Data available"/> 
                  </Text>
               </View>
        }
         
        </View>

      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        <TouchableOpacity style = {styles.header}>
          <Text style = {styles.headerText}>
            <LiMultiTerm textId="99009868" textVal="Remake Info"/> - {this.props.orderNo}
          </Text>
        </TouchableOpacity>
        <View style={styles.containerPlain}>
          <Progress.Circle showText={true} size={30} indeterminate={true} />
          <Text>
          <LiMultiTerm textId="99028774" textVal="Fetching details from server..."/>
          </Text>
        </View>
      </View>
    );
  }

}
}
function mapStateToProps(state) {
  return {
    obj: state.ItemReady

  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setItem: Action.setItem,
    setWorkstepList: Action.setWorkstepList,
    setMachineList: Action.setMachineList,
    setReasonList:Action.setReasonList
  },dispatch)
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(LiRemakeInfo);

const styles = StyleSheet.create({
  containerPlain: {
    backgroundColor:'#F5FCFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  flatview: {
    justifyContent: 'center',
    padding:2,
    borderRadius: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  items: {
    flexDirection:'row',
    padding:10,
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
  },
  header: {
    backgroundColor: '#595959',
    padding:5,
  },
  ImageIconStyle:{
    alignItems: 'flex-end',
    justifyContent: 'center',
    width:15,
    height:25,
    alignItems: 'stretch',
    resizeMode: 'stretch',
  },
  text: {
    color: '#4f603c',
    fontSize: 20,
    alignItems: 'flex-start',
    width:375,
  },
  headerText: {
    color:'#fff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    paddingBottom:5
  },
  orderno: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  pane: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
});
