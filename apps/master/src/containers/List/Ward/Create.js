import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';
import { Row, Col, Form, Input, InputNumber, Button, Checkbox, Radio, Select, Spin } from 'antd';
import LocalizedEditor, { LocalizedItemWrapper } from '@shared/ui/Localization/LocalizedEditor';
import actions from '../../../redux/list/ward/actions';

import selectHelper from '@shared/lib/helpers/ui/selectHelper';
import formHelper from '@shared/lib/helpers/formHelper';

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 18, span: 6 },
};

export class Create extends React.Component {
  frmRef = this.props.frmRef;
  code = React.createRef();

  constructor(props) {
    super(props);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleStateProvinceChange = this.handleStateProvinceChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return formHelper.def.shouldComponentUpdate(this.props, nextProps, nextState);
  }
  handleCountryChange = (value) => {
    this.props.createCountryChange(value);
    this.frmRef.current.setFieldsValue({
      StateProvinceId: undefined,
      DistrictId: undefined,
    });
  };
  handleStateProvinceChange = (value) => {
    this.props.createStateProvinceChange(value);
    this.frmRef.current.setFieldsValue({
      DistrictId: undefined,
    });
  };
  render() {
    let m = this.props.model;
    if (!m) return null;

    const { loading, stateProvince, district } = this.props;

    return (
      <Spin spinning={loading} size='large'>
        <Form
          id='frmCreate'
          ref={this.frmRef}
          colon={false}
          preserve={false}
          scrollToFirstError={true}
          layout='horizontal'
          {...layout}
          initialValues={{
            Active: m.Active,
            DisplayOrder: m.DisplayOrder,
            Locales: m.Locales,
          }}
        >
          <Form.Item
            name='Code'
            label={<FormattedMessage id='admin.wards.fields.code' />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='admin.wards.fields.code' /> }} />,
              },
            ]}
          >
            <Input ref={this.code} autoFocus />
          </Form.Item>

          <LocalizedEditor
            id='localized_Ward'
            locales={m.Locales}
            standardRender={
              <div>
                <Form.Item
                  name='Name'
                  label={<FormattedMessage id='admin.wards.fields.name' />}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='admin.wards.fields.name' /> }} />
                      ),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            }
            localizedRender={
              <div>
                <Form.List name='Locales'>
                  {(fields) => (
                    <>
                      {fields.map((field, index) => (
                        <LocalizedItemWrapper key={field.key} index={index}>
                          <Form.Item {...field} key={'LanguageId_' + index} name={[field.name, 'LanguageId']} fieldKey={[field.fieldKey, 'LanguageId']} noStyle>
                            <Input type='hidden' />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            key={'Name_' + index}
                            name={[field.name, 'Name']}
                            fieldKey={[field.fieldKey, 'Name']}
                            label={m.LocaleLabels['Name']}
                          >
                            <Input />
                          </Form.Item>
                        </LocalizedItemWrapper>
                      ))}
                    </>
                  )}
                </Form.List>
              </div>
            }
          />
          <Form.Item name='ShortName' label={<FormattedMessage id='common.fields.shortName' />}>
            <Input />
          </Form.Item>

          <Form.Item
            name='CountryId'
            label={<FormattedMessage id='common.country' />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.country' /> }} />,
              },
            ]}
          >
            <Select
              placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.country' /> }} />}
              allowClear
              showSearch
              onChange={this.handleCountryChange}
              filterOption={selectHelper.def.filterOption}
            >
              {m.SelectCountries.map((x) => (
                <Option key={x.Id} value={x.Id}>
                  {`[${x.Code}] ${x.Name}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='StateProvinceId'
            label={<FormattedMessage id='common.stateProvince' />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.stateProvince' /> }} />,
              },
            ]}
          >
            <Select
              loading={stateProvince.loading}
              placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.stateProvince' /> }} />}
              allowClear
              onChange={this.handleStateProvinceChange}
              showSearch
              filterOption={selectHelper.def.filterOption}
            >
              {stateProvince.data.map((item) => (
                <Option key={item.Id} value={item.Id}>
                  {item.Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='DistrictId'
            label={<FormattedMessage id='common.district' />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.district' /> }} />,
              },
            ]}
          >
            <Select
              loading={district.loading}
              placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.district' /> }} />}
              allowClear
              showSearch
              filterOption={selectHelper.def.filterOption}
            >
              {district.data.map((item) => (
                <Option key={item.Id} value={item.Id}>
                  {item.Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='Note' label={<FormattedMessage id='common.fields.note' />}>
            <TextArea />
          </Form.Item>
          <Form.Item name='Active' label={<FormattedMessage id='common.fields.active' />} valuePropName='checked'>
            <Checkbox />
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}

Create.propTypes = {
  frmRef: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    model: state.Ward.create.modelGet,
    loading: state.Ward.create.loading,
    stateProvince: {
      loading: state.Ward.create.data.stateProvince.loading,
      data: state.Ward.create.data.stateProvince.data,
    },
    district: {
      loading: state.Ward.create.data.district.loading,
      data: state.Ward.create.data.district.data,
    },
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCountryChange: (countryId) => dispatch(actions.createCountryChange(countryId)),
    createStateProvinceChange: (stateProvinceId) => dispatch(actions.createStateProvinceChange(stateProvinceId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
