export const ADD_SETTING = 'ADD_SETTING';
export const REMOVE_SETTING = 'REMOVE_SETTING';
export const REQUEST_PAGE = 'REQUEST_PAGE';
export const GET_PAGES ='GET_PAGES';
export const NETWORK_STATUS='NETWORK_STATUS';
export const NAV_STATUS='NAV_STATUS';

export function addSetting(data) {
    const action = {
      type: ADD_SETTING,
      data
    }
    return action;
}
  
export function removeSetting(data) {
    const action = {
      type: REMOVE_SETTING,
      data
    }
    return action;
}

export function requestPage(data) {
  const action = {
    type: REQUEST_PAGE,
    data
  }
  return action;
}

export function networkStatus(data){
  const action = {
    type: NETWORK_STATUS,
    data
  }
  return action;
}

export function navStatus(data){
  const action = {
    type: NAV_STATUS,
    data
  }
  return action;
}
