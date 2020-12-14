import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const deliveryTimeApi = config.api.private.master.deliveryTime;

const deliveryTimeService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(deliveryTimeApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(deliveryTimeApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${deliveryTimeApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${deliveryTimeApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${deliveryTimeApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${deliveryTimeApi.activates}`, model);
  },
  //#endregion
};

export default deliveryTimeService;
