import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const truckerApi = config.api.private.master.trucker;

const truckerService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(truckerApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(truckerApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${truckerApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${truckerApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${truckerApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${truckerApi.activates}`, model);
  },
  //#endregion
};

export default truckerService;
