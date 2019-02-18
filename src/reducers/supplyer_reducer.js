
import supplyer_mock from './supplyer_mock.json';
import { ADD_SUPPLYER, DELETE_SUPPLYER,UPDATE_SUPPLYER,READ_SUPPLYER } from '../actions/supplyer_action';

function supplyer(state = supplyer_mock, action) {
    switch(action.type) {
      case ADD_SUPPLYER:
            state = state.concat([action.data]); //Query logic may vary
        return state;
      case DELETE_SUPPLYER:
            state = state.filter(data => data.id !== action.data.id);
        return state;  
      case UPDATE_SUPPLYER:
        return state; 
      case READ_SUPPLYER:
        return state; 
      default: 
        return state;
    }
  }
  

  /*
  return state.map((post)=>{
        if(post.id === action.id) {
          return {
             ...post,
             title:action.data.newTitle,
             message:action.data.newMessage,
             editing: !post.editing
          }
        } else return post;
})
  */
  export default supplyer;