import api from './api';
import types from './types';

export function updateUsers(users) {
  return {
    type: types.USER.BATCH_UPDATE,
    users,
  };
}

export function setAuthenticatedUser(id) {
  return {
    type: types.USER.SET_AUTHENTICATED_USER,
    id,
  }
}
