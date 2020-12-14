import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const consigneeApi = config.api.private.master.consignee;

const consigneeService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(consigneeApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(consigneeApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${consigneeApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${consigneeApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${consigneeApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${consigneeApi.activates}`, model);
  },
  getAll: async (showHidden) => {
    return await apiHelper.get(`${consigneeApi.getAll}?showHidden=${showHidden}`);
  },
  getTopSelect: async (consigneeSearchModel) => {
    return await apiHelper.get(`${consigneeApi.getTopSelect}`, {
      params: consigneeSearchModel,
    });
  },
  getAddressesTopSelect: async (consigneeId) => {
    return await apiHelper.get(`${consigneeApi.getAddressesTopSelect}?consigneeId=${consigneeId}`);
  },
  getAddressesSelect: async (sPAddressSearchModel) => {
    return await apiHelper.get(`${consigneeApi.getAddressesSelect}`, {
      params: sPAddressSearchModel,
    });
  },
  //#endregion

  //#region countries

  getByPaymentTermIdAsync: async (paymentTermId) => {
    return await apiHelper.get(`${consigneeApi.getByPaymentTermId}?paymentTermId=${paymentTermId}`);
  },

  getByPaymentTermIdPromise: (paymentTermId) => {
    return apiHelper.get(`${consigneeApi.getByPaymentTermId}?paymentTermId=${paymentTermId}`);
  },

  //#endregion
};

export default consigneeService;
