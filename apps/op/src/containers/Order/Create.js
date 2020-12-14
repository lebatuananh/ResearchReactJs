import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Spin, Row, Col, Breadcrumb, Space, Button, Form, Card, Collapse, Select, DatePicker, Input, InputNumber, Radio, Checkbox, Divider } from 'antd';
import LayoutContentWrapper from '@shared/components-admin/utility/layoutWrapper';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import basicStyle from '@shared/assets-admin/styles/constants';
import { SPCustomerSelect, SPConsigneeSelect, SPShipperSelect, PickupAddress } from '@shared/components-admin';
import OrderDetail from './OrderDetail';
import actions from '../../redux/sPOrder/actions';
import { connect } from 'react-redux';
import selectHelper from '@shared/lib/helpers/ui/selectHelper';
import { PickupAddressType } from '@shared/data/common/CargoPickupMethod';
import componentHelper from '@shared/lib/helpers/componentHelper';
import notify from '@shared/ui/Notify/notify';
import { DataGrid } from 'devextreme-react';

const { rowStyle, colStyle, gutter } = basicStyle;
const FormItem = Form.Item;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const layoutItemFullsize = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const layoutOrderDetail = {
  xxl: { span: 12 },
  xl: { span: 12 },
  lg: { span: 12 },
  md: { span: 12 },
  xs: { span: 24 },
  sm: { span: 24 },
};
const layoutCard = {
  xxl: { span: 12 },
  xl: { span: 12 },
  lg: { span: 12 },
  md: { span: 12 },
  xs: { span: 24 },
  sm: { span: 24 },
};

const cardStyles = {};

class CreateOrder extends Component {
  constructor(props) {
    super(props);

    this.pickup = {
      ref: React.createRef(),
      setAddressByType: (type) => {
        if (type === PickupAddressType.FromCustomer) {
          const customer = this.frmCreate.ref.current.getFieldValue('Customer');
          const _customer = componentHelper.convertFieldData(customer, 'Customer');
          const stateProvinces = this.sPCustomerSelect.current.getCurrentStateProvinces();
          const districts = this.sPCustomerSelect.current.getCurrentDistricts();
          const wards = this.sPCustomerSelect.current.getCurrentWards();
          this.pickup.ref.current.setStateProvinces(stateProvinces);
          this.pickup.ref.current.setDistricts(districts);
          this.pickup.ref.current.setWards(wards);
          this.pickup.setAddress(_customer);
        } else if (type === PickupAddressType.FromShipper) {
          const shipper = this.frmCreate.ref.current.getFieldValue('Shipper');
          const _shipper = componentHelper.convertFieldData(shipper, 'Shipper');
          const stateProvinces = this.sPShipperSelect.current.getCurrentStateProvinces();
          const districts = this.sPShipperSelect.current.getCurrentDistricts();
          const wards = this.sPShipperSelect.current.getCurrentWards();
          this.pickup.ref.current.setStateProvinces(stateProvinces);
          this.pickup.ref.current.setDistricts(districts);
          this.pickup.ref.current.setWards(wards);
          this.pickup.setAddress(_shipper);
        } else if (type === PickupAddressType.FromPostOffice) {
          this.pickup.getPostOfficeAddress();
        }
      },
      getPostOfficeAddress: () => {
        const postOfficeId = this.frmCreate.ref.current.getFieldValue('PostOfficeToSendId');
        if (postOfficeId) {
          this.pickup.ref.current.address.getPostOfficeAddress(postOfficeId);
        } else {
          notify.warning(intl.formatMessage({ id: 'common.notify.selectPostOfficeBefore' }));
          this.postOfficeInput.current.focus();
        }
      },
      setAddress: (pickupData) => {
        const pickup = this.frmCreate.ref.current.getFieldValue('Pickup');
        const _data = {
          ...pickup,
          PickupName: pickupData.Name,
          PickupEmail: pickupData.Email,
          PickupCountryId: pickupData.CountryId,
          PickupStateProvinceId: pickupData.StateProvinceId,
          PickupCity: pickupData.City,
          PickupDistrictId: pickupData.DistrictId,
          PickupWardId: pickupData.WardId,
          PickupAddress1: pickupData.Address1,
          PickupAddress2: pickupData.Address2,
          PickupZipPostalCode: pickupData.ZipPostalCode,
          PickupPhoneNumber: pickupData.PhoneNumber,
        };
        this.frmCreate.ref.current.setFieldsValue({ Pickup: _data });
      },
    };

    this.card = {
      ref: React.createRef(),
      extraHeader: () => {
        return (
          <Button
            type='primary'
            onClick={(e) => {
              this.frmCreate.submit();
            }}
            icon={<FontAwesomeIcon icon={['fas', 'save']} />}
          >
            <FormattedMessage id='common.save' />
          </Button>
        );
      },
    };

    this.frmCreate = {
      ref: React.createRef(),
      submit: () => {
        this.frmCreate.ref.current
          .validateFields()
          .then((values) => {
            const data = this.orderDetail.current.getData();
            values.OrderDetails = data;
            const { Customer, Shipper, Consignee, Pickup, ...fields } = values;
            const model = { ...fields, ...Customer, ...Shipper, ...Consignee, ...Pickup };
            console.log('Validate success:', model);
            this.props.createPost(model);
          })
          .catch((error) => {
            console.log('Validate Failed:', error);
          });
      },
    };

    this.postOfficeSend = {
      ref: React.createRef(),
      onChange: (value) => {
        if (value === undefined) {
          this.frmCreate.ref.current.setFieldsValue({
            PostOfficeToSendCode: undefined,
          });
        }
      },
      onSelect: (value, options) => {
        const { data } = options;
        this.frmCreate.ref.current.setFieldsValue({
          PostOfficeToSendCode: data ? data.Code : undefined,
        });
      },
    };

    this.cargoSPService = {
      ref: React.createRef(),
      onChange: (value) => {
        if (value === undefined) {
          this.frmCreate.ref.current.setFieldsValue({
            CargoSPServiceCode: undefined,
          });
        }
      },
      onSelect: (value, options) => {
        const { data } = options;
        this.frmCreate.ref.current.setFieldsValue({
          CargoSPServiceCode: data ? data.Code : undefined,
        });
      },
    };

    this.frmCreate.submit = this.frmCreate.submit.bind(this);
    this.pickup.setAddressByType = this.pickup.setAddressByType.bind(this);
    this.postOfficeSend.onSelect = this.postOfficeSend.onSelect.bind(this);
    this.postOfficeSend.onChange = this.postOfficeSend.onChange.bind(this);
    this.cargoSPService.onSelect = this.cargoSPService.onSelect.bind(this);
    this.cargoSPService.onChange = this.cargoSPService.onChange.bind(this);
    this.pickup.setAddress = this.pickup.setAddress.bind(this);
    this.card.extraHeader = this.card.extraHeader.bind(this);
  }

  postOfficeInput = React.createRef();

  sPCustomerSelect = React.createRef();

  sPShipperSelect = React.createRef();

  orderDetail = React.createRef();

  componentDidMount() {
    this.props.createGet();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, prevState);
    const { create } = this.props;

    if (create.result && create.result.success) {
      notify.success(create.result.message);
    }
    if (create.error) {
      notify.error(create.error);
    }
  }

  render() {
    const { create } = this.props;
    const { modelGet } = create;
    if (!modelGet) return null;
    const {
      SelectCargoSPServices,
      SelectCargoPickupMethods,
      SelectCargoShippingMethods,
      SelectPostOfficesToSend,
      SelectCargoTypes,
      SelectCargoAddServices,
      SelectCountries,
      SelectConsigneeSPros,
      SelectCustomerSPros,
      SelectPickupSPros,
      SelectShipperSPros,
      SelectCommodities,
      SelectCountriesOfOrigin,
      SelectCurrencies,
      SelectDeclaredCargoClasses,
      SelectMeasureWeights,
      Id,
    } = modelGet;
    const loading = create.loading;
    return (
      <Spin spinning={loading} size='large'>
        <LayoutContentWrapper>
          <Row style={rowStyle} gutter={gutter}>
            <Col span={9} style={colStyle}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <FontAwesomeIcon icon={['fas', 'home']} />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <FormattedMessage id='sidebar.order' />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <FormattedMessage id='sidebar.order.create' />
                </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Card extra={this.card.extraHeader()} bordered={true} style={{ width: '100%' }} bodyStyle={{ padding: '5px' }}>
            {
              <Form
                id='frmCreate'
                colon={false}
                ref={this.frmCreate.ref}
                preserve={false}
                scrollToFirstError={true}
                layout='horizontal'
                {...layout}
                onFinish={(values) => console.log(values)}
                onValuesChange={(e) => console.log(e)}
                initialValues={
                  {
                    // OrderCargoAddServices: [],
                    // CargoSPServiceId: '0147b435-6c41-45d8-906a-a89d466f3518',
                    // PostOfficeToSendId: '04219879-06c3-4fd3-a187-ebe154d954f2',
                    // Pickup: {
                    //   CargoPickupMethod: 10,
                    // },
                  }
                }
              >
                <Row gutter={24}>
                  <Col {...layoutCard} style={{ marginTop: '5px', paddingRight: '2.5px' }}>
                    <Collapse defaultActiveKey={['1']} expandIconPosition='right'>
                      <Collapse.Panel
                        header={
                          <b>
                            <FormattedMessage id='common.sPCustomer' />
                          </b>
                        }
                        key='1'
                      >
                        <FormItem noStyle name='Customer'>
                          <SPCustomerSelect
                            ref={this.sPCustomerSelect}
                            groupName='Customer'
                            selectCountries={SelectCountries}
                            selectStateProvinces={SelectCustomerSPros}
                            rules={[
                              {
                                required: true,
                                message: (
                                  <FormattedMessage
                                    id='common.validators.inputFields.required'
                                    values={{ field: <FormattedMessage id='common.sPCustomer' /> }}
                                  />
                                ),
                              },
                            ]}
                          />
                        </FormItem>
                      </Collapse.Panel>
                    </Collapse>
                  </Col>
                  <Col {...layoutCard} style={{ marginTop: '5px', paddingLeft: '2.5px' }}>
                    <Collapse defaultActiveKey={['1']} expandIconPosition='right'>
                      <Collapse.Panel
                        header={
                          <b>
                            <FormattedMessage id='common.sender' />
                          </b>
                        }
                        key='1'
                      >
                        <FormItem noStyle name='Shipper'>
                          <SPShipperSelect
                            groupName='Shipper'
                            ref={this.sPShipperSelect}
                            selectCountries={SelectCountries}
                            selectStateProvinces={SelectShipperSPros}
                            rules={[
                              {
                                required: false,
                                message: (
                                  <FormattedMessage
                                    id='common.validators.inputFields.required'
                                    values={{ field: <FormattedMessage id='common.sPCustomer' /> }}
                                  />
                                ),
                              },
                            ]}
                          />
                        </FormItem>
                      </Collapse.Panel>
                    </Collapse>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col {...layoutCard} style={{ marginTop: '5px', paddingRight: '2.5px' }}>
                    <Collapse defaultActiveKey={['1']} expandIconPosition='right'>
                      <Collapse.Panel
                        header={
                          <b>
                            <FormattedMessage id='common.consignee' />
                          </b>
                        }
                        key='1'
                      >
                        <FormItem noStyle name='Consignee'>
                          <SPConsigneeSelect
                            groupName='Consignee'
                            selectCountries={SelectCountries}
                            selectStateProvinces={SelectConsigneeSPros}
                            rules={[
                              {
                                required: false,
                                message: (
                                  <FormattedMessage
                                    id='common.validators.inputFields.required'
                                    values={{ field: <FormattedMessage id='common.sPCustomer' /> }}
                                  />
                                ),
                              },
                            ]}
                          />
                        </FormItem>
                      </Collapse.Panel>
                    </Collapse>
                  </Col>
                  <Col {...layoutCard} style={{ marginTop: '5px', paddingLeft: '2.5px' }}>
                    <Collapse defaultActiveKey={['1']} expandIconPosition='right'>
                      <Collapse.Panel
                        header={
                          <b>
                            <FormattedMessage id='common.pickup' />
                          </b>
                        }
                        key='1'
                      >
                        <FormItem noStyle name='Pickup'>
                          <PickupAddress
                            ref={this.pickup.ref}
                            bindingAddress={this.pickup.setAddressByType}
                            groupName='Pickup'
                            selectStateProvinces={SelectPickupSPros}
                            selectCountries={SelectCountries}
                            cargoPickupMethods={SelectCargoPickupMethods}
                            fieldNames={{
                              cargoPickupMethod: {
                                name: 'CargoPickupMethod',
                                rules: [
                                  {
                                    required: true,
                                    message: (
                                      <FormattedMessage
                                        id='common.validators.inputFields.required'
                                        values={{ field: <FormattedMessage id='admin.sPOrders.fields.cargoPickupMethod' /> }}
                                      />
                                    ),
                                  },
                                ],
                              },
                            }}
                          />
                        </FormItem>
                      </Collapse.Panel>
                    </Collapse>
                  </Col>
                </Row>
                <Space style={{ width: '100%' }} direction='vertical'>
                  <Collapse defaultActiveKey={['1']} expandIconPosition='right'>
                    <Collapse.Panel
                      header={
                        <b>
                          <FormattedMessage id='admin.sPOrders.orderInfo' />
                        </b>
                      }
                      key='1'
                    >
                      <Row gutter={24}>
                        <Col {...layoutOrderDetail}>
                          <FormItem
                            name='CargoShippingMethod'
                            label={<FormattedMessage id='admin.sPOrders.fields.cargoShippingMethod' />}
                            rules={[
                              {
                                required: true,
                                message: (
                                  <FormattedMessage
                                    id='common.validators.inputFields.required'
                                    values={{ field: <FormattedMessage id='admin.sPOrders.fields.cargoShippingMethod' /> }}
                                  />
                                ),
                              },
                            ]}
                          >
                            <Select
                              placeholder={
                                <FormattedMessage
                                  id='common.selectObject'
                                  values={{ field: <FormattedMessage id='admin.sPOrders.fields.cargoShippingMethod' /> }}
                                />
                              }
                              allowClear
                              showSearch
                              filterOption={selectHelper.def.filterOption}
                            >
                              {SelectCargoShippingMethods.map((x) => (
                                <Option key={x.Id} value={x.Id} data={x}>
                                  {`${x.Name}`}
                                </Option>
                              ))}
                            </Select>
                          </FormItem>
                          <FormItem
                            name='CargoType'
                            label={<FormattedMessage id='admin.sPOrders.fields.cargoType' />}
                            rules={[
                              {
                                required: true,
                                message: (
                                  <FormattedMessage
                                    id='common.validators.inputFields.required'
                                    values={{ field: <FormattedMessage id='admin.sPOrders.fields.cargoType' /> }}
                                  />
                                ),
                              },
                            ]}
                          >
                            <Select
                              placeholder={
                                <FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='admin.sPOrders.fields.cargoType' /> }} />
                              }
                              allowClear
                              showSearch
                              filterOption={selectHelper.def.filterOption}
                            >
                              {SelectCargoTypes.map((x) => (
                                <Option key={x.Id} value={x.Id} data={x}>
                                  {`${x.Name}`}
                                </Option>
                              ))}
                            </Select>
                          </FormItem>
                          <FormItem
                            name='Pieces'
                            label={<FormattedMessage id='admin.sPOrders.fields.pieces' />}
                            rules={[
                              {
                                required: true,
                                message: (
                                  <FormattedMessage
                                    id='common.validators.inputFields.required'
                                    values={{ field: <FormattedMessage id='admin.sPOrders.fields.pieces' /> }}
                                  />
                                ),
                              },
                            ]}
                          >
                            <InputNumber />
                          </FormItem>
                          <FormItem name='SendDate' label={<FormattedMessage id='admin.sPOrders.fields.sendDate' />}>
                            <DatePicker />
                          </FormItem>
                        </Col>
                        <Col {...layoutOrderDetail}>
                          <FormItem name='Id' label={<FormattedMessage id='admin.sPOrders.fields.orderNumber' />}>
                            <Input />
                          </FormItem>
                          <FormItem name='ReferenceNumber' label={<FormattedMessage id='admin.sPOrders.fields.referenceNumber' />}>
                            <Input />
                          </FormItem>
                          <FormItem
                            name='PostOfficeToSendId'
                            label={<FormattedMessage id='admin.sPOrders.fields.postOfficeToSend' />}
                            rules={[
                              {
                                required: true,
                                message: (
                                  <FormattedMessage
                                    id='common.validators.inputFields.required'
                                    values={{ field: <FormattedMessage id='admin.sPOrders.fields.postOfficeToSend' /> }}
                                  />
                                ),
                              },
                            ]}
                          >
                            <Select
                              ref={this.postOfficeSend.ref}
                              placeholder={
                                <FormattedMessage
                                  id='common.selectObject'
                                  values={{ field: <FormattedMessage id='admin.sPOrders.fields.postOfficeToSend' /> }}
                                />
                              }
                              allowClear
                              onSelect={this.postOfficeSend.onSelect}
                              onChange={this.postOfficeSend.onChange}
                              showSearch
                              filterOption={selectHelper.def.filterOption}
                            >
                              {SelectPostOfficesToSend.map((x) => (
                                <Option key={x.Id} value={x.Id} data={x}>
                                  {`[${x.Code}] ${x.Name}`}
                                </Option>
                              ))}
                            </Select>
                          </FormItem>
                          <Form.Item name='PostOfficeToSendCode' hidden label='PostOfficeToSendCode'>
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <OrderDetail
                        key='orderDetail'
                        orderId={Id}
                        ref={this.orderDetail}
                        selectCountries={SelectCountriesOfOrigin}
                        selectCommodities={SelectCommodities}
                        selectCurrencies={SelectCurrencies}
                        selectDeclaredCargoClasses={SelectDeclaredCargoClasses}
                        selectMeasureWeights={SelectMeasureWeights}
                      />
                    </Collapse.Panel>
                  </Collapse>
                  <Collapse defaultActiveKey={['1']} expandIconPosition='right'>
                    <Collapse.Panel header={<b>Dịch vụ</b>} key='1'>
                      <Form.Item
                        {...{ ...layoutItemFullsize, wrapperCol: { span: 6 } }}
                        label={<FormattedMessage id='admin.sPOrders.fields.cargoSPService' />}
                        name='CargoSPServiceId'
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage
                                id='common.validators.inputFields.required'
                                values={{ field: <FormattedMessage id='admin.sPOrders.fields.cargoSPService' /> }}
                              />
                            ),
                          },
                        ]}
                      >
                        <Select
                          placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.cargoSPService' /> }} />}
                          allowClear
                          showSearch
                          onSelect={this.cargoSPService.onSelect}
                          onChange={this.cargoSPService.onChange}
                          filterOption={selectHelper.def.filterOption}
                        >
                          {SelectCargoSPServices.map((x) => (
                            <Option key={x.Id} value={x.Id} data={x}>
                              {`[${x.Code}] ${x.Name}`}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item name='CargoSPServiceCode' hidden label='CargoSPServiceCode'>
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...layoutItemFullsize}
                        label={<FormattedMessage id='admin.sPOrders.fields.orderCargoAddServices' />}
                        name='OrderCargoAddServices'
                      >
                        <Checkbox.Group style={{ width: '100%' }}>
                          <Row gutter={24}>
                            {SelectCargoAddServices.map((x) => (
                              <Col span={8} key={x.Id}>
                                <Checkbox value={{ CargoAddServiceId: x.Id, CargoAddServiceCode: x.Code }}>{`[${x.Code}] ${x.Name}`}</Checkbox>
                              </Col>
                            ))}
                          </Row>
                        </Checkbox.Group>
                      </Form.Item>
                      {/* <Row gutter={24}>
                        <Col span={8}></Col>
                        <Col span={24}></Col>
                      </Row> */}
                    </Collapse.Panel>
                  </Collapse>
                </Space>
              </Form>
            }
          </Card>
        </LayoutContentWrapper>
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.SPOrder.loading,
    create: {
      modelGet: state.SPOrder.create.modelGet,
      modelPost: state.SPOrder.create.modelPost,
      result: state.SPOrder.create.result,
      error: state.SPOrder.create.error,
      loading: state.SPOrder.create.loading,
      visible: state.SPOrder.create.visible,
    },
  };
}
function mapDispatchToProps(dispatch) {
  return {
    createGet: () => dispatch(actions.createGet()),
    createGetError: (error) => dispatch(actions.createGetError(error)),
    createSet: (model) => dispatch(actions.createSet(model)),
    createSetSuccess: () => dispatch(actions.createSetSuccess()),
    createPost: (model) => dispatch(actions.createPost(model)),
    createPostSuccess: (result) => dispatch(actions.createPostSuccess(result)),
    createPostError: (error) => dispatch(actions.createPostError(error)),
    createClose: () => dispatch(actions.createClose()),
    createReset: () => dispatch(actions.createReset()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
