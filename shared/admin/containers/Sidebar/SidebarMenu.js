import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import Menu from '@shared/components-admin/uielements/menu';
import IntlMessages from '@shared/components-admin/utility/intlMessages';
const SubMenu = Menu.SubMenu;

const stripTrailingSlash = (str) => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};

export const SubMenuLevel = React.memo(function({ singleOption, submenuStyle, submenuColor, ...rest }) {
  let match = useRouteMatch();
  const { key, label, leftIcon, children } = singleOption;
  const url = stripTrailingSlash(match.url);
  return (
    <SubMenu
      key={key}
      //title={<IntlMessages id={label} />}
      title={
        <span className='isoMenuHolder'>
          {/* <i className={leftIcon} /> */}
          <span className='nav-text'>
            <IntlMessages id={label} />
          </span>
        </span>
      }
      style={submenuStyle}
      {...rest}
    >
      {children.map((child) => {
        const linkToSub = child.withoutDashboard ? `/${child.key}` : `${url}/${child.key}`;
        return (
          <Menu.Item
            key={child.key}
            //style={submenuStyle}
          >
            <Link
              to={linkToSub}
              //style={submenuColor}
            >
              <IntlMessages id={child.label} />
            </Link>
          </Menu.Item>
        );
      })}
    </SubMenu>
  );
});

export default React.memo(function SidebarMenu({ singleOption, submenuStyle, submenuColor, ...rest }) {
  let match = useRouteMatch();

  const { key, label, leftIcon, children } = singleOption;
  const url = stripTrailingSlash(match.url);

  if (children) {
    return (
      <SubMenu
        key={key}
        title={
          <span className='isoMenuHolder' style={submenuColor}>
            <i className={leftIcon} />
            <span className='nav-text'>
              <IntlMessages id={label} />
            </span>
          </span>
        }
        {...rest}
      >
        {children.map((child) => {
          const subChildren = child.children;
          if (subChildren) {
            return <SubMenuLevel key={child.key} singleOption={child} submenuStyle={submenuStyle} submenuColor={submenuColor} {...rest} />;
          } else {
            const linkTo = child.withoutDashboard ? `/${child.key}` : `${url}/${child.key}`;
            return (
              <Menu.Item style={submenuStyle} key={child.key}>
                <Link style={submenuColor} to={linkTo}>
                  <IntlMessages id={child.label} />
                </Link>
              </Menu.Item>
            );
          }
        })}
        {/* {children.map((child) => {
          const linkTo = child.withoutDashboard ? `/${child.key}` : `${url}/${child.key}`;
          return (
            <Menu.Item style={submenuStyle} key={child.key}>
              <Link style={submenuColor} to={linkTo}>
                <IntlMessages id={child.label} />
              </Link>
            </Menu.Item>
          );
        })} */}
      </SubMenu>
    );
  }

  return (
    <Menu.Item key={key} {...rest}>
      <Link to={`${url}/${key}`}>
        <span className='isoMenuHolder' style={submenuColor}>
          <i className={leftIcon} />
          <span className='nav-text'>
            <IntlMessages id={label} />
          </span>
        </span>
      </Link>
    </Menu.Item>
  );
});
