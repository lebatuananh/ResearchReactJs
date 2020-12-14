const actions = {
  //#region const

  // Create
  CREATE_GET: 'BANK/CREATE_GET',
  CREATE_GET_ERROR: 'BANK/CREATE_GET_ERROR',
  CREATE_SET: 'BANK/CREATE_SET',
  CREATE_SET_SUCCESS: 'BANK/CREATE_SET_SUCCESS',
  CREATE_POST: 'BANK/CREATE_POST',
  CREATE_POST_SUCCESS: 'BANK/CREATE_POST_SUCCESS',
  CREATE_POST_ERROR: 'BANK/CREATE_POST_ERROR',
  CREATE_CLOSE: 'BANK/CREATE_CLOSE',
  CREATE_RESET_ERROR: 'BANK/CREATE_RESET_ERROR',
  CREATE_RESET: 'BANK/CREATE_RESET',

  // Edit
  EDIT_GET: 'BANK/EDIT_GET',
  EDIT_GET_ERROR: 'BANK/EDIT_GET_ERROR',
  EDIT_SET: 'BANK/EDIT_SET',
  EDIT_SET_SUCCESS: 'BANK/EDIT_SET_SUCCESS',
  EDIT_POST: 'BANK/EDIT_POST',
  EDIT_POST_SUCCESS: 'BANK/EDIT_POST_SUCCESS',
  EDIT_POST_ERROR: 'BANK/EDIT_POST_ERROR',
  EDIT_CLOSE: 'BANK/EDIT_CLOSE',
  EDIT_RESET_ERROR: 'BANK/EDIT_RESET_ERROR',
  EDIT_RESET: 'BANK/EDIT_RESET',

  // Deletes
  DELETES_GET: 'BANK/DELETES_GET',
  DELETES_POST: 'BANK/DELETES_POST',
  DELETES_POST_SUCCESS: 'BANK/DELETES_POST_SUCCESS',
  DELETES_POST_ERROR: 'BANK/DELETES_POST_ERROR',
  DELETES_CLOSE: 'BANK/DELETES_CLOSE',
  DELETES_RESET: 'BANK/DELETES_RESET',

  // Activates/Deactivates
  ACTIVATES_POST: 'BANK/ACTIVATES_POST',
  ACTIVATES_POST_SUCCESS: 'BANK/ACTIVATES_POST_SUCCESS',
  ACTIVATES_POST_ERROR: 'BANK/ACTIVATES_POST_ERROR',
  ACTIVATES_RESET: 'BANK/ACTIVATES_RESET',

  // Grid
  GRD_LOADING: 'BANK/GRD_LOADING',
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
