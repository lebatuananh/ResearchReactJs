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
            ShortName: m.ShortName,
            CountryId: m.CountryId,
            Name: m.Name,
            Note: m.Note,
            Active: m.Active,
            Locales: m.Locales,
          }}
        >
          <Form.Item name='Id' noStyle>
            <Input type='hidden' />
          </Form.Item>

          <Form.Item name='Code' label={<FormattedMessage id='admin.stateProvinces.fields.code' />}>
            <Input disabled />
          </Form.Item>

          <LocalizedEditor
            id='localized_StateProvince'
            locales={m.Locales}
            standardRender={
              <div>
                <Form.Item
                  name='Name'
                  label={<FormattedMessage id='admin.stateProvinces.fields.name' />}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id='common.validators.inputFields.required'
                          values={{ field: <FormattedMessage id='admin.stateProvinces.fields.name' /> }}
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
          <Form.Item
            name='ShortName'
            label={<FormattedMessage id='common.fields.shortName' />}
            // rules={[
            //   {
            //     required: true,
            //     message: (
            //       <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.fields.shortName' /> }} />
            //     ),
            //   },
            // ]}
          >
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
              filterOption={selectHelper.def.filterOption}
            >
              {m.SelectCountries.map((x) => (
                <Option key={x.Id} value={x.Id}>
                  {`[${x.Code}] ${x.Name}`}
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
    model: state.StateProvince.edit.modelGet,
    loading: state.StateProvince.edit.loading,
  };
}

export default connect(mapStateToProps)(Edit);
