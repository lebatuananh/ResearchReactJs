const actions = {
  //#region const
  // Init
  INIT_GET: 'WARD/INIT_GET',
  INIT_GET_ERROR: 'WARD/INIT_GET_ERROR',
  INIT_SET: 'WARD/INIT_SET',
  INIT_SET_SUCCESS: 'WARD/INIT_SET_SUCCESS',
  INIT_RESET: 'WARD/INIT_RESET',

  // Create
  CREATE_GET: 'WARD/CREATE_GET',
  CREATE_GET_ERROR: 'WARD/CREATE_GET_ERROR',
  CREATE_SET: 'WARD/CREATE_SET',
  CREATE_SET_SUCCESS: 'WARD/CREATE_SET_SUCCESS',
  CREATE_POST: 'WARD/CREATE_POST',
  CREATE_POST_SUCCESS: 'WARD/CREATE_POST_SUCCESS',
  CREATE_POST_ERROR: 'WARD/CREATE_POST_ERROR',
  CREATE_CLOSE: 'WARD/CREATE_CLOSE',
  CREATE_RESET_ERROR: 'WARD/CREATE_RESET_ERROR',
  CREATE_RESET: 'WARD/CREATE_RESET',
  CREATE_COUNTRY_CHANGE: 'WARD/CREATE_COUNTRY_CHANGE',
  CREATE_STATE_PROVINCE_SET: 'WARD/CREATE_STATE_PROVINCE_SET',
  CREATE_STATE_PROVINCE_SET_SUCCESS: 'WARD/CREATE_STATE_PROVINCE_SET_SUCCESS',
  CREATE_STATE_PROVINCE_SET_ERROR: 'WARD/CREATE_STATE_PROVINCE_SET_ERROR',
  CREATE_STATE_PROVINCE_RESET_ERROR: 'WARD/CREATE_STATE_PROVINCE_RESET_ERROR',

  CREATE_STATE_PROVINCE_CHANGE: 'WARD/CREATE_STATE_PROVINCE_CHANGE',
  CREATE_DISTRICT_SET: 'WARD/CREATE_DISTRICT_SET',
  CREATE_DISTRICT_SET_SUCCESS: 'WARD/CREATE_DISTRICT_SET_SUCCESS',
  CREATE_DISTRICT_SET_ERROR: 'WARD/CREATE_DISTRICT_SET_ERROR',
  CREATE_DISTRICT_RESET_ERROR: 'WARD/CREATE_DISTRICT_RESET_ERROR',

  // Edit
  EDIT_GET: 'WARD/EDIT_GET',
  EDIT_GET_ERROR: 'WARD/EDIT_GET_ERROR',
  EDIT_SET: 'WARD/EDIT_SET',
  EDIT_SET_SUCCESS: 'WARD/EDIT_SET_SUCCESS',
  EDIT_POST: 'WARD/EDIT_POST',
  EDIT_POST_SUCCESS: 'WARD/EDIT_POST_SUCCESS',
  EDIT_POST_ERROR: 'WARD/EDIT_POST_ERROR',
  EDIT_CLOSE: 'WARD/EDIT_CLOSE',
  EDIT_RESET_ERROR: 'WARD/EDIT_RESET_ERROR',
  EDIT_RESET: 'WARD/EDIT_RESET',
  EDIT_COUNTRY_CHANGE: 'WARD/EDIT_COUNTRY_CHANGE',
  EDIT_STATE_PROVINCE_SET: 'WARD/EDIT_STATE_PROVINCE_SET',
  EDIT_STATE_PROVINCE_SET_SUCCESS: 'WARD/EDIT_STATE_PROVINCE_SET_SUCCESS',
  EDIT_STATE_PROVINCE_SET_ERROR: 'WARD/EDIT_STATE_PROVINCE_SET_ERROR',
  EDIT_STATE_PROVINCE_RESET_ERROR: 'WARD/EDIT_STATE_PROVINCE_RESET_ERROR',

  EDIT_STATE_PROVINCE_CHANGE: 'WARD/EDIT_STATE_PROVINCE_CHANGE',
  EDIT_DISTRICT_SET: 'WARD/EDIT_DISTRICT_SET',
  EDIT_DISTRICT_SET_SUCCESS: 'WARD/EDIT_DISTRICT_SET_SUCCESS',
  EDIT_DISTRICT_SET_ERROR: 'WARD/EDIT_DISTRICT_SET_ERROR',
  EDIT_DISTRICT_RESET_ERROR: 'WARD/EDIT_DISTRICT_RESET_ERROR',

  // Deletes
  DELETES_GET: 'WARD/DELETES_GET',
  DELETES_POST: 'WARD/DELETES_POST',
  DELETES_POST_SUCCESS: 'WARD/DELETES_POST_SUCCESS',
  DELETES_POST_ERROR: 'WARD/DELETES_POST_ERROR',
  DELETES_CLOSE: 'WARD/DELETES_CLOSE',
  DELETES_RESET: 'WARD/DELETES_RESET',

  // Activates/Deactivates
  ACTIVATES_POST: 'WARD/ACTIVATES_POST',
  ACTIVATES_POST_SUCCESS: 'WARD/ACTIVATES_POST_SUCCESS',
  ACTIVATES_POST_ERROR: 'WARD/ACTIVATES_POST_ERROR',
  ACTIVATES_RESET: 'WARD/ACTIVATES_RESET',

  // Grid
  GRD_LOADING: 'WARD/GRD_LOADING',

  // Search
  SEARCH_COUNTRY_CHANGE: 'WARD/SEARCH_COUNTRY_CHANGE',
  SEARCH_STATE_PROVINCE_SET: 'WARD/SEARCH_STATE_PROVINCE_SET',
  SEARCH_STATE_PROVINCE_SET_SUCCESS: 'WARD/SEARCH_STATE_PROVINCE_SET_SUCCESS',
  SEARCH_STATE_PROVINCE_SET_ERROR: 'WARD/SEARCH_STATE_PROVINCE_SET_ERROR',
  SEARCH_STATE_PROVINCE_RESET_ERROR: 'WARD/SEARCH_STATE_PROVINCE_RESET_ERROR',

  SEARCH_STATE_PROVINCE_CHANGE: 'WARD/SEARCH_STATE_PROVINCE_CHANGE',
  SEARCH_DISTRICT_SET: 'WARD/SEARCH_DISTRICT_SET',
  SEARCH_DISTRICT_SET_SUCCESS: 'WARD/SEARCH_DISTRICT_SET_SUCCESS',
  SEARCH_DISTRICT_SET_ERROR: 'WARD/SEARCH_DISTRICT_SET_ERROR',
  SEARCH_DISTRICT_RESET_ERROR: 'WARD/SEARCH_DISTRICT_RESET_ERROR',
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

  //create stateProvince => district
  createStateProvinceChange: (stateProvinceId) => ({
    type: actions.CREATE_STATE_PROVINCE_CHANGE,
    payload: stateProvinceId,
  }),
  createDistrictSet: (data) => ({
    type: actions.CREATE_DISTRICT_SET,
    payload: data,
  }),
  createDistrictSetSuccess: () => ({
    type: actions.CREATE_DISTRICT_SET_SUCCESS,
  }),
  createDistrictSetError: (error) => ({
    type: actions.CREATE_DISTRICT_SET_ERROR,
    payload: error,
  }),
  createDistrictResetError: () => ({
    type: actions.CREATE_DISTRICT_RESET_ERROR,
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

  //EDIT stateProvince => district
  editStateProvinceChange: (stateProvinceId) => ({
    type: actions.EDIT_STATE_PROVINCE_CHANGE,
    payload: stateProvinceId,
  }),
  editDistrictSet: (data) => ({
    type: actions.EDIT_DISTRICT_SET,
    payload: data,
  }),
  editDistrictSetSuccess: () => ({
    type: actions.EDIT_DISTRICT_SET_SUCCESS,
  }),
  editDistrictSetError: (error) => ({
    type: actions.EDIT_DISTRICT_SET_ERROR,
    payload: error,
  }),
  editDistrictResetError: (error) => ({
    type: actions.EDIT_DISTRICT_RESET_ERROR,
    payload: error,
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

  //#region Search
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
  searchStateProvinceResetError: () => ({
    type: actions.SEARCH_STATE_PROVINCE_RESET_ERROR,
  }),

  searchStateProvinceChange: (stateProvinceId) => ({
    type: actions.SEARCH_STATE_PROVINCE_CHANGE,
    payload: stateProvinceId,
  }),
  searchDistrictSet: (data) => ({
    type: actions.SEARCH_DISTRICT_SET,
    payload: data,
  }),
  searchDistrictSetSuccess: () => ({
    type: actions.SEARCH_DISTRICT_SET_SUCCESS,
  }),
  searchDistrictSetError: (error) => ({
    type: actions.SEARCH_DISTRICT_SET_ERROR,
    payload: error,
  }),
  searchDistrictResetError: () => ({
    type: actions.SEARCH_DISTRICT_RESET_ERROR,
  }),
  //#endregion
};

export default actions;
