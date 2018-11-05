/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ScrollView,
  Picker,
  Text
} from 'react-native';

import axios from 'axios';
import DialogAndroid from 'react-native-dialogs';
import OpenApiClient_search from './openapi/openapiclient_search';
import * as LocalSettings from './lib/localsettings';
import * as commonFunction from './lib/responseFunction';

import { width, height, totalSize } from 'react-native-dimension';
import * as MenuConnector from './nativeconnector/menuconnector';
import LiMultiTerm from './lib/limultiterm';
const muobj = new LiMultiTerm("", "");


var valueIdx = {};
export default class LiSettings extends Component {

  constructor(props){
    super(props);
    this.state={
      languageList:'',
      modalVisible:false,
      currentUnit:{},
      selectedSite: LocalSettings.getStorageItem("core.app.language.id3") === undefined ? 0 : LocalSettings.getStorageItem("core.app.language.id3"),
      sites: []
    }
  }
  componentDidMount(){
     muobj.setupText();
    console.log('====================================');
    console.log("###########",LocalSettings.getStorageItem("core.app.language.id3"));
    console.log('====================================');
    // var self = this;

    // _retrieveData = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('attribute');
    //     if (value !== null) {
    //       // We have data!!
    //       self.setState({
    //         languageList:JSON.parse(value)
    //       });

    //       if (value !== undefined) {

    //         JSON.parse(value).attr.map((item, innervalue) => {
    //           _retrieveData = async () => {
    //             try {
    //               const valueIndex = await AsyncStorage.getItem(item.attrType);
    //               if (valueIndex !== null) {
    //                 this.setState({ [item.attrType]: valueIndex});
    //                 valueIdx[item.attrType] = valueIndex;
    //               }
    //             }
    //             catch (error) {
    //             }
    //           }
    //           _retrieveData();
    //         });
    //       }
    //     }
        // else{
          var siteNameGlobal = LocalSettings.getStorageItem("config.sitename");
          if (siteNameGlobal !== undefined || siteNameGlobal !== null)
                OpenApiClient_search.getClient(siteNameGlobal).GET_languages(this.callBackWithLanguage.bind(this));
          // axios.get('http://swpdmsrv4.lisec.internal:18707/openapi/DEMO/PROD/search/attributes').then(function(response) {
          //   console.log("Responseeeeeeeeeeeeeee",response);
          //   _storeData = async () => {
          //     try {
          //       await AsyncStorage.setItem('attribute', JSON.stringify(response.data));
          //     } catch (error) {
          //     }
          //   }
          //   _storeData();

          //   self.setState({
          //     languageList:response.data
          //   });
          // })
          // .catch(function(err) {
          //   console.log(err,'error');
          // })
        // }
      // }
      // catch (error) {
      // }
    // }
    // _retrieveData();
  }
  callBackWithLanguage(responseData){
       var jsonData = commonFunction.convertToUint(responseData.state.response.data);
       this.setState({languageList:jsonData});
  }
  // async onAttributeUnitClicked(unit){
  //   var attributeItems = [];
  //   var favUnit = unit.favUnitIdx;
  //   unit.unit.map((item,value) => {
  //     attributeItems.push({label:item.unitStr,id:item.unitName});
  //   });
  //   const { selectedItem } = await DialogAndroid.showPicker('Select a Fav. Unit', null, {
  //     positiveText: null,
  //     negativeText: 'Cancel',
  //     type: DialogAndroid.listRadio,
  //     selectedId: this.state[unit.attrType] === undefined ? unit.unit[unit.favUnitIdx].unitStr : unit.unit[this.state[unit.attrType]].unitStr,
  //     items: attributeItems
  //   });
  //   if (selectedItem) {
  //     var tempList = this.state.languageList;
  //     _storeData = async () => {
  //       try {
  //         // console.log(unit.attrType,unit.unit.ind,'cehck');
  //         unit.unit.map((unitItem,unitIndex) => {
  //               if(unitItem.unitName === selectedItem.id){
  //                       favUnit = unitIndex;
  //             }
  //         });
  //         await AsyncStorage.setItem(unit.attrType,favUnit.toString());
          
  //       } catch (error) {
  //       }
  //     }
  //     _storeData();
  //     this.setState({[unit.attrType]: favUnit})
  //   }
  // }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
    componentWillUnmount() {
      muobj.setupText();
    }
    componentDidUpdate() {
      muobj.setupText();
    }
    handleComboChange(site, index) {

      this.setState({
        selectedSite: site
      });

      
      LocalSettings.setStorageItem("core.app.language.id3", site);
      MenuConnector.writeKeyValueItem("core.app.language.id3", site);
      // MenuConnector.setLocale(site);
    }

      generateSitesList(languageList) {
        return (
                <Picker  
                style={{ width: width(98), height: height(6)}}
                selectedValue={this.state.selectedSite}
                onValueChange={(site,index) => this.handleComboChange(site,index)}
                >
                {
                    languageList.lang.map((siteDetails, siteIndex) => (
                            <Picker.Item key={siteIndex} label = {siteDetails.langDesc} value = {siteDetails.langId3}/>
                    ))}
                </Picker>
            )
    }
  renderSeparator = () => (
    <View
      style={{
        height:1,
        width:"100%",
        backgroundColor:"#CED0CE",
      }}
    />
  );
  render() {
  return (
    <View style={styles.container}>
       <Text style={{color:"#c13e6c",fontSize:17}}>
       <LiMultiTerm textId="99004568" textVal="Languages"/>
      </Text>
      {this.state.languageList.lang !== undefined ?
      <View style={{alignItems:"center",justifyContent:"center"}}>
             <View style={{ width: width(98), height: height(7), borderWidth: 1.5, borderColor: '#881b4c', borderRadius: 15}}>
                        {this.state.sites !== null
                            ?
                            this.generateSitesList(this.state.languageList)
                            : <View />
                        }
        </View>
      </View>
    
        : 
        <View/>
      }
    </View>
     

  );
}
}

const styles = StyleSheet.create({
  container: {
    width:width(100),
    height: height(20),
  }
});
