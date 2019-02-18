
import auth_json from './auth_mock.json';
import { LOGIN, LOGOUT } from '../actions/auth_action';

// User Authonization
let authData = {
  user:null,
};

function auth0(state = authData, action) {
    switch(action.type) {
      case LOGIN:
            console.log("trying to Login",action.data);
            console.log(" Registered users - ", state)
            console.log(" Console - ",auth_json);
            //state = state.concat([action.data]);
            //IF app is offline and already login - isAuth -> true
            //If app is offline and not login -  need to access internet to establish auth0
            //TODO: API Call to backend - auth0
            //const isAuth=state.find(user => user.userId === action.data.name)
            //return initialUsers.map((user)=>{
              if("admin" === action.data.name && "1234"=== action.data.pass) {
                console.log("success auth0")
                //authData.user=action.data
                return Object.assign({}, state, {
                  user: action.data
                });
              } else return state;
            //});            
      case LOGOUT:
            console.log("trying to Logout") 
            console.log(" Console - ",state);
            return Object.assign({}, state, {
              user: null
            });
      default: 
        return state;
    }
  }
  
  
  
  export default auth0;