import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';
import Oidc from 'oidc-client';

import { getToken, clearToken } from '@shared/lib/helpers/utility';
import authHelper from '@shared/lib/helpers/authHelper';
import actions from './actions';

const history = createBrowserHistory();
const fakeApiCall = true; // auth0 or express JWT

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function* ({ payload }) {
    const { token } = payload;
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: token,
        profile: 'Profile',
      });
    } else {
      if (fakeApiCall) {
        yield put({
          type: actions.LOGIN_SUCCESS,
          token: 'secret token',
          profile: 'Profile',
        });
      } else {
        yield put({ type: actions.LOGIN_ERROR });
      }
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    //yield localStorage.setItem('id_token', payload.token);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () { });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* ({ payload }) {
    const { ssoConfig } = payload;
    //yield clearToken();
    //history.push('/');
    yield authHelper.clearSession();
    var userMng = new Oidc.UserManager(ssoConfig);
    userMng.signoutRedirect();
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken().get('idToken');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile',
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
