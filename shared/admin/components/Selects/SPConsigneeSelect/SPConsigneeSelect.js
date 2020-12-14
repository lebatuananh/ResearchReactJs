import React, { Component } from 'react';
import { SPObjectSelect } from '@shared/components-admin/Selects/SPObjectSelect/SPObjectSelect';
import { SPObjectSelectType } from '@shared/components-admin/Selects/SPObjectSelect/SPObjectSelectType';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import consigneeService from '@shared/services/master/list/consigneeService';

class SPConsigneeSelect extends Component {
  sPObjectSelect = React.createRef();

  constructor(props) {
    super(props);
    this.getTopSelect = this.getTopSelect.bind(this);
    this.getAddressesTopSelect = this.getAddressesTopSelect.bind(this);
    this.getAddressesSelect = this.getAddressesSelect.bind(this);
  }

  async getTopSelect(searchModel) {
    return new Promise((resolve, reject) =>
      consigneeService
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
      consigneeService
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
      consigneeService
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
        type={SPObjectSelectType.SPConsigneeSelect}
      ></SPObjectSelect>
    );
  }
}

SPConsigneeSelect.propTypes = {
  groupName: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  rules: PropTypes.array,
  singleField: PropTypes.bool,
  selectCountries: PropTypes.array.isRequired,
};

SPConsigneeSelect.defaultProps = {
  groupName: '',
  selectCountries: [],
  onChange: () => {},
  rules: [],
  singleField: false,
  fieldNames: {
    agentId: 'ConsigneeId',
    agentCode: 'ConsigneeCode',
    agentName: 'ConsigneeName',
    addressId: 'ConsigneeAddressId',
    city: 'ConsigneeCity',
    wardId: 'ConsigneeWardId',
    address1: {
      name: 'ConsigneeAddress1',
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
    address2: 'ConsigneeAddress2',
    countryId: {
      name: 'ConsigneeCountryId',
      rules: [
        {
          required: false,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.country' /> }} />,
        },
      ],
    },
    stateProvinceId: {
      name: 'ConsigneeStateProvinceId',
      rules: [
        {
          required: false,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.stateProvince' /> }} />,
        },
      ],
    },
    districtId: 'ConsigneeDistrictId',
    zipPostalCode: {
      name: 'ConsigneeZipPostalCode',
      rules: [
        {
          required: false,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.fields.zipPostalCode' /> }} />,
        },
      ],
    },
    phoneNumber: {
      name: 'ConsigneePhoneNumber',
      rules: [
        {
          required: false,
          message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.fields.phoneNumber' /> }} />,
        },
      ],
    },
    email: {
      name: 'ConsigneeEmail',
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

export { SPConsigneeSelect };
