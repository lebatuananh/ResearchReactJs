import apiHelper from '@shared/lib/helpers/apiHelper';

const categoryService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get('/test/create');
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post('/test/create', model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`/test/edit?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post('/test/edit', model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post('/test/deletes', model);
  },
  //#endregion

  //#region CategoryType
  getTypesAsync: async (showHidden = false) => {
    return await apiHelper.get(`/test/get-types?showHidden=${showHidden}`);
  },
  getTypesPromise: (showHidden = false) => {
    return apiHelper.get(`/test/get-types?showHidden=${showHidden}`);
  },
  //#endregion
};

export default categoryService;
