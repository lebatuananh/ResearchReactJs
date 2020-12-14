import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const sPMeasurementApi = config.api.private.master.sPMeasurement;

const sPMeasurementService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(sPMeasurementApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(sPMeasurementApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${sPMeasurementApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPMeasurementApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPMeasurementApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPMeasurementApi.activates}`, model);
  },
  //#endregion
};

export default sPMeasurementService;
