import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Spin } from 'antd';
import useWindowSize from '@shared/lib/hooks/useWindowSize';
import appActions from '@shared/redux-admin/app/actions';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';

import { DashboardContainer, DashboardGlobalStyles } from './Dashboard.styles';

const { Content, Footer } = Layout;
const { toggleAll } = appActions;
const styles = {
  layout: { flexDirection: 'row', overflowX: 'hidden' },
  content: {
    padding: '50px 0 0',
    flexShrink: '0',
    background: '#f1f3f6',
    position: 'relative',
  },
  footer: {
    background: '#ffffff',
    textAlign: 'center',
    borderTop: '1px solid #ededed',
  },
};

export default function Dashboard({ dashboardRoutes, sidebarMenu, config, appName }) {
  const dispatch = useDispatch();
  const appHeight = useSelector((state) => state.App.height);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);

  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <Topbar config={config} />
        <Layout style={styles.layout}>
          <Sidebar menu={sidebarMenu} appName={appName} />
          <Layout
            className='isoContentMainLayout'
            style={{
              height: appHeight,
            }}
          >
            <Content className='isomorphicContent' style={styles.content}>
              {dashboardRoutes}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </DashboardContainer>
  );
}

Dashboard.propTypes = {
  dashboardRoutes: PropTypes.element.isRequired,
  sidebarMenu: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
};
