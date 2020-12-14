import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const forwardingAgentApi = config.api.private.master.forwardingAgent;

const forwardingAgentService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(forwardingAgentApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(forwardingAgentApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${forwardingAgentApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${forwardingAgentApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${forwardingAgentApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${forwardingAgentApi.activates}`, model);
  },
  //#endregion
};

export default forwardingAgentService;
