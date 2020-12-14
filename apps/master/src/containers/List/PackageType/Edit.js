import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';
import { Row, Col, Form, Input, InputNumber, Button, Checkbox, Radio, Select, Spin, Space } from 'antd';
import LocalizedEditor, { LocalizedItemWrapper } from '@shared/ui/Localization/LocalizedEditor';

import formHelper from '@shared/lib/helpers/formHelper';

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const layoutCheckbox = {
  labelCol: { span: 18 },
  wrapperCol: { span: 6 },
};
const layoutFormLeft = {
  xxl: { span: 16 },
  xl: { span: 16 },
  lg: { span: 16 },
  md: { span: 16 },
  xs: { span: 24 },
  sm: { span: 24 },
};
const layoutFormRight = {
  xxl: { span: 8 },
  xl: { span: 8 },
  lg: { span: 8 },
  md: { span: 8 },
  xs: { span: 24 },
  sm: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 18, span: 6 },
};

export class Edit extends React.Component {
  frmRef = this.props.frmRef;

  constructor(props) {
    super(props);
    this.handleFormValueChange = this.handleFormValueChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return formHelper.def.shouldComponentUpdate(this.props, nextProps, nextState);
  }

  handleFormValueChange(changedValues, allValues) {
    if (changedValues.IsContainer !== undefined) {
      if (changedValues.IsContainer === false) {
        this.frmRef.current.setFieldsValue({
          Refrigerated: false,
        });
      }
    }
  }

  render() {
    const m = this.props.model;
    if (!m) return null;

    const { loading } = this.props;

    return (
      <Spin spinning={loading} size='large'>
        <Form
          id='frmEdit'
          ref={this.frmRef}
          colon={false}
          preserve={false}
          onValuesChange={this.handleFormValueChange}
          scrollToFirstError={true}
          layout='horizontal'
          {...layout}
          initialValues={{
            Id: m.Id,
            Code: m.Code,
            Name: m.Name,
            LocalName: m.LocalName,
            TEU: m.TEU,
            ContainerSize: m.ContainerSize,
            Volume: m.Volume,
            PrintAs: m.PrintAs,
            IsContainer: m.IsContainer,
            Refrigerated: m.Refrigerated,
            Vehicle: m.Vehicle,
            Air: m.Air,
            Ocean: m.Ocean,
            Inland: m.Inland,
            Note: m.Note,
            Active: m.Active,
            Locales: m.Locales,
          }}
        >
          <Form.Item name='Id' noStyle>
            <Input type='hidden' />
          </Form.Item>

          <Row gutter={24}>
            <Col {...layoutFormLeft}>
              <Form.Item name='Code' label={<FormattedMessage id='admin.packageTypes.fields.code' />}>
                <Input disabled />
              </Form.Item>

              <LocalizedEditor
                id='localized_PackageType'
                locales={m.Locales}
                standardRender={
                  <div>
                    <Form.Item
                      name='Name'
                      label={<FormattedMessage id='admin.packageTypes.fields.name' />}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id='common.validators.inputFields.required'
                              values={{ field: <FormattedMessage id='admin.packageTypes.fields.name' /> }}
                            />
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
                              <Form.Item
                                {...field}
                                key={'LanguageId_' + index}
                                name={[field.name, 'LanguageId']}
                                fieldKey={[field.fieldKey, 'LanguageId']}
                                noStyle
                              >
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
              <Form.Item name='LocalName' label={<FormattedMessage id='common.fields.localName' />}>
                <Input />
              </Form.Item>
              <Form.Item name='TEU' label={<FormattedMessage id='admin.packageTypes.fields.TEU' />}>
                <Input />
              </Form.Item>
              <Form.Item name='ContainerSize' label={<FormattedMessage id='admin.packageTypes.fields.containerSize' />}>
                <Input />
              </Form.Item>
              <Form.Item name='Volume' label={<FormattedMessage id='common.fields.volume' />}>
                <Input />
              </Form.Item>
              <Form.Item
                name='PrintAs'
                label={<FormattedMessage id='common.fields.printAs' />}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.fields.printAs' /> }} />
                    ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name='Note' label={<FormattedMessage id='common.fields.note' />}>
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item name='Active' label={<FormattedMessage id='common.fields.active' />} valuePropName='checked'>
                <Checkbox />
              </Form.Item>
            </Col>
            <Col {...layoutFormRight}>
              <Form.Item noStyle shouldUpdate={(prev, current) => prev.Vehicle !== current.Vehicle}>
                {({ getFieldValue }) => {
                  const _vehicle = getFieldValue('Vehicle');
                  return (
                    <Form.Item
                      name='IsContainer'
                      labelAlign='left'
                      {...layoutCheckbox}
                      valuePropName='checked'
                      label={<FormattedMessage id='admin.packageTypes.fields.isContainer' />}
                    >
                      <Checkbox disabled={_vehicle === true} />
                    </Form.Item>
                  );
                }}
              </Form.Item>
              <Form.Item noStyle shouldUpdate={(prev, current) => prev.IsContainer !== current.IsContainer}>
                {({ getFieldValue }) => {
                  const _isContainer = getFieldValue('IsContainer');
                  return (
                    <Form.Item
                      name='Refrigerated'
                      {...layoutCheckbox}
                      labelAlign='left'
                      valuePropName='checked'
                      label={<FormattedMessage id='admin.packageTypes.fields.refrigerated' />}
                    >
                      <Checkbox disabled={!_isContainer} />
                    </Form.Item>
                  );
                }}
              </Form.Item>
              <Form.Item noStyle shouldUpdate={(prev, current) => prev.IsContainer !== current.IsContainer}>
                {({ getFieldValue }) => {
                  const _isContainer = getFieldValue('IsContainer');
                  return (
                    <Form.Item
                      name='Vehicle'
                      {...layoutCheckbox}
                      labelAlign='left'
                      valuePropName='checked'
                      label={<FormattedMessage id='common.fields.vehicle' />}
                    >
                      <Checkbox disabled={_isContainer === true} />
                    </Form.Item>
                  );
                }}
              </Form.Item>
              <Form.Item name='Air' {...layoutCheckbox} labelAlign='left' valuePropName='checked' label={<FormattedMessage id='common.fields.air' />}>
                <Checkbox />
              </Form.Item>
              <Form.Item name='Ocean' {...layoutCheckbox} labelAlign='left' valuePropName='checked' label={<FormattedMessage id='common.fields.ocean' />}>
                <Checkbox />
              </Form.Item>
              <Form.Item name='Inland' {...layoutCheckbox} labelAlign='left' valuePropName='checked' label={<FormattedMessage id='common.fields.inland' />}>
                <Checkbox />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
}

Edit.propTypes = {
  frmRef: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    model: state.PackageType.edit.modelGet,
    loading: state.PackageType.edit.loading,
  };
}

export default connect(mapStateToProps)(Edit);
