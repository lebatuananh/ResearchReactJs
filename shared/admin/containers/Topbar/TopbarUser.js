import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Popover from '@shared/components-admin/uielements/popover';
import IntlMessages from '@shared/components-admin/utility/intlMessages';
import userpic from '@shared/assets-admin/images/user1.png';
import authAction from '@shared/redux-admin/auth/actions';
import TopbarDropdownWrapper from './TopbarDropdown.styles';

const { logout } = authAction;

export default function TopbarUser({ config }) {
  const [visible, setVisibility] = useState(false);
  const dispatch = useDispatch();
  function handleVisibleChange() {
    setVisibility((visible) => !visible);
  }

  const content = (
    <TopbarDropdownWrapper className='isoUserDropdown'>
      <Link className='isoDropdownLink' to={'/profile'}>
        <IntlMessages id='topbar.profile' />
      </Link>
      <a className='isoDropdownLink' href='# '>
        <IntlMessages id='topbar.settings' />
      </a>
      <div className='isoDropdownLink' onClick={() => dispatch(logout(config.sso))}>
        <IntlMessages id='topbar.logout' />
      </div>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover content={content} trigger='click' visible={visible} onVisibleChange={handleVisibleChange} arrowPointAtCenter={true} placement='bottomLeft'>
      <div className='isoImgWrapper'>
        <img alt='user' src={userpic} />
        <span className='userActivity online' />
      </div>
    </Popover>
  );
}

TopbarUser.propTypes = {
  config: PropTypes.object.isRequired,
};
