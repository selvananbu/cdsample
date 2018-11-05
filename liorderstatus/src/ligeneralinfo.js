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
  Button,
  ScrollView
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Content, ListItem, Text, Card, CardItem, Body, Footer, Title } from 'native-base';

import MenuExample from './nativeconnector/menuconnector';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Action from './liaction/index';
  import LiMultiTerm from './lib/limultiterm';
  const muobj = new LiMultiTerm("", "");

// import LiDynamicAttrEdit from './lidynamicattributeedit/lidynamiccontainers/lidynamicattrlabelview'
// import AttributeLabel from './lidynamicattributeedit/lidynamiccomponents/AttributeLabel';
// import LiDynamicAttrEdit from './lidynamicattributeedit/lidynamiccontainers/lidynamicattrlabelview'

export default class LiGeneraInfo extends Component {
  constructor(props) {
    super(props)
  }


  componentWillMount() {

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

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
      }}
    />
  );

  render() {
    var orderNo = ' ';
    var custNo = '';

    if (this.props.itemDetails.item !== undefined && this.props.itemDetails.item !== '') {
      this.props.itemDetails.item.map((value, item) => {
        value.buildup.map((valueinner, item) => {
        });
      });
    }

    if (this.props.itemDetails !== '' && this.props.itemDetails !== undefined) {
      orderNo = this.props.itemDetails.ordNo;
      custNo = this.props.itemDetails.header.custNo;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.header}>
          <Text style={styles.headerText}
            onLongPress={() =>
              Alert.alert("Customer Docs")
            }>
             <LiMultiTerm textId="99028740" textVal="General Info"/>  {orderNo}
          </Text>
        </TouchableOpacity>
        {this.props.itemDetails.item !== undefined ?
          // <FlatList
          //   data={this.props.itemDetails.item}
          //   ItemSeparatorComponent={this.renderSeparator}
          //   keyExtractor={(item, index) => index}
          //   renderItem={({item , separators}) =>
          this.props.itemDetails.item.map((item,index) => {
              return(
              <TouchableOpacity key={index}>
                <View style={styles.flatview}>
                  <Text style={styles.orderno}>
                   <LiMultiTerm textId="99011797" textVal="Item No"/>: {item.ordPos}
                  </Text>
                  <Text style={styles.pane}>
                  <LiMultiTerm textId="06000675" textVal="Quantity"/>{item.qty}
                  </Text>
                  {

                    item.buildup.map((value,item) => {
                          if(value.finalGeom !== ''  && value.finalGeom !== undefined && value.finalGeom.rectWidth !== undefined ){
                            width = value.finalGeom.rectWidth;
                            height = value.finalGeom.rectHeight;
                          }
                    })
                  }
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.pane}>
                  <LiMultiTerm textId="06000903" textVal="Width"/> {width} 
                  </Text>
                   {/* <AttributeLabel  type='LENGTH' value={width}/> */}
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.pane}>
                  <LiMultiTerm textId="06000902" textVal="Height"/> {height} 
                  </Text>
                   {/* <AttributeLabel type='LENGTH' value={height}/> */}
                </View>
                </View>
              </TouchableOpacity>
              )
          })
          :
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.pane}>Width:  </Text>
             {/* <AttributeLabel type='LENGTH' value={"52.45"} /> */}
          </View>
        }
      </View>

    );
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
  flatview: {
    justifyContent: 'center',
    padding: 2,
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
    backgroundColor: '#aeaeae',
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
