
import mock_json from './data_mock.json';
import { ADD_DATA, REMOVE_DATA } from '../actions/data_action';

function datas(state = mock_json, action) {
    switch(action.type) {
      case ADD_DATA:
            console.log("trying to add data",action.data);
            state = state.concat([action.data]); //Query logic may vary
        return state;
      case 'FOLLOW_ADD_DATA':
            console.log("action to dispatch when effect succeeds:")
        return { ...state, [action.data]: true };   
      case 'FOLLOW_ADD_DATA_ROLLBACK':
            console.log("action to dispatch if network action fails permanently:")
        return state;
      case REMOVE_DATA:
            console.log("trying to remove data",action.data.id) 
            state = state.filter(data => data.id !== action.data.id);
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
  export default datas;