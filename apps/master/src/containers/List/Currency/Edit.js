import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Checkbox, Select, Spin, DatePicker } from 'antd';
import LocalizedEditor, { LocalizedItemWrapper } from '@shared/ui/Localization/LocalizedEditor';

import formHelper from '@shared/lib/helpers/formHelper';
import selectHelper from '@shared/lib/helpers/ui/selectHelper';

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
            CurrencyCode: m.CurrencyCode,
            Name: m.Name,
            Rate: m.Rate,
            CustomFormatting: m.CustomFormatting,
            DisplayLocale: m.DisplayLocale,
            Published: m.Published,
            DisplayOrder: m.DisplayOrder,
            CreatedOnUtc: m.CreatedOnUtc,
            UpdatedOnUtc: m.UpdatedOnUtc,
            Locales: m.Locales,
          }}
        >
          <Form.Item name='Id' hidden>
            <Input type='hidden' />
          </Form.Item>
          <Form.Item name='CreatedOnUtc' hidden>
            <Input type='hidden' />
          </Form.Item>
          <Form.Item name='UpdatedOnUtc' hidden>
            <Input type='hidden' />
          </Form.Item>

          <Form.Item name='CurrencyCode' label={<FormattedMessage id='admin.currencies.fields.currencyCode' />}>
            <Input disabled />
          </Form.Item>

          <LocalizedEditor
            id='localized_Currency'
            locales={m.Locales}
            standardRender={
              <div>
                <Form.Item
                  name='Name'
                  label={<FormattedMessage id='admin.currencies.fields.name' />}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id='common.validators.inputFields.required'
                          values={{ field: <FormattedMessage id='admin.currencies.fields.name' /> }}
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

          <Form.Item name='Rate' label={<FormattedMessage id='admin.currencies.fields.rate' />}>
            <InputNumber />
          </Form.Item>
          <Form.Item name='DisplayLocale' label={<FormattedMessage id='admin.currencies.fields.displayLocale' />}>
            <Select
              placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='admin.currencies.fields.displayLocale' /> }} />}
              allowClear
              showSearch
              filterOption={selectHelper.def.filterOption}
            >
              {m.SelectDisplayLocales.map((item) => (
                <Option key={item.Id} value={item.Id}>
                  {item.Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='CustomFormatting' label={<FormattedMessage id='admin.currencies.fields.customFormatting' />}>
            <Input />
          </Form.Item>
          <Form.Item name='Published' valuePropName='checked' label={<FormattedMessage id='admin.currencies.fields.published' />}>
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

Edit.propTypes = {
  frmRef: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    model: state.Currency.edit.modelGet,
    loading: state.Currency.edit.loading,
  };
}

export default connect(mapStateToProps)(Edit);
