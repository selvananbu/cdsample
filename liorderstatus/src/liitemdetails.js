/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Picker,
  Alert
} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import right_dir from './image/right_dir.png';
import { Actions, ActionConst } from 'react-native-router-flux';
import LiProductionSummaryCharts from './liproductionsummarycharts';
import * as MenuConnector from './nativeconnector/menuconnector';
import LiMultiTerm from './lib/limultiterm';
const muobj = new LiMultiTerm("", "");

import image1 from './image/generalinfo.png';
import image2 from './image/geometryinfo.png';
import image3 from './image/buildup.png';
import image4 from './image/processinginfo.png';
import image5 from './image/workstep.png';


export default class LiItemDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      items : [],
      currentItem:1,
      GridViewItems:
      [
        {
          index: 0,
          key: 'General Info',
          MenuIcon_url:'src_image_generalinfo',
          text_id: "99028740"
        },
        {
          index: 1,
          key: 'Geometry Info',
          MenuIcon_url:'src_image_geometryinfo',
          text_id: "99028762"
        },
        {
          index: 2,
          key: 'BuildUp Info',
          MenuIcon_url:'src_image_buildup',
          text_id: "99028760"
        },
        {
          index: 3,
          key: 'Processing Info',
          MenuIcon_url:'src_image_processinginfo',
          text_id:"99028763"
        },
        {
          index: 4,
          key: 'Remake Info',
          MenuIcon_url:'src_image_remake_info',
          text_id: "99009868"

        },
        {
          index: 5,
          key: 'Workstep Info',
          MenuIcon_url:'src_image_workstep',
          text_id: "99000919"
        }
      ]
    }
  }
  Gotomenu  = (item) => {
    if(item.index === 0){
      Actions.LiGeneraInfo({itemDetails:this.props.itemDetails})
    }
    else if (item.index === 1) {
      Actions.LiGeometryInfo({itemDetails:this.props.itemDetails})
    }

    else if (item.index === 2) {
      Actions.LiBuildUpInfo({itemDetails:this.props.itemDetails});
    }
    else if (item.index === 3) {
      Actions.LiProcessingInfo({itemDetails:this.props.itemDetails});
    }
    else if(item.index === 4){
      if (this.props.orderNo != '' && this.props.orderNo != undefined)
      Actions.LiRemakeInfo({orderNo:this.props.orderNo,itemNo:this.state.currentItem});
      else
      MenuConnector.showToast("Please Enter Order number")
    }
    else if (item.index === 5) {

      var currentItem = this.state.currentItem;
      Actions.LiItemWorkStepInfo({
        itemDetails:this.props.itemDetails,
        orderNo:this.props.orderNo,
        itemNo:currentItem,
        items:this.state.items
      });
    }
    else {
      Alert.alert(item);
    }
  }

  componentWillMount(){
    var itemSize = 1;
    if(this.props.itemDetails !== undefined && this.props.itemDetails !== '' && this.props.itemDetails.item !== undefined){
      itemSize = this.props.itemDetails.item.length;
      var arrayItem =[];
      for(var i=1;i<=itemSize;i++){
          arrayItem.push(i.toString());
      }

      if(arrayItem!== []){
        this.setState({
            items:arrayItem
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
  flatlistView(item){
    return(

      <View style={styles.GridViewBlockStyle} >
        <View>
          <Image source={{uri:item.MenuIcon_url}} style={styles.ImageIconStyle} resizeMode='contain'/>
        </View>
        <View style={{width:width(70),justifyContent:'center',}}>
          <TouchableOpacity onPress={this.Gotomenu.bind(this, item.key)}>
            <Text style={styles.GridViewInsideTextItemStyle} > {item.key} </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.Gotomenu.bind(this, item.key)}>
          <Image source={{uri:'src_image_right_dir'}} style={styles.ImageIconStyle2}  resizeMode='contain'/>
        </TouchableOpacity>
      </View>

    );
  }
  onItemSelected(itemValue){
      this.setState({currentItem: itemValue})
  }
  render() {
    return(this.returnView())
  }
  loadPickerValues(){
    var i =0;
    return this.state.items.map(item => (
     <Picker.Item label={item} value={item} key={item} />
  ))
  }
  returnView(){
    return (
      <View style={styles.container}>
        <View style={{height:height(9),width:width(100),alignItems:"center",justifyContent:"center",flexDirection:'row'}}>
          <Text style={styles.itemStyle}>
              <LiMultiTerm textId="99000127" textVal="Item"/>
          </Text>
          <Picker
          selectedValue={this.state.currentItem}
          style={{height: height(8), width:width(20)}}
          onValueChange={(itemValue, itemIndex) => this.onItemSelected(itemValue)}>
          {this.loadPickerValues()}
        </Picker>
        </View>
        
        <View style={{height:height(25),padding:2,margin:3}}>
          <LiProductionSummaryCharts
            orderNo = {this.props.orderNo} 
            itemNo = {this.state.currentItem}
          />
        </View>
        <View style={{flex:1}}>
          <View style={{flex:1,height:height(50),backgroundColor:'lightgrey'}}>
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
        <View style={{width:width(70),justifyContent:'center',}}>
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
  </View>
);
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },GridViewBlockStyle: {
    flex:1,
    height:height(48/5),
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
  itemStyle:{
    // height: height(8), 
    // width: width(20),
    // marginTop: height(5),
    // marginLeft: height(15),
    color:'#881b4c',
    alignContent: 'center',
    fontSize: 20,
    fontWeight: '400',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
    height: 130,
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
