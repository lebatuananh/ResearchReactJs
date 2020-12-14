import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const vesselApi = config.api.private.master.vessel;

const vesselService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(vesselApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(vesselApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${vesselApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${vesselApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${vesselApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${vesselApi.activates}`, model);
  },
  //#endregion

  //#region countries

  getByCountryIdAsync: async (countryId) => {
    return await apiHelper.get(`${vesselApi.getByCountryId}?countryId=${countryId}`);
  },

  getByCountryIdPromise: (countryId) => {
    return apiHelper.get(`${vesselApi.getByCountryId}?countryId=${countryId}`);
  },

  //#endregion
};

export default vesselService;
