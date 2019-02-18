
import warehouse_mock from './warehouse_mock.json';
import { ADD_WAREHOUSE, DELETE_WAREHOUSE,UPDATE_WAREHOUSE ,READ_WAREHOUSE} from '../actions/warehouse_action';


function warehouse(state = warehouse_mock, action) {
    switch(action.type) {
      case ADD_WAREHOUSE:            
            state = state.concat([action.data]); //Query logic may vary
        return state;
      case DELETE_WAREHOUSE:
            state = state.filter(data => data.id !== action.data.id);
        return state;  
      case UPDATE_WAREHOUSE:
        return state; 
      default: 
        return state;
    }
  }
 export default warehouse;