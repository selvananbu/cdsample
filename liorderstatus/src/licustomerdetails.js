/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import * as Action from './liaction/index';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class LiCustomerDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      customerName:' '
    }
  }
  UNSAFE_componentWillMount(){

    if (this.props.customerInfo !== undefined){
      var custInfo = this.props.customerInfo;

    }
  }
  render() {
    var custName ='';
    var custOrdDate = '';
    var delivStockDesc ='';
    var custInfo;
    if (this.props.customerInfo !== '' && this.props.customerInfo !== undefined && this.props.customerInfo !== null){
      custInfo = this.props.customerInfo;
      custOrdDate = custInfo.custOrdDate;
      delivStockDesc = custInfo.delivStockDesc;
      custName = custInfo.custAddr.name;
  }
  console.log("####",custName);
  return (
    <View style={styles.container}>
      <Container>
        <Content >
          <Card>
            <CardItem header bordered>
              <Text>Customer Details</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Cutsomer Name:  {custName}
                </Text>
                <Text>
                  Delivery Desc.: {delivStockDesc}
                </Text>
                <Text>
                  Order Date: {custOrdDate}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>More Details</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    </View>

  );
}
}
function mapStateToProps(state) {
  return {
    obj: state.ItemReady

  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setItem: Action.setItem
  },dispatch)
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(LiCustomerDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:2,
  },
});
