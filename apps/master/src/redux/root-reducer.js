import { combineReducers } from 'redux';
import App from './app/reducer';
import Auth from '@shared/redux-admin/auth/reducer';
import ThemeSwitcher from '@shared/redux-admin/themeSwitcher/reducer';
import LanguageSwitcher from '@shared/redux-admin/languageSwitcher/reducer';
import Category from './category/reducer';
import Airline from './list/airline/reducer';
import Port from './list/port/reducer';
import GlobalZone from './list/globalZone/reducer';
import Country from './list/country/reducer';
import StateProvince from './list/stateProvince/reducer';
import District from './list/district/reducer';
import Ward from './list/ward/reducer';
import Bank from './list/bank/reducer';
import ChargesGroup from './list/chargesGroup/reducer';
import Incoterm from './list/incoterm/reducer';
import PaymentMethod from './list/paymentMethod/reducer';
import SPProductType from './list/sPProductType/reducer';
import SPMoveType from './list/sPMoveType/reducer';
import ForwardingAgent from './list/forwardingAgent/reducer';
import Shipper from './list/shipper/reducer';
import Consignee from './list/consignee/reducer';
import PaymentTerm from './list/paymentTerm/reducer';
import SPCustomer from './list/sPCustomer/reducer';
import CustomAgent from './list/customAgent/reducer';
import ShippingAgent from './list/shippingAgent/reducer';
import ShippingLine from './list/shippingLine/reducer';
import PackageType from './list/packageType/reducer';
import Vessel from './list/vessel/reducer';
import Trucker from './list/trucker/reducer';
import Commodity from './list/commodity/reducer';
import Currency from './list/currency/reducer';
import SPMeasurement from './list/sPMeasurement/reducer';
import DeliveryTime from './list/deliveryTime/reducer';
import SPSpecialServiceType from './list/sPSpecialServiceType/reducer';
import VatType from './list/vatType/reducer';
import Vendor from './list/vendor/reducer';
import BankAccount from './list/bankAccount/reducer';
import MeasureDimension from './list/measureDimension/reducer';
import MeasureWeight from './list/measureWeight/reducer';

export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Category,
  Airline,
  Port,
  GlobalZone,
  Country,
  StateProvince,
  District,
  Ward,
  Bank,
  ChargesGroup,
  Incoterm,
  PaymentMethod,
  SPProductType,
  SPMoveType,
  ForwardingAgent,
  Shipper,
  Consignee,
  PaymentTerm,
  SPCustomer,
  CustomAgent,
  ShippingAgent,
  ShippingLine,
  PackageType,
  Vessel,
  Trucker,
  Commodity,
  Currency,
  SPMeasurement,
  DeliveryTime,
  SPSpecialServiceType,
  VatType,
  Vendor,
  BankAccount,
  MeasureDimension,
  MeasureWeight,
});
