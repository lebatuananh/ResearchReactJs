import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const paymentTermApi = config.api.private.master.paymentTerm;

const paymentTermService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(paymentTermApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(paymentTermApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${paymentTermApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${paymentTermApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${paymentTermApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${paymentTermApi.activates}`, model);
  },
  //#endregion
};

export default paymentTermService;
