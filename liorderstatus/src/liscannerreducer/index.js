import { combineReducers } from "redux";
import ItemReady from './itemreadyreducer';

const allReducers = combineReducers({
    ItemReady : ItemReady,
});

export default allReducers;
