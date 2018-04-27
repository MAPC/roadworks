import types from './types';
import api from './api';

import { updateUsers } from './userActions';

export function newContributorNameChange(newContributorName) {
  return {
    type: types.CONTRIBUTOR_FORM.NEW_CONTRIBUTOR_NAME.CHANGE,
    newContributorName,
  };
}

export function contributorRegenerateToken(id) {
  return async (dispatch, getState) => {
    dispatch(contributorFormSetPending(true));
    const updatedUser = await api.updateContributor(id);
    if (updatedUser) {
      dispatch(updateUsers([updatedUser]));
    }
    return dispatch(contributorFormSetPending(false));
  };
}

export function contributorFormSetPending(isPending) {
  return {
    type: types.CONTRIBUTOR_FORM.SET_PENDING,
    isPending,
  };
}

export function contributorFormReset() {
  return {
    type: types.CONTRIBUTOR_FORM.RESET,
  };
}

export function contributorUnlock(id) {
  return {
    type: types.CONTRIBUTOR_FORM.SET_UNLOCKED_CONTRIBUTOR,
    id,
  };
}

export function contributorCreateNew() {
  return async (dispatch, getState) => {
    dispatch(contributorFormSetPending(true));
    const name = getState().contributorForm.newContributorName;
    const newUser = await api.createContributor(name);
    if (newUser) {
      dispatch(updateUsers([newUser]));
      dispatch(contributorFormReset());
    }
    return dispatch(contributorFormSetPending(false));
  };
}
