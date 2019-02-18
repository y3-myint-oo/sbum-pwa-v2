export const ADD_DATA = 'ADD_DATA';
export const REMOVE_DATA = 'REMOVE_DATA';

export function addData(data) {
    const action = {
      type: ADD_DATA,
      data,
      meta:{
        offline:{          
            // the network action to execute:
            effect: { url: 'http://localhost:3000/posts/1', method: 'GET', json: { data } },
            // action to dispatch when effect succeeds:
            commit: { type: 'FOLLOW_ADD_DATA', meta: { data } },
            // action to dispatch if network action fails permanently:
            rollback: { type: 'FOLLOW_ADD_DATA_ROLLBACK', meta: { data } }          
        }
      }
    }
    return action;
}
  
export function removeData(data) {
    const action = {
      type: REMOVE_DATA,
      data
    }
    return action;
}