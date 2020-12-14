import React from 'react';
import { FormattedMessage } from 'react-intl';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';

const contextMenuHelper = {
  def: {
    dataSource: [
      { id: 'create', localeId: 'common.addNew', text: intl.formatMessage({ id: 'common.addNew' }), icon: 'fas fa-plus text-primary' },
      { id: 'edit', localeId: 'common.edit', text: intl.formatMessage({ id: 'common.edit' }), icon: 'fas fa-edit text-warning' },
      { id: 'deletes', localeId: 'common.deletes', text: intl.formatMessage({ id: 'common.deletes' }), icon: 'fas fa-times text-danger' },
      { id: 'activates', localeId: 'common.activates', text: intl.formatMessage({ id: 'common.activates' }), icon: 'fas fa-check text-success' },
      { id: 'deactivates', localeId: 'common.deactivates', text: intl.formatMessage({ id: 'common.deactivates' }), icon: 'fas fa-minus text-warning' },
      { id: 'refresh', localeId: 'common.refresh', text: intl.formatMessage({ id: 'common.refresh' }), icon: 'fas fa-redo-alt text-info' },
    ],
    onShowing: (e, grd) => {
      const selectedKeys = grd.ref.instance.getSelectedRowKeys();
      const iRow = e.jQEvent.currentTarget.rowIndex;
      const key = grd.ref.instance.getKeyByRowIndex(iRow);
      if (selectedKeys.includes(key)) {
        grd.ref.instance.selectRows([key], true);
      } else {
        grd.ref.instance.clearSelection();
        grd.ref.instance.selectRows([key], false);
      }
    },
    onItemClick: (e, grd, fnCreate, fnEdit, fnDeletes, fnActivates) => {
      switch (e.itemData.id) {
        case 'refresh': {
          grd.refresh();
          break;
        }
        case 'create': {
          fnCreate();
          break;
        }
        case 'edit': {
          fnEdit();
          break;
        }
        case 'deletes': {
          fnDeletes();
          break;
        }
        case 'activates': {
          fnActivates(true);
          break;
        }
        case 'deactivates': {
          fnActivates(false);
          break;
        }
        default:
          break;
      }
    },
    itemRender: (e) => {
      return (
        <React.Fragment>
          <i className={e.icon + ' ctx-menu-icon'}></i>&nbsp;
          {/* <span className='ctx-menu-text'>{e.text}</span>&nbsp; */}
          {/* <span className='ctx-menu-text'>{intl.formatMessage({ id: e.localeId })}</span>&nbsp; */}
          <span className='ctx-menu-text'>{<FormattedMessage id={e.localeId} />}</span>&nbsp;
          {e.items ? <i className='fas fa-chevron-right ctx-menu-icon right'></i> : null}
        </React.Fragment>
      );
    },
  },
};

export default contextMenuHelper;
