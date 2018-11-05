/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import { BarChart, Grid ,StackedBarChart } from 'react-native-svg-charts'

import { width, height, totalSize } from 'react-native-dimension';
import * as commonFunction from './lib/responseFunction';
import * as Progress from 'react-native-progress';

import OpenApiClient_status from './openapi/openapiclient_status';
import { OpenApiBody } from './openapi/openapibody';
import { MimeTypes } from './openapi/openapibody';
import * as LocalSettings from './lib/localsettings';
import LiMultiTerm from './lib/limultiterm';
const muobj = new LiMultiTerm("", "");



import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Action from './liaction/index';


var obj = new OpenApiClient_status('http://swpdmsrv4.lisec.internal:18711', 'DEMO', 'PROD');

export default class LiProductionSummaryCharts extends Component {

  constructor(props){
    super(props);
    this.state={
      qtysummary:'',
      isDataLoading:false,
      orderNo:'',
      itemNo:''
    }
  }
  getSiteName = async () => {
     return await commonFunction.getStorageItem("config.sitename");
   }
  getSummaryChartDetails =  (orderNo,itemNo) => {
      let siteName = LocalSettings.getStorageItem("config.sitename");

        OpenApiClient_status.getClient(siteName).GET_orders_category_order_qty_summary(this.callbackWithArg.bind(this), 0,orderNo,itemNo);
        this.setState({
            isDataLoading: true,
            orderNo: orderNo,
            itemNo: itemNo
        });
  }
  componentDidMount(){
     muobj.setupText();
    if(this.props.itemNo !== undefined){
      if(this.props.orderNo !== '' && this.props.itemNo !== ''
      && this.props.itemNo.toString() !== this.state.itemNo && this.state.isDataLoading !== true){
        this.getSummaryChartDetails(this.props.orderNo,this.props.itemNo);
      }
    }
     
  }

  UNSAFE_componentWillReceiveProps(props){
    
    if(props.itemNo !== undefined){

      if(props.orderNo !== '' && props.itemNo !== ''
      && props.itemNo.toString() !== this.state.itemNo && this.state.isDataLoading !== true){
        // obj.GET_orders_category_order_qty_summary(this.callbackWithArg.bind(this),0,props.orderNo,props.itemNo);
        // this.setState({
        //   isDataLoading:true,
        //   orderNo:props.orderNo,
        //   itemNo:props.itemNo
        // });
        this.getSummaryChartDetails(props.orderNo,props.itemNo);
      }
    }
    else  if(props.orderNo !== '' && this.state.orderNo.toString() !== props.orderNo.toString() && this.state.isDataLoading !== true){
      // obj.GET_orders_category_order_qty_summary(this.callbackWithArg.bind(this),0,props.orderNo);
      // this.setState({
      //   isDataLoading:true,
      //   orderNo:props.orderNo
      // });
      this.getSummaryChartDetails(props.orderNo,null);
    }
  }
  callbackWithArg(responseData){

    if(responseData !== null && responseData.state.response.data !== undefined){
      var binary = '';
      var jsonResult = commonFunction.convertToUint(responseData.state.response.data);
      if(jsonResult !== undefined){
        this.setState({
          qtysummary:jsonResult.item,
          isDataLoading:false,
          orderNo:this.props.orderNo
        });
      }
    }
     muobj.setupText();

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

  render(){
    var  qtyDelivered = 0;
    var qtyPlanned = 0;
    var qtyTot = 0;
    var qtyInvoiced = 0;
    var qtyProduced = 0;
    if(this.state.qtysummary !== '' && this.state.qtysummary !== undefined){

      this.state.qtysummary.map((value,index) => {
        if(value.qtyDelivered !== ''  && value.qtyDelivered !== undefined ){
          qtyDelivered = value.qtyDelivered;
        }
        if(value.qtyPlanned !== ''  && value.qtyPlanned !== undefined ){
          qtyPlanned = value.qtyPlanned;
        }
        if(value.qtyTot !== ''  && value.qtyTot !== undefined ){
          qtyTot = value.qtyTot;
        }
        if(value.qtyProduced !== ''  && value.qtyProduced !== undefined ){
          qtyProduced = value.qtyProduced;
        }
        if(value.qtyInvoiced !== ''  && value.qtyInvoiced !== undefined ){
          qtyInvoiced = value.qtyInvoiced;
        }
      });
    }



    return (

      <View style={styles.container}>
        {
          this.props.orderNo === '' && this.state.isDataLoading === false?
          <View style={styles.containerPlain}>
            <Text>
                 <LiMultiTerm textId="08005669 " textVal="No Data available"/> 
            </Text>
          </View>
          :
          this.state.isDataLoading === true ?
          <View style={styles.containerPlain}>
            <Progress.Circle showText={true} size={30} indeterminate={true} />
            <Text>
                 <LiMultiTerm textId="99028774" textVal="Fetching details from server..."/>
            </Text>
          </View>
          :
          <View style={styles.chartStyle}>
            <View style={styles.liprogressbar}>
              {qtyPlanned !== 0 ?
                <Progress.Bar style={styles.progressStyle} progress={(qtyPlanned )/qtyTot}  color={'#DBDB20'} width={width(94)} height={height(3)} borderRadius={0}/>
                :
                <Progress.Bar style={styles.progressStyle} progress={0}  color={'#DBDB20'} width={width(94)} height={height(3)} borderRadius={0}/>
              }
              <Text style={{fontSize:18}}>{qtyPlanned}</Text>
            </View>
            <View style={styles.liprogressbar}>
              {qtyProduced !== 0 ?
                <Progress.Bar style={styles.progressStyle} progress={(qtyProduced )/qtyTot}  color={'#238A20'} width={width(94)} height={height(3)} borderRadius={0}/>
                :
                <Progress.Bar style={styles.progressStyle} progress={0}  color={'#238A20'} width={width(94)} height={height(3)} borderRadius={0}/>
              }
              <Text style={{fontSize:18}}>{qtyProduced}</Text>
            </View>
            <View style={styles.liprogressbar}>
              {qtyDelivered !== 0 ?
                <Progress.Bar style={styles.progressStyle} progress={(qtyDelivered )/qtyTot}  color={'#D2691E'} width={width(94)} height={height(3)} borderRadius={0}/>
                :
                <Progress.Bar style={styles.progressStyle} progress={0}  color={'#D2691E'} width={width(94)} height={height(3)} borderRadius={0}/>
              }
              <Text style={{fontSize:18}}>{ qtyDelivered }</Text>
            </View>
            <View style={styles.liprogressbar}>
              {qtyInvoiced !== 0 ?
                <Progress.Bar style={styles.progressStyle} progress={(qtyInvoiced )/qtyTot}  color={'#8E3843'} width={width(94)} height={height(3)} borderRadius={0}/>
                :
                <Progress.Bar style={styles.progressStyle} progress={0}  color={'#8E3843'} width={width(94)} height={height(3)} borderRadius={0}/>
              }
              <Text style={{fontSize:18}}>{qtyInvoiced}</Text>
            </View>

            <View style={{flexDirection:'row',alignItems:"center",justifyContent:"space-around",height:height(3),width:width(100)}}>
              <View style={{flexDirection:'row',justifyContent:"space-around"}}>
                <View style={{width:width(3),height:height(2),backgroundColor:'#DBDB20'}}></View>
                <Text style={{margin:1,fontSize:12,fontWeight: "bold"}}>
                 <LiMultiTerm textId="99000419" textVal="Planned"/>
                </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{width:width(3),height:height(2),backgroundColor:'#238A20'}}></View>
                <Text style={{margin:1,fontSize:12,fontWeight: "bold"}}>
                 <LiMultiTerm textId="99000672" textVal="Produced"/>
                </Text>
              </View>
              <View style={{flexDirection:'row',marginLeft:5}}>
                <View style={{width:width(3),height:height(2),backgroundColor:'#D2691E'}}></View>
                <Text style={{margin:1,fontSize:12,fontWeight: "bold"}}>
                 <LiMultiTerm textId="99008422" textVal="Delivered"/>
                </Text>
              </View>
              <View style={{flexDirection:'row',marginLeft:5}}>
                <View style={{width:width(3),height:height(2),backgroundColor:'#8E3843'}}></View>
                <Text style={{margin:1,fontSize:12,fontWeight: "bold"}}>
                 <LiMultiTerm textId="99020468" textVal="Invoiced"/>
                </Text>
              </View>

            </View>
          </View>

        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height(27),
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'column'
  },
  liprogressbar:{
    flexDirection:'row',
    margin:width(.5)
  },
  progressStyle:{
    padding:0,
    margin:4
  },
  containerPlain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartStyle: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  Heading: {
    color:'#881b4c',
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'roboto',
    justifyContent: 'center',
    alignItems:'center'
  }
});
