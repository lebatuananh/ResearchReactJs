const actions = {
  //#region const
  // Init
  INIT_GET: 'STATEPROVINCE/INIT_GET',
  INIT_GET_ERROR: 'STATEPROVINCE/INIT_GET_ERROR',
  INIT_SET: 'STATEPROVINCE/INIT_SET',
  INIT_SET_SUCCESS: 'STATEPROVINCE/INIT_SET_SUCCESS',
  INIT_RESET: 'STATEPROVINCE/INIT_RESET',

  // Create
  CREATE_GET: 'STATEPROVINCE/CREATE_GET',
  CREATE_GET_ERROR: 'STATEPROVINCE/CREATE_GET_ERROR',
  CREATE_SET: 'STATEPROVINCE/CREATE_SET',
  CREATE_SET_SUCCESS: 'STATEPROVINCE/CREATE_SET_SUCCESS',
  CREATE_POST: 'STATEPROVINCE/CREATE_POST',
  CREATE_POST_SUCCESS: 'STATEPROVINCE/CREATE_POST_SUCCESS',
  CREATE_POST_ERROR: 'STATEPROVINCE/CREATE_POST_ERROR',
  CREATE_CLOSE: 'STATEPROVINCE/CREATE_CLOSE',
  CREATE_RESET_ERROR: 'STATEPROVINCE/CREATE_RESET_ERROR',
  CREATE_RESET: 'STATEPROVINCE/CREATE_RESET',

  // Edit
  EDIT_GET: 'STATEPROVINCE/EDIT_GET',
  EDIT_GET_ERROR: 'STATEPROVINCE/EDIT_GET_ERROR',
  EDIT_SET: 'STATEPROVINCE/EDIT_SET',
  EDIT_SET_SUCCESS: 'STATEPROVINCE/EDIT_SET_SUCCESS',
  EDIT_POST: 'STATEPROVINCE/EDIT_POST',
  EDIT_POST_SUCCESS: 'STATEPROVINCE/EDIT_POST_SUCCESS',
  EDIT_POST_ERROR: 'STATEPROVINCE/EDIT_POST_ERROR',
  EDIT_CLOSE: 'STATEPROVINCE/EDIT_CLOSE',
  EDIT_RESET_ERROR: 'STATEPROVINCE/EDIT_RESET_ERROR',
  EDIT_RESET: 'STATEPROVINCE/EDIT_RESET',

  // Deletes
  DELETES_GET: 'STATEPROVINCE/DELETES_GET',
  DELETES_POST: 'STATEPROVINCE/DELETES_POST',
  DELETES_POST_SUCCESS: 'STATEPROVINCE/DELETES_POST_SUCCESS',
  DELETES_POST_ERROR: 'STATEPROVINCE/DELETES_POST_ERROR',
  DELETES_CLOSE: 'STATEPROVINCE/DELETES_CLOSE',
  DELETES_RESET: 'STATEPROVINCE/DELETES_RESET',

  // Activates/Deactivates
  ACTIVATES_POST: 'STATEPROVINCE/ACTIVATES_POST',
  ACTIVATES_POST_SUCCESS: 'STATEPROVINCE/ACTIVATES_POST_SUCCESS',
  ACTIVATES_POST_ERROR: 'STATEPROVINCE/ACTIVATES_POST_ERROR',
  ACTIVATES_RESET: 'STATEPROVINCE/ACTIVATES_RESET',

  // Grid
  GRD_LOADING: 'STATEPROVINCE/GRD_LOADING',
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
