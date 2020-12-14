import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const api = config.api.private.master.airline;

const airlineService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(api.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(api.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${api.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${api.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${api.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${api.activates}`, model);
  },
  //#endregion
};

export default airlineService;
