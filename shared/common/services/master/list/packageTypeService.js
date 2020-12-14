import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const packageTypeApi = config.api.private.master.packageType;

const packageTypeService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(packageTypeApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(packageTypeApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${packageTypeApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${packageTypeApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${packageTypeApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${packageTypeApi.activates}`, model);
  },
  //#endregion
};

export default packageTypeService;
