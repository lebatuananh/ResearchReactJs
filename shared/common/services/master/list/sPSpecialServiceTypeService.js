import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const sPSpecialServiceTypeApi = config.api.private.master.sPSpecialServiceType;

const sPSpecialServiceTypeService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(sPSpecialServiceTypeApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(sPSpecialServiceTypeApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${sPSpecialServiceTypeApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPSpecialServiceTypeApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPSpecialServiceTypeApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${sPSpecialServiceTypeApi.activates}`, model);
  },
  //#endregion
};

export default sPSpecialServiceTypeService;
