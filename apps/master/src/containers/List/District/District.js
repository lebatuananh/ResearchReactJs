import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';
import actions from '../../../redux/list/district/actions';
import debounce from 'lodash/debounce';
import LayoutContentWrapper from '@shared/components-admin/utility/layoutWrapper';
import { Row, Col, Form, Input, Button, Select, Spin, Modal, Space, Breadcrumb, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataGrid, { Column, Paging, Pager, Scrolling, Selection, Sorting } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import ContextMenu from 'devextreme-react/context-menu';
import CellActive from '@shared/ui/Grid/Templates/CellActive';
import notify from '@shared/ui/Notify/notify';
import uxHelper from '@shared/lib/helpers/ui/uxHelper';
import headersHelper from '@shared/lib/helpers/headersHelper';

import Create from './Create';
import Edit from './Edit';

import activeStatus from '@shared/data/common/ActiveStatus';
import selectHelper from '@shared/lib/helpers/ui/selectHelper';
import workContext from '@shared/lib/helpers/workContext';
import { default as ctxHelper } from '@shared/lib/helpers/ui/contextMenuHelper';
import gridHelper from '@shared/lib/helpers/ui/gridHelper';
import CommonActions from '@shared/ui/Admin/Common/CommonActions';
import config from '@shared/config/appsettings';

import basicStyle from '@shared/assets-admin/styles/constants';
const { rowStyle, colStyle, gutter } = basicStyle;
const { Option } = Select;
const qs = require('qs');
const districtApi = config.api.private.master.district;

class District extends React.Component {
  constructor(props) {
    super(props);

    //#region CRUD
    this.frmCreate = {
      ref: React.createRef(),
      open: () => {
        this.props.createGet();
      },
      close: () => {
        this.props.createClose();
      },
      submit: () => {
        this.frmCreate.ref.current
          .validateFields()
          .then((values) => {
            this.props.createPost(values);
          })
          .catch((error) => {
            console.log('Validate Failed:', error);
          });
      },
    };
    this.frmEdit = {
      ref: React.createRef(),
      open: () => {
        const ids = this.grd.ref.instance.getSelectedRowKeys();
        if (ids.length) {
          this.props.editGet(ids[0]);
        } else {
          notify.info(intl.formatMessage({ id: 'common.notify.noItemsSelected' }));
        }
      },
      close: () => {
        this.props.editClose();
      },
      submit: () => {
        this.frmEdit.ref.current
          .validateFields()
          .then((values) => {
            this.props.editPost(values);
          })
          .catch((error) => {
            console.log('Validate Failed:', error);
          });
      },
    };
    this.frmDeletes = {
      open: () => {
        const ids = this.grd.ref.instance.getSelectedRowKeys();
        if (ids.length) {
          this.props.deletesGet();
        } else {
          notify.info(intl.formatMessage({ id: 'common.notify.noItemsSelected' }));
        }
      },
      close: () => {
        this.props.deletesClose();
      },
      submit: () => {
        const ids = this.grd.ref.instance.getSelectedRowKeys();
        if (ids.length) {
          this.props.deletesPost(ids);
        } else {
          notify.info(intl.formatMessage({ id: 'common.notify.noItemsSelected' }));
        }
      },
    };
    this.othActions = {
      activates: (active) => {
        const ids = this.grd.ref.instance.getSelectedRowKeys();
        if (ids.length) {
          this.props.activatesPost(ids, active);
        } else {
          notify.info(intl.formatMessage({ id: 'common.notify.noItemsSelected' }));
        }
      },
    };
    this.frmSearch = {
      ref: React.createRef(),
      submit: debounce(() => {
        const grd = this.grd;
        this.frmSearch.ref.current
          .validateFields()
          .then(() => {
            grd.reset();
          })
          .catch((error) => {
            console.log('Validate Failed:', error);
          });
      }, uxHelper.def.debounce.timeout),
    };
    //#endregion

    //#region Grid
    this.grd = {
      ref: null,
      dataSource: null,
      refresh: () => {
        this.grd.ref.instance.clearSelection();
        this.grd.ref.instance.refresh();
      },
      reset: () => {
        this.grd.ref.instance.clearSelection();
        this.grd.ref.instance.pageIndex(0);
        this.grd.ref.instance.refresh();
      },
      errors: (response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      },
      dblClick: (e) => gridHelper.def.dblClick(e, this.frmEdit.open),
    };
    //#endregion

    //#region ContextMenu
    this.ctxMenu = {
      ref: React.createRef(),
      dataSource: ctxHelper.def.dataSource,
      onShowing: (e) => ctxHelper.def.onShowing(e, this.grd),
      onItemClick: (e) => ctxHelper.def.onItemClick(e, this.grd, this.frmCreate.open, this.frmEdit.open, this.frmDeletes.open, this.othActions.activates),
      itemRender: (e) => ctxHelper.def.itemRender(e),
    };
    //#endregion

    //#region Bind to Component
    this.frmCreate.open = this.frmCreate.open.bind(this);
    this.frmCreate.close = this.frmCreate.close.bind(this);
    this.frmCreate.submit = this.frmCreate.submit.bind(this);
    this.frmEdit.open = this.frmEdit.open.bind(this);
    this.frmEdit.close = this.frmEdit.close.bind(this);
    this.frmEdit.submit = this.frmEdit.submit.bind(this);
    this.frmDeletes.open = this.frmDeletes.open.bind(this);
    this.frmDeletes.close = this.frmDeletes.close.bind(this);
    this.frmDeletes.submit = this.frmDeletes.submit.bind(this);
    this.frmSearch.submit = this.frmSearch.submit.bind(this);
    this.grd.refresh = this.grd.refresh.bind(this);
    this.grd.reset = this.grd.reset.bind(this);
    this.grd.errors = this.grd.errors.bind(this);
    this.ctxMenu.onShowing = this.ctxMenu.onShowing.bind(this);
    this.ctxMenu.onItemClick = this.ctxMenu.onItemClick.bind(this);

    this.handleCountryChange = this.handleCountryChange.bind(this);
    //#endregion
  }

  //#region Lifecycle
  componentDidMount() {
    const grd = this.grd;

    const { initGet } = this.props;
    initGet();
    //#region Grid
    this.grd.dataSource = new CustomStore({
      key: 'Id',
      load: (loadOptions) => {
        const frmSearch = this.frmSearch.ref.current;
        const objParams = {
          ...loadOptions,
          ...{
            Keywords: frmSearch.getFieldValue('Keywords'),
            Status: frmSearch.getFieldValue('Status'),
            CountryId: frmSearch.getFieldValue('CountryId'),
            StateProvinceId: frmSearch.getFieldValue('StateProvinceId'),
            LanguageId: workContext.languageId(),
          },
        };
        let params = qs.stringify(objParams);
        return fetch(`${districtApi.get}?${params}`, { headers: headersHelper.def })
          .then(grd.errors)
          .then((response) => response.json())
          .then((data) => {
            var d = data.data;
            return {
              data: d.data,
              totalCount: d.totalCount,
            };
          })
          .catch(() => {
            throw intl.formatMessage({ id: 'common.notify.error.loadData' });
          });
      },
    });
    this.grd.ref.instance.option({ dataSource: this.grd.dataSource });
    //#endregion
  }

  componentDidUpdate() {
    const { init, create, edit, deletes, activates, grd, search } = this.props;

    if (init.error) {
      notify.error(init.error);
    }
    if (search.stateProvince.error) {
      notify.error(search.stateProvince.error);
    }
    if (create.data.stateProvince.error) {
      notify.error(create.data.stateProvince.error);
    }
    if (edit.data.stateProvince.error) {
      notify.error(edit.data.stateProvince.error);
    }
    if (create.result && create.result.success) {
      notify.success(create.result.message);
    }
    if (create.error) {
      notify.error(create.error);
    }

    if (edit.result && edit.result.success) {
      notify.success(edit.result.message);
    }
    if (edit.error) {
      notify.error(edit.error);
    }

    if (deletes.result && deletes.result.success) {
      notify.success(deletes.result.message);
    }
    if (deletes.error) {
      notify.error(deletes.error);
    }

    if (activates.result && activates.result.success) {
      notify.success(activates.result.message);
    }
    if (activates.error) {
      notify.error(activates.error);
    }

    if (grd.loading && this.grd.ref) {
      this.grd.refresh();
    }
  }
  //#endregion

  handleCountryChange = (value) => {
    this.props.searchCountryChange(value);
    this.frmSearch.ref.current.setFieldsValue({
      StateProvinceId: undefined,
    });
  };

  render() {
    const { height, loading, create, edit, deletes, search } = this.props;

    return (
      <Spin spinning={loading} size='large'>
        <LayoutContentWrapper>
          <Row style={rowStyle} gutter={gutter}>
            <Col span={24} style={colStyle}>
              <Form id='frmSearch' ref={this.frmSearch.ref}>
                <Row gutter={gutter}>
                  <Col span={10}>
                    <Tooltip title={<FormattedMessage id='common.search.keywords' />}>
                      <Form.Item name='Keywords'>
                        <Input allowClear placeholder={intl.formatMessage({ id: 'common.search.keywords' })} onPressEnter={this.frmSearch.submit} />
                      </Form.Item>
                    </Tooltip>
                  </Col>
                  <Col span={5}>
                    <Tooltip title={<FormattedMessage id='common.country' />}>
                      <Form.Item name='CountryId'>
                        <Select
                          placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.country' /> }} />}
                          allowClear
                          showSearch
                          onChange={this.handleCountryChange}
                          filterOption={selectHelper.def.filterOption}
                        >
                          {search.countries.map((item) => (
                            <Option key={item.Id} value={item.Id}>
                              {item.Name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Tooltip>
                  </Col>
                  <Col span={5}>
                    <Tooltip title={<FormattedMessage id='common.stateProvince' />}>
                      <Form.Item name='StateProvinceId'>
                        <Select
                          placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.stateProvince' /> }} />}
                          allowClear
                          loading={search.stateProvince.loading}
                          showSearch
                          filterOption={selectHelper.def.filterOption}
                        >
                          {search.stateProvince.data.map((item) => (
                            <Option key={item.Id} value={item.Id}>
                              {item.Name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Tooltip>
                  </Col>
                  <Col span={4}>
                    <Tooltip title={<FormattedMessage id='common.status.active' />}>
                      <Form.Item name='Status'>
                        <Select placeholder={<FormattedMessage id='common.status.active' />} allowClear showSearch filterOption={selectHelper.def.filterOption}>
                          {activeStatus.items.map((x) => (
                            <Option key={x.value} value={x.value}>
                              <FormattedMessage id={x.localeId} />
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Tooltip>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={gutter}>
            <Col span={9} style={colStyle}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <FontAwesomeIcon icon={['fas', 'home']} />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <FormattedMessage id='common.catalog' />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <FormattedMessage id='common.district' />
                </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={6} className='text-center' style={colStyle}>
              <Space size='small'>
                <Button type='primary' ghost icon={<FontAwesomeIcon icon={['fas', 'search']} />} size='small' onClick={this.frmSearch.submit}>
                  <FormattedMessage id='common.search' />
                </Button>
                <Button type='primary' ghost icon={<FontAwesomeIcon icon={['fas', 'redo-alt']} />} size='small' onClick={this.grd.refresh}>
                  <FormattedMessage id='common.refresh' />
                </Button>
              </Space>
            </Col>
            <Col span={9} className='text-right' style={colStyle}>
              <CommonActions
                fnCreate={this.frmCreate.open}
                fnEdit={this.frmEdit.open}
                fnDeletes={this.frmDeletes.open}
                fnActivates={this.othActions.activates}
              />
            </Col>
          </Row>

          <DataGrid
            id='grdDistrict'
            ref={(ref) => (this.grd.ref = ref)}
            remoteOperations={true}
            cacheEnabled={false}
            hoverStateEnabled={true}
            showBorders={true}
            width='100%'
            height={height - 120}
            onCellDblClick={this.grd.dblClick}
          >
            <Column dataField='Code' dataType='string' caption={intl.formatMessage({ id: 'admin.districts.fields.code' })} fixed={true} width={150} />
            <Column dataField='Name' dataType='string' caption={intl.formatMessage({ id: 'admin.districts.fields.name' })} fixed={true} width={220} />
            <Column dataField='ShortName' dataType='string' caption={intl.formatMessage({ id: 'common.fields.shortName' })} width={150} />
            <Column dataField='StateProvince.Name' dataType='string' caption={intl.formatMessage({ id: 'common.stateProvince' })} width={150} />
            <Column dataField='Country.Name' dataType='string' caption={intl.formatMessage({ id: 'common.country' })} width={150} />
            <Column dataField='Note' dataType='string' caption={intl.formatMessage({ id: 'common.fields.note' })} minWidth={300} />
            <Column
              dataField='Active'
              dataType='bool'
              caption={intl.formatMessage({ id: 'common.fields.active' })}
              cellRender={CellActive}
              width={80}
              alignment='center'
            />

            <Paging defaultPageSize={gridHelper.def.pageSize} />
            <Pager showPageSizeSelector={true} allowedPageSizes={gridHelper.def.pageSizes} showInfo={true} showNavigationButtons={true} visible={true} />
            <Scrolling mode='standard' />
            <Selection mode='multiple' selectAllMode='page' showCheckBoxesMode='none' />
            <Sorting mode='none' />
          </DataGrid>
          <ContextMenu
            ref={this.ctxMenu.ref}
            dataSource={this.ctxMenu.dataSource}
            target='#grdDistrict .dx-datagrid-table tbody .dx-row.dx-data-row'
            width={180}
            itemRender={this.ctxMenu.itemRender}
            onShowing={this.ctxMenu.onShowing}
            onItemClick={this.ctxMenu.onItemClick}
          />

          <Modal
            title={<FormattedMessage id='admin.districts.create' />}
            visible={create.visible}
            destroyOnClose={true}
            maskClosable={false}
            keyboard={false}
            centered
            width={720}
            onCancel={!create.loading && this.frmCreate.close}
            footer={[
              <Button key='submit' type='primary' icon={<FontAwesomeIcon icon={['fas', 'check']} />} loading={create.loading} onClick={this.frmCreate.submit}>
                <FormattedMessage id='common.save' />
              </Button>,
              <Button key='cancel' icon={<FontAwesomeIcon icon={['fas', 'times']} />} onClick={this.frmCreate.close} disabled={create.loading}>
                <FormattedMessage id='common.close' />
              </Button>,
            ]}
          >
            <Create frmRef={this.frmCreate.ref} />
          </Modal>

          <Modal
            title={<FormattedMessage id='admin.districts.edit' />}
            visible={edit.visible}
            destroyOnClose={true}
            maskClosable={false}
            keyboard={false}
            centered
            width={720}
            onCancel={!edit.loading && this.frmEdit.close}
            footer={[
              <Button key='submit' type='primary' icon={<FontAwesomeIcon icon={['fas', 'check']} />} loading={edit.loading} onClick={this.frmEdit.submit}>
                <FormattedMessage id='common.save' />
              </Button>,
              <Button key='cancel' icon={<FontAwesomeIcon icon={['fas', 'times']} />} onClick={this.frmEdit.close} disabled={edit.loading}>
                <FormattedMessage id='common.close' />
              </Button>,
            ]}
          >
            <Edit frmRef={this.frmEdit.ref} />
          </Modal>

          <Modal
            title={<FormattedMessage id='common.confirm.deletes.title' />}
            visible={deletes.visible}
            centered
            width={460}
            onCancel={!deletes.loading && this.frmDeletes.close}
            footer={[
              <Button key='cancel' icon={<FontAwesomeIcon icon={['fas', 'times']} />} onClick={this.frmDeletes.close} disabled={deletes.loading}>
                <FormattedMessage id='common.no' />
              </Button>,
              <Button
                key='submit'
                type='primary'
                danger
                icon={<FontAwesomeIcon icon={['fas', 'check']} />}
                loading={deletes.loading}
                onClick={this.frmDeletes.submit}
              >
                <FormattedMessage id='common.yes' />
              </Button>,
            ]}
          >
            <Spin spinning={deletes.loading} size='large'>
              <h5>
                <FormattedMessage id='common.confirm.deletes.content' />
              </h5>
            </Spin>
          </Modal>
        </LayoutContentWrapper>
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  return {
    height: state.App.height,
    loading: state.District.loading,
    init: state.District.init,
    search: {
      countries: state.District.search.countries,
      stateProvince: {
        data: state.District.search.stateProvince.data,
        loading: state.District.search.stateProvince.loading,
        error: state.District.search.stateProvince.error,
      },
    },
    create: {
      modelGet: state.District.create.modelGet,
      modelPost: state.District.create.modelPost,
      result: state.District.create.result,
      error: state.District.create.error,
      loading: state.District.create.loading,
      visible: state.District.create.visible,
      data: {
        stateProvince: {
          error: state.District.create.data.stateProvince.error,
        },
      },
    },
    edit: {
      modelGet: state.District.edit.modelGet,
      modelPost: state.District.edit.modelPost,
      result: state.District.edit.result,
      error: state.District.edit.error,
      loading: state.District.edit.loading,
      visible: state.District.edit.visible,
      data: {
        stateProvince: {
          error: state.District.edit.data.stateProvince.error,
        },
      },
    },
    deletes: {
      modelPost: state.District.deletes.modelPost,
      result: state.District.deletes.result,
      error: state.District.deletes.error,
      loading: state.District.deletes.loading,
      visible: state.District.deletes.visible,
    },
    activates: {
      modelPost: state.District.activates.modelPost,
      result: state.District.activates.result,
      error: state.District.activates.error,
    },
    grd: {
      loading: state.District.grd.loading,
    },
  };
}
function mapDispatchToProps(dispatch) {
  return {
    initGet: () => dispatch(actions.initGet()),
    initGetError: (error) => dispatch(actions.initGetError(error)),
    initSet: (data) => dispatch(actions.initSet(data)),
    initSetSuccess: () => dispatch(actions.initSetSuccess()),
    initReset: () => dispatch(actions.initReset()),

    createGet: () => dispatch(actions.createGet()),
    createGetError: (error) => dispatch(actions.createGetError(error)),
    createSet: (model) => dispatch(actions.createSet(model)),
    createSetSuccess: () => dispatch(actions.createSetSuccess()),
    createPost: (model) => dispatch(actions.createPost(model)),
    createPostSuccess: (result) => dispatch(actions.createPostSuccess(result)),
    createPostError: (error) => dispatch(actions.createPostError(error)),
    createClose: () => dispatch(actions.createClose()),
    createReset: () => dispatch(actions.createReset()),

    editGet: (id) => dispatch(actions.editGet(id)),
    editGetError: (error) => dispatch(actions.editGetError(error)),
    editSet: (model) => dispatch(actions.editSet(model)),
    editSetSuccess: () => dispatch(actions.editSetSuccess()),
    editPost: (model) => dispatch(actions.editPost(model)),
    editPostSuccess: (result) => dispatch(actions.editPostSuccess(result)),
    editPostError: (error) => dispatch(actions.editPostError(error)),
    editClose: () => dispatch(actions.editClose()),
    editReset: () => dispatch(actions.editReset()),

    deletesGet: () => dispatch(actions.deletesGet()),
    deletesPost: (ids) => dispatch(actions.deletesPost(ids)),
    deletesPostSuccess: (result) => dispatch(actions.deletesPostSuccess(result)),
    deletesPostError: (error) => dispatch(actions.deletesPostError(error)),
    deletesClose: () => dispatch(actions.deletesClose()),
    deletesReset: () => dispatch(actions.deletesReset()),

    activatesPost: (ids, active) => dispatch(actions.activatesPost(ids, active)),
    activatesPostSuccess: (result) => dispatch(actions.activatesPostSuccess(result)),
    activatesPostError: (error) => dispatch(actions.activatesPostError(error)),
    activatesReset: () => dispatch(actions.activatesReset()),

    grdLoading: (loading) => dispatch(actions.grdLoading(loading)),

    searchCountryChange: (countryId) => dispatch(actions.searchCountryChange(countryId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(District);
