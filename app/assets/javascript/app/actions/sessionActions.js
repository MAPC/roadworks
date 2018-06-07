import api from './api';
import types from './types';
import Cookies from 'js-cookie';
import { push } from 'react-router-redux';

import {
  updateUsers,
  setAuthenticatedUser,
} from './userActions';

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
      dispatch(updateUsers([user]));
      dispatch(setAuthenticatedUser(user.id));
      dispatch(push(getState().router.location.pathname));
    }
  };
}

export function logout() {
  return async (dispatch) => {
    const res = await api.logout();

    // Reload if we have logged out to obtain fresh CSRF tokens.
    if (res.ok) {
      Cookies.remove((window.location.hostname == 'roadworks.mapc.org'
          ? '_my_app_session'
          : (window.location.hostname == 'staging.roadworks.mapc.org'
              ? '_my_app_session_staging'
              : '_my_app_session_development'
          )
      ), { path: '/', domain: window.location.hostname });
      window.location.reload();
    }
  };
}
