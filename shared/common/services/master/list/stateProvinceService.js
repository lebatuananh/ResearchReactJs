import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const countryApi = config.api.private.master.country;
const stateProvinceApi = config.api.private.master.stateProvince;

const stateProvinceService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(stateProvinceApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(stateProvinceApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${stateProvinceApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${stateProvinceApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${stateProvinceApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${stateProvinceApi.activates}`, model);
  },
  //#endregion

  //#region countries

  getByCountryIdAsync: async (countryId) => {
    return await apiHelper.get(`${stateProvinceApi.getByCountryId}?countryId=${countryId}`);
  },

  getByCountryIdPromise: (countryId) => {
    return apiHelper.get(`${stateProvinceApi.getByCountryId}?countryId=${countryId}`);
  },

  getCountriesAsync: async (showHiden) => {
    return await apiHelper.get(`${countryApi.getAll}?showHidden=${showHiden}`);
  },

  getCountriesPromise: (showHiden) => {
    return apiHelper.get(`${countryApi.getAll}?showHidden=${showHiden}`);
  },

  //#endregion
};

export default stateProvinceService;
