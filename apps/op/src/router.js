import React, { lazy, Suspense } from 'react';
import { Route, Redirect, BrowserRouter as Router, Switch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ErrorBoundary from './ErrorBoundary';
import { PUBLIC_ROUTE } from './route.constants';
import Loader from '@shared/components-admin/utility/loader';
import authHelper from '@shared/lib/helpers/authHelper';

import DashboardRoutes from './containers/Dashboard/DashboardRoutes';
import OPMenu from '@shared/config/menu/admin/OP';
import config from './config/appsettings';

const Dashboard = lazy(() => import('@shared/containers-admin/Dashboard/Dashboard'));

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    exact: true,
    component: lazy(() => import('./containers/Pages/SignIn/SignIn')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import('@shared/containers-admin/Pages/404/404')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_500,
    component: lazy(() => import('@shared/containers-admin/Pages/500/500')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import('./containers/Pages/SignIn/SignIn')),
  },
  {
    path: PUBLIC_ROUTE.REDIRECT_URI,
    component: lazy(() => import('@shared/containers-admin/Pages/SSO/Callback/Callback')),
  },
  {
    path: PUBLIC_ROUTE.SILENT_REDIRECT_URI,
    component: lazy(() => import('@shared/containers-admin/Pages/SSO/Silent/Silent')),
  },
];

function PrivateRoute({ children, ...rest }) {
  let location = useLocation();
  const isLoggedIn = authHelper.isAuthenticated();
  if (isLoggedIn) return <Route {...rest}>{children}</Route>;
  return (
    <Redirect
      to={{
        pathname: '/signin',
        state: { from: location },
      }}
    />
  );
}
export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <PrivateRoute path='/'>
              <Dashboard dashboardRoutes={<DashboardRoutes />} appName='op' sidebarMenu={OPMenu} config={config} />
            </PrivateRoute>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
