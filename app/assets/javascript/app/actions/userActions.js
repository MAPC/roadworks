import api from './api';
import types from './types';

export function updateUsers(users) {
  return {
    type: types.USER.BATCH_UPDATE,
    users,
  };
}
