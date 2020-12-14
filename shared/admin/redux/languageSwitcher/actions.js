import { getCurrentLanguage } from '@shared/config-admin/language.config';
import apiHelper from '@shared/lib/helpers/apiHelper';
import { IChibaHeaderNames } from '@shared/lib/helpers/utility';

const actions = {
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  ACTIVATE_LANG_MODAL: 'ACTIVATE_LANG_MODAL',
  switchActivation: () => ({
    type: actions.ACTIVATE_LANG_MODAL,
  }),
  changeLanguage: (language) => {
    // Custom-Localize-SetLanguageId
    localStorage.setItem('languageId', language);
    apiHelper.defaults.headers[IChibaHeaderNames.LanguageId] = language;

    return {
      type: actions.CHANGE_LANGUAGE,
      language: getCurrentLanguage(language),
    };
  },
};

export default actions;
