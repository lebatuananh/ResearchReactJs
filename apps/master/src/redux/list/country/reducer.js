import actions from './actions';

const initState = {
  loading: false,
  init: {
    error: null,
  },
  search: {
    globalZones: [],
  },
  create: {
    modelGet: null,
    modelPost: null,
    result: null,
    error: null,
    loading: false,
    visible: false,
  },
  edit: {
    modelGet: null,
    modelPost: null,
    result: null,
    error: null,
    loading: false,
    visible: false,
  },
  deletes: {
    modelPost: null,
    result: null,
    error: null,
    loading: false,
    visible: false,
  },
  activates: {
    modelPost: null,
    result: null,
    error: null,
  },
  grd: {
    loading: false,
  },
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    //#region Init
    case actions.INIT_GET:
      return {
        ...state,
        loading: true,
        init: {
          ...state.init,
        },
      };
    case actions.INIT_GET_ERROR:
      return {
        ...state,
        loading: false,
        init: {
          error: action.payload,
        },
      };
    case actions.INIT_SET:
      return {
        ...state,
        loading: true,
        search: {
          globalZones: action.payload.globalZones,
        },
      };
    case actions.INIT_SET_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actions.INIT_RESET:
      return {
        ...state,
        init: { ...initState.init },
        search: {
          globalZones: [],
        },
      };
    //#endregion

    //#region Create
    case actions.CREATE_GET:
      return {
        ...state,
        loading: true,
        create: {
          ...state.create,
          loading: false,
          visible: false,
        },
      };
    case actions.CREATE_GET_ERROR:
      return {
        ...state,
        loading: false,
        create: {
          ...state.create,
          error: action.payload,
          loading: false,
          visible: false,
        },
      };
    case actions.CREATE_SET:
      return {
        ...state,
        loading: true,
        create: {
          ...state.create,
          modelGet: action.payload,
          loading: false,
          visible: true,
        },
      };
    case actions.CREATE_SET_SUCCESS:
      return {
        ...state,
        loading: false,
        create: {
          ...state.create,
          loading: false,
          visible: true,
        },
      };
    case actions.CREATE_POST:
      return {
        ...state,
        loading: false,
        create: {
          ...state.create,
          modelPost: action.payload,
          loading: true,
          visible: true,
        },
      };
    case actions.CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        create: {
          ...state.create,
          result: action.payload,
          loading: false,
          visible: false,
        },
      };
    case actions.CREATE_POST_ERROR:
      return {
        ...state,
        loading: false,
        create: {
          ...state.create,
          error: action.payload,
          loading: false,
          visible: true,
        },
      };
    case actions.CREATE_CLOSE:
      return {
        ...state,
        loading: false,
        create: {
          ...state.create,
          loading: false,
          visible: false,
        },
      };
    case actions.CREATE_RESET_ERROR:
      return {
        ...state,
        create: {
          ...state.create,
          error: null,
        },
      };
    case actions.CREATE_RESET:
      return {
        ...state,
        create: { ...initState.create },
      };
    //#endregion

    //#region Edit
    case actions.EDIT_GET:
      return {
        ...state,
        loading: true,
        edit: {
          ...state.edit,
          loading: false,
          visible: false,
        },
      };
    case actions.EDIT_GET_ERROR:
      return {
        ...state,
        loading: false,
        edit: {
          ...state.edit,
          error: action.payload,
          loading: false,
          visible: false,
        },
      };
    case actions.EDIT_SET:
      return {
        ...state,
        loading: true,
        edit: {
          ...state.edit,
          modelGet: action.payload,
          loading: false,
          visible: true,
        },
      };
    case actions.EDIT_SET_SUCCESS:
      return {
        ...state,
        loading: false,
        edit: {
          ...state.edit,
          loading: false,
          visible: true,
        },
      };
    case actions.EDIT_POST:
      return {
        ...state,
        loading: false,
        edit: {
          ...state.edit,
          modelPost: action.payload,
          loading: true,
          visible: true,
        },
      };
    case actions.EDIT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        edit: {
          ...state.edit,
          result: action.payload,
          loading: false,
          visible: false,
        },
      };
    case actions.EDIT_POST_ERROR:
      return {
        ...state,
        loading: false,
        edit: {
          ...state.edit,
          error: action.payload,
          loading: false,
          visible: true,
        },
      };
    case actions.EDIT_CLOSE:
      return {
        ...state,
        loading: false,
        edit: {
          ...state.edit,
          loading: false,
          visible: false,
        },
      };
    case actions.EDIT_RESET_ERROR:
      return {
        ...state,
        edit: {
          ...state.edit,
          error: null,
        },
      };
    case actions.EDIT_RESET:
      return {
        ...state,
        edit: { ...initState.edit },
      };
    //#endregion

    //#region Deletes
    case actions.DELETES_GET:
      return {
        ...state,
        loading: false,
        deletes: {
          ...state.deletes,
          loading: false,
          visible: true,
        },
      };
    case actions.DELETES_POST:
      return {
        ...state,
        loading: false,
        deletes: {
          ...state.deletes,
          modelPost: action.payload,
          loading: true,
          visible: true,
        },
      };
    case actions.DELETES_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        deletes: {
          ...state.deletes,
          result: action.payload,
          loading: false,
          visible: false,
        },
      };
    case actions.DELETES_POST_ERROR:
      return {
        ...state,
        loading: false,
        deletes: {
          ...state.deletes,
          error: action.payload,
          loading: false,
          visible: true,
        },
      };
    case actions.DELETES_CLOSE:
      return {
        ...state,
        loading: false,
        deletes: {
          ...state.deletes,
          loading: false,
          visible: false,
        },
      };
    case actions.DELETES_RESET:
      return {
        ...state,
        deletes: { ...initState.deletes },
      };
    //#endregion

    //#region Activates/Deactivates
    case actions.ACTIVATES_POST:
      return {
        ...state,
        loading: true,
        activates: {
          ...state.activates,
          modelPost: action.payload,
        },
      };
    case actions.ACTIVATES_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        activates: {
          ...state.activates,
          result: action.payload,
        },
      };
    case actions.ACTIVATES_POST_ERROR:
      return {
        ...state,
        loading: false,
        activates: {
          ...state.activates,
          error: action.payload,
        },
      };
    case actions.ACTIVATES_RESET:
      return {
        ...state,
        activates: { ...initState.activates },
      };
    //#endregion

    // Grid
    case actions.GRD_LOADING:
      return {
        ...state,
        grd: {
          loading: action.payload,
        },
      };
    default:
      return state;
  }
}
