import React, { useContext, useState, useEffect, useRef } from 'react';
import { Button, Table, Icon, Input, Card ,Modal,Form} from 'antd';
import Highlighter from 'react-highlight-words';
import Axios from 'axios';
import './movie.less'

 
const EditableContext = React.createContext();
const EditableRow2 = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
      <tr key='1'  {...props} />
    </EditableContext.Provider>
  );
  
  const EditableRow = Form.create()(EditableRow2);

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
   
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async e => {
    try {
      console.log(e)
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
   
  }

  return <td {...restProps}>{childNode}</td>;
};
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
    loading:true,
    visible:false,
    count:0,
  };
  componentDidMount() {
    this.item=[];
     this.getOrderList();
  }
  getOrderList=()=>{
    Axios.get('/wechat-movie/api/orderList.php?type=movieList')
      .then(res => {
        this.setState({
          data:res.data,
          count:res.data.length,
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
                    that.setState({ loading: true });
                    var qs=require('qs');
                      Axios.post('/wechat-movie/api/orderDelete.php?type=movieList', qs.stringify({deleItem:item}),
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
  //edit


  handleAdd = () => {
    const { count, data } = this.state;
   
    const newData = {
      key: count,
      d_id: count,
      d_name: 'new'+count,
      d_style: 'new'+count,
      d_img: 'new'+count,
      d_video:'new'+count,
      d_saleNumber: 'new'+count,
      d_playNumber: 'new'+count,
      d_underPrice: 'new'+count,
      d_onlinePrice: 'new'+count,
      d_summary: 'new'+count,
      d_type: 'new'+count,
      d_director: 'new'+count,
      d_actor: 'new'+count,
      d_startDate: 'new'+count,
      d_endDate: 'new'+count,
     
    };
   var newStr=[...data,newData];
    this.setState({
      data:newStr,
      count: count + 1,
    }); console.log(this.state)
  };

  handleSave = row => {
    const newData = [...this.state.data];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ data: newData });
  };
 

  //配置列
  render() {
   
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [  
      {
        title: '编号',
        dataIndex: 'd_id',
        key: 'd_id',
        width:100,
        fixed:'left',
        sorter: (a, b) => a.d_id - b.d_id,
        sortOrder: sortedInfo.columnKey === 'd_id' && sortedInfo.order,
        ellipsis: true,
        editable: true,//可编辑
        ...this.getColumnSearchProps('d_id')
      },
      {
        title: '电影名',
        dataIndex: 'nm',
        key: 'nm',
        width:200,
        sorter: (a, b) => a.nm - b.nm,
        sortOrder: sortedInfo.columnKey === 'nm' && sortedInfo.order,
        ellipsis: true,
        editable: true,//可编辑
        ...this.getColumnSearchProps('nm')
      },
      {
        title: '电影封面',
        dataIndex: 'img',
        key: 'img',
        editable: true,//可编辑
        sorter: (a, b) => a.img - b.d_img,
        sortOrder: sortedInfo.columnKey === 'img' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('img')
      },
      {
        title: '电影编号',
        dataIndex: 'id',
        key: 'id',
        editable: true,//可编辑
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        // onFilter: (value, record) => record.id.includes(value),
        // filteredValue: null,
        ellipsis: true,
        ...this.getColumnSearchProps('id')
      },
    
      {
        title: '上映时间',
        dataIndex: 'comingTitle',
        key: 'comingTitle',
        editable: true,//可编辑
        sorter: (a, b) => a.comingTitle - b.comingTitle,
        sortOrder: sortedInfo.columnKey === 'comingTitle' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('comingTitle')
      },
      {
        title: '全球发布',
        dataIndex: 'globalReleased',
        key: 'globalReleased',
        editable: true,//可编辑
        sorter: (a, b) => a.globalReleased - b.globalReleased,
        sortOrder: sortedInfo.columnKey === 'globalReleased' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('globalReleased')
      },
      {
        title: '促销活动',
        dataIndex: 'haspromotionTag',
        key: 'haspromotionTag',
        editable: true,//可编辑
        sorter: (a, b) => a.haspromotionTag - b.haspromotionTag,
        sortOrder: sortedInfo.columnKey === 'haspromotionTag' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('haspromotionTag')
      },
      
      {
        title: '类型',
        dataIndex: 'showst',
        key: 'showst',
        editable: true,//可编辑
        sorter: (a, b) => a.showst - b.showst,
        sortOrder: sortedInfo.columnKey === 'showst' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('showst')
      },
      
      {
        title: '期望人数',
        dataIndex: 'wish',
        key: 'wish',
        editable: true,//可编辑
        sorter: (a, b) => a.wish - b.wish,
        sortOrder: sortedInfo.columnKey === 'wish' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('wish')
      }
      ,
      
      {
        title: 'preShow',
        dataIndex: 'preShow',
        key: 'preShow',
        editable: true,//可编辑
        sorter: (a, b) => a.preShow - b.preShow,
        sortOrder: sortedInfo.columnKey === 'preShow' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('preShow')
      }
      ,
      
      {
        title: '版本',
        dataIndex: 'version',
        key: 'version',
        editable: true,//可编辑
        sorter: (a, b) => a.version - b.version,
        sortOrder: sortedInfo.columnKey === 'version' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('version')
      }
    
      ,
      
      {
        title: '演员',
        dataIndex: 'star',
        key: 'star',
        editable: true,//可编辑
        sorter: (a, b) => a.star - b.star,
        sortOrder: sortedInfo.columnKey === 'star' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('star')
      }
    ];
    let ReactNode=[
    <Button className='btn' type="primary" onClick={this.clearAll} size="default"  key="clear" shape="round">清除</Button>,
    <Button className='btn'   type="primary"   size="default"  key="out"  shape="round"><a style={{color:'white'}} href="http://127.0.0.1:9000/wechat-movie/api/export3.php?type=movieList">导出</a></Button>,
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


      //edit
 
      const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      };
     
      const column = columns.map(col => {
        console.log('col.editable'+col.editable) 
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
          }),
        };
      });
    return (
      <div>
        <Card title="电影列表" extra={ReactNode}>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
              Add a row
            </Button>
          <Table
            columns={column}
            components={components}
            rowClassName={() => 'editable-row'}
            rowKey='d_id'
            dataSource={this.state.data}
            onChange={this.handleChange}
            scroll={{ x: 2000,y:400 }}
            loading={this.state.loading}
            bordered
            rowSelection={rowSelection}
          />
        </Card>
   
      </div>
    );
  }
}
    