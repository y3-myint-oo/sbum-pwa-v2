export const ADD_SUPPLYER = 'ADD_SUPPLYER';
export const DELETE_SUPPLYER = 'DELETE_SUPPLYER';
export const UPDATE_SUPPLYER = 'UPDATE_SUPPLYER';
export const READ_SUPPLYER = 'READ_SUPPLYER';

export function addSupplyer(data) {
    const action = {
      type: ADD_SUPPLYER,
      data
    }
    return action;
}
  
export function deleteSupplyer(data) {
    const action = {
      type: DELETE_SUPPLYER,
      data
    }
    return action;
}

export function updateSupplyer(data) {
    const action = {
      type: UPDATE_SUPPLYER,
      data
    }
    return action;
}

export function readSupplyer(data) {
    const action = {
      type: READ_SUPPLYER,
      data
    }
    return action;
}