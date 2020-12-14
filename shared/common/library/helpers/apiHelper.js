import axios from 'axios';
import qs from 'qs';
import { IChibaHeaderNames } from '@shared/lib/helpers/utility';
//import settings from '../../config/appsettings';
import { default as langConfig } from '@shared/config-admin/language.config';
import headersHelper from '@shared/lib/helpers/headersHelper';

const apiHelper = axios.create({
  //baseURL: settings.api.gateway.baseUrl,
  //baseURL: 'http://10.110.1.210:5000/api',
  //baseURL: 'http://localhost:50000',
  timeout: 180000,
  headers: {
    ...headersHelper.def,
  },
  paramsSerializer: (params) =>
    qs.stringify(params, {
      encode: false,
    }),
});

// Add a request interceptor
apiHelper.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiHelper.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default apiHelper;
