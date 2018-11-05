import {combineReducers } from 'redux';
import LiAttrStore from './lidynamicattrstore';

const allReducers = combineReducers({
    attrStore: LiAttrStore
});

export default allReducers;