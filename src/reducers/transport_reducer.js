
import transport_mock from './transport_mock.json';
import { ADD_CAR, DELETE_CAR } from '../actions/transport_action';

function transport(state = transport_mock, action) {
    switch(action.type) {
      case ADD_CAR:
            console.log("trying to add data",action.data);
            state = state.concat([action.data]); //Query logic may vary
        return state;
      case DELETE_CAR:
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
  export default transport;