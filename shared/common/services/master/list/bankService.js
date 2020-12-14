import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const bankApi = config.api.private.master.bank;

const bankService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(bankApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(bankApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${bankApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${bankApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${bankApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${bankApi.activates}`, model);
  },
  //#endregion
};

export default bankService;
