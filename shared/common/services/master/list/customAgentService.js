import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const customAgentApi = config.api.private.master.customAgent;

const customAgentService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(customAgentApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(customAgentApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${customAgentApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${customAgentApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${customAgentApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${customAgentApi.activates}`, model);
  },
  //#endregion
};

export default customAgentService;
