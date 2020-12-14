import { all, takeEvery, takeLatest, put, call, fork } from 'redux-saga/effects';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';
import actions from './actions';
import service from '@shared/services/master/list/countryService';
import modelHelper from '@shared/lib/helpers/modelHelper';

//#region Init
export function* initGet() {
  try {
    let [resGlobalZones] = yield call(initGetDataAsync);
    yield put(actions.initSet({ globalZones: resGlobalZones.data }));
    yield put(actions.initSetSuccess());
  } catch (error) {
    yield put(actions.initGetError(error.message));
    yield put(actions.initReset());
  }
}
async function initGetDataAsync() {
  return await Promise.all([service.getGlobalZonesPromise(false)]);
}
//#endregion

//#region Create
export function* createGet() {
  try {
    let result = yield call(service.createGetModelAsync);
    if (!result?.data) {
      yield put(actions.createGetError(intl.formatMessage({ id: 'common.notify.error.noResults' })));
      yield put(actions.createReset());
    } else if (result.success) {
      let model = result.data;
      yield put(actions.createSet(model));
      yield put(actions.createSetSuccess());
    } else {
      yield put(actions.createGetError(result.message));
      yield put(actions.createReset());
    }
  } catch (error) {
    yield put(actions.createGetError(error.message));
    yield put(actions.createReset());
  }
}

export function* createPost(data) {
  try {
    let result = yield call(service.createPostModelAsync, data.payload);
    if (!result) {
      yield put(actions.createPostError(intl.formatMessage({ id: 'common.notify.error.noResults' })));
      yield put(actions.createReset());
    } else if (result.success) {
      yield put(actions.createPostSuccess(result));
      yield put(actions.createReset());
      yield put(actions.grdLoading(true));
      yield put(actions.grdLoading(false));
      yield put(actions.createClose());
    } else {
      const errors = modelHelper.parseErrors(result);
      yield put(actions.createPostError(errors));
      yield put(actions.createResetError());
    }
  } catch (error) {
    yield put(actions.createPostError(error.message));
    yield put(actions.createReset());
  }
}
//#endregion

//#region Edit
export function* editGet(data) {
  try {
    let result = yield call(service.editGetModelAsync, data.payload);
    if (!result?.data) {
      yield put(actions.editGetError(intl.formatMessage({ id: 'common.notify.error.noResults' })));
      yield put(actions.editReset());
    } else if (result.success) {
      let model = result.data;
      yield put(actions.editSet(model));
      yield put(actions.editSetSuccess());
    } else {
      yield put(actions.editGetError(result.message));
      yield put(actions.editReset());
    }
  } catch (error) {
    yield put(actions.editGetError(error.message));
    yield put(actions.editReset());
  }
}

export function* editPost(data) {
  try {
    let result = yield call(service.editPostModelAsync, data.payload);
    if (!result) {
      yield put(actions.editPostError(intl.formatMessage({ id: 'common.notify.error.noResults' })));
      yield put(actions.editReset());
    } else if (result.success) {
      yield put(actions.editPostSuccess(result));
      yield put(actions.editReset());
      yield put(actions.grdLoading(true));
      yield put(actions.grdLoading(false));
      yield put(actions.editClose());
    } else {
      const errors = modelHelper.parseErrors(result);
      yield put(actions.editPostError(errors));
      yield put(actions.editResetError());
    }
  } catch (error) {
    yield put(actions.editPostError(error.message));
    yield put(actions.editReset());
  }
}
//#endregion

//#region Deletes
export function* deletesPost(data) {
  try {
    let result = yield call(service.deletesPostModelAsync, data.payload);
    if (!result) {
      yield put(actions.deletesPostError(intl.formatMessage({ id: 'common.notify.error.noResults' })));
      yield put(actions.deletesReset());
    } else if (result.success) {
      yield put(actions.deletesPostSuccess(result));
      yield put(actions.deletesReset());
      yield put(actions.grdLoading(true));
      yield put(actions.grdLoading(false));
      yield put(actions.deletesClose());
    } else {
      yield put(actions.deletesPostError(result.message));
      yield put(actions.deletesReset());
    }
  } catch (error) {
    yield put(actions.deletesPostError(error.message));
    yield put(actions.deletesReset());
  }
}
//#endregion

//#region Activates/Deactivates
export function* activatesPost(data) {
  try {
    let result = yield call(service.activatesPostModelAsync, data.payload);
    if (!result) {
      yield put(actions.activatesPostError(intl.formatMessage({ id: 'common.notify.error.noResults' })));
      yield put(actions.activatesReset());
    } else if (result.success) {
      yield put(actions.activatesPostSuccess(result));
      yield put(actions.activatesReset());
      yield put(actions.grdLoading(true));
      yield put(actions.grdLoading(false));
    } else {
      yield put(actions.activatesPostError(result.message));
      yield put(actions.activatesReset());
    }
  } catch (error) {
    yield put(actions.activatesPostError(error.message));
    yield put(actions.activatesReset());
  }
}
//#endregion

export default function* countrySaga() {
  yield all([
    yield takeLatest(actions.CREATE_GET, createGet),
    yield takeLatest(actions.CREATE_POST, createPost),
    yield takeLatest(actions.EDIT_GET, editGet),
    yield takeLatest(actions.EDIT_POST, editPost),
    yield takeLatest(actions.DELETES_POST, deletesPost),
    yield takeLatest(actions.ACTIVATES_POST, activatesPost),
    yield takeLatest(actions.INIT_GET, initGet),
  ]);
}
