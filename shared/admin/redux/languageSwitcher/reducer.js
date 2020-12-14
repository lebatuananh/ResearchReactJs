import actions from './actions';
import config, { getCurrentLanguage } from '@shared/config-admin/language.config';

const initState = {
  isActivated: false,
  language: getCurrentLanguage(config.defaultLanguageId),
};

export default function(state = initState, action) {
  switch (action.type) {
    case actions.ACTIVATE_LANG_MODAL:
      return {
        ...state,
        isActivated: !state.isActivated,
      };
    case actions.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
}
