export const ADD_EMPLOYEE = 'ADD_CAR';
export const DELETE_EMPLOYEE = 'LOGDELETE_CAROUT';
export const UPDATE_EMPLOYEE = 'UPDATE_CAR';
export const READ_EMPLOYEE = 'READ_CARS';

export function addEmployee(data) {
    const action = {
      type: ADD_EMPLOYEE,
      data
    }
    return action;
}
  
export function deleteEmployee(data) {
    const action = {
      type: DELETE_EMPLOYEE,
      data
    }
    return action;
}

export function updateEmployee(data) {
    const action = {
      type: UPDATE_EMPLOYEE,
      data
    }
    return action;
}

export function readEmployee(data) {
    const action = {
      type: READ_EMPLOYEE,
      data
    }
    return action;
}