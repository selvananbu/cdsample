/* @flow */

import { Container, Header, Content, ListItem, Text, Radio, Right, Left } from 'native-base';
import { Dialog } from 'react-native-simple-dialogs';
import {
  View,
  StyleSheet,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ScrollView
} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import DialogAndroid from 'react-native-dialogs';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import React, { Component } from 'react';
import axios from 'axios';

const getFavUnitIndex = (attribute) => {
  if (attribute.unit[attribute.favUnitIdx]) 
    return attribute.favUnitIdx
  return getBaseUnitIndex(attribute)
}

const getBaseUnitIndex = (attribute) => {
  if (
    !isNaN(attribute.baseUnitIdx)
    && attribute.unit[attribute.baseUnitIdx]
    && attribute.unit[attribute.baseUnitIdx].isBaseUnit
  ) return attribute.baseUnitIdx

  const base = attribute.unit.filter(unit => unit.isBaseUnit === 1)
  return (base.length !== 1) ? 0 : attribute.unit.map((unit) => unit.unitName).indexOf(base[0].unitName)
}

const getFavUnit = (attribute) => attribute.unit[getFavUnitIndex(attribute)]


const styles = StyleSheet.create({
  containerPlain: {
    backgroundColor:'#F5FCFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  flatview: {
    justifyContent: 'center',
    padding:2,
    borderRadius: 2,
    margin:8
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  items: {
    flexDirection:'row',
    padding:10,
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
  },
  header: {
    backgroundColor: '#dfcee7',
    padding:10,
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
    color:'#660033',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    paddingBottom:10
  },
  orderno: {
    fontSize: 20,
    fontFamily: 'Cochin',
  },
  pane: {
    fontFamily: 'Cochin',
    color:'#9e9e9e'
  },
  paneleft: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    alignItems: 'flex-end',
  }
});

const PREFIX = 'AAD_'

const loadItem = async (key) => {
  try {
    const item = await AsyncStorage.getItem(PREFIX + key);
    return JSON.parse(item)
  } catch (error) {
  }
  return null
}

const writeItem = async (key, item) => {
  try {
    await AsyncStorage.setItem(PREFIX + key, JSON.stringify(item));
  } catch (error) {
    console.warn('write error')
  }
}

const writeFavIndex = async (type, index) => await writeItem(type+'_FAV', index)
const loadFavIndex = async (type) => await loadItem(type+'_FAV')

const writeAttrList = async (list) => await writeItem('ATTRLIST', list)
const loadAttrList = async () => await loadItem('ATTRLIST')


const loadAttributesServer = async () => {
  try {
    const response = await axios.get('http://swpdmsrv4.lisec.internal:18707/openapi/DEMO/PROD/search/attributes')
    const attributes = response.data.attr
    return attributes
  } catch(e){
    console.warn('error: ' + e)
  }
  return []
}

const retrieveAttributeList = async () => {
  const storageAttributes = await loadAttrList() //loadAttributes()
  //console.warn('loading from storage')
  if (storageAttributes && storageAttributes.length > 0) return storageAttributes

  const serverAttributes = await loadAttributesServer()
  //console.warn('loading from server')
  if (serverAttributes.length > 0) {
    writeAttrList(serverAttributes)
    //writeAttributes(serverAttributes)
    return serverAttributes
  }

  console.warn('not loaded')
  return {} 
}

const retrieveAttributes = async () => {
  const attrList = await retrieveAttributeList()
  return await Promise.all(attrList.map(async attr => {
    const fav = await loadFavIndex(attr.attrType)
    //console.warn((fav !== null && !isNaN(fav)))
    return (fav !== null && !isNaN(fav))
    ? {
      ...attr,
      favUnitIdx: fav
    }
    : attr
  }))
}

var attrListAttributeSettings = []
// retrieveAttributes()  // retrieveAttributeList()
// .then(attributeList => {
//   attrListAttributeSettings = attributeList
//   //console.warn('received attribute list')
// })


class LiAttributeSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rerender: false
    }
  }

  onAttributeUnitClicked = async (attribute) => {
    const { selectedItem } = await DialogAndroid.showPicker('Select a Fav. Unit', null, {
      positiveText: null,
      negativeText: 'Cancel',
      type: DialogAndroid.listRadio,
      selectedId: getFavUnitIndex(attribute),
      items: attribute.unit.map((unit, index) => ({
        label: unit.unitStr,
        id: index
      }))
    });
    if( selectedItem ) {
      writeFavIndex(attribute.attrType, selectedItem.id)
      // .then(callback to refresh attributelabel and attributeedit)
      if (selectedItem.id === attribute.favUnitIdx) return
      attrListAttributeSettings = attrListAttributeSettings.map(attr => attr.attrType === attribute.attrType
        ? {
          ...attr,
          favUnitIdx: selectedItem.id
        }
        : attr
      )
      this.setState({ rerender: !this.state.rerender })
    }
  }

  renderSeparator = () => (
    <View
      style={{
        height:1,
        width:"100%",
        backgroundColor:"#CED0CE",
      }}
    />
  )

  render ()
  {
    return (
      <View style={styles.container}>
        <Text style={{color:"#c13e6c",fontSize:17,margin:3}}>
          Attribute Units
        </Text>
        {attrListAttributeSettings !== [] ?
        <ScrollView rerenderprop={this.state.rerender}>
          {attrListAttributeSettings.map((attribute) => 
            <TouchableOpacity
              style={{borderBottomWidth:1,borderBottomColor:'#dadada'}}
              onPress={() => this.onAttributeUnitClicked(attribute)} key={attribute.attrType} >
              <View style={styles.flatview}>
                <Text style={styles.orderno}>{attribute.attrType}</Text>
                <Text style={styles.pane}>
                  {
                    getFavUnit(attribute).unitStr
                  }
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>
  
          // <FlatList
          //   data={this.state.attributeList.attr}
          //   ItemSeparatorComponent={this.renderSeparator}
          //   keyExtractor={(attribute, index) => index}
          //   renderItem={({attribute , separators}) => (
          //     <TouchableOpacity
          //       onPress={this.onAttributeUnitClicked.bind(this, attribute)}>
          //       <View style={styles.flatview}>
          //         <Text style={styles.orderno}>{attribute.attrType}</Text>
          //         <Text style={styles.pane}>{this.state[attribute.attrType]}</Text>
          //       </View>
          //     </TouchableOpacity>
          //   )}
          // />
          : <View/>
        }
      </View>
    )
  }
}

export default LiAttributeSettings
