import { StyleSheet, Text } from 'react-native';
import React from 'react'
import OpenApiClient_search from '../../openapi/openapiclient_search'
import * as commonFunction from '../../lib/responseFunction';

var attrListAttributeLabel = []


const wrapBaseValue = (value, attribute) => {
  if (isNaN(value)) return value
  const baseUnit = getBaseUnit(attribute).unitStr
  const baseValue = value.toString() + ' ' + ((baseUnit === 'inch') ? '"' : baseUnit)
  return baseValue
}

const getAttribute = (list, type) => {
  const attribute = list.filter(attr => attr.attrType === type)
  return (attribute.length === 1) ? attribute[0] : null
}


class AttributeLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: convertToFav(this.attribute(), wrapBaseValue(props.value, this.attribute()))
    }
  }
  attribute = () => getAttribute(attrListAttributeLabel, this.props.type)

  componentDidMount() {
    this.loadFav()
  }

  loadFav = () => {
    loadFavIndex(this.props.type)
    .then(idx => {
      if (idx !== this.attribute().favUnitIdx)
        attrListAttributeLabel = attrListAttributeLabel.map(attr => attr.attrType === this.props.type
          ? {
            ...attr,
            favUnitIdx: idx
          }
          : attr
        )
      this.setState({
        value: convertToFav(this.attribute(), this.state.value)
      })
    })
  }

  componentDidUpdate(prevProps) {
    // changeOpen
    if(prevProps.changeOpen !== this.props.changeOpen) {
      this.loadFav()
    }
  }
  render() {
    //console.error(props.attrList)
    if (attrListAttributeLabel.length < 1) return null
    return (
  		<Text style={styles.text}>
  			{this.state.value}
  		</Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color:'black'
  },
})

import axios from 'axios';
import { AsyncStorage } from 'react-native';

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


 const callbackGetAttributes = (responseData) => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  console.log(responseData);
  console.log('====================================');
   if (responseData !== null && responseData.state.response.data !== undefined) {
     var binary = '';
     var responseDataJson = commonFunction.convertToUint(responseData.state.response.data);
     console.log(responseDataJson);
     const attributes = responseDataJson.data.attr;
     return attributes;

   }

 }

const loadAttributesServer = async () => {
  // try {
    
    const attribute  = await  OpenApiClient_search.getClient('PROD').GET_attributes(callbackGetAttributes);
console.log('====================================');
console.log("Came hereeeeeeeeeeeeeeeee",attribute);
console.log('====================================');
    // const response = await axios.get('http://swpdmsrv4.lisec.internal:18707/openapi/DEMO/PROD/search/attributes')
  //   const attributes = response.data.attr
  //   return attributes
  // } catch(e){
  //   console.warn('error: ' + e)
  // }
  return []
}



const retrieveAttributeList = async () => {
  const storageAttributes = await loadAttrList() //loadAttributes()
  //console.warn('loading from storage')
  if (storageAttributes && storageAttributes.length > 0) return storageAttributes

  const serverAttributes = await loadAttributesServer()
  //console.warn('loading from server')
  if (serverAttributes !== undefined && serverAttributes.length > 0) {
    writeAttrList(serverAttributes)
    //writeAttributes(serverAttributes)
    return serverAttributes
  }

  console.warn('not loaded')
  return {} 
}

const retrieveAttributes = async () => {
  const attrList = await retrieveAttributeList()
  if(attrList.length > 0){
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

}

// retrieveAttributes()  // retrieveAttributeList()
// .then(attributeList => {
//   attrListAttributeLabel = attributeList
//   //console.warn('received attribute list')
// })

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

const getBaseUnit = (attribute) => attribute.unit[getBaseUnitIndex(attribute)]

const reduce = (numerator,denominator) => {
    var gcd = function gcd(a,b){
      return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return [numerator/gcd, denominator/gcd];
}

const getNearest = (value) => {
    var sum = 1, val = [];
    for(var i=1; i< 12; i++){
        sum = sum + sum,
        val.push(sum)
    }
    var fraction=val[0];
    for(var k=0; k< val.length; k++){
        if(Math.abs(value - val[k]) < Math.abs(value - fraction)){
            fraction = val[k]
        }
    }
    return fraction
}

const isEmptyOrWhiteSpace = (str) => (str === null || str.match(/^\s*$/) !== null)

const convertToFav = (attribute, currentValue, decimals=null) => {
  const favUnit = getFavUnit(attribute)
  const decimal = (decimals === null) ? favUnit.decimals : decimals
  const units = attribute.unit
  var flag = 0, convertedValue = 0, inchFlag=0
  if (currentValue === undefined || isEmptyOrWhiteSpace(currentValue)) return ''
  

  var getUnit = currentValue.split(/(^\-?\d+\.?\d*|\.\d+)/g); //split the value

  var getStatic = currentValue.split(' '); //if no units are passed
  // console.log(getUnit)

  var unitFactor = {};
  if(getUnit.length > 1 && !isEmptyOrWhiteSpace(getUnit[2])){
    for(var i=0;i < units.length; i++){
      // var checkInch = getUnit[2].match(/((^"$)|(["](\d*)\/?\d*))/g);
      var checkInch = getUnit[2].match(/((^")|([1-9]*[0-9]*\/*[1-9][0-9]*["]*))/g);
      //console.log(getStatic,units[i].unitStr);
      if(getStatic[1] === units[i].unitStr.toLowerCase()){
        unitFactor = units[i];
      }
      // console.log(checkInch);

      //if the value is in inch and fav is not inch
      if(checkInch !== null && checkInch[0] !== '"' && checkInch[0] === getUnit[2].replace(' ','') && favUnit.unitStr !== 'inch'){
        //console.log('insde*****');
        var convertToDecimal = '';
       // console.log(getUnit,'check');
        convertToDecimal =(getUnit[2]).split('"')
        //console.log(convertToDecimal,'***');
        convertToDecimal = convertToDecimal[0].split('/');

        if(getUnit.length > 3){
          convertToDecimal =(getUnit[2] + getUnit[3] + getUnit[4] ).split('"');
          convertToDecimal = convertToDecimal[1].split('/');
        }
        //console.log(convertToDecimal,'***');
        var decimalVal=0;
        if(convertToDecimal[1] !== ''){
          decimalVal = (eval(convertToDecimal[0]/convertToDecimal[1]));
          inchFlag = 1;
        }
        //console.log(decimalVal,'***');
        getUnit[1] =eval(parseInt(getUnit[1]) + parseFloat(decimalVal));
      }
      //console.log(getUnit,'/////');

      if((getUnit[2].replace(' ','')) === units[i].unitStr || ( checkInch !== null && checkInch[0] === getUnit[2].replace(' ','')  && favUnit.unitStr === units[i].unitStr) && inchFlag === 1 ){
        flag = 1;
        //console.log(getUnit,units[i], 'check/*/*/*');
        if(favUnit.unitStr === 'inch'){
          var inchValue = (((parseFloat(getUnit[1])/units[i].unitFactor)*favUnit.unitFactor)+favUnit.offset).toFixed(decimal);
          //console.log(inchValue,'check*-*-*-');
          var breakInch = inchValue.split('.');
          var fractionValue = getNearest(breakInch[1]);
          var getReduced = reduce(parseInt(Math.ceil((parseFloat(0 + '.' + breakInch[1]))*fractionValue)), fractionValue);
          // console.log((parseFloat(breakInch[1]))*fractionValue,'in');
          if(checkInch !== null && checkInch[0].indexOf('"') !== -1){
            convertedValue = currentValue;
          }
          else{
            convertedValue = breakInch[0] + ' ' + getReduced[0] + '/' + getReduced[1]+'"';
          }

        }
        else{
          //console.log(parseFloat(getUnit[1]),units[i],units[i].unitFactor,favUnit.unitFactor,'check');
          //console.log('insnide');
          var currentUnitFactor = units[i].unitFactor;
          //console.log(checkInch);

          //if current unit is inch and needs to convert
          if(checkInch !== null && checkInch[0].indexOf('"') !== -1){
            currentUnitFactor =  0.03937085375696372;
          }
          //console.log(getUnit[1],(((parseFloat(getUnit[1])/currentUnitFactor)*favUnit.unitFactor)+favUnit.offset).toFixed(decimal),'in');
          convertedValue = (((parseFloat(getUnit[1])/currentUnitFactor)*favUnit.unitFactor)+favUnit.offset).toFixed(decimal) + ' ' + favUnit.unitStr;
        }

        //console.log(convertedValue);
      }
    }

  //if no match found with available unit

    if(flag === 0){
      if(favUnit.unitStr === 'inch'){
        var breakDecimal = (getUnit[2].replace(' ','')).replace('"','').split('/');
        //console.log(breakDecimal);
        if(breakDecimal.length > 0 && breakDecimal[0] !== ''){
          var getReduced = reduce(parseInt(breakDecimal[0]), parseInt(breakDecimal[1]));
          convertedValue = getUnit[1]+ ' '+ getReduced[0]+ '/' + getReduced[1]+'"';
        }
        else{
          var convertedValue = (getUnit[1]);
          var currentUnit = unitFactor.unitFactor !== undefined? unitFactor.unitFactor : 1;
          var currentUnitOffset = unitFactor.offset !== undefined? unitFactor.offset : 0;
          var sign = 0;
          //console.log(unitFactor,favUnit,'*****');
          //if offset is availble and convert to base unit so subtract offset
          if(unitFactor.offest > favUnit.offset && unitFactor.offset !== undefined){
            //console.log(sign,'/*/*/*');
            sign = -1 *unitFactor.offset;
            convertedValue = ((((parseFloat(getUnit[1])  + (sign) )/currentUnit) * favUnit.unitFactor )).toFixed(decimal);
          }
          else{
            sign = 1 * favUnit.offset;
            convertedValue = ((((parseFloat(getUnit[1]) - currentUnitOffset )/currentUnit) * favUnit.unitFactor ) + (sign) ).toFixed(decimal);
          }
          //console.log(convertedValue);
          var breakInch = convertedValue.split('.');
          //console.log(breakInch);
          var fractionValue = getNearest(breakInch[1]);
          //console.log(fractionValue,'check');
          var getReduced = reduce(parseInt(Math.ceil((parseFloat(0 + '.' + breakInch[1]))*fractionValue)), fractionValue);
          //console.log(getReduced,'check**');
          convertedValue = breakInch[0] + ' ' + getReduced[0] + '/' + getReduced[1]+'"';
        }
      }
      else{
        var currentUnit = unitFactor.unitFactor !== undefined? unitFactor.unitFactor : 1;
        var currentUnitOffset = unitFactor.offset !== undefined? unitFactor.offset : 0;
        var sign = 0;
        //console.log(unitFactor,favUnit,'*****');
        //if offset is availble and convert to base unit so subtract offset
        if(unitFactor.offest > favUnit.offset && unitFactor.offset !== undefined){
          //console.log(sign,'/*/*/*');
          sign = -1 *unitFactor.offset;
          convertedValue = ((((parseFloat(getUnit[1])  + (sign) )/currentUnit) * favUnit.unitFactor )).toFixed(decimal) + ' ' + favUnit.unitStr;
        }
        else{
          sign = 1 * favUnit.offset;
          convertedValue = ((((parseFloat(getUnit[1]) - currentUnitOffset )/currentUnit) * favUnit.unitFactor ) + (sign) ).toFixed(decimal) + ' ' + favUnit.unitStr;
        }
        //console.log(convertedValue,'in1');
      }
    }
  }
  else{
    // var favBase = getFav(units);
    // var favUnitBase = state.attrMapAttrId[currentType][favBase];
    if(favUnit.unitStr === 'inch'){
      convertedValue = 0 + '"';
    }
    else{
      convertedValue = parseFloat(0).toFixed(decimal) + ' ' + favUnit.unitStr;
    }
  }
  //console.log(convertedValue,'in2');
  //state = {...state,
  //  attrValue: convertedValue
  //}
  return convertedValue;
}

export default AttributeLabel
