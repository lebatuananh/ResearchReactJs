import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const portApi = config.api.private.master.port;

const portService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(portApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(portApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${portApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${portApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${portApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${portApi.activates}`, model);
  },
  //#endregion
};

export default portService;
