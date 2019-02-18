export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(data) {
    const action = {
      type: LOGIN,
      data
    }
    return action;
}
  
export function logout(data) {
    const action = {
      type: LOGOUT,
      data
    }
    return action;
}