import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox, Spin, Tabs, Select } from 'antd';
import LocalizedEditor, { LocalizedItemWrapper } from '@shared/ui/Localization/LocalizedEditor';
import actions from '../../../redux/list/shippingLine/actions';

import formHelper from '@shared/lib/helpers/formHelper';
import selectHelper from '@shared/lib/helpers/ui/selectHelper';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tabSubmit = 'general';

export class Edit extends React.Component {
  frmRef = this.props.frmRef;

  constructor(props) {
    super(props);
    this.handleTabsChanged = this.handleTabsChanged.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return formHelper.def.shouldComponentUpdate(this.props, nextProps, nextState);
  }
  componentDidMount() {
    this.props.editVisibleSubmit(true);
  }

  handleTabsChanged = (activeKey) => {
    this.props.editVisibleSubmit(activeKey === tabSubmit);
  };

  render() {
    const m = this.props.model;
    if (!m) return null;

    const { loading } = this.props;

    return (
      <Spin spinning={loading} size='large'>
        <Tabs defaultActiveKey={tabSubmit} type='card' onChange={this.handleTabsChanged}>
          <TabPane tab={<FormattedMessage id='common.general' />} key='general'>
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
                SCAC: m.SCAC,
                Name: m.Name,
                LocalName: m.LocalName,
                ShippingAgentId: m.ShippingAgentId,
                Website: m.Website,
                Note: m.Note,
                Active: m.Active,
                Locales: m.Locales,
              }}
            >
              <Form.Item name='Id' noStyle>
                <Input type='hidden' />
              </Form.Item>

              <Form.Item name='Code' label={<FormattedMessage id='admin.shippingLines.fields.code' />}>
                <Input disabled />
              </Form.Item>

              <Form.Item
                name='SCAC'
                label={<FormattedMessage id='common.fields.SCAC' />}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.fields.SCAC' /> }} />,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <LocalizedEditor
                id='localized_ShippingLine'
                locales={m.Locales}
                standardRender={
                  <div>
                    <Form.Item
                      name='Name'
                      label={<FormattedMessage id='admin.shippingLines.fields.name' />}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id='common.validators.inputFields.required'
                              values={{ field: <FormattedMessage id='admin.shippingLines.fields.name' /> }}
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
              <Form.Item name='ShippingAgentId' label={<FormattedMessage id='common.shippingAgent' />}>
                <Select
                  placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.shippingAgent' /> }} />}
                  showSearch
                  allowClear
                  filterOption={selectHelper.def.filterOption}
                >
                  {m.SelectShippingAgents.map((x) => (
                    <Option key={x.Id} value={x.Id}>
                      {`[${x.Code}] ${x.Name}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name='Website' label={<FormattedMessage id='common.fields.website' />}>
                <Input />
              </Form.Item>
              <Form.Item name='Note' label={<FormattedMessage id='common.fields.note' />}>
                <TextArea />
              </Form.Item>
              <Form.Item name='Active' label={<FormattedMessage id='common.fields.active' />} valuePropName='checked'>
                <Checkbox />
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab={<FormattedMessage id='common.billing' />} key='billing'>
            <FormattedMessage id='common.notify.saveBeforeEdit' />
          </TabPane>
          <TabPane tab={<FormattedMessage id='common.address' />} key='address'>
            <FormattedMessage id='common.notify.saveBeforeEdit' />
          </TabPane>
        </Tabs>
      </Spin>
    );
  }
}

Edit.propTypes = {
  frmRef: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    model: state.ShippingLine.edit.modelGet,
    loading: state.ShippingLine.edit.loading,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    editVisibleSubmit: (visible) => dispatch(actions.editVisibleSubmit(visible)),
    editResetVisibleSubmit: () => dispatch(actions.editResetVisibleSubmit()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
