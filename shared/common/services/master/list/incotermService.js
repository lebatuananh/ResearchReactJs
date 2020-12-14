import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const incotermApi = config.api.private.master.incoterm;

const incotermService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(incotermApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(incotermApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${incotermApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${incotermApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${incotermApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${incotermApi.activates}`, model);
  },
  //#endregion
};

export default incotermService;
