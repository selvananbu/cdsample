import { Provider } from 'react-redux';
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
import { createStore } from 'redux';
import React, { Component } from 'react';

import AttributeLabel from '../lidynamiccomponents/AttributeLabel';
import LiDynamicAttrLabel from '../lidynamiccomponents/lidynamicattrlabelmain';
import allReducers from '../lidynamicreducers/index';


class LiDynamicAttrLabeView extends Component {
    constructor(props) {
        super(props);
        this.state={
          store : createStore(allReducers)
        }
    }

    render() {
      // console.log(this.props.favUnitIdx,'sadsa');
        return (
            <View>
              <Provider store = {this.state.store}>
                  <View>
                    <LiDynamicAttrLabel style={styles.text} changeOpen={this.props.changeOpen} type={this.props.type} favUnitIdx={this.props.favUnitIdx} value={this.props.value} decimal={this.props.decimal}/>
                  </View>
              </Provider>
            </View>

        );
    }
}

export default LiDynamicAttrLabeView;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color:'black'
  },
});
