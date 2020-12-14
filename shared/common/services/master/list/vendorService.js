import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const vendorApi = config.api.private.master.vendor;

const vendorService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(vendorApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(vendorApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${vendorApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${vendorApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${vendorApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${vendorApi.activates}`, model);
  },
  //#endregion
};

export default vendorService;
