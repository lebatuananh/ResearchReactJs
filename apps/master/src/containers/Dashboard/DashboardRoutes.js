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
    path: 'airline',
    component: lazy(() => import('../List/Airline/Airline')),
  },
  {
    path: 'bank',
    component: lazy(() => import('../List/Bank/Bank')),
  },
  {
    path: 'bank-account',
    component: lazy(() => import('../List/BankAccount/BankAccount')),
  },
  {
    path: 'category',
    component: lazy(() => import('../Category/Category')),
  },
  {
    path: 'charges-group',
    component: lazy(() => import('../List/ChargesGroup/ChargesGroup')),
  },
  {
    path: 'commodity',
    component: lazy(() => import('../List/Commodity/Commodity')),
  },
  {
    path: 'consignee',
    component: lazy(() => import('../List/Consignee/Consignee')),
  },
  {
    path: 'country',
    component: lazy(() => import('../List/Country/Country')),
  },
  {
    path: 'currency',
    component: lazy(() => import('../List/Currency/Currency')),
  },
  {
    path: 'custom-agent',
    component: lazy(() => import('../List/CustomAgent/CustomAgent')),
  },
  {
    path: 'delivery-time',
    component: lazy(() => import('../List/DeliveryTime/DeliveryTime')),
  },
  {
    path: 'district',
    component: lazy(() => import('../List/District/District')),
  },
  {
    path: 'forwarding-agent',
    component: lazy(() => import('../List/ForwardingAgent/ForwardingAgent')),
  },
  {
    path: 'global-zone',
    component: lazy(() => import('../List/GlobalZone/GlobalZone')),
  },
  {
    path: 'incoterm',
    component: lazy(() => import('../List/Incoterm/Incoterm')),
  },
  {
    path: 'measure-dimension',
    component: lazy(() => import('../List/MeasureDimension/MeasureDimension')),
  },
  {
    path: 'measure-weight',
    component: lazy(() => import('../List/MeasureWeight/MeasureWeight')),
  },
  {
    path: 'package-type',
    component: lazy(() => import('../List/PackageType/PackageType')),
  },
  {
    path: 'payment-method',
    component: lazy(() => import('../List/PaymentMethod/PaymentMethod')),
  },
  {
    path: 'payment-term',
    component: lazy(() => import('../List/PaymentTerm/PaymentTerm')),
  },
  {
    path: 'port',
    component: lazy(() => import('../List/Port/Port')),
  },
  {
    path: 'shipper',
    component: lazy(() => import('../List/Shipper/Shipper')),
  },
  {
    path: 'shipping-agent',
    component: lazy(() => import('../List/ShippingAgent/ShippingAgent')),
  },
  {
    path: 'shipping-line',
    component: lazy(() => import('../List/ShippingLine/ShippingLine')),
  },
  {
    path: 'sp-customer',
    component: lazy(() => import('../List/SPCustomer/SPCustomer')),
  },
  {
    path: 'sp-measurement',
    component: lazy(() => import('../List/SPMeasurement/SPMeasurement')),
  },
  {
    path: 'sp-move-type',
    component: lazy(() => import('../List/SPMoveType/SPMoveType')),
  },
  {
    path: 'sp-product-type',
    component: lazy(() => import('../List/SPProductType/SPProductType')),
  },
  {
    path: 'sp-special-service-type',
    component: lazy(() => import('../List/SPSpecialServiceType/SPSpecialServiceType')),
  },
  {
    path: 'state-province',
    component: lazy(() => import('../List/StateProvince/StateProvince')),
  },
  {
    path: 'trucker',
    component: lazy(() => import('../List/Trucker/Trucker')),
  },
  {
    path: 'vat-type',
    component: lazy(() => import('../List/VatType/VatType')),
  },
  {
    path: 'vendor',
    component: lazy(() => import('../List/Vendor/Vendor')),
  },
  {
    path: 'vessel',
    component: lazy(() => import('../List/Vessel/Vessel')),
  },
  {
    path: 'ward',
    component: lazy(() => import('../List/Ward/Ward')),
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
