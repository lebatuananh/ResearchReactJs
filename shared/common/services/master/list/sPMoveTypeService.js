import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const sPMoveTypeApi = config.api.private.master.sPMoveType;

const sPMoveTypeService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(sPMoveTypeApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(sPMoveTypeApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${sPMoveTypeApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPMoveTypeApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPMoveTypeApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPMoveTypeApi.activates}`, model);
  },
  //#endregion
};

export default sPMoveTypeService;
