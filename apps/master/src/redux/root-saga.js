import { all } from 'redux-saga/effects';
import authSagas from '@shared/redux-admin/auth/saga';
import categorySaga from './category/saga';
import airlineSaga from './list/airline/saga';
import portSaga from './list/port/saga';
import globalZoneSaga from './list/globalZone/saga';
import countrySaga from './list/country/saga';
import stateProvinceSaga from './list/stateProvince/saga';
import districtSaga from './list/district/saga';
import wardSaga from './list/ward/saga';
import bankSaga from './list/bank/saga';
import chargesGroupSaga from './list/chargesGroup/saga';
import incotermSaga from './list/incoterm/saga';
import paymentMethodSaga from './list/paymentMethod/saga';
import sPProductTypeSaga from './list/sPProductType/saga';
import sPMoveTypeSaga from './list/sPMoveType/saga';
import forwardingAgentSaga from './list/forwardingAgent/saga';
import shipperSaga from './list/shipper/saga';
import consigneeSaga from './list/consignee/saga';
import paymentTermSaga from './list/paymentTerm/saga';
import sPCustomerSaga from './list/sPCustomer/saga';
import customAgentSaga from './list/customAgent/saga';
import shippingAgentSaga from './list/shippingAgent/saga';
import shippingLineSaga from './list/shippingLine/saga';
import packageTypeSaga from './list/packageType/saga';
import vesselSaga from './list/vessel/saga';
import truckerSaga from './list/trucker/saga';
import commoditySaga from './list/commodity/saga';
import currencySaga from './list/currency/saga';
import sPMeasurementSaga from './list/sPMeasurement/saga';
import deliveryTimeSaga from './list/deliveryTime/saga';
import sPSpecialServiceTypeSaga from './list/sPSpecialServiceType/saga';
import vatTypeSaga from './list/vatType/saga';
import vendorSaga from './list/vendor/saga';
import bankAccountSaga from './list/bankAccount/saga';
import measureDimensionSaga from './list/measureDimension/saga';
import measureWeightSaga from './list/measureWeight/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    categorySaga(),
    airlineSaga(),
    countrySaga(),
    portSaga(),
    globalZoneSaga(),
    stateProvinceSaga(),
    districtSaga(),
    wardSaga(),
    bankSaga(),
    chargesGroupSaga(),
    incotermSaga(),
    paymentMethodSaga(),
    sPProductTypeSaga(),
    sPMoveTypeSaga(),
    forwardingAgentSaga(),
    shipperSaga(),
    consigneeSaga(),
    paymentTermSaga(),
    sPCustomerSaga(),
    customAgentSaga(),
    shippingAgentSaga(),
    shippingLineSaga(),
    packageTypeSaga(),
    vesselSaga(),
    truckerSaga(),
    commoditySaga(),
    currencySaga(),
    sPMeasurementSaga(),
    deliveryTimeSaga(),
    sPSpecialServiceTypeSaga(),
    vatTypeSaga(),
    vendorSaga(),
    bankAccountSaga(),
    measureDimensionSaga(),
    measureWeightSaga(),
  ]);
  yield all([authSagas(), categorySaga(), portSaga()]);
  yield all([authSagas(), categorySaga(), globalZoneSaga()]);
}
