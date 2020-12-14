import { combineReducers } from 'redux';
import App from './app/reducer';
import Auth from '@shared/redux-admin/auth/reducer';
import ThemeSwitcher from '@shared/redux-admin/themeSwitcher/reducer';
import LanguageSwitcher from '@shared/redux-admin/languageSwitcher/reducer';
import SPOrder from './sPOrder/reducer';

export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  SPOrder,
});
