import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const sPProductTypeApi = config.api.private.master.sPProductType;

const sPProductTypeService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(sPProductTypeApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(sPProductTypeApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${sPProductTypeApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPProductTypeApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPProductTypeApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPProductTypeApi.activates}`, model);
  },

  getAllAsync: async () => {
    return await apiHelper.get(`${sPProductTypeApi.getAll}`);
  },

  getAllPromise: () => {
    return apiHelper.get(`${sPProductTypeApi.getAll}`);
  },
  //#endregion
};

export default sPProductTypeService;
