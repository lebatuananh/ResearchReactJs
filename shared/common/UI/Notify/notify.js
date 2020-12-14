import React from 'react';
import { notification } from 'antd';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';

export const NotifyTitleSucess = () => (
  <div>
    <span className='text-success bold'>{intl.formatMessage({ id: 'common.notify.success' })}</span>
  </div>
);
export const NotifyTitleInfo = () => (
  <div>
    <span className='text-info bold'>{intl.formatMessage({ id: 'common.notify.info' })}</span>
  </div>
);
export const NotifyTitleWarning = () => (
  <div>
    <span className='text-warning bold'>{intl.formatMessage({ id: 'common.notify.warning' })}</span>
  </div>
);
export const NotifyTitleError = () => (
  <div>
    <span className='text-danger bold'>{intl.formatMessage({ id: 'common.notify.error' })}</span>
  </div>
);

export const NotifyContent = ({ content }) => <div dangerouslySetInnerHTML={{ __html: content }}></div>;

const notify = {
  success(content) {
    notification.success({ message: <NotifyTitleSucess />, description: <NotifyContent content={content} />, duration: 3 });
  },
  info(content) {
    notification.info({ message: <NotifyTitleInfo />, description: <NotifyContent content={content} />, duration: 3 });
  },
  warning(content) {
    notification.warning({ message: <NotifyTitleWarning />, description: <NotifyContent content={content} />, duration: 3 });
  },
  error(content) {
    notification.error({ message: <NotifyTitleError />, description: <NotifyContent content={content} />, duration: 5 });
  },
};

export default notify;
