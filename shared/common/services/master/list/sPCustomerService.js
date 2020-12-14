import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const sPCustomerApi = config.api.private.master.sPCustomer;

const sPCustomerService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(sPCustomerApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(sPCustomerApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${sPCustomerApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPCustomerApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPCustomerApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPCustomerApi.activates}`, model);
  },
  getAll: async (showHidden) => {
    return await apiHelper.get(`${sPCustomerApi.getAll}?showHidden=${showHidden}`);
  },
  getTopSelect: async (sPCustomerSearchModel) => {
    return await apiHelper.get(`${sPCustomerApi.getTopSelect}`, {
      params: sPCustomerSearchModel,
    });
  },
  getAddressesTopSelect: async (spCustomerId) => {
    return await apiHelper.get(`${sPCustomerApi.getAddressesTopSelect}?spCustomerId=${spCustomerId}`);
  },
  getAddressesSelect: async (sPAddressSearchModel) => {
    return await apiHelper.get(`${sPCustomerApi.getAddressesSelect}`, {
      params: sPAddressSearchModel,
    });
  },
  //#endregion

  //#region countries

  getByPaymentTermIdAsync: async (paymentTermId) => {
    return await apiHelper.get(`${sPCustomerApi.getByPaymentTermId}?paymentTermId=${paymentTermId}`);
  },

  getByPaymentTermIdPromise: (paymentTermId) => {
    return apiHelper.get(`${sPCustomerApi.getByPaymentTermId}?paymentTermId=${paymentTermId}`);
  },

  //#endregion
};

export default sPCustomerService;
