// import viFlag from '@shared/assets/global/images/flags/vn.svg';
// import enFlag from '@shared/assets/global/images/flags/us.svg';
// import jaFlag from '@shared/assets/global/images/flags/jp.svg';
import cdnHelper from '@shared/lib/helpers/cdnHelper';

const config = {
  defaultLanguageId: 'e17f91cb-b023-483f-aa45-b1caca395ff3',
  langDir: 'ltr',
  options: [
    {
      languageId: 'e17f91cb-b023-483f-aa45-b1caca395ff3',
      locale: 'vi',
      text: 'Vietnamese',
      icon: `${cdnHelper.flagUrl}vn.svg`,
    },
    {
      languageId: 'bbbf480e-4dbe-415d-b6ef-4ddf5236fe8f',
      locale: 'en',
      text: 'English',
      icon: `${cdnHelper.flagUrl}us.svg`,
    },
    {
      languageId: '42e0fa4d-dd63-404f-ba50-314d685aa5d5',
      locale: 'ja',
      text: 'Japanese',
      icon: `${cdnHelper.flagUrl}jp.svg`,
    },
  ],
};

export function getCurrentLanguage(lang) {
  // Custom-Localize-SetLanguage
  const curLanguageId = localStorage.getItem('languageId');
  if (curLanguageId) lang = curLanguageId;

  // TODO-Localize-SetLanguageFromAPI

  let selecetedLanguage = config.options[0];
  config.options.forEach((language) => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}

export default config;
