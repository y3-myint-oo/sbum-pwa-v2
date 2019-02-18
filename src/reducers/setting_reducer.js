

import { ADD_SETTING,REMOVE_SETTING, REQUEST_PAGE, NETWORK_STATUS, NAV_STATUS} from '../actions/setting_action';

//Better Way
/*let settingData = [
  {"language":"mm"},
  {"requestedPage":""}
]*/
let settingData = {
  language:"mm",
  requestedPage:"",
  isOnline:true,
  navIsOpen:false,
};
function setting(state = settingData, action) {
    switch(action.type) {
      case ADD_SETTING:
            console.log("trying to add setting",action.data);
        return state;
      case REMOVE_SETTING:
            console.log("trying to remove setting",action.data.id) 
           // state = state.filter(data => data.id !== action.data.id);
        return state;  
      case REQUEST_PAGE:
            console.log("trying to change page request with --- ", action.data)
            return Object.assign({}, state, {
              requestedPage: action.data
            });
      case NETWORK_STATUS:
            console.log("trying to change networkStatus", action.data)
            return Object.assign({}, state, {
              isOnline: action.data
            });
      case NAV_STATUS:
            console.log("trying to change navStatus",action.data)
            return Object.assign({}, state, {
              navIsOpen: action.data
            });      
      default: 
        return state;
    }
  }
export default setting;