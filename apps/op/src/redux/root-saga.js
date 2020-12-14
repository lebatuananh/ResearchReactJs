import { all } from 'redux-saga/effects';
import authSagas from '@shared/redux-admin/auth/saga';
import sPOrderSaga from './sPOrder/saga';

export default function* rootSaga(getState) {
  yield all([authSagas(), sPOrderSaga()]);
}
