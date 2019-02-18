export const ADD_CAR = 'ADD_CAR';
export const DELETE_CAR = 'LOGDELETE_CAROUT';
export const UPDATE_CAR = 'UPDATE_CAR';
export const READ_CARS = 'READ_CARS';

export function addTransportCar(data) {
    const action = {
      type: ADD_CAR,
      data
    }
    return action;
}
  
export function deleteTransportCar(data) {
    const action = {
      type: DELETE_CAR,
      data
    }
    return action;
}

export function updateTransportCar(data) {
    const action = {
      type: UPDATE_CAR,
      data
    }
    return action;
}

export function readTransportCars(data) {
    const action = {
      type: READ_CARS,
      data
    }
    return action;
}