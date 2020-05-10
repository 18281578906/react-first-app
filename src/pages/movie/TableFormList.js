import React, { PureComponent } from 'react';
import {
  Table,
  Icon,
  Select,
} from 'antd';
import styles from './movie.less';


const { Option } = Select;

const columns = (props) => {
  const { handleChange, handleAdd, handleRemove } = props;
  return [{
    dataIndex: 'name',
    width: 120,
    render: (text, record, index) => {
      return (
        <Select
          allowClear
          value={text}
          style={{ width: '100%' }}
          placeholder="请选择"
          onChange={(value) => { handleChange(value, 'name', index); }}
        >
          <Option key={1} value={1}>名字</Option>
          <Option key={2} value={2}>年龄</Option>
          <Option key={3} value={3}>性别</Option>
        </Select>
      );
    },
  }, {
    dataIndex: 'age',
    key: 'age',
    width: 120,
    render: (text, record, index) => {
      return (
        <Select
         value={text}
          style={{ width: '100%' }}
          placeholder="请选择"
          onChange={(value) => { handleChange(value, 'age', index); }}
        >
          <Option key={1} value={1}>名字</Option>
          <Option key={2} value={2}>年龄</Option>
          <Option key={3} value={3}>性别</Option>
        </Select>
      );
    },
  }, {
    dataIndex: 'selected',
    key: 'selected',
    width: 120,
    render: (text, record, index) => {
      return (
        <Select
         value={text}
          style={{ width: '100%' }}
          placeholder="请选择"
          mode="multiple"
          onChange={(value) => { handleChange(value, 'selected', index); }}
        >
           <Option key={1} value={1}>名字</Option>
          <Option key={2} value={2}>年龄</Option>
          <Option key={3} value={3}>性别</Option>
        </Select>
      );
    },
  }, {
    dataIndex: 'delete',
    key: 'delete',
    width: 10,
    render: (text, record) => {
      const arr = [];
      if (record.needAdd) {
        arr.push(
          <Icon
            key="add"
            type="plus-circle"
            onClick={() => handleAdd(record.key)}
            style={{ fontSize: '16px', cursor: 'pointer' }}
          />,
        );
      }
      if (record.needRemove) {
        arr.push(
          <Icon
            key="edit"
            onClick={() => handleRemove(record.key)}
            type="minus-circle"
            style={{ fontSize: '16px', cursor: 'pointer', paddingLeft: '10px' }}
          />,
        );
      }
      return arr;
    },
  }];
};

export default class DataListFrom extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: props.value, // 用于接收父组件传过来的参数
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        dataSource: nextProps.value,  // 通过改变props给数组赋值
      });
    }
  }

  handleChange = (value, name, index) => { // 依据需求而定，各个选择框可实现联动
    const newValue = value;
    const { onChange } = this.props;
    const { dataSource } = this.state;
    dataSource[index][name] = newValue;
    const newDataSource = dataSource.map(item => ({ ...item }));
   onChange(newDataSource);
  };

  handleAdd = (key) => {
    const { dataSource } = this.state;
    const newData = dataSource.map(item => ({ ...item, needAdd: false, needRemove: true })); // 后端返回存储数据
    newData.push({
      key: key + 1, // 声明唯一的key值，保证数据不污染
      name: '',
      age: '',
      selected: '',
      needAdd: true,
      needRemove: true,
    });
    this.setState({
      dataSource: newData,
    });
  }

  handleRemove = (key) => { // 删除的显示依据你的需求而定
    const { dataSource } = this.state;
    const newData = dataSource.filter(item => item.key !== key);
    newData[newData.length - 1] = Object.assign(
      {},
      newData[newData.length - 1],
      { needAdd: true, needRemove: true },
    );
    if (newData.length === 1) {
      newData[0] = Object.assign({}, newData[0], { needAdd: true, needRemove: false });
    }
    this.setState({
      dataSource: newData,
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <Table
        className={styles.TableHeaderCss}
        columns={columns({
          handleAdd: this.handleAdd,
          handleChange: this.handleChange,
          handleRemove: this.handleRemove,
        })}
        pagination={false}
        showHeader={false} // 去除我们的title。
        dataSource={dataSource}
      />
    );
  }
}

