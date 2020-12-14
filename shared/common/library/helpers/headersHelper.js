import { IChibaHeaderNames } from '@shared/lib/helpers/utility';
import { default as langConfig } from '@shared/config-admin/language.config';

const headersHelper = {
  def: {
    [IChibaHeaderNames.LanguageId]: localStorage.getItem('languageId') ?? langConfig.defaultLanguageId,
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
};

export default headersHelper;
