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
  AsyncStorage,
  ScrollView} from 'react-native';
  import { Actions, ActionConst } from 'react-native-router-flux';
  import { Container, Header, Content, ListItem, Text,Card, CardItem, Body } from 'native-base';

  // import LiDynamicAttrEdit from './lidynamicattributeedit/lidynamiccontainers/lidynamicattrlabelview.js'

  import MenuExample from './nativeconnector/menuconnector';
  import LiOrderIntent from './liorderintent.js';
  import { connect } from 'react-redux';
  import {bindActionCreators} from 'redux';
  import * as Action from './liaction/index';
  import { width, height, totalSize } from 'react-native-dimension';
  import LiMultiTerm from './lib/limultiterm';
  const muobj = new LiMultiTerm("", "");

  import Image1 from './image/stepped_icon.png'




  export default class LiGeometryInfo extends Component {
    constructor(props){
      super(props);
      this.state={
        favUnitIdx:null,
        attrType:'LENGTH',
      }
    }


    componentWillMount(){
      AsyncStorage.getItem(this.state.attrType).then((innerVal) => {
        // console.log(innerVal,'cvb');
        if (innerVal !== null) {
          this.setState({
            favUnitIdx:innerVal
          });
          // console.log("###############",item.attrType,this.props.attrStore.attrType);
          // if (this.props.type === item.attrType){
          // self.props.setFavIndex(parseInt(innerVal));
          // }
        }
      });
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

    _onLongPressItems = (item,value) => {
      var dataUri = this.props.itemDetails.ordNo.toString() + "," +item.ordPos.toString()+ "," +value.pane.toString() + "," + value.comp.toString();
      MenuExample.startGraphicsViewer(dataUri);
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
              <LiMultiTerm textId="99028762" textVal="Goemetry Info"/> - {orderNo}
            </Text>
          </TouchableOpacity>
          <ScrollView>
            {this.props.itemDetails.item !== undefined ?
              this.props.itemDetails.item.map((item,index) => {
                return(
                  <TouchableOpacity style={styles.containerItem} key={index}>
                    <View style={styles.flatview}>
                      <Text style={styles.orderno}>
                      <LiMultiTerm textId="99011797" textVal="Item No"/> {item.ordPos}:
                      </Text>
                      {isoffsetAvailable = false}
                      {
                        item.buildup.map((value,index) => {
                          if(value.finalGeom !== ''  && value.finalGeom !== undefined && value.finalGeom.rectWidth !== undefined ){
                            if(value.offset !== ''  && value.offset !== undefined ){
                              if( value.offset.x !== 0 || value.offset.y !==0){
                                isoffsetAvailable = true;
                                itemNo = item.ordPos;
                              }
                            }
                          }
                        })
                      }
                      {item.buildup.map((value,index) => {
                        width = value.finalGeom.rectWidth;
                        height = value.finalGeom.rectHeight;
                        shpNumbr = value.finalGeom.shpNmb;

                        if(value.pane > 0 ){
                          if(isoffsetAvailable){
                            return(
                              <View styles={{flex: 1, flexDirection: 'row'}}>
                                <TouchableOpacity
                                  onLongPress={() => this._onLongPressItems(item,value)}>
                                  {/* <LiDynamicAttrEdit type='LENGTH' value={width}/> */}
                                  <View styles={{width:'50%',alignItems:'flex-end',alignSelf: 'flex-end'}}>
                                    <Image
                                      style={{width:30,height:30,alignItems:'flex-end',alignSelf: 'flex-end',paddingBottom:5}}
                                      source={{uri:"src_image_stepped_icon"}}
                                    />
                                  </View>
                                </TouchableOpacity>
                              </View>);
                          }
                          else if(value.pane === 1){
                            return(
                              <LiOrderIntent data={{orderNo:orderNo,itemNo:item.ordPos, paneNo:value.pane, compNo:value.comp}} key={value}>
                                <View style={{flexDirection:'row'}}>
                                  <Text style={styles.pane}>
                                    <LiMultiTerm textId="06000903" textVal="Width"/>  {width} </Text>
                                    {/* <LiDynamicAttrEdit type={this.state.attrType} value={this.props.width} /> */}
                                  </View>
                                  <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.pane}>
                                       <LiMultiTerm textId="06000902" textVal="Height"/>  {height} </Text>
                                      {/* <LiDynamicAttrEdit type={this.state.attrType} value={this.props.height} /> */}
                                    </View>
                                    {this.props.ShapeNumber === undefined ?
                                      <View/>
                                      :
                                      <Text style={styles.pane}>
                                         <LiMultiTerm textId="99004338" textVal="Shape No"/> {this.props.ShapeNumber}
                                      </Text>
                                    }
                                  </LiOrderIntent>);
                                }

                              }
                            })}
                          </View>
                        </TouchableOpacity>
                      );
                    })
                    :
                    <View/>
                  }
                </ScrollView>
              </View>);
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
            containerItem:{
              height:height(10)
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
              fontSize: 22,
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: 'Cochin',
              paddingBottom:5
            },
            orderno: {
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