import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox, Spin, Tabs } from 'antd';
import LocalizedEditor, { LocalizedItemWrapper } from '@shared/ui/Localization/LocalizedEditor';
import actions from '../../../redux/list/vatType/actions';

import formHelper from '@shared/lib/helpers/formHelper';

const { TextArea } = Input;
const { TabPane } = Tabs;

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
                Name: m.Name,
                LocalName: m.LocalName,
                Description: m.Description,
                Active: m.Active,
                Locales: m.Locales,
              }}
            >
              <Form.Item name='Id' noStyle>
                <Input type='hidden' />
              </Form.Item>

              <Form.Item name='Code' label={<FormattedMessage id='admin.vatTypes.fields.code' />}>
                <Input disabled />
              </Form.Item>

              <LocalizedEditor
                id='localized_VatType'
                locales={m.Locales}
                standardRender={
                  <div>
                    <Form.Item
                      name='Name'
                      label={<FormattedMessage id='admin.vatTypes.fields.name' />}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id='common.validators.inputFields.required'
                              values={{ field: <FormattedMessage id='admin.vatTypes.fields.name' /> }}
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
              <Form.Item name='Description' label={<FormattedMessage id='common.fields.description' />}>
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item name='Active' label={<FormattedMessage id='common.fields.active' />} valuePropName='checked'>
                <Checkbox />
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab={<FormattedMessage id='common.vatPercentage' />} key='vatPercentage'>
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
    model: state.VatType.edit.modelGet,
    loading: state.VatType.edit.loading,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    editVisibleSubmit: (visible) => dispatch(actions.editVisibleSubmit(visible)),
    editResetVisibleSubmit: () => dispatch(actions.editResetVisibleSubmit()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
