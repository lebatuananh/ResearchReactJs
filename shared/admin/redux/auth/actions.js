const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (token = false) => ({
    type: actions.LOGIN_REQUEST,
    payload: { token },
  }),
  loginSuccess: (token) => ({
    type: actions.LOGIN_SUCCESS,
    payload: { token },
  }),
  logout: (ssoConfig) => ({
    type: actions.LOGOUT,
    payload: { ssoConfig }
  }),
};
export default actions;
