import { getSourceMap } from '@shared/lib/helpers/utility';
const OPMenu = [
  {
    key: 'dashboard',
    label: 'sidebar.dashboard',
    leftIcon: 'ion-grid',
  },

  {
    key: 'order',
    label: 'sidebar.order',
    leftIcon: 'ion-bag',
    children: [
      {
        key: 'create-order',
        label: 'sidebar.order.create',
      },
      {
        key: 'management-order',
        label: 'sidebar.order.management',
      },
    ],
  },

  {
    key: 'operations',
    label: 'sidebar.operation',
    leftIcon: 'ion-android-checkbox-outline',
    children: [
      {
        key: 'receive',
        label: 'sidebar.operation.receive',
      },
      {
        key: 'handling',
        label: 'sidebar.operation.handling',
      },
      {
        key: 'dispatch',
        label: 'sidebar.operation.dispatch',
      },
      {
        key: 'charge',
        label: 'sidebar.operation.charge',
      },
      {
        key: 'doc',
        label: 'sidebar.operation.doc',
      },
      {
        key: 'delivery',
        label: 'sidebar.operation.delivery',
      },
      {
        key: 'trace',
        label: 'sidebar.operation.trace',
      },
    ],
  },

  {
    key: 'payments',
    label: 'sidebar.payments',
    leftIcon: 'ion-clipboard',
    children: [
      {
        key: 'create-payment',
        label: 'sidebar.payments.create',
      },
      {
        key: 'management-payment',
        label: 'sidebar.payments.management',
      },
      {
        key: 'report-payment',
        label: 'sidebar.payments.report',
      },
    ],
  },

  {
    key: 'log-event',
    label: 'sidebar.log',
    leftIcon: 'ion-flash',
  },

  {
    key: 'reports',
    label: 'sidebar.report',
    leftIcon: 'ion-arrow-graph-up-right',
  },

  {
    key: 'utils',
    label: 'sidebar.util',
    leftIcon: 'ion-leaf',
  },
];

export default OPMenu;

export const OPMenuMapper = getSourceMap(OPMenu);
