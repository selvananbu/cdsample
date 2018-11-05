import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  BackHandler,
  TextInput,
  Text,
  TouchableHighlight,
  AsyncStorage,
  ScrollView
} from 'react-native';
import axios from 'axios';
import * as LiAttributeActions from '../lidynamicactions/lidynamicattreditaction';
import  {AttributeData} from '../../attribute.js';

class LiDynamicAttrLabel extends Component {

  constructor(props) {
    super(props);
    this.state={
      edit: false
    }
  }

  componentWillReceiveProps(nextProps){
      //console.log(nextProps.favUnitIdx,'inside receive');
  }

  componentWillUpdate(nextProps, nextState){
    // console.log(nextProps,'inside receive');
    //   var favIndx = nextProps.favUnitIdx, decimal = nextProps.decimal;
    //   console.log(favIndx,'inside Check');
    //   if(favIndx === undefined){
    //     favIndx = null;
    //   }
    //   if(decimal === undefined){
    //     decimal = null;
    //   }
    //   var self = this;
    // this.props.initAttribute(nextProps.type, nextProps.value, favIndx, decimal, JSON.parse(value).attr);`
      //this.props.setFavIndex(parseInt(nextProps.favUnitIdx))
  }

  componentDidMount() {
    console.warn('asf'); 

    var favIndx = this.props.favUnitIdx, decimal = this.props.decimal;
    // console.log(favIndx,'inside Check');
    if (favIndx === undefined) {
      favIndx = null;
    }
    if (decimal === undefined) {
      decimal = null;
    }
    var self = this;  // when to use self vs. this?

    _retrieveData  = () => {

      //first check store

      // try {
      AsyncStorage.getItem('attribute').then((value) => {
        // console.log("Came Here",value);
        if(value != null){

          self.props.initAttribute(self.props.type, self.props.value, decimal, JSON.parse(value).attr);

          if (JSON.parse(value) !== undefined) {
              // console.log("$$$$$$$",this.props.attrStore.attrType);
            // JSON.parse(value).attr.map((item, innervalue) => {
            //   // console.log("###############",item);
            //   // _retrieveData = () => {
                AsyncStorage.getItem(this.props.attrStore.attrType).then((innerVal) => { // also do this in store (probably quicker)
                  if (innerVal !== null) {
                      // console.log("###############",item.attrType,this.props.attrStore.attrType);
                    // if (this.props.type === item.attrType){
                      self.props.setFavIndex(parseInt(innerVal));
                    // }
                }
              });
            // });
            //self.props.setFavIndex(0);
              // self.props.convertToFav()
          }
          else { // gets .0 and unit after a delay
              console.warn('asd'); 
            
            axios.get('http://swpdmsrv4.lisec.internal:18707/openapi/DEMO/PROD/search/attributes')
            .then(function(response) {
              AsyncStorage.setItem('attribute', JSON.stringify(response.data))
              .then((value) => {
                self.props.initAttribute(self.props.type, self.props.value, decimal, response.data.attr);
                self.props.convertToFav()

              });
            });
            /* //needs to be tested (units don't show)
            axios.get('http://swpdmsrv4.lisec.internal:18707/openapi/DEMO/PROD/search/attributes')
            .then(res => JSON.stringify(res.data))
            .then(data => {
              AsyncStorage.setItem('attribute', data)
              console.warn(data)
              self.props.initAttribute(self.props.type, self.props.value, decimal, data.attr);
              self.props.convertToFav()
            })*/
          }
        }
      });
    }

        //     if (value !== null) {
        //       // We have data!!
        //
        //       console.log("###############",AsyncStorage.getItem('attribute'));
        //       self.props.initAttribute(self.props.type, self.props.value, decimal, JSON.parse(value).attr);
        //
        //       if (JSON.parse(value) !== undefined) {
        //         JSON.parse(value).attr.map((item, innervalue) => {
        //           _retrieveData = () => {
        //             try {
        //
        //               const unitValue =  AsyncStorage.getItem(item.attrType);
        //               if (unitValue !== null) {
        //                 if (this.props.type === item.attrType){
        //                   this.props.setFavIndex(parseInt(unitValue));
        //                 }
        //
        //               }
        //             }
        //             catch (error) {
        //             }
        //           }
        //           _retrieveData();
        //         });
        //       }
        //     }
        //     else{
        //
        //
        //       axios.get('http://swpdmsrv4.lisec.internal:18707/openapi/DEMO/PROD/search/attributes').then(function(response) {
        //
        //                           console.log("@@@@@@@@@@@@@@@","Came Here");
        //         _storeData = () => {
        //           try {
        //
        //             console.log("###############","RESPONSEEEEEEEEEE");
        //             AsyncStorage.setItem('attribute', JSON.stringify(response.data));
        //           } catch (error) {
        //           }
        //         }
        //         self.props.initAttribute(self.props.type, self.props.value, decimal, response.data.attr);
        //       })
        //       .catch(function(err) {
        //         console.log(err,'error');
        //       })
        //     }
        //   }
        //   catch (error) {
        //   }
        // }
        _retrieveData();
      }
      componentWillReceiveProps(nextProps){

        //     _retrieveData = async () => {
        //       try {
        //        const value = await AsyncStorage.getItem('attribute');
        //         // if (value !== null) {
        //           // We have data!!
        //           console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",value);
        //           // self.props.initAttribute(self.props.type, self.props.value, decimal, JSON.parse(value).attr);
        //         // }
        //       }
        //       catch (error) {
        //       }
        //     }
        // _retrieveData();
        //     if(nextProps.attrStore.attrFavIndex !== value[nextProps.attrStore.attrType] && value[nextProps.attrStore.attrType] !== undefined){
        //         console.log('check/*');
        //         this.props.setFavIndex(value[nextProps.attrStore.attrType]);
        //     }
        //     if(nextProps.attrStore.attrType !== '' && nextProps.attrStore.attrValue !== "" && this.props.value === nextProps.attrStore.attrValue && !this.state.edit){
        //       this.props.convertToFav();
        //     }
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
        // console.log('innnnn');
        return (
          <Text style={styles.text}>{this.props.attrStore.attrValue}</Text>

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
    )(LiDynamicAttrLabel);


    const styles = StyleSheet.create({
      text: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        color:'black'
      },
    });
