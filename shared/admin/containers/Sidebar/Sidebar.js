import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Scrollbars from '@shared/components-admin/utility/customScrollBar';
import Menu from '@shared/components-admin/uielements/menu';
import IntlMessages from '@shared/components-admin/utility/intlMessages';
import appActions from '@shared/redux-admin/app/actions';
import Logo from '@shared/components-admin/utility/logo';
import SidebarWrapper from './Sidebar.styles';
import SidebarMenu from './SidebarMenu';
//import { getSourceMap } from '@shared/lib/helpers/url_sync';
import { MasterMenuMapper } from '@shared/config/menu/admin/Master';
import { OPMenuMapper } from '@shared/config/menu/admin/OP';

//const SubMenu = Menu.SubMenu;
//const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

const { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed } = appActions;

export default function Sidebar({ menu, appName }) {
  const dispatch = useDispatch();
  const { view, openKeys, collapsed, openDrawer, current, height, preKeys } = useSelector((state) => state.App);
  const customizedTheme = useSelector((state) => state.ThemeSwitcher.sidebarTheme);

  function handleClick(e) {
    dispatch(changeCurrent([e.key]));
    if (view === 'MobileView') {
      setTimeout(() => {
        dispatch(toggleCollapsed());
        // dispatch(toggleOpenDrawer());
      }, 100);

      // clearTimeout(timer);
    }
  }
  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find((key) => !(openKeys.indexOf(key) > -1));
    const latestCloseKey = openKeys.find((key) => !(newOpenKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(changeOpenKeys(nextOpenKeys));
  }

  //const sourceMap = getSourceMap(menu);

  const getAncestorKeys = (key) => {
    const map = appName === 'master' ? MasterMenuMapper[key] : OPMenuMapper[key];
    return map || [];
  };

  const isCollapsed = collapsed && !openDrawer;
  const mode = isCollapsed === true ? 'vertical' : 'inline';
  const onMouseEnter = (event) => {
    if (collapsed && openDrawer === false) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const onMouseLeave = () => {
    if (collapsed && openDrawer === true) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const styling = {
    backgroundColor: customizedTheme.backgroundColor,
  };
  const submenuStyle = {
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: customizedTheme.textColor,
  };
  const submenuColor = {
    color: customizedTheme.textColor,
  };
  return (
    <SidebarWrapper>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={isCollapsed}
        width={240}
        className='isomorphicSidebar'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={styling}
      >
        <Logo collapsed={isCollapsed} />
        <Scrollbars style={{ height: height - 50 }}>
          <Menu
            onClick={handleClick}
            theme='dark'
            className='isoDashboardMenu'
            mode={mode}
            openKeys={isCollapsed ? [] : openKeys}
            selectedKeys={current}
            onOpenChange={onOpenChange}
          >
            {menu.map((singleOption) => (
              <SidebarMenu key={singleOption.key} submenuStyle={submenuStyle} submenuColor={submenuColor} singleOption={singleOption} />
            ))}
          </Menu>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
}

Sidebar.propTypes = {
  menu: PropTypes.array.isRequired,
};
