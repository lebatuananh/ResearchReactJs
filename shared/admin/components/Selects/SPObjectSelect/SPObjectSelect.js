import { Row, Col, Form, Input, Select, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import stateProvinceService from '@shared/services/master/list/stateProvinceService';
import districtService from '@shared/services/master/list/districtService';
import wardService from '@shared/services/master/list/wardService';
import selectHelper from '@shared/lib/helpers/ui/selectHelper';
import { SPObjectSelectType } from '@shared/components-admin';
import { status } from '@shared/data/common/ActiveStatus';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import uxHelper from '@shared/lib/helpers/ui/uxHelper';
import { AddressType } from '@shared/data/common/AddressType';
import componentHelper from '@shared/lib/helpers/componentHelper';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';
import { FormLabel } from '@shared/ui/Form/FormLabel';

const { Option } = Select;

const layoutFullSize = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const layoutHalf = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class SPObjectSelect extends Component {
  mounted = false;
  constructor(props) {
    super(props);
    const { fieldNames, value, selectStateProvinces } = this.props;
    const { agentId } = fieldNames;
    this.state = {
      SPCustomers: [],
      agentId: value ? value[agentId] : undefined,
      SPAddresses: [],
      // countries: [],
      stateProvinces: selectStateProvinces,
      districts: [],
      wards: [],
      loading: false,
    };

    this.component = {
      // get field name
      getFieldNames: (fieldNames) => {
        return componentHelper.getFieldNames(fieldNames, SPObjectSelect.defaultProps.fieldNames);
      },

      // get rules by fieldname
      getRules: (fieldName) => {
        const { fieldNames } = this.props;
        return componentHelper.getRules(fieldName, fieldNames, SPObjectSelect.defaultProps.fieldNames);
      },

      // initial data when edit
      initData: () => {
        // const { fieldNames, value } = this.props;
        // const { agentId, addressId, countryId, stateProvinceId } = fieldNames;
        // if (!value) return;
        // if (value[agentId]) {
        //   this.address.getByAgentId(value[agentId]);
        // }
        // if (value[addressId]) {
        //   this.country.getAll();
        // }
        // if (value[countryId]) {
        //   this.stateProvince.getByCountryId(value[countryId]);
        // }
        // if (value[stateProvinceId]) {
        //   this.district.getByStateProvinceId(value[stateProvinceId]);
        // }
      },
      // set loading for component
      setLoading: (loading) => {
        this.setState({ loading });
      },

      getLabelByType: (fieldName) => {
        const { type } = this.props;
        switch (type) {
          case SPObjectSelectType.SPConsigneeSelect:
            return (
              <FormattedMessage
                id={fieldName === 'id' ? 'common.consignee' : fieldName === 'code' ? 'admin.consignees.fields.code' : 'admin.consignees.fields.name'}
              />
            );
          case SPObjectSelectType.SPCustomerSelect:
            return (
              <FormattedMessage
                id={fieldName === 'id' ? 'common.sPCustomer' : fieldName === 'code' ? 'admin.sPCustomers.fields.code' : 'admin.sPCustomers.fields.name'}
              />
            );
          case SPObjectSelectType.SPShipperSelect:
            return (
              <FormattedMessage
                id={fieldName === 'id' ? 'common.sender' : fieldName === 'code' ? 'admin.shippers.fields.code' : 'admin.shippers.fields.name'}
              />
            );
          default:
            return (
              <FormattedMessage
                id={fieldName === 'id' ? 'common.sPCustomer' : fieldName === 'code' ? 'admin.sPCustomers.fields.code' : 'admin.sPCustomers.fields.name'}
              />
            );
        }
      },
    };

    this.agent = {
      handleSearch: (text) => {
        this.component.setLoading(true);
        const { getTopSelect } = this.props;
        getTopSelect({
          Keywords: text,
          Status: status.Activated,
          PageSize: 10,
        })
          .then((data) => {
            this.setState({ SPCustomers: data }, () => this.component.setLoading(false));
          })
          .catch((err) => {
            this.setState(
              {
                SPCustomers: [],
              },
              () => this.component.setLoading(false)
            );
          });
      },

      // catch agent select change
      handleChange: (value) => {
        const { singleField } = this.props;
        this.setState({ agentId: value });
        if (!singleField) {
          const showAddressSelector = value !== undefined;
          if (showAddressSelector) {
            this.address.getByAgentId(value);
          } else {
            const { fieldNames } = this.props;
            const {
              agentId,
              agentCode,
              agentName,
              addressId,
              address1,
              address2,
              countryId,
              wardId,
              stateProvinceId,
              city,
              districtId,
              zipPostalCode,
              phoneNumber,
              email,
            } = this.component.getFieldNames(fieldNames);
            let values = {};
            values[agentId] = undefined;
            values[agentCode] = undefined;
            values[agentName] = undefined;
            values[addressId] = undefined;
            values[address1] = undefined;
            values[address2] = undefined;
            values[countryId] = undefined;
            values[stateProvinceId] = undefined;
            values[districtId] = undefined;
            values[wardId] = undefined;
            values[zipPostalCode] = undefined;
            values[phoneNumber] = undefined;
            values[city] = undefined;
            values[email] = undefined;
            this.triggerChange(values);
          }
          this.setState({
            stateProvinces: [],
            districts: [],
          });
        }
      },

      handleSelected: (value, options) => {
        const { singleField } = this.props;
        const { data } = options;
        if (!singleField) {
          const { fieldNames } = this.props;
          const {
            agentId,
            agentCode,
            agentName,
            addressId,
            address1,
            wardId,
            address2,
            countryId,
            stateProvinceId,
            districtId,
            zipPostalCode,
            phoneNumber,
            city,
            email,
          } = this.component.getFieldNames(fieldNames);
          let values = {};
          values[agentId] = value;
          values[agentCode] = data.Code;
          values[agentName] = undefined;
          values[addressId] = undefined;
          values[address1] = undefined;
          values[address2] = undefined;
          values[countryId] = undefined;
          values[stateProvinceId] = undefined;
          values[districtId] = undefined;
          values[wardId] = undefined;
          values[zipPostalCode] = undefined;
          values[phoneNumber] = undefined;
          values[city] = undefined;
          values[email] = undefined;
          this.triggerChange(values);
        }
      },
    };

    this.address = {
      // handle address select search remote
      handleSearch: (text) => {
        this.component.setLoading(true);
        const { agentId } = this.state;
        const { getAddressesSelect } = this.props;
        getAddressesSelect({
          Keywords: text,
          Status: status.Activated,
          Take: 10,
          EntityId: agentId,
        })
          .then((data) => {
            this.setState({ SPAddresses: data }, () => this.component.setLoading(false));
          })
          .catch((err) => {
            this.setState(
              {
                SPAddresses: [],
              },
              () => this.component.setLoading(false)
            );
          });
      },

      getByAgentId: (agentId) => {
        this.component.setLoading(true);
        const { getAddressesTopSelect } = this.props;
        getAddressesTopSelect(agentId)
          .then((data) => {
            const mainAddress = data.find((p) => p.Type === AddressType.Main);
            if (mainAddress) {
              this.address.setData(mainAddress.Id, mainAddress);
            }
            this.setState({ SPAddresses: data }, () => this.component.setLoading(false));
          })
          .catch((err) => {
            this.setState(
              {
                SPAddresses: [],
              },
              () => this.component.setLoading(false)
            );
          });
      },

      // handle address select change
      handleChange: (value) => {
        // this.setState({ showAddressInfo: value !== undefined });
        if (!value) {
          const { fieldNames } = this.props;
          const {
            addressId,
            agentName,
            address1,
            address2,
            countryId,
            wardId,
            stateProvinceId,
            districtId,
            zipPostalCode,
            city,
            phoneNumber,
            email,
          } = this.component.getFieldNames(fieldNames);
          let _values = {};
          _values[addressId] = undefined;
          _values[address1] = undefined;
          _values[agentName] = undefined;
          _values[address2] = undefined;
          _values[countryId] = undefined;
          _values[stateProvinceId] = undefined;
          _values[districtId] = undefined;
          _values[wardId] = undefined;
          _values[zipPostalCode] = undefined;
          _values[phoneNumber] = undefined;
          _values[city] = undefined;
          _values[email] = undefined;
          this.setState({
            stateProvinces: [],
            districts: [],
          });
          const values = {
            ...this.props.value,
            ..._values,
          };
          this.triggerChange(values);
        }
      },

      // handle address selected => set value for formItem
      handleSelect: (value, options) => {
        this.component.setLoading(true);
        const { data } = options;
        this.address.setData(value, data);
        this.component.setLoading(false);
      },

      setData: (id, addressData) => {
        const { fieldNames } = this.props;
        const {
          addressId,
          agentName,
          address1,
          address2,
          wardId,
          countryId,
          stateProvinceId,
          districtId,
          zipPostalCode,
          phoneNumber,
          city,
          email,
        } = this.component.getFieldNames(fieldNames);
        let _values = {};
        _values[addressId] = id;
        _values[address1] = addressData.Address1;
        _values[agentName] = addressData.FullName;
        _values[address2] = addressData.Address2;
        _values[countryId] = addressData.CountryId;
        _values[stateProvinceId] = addressData.StateProvinceId;
        _values[districtId] = addressData.DistrictId;
        _values[wardId] = addressData.WardId;
        _values[zipPostalCode] = addressData.ZipPostalCode;
        _values[phoneNumber] = addressData.PhoneNumber;
        _values[city] = addressData.City;
        _values[email] = addressData.Email;
        this.stateProvince.getByCountryId(addressData.CountryId);
        this.district.getByStateProvinceId(addressData.StateProvinceId);
        this.ward.getByDistrictId(addressData.DistrictId);
        const values = {
          ...this.props.value,
          ..._values,
        };
        this.triggerChange(values);
      },
    };

    this.country = {
      // get all country
      // getAll: () => {
      //   countryService.getAllAsync(false).then((res) => {
      //     const { data, success } = res;
      //     if (success) {
      //       this.setState({
      //         countries: data,
      //       });
      //     } else {
      //       this.setState({
      //         countries: [],
      //       });
      //     }
      //   });
      // },

      // handle country select change
      handleChange: (value) => {
        this.stateProvince.getByCountryId(value);
        const { fieldNames } = this.props;
        const { countryId, stateProvinceId, districtId, wardId } = this.component.getFieldNames(fieldNames);
        let _values = {};
        _values[countryId] = value;
        _values[stateProvinceId] = undefined;
        _values[districtId] = undefined;
        _values[wardId] = undefined;
        const values = {
          ...this.props.value,
          ..._values,
        };
        this.triggerChange(values);
      },
    };

    this.stateProvince = {
      // get provinces by countryId
      getByCountryId: (countryId) => {
        stateProvinceService.getByCountryIdAsync(countryId).then((res) => {
          const { data, success } = res;
          if (success) {
            this.setState({
              stateProvinces: data,
            });
          } else {
            this.setState({
              stateProvinces: [],
            });
          }
        });
      },

      // handle state province change
      handleChange: (value) => {
        this.district.getByStateProvinceId(value);
        const { fieldNames } = this.props;
        const { stateProvinceId, districtId, wardId } = this.component.getFieldNames(fieldNames);
        let _values = {};
        _values[stateProvinceId] = value;
        _values[districtId] = undefined;
        _values[wardId] = wardId;
        const values = {
          ...this.props.value,
          ..._values,
        };
        this.triggerChange(values);
      },
    };

    this.district = {
      // get districts by state provinceId
      getByStateProvinceId: (stateProvinceId) => {
        districtService.getByStateProvinceIdAsync(stateProvinceId).then((res) => {
          const { data, success } = res;
          if (success) {
            this.setState({
              districts: data,
            });
          } else {
            this.setState({
              districts: [],
            });
          }
        });
      },

      // handle district change
      handleChange: (value) => {
        this.ward.getByDistrictId(value);
        const { fieldNames } = this.props;
        const { districtId, wardId } = this.component.getFieldNames(fieldNames);
        let _values = {};
        _values[districtId] = value;
        _values[wardId] = undefined;
        const values = {
          ...this.props.value,
          ..._values,
        };
        this.triggerChange(values);
      },
    };

    this.ward = {
      // get districts by districtId
      getByDistrictId: (districtId) => {
        wardService.getByDistrictIdAsync(districtId).then((res) => {
          const { data, success } = res;
          if (success) {
            this.setState({
              wards: data,
            });
          } else {
            this.setState({
              wards: [],
            });
          }
        });
      },
    };

    this.agent.handleSelected = this.agent.handleSelected.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
    this.address.handleSelect = this.address.handleSelect.bind(this);
    this.component.setLoading = this.component.setLoading.bind(this);
    this.agent.handleChange = this.agent.handleChange.bind(this);
    this.address.handleChange = this.address.handleChange.bind(this);
    this.country.handleChange = this.country.handleChange.bind(this);
    this.stateProvince.handleChange = this.stateProvince.handleChange.bind(this);
    this.agent.handleSearch = this.agent.handleSearch.bind(this);
    this.address.handleSearch = this.address.handleSearch.bind(this);
    this.district.handleChange = this.district.handleChange.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    const { singleField } = this.props;
    if (!singleField) {
      // this.country.getAll();
      // this.component.initData();
    }
    //this.getDataSource();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getCurrentStateProvinces() {
    const { stateProvinces } = this.state;
    return stateProvinces;
  }

  getCurrentDistricts() {
    const { districts } = this.state;
    return districts;
  }

  getCurrentWards() {
    const { wards } = this.state;
    return wards;
  }

  triggerChange(values) {
    if (this.props.onChange) {
      this.props.onChange({
        ...this.props.value,
        ...values,
      });
    }
  }

  render() {
    const { groupName, rules, singleField, fieldNames, selectCountries, type } = this.props;
    const { loading, wards, SPCustomers, SPAddresses, stateProvinces, districts } = this.state;
    const {
      agentId,
      agentCode,
      agentName,
      addressId,
      wardId,
      address1,
      address2,
      city,
      countryId,
      stateProvinceId,
      districtId,
      zipPostalCode,
      phoneNumber,
      email,
    } = this.component.getFieldNames(fieldNames);
    const agentFieldName = singleField ? agentId : [groupName, agentId];
    return (
      <Spin size='large' spinning={loading}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item {...layoutFullSize} label={this.component.getLabelByType('id')} name={agentFieldName} rules={rules}>
              <Select
                onSelect={this.agent.handleSelected}
                id={`${groupName}-${agentId}`}
                allowClear
                onSearch={debounce(this.agent.handleSearch, uxHelper.def.debounce.timeout)}
                showSearch
                filterOption={selectHelper.def.filterOption}
                onChange={this.agent.handleChange}
              >
                {SPCustomers.map((x) => (
                  <Option data={x} value={x.Id} key={`key-${x.Id}`}>{`[${x.Code}] ${x.Name}`}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item hidden {...layoutFullSize} label={this.component.getLabelByType('code')} name={[groupName, agentCode]}>
          <Input />
        </Form.Item>

        {!singleField ? (
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                {...layoutFullSize}
                label={<FormattedMessage id='common.address' />}
                name={[groupName, addressId]}
                rules={this.component.getRules('addressId')}
              >
                <Select
                  onSelect={this.address.handleSelect}
                  id={`${groupName}-${addressId}`}
                  allowClear
                  onSearch={debounce(this.address.handleSearch, uxHelper.def.debounce.timeout)}
                  showSearch
                  filterOption={selectHelper.def.filterOption}
                  onChange={this.address.handleChange}
                >
                  {SPAddresses.map((x) => (
                    <Option data={x} value={x.Id} key={`key-${x.Id}`}>{`${x.AddressName}`}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        ) : null}
        {!singleField ? (
          <React.Fragment>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item {...layoutFullSize} label={this.component.getLabelByType('name')} name={[groupName, agentName]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  {...layoutFullSize}
                  label={
                    <>
                      <FormattedMessage id='common.address' />
                      &nbsp;1
                    </>
                  }
                  name={[groupName, address1]}
                  rules={this.component.getRules('address1')}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  {...layoutFullSize}
                  label={
                    <>
                      <FormattedMessage id='common.address' />
                      &nbsp;2
                    </>
                  }
                  name={[groupName, address2]}
                  rules={this.component.getRules('address2')}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24} className='form-item-group'>
              <Col span={12}>
                <Form.Item
                  {...layoutHalf}
                  label={<FormattedMessage id='common.country' />}
                  name={[groupName, countryId]}
                  rules={this.component.getRules('countryId')}
                >
                  <Select
                    placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.country' /> }} />}
                    allowClear
                    onChange={this.country.handleChange}
                    showSearch
                    filterOption={selectHelper.def.filterOption}
                  >
                    {selectCountries.map((x) => (
                      <Option key={x.Id} value={x.Id}>
                        {`[${x.Code}] ${x.Name}`}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...layoutHalf}
                  label={<FormattedMessage id='common.stateProvince' />}
                  name={[groupName, stateProvinceId]}
                  dependencies={[groupName, city]}
                  // rules={this.component.getRules('stateProvinceId')}
                  rules={
                    type !== SPObjectSelectType.SPCustomerSelect
                      ? []
                      : [
                          ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (value || getFieldValue([groupName, city])) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                <FormattedMessage
                                  id='common.validators.inputFields.required'
                                  values={{ field: <FormattedMessage id='common.stateProvince' /> }}
                                />
                              );
                            },
                          }),
                        ]
                  }
                >
                  <Select
                    placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.stateProvince' /> }} />}
                    allowClear
                    showSearch
                    onChange={this.stateProvince.handleChange}
                    filterOption={selectHelper.def.filterOption}
                  >
                    {stateProvinces.map((x) => (
                      <Option key={x.Id} value={x.Id}>
                        {`[${x.Code}] ${x.Name}`}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24} className='form-item-group'>
              <Col span={12}>
                <Form.Item
                  {...layoutHalf}
                  label={<FormattedMessage id='common.stateProvince' />}
                  dependencies={[groupName, stateProvinceId]}
                  name={[groupName, city]}
                  rules={
                    type !== SPObjectSelectType.SPCustomerSelect
                      ? []
                      : [
                          ({ getFieldValue, setFields }) => ({
                            validator(rule, value) {
                              if (value || getFieldValue([groupName, stateProvinceId])) {
                                setFields([
                                  {
                                    name: [groupName, stateProvinceId],
                                    errors: [],
                                  },
                                ]);
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                <FormattedMessage
                                  id='common.validators.inputFields.required'
                                  values={{ field: <FormattedMessage id='common.stateProvince' /> }}
                                />
                              );
                            },
                          }),
                        ]
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...layoutHalf}
                  label={<FormattedMessage id='common.fields.zipPostalCode' />}
                  name={[groupName, zipPostalCode]}
                  rules={this.component.getRules('zipPostalCode')}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24} className='form-item-group'>
              <Col span={12}>
                <Form.Item
                  {...layoutHalf}
                  label={<FormattedMessage id='common.district' />}
                  name={[groupName, districtId]}
                  rules={this.component.getRules('districtId')}
                >
                  <Select
                    placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.district' /> }} />}
                    allowClear
                    onChange={this.district.handleChange}
                    showSearch
                    filterOption={selectHelper.def.filterOption}
                  >
                    {districts.map((x) => (
                      <Option key={x.Id} value={x.Id}>
                        {`[${x.Code}] ${x.Name}`}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...layoutHalf} label={<FormattedMessage id='common.ward' />} name={[groupName, wardId]} rules={this.component.getRules('wardId')}>
                  <Select
                    placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.ward' /> }} />}
                    allowClear
                    showSearch
                    filterOption={selectHelper.def.filterOption}
                  >
                    {wards.map((x) => (
                      <Option key={x.Id} value={x.Id}>
                        {`[${x.Code}] ${x.Name}`}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24} className='form-item-group'>
              <Col span={12}>
                <Form.Item
                  {...layoutHalf}
                  label={<FormattedMessage id='common.fields.phoneNumber' />}
                  name={[groupName, phoneNumber]}
                  rules={this.component.getRules('phoneNumber')}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  label={<FormattedMessage id='common.fields.email' />}
                  name={[groupName, email]}
                  rules={this.component.getRules('email')}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </React.Fragment>
        ) : null}
      </Spin>
    );
  }
}

SPObjectSelect.propTypes = {
  type: PropTypes.string.isRequired,
  groupName: PropTypes.string,
  selectCountries: PropTypes.array.isRequired,
  selectStateProvinces: PropTypes.array.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func,
  rules: PropTypes.array,
  singleField: PropTypes.bool,
  getTopSelect: PropTypes.func.isRequired,
  getAddressesTopSelect: PropTypes.func.isRequired,
  getAddressesSelect: PropTypes.func.isRequired,
  fieldNames: PropTypes.shape({
    agentId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    wardId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    city: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    agentCode: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    agentName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    addressId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    address1: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    address2: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    countryId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    stateProvinceId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    districtId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    zipPostalCode: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    email: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
};

SPObjectSelect.defaultProps = {
  groupName: '',
  selectCountries: [],
  selectStateProvinces: [],
  onChange: () => {},
  getTopSelect: () => Promise.resolve([]),
  getAddressesTopSelect: () => Promise.resolve([]),
  getAddressesSelect: () => Promise.resolve([]),
  rules: [],
  singleField: false,
  fieldNames: {
    agentId: 'AgentId',
    agentCode: 'AgentCode',
    city: 'City',
    wardId: 'WardId',
    agentName: 'AgentName',
    addressId: 'AddressId',
    address1: 'Address1',
    address2: 'Address2',
    countryId: 'CountryId',
    stateProvinceId: 'StateProvinceId',
    districtId: 'DistrictId',
    zipPostalCode: 'ZipPostalCode',
    phoneNumber: 'PhoneNumber',
    email: 'Email',
  },
};

export { SPObjectSelect };
