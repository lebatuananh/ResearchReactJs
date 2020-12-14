import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import appActions from '@shared/redux-admin/app/actions';
import TopbarNotification from './TopbarNotification';
import TopbarUser from './TopbarUser';
import TopbarWrapper from './Topbar.styles';
import LanguageSwitcher from '@shared/containers-admin/LanguageSwitcher/LanguageSwitcher';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function Topbar({ config }) {
  const [selectedItem, setSelectedItem] = React.useState('');
  const customizedTheme = useSelector((state) => state.ThemeSwitcher.topbarTheme);
  const { collapsed, openDrawer } = useSelector((state) => state.App);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [dispatch]);
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: customizedTheme.backgroundColor,
    // Custom-Theme
    backgroundImage: customizedTheme.backgroundImage,
    position: 'fixed',
    width: '100%',
    height: 50,
  };
  return (
    <TopbarWrapper>
      <Header style={styling} className={isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'}>
        <div className='isoLeft'>
          <button
            className={isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'}
            style={{ color: customizedTheme.textColor }}
            onClick={handleToggle}
          />
        </div>

        <ul className='isoRight'>
          <li onClick={() => setSelectedItem('notification')} className={selectedItem ? 'isoNotify active' : 'isoNotify'}>
            <TopbarNotification />
          </li>

          <li className='lang-selector-li'>
            <LanguageSwitcher />
          </li>

          <li onClick={() => setSelectedItem('user')} className='isoUser'>
            <TopbarUser config={config} />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}

Topbar.propTypes = {
  config: PropTypes.object.isRequired,
};
