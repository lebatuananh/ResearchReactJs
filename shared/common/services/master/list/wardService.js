import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const wardApi = config.api.private.master.ward;

const wardService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(wardApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(wardApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${wardApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${wardApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${wardApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${wardApi.activates}`, model);
  },
  //#endregion

  //#region state provinces

  getByDistrictIdAsync: async (districtId) => {
    return await apiHelper.get(`${wardApi.getByDistrictId}?districtId=${districtId}`);
  },

  getByDistrictIdPromise: (districtId) => {
    return apiHelper.get(`${wardApi.getByDistrictId}?districtId=${districtId}`);
  },

  //#endregion
};

export default wardService;
