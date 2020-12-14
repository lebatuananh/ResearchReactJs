import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const shippingLineApi = config.api.private.master.shippingLine;

const shippingLineService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(shippingLineApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(shippingLineApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${shippingLineApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${shippingLineApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${shippingLineApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${shippingLineApi.activates}`, model);
  },
  //#endregion

  //#region Get by Shipping Agent Id

  getByShippingAgentIdAsync: async (shippingAgentId) => {
    return await apiHelper.get(`${shippingLineApi.getByShippingAgentId}?shippingAgentId=${shippingAgentId}`);
  },

  getByShippingAgentIdPromise: (shippingAgentId) => {
    return apiHelper.get(`${shippingLineApi.getByShippingAgentId}?shippingAgentId=${shippingAgentId}`);
  },

  //#endregion
};

export default shippingLineService;
