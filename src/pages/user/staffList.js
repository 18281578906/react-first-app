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
   
    Axios.get('/wechat-movie/api/orderList.php?type=staffList')
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
                      Axios.post('/wechat-movie/api/orderDelete.php?type=staffList', qs.stringify({deleItem:item}),
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
        dataIndex: 'm_id',
        key: 'm_id',
        sorter: (a, b) => a.m_id - b.m_id,
        sortOrder: sortedInfo.columnKey === 'm_id' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('m_id')
      },
      {
        title: '姓名',
        dataIndex: 'm_name',
        key: 'm_name',
        sorter: (a, b) => a.m_name - b.m_name,
        sortOrder: sortedInfo.columnKey === 'm_name' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('m_name')
      },
    
      {
        title: '状态',
        dataIndex: 'm_inJob',
        key: 'm_inJob',
        sorter: (a, b) => a.m_inJob - b.m_inJob,
        sortOrder: sortedInfo.columnKey === 'm_inJob' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('m_inJob')
      },
      {
        title: '性别',
        dataIndex: 'm_sex',
        key: 'm_sex',
        sorter: (a, b) => a.m_sex - b.m_sex,
        sortOrder: sortedInfo.columnKey === 'm_sex' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('m_sex')
      },
      {
        title: '电话',
        dataIndex: 'm_phone',
        key: 'm_phone',
        sorter: (a, b) => a.m_phone - b.m_phone,
        sortOrder: sortedInfo.columnKey === 'm_phone' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('m_phone')
      },
      {
        title: '工作的编号',
        dataIndex: 'm_workPlace',
        key: 'm_workPlace',
        sorter: (a, b) => a.m_workPlace - b.m_workPlace,
        sortOrder: sortedInfo.columnKey === 'm_workPlace' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('m_workPlace')
      },
      {
        title: '身份证号',
        dataIndex: 'm_idCard',
        key: 'm_idCard',
        sorter: (a, b) => a.m_idCard - b.m_idCard,
        sortOrder: sortedInfo.columnKey === 'm_idCard' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('m_idCard')
      },
  
      
      {
        title:'生日',
        dataIndex: 'm_birth',
        key: 'm_birth',
        sorter: (a, b) => a.m_birth - b.m_birth,
        sortOrder: sortedInfo.columnKey === 'm_birth' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('m_birth')
      },
      {
        title: '住址',
        dataIndex: 'm_address',
        key: 'm_address',
        sorter: (a, b) => a.m_address - b.m_address,
        sortOrder: sortedInfo.columnKey === 'm_address' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('m_address')
      },
        {
        title: '入职时间',
        dataIndex: 'm_startTime',
        key: 'm_startTime',
        sorter: (a, b) => a.m_startTime - b.m_startTime,
        sortOrder: sortedInfo.columnKey === 'm_startTime' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('m_startTime')
      },
      {
        title: '离职时间',
        dataIndex: 'm_endTime',
        key: 'm_endTime',
        sorter: (a, b) => a.m_endTime - b.m_endTime,
        sortOrder: sortedInfo.columnKey === 'm_endTime' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('m_endTime')
      },
     
      {
        title: '邮箱',
        dataIndex: 'm_email',
        key: 'm_email',
        sorter: (a, b) => a.m_email - b.m_email,
        sortOrder: sortedInfo.columnKey === 'm_email' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('m_email')
      }
    

    ];
    let ReactNode=[
    <Button className='btn' type="primary" onClick={this.clearAll} size="default"  key="clear" shape="round">清除</Button>,
    <Button className='btn'   type="primary"   size="default"  key="out"  shape="round"><a style={{color:'white'}} href="http://127.0.0.1:9000/wechat-movie/api/export3.php?type=staffList">导出</a></Button>,
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
        <Card title="人员列表" extra={ReactNode}>
          <Table
            columns={columns}
            rowKey='m_id'
            dataSource={this.state.data}
            onChange={this.handleChange}
            scroll={{ x: 1500,y:400 }}
            loading={this.state.loading}
            bordered
            rowSelection={rowSelection}
          />
        </Card>
      </div>
    );
  }
}
    