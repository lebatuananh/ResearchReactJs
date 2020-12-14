import React from 'react';
import { connect } from 'react-redux';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';
import actions from '../../redux/category/actions';
import LayoutContentWrapper from '@shared/components-admin/utility/layoutWrapper';
import { Row, Col, Form, Input, Button, Checkbox, Radio, Select, Spin, Modal, Space, Breadcrumb, Tooltip } from 'antd';
import { LoadingOutlined, SearchOutlined, ReloadOutlined, HomeOutlined } from '@ant-design/icons';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DataGrid, { Column, Paging, Pager, Scrolling, Selection, Sorting } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import ContextMenu from 'devextreme-react/context-menu';
import CellActive from '@shared/ui/Grid/Templates/CellActive';
import notify from '@shared/ui/Notify/notify';
import Create from './Create';
import Edit from './Edit';

import activeStatus from '@shared/data/common/ActiveStatus';
import selectHelper from '@shared/lib/helpers/ui/selectHelper';
import gridHelper from '@shared/lib/helpers/ui/gridHelper';
import { default as ctxHelper } from '@shared/lib/helpers/ui/contextMenuHelper';

import basicStyle from '@shared/assets-admin/styles/constants';
const { rowStyle, colStyle, gutter } = basicStyle;
const { TextArea } = Input;
const { Option } = Select;
const qs = require('qs');

class Category extends React.Component {
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
    this.frmSearch = {
      ref: React.createRef(),
      submit: () => {
        const grd = this.grd;
        this.frmSearch.ref.current
          .validateFields()
          .then((values) => {
            grd.reset();
          })
          .catch((error) => {
            console.log('Validate Failed:', error);
          });
      },
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
      onItemClick: (e) => ctxHelper.def.onItemClick(e, this.grd, this.frmCreate, this.frmEdit, this.frmDeletes),
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
            q: frmSearch.getFieldValue('q'),
            typeId: frmSearch.getFieldValue('typeId'),
            status: frmSearch.getFieldValue('status'),
          },
        };
        let params = qs.stringify(objParams);
        return fetch(`http://10.110.1.210:5000/api/test/gets?${params}`)
          .then(grd.errors)
          .then((response) => response.json())
          .then((data) => {
            var d = data.data;
            return {
              data: d.data,
              totalCount: d.totalCount,
            };
          })
          .catch((error) => {
            throw intl.formatMessage({ id: 'common.notify.error.loadData' });
          });
      },
    });
    this.grd.ref.instance.option({ dataSource: this.grd.dataSource });
    //#endregion
  }

  componentDidUpdate() {
    const { init, create, edit, deletes, grd } = this.props;

    if (init.error) {
      notify.error(init.error);
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

    if (grd.loading && this.grd.ref) {
      this.grd.refresh();
    }
  }
  //#endregion

  render() {
    const { height, loading, search, create, edit, deletes } = this.props;

    return (
      <Spin spinning={loading} size='large'>
        <LayoutContentWrapper>
          <Row style={rowStyle} gutter={gutter}>
            <Col span={24} style={colStyle}>
              <Form id='frmSearch' ref={this.frmSearch.ref}>
                <Row gutter={gutter}>
                  <Col span={10}>
                    <Tooltip title='Từ khóa tìm kiếm'>
                      <Form.Item name='q'>
                        <Input placeholder='Từ khóa tìm kiếm' onPressEnter={this.frmSearch.submit} />
                      </Form.Item>
                    </Tooltip>
                  </Col>
                  <Col span={8}>
                    <Tooltip title='Loại danh mục'>
                      <Form.Item name='typeId'>
                        <Select placeholder='Loại danh mục' allowClear showSearch filterOption={selectHelper.def.filterOption}>
                          {search.types.map((x) => (
                            <Option key={x.Id} value={x.Id}>
                              {x.Name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Tooltip>
                  </Col>
                  <Col span={6}>
                    <Tooltip title='Trạng thái kích hoạt'>
                      <Form.Item name='status'>
                        <Select placeholder='Trạng thái kích hoạt' allowClear showSearch filterOption={selectHelper.def.filterOption}>
                          {activeStatus.items.map((x) => (
                            <Option key={x.value} value={x.value}>
                              {x.text}
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
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={6} className='text-center' style={colStyle}>
              <Space size='small'>
                <Button type='primary' ghost icon={<SearchOutlined />} size='small' onClick={this.frmSearch.submit}>
                  Tìm kiếm
                </Button>
                <Button type='primary' ghost icon={<ReloadOutlined />} size='small' onClick={this.grd.refresh}>
                  Làm mới
                </Button>
              </Space>
            </Col>
            <Col span={9} className='text-right' style={colStyle}>
              <Space size='small'>
                <Button type='primary' icon={<PlusOutlined />} size='small' onClick={this.frmCreate.open}>
                  Thêm mới
                </Button>
                <Button type='primary' ghost icon={<EditOutlined />} size='small' onClick={this.frmEdit.open}>
                  Chỉnh sửa
                </Button>
                <Button type='primary' danger icon={<DeleteOutlined />} size='small' onClick={this.frmDeletes.open}>
                  Xóa (đã chọn)
                </Button>
              </Space>
            </Col>
          </Row>

          <DataGrid
            id='grdCategory'
            ref={(ref) => (this.grd.ref = ref)}
            remoteOperations={true}
            cacheEnabled={false}
            hoverStateEnabled={true}
            showBorders={true}
            width='100%'
            height={height - 120}
            onCellDblClick={this.grd.dblClick}
          >
            <Column dataField='Name' dataType='string' caption='Tên danh mục' />
            <Column dataField='TypeName' dataType='string' caption='Loại danh mục' width={400} />
            <Column dataField='Active' dataType='bool' caption='Kích hoạt' cellRender={CellActive} width={80} alignment='center' />

            <Paging defaultPageSize={gridHelper.def.pageSize} />
            <Pager showPageSizeSelector={true} allowedPageSizes={gridHelper.def.pageSizes} showInfo={true} showNavigationButtons={true} visible={true} />
            <Scrolling mode='standard' />
            <Selection mode='multiple' selectAllMode='page' showCheckBoxesMode='none' />
            <Sorting mode='none' />
          </DataGrid>
          <ContextMenu
            ref={this.ctxMenu.ref}
            dataSource={this.ctxMenu.dataSource}
            target='#grdCategory .dx-datagrid-table tbody .dx-row.dx-data-row'
            width={180}
            itemRender={this.ctxMenu.itemRender}
            onShowing={this.ctxMenu.onShowing}
            onItemClick={this.ctxMenu.onItemClick}
          />

          <Modal
            title='Thêm mới danh mục'
            visible={create.visible}
            destroyOnClose={true}
            maskClosable={false}
            keyboard={false}
            centered
            width={720}
            onCancel={!create.loading && this.frmCreate.close}
            footer={[
              <Button key='submit' type='primary' loading={create.loading} onClick={this.frmCreate.submit}>
                Lưu
              </Button>,
              <Button key='cancel' onClick={this.frmCreate.close} disabled={create.loading}>
                Đóng
              </Button>,
            ]}
          >
            <Create frmRef={this.frmCreate.ref} />
          </Modal>

          <Modal
            title='Chỉnh sửa danh mục'
            visible={edit.visible}
            destroyOnClose={true}
            maskClosable={false}
            keyboard={false}
            centered
            width={720}
            onCancel={!edit.loading && this.frmEdit.close}
            footer={[
              <Button key='submit' type='primary' loading={edit.loading} onClick={this.frmEdit.submit}>
                Lưu
              </Button>,
              <Button key='cancel' onClick={this.frmEdit.close} disabled={edit.loading}>
                Đóng
              </Button>,
            ]}
          >
            <Edit frmRef={this.frmEdit.ref} />
          </Modal>

          <Modal
            title='Xác nhận xóa'
            visible={deletes.visible}
            centered
            width={460}
            onCancel={!deletes.loading && this.frmDeletes.close}
            footer={[
              <Button key='cancel' onClick={this.frmDeletes.close} disabled={deletes.loading}>
                Không
              </Button>,
              <Button key='submit' type='primary' danger loading={deletes.loading} onClick={this.frmDeletes.submit}>
                Có
              </Button>,
            ]}
          >
            <Spin spinning={deletes.loading} size='large'>
              <h5>Bạn có chắc chắn muốn xóa các mục đã chọn không?</h5>
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
    loading: state.Category.loading,
    init: state.Category.init,
    search: state.Category.search,
    create: {
      modelGet: state.Category.create.modelGet,
      modelPost: state.Category.create.modelPost,
      result: state.Category.create.result,
      error: state.Category.create.error,
      loading: state.Category.create.loading,
      visible: state.Category.create.visible,
    },
    edit: {
      modelGet: state.Category.edit.modelGet,
      modelPost: state.Category.edit.modelPost,
      result: state.Category.edit.result,
      error: state.Category.edit.error,
      loading: state.Category.edit.loading,
      visible: state.Category.edit.visible,
    },
    deletes: {
      modelPost: state.Category.deletes.modelPost,
      result: state.Category.deletes.result,
      error: state.Category.deletes.error,
      loading: state.Category.deletes.loading,
      visible: state.Category.deletes.visible,
    },
    grd: {
      loading: state.Category.grd.loading,
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

    grdLoading: (loading) => dispatch(actions.grdLoading(loading)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
