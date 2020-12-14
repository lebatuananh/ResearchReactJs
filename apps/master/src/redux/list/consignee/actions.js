const actions = {
  //#region const
  // Create
  CREATE_GET: 'CONSIGNEE/CREATE_GET',
  CREATE_GET_ERROR: 'CONSIGNEE/CREATE_GET_ERROR',
  CREATE_SET: 'CONSIGNEE/CREATE_SET',
  CREATE_SET_SUCCESS: 'CONSIGNEE/CREATE_SET_SUCCESS',
  CREATE_POST: 'CONSIGNEE/CREATE_POST',
  CREATE_POST_SUCCESS: 'CONSIGNEE/CREATE_POST_SUCCESS',
  CREATE_POST_ERROR: 'CONSIGNEE/CREATE_POST_ERROR',
  CREATE_CLOSE: 'CONSIGNEE/CREATE_CLOSE',
  CREATE_RESET_ERROR: 'CONSIGNEE/CREATE_RESET_ERROR',
  CREATE_RESET: 'CONSIGNEE/CREATE_RESET',

  CREATE_VISIBLE_SUBMIT: 'CONSIGNEE/CREATE_VISIBLE_SUBMIT',
  CREATE_RESET_VISIBLE_SUBMIT: 'CONSIGNEE/CREATE_RESET_VISIBLE_SUBMIT',

  // Edit
  EDIT_GET: 'CONSIGNEE/EDIT_GET',
  EDIT_GET_ERROR: 'CONSIGNEE/EDIT_GET_ERROR',
  EDIT_SET: 'CONSIGNEE/EDIT_SET',
  EDIT_SET_SUCCESS: 'CONSIGNEE/EDIT_SET_SUCCESS',
  EDIT_POST: 'CONSIGNEE/EDIT_POST',
  EDIT_POST_SUCCESS: 'CONSIGNEE/EDIT_POST_SUCCESS',
  EDIT_POST_ERROR: 'CONSIGNEE/EDIT_POST_ERROR',
  EDIT_CLOSE: 'CONSIGNEE/EDIT_CLOSE',
  EDIT_RESET_ERROR: 'CONSIGNEE/EDIT_RESET_ERROR',
  EDIT_RESET: 'CONSIGNEE/EDIT_RESET',

  EDIT_VISIBLE_SUBMIT: 'CONSIGNEE/EDIT_VISIBLE_SUBMIT',
  EDIT_RESET_VISIBLE_SUBMIT: 'CONSIGNEE/EDIT_RESET_VISIBLE_SUBMIT',

  // Deletes
  DELETES_GET: 'CONSIGNEE/DELETES_GET',
  DELETES_POST: 'CONSIGNEE/DELETES_POST',
  DELETES_POST_SUCCESS: 'CONSIGNEE/DELETES_POST_SUCCESS',
  DELETES_POST_ERROR: 'CONSIGNEE/DELETES_POST_ERROR',
  DELETES_CLOSE: 'CONSIGNEE/DELETES_CLOSE',
  DELETES_RESET: 'CONSIGNEE/DELETES_RESET',

  // Activates/Deactivates
  ACTIVATES_POST: 'CONSIGNEE/ACTIVATES_POST',
  ACTIVATES_POST_SUCCESS: 'CONSIGNEE/ACTIVATES_POST_SUCCESS',
  ACTIVATES_POST_ERROR: 'CONSIGNEE/ACTIVATES_POST_ERROR',
  ACTIVATES_RESET: 'CONSIGNEE/ACTIVATES_RESET',

  // Grid
  GRD_LOADING: 'CONSIGNEE/GRD_LOADING',
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
  createVisibleSubmit: (visible) => ({
    type: actions.CREATE_VISIBLE_SUBMIT,
    payload: visible,
  }),
  createResetVisibleSubmit: () => ({
    type: actions.CREATE_RESET_VISIBLE_SUBMIT,
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
  editVisibleSubmit: (visible) => ({
    type: actions.EDIT_VISIBLE_SUBMIT,
    payload: visible,
  }),
  editResetVisibleSubmit: () => ({
    type: actions.EDIT_RESET_VISIBLE_SUBMIT,
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
