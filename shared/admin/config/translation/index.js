import Vilang from './entries/vi-VN';
import Enlang from './entries/en-US';
import Jalang from './entries/ja-JP';
import { addLocaleData } from 'react-intl';

const AppLocale = {
  vi: Vilang,
  en: Enlang,
  ja: Jalang,
};

addLocaleData(AppLocale.vi.data);
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.ja.data);

export default AppLocale;
