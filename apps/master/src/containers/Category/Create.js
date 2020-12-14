import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, InputNumber, Button, Checkbox, Radio, Select, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import formHelper from '@shared/lib/helpers/formHelper';

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 14, span: 6 },
};

export class Create extends React.Component {
  frmRef = this.props.frmRef;
  name = React.createRef();

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.model) return;

    this.name.current.focus();
  }

  componentDidUpdate() {
    if (!this.props.model) return;

    this.name.current.focus();
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
            active: m.Active,
          }}
        >
          <Form.Item
            name='name'
            label='Tên danh mục'
            rules={[{ required: true, message: 'Tên danh mục không được để trống' }]}
          >
            <Input ref={this.name} />
          </Form.Item>
          <Form.Item
            name='typeId'
            label='Loại danh mục'
            rules={[
              {
                required: true,
                message: 'Loại danh mục không được để trống',
              },
            ]}
          >
            <Select placeholder='Chọn Loại danh mục' allowClear showSearch>
              {m.SelectTypes.map((x) => (
                <Option key={x.Id} value={x.Id}>
                  {x.Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='active' label='Kích hoạt' valuePropName='checked'>
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
    model: state.Category.create.modelGet,
    loading: state.Category.create.loading,
  };
}

export default connect(mapStateToProps)(Create);
