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

import * as Progress from 'react-native-progress';


import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Action from './liaction/index';
import LiMultiTerm from './lib/limultiterm';

import { width, height, totalSize } from 'react-native-dimension';
const muobj = new LiMultiTerm("", "");


var obj = new OpenApiClient_status('http://swpdmsrv4.lisec.internal:18711', 'DEMO', 'PROD');

export default class LiOrderHistory extends Component {
  constructor(props){
    super(props)
    this.state ={
      chartData: [],
      isDataAvailable: false
    }
  }
      componentDidMount() {
        muobj.setupText();
      }
      componentWillUnmount() {
        muobj.setupText();
      }
      componentDidUpdate() {
        muobj.setupText();
      }
  callbackWithArg(responseData){
    var timeDetails = [];
    var resultTime = [];
    if(responseData !== null && responseData.state.response.data !== undefined && this.state.resultTime !== [])
    {
      // timeDetails = responseData.state.response.data;

      var binary = '';
      var result = responseData.state.response.data;
      var bytes = new Uint8Array(result);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
      }

      var timeLineList = JSON.parse(binary);
      console.log("TIMEEEEEEEEEEEEEE",timeLineList);

      {timeLineList.seq.map((value,index) => {
        if(value.time !== undefined){
          resultTime.push({
            'time': value.date + "\n\n" + value.time,
            'title':value.text + "  (" + value.statusCode.toString() +")",
            'description':value.user
          }
        )
      }
    });
  }
}

if(resultTime!== undefined && resultTime !== []){
  this.setState({chartData:resultTime,
    isDataAvailable:true});
  }
}
componentWillMount(){
  if(this.props.orderNo !== undefined && this.props.orderNo !== '' && this.state.chartData !== []){
    obj.GET_orders_category_order_history(this.callbackWithArg.bind(this),0,this.props.orderNo);
  }
}
render() {
  console.log('====================================');
  console.log(this.state.chartData);
  console.log('====================================');

  if(this.state.isDataAvailable){
    return (
      <View style={styles.container}>
        <TouchableOpacity style = {styles.header}>
          <Text style = {styles.headerText}>
             <LiMultiTerm textId="99016675" textVal="History"/> - {this.props.orderNo}
          </Text>
        </TouchableOpacity>
        <View style={{width:"100%",height:"80%",margin:3,padding:3}}>
          {this.state.chartData.length > 0 
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
             <LiMultiTerm textId="99016675" textVal="History"/> - {this.props.orderNo}
          </Text>
        </TouchableOpacity>
        <View style={styles.containerPlain}>
          <Progress.Circle showText={true} size={30} indeterminate={true} />
          < Text>
           <LiMultiTerm textId="99028774" textVal="Fetching details from server..."/>
          </Text>
        </View>
      </View>
    );
  }

}
}

const styles = StyleSheet.create({
  containerPlain: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  flatview: {
    backgroundColor: 'whitesmoke',
    width: width(100),
    justifyContent: 'center',
    padding: 3.5,
    justifyContent: 'space-between',
    borderRadius: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  items: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  header: {
    backgroundColor: '#595959',
    padding: 5,
  },
  ImageIconStyle: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 15,
    height: 25,
    alignItems: 'stretch',
    resizeMode: 'stretch',
  },
  text: {
    color: '#4f603c',
    fontSize: 20,
    alignItems: 'flex-start',
    width: 375,
  },
  headerText: {
    color: '#fff',
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    paddingBottom: 5
  },
  orderno: {
    backgroundColor: 'lightgrey',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  pane: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  paneleft: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    alignItems: 'flex-end',
  }
});