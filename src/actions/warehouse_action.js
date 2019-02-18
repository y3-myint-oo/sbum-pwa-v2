export const ADD_WAREHOUSE = 'ADD_WAREHOUSE';
export const DELETE_WAREHOUSE = 'DELETE_WAREHOUSE';
export const UPDATE_WAREHOUSE = 'UPDATE_WAREHOUSE';
export const READ_WAREHOUSE = 'READ_WAREHOUSE';

export function addWarehouse(data) {
    const action = {
      type: ADD_WAREHOUSE,
      data
    }
    return action;
}
  
export function deleteWarehouse(data) {
    const action = {
      type: DELETE_WAREHOUSE,
      data
    }
    return action;
}

export function updateWarehouse(data) {
    const action = {
      type: UPDATE_WAREHOUSE,
      data
    }
    return action;
}

export function readWarehouse(data) {
    const action = {
      type: READ_WAREHOUSE,
      data
    }
    return action;
}