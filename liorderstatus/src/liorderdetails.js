/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';


import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
// import right_dir from './image/right_dir.png';
import { Actions, ActionConst } from 'react-native-router-flux';
import * as MenuConnector from './nativeconnector/menuconnector';
import LiMultiTerm from './lib/limultiterm';

import image1 from './image/orderheader.png'
import image2 from './image/item.png'
import image3 from './image/orderhistory.png'
import image4 from './image/workstep.png'
import image5 from './image/right_dir.png'
import image6 from './image/remake_info.png'
const muobj = new LiMultiTerm("", "");


export default class LiOrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSoftKeyEnabled: false,
      GridViewItems: [{
          index:0,
          key: 'Order Header',
          MenuIcon_url: 'src_image_orderheader',
          text_id: "99010113"
        },
        {
          index: 1,
          key: 'Order Item',
          MenuIcon_url: 'src_image_item',
          text_id: "9000787"
        },
        {
          index: 2,
          key: 'Remake Info',
          MenuIcon_url: 'src_image_remake_info',
          text_id: "99009868"
        },
        {
          index: 3,
          key: 'Order History',
          MenuIcon_url: 'src_image_orderhistory',
          text_id: "99016675"
        },
        {
          index: 4,
          key: 'Workstep Info',
          MenuIcon_url: 'src_image_workstep',
          text_id: "99000919"
        }

      ]
    };
  }

  componentDidMount(){
    muobj.setupText();
  }
    componentWillUnmount() {
      muobj.setupText();
    } 
    componentDidUpdate() {
      muobj.setupText();
    }


  Gotomenu  = (item) => {
    if(this.props.orderNo !='' && this.props.orderNo != undefined){
      if(item.index === 0){
        Actions.LiOrderHeaderDetails({headerInfo:this.props.headerInfo});
      }
      else if (item.index === 1) {
        Actions.LiItemDetails({itemDetails:this.props.itemDetails,orderNo:this.props.orderNo});       //dummy props orderNo passed
      }
      else if (item.index === 4) {
        Actions.LiWorkStepInfoDetails({
          orderNo:this.props.orderNo,
          itemDetails:this.props.itemDetails});
      }
      else if (item.index === 2) {
            Actions.LiRemakeInfo({orderNo:this.props.orderNo});
      }
      else if (item.index === 3) {
        Actions.LiOrderHistory({orderNo:this.props.orderNo});
      }
      else
        Alert.alert(item);
    }
    else{
      MenuConnector.showToast("Enter Order Number")
    }
  }
 
  flatlistView(item){
    return(

      <View style={styles.GridViewBlockStyle} >
        <View>
          <Image source={{uri:item.MenuIcon_url}} style={styles.ImageIconStyle} resizeMode='contain'/>
        </View>
        <View style={{width:width(70),justifyContent:'center',}}>
          <TouchableOpacity onPress={this.Gotomenu.bind(this, item)}>
            <Text style={styles.GridViewInsideTextItemStyle} > {item.key} </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.Gotomenu.bind(this, item)}>
          <Image source={{uri:'src_image_right_dir'}} style={styles.ImageIconStyle2}  resizeMode='contain'/>
        </TouchableOpacity>
      </View>

    );
  }
  render() {
    return(this.returnView())
  }
  returnView(){
    return (
      <View style={{flex:1,height:height(65),width:width(100)}}>
        <View style={{flex:1,backgroundColor:'lightgrey'}}>
          {/* <FlatList data={ this.state.GridViewItems} renderItem={({item}) =>{
            return(this.flatlistView(item));
          }
        }
        numColumns={1}
      /> */}
      {this.state.GridViewItems.map((item,index) =>
           <View style={styles.GridViewBlockStyle} key={index}>
        <View>
          <Image source={{uri:item.MenuIcon_url}} style={styles.ImageIconStyle} resizeMode='contain'/>
        </View>
        <View style={{width:width(50),justifyContent:'center',}}>
          <TouchableOpacity onPress={this.Gotomenu.bind(this, item)}>
            <Text style={styles.GridViewInsideTextItemStyle} > 
                  <LiMultiTerm textId={item.text_id} textVal={item.key} /> 
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.Gotomenu.bind(this, item)}>
          <Image source={{uri:'src_image_right_dir'}} style={styles.ImageIconStyle2}  resizeMode='contain'/>
        </TouchableOpacity>
      </View>
      )}
    </View>
  </View>
);
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },GridViewBlockStyle: {
    flex:1,
    height:height(55/6),
    flexDirection:'row',
    backgroundColor: 'whitesmoke',
    borderTopColor:'#000',
    borderBottomColor:'#000',
    borderTopWidth:0.5,
    borderTopWidth:height(0.1),
    borderBottomWidth:height(0.1),
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowRadius: 20,
    elevation: 5,
  },
  GridViewInsideTextItemStyle: {
    paddingTop: 1,
    paddingBottom: 1,
    color: '#881b4c',
    fontSize: 20,
    textShadowOffset:{wdith:2.5,height:2},
    fontWeight: '200',
    textShadowColor:'lightgrey',
    justifyContent: 'center',
  },

  image: {
    width: 17,
    height: 17,
  },
  image2: {
    width: 20,
    height: 20,
  },
  item: {
    flex: 1,
    //width:200,
    // height: 130,
    margin: 2,
  },
  list: {
    flex: 1,
  },
  ImageIconStyle: {
    padding: 0.5,
    marginHorizontal: width(1),
    paddingHorizontal: width(.8),
    margin: 2,
    width: width(18),
    height: height(18),
    resizeMode : 'contain',

  },
  ImageIconStyle2: {
    marginLeft: 5,
    paddingHorizontal: 1,
    margin: 2,
    height: height(8),
    width: width(8),
    resizeMode : 'contain',

  },

  SeparatorLine :{
    backgroundColor : '#fff',
    width: 1,
    height: 40
  }
});
