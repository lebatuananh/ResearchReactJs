import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const countryApi = config.api.private.master.country;
const globalZoneApi = config.api.private.master.globalZone;

const countryService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(countryApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(countryApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${countryApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${countryApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${countryApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${countryApi.activates}`, model);
  },
  //#endregion

  //#region GlobalZone

  getGlobalZonesAsync: async (showHiden) => {
    return await apiHelper.get(`${globalZoneApi.getAll}?showHidden=${showHiden}`);
  },

  getGlobalZonesPromise: (showHiden) => {
    return apiHelper.get(`${globalZoneApi.getAll}?showHidden=${showHiden}`);
  },

  getAllAsync: async (showHiden) => {
    return await apiHelper.get(`${countryApi.getAll}?showHidden=${showHiden}`);
  },

  getAllPromise: (showHiden) => {
    return apiHelper.get(`${countryApi.getAll}?showHidden=${showHiden}`);
  },

  //#endregion
};

export default countryService;
