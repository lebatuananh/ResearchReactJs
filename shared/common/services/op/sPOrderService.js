import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const sPOrderApi = config.api.private.op.sPOrder;

const sPOrderService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(sPOrderApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(sPOrderApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${sPOrderApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPOrderApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPOrderApi.deletes}`, model);
  },
  getAddressByPostOfficeId: async (postOfficeId) => {
    return await apiHelper.get(`${sPOrderApi.getPostOfficeAddress}?postOfficeId=${postOfficeId}`);
  },
  //#endregion
};

export default sPOrderService;
