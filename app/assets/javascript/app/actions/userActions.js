import api from './api';
import types from './types';

export function updateUser(user) {
  return {
    type: types.USER.UPDATE,
    user,
  };
}

export function login(email, password) {
  return aysnc (dispatch, getState) => {
    const response = await api.login(email, password);
    const result = await response.json();

    dispatch(updateUser(result.data));
  };
}
