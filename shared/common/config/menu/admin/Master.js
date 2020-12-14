import { getSourceMap } from '@shared/lib/helpers/utility';

const MasterMenu = [
  {
    key: 'dashboard',
    label: 'sidebar.dashboard',
    leftIcon: 'ion-grid',
  },

  {
    key: 'catalog',
    label: 'sidebar.catalog',
    leftIcon: 'ion-android-menu',
    children: [
      {
        key: 'partner',
        label: 'sidebar.catalog.partner',
        leftIcon: 'ion-android-options',
        children: [
          {
            key: 'agent',
            label: 'sidebar.catalog.partner.agent',
          },
          {
            key: 'custom-agent',
            label: 'sidebar.catalog.partner.customAgent',
          },
          {
            key: 'airline',
            label: 'sidebar.catalog.partner.airline',
          },
          // {
          //   key: 'carrier',
          //   label: 'sidebar.catalog.partner.carrier',
          // },
          {
            key: 'forwarding-agent',
            label: 'sidebar.catalog.partner.forwardingAgent',
          },
          {
            key: 'shipping-agent',
            label: 'sidebar.catalog.partner.shippingAgent',
          },
          {
            key: 'shipping-line',
            label: 'sidebar.catalog.partner.shippingLine',
          },
          {
            key: 'consignee',
            label: 'sidebar.catalog.partner.consignee',
          },
          {
            key: 'sp-customer',
            label: 'sidebar.catalog.partner.sPCustomer',
          },
          {
            key: 'trucker',
            label: 'sidebar.catalog.partner.trucker',
          },
          {
            key: 'vendor',
            label: 'sidebar.catalog.partner.vendor',
          },
        ],
      },
      {
        key: 'billing',
        label: 'sidebar.catalog.billing',
        children: [
          {
            key: 'charges-group',
            label: 'sidebar.catalog.billing.chargesGroup',
          },
          {
            key: 'bank',
            label: 'sidebar.catalog.billing.bank',
          },
          {
            key: 'incoterm',
            label: 'sidebar.catalog.billing.incoterm',
          },
          {
            key: 'payment-term',
            label: 'sidebar.catalog.billing.paymentTerm',
          },
          {
            key: 'sp-measurement',
            label: 'sidebar.catalog.billing.sPMeasurement',
          },
          {
            key: 'vat-type',
            label: 'sidebar.catalog.billing.vatType',
          },
        ],
      },
      {
        key: 'location',
        label: 'sidebar.catalog.location',
        children: [
          {
            key: 'port',
            label: 'sidebar.catalog.location.port',
          },
          {
            key: 'global-zone',
            label: 'sidebar.catalog.location.globalZone',
          },
          {
            key: 'country',
            label: 'sidebar.catalog.location.country',
          },
          {
            key: 'state-province',
            label: 'sidebar.catalog.location.stateProvince',
          },
          {
            key: 'district',
            label: 'sidebar.catalog.location.district',
          },
          {
            key: 'ward',
            label: 'sidebar.catalog.location.ward',
          },
        ],
      },
      // {
      //   key: 'airline',
      //   label: 'sidebar.catalog.airline',
      // },
      // {
      //   key: 'port',
      //   label: 'sidebar.catalog.port',
      // },
      // {
      //   key: 'carrier',
      //   label: 'sidebar.catalog.carrier',
      // },
      // {
      //   key: 'charges-group',
      //   label: 'sidebar.catalog.chargesGroup',
      // },
      // {
      //   key: 'seaport',
      //   label: 'sidebar.catalog.seaport',
      // },
      {
        key: 'sp-product-type',
        label: 'sidebar.catalog.sPProductType',
      },
      {
        key: 'sp-move-type',
        label: 'sidebar.catalog.sPProductMoveType',
      },
      {
        key: 'shipper',
        label: 'sidebar.catalog.partner.shipper',
      },
      {
        key: 'package-type',
        label: 'sidebar.catalog.packageType',
      },
      {
        key: 'vessel',
        label: 'sidebar.catalog.vessel',
      },
      {
        key: 'commodity',
        label: 'sidebar.catalog.commodity',
      },
      {
        key: 'sp-special-service-type',
        label: 'sidebar.catalog.sPSpecialServiceType',
      },
      // {
      //   key: 'bank',
      //   label: 'sidebar.catalog.bank',
      // },
      // {
      //   key: 'incoterm',
      //   label: 'sidebar.catalog.incoterm',
      // },
      // {
      //   key: 'payment-term',
      //   label: 'sidebar.catalog.paymentTerm',
      // },
      // {
      //   key: 'global-zone',
      //   label: 'sidebar.catalog.globalZone',
      // },
      // {
      //   key: 'country',
      //   label: 'sidebar.catalog.country',
      // },
      // {
      //   key: 'state-province',
      //   label: 'sidebar.catalog.stateProvince',
      // },
      // {
      //   key: 'district',
      //   label: 'sidebar.catalog.district',
      // },
      // {
      //   key: 'ward',
      //   label: 'sidebar.catalog.ward',
      // },
      // {
      //   key: 'forwarding-agent',
      //   label: 'sidebar.catalog.forwardingAgent',
      // },
      // {
      //   key: 'shipper',
      //   label: 'sidebar.catalog.shipper',
      // },
      // {
      //   key: 'consignee',
      //   label: 'sidebar.catalog.consignee',
      // },
      // {
      //   key: 'customer',
      //   label: 'sidebar.catalog.customer',
      // },
    ],
  },

  {
    key: 'setting',
    label: 'sidebar.setting',
    leftIcon: 'ion-android-options',
    children: [
      {
        key: 'payment-method',
        label: 'sidebar.setting.paymentMethod',
      },
      {
        key: 'bank-account',
        label: 'sidebar.setting.bankAccount',
      },
      {
        key: 'delivery-time',
        label: 'sidebar.setting.deliveryTime',
      },
      {
        key: 'currency',
        label: 'sidebar.setting.currency',
      },
      {
        key: 'measure-dimension',
        label: 'sidebar.setting.measureDimension',
      },
      {
        key: 'measure-weight',
        label: 'sidebar.setting.measureWeight',
      },
      {
        key: 'quantity-unit',
        label: 'sidebar.setting.quantityUnit',
      },
    ],
  },
];

export default MasterMenu;

export const MasterMenuMapper = getSourceMap(MasterMenu);
