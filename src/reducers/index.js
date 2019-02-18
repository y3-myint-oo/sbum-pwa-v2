import { combineReducers } from 'redux';
import datas from './data_reducer';
import auth0 from './auth_reducer';
import setting from './setting_reducer';
import features from './features_reducer';
import transport from './transport_reducer';
import warehouse from './warehouse_reducer';
import supplyer from './supplyer_reducer';
import employee from './employee_reducer';
import agent from './agent_reducer';

const rootReducer = combineReducers({
    datas,
    auth0,
    setting,
    features,
    transport,
    warehouse,
    supplyer,
    employee,
    agent
})
export default rootReducer;