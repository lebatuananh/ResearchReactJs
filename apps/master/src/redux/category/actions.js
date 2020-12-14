const actions = {
  //#region const
  // Init
  INIT_GET: 'CATEGORY/INIT_GET',
  INIT_GET_ERROR: 'CATEGORY/INIT_GET_ERROR',
  INIT_SET: 'CATEGORY/INIT_SET',
  INIT_SET_SUCCESS: 'CATEGORY/INIT_SET_SUCCESS',
  CREATE_RESET_ERROR: 'CATEGORY/CREATE_RESET_ERROR',
  INIT_RESET: 'CATEGORY/INIT_RESET',

  // Create
  CREATE_GET: 'CATEGORY/CREATE_GET',
  CREATE_GET_ERROR: 'CATEGORY/CREATE_GET_ERROR',
  CREATE_SET: 'CATEGORY/CREATE_SET',
  CREATE_SET_SUCCESS: 'CATEGORY/CREATE_SET_SUCCESS',
  CREATE_POST: 'CATEGORY/CREATE_POST',
  CREATE_POST_SUCCESS: 'CATEGORY/CREATE_POST_SUCCESS',
  CREATE_POST_ERROR: 'CATEGORY/CREATE_POST_ERROR',
  CREATE_CLOSE: 'CATEGORY/CREATE_CLOSE',
  CREATE_RESET: 'CATEGORY/CREATE_RESET',

  // Edit
  EDIT_GET: 'CATEGORY/EDIT_GET',
  EDIT_GET_ERROR: 'CATEGORY/EDIT_GET_ERROR',
  EDIT_SET: 'CATEGORY/EDIT_SET',
  EDIT_SET_SUCCESS: 'CATEGORY/EDIT_SET_SUCCESS',
  EDIT_POST: 'CATEGORY/EDIT_POST',
  EDIT_POST_SUCCESS: 'CATEGORY/EDIT_POST_SUCCESS',
  EDIT_POST_ERROR: 'CATEGORY/EDIT_POST_ERROR',
  EDIT_CLOSE: 'CATEGORY/EDIT_CLOSE',
  EDIT_RESET_ERROR: 'CATEGORY/EDIT_RESET_ERROR',
  EDIT_RESET: 'CATEGORY/EDIT_RESET',

  // Deletes
  DELETES_GET: 'CATEGORY/DELETES_GET',
  DELETES_POST: 'CATEGORY/DELETES_POST',
  DELETES_POST_SUCCESS: 'CATEGORY/DELETES_POST_SUCCESS',
  DELETES_POST_ERROR: 'CATEGORY/DELETES_POST_ERROR',
  DELETES_CLOSE: 'CATEGORY/DELETES_CLOSE',
  DELETES_RESET: 'CATEGORY/DELETES_RESET',

  // Grid
  GRD_LOADING: 'CATEGORY/GRD_LOADING',
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

  // Grid
  grdLoading: (loading) => ({
    type: actions.GRD_LOADING,
    payload: loading,
  }),
};

export default actions;
