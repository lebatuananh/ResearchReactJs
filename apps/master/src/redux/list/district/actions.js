const actions = {
  //#region const
  // Init
  INIT_GET: 'DISTRICT/INIT_GET',
  INIT_GET_ERROR: 'DISTRICT/INIT_GET_ERROR',
  INIT_SET: 'DISTRICT/INIT_SET',
  INIT_SET_SUCCESS: 'DISTRICT/INIT_SET_SUCCESS',
  INIT_RESET: 'DISTRICT/INIT_RESET',

  // Create
  CREATE_GET: 'DISTRICT/CREATE_GET',
  CREATE_GET_ERROR: 'DISTRICT/CREATE_GET_ERROR',
  CREATE_SET: 'DISTRICT/CREATE_SET',
  CREATE_SET_SUCCESS: 'DISTRICT/CREATE_SET_SUCCESS',
  CREATE_POST: 'DISTRICT/CREATE_POST',
  CREATE_POST_SUCCESS: 'DISTRICT/CREATE_POST_SUCCESS',
  CREATE_POST_ERROR: 'DISTRICT/CREATE_POST_ERROR',
  CREATE_CLOSE: 'DISTRICT/CREATE_CLOSE',
  CREATE_RESET_ERROR: 'DISTRICT/CREATE_RESET_ERROR',
  CREATE_RESET: 'DISTRICT/CREATE_RESET',
  CREATE_COUNTRY_CHANGE: 'DISTRICT/CREATE_COUNTRY_CHANGE',
  CREATE_STATE_PROVINCE_SET: 'DISTRICT/CREATE_STATE_PROVINCE_SET',
  CREATE_STATE_PROVINCE_SET_SUCCESS: 'DISTRICT/CREATE_STATE_PROVINCE_SET_SUCCESS',
  CREATE_STATE_PROVINCE_SET_ERROR: 'DISTRICT/CREATE_STATE_PROVINCE_SET_ERROR',
  CREATE_STATE_PROVINCE_RESET_ERROR: 'DISTRICT/CREATE_STATE_PROVINCE_RESET_ERROR',

  // Edit
  EDIT_GET: 'DISTRICT/EDIT_GET',
  EDIT_GET_ERROR: 'DISTRICT/EDIT_GET_ERROR',
  EDIT_SET: 'DISTRICT/EDIT_SET',
  EDIT_SET_SUCCESS: 'DISTRICT/EDIT_SET_SUCCESS',
  EDIT_POST: 'DISTRICT/EDIT_POST',
  EDIT_POST_SUCCESS: 'DISTRICT/EDIT_POST_SUCCESS',
  EDIT_POST_ERROR: 'DISTRICT/EDIT_POST_ERROR',
  EDIT_CLOSE: 'DISTRICT/EDIT_CLOSE',
  EDIT_RESET_ERROR: 'DISTRICT/EDIT_RESET_ERROR',
  EDIT_RESET: 'DISTRICT/EDIT_RESET',
  EDIT_COUNTRY_CHANGE: 'DISTRICT/EDIT_COUNTRY_CHANGE',
  EDIT_STATE_PROVINCE_SET: 'DISTRICT/EDIT_STATE_PROVINCE_SET',
  EDIT_STATE_PROVINCE_SET_SUCCESS: 'DISTRICT/EDIT_STATE_PROVINCE_SET_SUCCESS',
  EDIT_STATE_PROVINCE_SET_ERROR: 'DISTRICT/EDIT_STATE_PROVINCE_SET_ERROR',
  EDIT_STATE_PROVINCE_RESET_ERROR: 'DISTRICT/EDIT_STATE_PROVINCE_RESET_ERROR',

  // Deletes
  DELETES_GET: 'DISTRICT/DELETES_GET',
  DELETES_POST: 'DISTRICT/DELETES_POST',
  DELETES_POST_SUCCESS: 'DISTRICT/DELETES_POST_SUCCESS',
  DELETES_POST_ERROR: 'DISTRICT/DELETES_POST_ERROR',
  DELETES_CLOSE: 'DISTRICT/DELETES_CLOSE',
  DELETES_RESET: 'DISTRICT/DELETES_RESET',

  // Activates/Deactivates
  ACTIVATES_POST: 'DISTRICT/ACTIVATES_POST',
  ACTIVATES_POST_SUCCESS: 'DISTRICT/ACTIVATES_POST_SUCCESS',
  ACTIVATES_POST_ERROR: 'DISTRICT/ACTIVATES_POST_ERROR',
  ACTIVATES_RESET: 'DISTRICT/ACTIVATES_RESET',

  // Grid
  GRD_LOADING: 'DISTRICT/GRD_LOADING',
  //#endregion

  // search
  SEARCH_COUNTRY_CHANGE: 'DISTRICT/SEARCH_COUNTRY_CHANGE',
  SEARCH_STATE_PROVINCE_SET: 'DISTRICT/SEARCH_STATE_PROVINCE_SET',
  SEARCH_STATE_PROVINCE_SET_SUCCESS: 'DISTRICT/SEARCH_STATE_PROVINCE_SET_SUCCESS',
  SEARCH_STATE_PROVINCE_SET_ERROR: 'DISTRICT/SEARCH_STATE_PROVINCE_SET_ERROR',
  SEARCH_STATE_PROVINCE_RESET_ERROR: 'DISTRICT/SEARCH_STATE_PROVINCE_RESET_ERROR',
  //#endregion

  // search

  searchCountryChange: (countryId) => ({
    type: actions.SEARCH_COUNTRY_CHANGE,
    payload: countryId,
  }),
  searchStateProvinceSet: (data) => ({
    type: actions.SEARCH_STATE_PROVINCE_SET,
    payload: data,
  }),
  searchStateProvinceSetSuccess: () => ({
    type: actions.SEARCH_STATE_PROVINCE_SET_SUCCESS,
  }),
  searchStateProvinceSetError: (error) => ({
    type: actions.SEARCH_STATE_PROVINCE_SET_ERROR,
    payload: error,
  }),
  searchStateProvinceReset: () => ({
    type: actions.SEARCH_STATE_PROVINCE_RESET_ERROR,
  }),

  //#endregion

  //#region Init
  initGet: () => ({
    type: actions.INIT_GET,
  }),
  initGetError: (error) => ({
    type: actions.INIT_GET_ERROR,
    payload: error,
  }),
  initSet: (data) => ({
    type: actions.INIT_SET,
    payload: data,
  }),
  initSetSuccess: () => ({
    type: actions.INIT_SET_SUCCESS,
  }),
  initReset: () => ({
    type: actions.INIT_RESET,
  }),
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
