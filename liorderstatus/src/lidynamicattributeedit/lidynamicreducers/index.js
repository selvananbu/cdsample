import {combineReducers } from 'redux';
import LiAttrStore from './lidynamicattrstore';
import attributesReducer from './lidynamicattributesreducer'

const allReducers = combineReducers({
    attrStore: LiAttrStore
});

export default attributesReducer //allReducers;