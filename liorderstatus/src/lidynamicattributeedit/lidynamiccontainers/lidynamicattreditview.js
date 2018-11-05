import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from '../lidynamicreducers/index';
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
import LiDynamicAttrEdit from '../lidynamiccomponents/lidynamicattreditmain';


class LiDynamicAttrEditView extends Component {
    constructor(props) {
        super(props);

        this.state={
            store : createStore(allReducers)

        }
    }

    render() {
        return (
            <View>
            <Provider store = {this.state.store}>
                <View>
                <LiDynamicAttrEdit changeOpen={this.props.changeOpen} type={this.props.type} favUnitIdx={this.props.favUnitIdx} value={this.props.value} decimal={this.props.decimal}/>
                </View>
            </Provider>
            </View>

        );
    }
}

export default LiDynamicAttrEditView;
