import React from 'react';
import { Button, Table, Icon, Input, Card ,Modal} from 'antd';
import Highlighter from 'react-highlight-words';
import Axios from 'axios';
import './order.less'

 
export default class OrderList extends React.Component {

  state = {
    data: [],
    sortedInfo: null,
    searchText: '',
    searchedColumn: '',
    filteredInfo: null,
    selectedItems:null,
    disabled:true,
    clearFilters:null,
    loading:true
  };
  componentDidMount() {
    this.item=[];
     this.getOrderList();
  }
  getOrderList=()=>{
    Axios.get('/wechat-movie/api/orderSnackList.php')
      .then(res => {
        this.setState({
          data:res.data,
          loading:false
        });
        console.log( this.state.data)
      })
      .catch(error => {
        console.log(error);
      });
  }
  //search
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex,clearFilters)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex,clearFilters)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });
  handleSearch = (selectedKeys, confirm, dataIndex,clearFilters) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
      clearFilters:clearFilters
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    if(this.state.clearFilters!==null)     
    this.handleReset(this.state.clearFilters);
       this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });  
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };
  selectItem=(selectedRowKeys)=>{
    this.item=selectedRowKeys;
    if(this.item.length===0){
      this.setState({
        disabled:true
      })
    }
      else{
          this.setState({
            disabled:false
          })
      }
    console.log(this.item);
  }
  //alert

  //delete
  handleDelete=()=>{
     var item=this.item; 
     var that=this;     
            Modal['confirm']({
                  title: '删除',
                  content: '你确认要删除选择的这几项吗？',
                  onOk() {
                    that.setState({
                      loading:true
                    })
                    var qs=require('qs');
                      Axios.post('/wechat-movie/api/orderDelete.php?type=orderList', qs.stringify({deleItem:item}),
                      {
                        headers:{
                          "Content-Type": "application/x-www-form-urlencoded"
                        }
                      } )
                .then(data=>{
                  console.log(data);
                  that.setState({
                    disabled:true,
                    loading:false
                  })
                  that.getOrderList();
                }).catch(error=>{
                  console.log(error)
                })
                  },
                  onCancel() {
                    console.log('cancel');
                  }
                });
  }
 
  //配置列
  render() {
   
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        // onFilter: (value, record) => record.o_id.includes(value),
        // filteredValue: null,
        ellipsis: true,
        ...this.getColumnSearchProps('id')
      },
      {
        title: '套餐',
        dataIndex: 'title',
        key: 'ordertitleId',
        sorter: (a, b) => a.title - b.title,
        sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('title')
      },
      {
        title: '电影院',
        dataIndex: 'cinemaName',
        key: 'cinemaName',
        sorter: (a, b) => a.cinemaName - b.cinemaName,
        sortOrder: sortedInfo.columnKey === 'cinemaName' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('cinemaName')
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('price')
      },
      
      {
        title: '订单总额',
        dataIndex: 'total',
        key: 'total',
        sorter: (a, b) => a.total - b.total,
        sortOrder: sortedInfo.columnKey === 'total' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('total')
      },
      
      {
        title:'数量',
        dataIndex: 'amount',
        key: 'amount',
        sorter: (a, b) => a.amount - b.amount,
        sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('amount')
      },
      {
        title: '小食封面',
        dataIndex: 'img',
        key: 'img',
        sorter: (a, b) => a.img - b.img,
        sortOrder: sortedInfo.columnKey === 'img' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('img')
      }
   
    

    ];
    let ReactNode=[
    <Button className='btn' type="primary" onClick={this.clearAll} size="default"  key="clear" shape="round">清除</Button>,
    <Button className='btn'   type="primary"  size="default"  key="out"  shape="round">   <a style={{color:'white'}} href="http://127.0.0.1:9000/wechat-movie/api/export3.php?type=orderList">导出</a></Button>,
    <Button className='btn' disabled={this.state.disabled} type="primary"  onClick={this.handleDelete} size="default"  key="delete"  shape="round">删除</Button> ];

   // rowSelection objects indicates the need for row selection
  
   const rowSelection = {
       
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.selectItem(selectedRowKeys);
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows);
        },
      };
    return (
      <div>
        <Card title="订单列表" extra={ReactNode}>
          <Table
            columns={columns}
            rowKey='o_id'
            dataSource={this.state.data}
            onChange={this.handleChange}
            scroll={{ x: 1300,y:400 }}
            loading={this.state.loading}
            bordered
            rowSelection={rowSelection}
          />
        </Card>
      </div>
    );
  }
}
    