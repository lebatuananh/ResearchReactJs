import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const measureDimensionApi = config.api.private.master.measureDimension;

const measureDimensionService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(measureDimensionApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(measureDimensionApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${measureDimensionApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${measureDimensionApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${measureDimensionApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${measureDimensionApi.activates}`, model);
  },
  //#endregion
};

export default measureDimensionService;
