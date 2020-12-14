import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';

export const status = {
  Activated: 1,
  Deactivated: 2,
};

export default {
  items: [
    {
      localeId: 'common.activated',
      value: status.Activated,
      text: intl.formatMessage({ id: 'common.activated' }),
    },
    {
      localeId: 'common.deactivated',
      value: status.Deactivated,
      text: intl.formatMessage({ id: 'common.deactivated' }),
    },
  ],
};
