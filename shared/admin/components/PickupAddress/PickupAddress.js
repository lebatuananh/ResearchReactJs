import { Button, Form, Input, Select, Space, Spin, Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';
import stateProvinceService from '@shared/services/master/list/stateProvinceService';
import districtService from '@shared/services/master/list/districtService';
import wardService from '@shared/services/master/list/wardService';
import selectHelper from '@shared/lib/helpers/ui/selectHelper';
import PropTypes from 'prop-types';
import { CargoPickupMethod, PickupAddressType } from '@shared/data/common/CargoPickupMethod';
import componentHelper from '@shared/lib/helpers/componentHelper';
import sPOrderService from '@shared/services/op/sPOrderService';
import notify from '@shared/ui/Notify/notify';

const { Option } = Select;

const layoutFullSize = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const layoutHalf = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class PickupAddress extends Component {
  mounted = false;
  constructor(props) {
    super(props);
    const { selectStateProvinces } = this.props;
    this.state = {
      // countries: [],
      stateProvinces: selectStateProvinces,
      districts: [],
      wards: [],
      loading: false,
    };
    this.component = {
      getFieldNames: (fieldNames) => {
        return componentHelper.getFieldNames(fieldNames, PickupAddress.defaultProps.fieldNames);
      },
      getRules: (fieldName) => {
        const { fieldNames } = this.props;
        return componentHelper.getRules(fieldName, fieldNames, PickupAddress.defaultProps.fieldNames);
      },
      initData: () => {
        const { fieldNames, value } = this.props;
        const { countryId, stateProvinceId } = fieldNames;
        if (!value) return;
        if (value[countryId]) {
          this.stateProvince.getByCountryId(value[countryId]);
        }
        if (value[stateProvinceId]) {
          this.district.getByStateProvinceId(value[stateProvinceId]);
        }
      },
      setLoading: (loading) => {
        this.setState({ loading });
      },
    };

    this.country = {
      getAll: () => {
        // countryService.getAllAsync(false).then((res) => {
        //   const { data, success } = res;
        //   if (success) {
        //     this.setState({
        //       countries: data,
        //     });
        //   } else {
        //     this.setState({
        //       countries: [],
        //     });
        //   }
        // });
      },
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
      }, // handle state province change
      handleChange: (value) => {
        this.district.getByStateProvinceId(value);
        const { fieldNames } = this.props;
        const { stateProvinceId, districtId, wardId } = this.component.getFieldNames(fieldNames);
        let _values = {};
        _values[stateProvinceId] = value;
        _values[districtId] = undefined;
        _values[wardId] = undefined;
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

    this.address = {
      binding: (type) => {
        this.component.setLoading(true);
        const { bindingAddress } = this.props;
        bindingAddress(type);
        this.component.setLoading(false);
      },
      getPostOfficeAddress: (postOfficeId) => {
        if (postOfficeId) {
          this.component.setLoading(true);
          sPOrderService.getAddressByPostOfficeId(postOfficeId).then((res) => {
            const { data, success, message } = res;
            if (success) {
              if (data) {
                let values = { ...data, Name: data.FullName };
                const { StateProvince, District, Ward } = data;
                const stateProvinces = [StateProvince];
                const districts = [District];
                const wards = [Ward];
                this.setStateProvinces(stateProvinces);
                this.setDistricts(districts);
                this.setWards(wards);
                this.address.setAddress(values);
              } else {
                notify.info(intl.formatMessage({ id: 'common.notify.error.noResults' }));
              }
            } else {
              notify.error(message);
            }
            this.component.setLoading(false);
          });
        }
      },
      setAddress: (pickupData) => {
        const { fieldNames } = this.props;
        const {
          address1,
          pickupName,
          address2,
          wardId,
          city,
          countryId,
          stateProvinceId,
          districtId,
          zipPostalCode,
          phoneNumber,
          email,
        } = this.component.getFieldNames(fieldNames);
        const _data = {};
        _data[pickupName] = pickupData.Name;
        _data[email] = pickupData.Email;
        _data[countryId] = pickupData.CountryId;
        _data[stateProvinceId] = pickupData.StateProvinceId;
        _data[city] = pickupData.City;
        _data[wardId] = pickupData.WardId;
        _data[districtId] = pickupData.DistrictId;
        _data[address1] = pickupData.Address1;
        _data[address2] = pickupData.Address2;
        _data[zipPostalCode] = pickupData.ZipPostalCode;
        _data[phoneNumber] = pickupData.PhoneNumber;
        this.triggerChange(_data);
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

    this.cargoPickupMethod = {
      handleChange: (value) => {
        const { fieldNames, cargoPickupMethods } = this.props;
        const {
          address1,
          pickupName,
          address2,
          wardId,
          city,
          countryId,
          stateProvinceId,
          districtId,
          zipPostalCode,
          cargoPickupMethod,
          cargoPickupMethodText,
          phoneNumber,
          email,
        } = this.component.getFieldNames(fieldNames);

        const _data = {};
        _data[cargoPickupMethod] = value;
        if (value) {
          const cargoPickupMethodItem = cargoPickupMethods.find((p) => p.Id === value) || {};
          _data[cargoPickupMethodText] = cargoPickupMethodItem.Name;
        }
        _data[pickupName] = undefined;
        _data[email] = undefined;
        _data[countryId] = undefined;
        _data[stateProvinceId] = undefined;
        _data[city] = undefined;
        _data[wardId] = undefined;
        _data[districtId] = undefined;
        _data[address1] = undefined;
        _data[address2] = undefined;
        _data[zipPostalCode] = undefined;
        _data[phoneNumber] = undefined;
        this.triggerChange(_data);
      },
    };

    this.triggerChange = this.triggerChange.bind(this);
    this.component.setLoading = this.component.setLoading.bind(this);
    this.country.handleChange = this.country.handleChange.bind(this);
    this.stateProvince.handleChange = this.stateProvince.handleChange.bind(this);
    this.address.binding = this.address.binding.bind(this);
    this.district.handleChange = this.district.handleChange.bind(this);
    this.cargoPickupMethod.handleChange = this.cargoPickupMethod.handleChange.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    // this.country.getAll();
    // this.component.initData();
  }

  setStateProvinces(data) {
    this.setState({ stateProvinces: data || [] });
  }

  setDistricts(data) {
    this.setState({ districts: data || [] });
  }

  setWards(data) {
    this.setState({ wards: data || [] });
  }

  componentWillUnmount() {
    this.mounted = false;
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
    const { groupName, fieldNames, cargoPickupMethods, selectCountries } = this.props;
    const { loading, stateProvinces, districts, wards } = this.state;
    const {
      address1,
      pickupName,
      cargoPickupMethodText,
      address2,
      countryId,
      city,
      wardId,
      stateProvinceId,
      districtId,
      zipPostalCode,
      phoneNumber,
      email,
      cargoPickupMethod,
    } = this.component.getFieldNames(fieldNames);
    return (
      <Spin size='large' spinning={loading}>
        <React.Fragment>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                {...layoutFullSize}
                label={<FormattedMessage id='admin.sPOrders.fields.cargoPickupMethod' />}
                name={[groupName, cargoPickupMethod]}
                rules={this.component.getRules('cargoPickupMethod')}
              >
                <Select
                  placeholder={
                    <FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='admin.sPOrders.fields.cargoPickupMethod' /> }} />
                  }
                  allowClear
                  onChange={this.cargoPickupMethod.handleChange}
                  showSearch
                  filterOption={selectHelper.def.filterOption}
                >
                  {cargoPickupMethods.map((x) => (
                    <Option key={x.Id} value={x.Id}>
                      {`${x.Name}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item hidden label='cargoPickupMethodText' name={[groupName, cargoPickupMethodText]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                noStyle
                shouldUpdate={(prev, curr) => prev[groupName] && curr[groupName] && prev[groupName][cargoPickupMethod] !== curr[groupName][cargoPickupMethod]}
              >
                {({ getFieldValue }) => {
                  const _cargoPickupMethod = getFieldValue([groupName, cargoPickupMethod]);
                  const buttonGroup = [];
                  if (_cargoPickupMethod === CargoPickupMethod.Consolidation) {
                    buttonGroup.push(
                      <Button key='customerAddress' type='primary' onClick={() => this.address.binding(PickupAddressType.FromCustomer)}>
                        <FormattedMessage id='admin.sPOrders.getAddressOfCustomer' />
                      </Button>
                    );
                    buttonGroup.push(
                      <Button type='primary' className='bg-info' key='senderAddress' onClick={() => this.address.binding(PickupAddressType.FromShipper)}>
                        <FormattedMessage id='admin.sPOrders.getAddressOfShipper' />
                      </Button>
                    );
                  } else if (_cargoPickupMethod === CargoPickupMethod.SelfShipping) {
                    buttonGroup.push(
                      <Button type='primary' key='postOffice' onClick={() => this.address.binding(PickupAddressType.FromPostOffice)}>
                        <FormattedMessage id='admin.sPOrders.getAddressOfPostOffice' />
                      </Button>
                    );
                  }
                  return (
                    buttonGroup.length > 0 && (
                      <Form.Item {...layoutFullSize} label='&nbsp;'>
                        <Space>{buttonGroup}</Space>
                      </Form.Item>
                    )
                  );
                }}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item {...layoutFullSize} label={<FormattedMessage id='admin.sPOrders.fields.pickupName' />} name={[groupName, pickupName]}>
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
                rules={this.component.getRules('stateProvinceId')}
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
              <Form.Item {...layoutHalf} label={<FormattedMessage id='common.stateProvince' />} name={[groupName, city]}>
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
          <Row gutter={12} className='form-item-group'>
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
                {...layoutHalf}
                label={<FormattedMessage id='common.fields.email' />}
                name={[groupName, email]}
                rules={this.component.getRules('email')}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </React.Fragment>
      </Spin>
    );
  }
}

PickupAddress.propTypes = {
  groupName: PropTypes.string,
  cargoPickupMethods: PropTypes.array.isRequired,
  selectCountries: PropTypes.array.isRequired,
  selectStateProvinces: PropTypes.array.isRequired,
  value: PropTypes.object,
  bindingAddress: PropTypes.func,
  onChange: PropTypes.func,
  rules: PropTypes.array,
  fieldNames: PropTypes.exact({
    cargoPickupMethod: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    cargoPickupMethodText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    pickupName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    wardId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    address1: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    address2: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    countryId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    city: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    stateProvinceId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    districtId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    zipPostalCode: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    email: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
};

PickupAddress.defaultProps = {
  groupName: '',
  selectStateProvinces: [],
  selectCountries: [],
  bindingAddress: () => {},
  onChange: () => {},
  cargoPickupMethods: [],
  rules: [],
  fieldNames: {
    cargoPickupMethod: 'CargoPickupMethod',
    cargoPickupMethodText: 'CargoPickupMethodText',
    pickupName: 'PickupName',
    wardId: 'PickupWardId',
    city: 'PickupCity',
    address1: {
      name: 'PickupAddress1',
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
    address2: 'PickupAddress2',
    countryId: {
      name: 'PickupCountryId',
      rules: [
        {
          required: false,
          message: (
            <FormattedMessage
              id='common.validators.inputFields.required'
              values={{
                field: <FormattedMessage id='common.country' />,
              }}
            />
          ),
        },
      ],
    },
    stateProvinceId: {
      name: 'PickupStateProvinceId',
      rules: [
        {
          required: false,
          message: (
            <FormattedMessage
              id='common.validators.inputFields.required'
              values={{
                field: <FormattedMessage id='common.stateProvince' />,
              }}
            />
          ),
        },
      ],
    },
    districtId: 'PickupDistrictId',
    zipPostalCode: {
      name: 'PickupZipPostalCode',
      rules: [
        {
          required: false,
          message: (
            <FormattedMessage
              id='common.validators.inputFields.required'
              values={{
                field: <FormattedMessage id='common.fields.zipPostalCode' />,
              }}
            />
          ),
        },
      ],
    },
    phoneNumber: {
      name: 'PickupPhoneNumber',
      rules: [
        {
          required: false,
          message: (
            <FormattedMessage
              id='common.validators.inputFields.required'
              values={{
                field: <FormattedMessage id='common.fields.phoneNumber' />,
              }}
            />
          ),
        },
      ],
    },
    email: {
      name: 'PickupEmail',
      rules: [
        {
          required: false,
          message: (
            <FormattedMessage
              id='common.validators.inputFields.required'
              values={{
                field: <FormattedMessage id='common.fields.email' />,
              }}
            />
          ),
        },
        {
          type: 'email',
          message: <FormattedMessage id='common.validators.objects.invalidEmail' />,
        },
      ],
    },
  },
};

export { PickupAddress };
