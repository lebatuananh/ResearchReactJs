import apiHelper from '@shared/lib/helpers/apiHelper';
import config from '@shared/config/appsettings';

const vatTypeApi = config.api.private.master.vatType;

const vatTypeService = {
  //#region CRUD
  createGetModelAsync: async () => {
    return await apiHelper.get(vatTypeApi.create);
  },
  createPostModelAsync: async (model) => {
    return await apiHelper.post(vatTypeApi.create, model);
  },
  editGetModelAsync: async (id) => {
    return await apiHelper.get(`${vatTypeApi.edit}?id=${id}`);
  },
  editPostModelAsync: async (model) => {
    return await apiHelper.post(`${vatTypeApi.edit}`, model);
  },
  deletesPostModelAsync: async (model) => {
    return await apiHelper.post(`${vatTypeApi.deletes}`, model);
  },
  activatesPostModelAsync: async (model) => {
    return await apiHelper.post(`${vatTypeApi.activates}`, model);
  },
  //#endregion
};

export default vatTypeService;
