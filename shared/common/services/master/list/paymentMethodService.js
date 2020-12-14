import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const paymentMethodApi = config.api.private.master.paymentMethod;

const paymentMethodService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(paymentMethodApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(paymentMethodApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${paymentMethodApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${paymentMethodApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${paymentMethodApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${paymentMethodApi.activates}`, model);
  },
  //#endregion
};

export default paymentMethodService;
