import React, { useEffect } from 'react';
import Oidc from 'oidc-client';

export default function Silent() {
    useEffect(() => {
        var mgr = new Oidc.UserManager();
        mgr.signinSilentCallback();
    });

    return (
        null
    );
}