import { combineReducers } from 'redux';
import datas from './data_reducer';
import auth0 from './auth_reducer';
import setting from './setting_reducer';
import features from './features_reducer';

const rootReducer = combineReducers({
    datas,
    auth0,
    setting,
    features
})
export default rootReducer;