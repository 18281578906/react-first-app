import React from 'react';
import { Button, Table, Icon, Input, Card ,Modal,Switch} from 'antd';
import Highlighter from 'react-highlight-words';
import Axios from 'axios';
import './index.less'

 
export default class Permission extends React.Component {

  state = {
    data: [],
    sortedInfo: null,
    searchText: '',
    searchedColumn: '',
    filteredInfo: null,
    selectedItems:null,
    disabled:true,
    clearFilters:null,
    type:''
  };
  componentDidMount() {
    this.item=[];
     this.getOrderList();
  }
  getOrderList=()=>{
   
    Axios.get('/wechat-movie/api/orderList.php?type=permission')
      .then(res => {
        this.setState({
          data:res.data
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
                    var qs=require('qs');
                      Axios.post('/wechat-movie/api/orderDelete.php?type=permission', qs.stringify({deleItem:item}),
                      {
                        headers:{
                          "Content-Type": "application/x-www-form-urlencoded"
                        }
                      } )
                .then(data=>{
                  console.log(data);
                  that.setState({
                    disabled:true
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
  //权限
  onChangeforClick=(checked,event)=>{
    var that=this;
    var changeItem= event.currentTarget.parentNode.parentNode.getAttribute('data-row-key')
    var operation=event.currentTarget.className.split(' ')[0];
    var qs=require('qs');
     Axios.post('/wechat-movie/api/permission.php?type=permission',
      qs.stringify({operation:operation,key:changeItem,checked:checked}),
     {headers:{"Content-Type": "application/x-www-form-urlencoded"}} )
     .then(data=>{
     that.setState({
        disabled:true
      })
    that.getOrderList();
       }).catch(error=>{
         console.log(error)
    })
 
  } 

  changeList(checked,node){
    
  }
evil=(fn)=> {

  var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
  return new Fn('return ' + fn)();
}
  //配置列
  render() {
   
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [  
      {
        title: '工号',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('id')
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name - b.name,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('name')
      },

      {
        title: '职位',
        dataIndex: 'position',
        key: 'position',
        sorter: (a, b) => a.position - b.position,
        sortOrder: sortedInfo.columnKey === 'position' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('position')
      },
      {
        title: '可删除',
        dataIndex: 'dele',
        key: 'dele',
        render: dele => (
          <Switch 
          checkedChildren="开" 
          unCheckedChildren="关"  
          className='dele'
          onChange={this.onChangeforClick} 
          defaultChecked={this.evil(dele)} /> 
        ),
      },
      {
        title: '可修改',
        dataIndex: 'edit',
        key: 'edit',  
        render: edit => (
          <Switch 
          checkedChildren="开" 
          unCheckedChildren="关"  
          className='edit'
          onChange={this.onChangeforClick} 
          defaultChecked={this.evil(edit)} /> 
        ),
      },
      {
        title: '导入',
        dataIndex: 'Import',
        key: 'Import',
        render: Import => (
          <Switch 
          checkedChildren="开" 
          unCheckedChildren="关"  
          className='Import'
          onChange={this.onChangeforClick} 
          defaultChecked={this.evil(Import)} /> 
        ),
      }
   
      ,
      {
        title: '导出',
        dataIndex: 'Export',
        key: 'Export',
        render: Export => (
          <Switch 
          checkedChildren="开" 
          unCheckedChildren="关"  
          className='Export'
          onChange={this.onChangeforClick} 
          defaultChecked={this.evil(Export)} /> 
        ),
      }
      ,
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        sorter: (a, b) => a.phone - b.phone,
        sortOrder: sortedInfo.columnKey === 'phone' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('phone')
      }

    ];
    let ReactNode=[
    <Button className='btn' type="primary" onClick={this.clearAll} size="default"  key="clear" shape="round">清除</Button>,
    <Button className='btn'   type="primary"   size="default"  key="out"  shape="round">导出</Button>,
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
        <Card title="权限设置" extra={ReactNode}>
          <Table
            columns={columns}
            rowKey='id'
            dataSource={this.state.data}
            onChange={this.onChangeClick}
            scroll={{y:400 }}
            bordered
            rowSelection={rowSelection}
          />
        </Card>
      </div>
    );
  }
}
    