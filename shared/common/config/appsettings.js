//#region BaseUrl
const devBaseUrl = {
  sso: {
    admin: 'https://login.efex.asia',
  },
  api: {
    gateway: 'https://api.efex.asia',
    private: {
      master: 'http://localhost:50000',
      op: 'http://localhost:50100',
    },
  },
};
const stagingBaseUrl = {
  sso: {
    admin: 'https://login.efex.asia',
  },
  api: {
    gateway: 'https://api.efex.asia',
    private: {
      master: 'http://master-api.efex.asia',
      op: 'http://op-api.efex.asia',
    },
  },
};
const prodBaseUrl = {
  sso: {
    admin: 'https://login.efex.asia',
  },
  api: {
    gateway: 'https://api.efex.vn',
    private: {
      master: 'http://master-api.efex.asia',
      op: 'http://op-api.efex.asia',
    },
  },
};

// prettier-ignore
const baseUrl = process.env.REACT_APP_ENV === 'production'
  ? prodBaseUrl
  : process.env.REACT_APP_ENV === 'staging'
    ? stagingBaseUrl
    : devBaseUrl;
//#endregion

const baseConfig = {
  sso: {
    admin: {
      baseUrl: baseUrl.sso.admin,
      discoveryEndpoint: `${baseUrl.sso.admin}/.well-known/openid-configuration`,
    },
  },
  api: {
    gateway: {
      baseUrl: baseUrl.api.gateway,
    },
    public: {
      wh: {
        getAllRoutes: `${baseUrl.api.gateway}/wh/get-all-routes`,
      },
    },
    private: {
      master: {
        airline: {
          get: `${baseUrl.api.private.master}/airline/get`,
          create: `${baseUrl.api.private.master}/airline/create`,
          edit: `${baseUrl.api.private.master}/airline/edit`,
          deletes: `${baseUrl.api.private.master}/airline/deletes`,
          activates: `${baseUrl.api.private.master}/airline/activates`,
        },
        bank: {
          get: `${baseUrl.api.private.master}/bank/get`,
          create: `${baseUrl.api.private.master}/bank/create`,
          edit: `${baseUrl.api.private.master}/bank/edit`,
          deletes: `${baseUrl.api.private.master}/bank/deletes`,
          activates: `${baseUrl.api.private.master}/bank/activates`,
        },
        bankAccount: {
          get: `${baseUrl.api.private.master}/bank-account/get`,
          create: `${baseUrl.api.private.master}/bank-account/create`,
          edit: `${baseUrl.api.private.master}/bank-account/edit`,
          deletes: `${baseUrl.api.private.master}/bank-account/deletes`,
          activates: `${baseUrl.api.private.master}/bank-account/activates`,
        },
        chargesGroup: {
          get: `${baseUrl.api.private.master}/charges-group/get`,
          create: `${baseUrl.api.private.master}/charges-group/create`,
          edit: `${baseUrl.api.private.master}/charges-group/edit`,
          deletes: `${baseUrl.api.private.master}/charges-group/deletes`,
          activates: `${baseUrl.api.private.master}/charges-group/activates`,
        },
        commodity: {
          get: `${baseUrl.api.private.master}/commodity/get`,
          create: `${baseUrl.api.private.master}/commodity/create`,
          edit: `${baseUrl.api.private.master}/commodity/edit`,
          deletes: `${baseUrl.api.private.master}/commodity/deletes`,
          activates: `${baseUrl.api.private.master}/commodity/activates`,
        },
        consignee: {
          get: `${baseUrl.api.private.master}/consignee/get`,
          create: `${baseUrl.api.private.master}/consignee/create`,
          edit: `${baseUrl.api.private.master}/consignee/edit`,
          deletes: `${baseUrl.api.private.master}/consignee/deletes`,
          activates: `${baseUrl.api.private.master}/consignee/activates`,
          getAll: `${baseUrl.api.private.master}/consignee/get-all`,
          getByPaymentTermId: `${baseUrl.api.private.master}/consignee/get-by-payment-term-id`,
          getTopSelect: `${baseUrl.api.private.master}/consignee/get-top-select`,
          getAddressesSelect: `${baseUrl.api.private.master}/consignee/get-addresses-select`,
          getAddressesTopSelect: `${baseUrl.api.private.master}/consignee/get-addresses-top-select`,
        },
        country: {
          get: `${baseUrl.api.private.master}/country/get`,
          create: `${baseUrl.api.private.master}/country/create`,
          edit: `${baseUrl.api.private.master}/country/edit`,
          deletes: `${baseUrl.api.private.master}/country/deletes`,
          activates: `${baseUrl.api.private.master}/country/activates`,
          getAll: `${baseUrl.api.private.master}/country/get-all`,
        },
        currency: {
          get: `${baseUrl.api.private.master}/currency/get`,
          create: `${baseUrl.api.private.master}/currency/create`,
          edit: `${baseUrl.api.private.master}/currency/edit`,
          deletes: `${baseUrl.api.private.master}/currency/deletes`,
          getAll: `${baseUrl.api.private.master}/currency/get-all`,
        },
        customAgent: {
          get: `${baseUrl.api.private.master}/custom-agent/get`,
          create: `${baseUrl.api.private.master}/custom-agent/create`,
          edit: `${baseUrl.api.private.master}/custom-agent/edit`,
          deletes: `${baseUrl.api.private.master}/custom-agent/deletes`,
          activates: `${baseUrl.api.private.master}/custom-agent/activates`,
        },
        deliveryTime: {
          get: `${baseUrl.api.private.master}/delivery-time/get`,
          create: `${baseUrl.api.private.master}/delivery-time/create`,
          edit: `${baseUrl.api.private.master}/delivery-time/edit`,
          deletes: `${baseUrl.api.private.master}/delivery-time/deletes`,
          activates: `${baseUrl.api.private.master}/delivery-time/activates`,
        },
        district: {
          get: `${baseUrl.api.private.master}/district/get`,
          create: `${baseUrl.api.private.master}/district/create`,
          edit: `${baseUrl.api.private.master}/district/edit`,
          deletes: `${baseUrl.api.private.master}/district/deletes`,
          activates: `${baseUrl.api.private.master}/district/activates`,
          getByStateProvinceId: `${baseUrl.api.private.master}/district/get-by-state-province-id`,
        },
        forwardingAgent: {
          get: `${baseUrl.api.private.master}/forwarding-agent/get`,
          create: `${baseUrl.api.private.master}/forwarding-agent/create`,
          edit: `${baseUrl.api.private.master}/forwarding-agent/edit`,
          deletes: `${baseUrl.api.private.master}/forwarding-agent/deletes`,
          activates: `${baseUrl.api.private.master}/forwarding-agent/activates`,
        },
        globalZone: {
          get: `${baseUrl.api.private.master}/global-zone/get`,
          create: `${baseUrl.api.private.master}/global-zone/create`,
          edit: `${baseUrl.api.private.master}/global-zone/edit`,
          deletes: `${baseUrl.api.private.master}/global-zone/deletes`,
          activates: `${baseUrl.api.private.master}/global-zone/activates`,
          getAll: `${baseUrl.api.private.master}/global-zone/get-all`,
        },
        incoterm: {
          get: `${baseUrl.api.private.master}/incoterm/get`,
          create: `${baseUrl.api.private.master}/incoterm/create`,
          edit: `${baseUrl.api.private.master}/incoterm/edit`,
          deletes: `${baseUrl.api.private.master}/incoterm/deletes`,
          activates: `${baseUrl.api.private.master}/incoterm/activates`,
        },
        measureDimension: {
          get: `${baseUrl.api.private.master}/measure-dimension/get`,
          create: `${baseUrl.api.private.master}/measure-dimension/create`,
          edit: `${baseUrl.api.private.master}/measure-dimension/edit`,
          deletes: `${baseUrl.api.private.master}/measure-dimension/deletes`,
          activates: `${baseUrl.api.private.master}/measure-dimension/activates`,
        },
        measureWeight: {
          get: `${baseUrl.api.private.master}/measure-weight/get`,
          create: `${baseUrl.api.private.master}/measure-weight/create`,
          edit: `${baseUrl.api.private.master}/measure-weight/edit`,
          deletes: `${baseUrl.api.private.master}/measure-weight/deletes`,
          activates: `${baseUrl.api.private.master}/measure-weight/activates`,
        },
        packageType: {
          get: `${baseUrl.api.private.master}/package-type/get`,
          create: `${baseUrl.api.private.master}/package-type/create`,
          edit: `${baseUrl.api.private.master}/package-type/edit`,
          deletes: `${baseUrl.api.private.master}/package-type/deletes`,
          activates: `${baseUrl.api.private.master}/package-type/activates`,
        },
        paymentMethod: {
          get: `${baseUrl.api.private.master}/payment-method/get`,
          create: `${baseUrl.api.private.master}/payment-method/create`,
          edit: `${baseUrl.api.private.master}/payment-method/edit`,
          deletes: `${baseUrl.api.private.master}/payment-method/deletes`,
          activates: `${baseUrl.api.private.master}/payment-method/activates`,
        },
        paymentTerm: {
          get: `${baseUrl.api.private.master}/payment-term/get`,
          create: `${baseUrl.api.private.master}/payment-term/create`,
          edit: `${baseUrl.api.private.master}/payment-term/edit`,
          deletes: `${baseUrl.api.private.master}/payment-term/deletes`,
          activates: `${baseUrl.api.private.master}/payment-term/activates`,
        },
        port: {
          get: `${baseUrl.api.private.master}/port/get`,
          create: `${baseUrl.api.private.master}/port/create`,
          edit: `${baseUrl.api.private.master}/port/edit`,
          deletes: `${baseUrl.api.private.master}/port/deletes`,
          activates: `${baseUrl.api.private.master}/port/activates`,
        },
        shipper: {
          get: `${baseUrl.api.private.master}/shipper/get`,
          create: `${baseUrl.api.private.master}/shipper/create`,
          edit: `${baseUrl.api.private.master}/shipper/edit`,
          deletes: `${baseUrl.api.private.master}/shipper/deletes`,
          activates: `${baseUrl.api.private.master}/shipper/activates`,
          getAll: `${baseUrl.api.private.master}/shipper/get-all`,
          getByPaymentTermId: `${baseUrl.api.private.master}/shipper/get-by-payment-term-id`,
          getTopSelect: `${baseUrl.api.private.master}/shipper/get-top-select`,
          getAddressesSelect: `${baseUrl.api.private.master}/shipper/get-addresses-select`,
          getAddressesTopSelect: `${baseUrl.api.private.master}/shipper/get-addresses-top-select`,
        },
        shippingAgent: {
          get: `${baseUrl.api.private.master}/shipping-agent/get`,
          create: `${baseUrl.api.private.master}/shipping-agent/create`,
          edit: `${baseUrl.api.private.master}/shipping-agent/edit`,
          deletes: `${baseUrl.api.private.master}/shipping-agent/deletes`,
          activates: `${baseUrl.api.private.master}/shipping-agent/activates`,
        },
        shippingLine: {
          get: `${baseUrl.api.private.master}/shipping-line/get`,
          create: `${baseUrl.api.private.master}/shipping-line/create`,
          edit: `${baseUrl.api.private.master}/shipping-line/edit`,
          deletes: `${baseUrl.api.private.master}/shipping-line/deletes`,
          activates: `${baseUrl.api.private.master}/shipping-line/activates`,
          getByShippingAgentId: `${baseUrl.api.private.master}/shipping-line/get-by-shipping-agent-id`,
        },
        sPCustomer: {
          get: `${baseUrl.api.private.master}/customer/get`,
          create: `${baseUrl.api.private.master}/customer/create`,
          edit: `${baseUrl.api.private.master}/customer/edit`,
          deletes: `${baseUrl.api.private.master}/customer/deletes`,
          activates: `${baseUrl.api.private.master}/customer/activates`,
          getByPaymentTermId: `${baseUrl.api.private.master}/customer/get-by-payment-term-id`,
          getAll: `${baseUrl.api.private.master}/customer/get-all`,
          getTopSelect: `${baseUrl.api.private.master}/customer/get-top-select`,
          getAddressesSelect: `${baseUrl.api.private.master}/customer/get-addresses-select`,
          getAddressesTopSelect: `${baseUrl.api.private.master}/customer/get-addresses-top-select`,
        },
        sPMeasurement: {
          get: `${baseUrl.api.private.master}/sp-measurement/get`,
          create: `${baseUrl.api.private.master}/sp-measurement/create`,
          edit: `${baseUrl.api.private.master}/sp-measurement/edit`,
          deletes: `${baseUrl.api.private.master}/sp-measurement/deletes`,
          activates: `${baseUrl.api.private.master}/sp-measurement/activates`,
        },
        sPMoveType: {
          get: `${baseUrl.api.private.master}/shipping-product-move-type/get`,
          create: `${baseUrl.api.private.master}/shipping-product-move-type/create`,
          edit: `${baseUrl.api.private.master}/shipping-product-move-type/edit`,
          deletes: `${baseUrl.api.private.master}/shipping-product-move-type/deletes`,
          activates: `${baseUrl.api.private.master}/shipping-product-move-type/activates`,
        },
        sPProductType: {
          get: `${baseUrl.api.private.master}/shipping-product-type/get`,
          create: `${baseUrl.api.private.master}/shipping-product-type/create`,
          edit: `${baseUrl.api.private.master}/shipping-product-type/edit`,
          deletes: `${baseUrl.api.private.master}/shipping-product-type/deletes`,
          activates: `${baseUrl.api.private.master}/shipping-product-type/activates`,
          getAll: `${baseUrl.api.private.master}/shipping-product-type/get-all`,
        },
        sPSpecialServiceType: {
          get: `${baseUrl.api.private.master}/sp-special-service-type/get`,
          create: `${baseUrl.api.private.master}/sp-special-service-type/create`,
          edit: `${baseUrl.api.private.master}/sp-special-service-type/edit`,
          deletes: `${baseUrl.api.private.master}/sp-special-service-type/deletes`,
          activates: `${baseUrl.api.private.master}/sp-special-service-type/activates`,
        },
        stateProvince: {
          get: `${baseUrl.api.private.master}/state-province/get`,
          create: `${baseUrl.api.private.master}/state-province/create`,
          edit: `${baseUrl.api.private.master}/state-province/edit`,
          deletes: `${baseUrl.api.private.master}/state-province/deletes`,
          activates: `${baseUrl.api.private.master}/state-province/activates`,
          getByCountryId: `${baseUrl.api.private.master}/state-province/get-by-country-id`,
        },
        trucker: {
          get: `${baseUrl.api.private.master}/trucker/get`,
          create: `${baseUrl.api.private.master}/trucker/create`,
          edit: `${baseUrl.api.private.master}/trucker/edit`,
          deletes: `${baseUrl.api.private.master}/trucker/deletes`,
          activates: `${baseUrl.api.private.master}/trucker/activates`,
        },
        vatType: {
          get: `${baseUrl.api.private.master}/vat-type/get`,
          create: `${baseUrl.api.private.master}/vat-type/create`,
          edit: `${baseUrl.api.private.master}/vat-type/edit`,
          deletes: `${baseUrl.api.private.master}/vat-type/deletes`,
          activates: `${baseUrl.api.private.master}/vat-type/activates`,
        },
        vendor: {
          get: `${baseUrl.api.private.master}/vendor/get`,
          create: `${baseUrl.api.private.master}/vendor/create`,
          edit: `${baseUrl.api.private.master}/vendor/edit`,
          deletes: `${baseUrl.api.private.master}/vendor/deletes`,
          activates: `${baseUrl.api.private.master}/vendor/activates`,
        },
        vessel: {
          get: `${baseUrl.api.private.master}/vessel/get`,
          create: `${baseUrl.api.private.master}/vessel/create`,
          edit: `${baseUrl.api.private.master}/vessel/edit`,
          deletes: `${baseUrl.api.private.master}/vessel/deletes`,
          activates: `${baseUrl.api.private.master}/vessel/activates`,
          getByCountryId: `${baseUrl.api.private.master}/vessel/get-by-country-id`,
        },
        ward: {
          get: `${baseUrl.api.private.master}/ward/get`,
          create: `${baseUrl.api.private.master}/ward/create`,
          edit: `${baseUrl.api.private.master}/ward/edit`,
          deletes: `${baseUrl.api.private.master}/ward/deletes`,
          activates: `${baseUrl.api.private.master}/ward/activates`,
          getByDistrictId: `${baseUrl.api.private.master}/ward/get-by-district-id`,
        },
      },
      op: {
        sPOrder: {
          get: `${baseUrl.api.private.op}/sp-order/get`,
          create: `${baseUrl.api.private.op}/sp-order/create`,
          edit: `${baseUrl.api.private.op}/sp-order/edit`,
          deletes: `${baseUrl.api.private.op}/sp-order/deletes`,
          getPostOfficeAddress: `${baseUrl.api.private.op}/sp-order/get-postoffice-address`,
        },
      },
    },
  },
};

const devConfig = {
  production: false,
  ...baseConfig,
};
const stagingConfig = {
  production: false,
  ...baseConfig,
};
const prodConfig = {
  production: true,
  ...baseConfig,
};

// prettier-ignore
const config = process.env.REACT_APP_ENV === 'production'
  ? prodConfig
  : process.env.REACT_APP_ENV === 'staging'
    ? stagingConfig
    : devConfig;

export default {
  ...config,
};
