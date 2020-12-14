import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const chargesGroupApi = config.api.private.master.chargesGroup;

const chargesGroupService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(chargesGroupApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(chargesGroupApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${chargesGroupApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${chargesGroupApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${chargesGroupApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${chargesGroupApi.activates}`, model);
  },
  //#endregion
};

export default chargesGroupService;
