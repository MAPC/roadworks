import api from './api';
import types from './types';
import Cookies from 'js-cookie';
import { push } from 'react-router-redux';


export function onEmailChange(email) {
  return {
    type: types.LOGIN_FORM.EMAIL.CHANGE,
    email
  };
}

export function onPasswordChange(password) {
  return {
    type: types.LOGIN_FORM.PASSWORD.CHANGE,
    password
  };
}

export function login(email, password) {
  return async (dispatch, getState) => {
    const user = await api.login(email, password);

    if (user) {
      dispatch({
        type: types.USER.UPDATE,
        user,
      });
      dispatch(push(getState().router.location.pathname));
    }
  };
}

export function logout() {
  return async (dispatch) => {
    const res = await api.logout();

    // Reload if we have logged out to obtain fresh CSRF tokens.
    if (res.ok) {
      Cookies.remove('_my_app_session', { path: '/', domain: window.location.hostname });
      window.location.reload();
    }
  };
}
