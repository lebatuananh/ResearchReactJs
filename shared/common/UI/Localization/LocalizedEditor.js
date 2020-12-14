import React from 'react';
import PropTypes from 'prop-types';
import { Button, Space } from 'antd';
import cdnHelper from '@shared/lib/helpers/cdnHelper';

export const LocalizedItemWrapper = ({ index, children }) => {
  return (
    <div data-index={index} className='localized-item' style={{ display: 'none' }}>
      {children}
    </div>
  );
};

LocalizedItemWrapper.propTypes = {
  index: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
};

const LocalizedEditor = ({ id, locales, standardRender, localizedRender }) => {
  const switchLanguage = (e) => {
    const idx = e.currentTarget.dataset.index;
    const wrapper = e.currentTarget.closest('.localized-wrapper');
    const switches = wrapper.querySelectorAll('.localized-switch');
    const showItem = wrapper.querySelector(`.localized-item[data-index="${idx}"]`);
    const hideItems = wrapper.querySelectorAll(`.localized-item:not([data-index="${idx}"])`);

    switches.forEach((el) => el.classList.remove('ant-btn-primary'));
    e.currentTarget.classList.add('ant-btn-primary');

    hideItems.forEach((el) => (el.style.display = 'none'));
    showItem.style.display = '';
  };

  return (
    <div id={id} className='localized-wrapper'>
      <div className='localized-switches'>
        <Space size='small'>
          <Button data-index={-1} className='localized-switch ant-btn-primary' size='small' onClick={(e) => switchLanguage(e)}>
            Standard
          </Button>
          {locales.map((locale, index) => (
            <Button
              data-index={index}
              key={index}
              icon={
                <img
                  className='localized-flag'
                  src={`${cdnHelper.flagUrl}${locale._FlagCode.toLowerCase()}.svg`}
                  alt={locale._LanguageCode.toUpperCase()}
                  width={16}
                />
              }
              className='localized-switch'
              size='small'
              onClick={(e) => switchLanguage(e)}
            >
              {locale._LanguageCode.toUpperCase()}
            </Button>
          ))}
        </Space>
      </div>
      <div className='localized-items'>
        <div data-index={-1} className='localized-item'>
          {standardRender}
        </div>
        {localizedRender}
      </div>
    </div>
  );
};

LocalizedEditor.propTypes = {
  id: PropTypes.string.isRequired,
  locales: PropTypes.array.isRequired,
  standardRender: PropTypes.element.isRequired,
  localizedRender: PropTypes.element.isRequired,
};

export default LocalizedEditor;
