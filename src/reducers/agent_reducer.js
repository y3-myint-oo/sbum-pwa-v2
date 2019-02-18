
import agent_json from './agent_mock.json';
import { ADD_AGENT, DELETE_AGENT,UPDATE_AGENT,READ_AGENT } from '../actions/agent_action';

function agent(state =agent_json, action) {
    switch(action.type) {
        case ADD_AGENT:
            console.log("trying to add data",action.data);
            state = state.concat([action.data]); //Query logic may vary
            return state;
        case DELETE_AGENT:
            console.log("trying to remove data",action.data.id) 
            state = state.filter(data => data.id !== action.data.id);
            return state;
        case UPDATE_AGENT:
            return state;    
        case READ_AGENT:
            return state; 
      default: 
        return state;
    }
  }

  export default agent;