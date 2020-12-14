import React from 'react';
import { Provider } from 'react-redux';
import GlobalStyles from '@shared/assets-admin/styles/globalStyle';
import { store } from './redux/store';
import Boot from './redux/boot';
import Routes from './router';
import AppProvider from './AppProvider';

import 'antd/dist/antd.compact.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';

import '@shared/assets/admin/css/custom.css';

const App = () => (
  <Provider store={store}>
    <AppProvider>
      <>
        <GlobalStyles />
        <Routes />
      </>
    </AppProvider>
  </Provider>
);
Boot()
  .then(() => App())
  .catch((error) => console.error(error));
export default App;
