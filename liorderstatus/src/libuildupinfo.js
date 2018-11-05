import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  BackHandler,
  TouchableHighlight,
  ScrollView} from 'react-native';
  import { Actions, ActionConst } from 'react-native-router-flux';
  import { Container, Header, Content, ListItem, Text,Card, CardItem, Body } from 'native-base';
  import MenuExample from './nativeconnector/menuconnector';
  import LiOrderIntent from './liorderintent'

  import { connect } from 'react-redux';
  import {bindActionCreators} from 'redux';
  import * as Action from './liaction/index';
  import LiMultiTerm from './lib/limultiterm';
  const muobj = new LiMultiTerm("", "");


  export default class LiBuildUpInfo extends Component {
    constructor(props){
      super(props)
    }
          componentWillMount() {
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
    // componentWillMount(){
    //   if(this.props.itemDetails!== undefined && this.props.itemDetails !== ''){

    //   }
    // }
    _onLongPressItems = (item) => {
      var dataUri = this.props.itemDetails.ordNo.toString() + "," +item.ordPos.toString();
      MenuExample.startGraphicsViewerForSideView(dataUri);
    }
    
    getItemDesc(buildup){
      var finalDesc = '';
      var array = [];
      var indexSpacer = 1;
      var skipCompNoValue = false;
      var pane = -1;
      var layerCount = 0;
      var layerItems = [];
      var otherItems = [];
      var spacerItems = [];

      for(var i =0;i<buildup.length;i++){

        if(buildup[i].finalGeom !== undefined && buildup[i].finalGeom !== '' ){
          if( buildup[i].mat !== undefined && buildup[i].mat !== ''){
            console.log(pane,buildup[i].pane,buildup[i].comp,layerCount,layerItems);
            if(pane === buildup[i].pane){
              if(buildup[i].comp > 0 ){
                layerCount = layerCount + 1;
                if(layerCount === 3){
                  layerItems.push(buildup[i].layer);
                }
              }
            }
            else {
              pane = buildup[i].pane;
              skipCompNoValue = false;
              layerCount = 0;
            }
          }
        }
      }

      for(var i =0;i<buildup.length;i++){
        if(buildup[i].finalGeom !== undefined && buildup[i].finalGeom !== '' ){
          if( buildup[i].mat !== undefined &&
            buildup[i].mat !== ''){
            if(layerItems.indexOf(buildup[i].layer) >= 0 && buildup[i].comp === 0){

            }
            else {
              if(buildup[i].mat.matType === 'SPACER'){
                 // otherItems.push({COMP:buildup[i].comp,PANE:buildup[i].pane,desc:"SPACER:" + buildup[i].mat.desc});
                array.append
                spacerItems.push()
                if(array.length >= indexSpacer)
                {
                  array.splice(indexSpacer,0,"Spacer:" + buildup[i].mat.desc);
                  indexSpacer = indexSpacer + 2;
                }
              }
              else if(buildup[i].mat.matType === 'LAYER'){
                  // otherItems.push({COMP:buildup[i].comp,PANE:buildup[i].pane,desc:"LAYER:" + buildup[i].mat.desc});
                // array.append
                if(array.length >= indexSpacer)
                {
                  array.splice(indexSpacer,0,"Layer:" + buildup[i].mat.desc);
                  indexSpacer = indexSpacer + 2;
                }
              }
              else if(buildup[i].mat.matType === 'GLASS'){
                  // otherItems.push({COMP:buildup[i].comp,PANE:buildup[i].pane,desc:"GLASS:" + buildup[i].mat.desc});
                var desc = '';
                if(buildup[i].mat.desc !== undefined)
                desc = buildup[i].mat.desc;
                else if(buildup[i].mat.shDesc)
                desc = buildup[i].mat.shDesc;
                array.push("Glass:" + desc);
              }
            }


            }
          }
        }
        return array;
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
        var orderNo = ' ';
        var width = '';
        var height = '';
        var shpNumbr = '';
        var isoffsetAvailable = false;
        var itemNo = 0;

        if(this.props.itemDetails !== '' && this.props.itemDetails !== undefined)
        orderNo = this.props.itemDetails.ordNo
        return (
          <View style={styles.container}>
            <TouchableOpacity style = {styles.header}>
             <Text style = {styles.headerText}>
               <LiMultiTerm textId="99028760" textVal="BuildUp Info"/> - {orderNo}
            </Text>
            </TouchableOpacity>
            <FlatList
              data={this.props.itemDetails.item}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={(item, index) => index}
              renderItem={({item , separators}) => (
                <LiOrderIntent data={{orderNo:this.props.itemDetails.ordNo,itemNo:item.ordPos}}>
                  <View style={styles.flatview}>
                    <Text style={styles.orderstyle}>
                    <LiMultiTerm textId="99011797" textVal="Item No"/> {item.ordPos}:</Text>
                    {this.getItemDesc(item.buildup).map((innerItem,index) => {
                      if(innerItem.split(":")[0] === "Glass"){
                        var glaasDes = innerItem.split(":")[1];
                        return(<Text style={{color:"blue",fontWeight:"bold"}}> {glaasDes} </Text>);
                      }
                      else if(innerItem.split(":")[0] === "Spacer"){
                        var spacerDesc = innerItem.split(":")[1];
                        return(<Text style={{color:"black",fontWeight:"bold"}}> {spacerDesc} </Text>);
                      }
                      else{
                        var spacerDesc = innerItem.split(":")[1];
                        return(<Text style={{color:"brown",fontWeight:"bold"}}> {spacerDesc} </Text>);
                      }
                    })
                  }
                </View>
              </LiOrderIntent>
            )}
          />
        </View>
      );
    }
  }

   const styles = StyleSheet.create({
    containerPlain: {
      backgroundColor:'#F5FCFF',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center'
    },
    stretch: {
      width:30,
      height:30
    },
    flatview: {
      justifyContent: 'center',
      padding:2,
      borderRadius: 2,
    },
    container: {
      flex: 1,
      height:'100%',
      width:'100%'
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
      fontSize: 26,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Cochin',
      paddingBottom:5
    },
    orderstyle: {
      backgroundColor:'#aeaeae',
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