import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox, Select, Spin } from 'antd';
import LocalizedEditor, { LocalizedItemWrapper } from '@shared/ui/Localization/LocalizedEditor';
import selectHelper from '@shared/lib/helpers/ui/selectHelper';

import formHelper from '@shared/lib/helpers/formHelper';

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export class Edit extends React.Component {
  frmRef = this.props.frmRef;

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return formHelper.def.shouldComponentUpdate(this.props, nextProps, nextState);
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
          scrollToFirstError={true}
          layout='horizontal'
          {...layout}
          initialValues={{
            Id: m.Id,
            Code: m.Code,
            FreightPaymentMethod: m.FreightPaymentMethod,
            Name: m.Name,
            LocalName: m.LocalName,
            OtherChargesPaymentMethod: m.OtherChargesPaymentMethod,
            Note: m.Note,
            Active: m.Active,
            Locales: m.Locales,
          }}
        >
          <Form.Item name='Id' noStyle>
            <Input type='hidden' />
          </Form.Item>

          <Form.Item name='Code' label={<FormattedMessage id='admin.incoterms.fields.code' />}>
            <Input disabled />
          </Form.Item>

          <LocalizedEditor
            id='localized_Incoterm'
            locales={m.Locales}
            standardRender={
              <div>
                <Form.Item
                  name='Name'
                  label={<FormattedMessage id='admin.incoterms.fields.name' />}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id='common.validators.inputFields.required'
                          values={{ field: <FormattedMessage id='admin.incoterms.fields.name' /> }}
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
            name='FreightPaymentMethod'
            label={<FormattedMessage id='admin.incoterms.fields.freightPaymentMethod' />}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id='common.validators.inputFields.required'
                    values={{ field: <FormattedMessage id='admin.incoterms.fields.freightPaymentMethod' /> }}
                  />
                ),
              },
            ]}
          >
            <Select
              placeholder={<FormattedMessage id='admin.incoterms.fields.freightPaymentMethod' />}
              allowClear
              showSearch
              filterOption={selectHelper.def.filterOption}
            >
              {m.SelectFreightPMs &&
                m.SelectFreightPMs.map((item) => (
                  <Option key={item.Id} value={item.Id}>
                    {item.Name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='OtherChargesPaymentMethod'
            label={<FormattedMessage id='admin.incoterms.fields.otherChargesPaymentMethod' />}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id='common.validators.inputFields.required'
                    values={{ field: <FormattedMessage id='admin.incoterms.fields.otherChargesPaymentMethod' /> }}
                  />
                ),
              },
            ]}
          >
            <Select
              placeholder={<FormattedMessage id='admin.incoterms.fields.otherChargesPaymentMethod' />}
              allowClear
              showSearch
              filterOption={selectHelper.def.filterOption}
            >
              {m.SelectOtherChargesPMs &&
                m.SelectOtherChargesPMs.map((item) => (
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

Edit.propTypes = {
  frmRef: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    model: state.Incoterm.edit.modelGet,
    loading: state.Incoterm.edit.loading,
  };
}

export default connect(mapStateToProps)(Edit);
