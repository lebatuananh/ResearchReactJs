import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox, Select, Spin, InputNumber, Tooltip } from 'antd';
import LocalizedEditor, { LocalizedItemWrapper } from '@shared/ui/Localization/LocalizedEditor';

import formHelper from '@shared/lib/helpers/formHelper';
import selectHelper from '@shared/lib/helpers/ui/selectHelper';

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export class Create extends React.Component {
  frmRef = this.props.frmRef;
  code = React.createRef();

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
          id='frmCreate'
          ref={this.frmRef}
          colon={false}
          preserve={false}
          scrollToFirstError={true}
          layout='horizontal'
          {...layout}
          initialValues={{
            Active: m.Active,
            Locales: m.Locales,
            DisplayOrder: m.DisplayOrder,
          }}
        >
          <Form.Item
            name='Code'
            label={<FormattedMessage id='admin.paymentTerms.fields.code' />}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='admin.paymentTerms.fields.code' /> }} />
                ),
              },
            ]}
          >
            <Input ref={this.code} autoFocus />
          </Form.Item>

          <LocalizedEditor
            id='localized_PaymentTerm'
            locales={m.Locales}
            standardRender={
              <div>
                <Form.Item
                  name='Name'
                  label={<FormattedMessage id='admin.paymentTerms.fields.name' />}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id='common.validators.inputFields.required'
                          values={{ field: <FormattedMessage id='admin.paymentTerms.fields.name' /> }}
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
          <Form.Item name='CurrentMonth' valuePropName='checked' label={<FormattedMessage id='admin.paymentTerms.fields.currentMonth' />}>
            <Checkbox />
          </Form.Item>

          <Form.Item
            name='FromDateType'
            label={<FormattedMessage id='admin.paymentTerms.fields.fromDateType' />}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id='common.validators.inputFields.required'
                    values={{ field: <FormattedMessage id='admin.paymentTerms.fields.fromDateType' /> }}
                  />
                ),
              },
            ]}
          >
            <Select
              placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='admin.paymentTerms.fields.fromDateType' /> }} />}
              allowClear
              showSearch
              filterOption={selectHelper.def.filterOption}
            >
              {m.SelectFromDateTypes.map((item) => (
                <Option key={item.Id} value={item.Id}>
                  {item.Name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name='Days' label={<FormattedMessage id='common.fields.days' />}>
            <InputNumber />
          </Form.Item>

          <Form.Item name='Description' label={<FormattedMessage id='common.fields.description' />}>
            <TextArea />
          </Form.Item>
          <Form.Item name='Active' label={<FormattedMessage id='common.fields.active' />} valuePropName='checked'>
            <Checkbox />
          </Form.Item>
          <Form.Item
            name='DisplayOrder'
            label={<FormattedMessage id='common.fields.displayOrder' />}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.fields.displayOrder' /> }} />
                ),
              },
            ]}
          >
            <InputNumber />
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
    model: state.PaymentTerm.create.modelGet,
    loading: state.PaymentTerm.create.loading,
  };
}

export default connect(mapStateToProps)(Create);
