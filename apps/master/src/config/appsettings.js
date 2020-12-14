import config from '@shared/config/appsettings';

const devConfig = {
  production: false,
  sso: {
    authority: config.sso.admin.baseUrl,
    client_id: 'efex.client.master',
    redirect_uri: 'http://localhost:1000/callback',
    post_logout_redirect_uri: 'http://localhost:1000',
    //response_type: "id_token token",
    response_type: 'code',
    scope: 'openid profile offline_access efex.api.master',
    //loadUserInfo: true,
    silent_redirect_uri: 'http://localhost:1000/silent',
    //automaticSilentRenew: true,
    //monitorAnonymousSession: true,
    revokeAccessTokenOnSignout: true,
    //filterProtocolClaims: false
  },
};
const stagingConfig = {
  production: false,
  sso: {
    authority: config.sso.admin.baseUrl,
    client_id: 'efex.client.master',
    redirect_uri: 'http://master.efex.asia/callback',
    post_logout_redirect_uri: 'http://master.efex.asia',
    response_type: 'code',
    scope: 'openid profile offline_access efex.api.master',
    silent_redirect_uri: 'http://master.efex.asia/silent',
    revokeAccessTokenOnSignout: true,
  },
};
const prodConfig = {
  production: true,
  sso: {
    authority: config.sso.admin.baseUrl,
    client_id: 'efex.client.master',
    redirect_uri: 'http://master.efex.asia/callback',
    post_logout_redirect_uri: 'http://master.efex.asia',
    response_type: 'code',
    scope: 'openid profile offline_access efex.api.master',
    silent_redirect_uri: 'http://master.efex.asia/silent',
    revokeAccessTokenOnSignout: true,
  },
};

// prettier-ignore
const masterConfig = process.env.REACT_APP_ENV === 'production'
  ? prodConfig
  : process.env.REACT_APP_ENV === 'staging'
    ? stagingConfig
    : devConfig;

export default {
  ...masterConfig,
};
