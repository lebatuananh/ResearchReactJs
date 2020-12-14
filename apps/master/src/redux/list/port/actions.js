const actions = {
  //#region const
  // Create
  CREATE_GET: 'PORT/CREATE_GET',
  CREATE_GET_ERROR: 'PORT/CREATE_GET_ERROR',
  CREATE_SET: 'PORT/CREATE_SET',
  CREATE_SET_SUCCESS: 'PORT/CREATE_SET_SUCCESS',
  CREATE_POST: 'PORT/CREATE_POST',
  CREATE_POST_SUCCESS: 'PORT/CREATE_POST_SUCCESS',
  CREATE_POST_ERROR: 'PORT/CREATE_POST_ERROR',
  CREATE_CLOSE: 'PORT/CREATE_CLOSE',
  CREATE_RESET_ERROR: 'PORT/CREATE_RESET_ERROR',
  CREATE_RESET: 'PORT/CREATE_RESET',
  CREATE_COUNTRY_CHANGE: 'PORT/CREATE_COUNTRY_CHANGE',
  CREATE_STATE_PROVINCE_SET: 'PORT/CREATE_STATE_PROVINCE_SET',
  CREATE_STATE_PROVINCE_SET_SUCCESS: 'PORT/CREATE_STATE_PROVINCE_SET_SUCCESS',
  CREATE_STATE_PROVINCE_SET_ERROR: 'PORT/CREATE_STATE_PROVINCE_SET_ERROR',
  CREATE_STATE_PROVINCE_RESET_ERROR: 'PORT/CREATE_STATE_PROVINCE_RESET_ERROR',

  // Edit
  EDIT_GET: 'PORT/EDIT_GET',
  EDIT_GET_ERROR: 'PORT/EDIT_GET_ERROR',
  EDIT_SET: 'PORT/EDIT_SET',
  EDIT_SET_SUCCESS: 'PORT/EDIT_SET_SUCCESS',
  EDIT_POST: 'PORT/EDIT_POST',
  EDIT_POST_SUCCESS: 'PORT/EDIT_POST_SUCCESS',
  EDIT_POST_ERROR: 'PORT/EDIT_POST_ERROR',
  EDIT_CLOSE: 'PORT/EDIT_CLOSE',
  EDIT_RESET_ERROR: 'PORT/EDIT_RESET_ERROR',
  EDIT_RESET: 'PORT/EDIT_RESET',
  EDIT_COUNTRY_CHANGE: 'PORT/EDIT_COUNTRY_CHANGE',
  EDIT_STATE_PROVINCE_SET: 'PORT/EDIT_STATE_PROVINCE_SET',
  EDIT_STATE_PROVINCE_SET_SUCCESS: 'PORT/EDIT_STATE_PROVINCE_SET_SUCCESS',
  EDIT_STATE_PROVINCE_SET_ERROR: 'PORT/EDIT_STATE_PROVINCE_SET_ERROR',
  EDIT_STATE_PROVINCE_RESET_ERROR: 'PORT/EDIT_STATE_PROVINCE_RESET_ERROR',

  // Deletes
  DELETES_GET: 'PORT/DELETES_GET',
  DELETES_POST: 'PORT/DELETES_POST',
  DELETES_POST_SUCCESS: 'PORT/DELETES_POST_SUCCESS',
  DELETES_POST_ERROR: 'PORT/DELETES_POST_ERROR',
  DELETES_CLOSE: 'PORT/DELETES_CLOSE',
  DELETES_RESET: 'PORT/DELETES_RESET',

  // Activates/Deactivates
  ACTIVATES_POST: 'PORT/ACTIVATES_POST',
  ACTIVATES_POST_SUCCESS: 'PORT/ACTIVATES_POST_SUCCESS',
  ACTIVATES_POST_ERROR: 'PORT/ACTIVATES_POST_ERROR',
  ACTIVATES_RESET: 'PORT/ACTIVATES_RESET',

  // Grid
  GRD_LOADING: 'PORT/GRD_LOADING',
  //#endregion

  //#region Create
  createGet: () => ({
    type: actions.CREATE_GET,
  }),
  createGetError: (error) => ({
    type: actions.CREATE_GET_ERROR,
    payload: error,
  }),
  createSet: (model) => ({
    type: actions.CREATE_SET,
    payload: model,
  }),
  createSetSuccess: () => ({
    type: actions.CREATE_SET_SUCCESS,
  }),
  createPost: (model) => ({
    type: actions.CREATE_POST,
    payload: model,
  }),
  createPostSuccess: (result) => ({
    type: actions.CREATE_POST_SUCCESS,
    payload: result,
  }),
  createPostError: (error) => ({
    type: actions.CREATE_POST_ERROR,
    payload: error,
  }),
  createClose: () => ({
    type: actions.CREATE_CLOSE,
  }),
  createResetError: () => ({
    type: actions.CREATE_RESET_ERROR,
  }),
  createReset: () => ({
    type: actions.CREATE_RESET,
  }),
  //create country => stateProvince
  createCountryChange: (countryId) => ({
    type: actions.CREATE_COUNTRY_CHANGE,
    payload: countryId,
  }),
  createStateProvinceSet: (data) => ({
    type: actions.CREATE_STATE_PROVINCE_SET,
    payload: data,
  }),
  createStateProvinceSetSuccess: () => ({
    type: actions.CREATE_STATE_PROVINCE_SET_SUCCESS,
  }),
  createStateProvinceSetError: (error) => ({
    type: actions.CREATE_STATE_PROVINCE_SET_ERROR,
    payload: error,
  }),
  createStateProvinceResetError: () => ({
    type: actions.CREATE_STATE_PROVINCE_RESET_ERROR,
  }),
  //#endregion

  //#region Edit
  editGet: (id) => ({
    type: actions.EDIT_GET,
    payload: id,
  }),
  editGetError: (error) => ({
    type: actions.EDIT_GET_ERROR,
    payload: error,
  }),
  editSet: (model) => ({
    type: actions.EDIT_SET,
    payload: model,
  }),
  editSetSuccess: () => ({
    type: actions.EDIT_SET_SUCCESS,
  }),
  editPost: (model) => ({
    type: actions.EDIT_POST,
    payload: model,
  }),
  editPostSuccess: (result) => ({
    type: actions.EDIT_POST_SUCCESS,
    payload: result,
  }),
  editPostError: (error) => ({
    type: actions.EDIT_POST_ERROR,
    payload: error,
  }),
  editClose: () => ({
    type: actions.EDIT_CLOSE,
  }),
  editResetError: () => ({
    type: actions.EDIT_RESET_ERROR,
  }),
  editReset: () => ({
    type: actions.EDIT_RESET,
  }),
  //EDIT country => stateProvince
  editCountryChange: (countryId) => ({
    type: actions.EDIT_COUNTRY_CHANGE,
    payload: countryId,
  }),
  editStateProvinceSet: (data) => ({
    type: actions.EDIT_STATE_PROVINCE_SET,
    payload: data,
  }),
  editStateProvinceSetSuccess: () => ({
    type: actions.EDIT_STATE_PROVINCE_SET_SUCCESS,
  }),
  editStateProvinceSetError: (error) => ({
    type: actions.EDIT_STATE_PROVINCE_SET_ERROR,
    payload: error,
  }),
  editStateProvinceResetError: () => ({
    type: actions.EDIT_STATE_PROVINCE_RESET_ERROR,
  }),
  //#endregion

  //#region Deletes
  deletesGet: () => ({
    type: actions.DELETES_GET,
  }),
  deletesPost: (ids) => ({
    type: actions.DELETES_POST,
    payload: ids,
  }),
  deletesPostSuccess: (result) => ({
    type: actions.DELETES_POST_SUCCESS,
    payload: result,
  }),
  deletesPostError: (error) => ({
    type: actions.DELETES_POST_ERROR,
    payload: error,
  }),
  deletesClose: () => ({
    type: actions.DELETES_CLOSE,
  }),
  deletesReset: () => ({
    type: actions.DELETES_RESET,
  }),
  //#endregion

  //#region Activates
  activatesPost: (ids, active) => ({
    type: actions.ACTIVATES_POST,
    payload: { ids: ids, active: active },
  }),
  activatesPostSuccess: (result) => ({
    type: actions.ACTIVATES_POST_SUCCESS,
    payload: result,
  }),
  activatesPostError: (error) => ({
    type: actions.ACTIVATES_POST_ERROR,
    payload: error,
  }),
  activatesReset: () => ({
    type: actions.ACTIVATES_RESET,
  }),
  //#endregion

  // Grid
  grdLoading: (loading) => ({
    type: actions.GRD_LOADING,
    payload: loading,
  }),
};

export default actions;
