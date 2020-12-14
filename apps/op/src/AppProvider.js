import React from 'react';
import { ConfigProvider, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import themes from '@shared/config-admin/theme/theme.config';
import AppLocale from '@shared/config-admin/translation';
import IntlGlobalProvider from '@shared/lib/core/Localization/IntlGlobalProvider';

// Custom-Localize-DevExtreme
import viMessages from 'devextreme/localization/messages/vi.json';
import enMessages from 'devextreme/localization/messages/en.json';
import jaMessages from 'devextreme/localization/messages/ja.json';
import { locale as devLocale, loadMessages } from 'devextreme/localization';
loadMessages(viMessages);
loadMessages(enMessages);
loadMessages(jaMessages);

// Custom-Init
Spin.setDefaultIndicator(<LoadingOutlined spin />);
notification.config({
  placement: 'topRight',
});

export default function AppProvider({ children }) {
  const { locale } = useSelector((state) => state.LanguageSwitcher.language);
  const { themeName } = useSelector((state) => state.ThemeSwitcher.changeThemes);
  const currentAppLocale = AppLocale[locale];

  devLocale(locale);

  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
        <IntlGlobalProvider>
          <ThemeProvider theme={themes[themeName]}>{children}</ThemeProvider>
        </IntlGlobalProvider>
      </IntlProvider>
    </ConfigProvider>
  );
}
