import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '@shared/redux-admin/languageSwitcher/actions';
import { Select } from 'antd';
import config from '@shared/config-admin/language.config';
import authHelper from '@shared/lib/helpers/authHelper';

const { changeLanguage } = actions;
const { Option } = Select;

export default function LanguageSwitcher() {
  const { language } = useSelector((state) => state.LanguageSwitcher);
  const { topbarTheme } = useSelector((state) => state.ThemeSwitcher);
  const dispatch = useDispatch();

  return (
    <div className='lang-selector-container'>
      <Select
        id='__LangSelector'
        defaultValue={language.languageId}
        bordered={false}
        dropdownMatchSelectWidth={false}
        showArrow={false}
        onChange={(value) => {
          dispatch(changeLanguage(value));
          // Custom-Localize-DevExtreme: Fix không change resource DevExtreme
          location.reload();
        }}
        style={{ width: '79px', color: [topbarTheme.textColor] }}
        dropdownStyle={{ width: '100px' }}
      >
        {config.options.map((x) => {
          return (
            <Option key={x.languageId} value={x.languageId}>
              <img src={x.icon} alt={x.locale.toUpperCase()} width={24} />
              &nbsp;
              <span style={{ verticalAlign: 'middle' }}>{x.locale.toUpperCase()}</span>
            </Option>
          );
        })}
      </Select>
    </div>
  );
}
