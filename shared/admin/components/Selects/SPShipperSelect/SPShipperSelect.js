import React, { Component } from 'react';
import { SPObjectSelect } from '@shared/components-admin/Selects/SPObjectSelect/SPObjectSelect';
import { SPObjectSelectType } from '@shared/components-admin/Selects/SPObjectSelect/SPObjectSelectType';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import shipperService from '@shared/services/master/list/shipperService';

class SPShipperSelect extends Component {
  sPObjectSelect = React.createRef();

  constructor(props) {
    super(props);
    this.getTopSelect = this.getTopSelect.bind(this);
  }

  async getTopSelect(searchModel) {
    return new Promise((resolve, reject) =>
      shipperService
        .getTopSelect(searchModel)
        .then((res) => {
          const { data, success } = res;
          if (success) {
            resolve(data);
          } else {
            reject();
          }
        })
        .catch((err) => reject(err))
    );
  }

  async getAddressesTopSelect(agentId) {
    return new Promise((resolve, reject) =>
      shipperService
        .getAddressesTopSelect(agentId)
        .then((res) => {
          const { data, success } = res;
          if (success) {
            resolve(data);
          } else {
            reject();
          }
        })
        .catch((err) => reject(err))
    );
  }

  async getAddressesSelect(searchModel) {
    return new Promise((resolve, reject) =>
      shipperService
        .getAddressesSelect(searchModel)
        .then((res) => {
          const { data, success } = res;
          if (success) {
            resolve(data);
          } else {
            reject();
          }
        })
        .catch((err) => reject(err))
    );
  }

  getCurrentStateProvinces() {
    return this.sPObjectSelect.current.getCurrentStateProvinces();
  }

  getCurrentDistricts() {
    return this.sPObjectSelect.current.getCurrentDistricts();
  }

  getCurrentWards() {
    return this.sPObjectSelect.current.getCurrentWards();
  }

  render() {
    return (
      <SPObjectSelect
        ref={this.sPObjectSelect}
        getAddressesTopSelect={this.getAddressesTopSelect}
        getAddressesSelect={this.getAddressesSelect}
        getTopSelect={this.getTopSelect}
        {...this.props}
        type={SPObjectSelectType.SPShipperSelect}
      ></SPObjectSelect>
    );
  }
}
SPShipperSelect.propTypes = {
  groupName: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  rules: PropTypes.array,
  singleField: PropTypes.bool,
  selectCountries: PropTypes.array.isRequired,
};

SPShipperSelect.defaultProps = {
  groupName: '',
  selectCountries: [],
  onChange: () => {},
  rules: [],
  singleField: false,
  fieldNames: {
    agentId: 'ShipperId',
    agentCode: 'ShipperCode',
    agentName: 'ShipperName',
    wardId: 'ShipperWardId',
    city: 'ShipperCity',
    addressId: 'ShipperAddressId',
    address1: {
      name: 'ShipperAddress1',
      rules: [
        {
          required: false,
          message: (
            <FormattedMessage
              id='common.validators.inputFields.required'
              values={{
                field: (
                  <>
                    <FormattedMessage id='common.address' />
                    &nbsp;1
                  </>
                ),
              }}
            />
          ),
        },
      ],
    },
    address2: 'ShipperAddress2',
    countryId: {
      name: 'ShipperCountryId',
      rules: [
        {
          required: false,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.country' /> }} />,
        },
      ],
    },
    stateProvinceId: {
      name: 'ShipperStateProvinceId',
      rules: [
        {
          required: false,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.stateProvince' /> }} />,
        },
      ],
    },
    districtId: 'ShipperDistrictId',
    zipPostalCode: {
      name: 'ShipperZipPostalCode',
      rules: [
        {
          required: false,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.fields.zipPostalCode' /> }} />,
        },
      ],
    },
    phoneNumber: {
      name: 'ShipperPhoneNumber',
      rules: [
        {
          required: false,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.fields.phoneNumber' /> }} />,
        },
      ],
    },
    email: {
      name: 'ShipperEmail',
      rules: [
        {
          required: false,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.fields.email' /> }} />,
        },
        {
          type: 'email',
          message: <FormattedMessage id='common.validators.objects.invalidEmail' />,
        },
      ],
    },
  },
};

export { SPShipperSelect };
