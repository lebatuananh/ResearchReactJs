import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OtherActionsMenu = ({ fnActivates }) => {
  function click(e, fnActivates) {
    switch (e.key) {
      case 'activates': {
        fnActivates(true);
        break;
      }
      case 'deactivates': {
        fnActivates(false);
        break;
      }
      default:
        break;
    }
  }

  return (
    <Menu onClick={(e) => click(e, fnActivates)}>
      <Menu.Item key='activates' icon={<FontAwesomeIcon icon={['fas', 'check']} className='text-success' />}>
        <FormattedMessage id='common.activates' />
      </Menu.Item>
      <Menu.Item key='deactivates' icon={<FontAwesomeIcon icon={['fas', 'minus']} className='text-warning' />}>
        <FormattedMessage id='common.deactivates' />
      </Menu.Item>
    </Menu>
  );
};

const CommonActions = ({ fnCreate, fnEdit, fnDeletes, fnActivates }) => {
  return (
    <Space size='small'>
      <Button type='primary' icon={<FontAwesomeIcon icon={['fas', 'plus']} />} size='small' onClick={fnCreate}>
        <FormattedMessage id='common.addNew' />
      </Button>
      <Button type='primary' ghost icon={<FontAwesomeIcon icon={['fas', 'edit']} />} size='small' onClick={fnEdit}>
        <FormattedMessage id='common.edit' />
      </Button>
      <Button type='primary' danger icon={<FontAwesomeIcon icon={['fas', 'times']} />} size='small' onClick={fnDeletes}>
        <FormattedMessage id='common.deletes' />
      </Button>
      <Dropdown trigger={['click']} overlay={OtherActionsMenu({ fnActivates })}>
        <Button type='primary' ghost icon={<i className='fas fa-cogs'></i>} size='small'>
          <FormattedMessage id='common.otherActions' /> <DownOutlined />
        </Button>
      </Dropdown>
    </Space>
  );
};

export default CommonActions;
