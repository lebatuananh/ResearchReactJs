import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Oidc from 'oidc-client';
import authAction from '@shared/redux-admin/auth/actions';
import authHelper from '@shared/lib/helpers/authHelper';

const { loginSuccess } = authAction;

export default function Callback() {
    useEffect(() => {
        var mgr = new Oidc.UserManager({ loadUserInfo: true, filterProtocolClaims: true, response_mode: "query" });
        //const mgr = new Oidc.UserManager({ loadUserInfo: true, filterProtocolClaims: true });
        mgr.signinRedirectCallback().then(function (user) {
            console.log(user);
            authHelper.setSession(user);
            window.history.replaceState({},
                window.document.title,
                window.location.origin + window.location.pathname);
            window.location = "/dashboard";
        }).catch(function (e) {
            console.error(e);
        });
    }, []);

    return (
        <div className="container" >
            <div className="page-header">
                <h1>Processing callback...</h1>
            </div>

            <div className="row">
                <div className="col-md-2">
                    <a href="/dashboard" className="btn btn-primary">Back to index</a>
                </div>
            </div>
        </div>
    );
}