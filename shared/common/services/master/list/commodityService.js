import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const commodityApi = config.api.private.master.commodity;

const commodityService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(commodityApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(commodityApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${commodityApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${commodityApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${commodityApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${commodityApi.activates}`, model);
  },
  //#endregion
};

export default commodityService;
