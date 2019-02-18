
import employee_mock from './employee_mock.json';
import { ADD_EMPLOYEE, DELETE_EMPLOYEE,UPDATE_EMPLOYEE,READ_EMPLOYEE} from '../actions/employee_action';

function datas(state = employee_mock, action) {
    switch(action.type) {
      case ADD_EMPLOYEE:
            state = state.concat([action.data]); //Query logic may vary
        return state;
      case DELETE_EMPLOYEE:
            state = state.filter(data => data.id !== action.data.id);
        return state;  
      case UPDATE_EMPLOYEE:
        return state;
      case READ_EMPLOYEE:
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