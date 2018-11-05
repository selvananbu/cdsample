/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

import LiDynamicAttrEdit from './lidynamicattributeedit/lidynamiccontainers/lidynamicattrlabelview.js'
import MenuExample from './nativeconnector/menuconnector';

export default class LiOrderIntent extends Component {
  constructor(props){
    super(props);
    this.state={
      attrType:'LENGTH',
      count: 0
    }
  }


  onLongPressEvent(val){
    MenuExample.startOrderIntent(val);
  }

  render() {
      return (
        <TouchableOpacity onLongPress={() => this.onLongPressEvent(this.props.data)}>
          {this.props.children}
        </TouchableOpacity>
      );

  }
}
// LiOrderIntent.propTypes = {
//   orderNo: PropTypes.number.isRequired,
//   itemNo: PropTypes.number.isRequired,

// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    width:'100%',
    backgroundColor:'wheat'
  },
  pane: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
});
