import React from 'react';
import { Button, Table, Icon, Input, Card ,Modal} from 'antd';
import Highlighter from 'react-highlight-words';
import Axios from 'axios';
import './user.less'

 
export default class MovieList extends React.Component {

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
   
    Axios.get('/wechat-movie/api/orderList.php?type=userList')
      .then(res => {
        this.setState({
          data:res.data,
          loading: false
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
    console.log(selectedKeys,confirm,dataIndex)
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
      clearFilters:clearFilters
    });
  };

  handleReset = clearFilters => {
    console.log(clearFilters)
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
                      Axios.post('/wechat-movie/api/orderDelete.php?type=userList', qs.stringify({deleItem:item}),
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
        title: '用户名',
        dataIndex: 'h_nickName',
        key: 'h_nickName',
        sorter: (a, b) => a.h_nickName - b.h_nickName,
        sortOrder: sortedInfo.columnKey === 'h_nickName' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('h_nickName')
      },
      {
        title: '用户头像',
        dataIndex: 'h_head_url',
        key: 'h_head_url',
        sorter: (a, b) => a.h_head_url - b.h_head_url,
        sortOrder: sortedInfo.columnKey === 'h_head_url' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('h_head_url')
      },
      {
        title: '用户编号',
        dataIndex: 'h_uuid',
        key: 'h_uuid',
        sorter: (a, b) => a.h_uuid - b.h_uuid,
        sortOrder: sortedInfo.columnKey === 'h_uuid' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('h_uuid')
      },
      {
        title: '性别',
        dataIndex: 'h_sex',
        key: 'h_sex',
        sorter: (a, b) => a.h_sex - b.h_sex,
        sortOrder: sortedInfo.columnKey === 'h_sex' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('h_sex')
      },
      {
        title: '性别',
        dataIndex: 'h_birth',
        key: 'h_birth',
        sorter: (a, b) => a.h_birth - b.h_birth,
        sortOrder: sortedInfo.columnKey === 'h_birth' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('h_birth')
      },
      {
        title: '入驻时间',
        dataIndex: 'h_beginUse',
        key: 'h_beginUse',
        sorter: (a, b) => a.h_beginUse - b.h_beginUse,
        sortOrder: sortedInfo.columnKey === 'h_beginUse' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('h_beginUse')
      }

    ];
    let ReactNode=[
    <Button className='btn' type="primary" onClick={this.clearAll} size="default"  key="clear" shape="round">清除</Button>,
    <Button className='btn'   type="primary"   size="default"  key="out"  shape="round"><a style={{color:'white'}} href="http://127.0.0.1:9000/wechat-movie/api/export3.php?type=userList">导出</a></Button>,
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
        <Card title="用户列表" extra={ReactNode}>
          <Table
            columns={columns}
            rowKey='h_id'
            dataSource={this.state.data}
            onChange={this.handleChange}
            scroll={{y:400 }}
            loading={this.state.loading}
            bordered
            rowSelection={rowSelection}
          />
        </Card>
      </div>
    );
  }
}
    