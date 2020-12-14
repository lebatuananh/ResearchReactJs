import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';
import { Row, Col, Form, Input, InputNumber, Button, Checkbox, Radio, Select, Spin } from 'antd';
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
            //Locales: m.Locales,
          }}
        >
          <Form.Item
            name='AccountNumber'
            label={<FormattedMessage id='common.fields.accountNumber' />}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.fields.accountNumber' /> }} />
                ),
              },
            ]}
          >
            <Input ref={this.code} autoFocus />
          </Form.Item>
          <Form.Item
            name='Name'
            label={<FormattedMessage id='admin.bankAccounts.fields.name' />}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='admin.bankAccounts.fields.name' /> }} />
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='BankId'
            label={<FormattedMessage id='common.bank' />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.bank' /> }} />,
              },
            ]}
          >
            <Select
              placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.bank' /> }} />}
              allowClear
              showSearch
              filterOption={selectHelper.def.filterOption}
            >
              {m.SelectBanks.map((x) => (
                <Option key={x.Id} value={x.Id}>
                  {`[${x.Code}] ${x.Name}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='BankBranchId' label={<FormattedMessage id='common.bankBranch' />}>
            <Select
              placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.bankBranch' /> }} />}
              allowClear
              showSearch
              filterOption={selectHelper.def.filterOption}
            >
              {m.SelectBankBranches.map((x) => (
                <Option key={x.Id} value={x.Id}>
                  {`[${x.Code}] ${x.Name}`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* <LocalizedEditor
            id='localized_BankAccount'
            locales={m.Locales}
            standardRender={
              <div>
                <Form.Item
                  name='Name'
                  label={<FormattedMessage id='admin.bankAccounts.fields.name' />}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id='common.validators.inputFields.required'
                          values={{ field: <FormattedMessage id='admin.bankAccounts.fields.name' /> }}
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
          /> */}

          <Form.Item name='LocalName' label={<FormattedMessage id='common.fields.localName' />}>
            <Input />
          </Form.Item>
          <Form.Item name='AccountMasterId' label={<FormattedMessage id='common.fields.accountMaster' />}>
            <Input />
          </Form.Item>
          <Form.Item
            name='CurrencyId'
            label={<FormattedMessage id='common.currency' />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.currency' /> }} />,
              },
            ]}
          >
            <Select
              placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.currency' /> }} />}
              allowClear
              showSearch
              filterOption={selectHelper.def.filterOption}
            >
              {m.SelectCurrencies.map((x) => (
                <Option key={x.Id} value={x.Id}>
                  {`[${x.CurrencyCode}] ${x.Name}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='IBAN' label={<FormattedMessage id='admin.bankAccounts.fields.IBAN' />}>
            <Input />
          </Form.Item>
          <Form.Item name='VatNumber' label={<FormattedMessage id='common.fields.vatNumber' />}>
            <Input />
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
    model: state.BankAccount.create.modelGet,
    loading: state.Bank.create.loading,
  };
}

export default connect(mapStateToProps)(Create);
