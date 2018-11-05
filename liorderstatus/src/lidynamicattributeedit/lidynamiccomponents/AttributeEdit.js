import { TextInput } from 'react-native';
import React from 'react'
import PropTypes from 'prop-types'

import OpenApiClient_search from '../../openapi/openapiclient_search'
import * as commonFunction from '../../lib/responseFunction';


var attrListAttributeEdit = []


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


class AttributeEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      value: convertToFav(this.attribute(), wrapBaseValue(props.initialValue,this.attribute()))
    }
  }

  attribute = () => getAttribute(attrListAttributeEdit, this.props.type)

  componentDidMount() {
    this.loadFav()
  }

  loadFav = () => {
    loadFavIndex(this.props.type)
    .then(idx => {
      if (idx !== this.attribute().favUnitIdx)
        attrListAttributeEdit = attrListAttributeEdit.map(attr => attr.attrType === this.props.type
          ? {
            ...attr,
            favUnitIdx: idx
          }
          : attr
        )
      this.setState({ value: convertToFav(this.attribute(), this.value())})
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.changeOpen !== this.props.changeOpen) {
      this.loadFav()
    }
  }

  restrictEvent = (value) => {
    //console.error('Error ', event)
    //const { value } = event.nativeEvent
    //console.warn(value)
    if(validateValue(this.attribute(), value)) {
      this.props.onChange(value)
      this.setState({ value: value })
    }
    //else event.preventDefault()
  }

  value = () => (
    this.props.value !== null
      ? this.props.value
      : this.state.value
  )

  convert = () => {
    // show error if not right format
    if(validateValue(this.attribute(), this.value(), true)) {
      const converted = convertToFav(this.attribute(), this.value())
      this.setState({ error: false })
      this.props.onChange(converted)
      this.setState({ value: converted })
      this.props.onSubmit(converted)
    }
    else this.setState({ error: true })
  }

  render() {
    return (
      <TextInput id="LiAttributeEdit_field"
      onChangeText = {this.restrictEvent}
      value = {this.value()}
      //inputStyle={{fontSize: '13px', width:"inherit", color: this.state.error ? 'red' : 'black'}} not a valid prop for TextInput
      style={{color: this.state.error ? 'red' : 'black'}}
      onBlur={() => this.convert()}
      onSubmitEditing={() => this.convert()}
      />
    )
  }
}

AttributeEdit.defaultProps = {
  value: null,
  initialValue: '',
  onSubmit: () => {},
  onChange: () => {},
  changeOpen: -1
}

AttributeEdit.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

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


const loadAttributesServer = () => {
  // try {
    OpenApiClient_search.getClient('PROD').GET_attributes(this.callbackGetAttributes.bind(this));
    // const response = await axios.get('http://swpdmsrv4.lisec.internal:18707/openapi/DEMO/PROD/search/attributes')
    // const attributes = response.data.attr
    // return attributes
  // }
  //  catch(e){
    // console.warn('error: ' + e)
  // }
  return []
}

 const callbackGetAttributes = (responseData) => {

      if (responseData !== null && responseData.state.response.data !== undefined) {
        var binary = '';
        var responseDataJson = commonFunction.convertToUint(responseData.state.response.data);
        console.log(responseDataJson);
        const attributes = responseDataJson.data.attr;

      }

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
console.log('====================================');
console.log("!11111111111111111111111111111111111111");
console.log('====================================');
// retrieveAttributes()  // retrieveAttributeList()
// .then(attributeList => {
//   attrListAttributeEdit = attributeList
//   //console.warn('received attribute list')
// })

const validateInch = (fractureStr) => {
  const fractureArr = fractureStr.split('/')
  if (fractureArr.length !== 2) return false
    const fracture = [ Number(fractureArr[0]), Number(fractureArr[1]) ]
  if (isNaN(fracture[0]) || isNaN(fracture[1])) return false
  if (!Number.isInteger(fracture[0]) || !Number.isInteger(fracture[1])) return false
  if (fracture[0] < 0 || fracture[1] < 2) return false
  if (fracture[0] < fracture[1] && Number.isInteger(Math.log2(fracture[1]))) return true
  return false
}

const validateValue = (attribute, value, strict=false) => {
  if (!isNaN(value)) return true // no unit ==> assume fav unit
  if (!strict && value === '.') return true

  const FULL = 0
  const VALUE = 1
  const UNIT = 2

  if(attribute.attrType === 'LENGTH') {
    const patternInch = strict
      ? /^([+-]?[0-9]*(?: ?[1-9][0-9]*\/[1-9][0-9]*)?) ?(")$/
      : /^([+-]?[0-9]*(?: ?[1-9][0-9]*\/?(?:[1-9][0-9]*)?)?) ?("?)$/
    const matchInch = patternInch.exec(value.toLowerCase().trim())
    if(matchInch !== null && matchInch.length === 3) { // handle inch
      if(!strict) return true
      const vals = matchInch[VALUE].split(' ')
      if(vals !== null) {
        if (vals.length === 1 && !isNaN(vals[0])) return true
        if (vals.length === 1 && isNaN(vals[0])) return validateInch(vals[0])
        if (vals.length === 2 && isNaN(vals[1])) return validateInch(vals[1])
      }
    }
  }
  // other units
  const pattern = strict
    ? /^([+-]?\d*\.?\d+) ?([^"]*)$/
    : /^([+-]?\d*\.?\d*) ?([^"]*)$/

  const match = pattern.exec(value.toLowerCase().trim())
  
  if(match !== null && match.length === 3) {
    if(match[UNIT] === 'inch' && strict) return false  //invalid unit string 'inch'

    
    const unitValues = attribute.unit.map(unit => unit.unitStr)
    if(
         ( strict && unitValues.includes(match[UNIT])
      || (!strict && unitValues.filter(unit => unit.startsWith(match[UNIT])).length > 0))
    ) {
      if(!isNaN(match[VALUE])) return true  // invalid / for decimal separator
    }
  }

  


  return false // all other cases
}

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

export default AttributeEdit