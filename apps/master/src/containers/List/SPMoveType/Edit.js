import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';
import { Row, Col, Form, Input, InputNumber, Button, Checkbox, Radio, Select, Spin, Space } from 'antd';
import LocalizedEditor, { LocalizedItemWrapper } from '@shared/ui/Localization/LocalizedEditor';

import formHelper from '@shared/lib/helpers/formHelper';
import selectHelper from '@shared/lib/helpers/ui/selectHelper';

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 18, span: 6 },
};

function prepareGetModel(values) {
  if (values) {
    let _model = { ...values };
    if (_model['Air'] === true) {
      _model['TransportMode'] = 'Air';
    } else if (_model['Ocean'] === true) {
      _model['TransportMode'] = 'Ocean';
    } else if (_model['Inland'] === true) {
      _model['TransportMode'] = 'Inland';
    }
    return _model;
  }
  return values;
}

export class Edit extends React.Component {
  frmRef = this.props.frmRef;

  constructor(props) {
    super(props);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return formHelper.def.shouldComponentUpdate(this.props, nextProps, nextState);
  }

  handleCountryChange = (value) => {
    this.props.editCountryChange(value);
    this.frmRef.current.setFieldsValue({
      StateProvinceId: undefined,
    });
  };
  render() {
    let _values = this.props.model;
    if (!_values) return null;
    let m = prepareGetModel(_values);
    const { loading } = this.props;

    return (
      <Spin spinning={loading} size='large'>
        <Form
          id='frmEdit'
          ref={this.frmRef}
          colon={false}
          preserve={false}
          scrollToFirstError={true}
          layout='horizontal'
          {...layout}
          initialValues={{
            Id: m.Id,
            Code: m.Code,
            TransportMode: m.TransportMode,
            Name: m.Name,
            LocalName: m.LocalName,
            Active: m.Active,
            Locales: m.Locales,
          }}
        >
          <Form.Item name='Id' noStyle>
            <Input type='hidden' />
          </Form.Item>

          <Form.Item name='Code' label={<FormattedMessage id='admin.sPMoveTypes.fields.code' />}>
            <Input disabled />
          </Form.Item>
          <LocalizedEditor
            id='localized_SPMoveType'
            locales={m.Locales}
            standardRender={
              <div>
                <Form.Item
                  name='Name'
                  label={<FormattedMessage id='admin.sPMoveTypes.fields.name' />}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id='common.validators.inputFields.required'
                          values={{ field: <FormattedMessage id='admin.sPMoveTypes.fields.name' /> }}
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

          <Form.Item name='LocalName' label={<FormattedMessage id='common.fields.localName' />}>
            <Input />
          </Form.Item>
          <Form.Item
            name='TransportMode'
            label={<FormattedMessage id='admin.sPMoveTypes.fields.transportMode' />}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id='common.validators.inputFields.required'
                    values={{ field: <FormattedMessage id='admin.sPMoveTypes.fields.transportMode' /> }}
                  />
                ),
              },
            ]}
          >
            <Radio.Group>
              <Radio value={'Air'}>
                <FormattedMessage id='common.fields.air' />
              </Radio>
              <Radio value={'Ocean'}>
                <FormattedMessage id='common.fields.ocean' />
              </Radio>
              <Radio value={'Inland'}>
                <FormattedMessage id='common.fields.inland' />
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name='Active' label={<FormattedMessage id='common.fields.active' />} valuePropName='checked'>
            <Checkbox />
          </Form.Item>
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
    model: state.SPMoveType.edit.modelGet,
    loading: state.SPMoveType.edit.loading,
  };
}

export default connect(mapStateToProps)(Edit);
