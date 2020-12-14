import React, { Component } from 'react';
import { SPObjectSelect } from '@shared/components-admin/Selects/SPObjectSelect/SPObjectSelect';
import { SPObjectSelectType } from '@shared/components-admin/Selects/SPObjectSelect/SPObjectSelectType';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import sPCustomerService from '@shared/services/master/list/sPCustomerService';

class SPCustomerSelect extends Component {
  sPObjectSelect = React.createRef();

  constructor(props) {
    super(props);
    this.getTopSelect = this.getTopSelect.bind(this);
    this.getAddressesTopSelect = this.getAddressesTopSelect.bind(this);
    this.getAddressesSelect = this.getAddressesSelect.bind(this);
  }

  async getTopSelect(searchModel) {
    return new Promise((resolve, reject) =>
      sPCustomerService
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
      sPCustomerService
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
      sPCustomerService
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
        type={SPObjectSelectType.SPCustomerSelect}
      ></SPObjectSelect>
    );
  }
}

SPCustomerSelect.propTypes = {
  groupName: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  rules: PropTypes.array,
  singleField: PropTypes.bool,
  selectCountries: PropTypes.array.isRequired,
};

SPCustomerSelect.defaultProps = {
  groupName: '',
  selectCountries: [],
  onChange: () => {},
  rules: [],
  singleField: false,
  fieldNames: {
    agentId: 'CustomerId',
    agentCode: 'CustomerCode',
    agentName: 'CustomerName',
    wardId: 'CustomerWardId',
    city: 'CustomerCity',
    addressId: {
      name: 'CustomerAddressId',
      rules: [
        {
          required: false,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.address' /> }} />,
        },
      ],
    },
    address1: {
      name: 'CustomerAddress1',
      rules: [
        {
          required: true,
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
    address2: 'CustomerAddress2',
    countryId: {
      name: 'CustomerCountryId',
      rules: [
        {
          required: true,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.country' /> }} />,
        },
      ],
    },
    stateProvinceId: {
      name: 'CustomerStateProvinceId',
      rules: [
        {
          required: false,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.stateProvince' /> }} />,
        },
      ],
    },
    districtId: 'CustomerDistrictId',
    zipPostalCode: {
      name: 'CustomerZipPostalCode',
      rules: [
        {
          required: true,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.fields.zipPostalCode' /> }} />,
        },
      ],
    },
    phoneNumber: {
      name: 'CustomerPhoneNumber',
      rules: [
        {
          required: true,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.fields.phoneNumber' /> }} />,
        },
      ],
    },
    email: {
      name: 'CustomerEmail',
      rules: [
        {
          required: true,
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

export { SPCustomerSelect };
