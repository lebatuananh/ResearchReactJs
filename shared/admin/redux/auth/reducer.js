import actions from './actions';

const initState = { idToken: null };

export default function authReducer(state = initState, action) {
  // switch (action.type) {
  //   case actions.CHECK_AUTHORIZATION:
  //     return state;
  //   case actions.LOGIN_SUCCESS:
  //     return {
  //       idToken: action.token,
  //     };
  //   case actions.LOGOUT:
  //     return initState;
  //   default:
  //     return state;
  // }
  if (action.type === actions.CHECK_AUTHORIZATION) {
    return state;
  }
  if (action.type === actions.LOGIN_SUCCESS) {
    return { idToken: action.token };
  }
  if (action.type === actions.LOGOUT) {
    return initState;
  }
  return state;
}
