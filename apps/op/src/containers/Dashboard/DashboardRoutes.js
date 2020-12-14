import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@shared/components-admin/utility/loader';

const routes = [
  {
    path: 'dashboard',
    component: lazy(() => import('@shared/containers-admin/BlankPage')),
    exact: true,
  },
  {
    path: 'create-order',
    component: lazy(() => import('../Order/Create')),
  },
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          // <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
          //   <route.component />
          // </Route>
          <Route exact={route.exact} key={idx} path={`/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
