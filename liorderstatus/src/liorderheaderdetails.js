/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';
import CheckBox from 'react-native-checkbox';

import { width, height, totalSize } from 'react-native-dimension';
import MenuExample from './nativeconnector/menuconnector';
import document_icon from './image/document_icon.png';
import LiOrderIntent from './liorderintent';
import LiMultiTerm from './lib/limultiterm';
const muobj = new LiMultiTerm("", "");

import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
export default class LiOrderHeaderDetails extends Component {

   componentDidMount() {
     muobj.setupText();
   }
   componentWillUnmount() {
     muobj.setupText();
   }
   componentDidUpdate() {
     muobj.setupText();
   }
  render() {
    var customerNo = '';
    var customerName = '';
    var deliveryDate = '';
    var deliveryAddr = '';
    var priorityMode = '';
    var statusLevel = '';
    var glassQty = '';
    var zipCode = '';
    var delivCountry ='';
    var route = '';
    var customerOrderNo = '';
    var customerOrderDate = '';
    var glassQty = '';
    var deliveryType = '';

    if (this.props.headerInfo !== '' && this.props.headerInfo !== null && this.props.headerInfo !== undefined && this.props.headerInfo.custAddr !== undefined) {
      
      var headerInfoDet = this.props.headerInfo;
      
      customerNo =  headerInfoDet.custNo;
      customerOrderNo = headerInfoDet.custOrdNo;
      customerOrderDate = headerInfoDet.custOrdDate;
      customerName = headerInfoDet.custAddr.name;
      {
        headerInfoDet.delAddr.map((value,item) => {
          deliveryDate = value.delivDate;
          route = value.route;
          deliveryType = value.delType;
          delivCountry = value.addr.country;
          zipCode = value.addr.postCode;
        });
      }
      deliveryAddr = headerInfoDet.delivStockDesc;
      priorityMode = '';
      route = headerInfoDet.delAddr.route;
    }
    return (
      <View style={styles.container}>
        <Container>
          <Content >
            <Card>
              <CardItem header >
                <Text style={{color:'#881b4c'}}>
                 <LiMultiTerm textId="9000326" textVal="Customer"/>
                </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.text}>
                    
                 <LiMultiTerm textId="99027161" textVal="Customer Name"/>: {customerName}
                  </Text>
                  <LiOrderIntent data={{customerNo:customerNo,docType:1}}>
                  <View style={{width:width(95),flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{color: '#4f603c',
                    fontSize: 20,
                    alignItems: 'baseline',
                    }}>
                      <LiMultiTerm textId="99001694" textVal="Cutsomer No"/>:  {customerNo}
                    </Text>
                    <Image source={{uri:'src_image_document_icon'}} style={{marginRight:width(5), height:width(7),width:width(7)}}  resizeMode='contain'/>
                    </View>
                  </LiOrderIntent>

                  <Text style={styles.text}>
                    <LiMultiTerm textId="99028756" textVal="Delivery Country"/>:           {delivCountry}
                  </Text>
                </Body>
              </CardItem>
            </Card>

            <Card>
              <CardItem header >
                <Text style={{color:'#881b4c'}}>
                <LiMultiTerm textId="99001694" textVal="Order"/>
                </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={{color: '#4f603c',
                  fontSize: 20,
                  alignItems: 'flex-start',
                  width:350
                  }}>
                    <LiMultiTerm textId="99019430" textVal="Customer Order No"/>: {customerOrderNo}
                  </Text>
                  <Text style={styles.text}>
                    <LiMultiTerm textId="99028449" textVal="Order Date"/>:           {customerOrderDate}
                  </Text>
                  <Text style={styles.text}>
                    <LiMultiTerm textId="99009853" textVal="Glass Qty"/>:           {glassQty}
                  </Text>
                </Body>
              </CardItem>
            </Card>

            <Card>
              <CardItem header>
                <Text style={{color:'#881b4c'}}><LiMultiTerm textId="99001943" textVal="Delivery"/>Delivery</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.text}>
                    <LiMultiTerm textId="99002089" textVal="Delivery Type"/>:    {deliveryType}
                  </Text>
                  <Text style={styles.text}>
                    <LiMultiTerm textId="99001940" textVal="Route"/>:           {route}
                  </Text>
                  <Text style={styles.text}>
                    <LiMultiTerm textId="99001362" textVal="Delivery Date"/>:           {deliveryDate}
                  </Text>
                  <Text style={styles.text}>
                    <LiMultiTerm textId="99000536" textVal="Zip Code"/>:           {zipCode}
                  </Text>
                </Body>
              </CardItem>
            </Card>

            <Card>
              <CardItem header>
                <Text style={{color:'#881b4c'}}><LiMultiTerm textId="99001948" textVal="Technical"/></Text>
              </CardItem>
              <CardItem>
                <Body>
                  <CheckBox
                    label={<LiMultiTerm textId="99017016" textVal="Venting Tubes"/>}
                    checked={true}
                    onChange={(checked) => console.log('I am checked', checked)}
                  />
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageIconStyle2: {
    margin: 2,
    height: height(5),
    width: width(5),
    resizeMode : 'contain',

  },
  text: {
    color: '#4f603c',
    fontSize: 20,
    alignItems: 'flex-start',
    width:375,
  },
});
