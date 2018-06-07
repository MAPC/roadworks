import types from '../actions/types';

function userReducer(state = {
  id: window.currentUser ? window.currentUser.id : null,
  cache: window.currentUser
      ? { [window.currentUser.id]: window.currentUser }
      : {},
}, action) {
  let newCache;
  let cachePartial;
  switch (action.type) {
    case types.USER.BATCH_UPDATE:
      const newCache = action.users.reduce((cache, user) => Object.assign({}, cache, {
        [user.id]: user,
      }), state.cache);
      return Object.assign({}, state, { cache: newCache });
    case types.USER.SET_AUTHENTICATED_USER:
      return Object.assign({}, state, { id: action.id });
    default:
      return state;
  }

}

export default userReducer;
