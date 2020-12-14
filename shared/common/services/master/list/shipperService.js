import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const shipperApi = config.api.private.master.shipper;

const shipperService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(shipperApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(shipperApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${shipperApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${shipperApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${shipperApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${shipperApi.activates}`, model);
  },
  getAll: async (showHidden) => {
    return await apiHelper.get(`${shipperApi.getAll}?showHidden=${showHidden}`);
  },
  getTopSelect: async (shipperSearchModel) => {
    return await apiHelper.get(`${shipperApi.getTopSelect}`, {
      params: shipperSearchModel,
    });
  },
  getAddressesTopSelect: async (shipperId) => {
    return await apiHelper.get(`${shipperApi.getAddressesTopSelect}?shipperId=${shipperId}`);
  },
  getAddressesSelect: async (sPAddressSearchModel) => {
    return await apiHelper.get(`${shipperApi.getAddressesSelect}`, {
      params: sPAddressSearchModel,
    });
  },
  //#endregion

  //#region countries

  getByPaymentTermIdAsync: async (paymentTermId) => {
    return await apiHelper.get(`${shipperApi.getByPaymentTermId}?paymentTermId=${paymentTermId}`);
  },

  getByPaymentTermIdPromise: (paymentTermId) => {
    return apiHelper.get(`${shipperApi.getByPaymentTermId}?paymentTermId=${paymentTermId}`);
  },

  //#endregion
};

export default shipperService;
