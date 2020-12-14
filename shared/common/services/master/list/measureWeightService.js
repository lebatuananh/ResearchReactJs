import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const measureWeightApi = config.api.private.master.measureWeight;

const measureWeightService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(measureWeightApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(measureWeightApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${measureWeightApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${measureWeightApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${measureWeightApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${measureWeightApi.activates}`, model);
  },
  //#endregion
};

export default measureWeightService;
