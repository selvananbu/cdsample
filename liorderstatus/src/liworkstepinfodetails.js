import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  BackHandler,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Content, ListItem, Text, Card, CardItem, Body } from 'native-base';
import OpenApiClient_status from './openapi/openapiclient_status';
import { OpenApiBody } from './openapi/openapibody';
import { MimeTypes } from './openapi/openapibody';
import { width, height, totalSize } from 'react-native-dimension';
import * as MenuConnector from '../src/nativeconnector/menuconnector'


import * as Progress from 'react-native-progress';
import GridView from 'react-native-super-grid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Action from './liaction/index';
import * as commonFunction from './lib/responseFunction';
import * as LocalSettings from './lib/localsettings';
import LiMultiTerm from './lib/limultiterm';
const muobj = new LiMultiTerm("", "");


var obj = new OpenApiClient_status('http://swpdmsrv4.lisec.internal:18711', 'DEMO', 'PROD');

class LiWorkStepInfoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataAvailable: false,
      worksteps: ''
    }
  }

   componentWillUnmount() {
     muobj.setupText();
   }
   componentDidUpdate() {
     muobj.setupText();
   }


  componentDidMount() {
    this.initializeOpenAPICalls();
    muobj.setupText();
  }
  
  callbackMachineList(responseData) {
    console.log("$$$$$$$$$$$$$$$$", responseData.state.response.data);
    if (responseData !== null && responseData.state.response.data !== undefined) {
      // var binary = '';
      // var result = responseData.state.response.data;
      // var bytes = new Uint8Array(result);
      // var len = bytes.byteLength;
      // for (var i = 0; i < len; i++) {
      //   binary += String.fromCharCode( bytes[ i ] );
      // }

      var machineList = commonFunction.convertToUint(responseData.state.response.data);
      this.props.setMachineList(machineList);
    }
  }
  callbackWorkstepsList = async (responseData) => {

    let siteName = LocalSettings.getStorageItem("config.sitename");
    if (responseData !== null && responseData.state.response.data !== undefined) {
      // var binary = '';
      // var result = responseData.state.response.data;
      // var bytes = new Uint8Array(result);
      // var len = bytes.byteLength;
      // for (var i = 0; i < len; i++) {
      //   binary += String.fromCharCode( bytes[ i ] );
      // }

      var workStepList = commonFunction.convertToUint(responseData.state.response.data);
      this.props.setWorkstepList(workStepList);

      if (this.props.orderNo !== undefined && this.props.orderNo !== '')
        OpenApiClient_status.getClient(siteName).GET_orders_category_order_worksteps(this.callbackWithArg.bind(this), 0, this.props.orderNo, this.props.itemNo);
    }
  }
  getSiteName = async () => {
    return await commonFunction.getStorageItem("config.sitename");
  }
  initializeOpenAPICalls = async () => {
    let siteName = LocalSettings.getStorageItem("config.sitename");
    console.log("$$$$$$$$44", siteName);

    if (Object.keys(this.props.obj.machinelist).length === 0) {
      OpenApiClient_status.getClient(siteName).GET_machines(this.callbackMachineList.bind(this));
      OpenApiClient_status.getClient(siteName).GET_worksteps(this.callbackWorkstepsList.bind(this));
    }
    else if (this.props.orderNo !== undefined && this.props.orderNo !== '')
        OpenApiClient_status.getClient(siteName).GET_orders_category_order_worksteps(this.callbackWithArg.bind(this), 0, this.props.orderNo, this.props.itemNo);
  else {
    console.log('NO CALLS WENT ')
  }
      }

  callbackWithArg(responseData) {
    console.log("^^^^^^^^^^^^^^^", responseData.state.response.data);
    if (responseData !== null && responseData.state.response.status == 200) {
      // var binary = '';
      // var result = responseData.state.response.data;
      // var bytes = new Uint8Array(result);
      // var len = bytes.byteLength;
      // for (var i = 0; i < len; i++) {
      //   binary += String.fromCharCode( bytes[ i ] );
      // }

      var responseDataJson = commonFunction.convertToUint(responseData.state.response.data);
      if(Object.keys(responseDataJson).length == 0)
      MenuConnector.showToast("Data Empty")
      this.setState({
        isDataAvailable: true,
        worksteps: responseDataJson
      }
      );
    }
    else {
      // MenuConnector.showToast("Unsuccessful")
    }
  }

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "black",
      }}
    />
  );

  getDescriptionName(stepNo, isMachine) {
    {
      var stepName = '';
      if (Object.keys(this.props.obj.worksteplist).length !== 0 && Object.keys(this.props.obj.machinelist).length !== 0) {
        var list;
        if (!isMachine) {
          list = this.props.obj.worksteplist.WORKSTEPLIST.step;
        }
        else {
          list = this.props.obj.machinelist.MACHINELIST.mach;
        }
        for (var i = 0; i < list.length; i++) {
          var value;
          if (isMachine) {
            value = list[i];
          }
          else {
            value = list[i];
          }
          if (value.no === stepNo) {
            stepName = value.name;
            break;
          }
        }
      }
      if (stepName === '')
        stepName = null;
      return stepName;
    }
  }
  getProgressValue(rdyQty) {
    var progressVal = 0;
    if (readyQty % 1000 >= 1) {
      progressVal = readyQty / 1000;
    }
  }
  getBuildupDesc(pane, comp) {
    var desc = '';
    if (this.props.itemDetails !== undefined) {
      {
        this.props.itemDetails.item.map((value, index) => {
          {
            if (value.buildup !== undefined) {
              {
                value.buildup.map((itemValue, index) => {
                  if (itemValue.pane === pane && itemValue.comp === comp) {
                    if (itemValue.mat !== undefined) {
                      desc = itemValue.mat.desc;
                    }
                  }
                });
              }
            }
          }
        })
      }
    }
    return desc;

  }

  render() {

    var orderNo = ' ';
    var width = '';
    var height = '';
    var stepName = '';
    var progressWidth = (Dimensions.get('window').width * 85) / 100;
    var progressHeight = (Dimensions.get('window').height * 7) / 100;
    var worksteps = this.state.worksteps;
    if (this.state.isDataAvailable) {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.header}>
            <Text style={styles.headerText}>
               <LiMultiTerm textId="99000919" textVal="WorkStep Info"/> - {this.props.orderNo}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={this.state.worksteps.seq}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.flatview} >
                  <Text style={styles.orderno}>
                   {this.getDescriptionName(item.stepNo, false) === null ?
                   <LiMultiTerm textId="99028995" textVal="No Data"/>
                  :
                   this.getDescriptionName(item.stepNo, false)} 
                  
                  ({item.pane}/{item.comp})  {this.getBuildupDesc(item.pane, item.comp)}
                  </Text>
                  <View style={{ flexDirection: 'column', width:'100%'  }}>
                    <View style={{ flexDirection: 'row', width:'100%', justifyContent:'space-around', marginTop:5 }}>
                      <View >
                        <Text>{item.schedDate}</Text>
                      </View>
                      <View>
                        {item.readyDate !== undefined
                          ? <Text style={{ color: 'white', backgroundColor: 'grey',paddingHorizontal:5 }}>{item.readyDate} {item.readyTime}</Text>
                          : <Text style={{ color: 'white' }}>  </Text>
                        }

                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', width:'100%', justifyContent:'space-around', marginTop:5 }}>
                      <View style={{alignSelf: 'center', borderTopWidth: 0, }}>
                        <Text>{this.getDescriptionName(item.schedMach, true)}</Text>
                      </View>
                      <View style={{alignSelf: 'center', borderTopWidth: 0, }}>
                        {item.readyDate !== undefined
                          ? <Text style={{ color: 'white', backgroundColor: 'grey',paddingHorizontal:5 }}>{this.getDescriptionName(item.readyMach, true)}</Text>
                          : <Text style={{ color: 'white' }}>'  '</Text>
                        }
                      </View>
                    </View>
                  </View>
                  {item.schedQty !== undefined && item.readyQty !== undefined ?
                    <View style={{ flexDirection: 'row', marginLeft: 5, width: "100%", height: 25, alignSelf: 'center', padding: 2, margin: 2 }}>
                      <Progress.Bar width={progressWidth} borderRadius={0} progress={item.readyQty / item.schedQty} height={progressHeight} borderColor={'#CED0CE'} unfilledColor={'rgb(255,255,255)'} color={'rgb(46,139,87)'} />
                      <Text style={{ fontSize: 16 }}>{item.readyQty}/{item.schedQty}</Text>
                    </View>
                    :
                    <View style={{ flexDirection: 'row', marginLeft: 5, width: "100%", height: 25, alignSelf: 'center', padding: 2, margin: 2 }}>
                      <Progress.Bar width={progressWidth} borderRadius={0} progress={0} height={progressHeight} borderColor={'#CED0CE'} unfilledColor={'rgb(255,255,255)'} color={'rgb(46,139,87)'} />
                      <Text style={{ fontSize: 16 }}>0/0</Text>
                    </View>
                  }
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.header}>
            <Text style={styles.headerText}>
               <LiMultiTerm textId="99000919" textVal="WorkStepInfo"/>  -  {this.props.orderNo}
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

function  mapDispatchToProps(dispatch) {
  return  bindActionCreators({
    setItem:  Action.setItem,
    setWorkstepList: Action.setWorkstepList,
    setMachineList: Action.setMachineList,
  }, dispatch)
}

export default connect(
  mapStateToProps,  mapDispatchToProps
)(LiWorkStepInfoDetails);



const styles = StyleSheet.create({
  containerPlain: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  liprogressbar: {
    flexDirection: 'row',
    margin: 2
  },
  progressStyle: {
    padding: 0,
    margin: 4
  },
  gridView: {
    paddingTop: 25,
    flex: 1,
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
    backgroundColor:'whitesmoke',
    width:width(100),
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
    fontSize: 22,
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
