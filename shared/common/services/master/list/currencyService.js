import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const currencyApi = config.api.private.master.currency;

const currencyService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(currencyApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(currencyApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${currencyApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${currencyApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${currencyApi.deletes}`, model);
  },

  getAllAsync: async () => {
    return await apiHelper.get(`${currencyApi.getAll}`);
  },

  getAllPromise: () => {
    return apiHelper.get(`${currencyApi.getAll}`);
  },
  //#endregion
};

export default currencyService;
