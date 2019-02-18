export const ADD_AGENT= 'ADD_AGENT';
export const DELETE_AGENT = 'DELETE_SUPPLYER';
export const UPDATE_AGENT = 'UPDATE_SUPPLYER';
export const READ_AGENT = 'READ_SUPPLYER';

export function addAgent(data) {
    const action = {
      type: ADD_AGENT,
      data
    }
    return action;
}
  
export function deleteAgent(data) {
    const action = {
      type: DELETE_AGENT,
      data
    }
    return action;
}

export function updateAgent(data) {
    const action = {
      type: UPDATE_AGENT,
      data
    }
    return action;
}

export function readAgent(data) {
    const action = {
      type: READ_AGENT,
      data
    }
    return action;
}