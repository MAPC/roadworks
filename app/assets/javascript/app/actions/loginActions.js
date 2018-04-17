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

export function loginUser(email, password) {
  return async (dispatch, getState) => {
    const response = await api.login(email, password);
    console.log(response);

    dispatch({ 
      type: types.LOGIN.FORM.RESET
    });
  };
}
