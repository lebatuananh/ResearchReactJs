import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const globalZoneApi = config.api.private.master.globalZone;

const globalZoneService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(globalZoneApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(globalZoneApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${globalZoneApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${globalZoneApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${globalZoneApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${globalZoneApi.activates}`, model);
  },
  //#endregion
};

export default globalZoneService;
