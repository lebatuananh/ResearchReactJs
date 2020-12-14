const actions = {
  //#region const
  // Init
  INIT_GET: 'COMMODITY/INIT_GET',
  INIT_GET_ERROR: 'COMMODITY/INIT_GET_ERROR',
  INIT_SET: 'COMMODITY/INIT_SET',
  INIT_SET_SUCCESS: 'COMMODITY/INIT_SET_SUCCESS',
  INIT_RESET: 'COMMODITY/INIT_RESET',

  // Create
  CREATE_GET: 'COMMODITY/CREATE_GET',
  CREATE_GET_ERROR: 'COMMODITY/CREATE_GET_ERROR',
  CREATE_SET: 'COMMODITY/CREATE_SET',
  CREATE_SET_SUCCESS: 'COMMODITY/CREATE_SET_SUCCESS',
  CREATE_POST: 'COMMODITY/CREATE_POST',
  CREATE_POST_SUCCESS: 'COMMODITY/CREATE_POST_SUCCESS',
  CREATE_POST_ERROR: 'COMMODITY/CREATE_POST_ERROR',
  CREATE_CLOSE: 'COMMODITY/CREATE_CLOSE',
  CREATE_RESET_ERROR: 'COMMODITY/CREATE_RESET_ERROR',
  CREATE_RESET: 'COMMODITY/CREATE_RESET',

  // Edit
  EDIT_GET: 'COMMODITY/EDIT_GET',
  EDIT_GET_ERROR: 'COMMODITY/EDIT_GET_ERROR',
  EDIT_SET: 'COMMODITY/EDIT_SET',
  EDIT_SET_SUCCESS: 'COMMODITY/EDIT_SET_SUCCESS',
  EDIT_POST: 'COMMODITY/EDIT_POST',
  EDIT_POST_SUCCESS: 'COMMODITY/EDIT_POST_SUCCESS',
  EDIT_POST_ERROR: 'COMMODITY/EDIT_POST_ERROR',
  EDIT_CLOSE: 'COMMODITY/EDIT_CLOSE',
  EDIT_RESET_ERROR: 'COMMODITY/EDIT_RESET_ERROR',
  EDIT_RESET: 'COMMODITY/EDIT_RESET',

  // Deletes
  DELETES_GET: 'COMMODITY/DELETES_GET',
  DELETES_POST: 'COMMODITY/DELETES_POST',
  DELETES_POST_SUCCESS: 'COMMODITY/DELETES_POST_SUCCESS',
  DELETES_POST_ERROR: 'COMMODITY/DELETES_POST_ERROR',
  DELETES_CLOSE: 'COMMODITY/DELETES_CLOSE',
  DELETES_RESET: 'COMMODITY/DELETES_RESET',

  // Activates/Deactivates
  ACTIVATES_POST: 'COMMODITY/ACTIVATES_POST',
  ACTIVATES_POST_SUCCESS: 'COMMODITY/ACTIVATES_POST_SUCCESS',
  ACTIVATES_POST_ERROR: 'COMMODITY/ACTIVATES_POST_ERROR',
  ACTIVATES_RESET: 'COMMODITY/ACTIVATES_RESET',

  // Grid
  GRD_LOADING: 'COMMODITY/GRD_LOADING',
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
