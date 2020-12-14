import { DataGrid } from 'devextreme-react';
import { Column, Paging, Pager, Scrolling, Selection, Sorting, Editing, Summary, TotalItem } from 'devextreme-react/data-grid';
import gridHelper from '@shared/lib/helpers/ui/gridHelper';
import React, { Component } from 'react';
import { Button, Col, Divider, Row, Space, Card } from 'antd';
import { PlusOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';

function mapItemCode(item, fieldDes, fieldSource, source, id) {
  const data = source.find((p) => p.Id === id);
  if (data) {
    item[fieldDes] = data[fieldSource];
  }
}

export default class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.grd = {
      ref: React.createRef(),
      dataSource: [],
      addNewRow: () => {
        this.grd.ref.current.instance.addRow();
      },
      remove: () => {
        const selectedRowKeys = this.grd.ref.current.instance.getSelectedRowKeys();
        if (selectedRowKeys) {
          selectedRowKeys.forEach((element) => {
            const _index = this.grd.ref.current.instance.getRowIndexByKey(element);
            this.grd.ref.current.instance.deleteRow(_index);
          });
        }
      },
      initNewRow: (e) => {
        const { orderId } = this.props;
        e.data.OrderId = orderId;
      },
    };
    this.renderExtraButtons = this.renderExtraButtons.bind(this);
    this.grd.addNewRow = this.grd.addNewRow.bind(this);
    this.grd.remove = this.grd.remove.bind(this);
    this.grd.initNewRow = this.grd.initNewRow.bind(this);
    // Promise.all();
  }

  componentDidMount() {}

  getData() {
    let { data } = this.state;
    const { selectCommodities, selectCountries, selectCurrencies, selectDeclaredCargoClasses, selectMeasureWeights } = this.props;
    if (data && Array.isArray(data) && data.length > 0) {
      data = data.map((item) => {
        mapItemCode(item, 'CommodityCode', 'Code', selectCommodities, item.CommodityId);
        mapItemCode(item, 'DeclaredCargoClassText', 'Name', selectDeclaredCargoClasses, item.DeclaredCargoClass);
        mapItemCode(item, 'CountryOfOriginCode', 'Code', selectCountries, item.CountryOfOriginId);
        mapItemCode(item, 'MeasureWeightCode', 'Code', selectMeasureWeights, item.MeasureWeightId);
        mapItemCode(item, 'CurrencyCode', 'CurrencyCode', selectCurrencies, item.CurrencyId);
        return item;
      });
    }
    return data;
  }

  renderExtraButtons() {
    return (
      <Space direction='horizontal' align='start'>
        <Button type='primary' className='ant-btn-sm' onClick={this.grd.addNewRow}>
          <PlusOutlined /> <FormattedMessage id='common.addNew' />
        </Button>
        <Button type='primary' className='ant-btn-sm ant-btn-dangerous' onClick={this.grd.remove}>
          <CloseOutlined /> <FormattedMessage id='common.deletes' />
        </Button>
      </Space>
    );
  }

  render() {
    const { selectCommodities, selectCountries, selectCurrencies, selectDeclaredCargoClasses, selectMeasureWeights } = this.props;
    const orderDetailTitle = (
      <React.Fragment>
        <FormattedMessage id='common.orderDetails' />
      </React.Fragment>
    );
    return (
      <div>
        <Card title={orderDetailTitle} extra={this.renderExtraButtons()} bordered={false} headStyle={{ padding: 0 }} bodyStyle={{ padding: 0 }}>
          <DataGrid
            height={300}
            className='dx-grid-header-center'
            dataSource={this.state.data}
            ref={this.grd.ref}
            cacheEnabled={false}
            keyExpr='Id'
            onInitNewRow={this.grd.initNewRow}
            hoverStateEnabled
            wordWrapEnabled
            showBorders
            showColumnLines
            showRowLines
            col
            width='100%'
          >
            <Column
              caption='Tên sản phẩm'
              dataField='CommodityId'
              dataType='string'
              minWidth={200}
              fixed
              fixedPosition='left'
              lookup={{
                dataSource: selectCommodities,
                valueExpr: 'Id',
                displayExpr: 'Name',
              }}
            />
            <Column
              caption='Loại sản phẩm'
              dataField='DeclaredCargoClass'
              dataType='string'
              lookup={{
                dataSource: selectDeclaredCargoClasses,
                valueExpr: 'Id',
                displayExpr: 'Name',
              }}
              width={150}
            />
            <Column
              caption='Nguồn gốc'
              dataField='CountryOfOriginId'
              dataType='string'
              lookup={{
                dataSource: selectCountries,
                valueExpr: 'Id',
                displayExpr: 'Name',
              }}
              width={150}
            />
            <Column caption='Số lượng' dataField='Quantity' dataType='number' width={120} />
            <Column caption='Trọng lượng' dataField='TotalGrossWeight' dataType='number' width={120} />
            <Column
              caption='Đơn vị trọng lượng'
              dataField='MeasureWeightId'
              dataType='string'
              width={90}
              lookup={{
                dataSource: selectMeasureWeights,
                valueExpr: 'Id',
                displayExpr: 'Name',
              }}
            />
            <Column caption='Đơn giá sản phẩm' dataField='Price' dataType='number' width={120} />
            <Column caption='Tổng giá trị đơn hàng' dataField='TotalAmount' dataType='number' width={120} />
            <Column caption='Đơn giá kê khai hải quan' dataField='DeclaredCustomsValue' dataType='number' width={120} />
            <Column caption='Tổng giá trị kê khai hải quan' dataField='TotalDeclaredCustomsValue' dataType='number' width={110} />
            <Column
              caption='Đơn vị tiền tệ'
              dataField='CurrencyId'
              dataType='string'
              width={90}
              lookup={{
                dataSource: selectCurrencies,
                valueExpr: 'Id',
                displayExpr: 'Name',
              }}
            />
            <Column type='buttons' visible={false} />
            <Summary recalculateWhileEditing={true}>
              <TotalItem column='TotalGrossWeight' summaryType='sum' />
              <TotalItem column='TotalAmount' summaryType='sum' valueFormat='currency' />
              <TotalItem column='TotalDeclaredCustomsValue' summaryType='sum' valueFormat='currency' />
            </Summary>
            {/* <Paging enabled={false} defaultPageSize={gridHelper.def.pageSize} />
            <Pager showPageSizeSelector allowedPageSizes={gridHelper.def.pageSizes} showInfo showNavigationButtons visible /> */}
            <Scrolling mode='standard' />
            <Selection mode='multiple' selectAllMode='page' showCheckBoxesMode='always' />
            <Sorting mode='none' />
            <Editing mode='cell' allowDeleting allowUpdating useIcons />
          </DataGrid>
        </Card>
      </div>
    );
  }
}
