import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
// import TextField from 'material-ui/TextField';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  BackHandler,
  TextInput,
  TouchableHighlight,
  ScrollView} from 'react-native';

import axios from 'axios';
import * as LiAttributeActions from '../lidynamicactions/lidynamicattreditaction';

class LiDynamicAttrEdit extends Component {

    constructor(props) {
        super(props);
        this.isOpen = this.props.changeOpen;
        this.state={
            edit: false
        }
    }

    componentDidMount(){
        var favIndx = this.props.favUnitIdx, decimal = this.props.decimal;
        if(favIndx === undefined){
            favIndx = null;
        }
        if(decimal === undefined){
            decimal = null;
        }
        var self = this;
        // if(localStorage.getItem('attribute') === null || localStorage.getItem('attribute') === undefined){
        // axios.get('./attribute.json').then(function(response) {
        //   //         localStorage.setItem('attribute', JSON.stringify(response.data));
        //   self.props.initAttribute(self.props.type, self.props.value, decimal, response.data.attr);
        // })
        // if(localStorage.getItem('attribute') === null || localStorage.getItem('attribute') === undefined){
        //     axios.get('http://swpdmsrv4.lisec.internal:18707/openapi/DEMO/PROD/search/attributes').then(function(response) {
        //         localStorage.setItem('attribute', JSON.stringify(response.data));
        //         self.props.initAttribute(self.props.type, self.props.value, decimal, response.data.attr);
        //     })
        //     .catch(function(err) {
        //         console.log(err,'error');
        //     })
        // }
        // else{
        //     self.props.initAttribute(self.props.type, self.props.value, decimal, JSON.parse(localStorage.getItem('attribute')).attr);
        // }


        console.log("Coming Hereeeeeeeeeeee");

        _retrieveData = async () => {
          try {
            const value = await AsyncStorage.getItem('attribute');
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",value);
            if (value !== null) {
              // We have data!!
              console.log(value);
            }
            else{
              axios.get('http://swpdmsrv4.lisec.internal:18707/openapi/DEMO/PROD/search/attributes').then(function(response) {

                _storeData = async () => {
                  try {
                    await AsyncStorage.setItem('attribute', JSON.stringify(response.data));
                  } catch (error) {
                    // Error saving data
                  }
                }
                self.props.initAttribute(self.props.type, self.props.value, decimal, response.data.attr);
              })
              .catch(function(err) {
                console.log(err,'error');
              })
            }
          } catch (error) {
            // Error retrieving data
          }
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.attrStore.attrFavIndex !== localStorage[nextProps.attrStore.attrType] && localStorage[nextProps.attrStore.attrType] !== undefined){
            this.props.setFavIndex(localStorage[nextProps.attrStore.attrType]);
        }
        if(nextProps.attrStore.attrType !== '' && nextProps.attrStore.attrValue !== "" && this.props.value === nextProps.attrStore.attrValue && !this.state.edit && localStorage[nextProps.attrStore.attrType] === undefined){
            this.props.convertToFav();
        }
    }

    setValue(ev, newValue){
        this.props.setAttrValue(newValue);
    }

    restrict(ev){
        this.props.restrictAttrValue(ev)
    }

    convertType(){
        this.props.convertToFav();
    }

    render() {
        return (
            <TextInput id="LiAttributeEdit_field"
            onChange = {(event, newValue) => this.setValue(event, newValue)}
            value =  {this.props.attrStore.attrValue === undefined ? '' : this.props.attrStore.attrValue}
            inputStyle={{fontSize: '13px', width:"inherit"}}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        attrStore: state.attrStore
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        setAttrValue: LiAttributeActions.setAttrValue,
        restrictAttrValue: LiAttributeActions.restrictAttrValue,
        initAttribute: LiAttributeActions.initAttribute,
        convertToFav: LiAttributeActions.convertToFav,
        setFavIndex: LiAttributeActions.setFavIndex,
    },dispatch)
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(LiDynamicAttrEdit);
