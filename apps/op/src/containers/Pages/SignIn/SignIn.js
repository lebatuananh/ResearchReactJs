import React, { useEffect } from 'react';
import Oidc from 'oidc-client';
import authHelper from '@shared/lib/helpers/authHelper';

import config from '../../../config/appsettings';

export default function SignIn() {
  useEffect(() => {
    if (!authHelper.isAuthenticated()) {
      const userMng = new Oidc.UserManager(config.sso);
      userMng.signinRedirect();
    } else {
      window.location = "/dashboard";
    }
  }, []);

  return (
    null
  );
}