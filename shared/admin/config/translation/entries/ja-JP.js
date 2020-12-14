import antdJa from 'antd/lib/locale-provider/ja_JP';
import appLocaleData from 'react-intl/locale-data/ja';
import jaMessages from '../locales/ja_JP.json';
// import { getKeys, getValues } from '../conversion';
// getValues(enMessages);

const JaLang = {
  messages: {
    ...jaMessages,
  },
  antd: antdJa,
  locale: 'ja-JP',
  data: appLocaleData,
};

export default JaLang;
