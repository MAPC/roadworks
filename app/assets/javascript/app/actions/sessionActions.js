import api from './api';
import types from './types';


export function onEmailChange(email) {
  return {
    type: types.LOGIN.FORM.EMAIL.CHANGE,
    email
  };
}

export function onPasswordChange(password) {
  return {
    type: types.LOGIN.FORM.PASSWORD.CHANGE, 
    password
  };
}

export function login(email, password) {
  return async (dispatch) => {
    const user = await api.login(email, password);

    if (user) {
      dispatch({
        type: types.USER.UPDATE,
        user,
      });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    const res = await api.logout();

    // Reload if we have logged out to obtain fresh CSRF tokens.
    if (res.ok) {
      window.location.reload();
    }
  };
}
