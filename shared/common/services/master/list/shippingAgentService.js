import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const shippingAgentApi = config.api.private.master.shippingAgent;

const shippingAgentService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(shippingAgentApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(shippingAgentApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${shippingAgentApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${shippingAgentApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${shippingAgentApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${shippingAgentApi.activates}`, model);
  },
  //#endregion
};

export default shippingAgentService;
