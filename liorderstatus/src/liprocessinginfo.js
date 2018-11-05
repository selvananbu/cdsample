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
  ScrollView} from 'react-native';
  import { Container, Header, Content, ListItem, Text,Card, CardItem, Body } from 'native-base';
  import LiMultiTerm from './lib/limultiterm';
  const muobj = new LiMultiTerm("", "");


  export default class LiProcessingInfo extends Component {
    constructor(props){
      super(props)
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
  componentWillMount(){
    muobj.setupText();
  }


    renderSeparator = () => (
      <View
        style={{
          height:1,
          width:"100%",
          backgroundColor:"#CED0CE",
        }}
      />
    );

    render() {
      var orderNo = ' ';
      var width = '';
      var height = '';
      var shpNumbr = '';
      var isoffsetAvailable = false;
      var itemNo = 0;
      var test = [];
      var innerTest = [];

      {this.props.itemDetails.item.map((value,index) => {
            var test = value;
            if(test !== undefined){
              {
                console.log("Hereee");
                test.buildup.map((innervalue,index) => {
                    var innerTest = innervalue.processing;
                    if(innerTest !== undefined){
                      innerTest.map((innervalue1,index) => {
                          console.log("Testtt",innervalue1.code);
                      });
                    }
                });
              }
            }
        });

      }

      orderNo = this.props.itemDetails.ordNo;
      var pane = -1;
      var comp = -1;
      var isNoDataAvail = true;
      return (
        <View style={styles.container}>
          <TouchableOpacity style = {styles.header}>
            <Text style = {styles.headerText}>
               <LiMultiTerm textId="99028768" textVal="Processing Info"/> - {orderNo}
            </Text>
          </TouchableOpacity>
          {this.props.itemDetails.item !== undefined ?
            // <FlatList
            //   data=
            <View>
              {this.props.itemDetails.item.map((item,index) => {
              // ItemSeparatorComponent={this.renderSeparator}
              // keyExtractor={(item, index) => index}
              // renderItem={({item , separators}) => (
                return(<TouchableOpacity key={index}>
                 
                   {/* {item.buildup!== undefined ?
                   
                    :
                    <View/>} */}
                    {item.buildup!== undefined ?
                      (item.buildup.map((value,item) => {
                        pane = value.pane;
                        comp = value.comp;
                        return(
                            <View styles={{flex: 1, flexDirection: 'row'}} key={item}>
                              <View styles={{width:'20%'}}>
                                {value.processing!== undefined ?(
                                  value.processing.map((value,item) => {
                                    isNoDataAvail = false;
                                    return(
                                      item === 0
                                      ?
                                      <View style={styles.flatview}>
                                    <View key={item}>
                                      <Text style={styles.pane}>
                                      {pane}/{comp}:  {value.code} - {value.desc} ({value.shDesc})
                                      </Text>
                                    </View>
                                    </View>
                                      :
                                       <View key={item}>
                                      <Text style={styles.pane}>
                                      {pane}/{comp}:  {value.code} - {value.desc} ({value.shDesc})
                                      </Text>
                                    </View>
                                    )
                                  })
                                )
                                  :
                                  <View/>
                                }
                              </View>
                            </View>
                          );
                        }
                      )
                    ) : <View/>}

                </TouchableOpacity>);
              })}
              {isNoDataAvail === true
              ?
                 <View style={{width:'95%',height:'95%',alignItems: 'center',justifyContent: 'center'}}>
                  <Text>
                      <LiMultiTerm textId="8005669" textVal="No Data available"/> 
                  </Text>
               </View>
              :
              <View/>
              }
              </View>
            : <View/> }
          </View>
        );
         
      }
     
    }



    const styles = StyleSheet.create({
      containerPlain: {
        backgroundColor:'#F5FCFF',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
      },
      stretch: {
        width:30,
        height:30
      },
      flatview: {
        justifyContent: 'center',
        padding:2,
        borderRadius: 2,
      },
      container: {
        flex: 1,
        height:'100%',
        width:'100%'
      },
      items: {
        flexDirection:'row',
        padding:10,
        borderTopWidth:0.5,
        borderBottomWidth:0.5,
      },
       header: {
    backgroundColor: '#595959',
    padding:5,
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
      color: '#fff',
      fontSize: 22,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Cochin',
      paddingBottom: 5
    },
      orderno: {
        backgroundColor:'#aeaeae',
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
