import api from './api';
import types from './types';

export function updateUser(user) {
  return {
    type: types.USER.UPDATE,
    user,
  };
}
