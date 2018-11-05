import React from 'react'

import PropTypes from 'prop-types'

import { getBaseUnit } from '../../utils/convert';
import AttributeEdit from './AttributeEdit';


class AttributeEditState extends React.Component {
  constructor(props) {
    super(props)
    //console.warn(props.value)
    this.state = {
      value: ''
    }
  }

  onChangeEdit = (value) => {
    this.setState({
      value: value
    })
  }

  render() {
    return (
      <AttributeEdit {...this.props} value={null} initialValue={this.props.value} />
    )
  }
}

export default AttributeEditState