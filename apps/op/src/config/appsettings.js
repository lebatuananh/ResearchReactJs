import config from '@shared/config/appsettings';

const devConfig = {
  production: false,
  sso: {
    authority: config.sso.admin.baseUrl,
    client_id: 'efex.client.op',
    redirect_uri: 'http://localhost:1100/callback',
    post_logout_redirect_uri: 'http://localhost:1100',
    response_type: 'code',
    scope: 'openid profile offline_access efex.api.master efex.api.op',
    silent_redirect_uri: 'http://localhost:1100/silent',
    revokeAccessTokenOnSignout: true,
  },
};
const stagingConfig = {
  production: false,
  sso: {
    authority: config.sso.admin.baseUrl,
    client_id: 'efex.client.op',
    redirect_uri: 'http://op.efex.asia/callback',
    post_logout_redirect_uri: 'http://op.efex.asia',
    response_type: 'code',
    scope: 'openid profile offline_access efex.api.master efex.api.op',
    silent_redirect_uri: 'http://op.efex.asia/silent',
    revokeAccessTokenOnSignout: true,
  },
};
const prodConfig = {
  production: true,
  sso: {
    authority: config.sso.admin.baseUrl,
    client_id: 'efex.client.op',
    redirect_uri: 'http://op.efex.asia/callback',
    post_logout_redirect_uri: 'http://op.efex.asia',
    response_type: 'code',
    scope: 'openid profile offline_access efex.api.master efex.api.op',
    silent_redirect_uri: 'http://op.efex.asia/silent',
    revokeAccessTokenOnSignout: true,
  },
};

// prettier-ignore
const opConfig = process.env.REACT_APP_ENV === 'production'
  ? prodConfig
  : process.env.REACT_APP_ENV === 'staging'
    ? stagingConfig
    : devConfig;

export default {
  ...opConfig,
};
