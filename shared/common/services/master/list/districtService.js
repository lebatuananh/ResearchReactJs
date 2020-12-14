import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const districtApi = config.api.private.master.district;

const districtService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(districtApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(districtApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${districtApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${districtApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${districtApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${districtApi.activates}`, model);
  },
  //#endregion

  //#region state provinces

  getByStateProvinceIdAsync: async (stateProvinceId) => {
    return await apiHelper.get(`${districtApi.getByStateProvinceId}?stateProvinceId=${stateProvinceId}`);
  },

  getByStateProvinceIdPromise: (stateProvinceId) => {
    return apiHelper.get(`${districtApi.getByStateProvinceId}?stateProvinceId=${stateProvinceId}`);
  },

  //#endregion
};

export default districtService;
