import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const bankAccountApi = config.api.private.master.bankAccount;

const bankAccountService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(bankAccountApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(bankAccountApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${bankAccountApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${bankAccountApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${bankAccountApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${bankAccountApi.activates}`, model);
  },
  //#endregion
};

export default bankAccountService;
