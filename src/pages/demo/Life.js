import React from 'react';
import Child from './Child';
import './index.less';
import { Button } from 'antd';
import { Input } from 'antd';
export default class Life extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }
  handleAdd = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  handClick() {
    this.setState({
      count: this.state.count + 1
    });
  }
  render() {
    return (
      <div>
        <Input></Input>
        <div className="titleName">React 生命周期介绍</div>
        <Button onClick={this.handleAdd}>点击</Button>
        <button onClick={this.handClick.bind(this)}>点击2</button>
        <Button onClick={this.handleAdd}>点击</Button>
        <p>{this.state.count}</p>
        <p>设置子组件的生命周期</p>
        <Child name={this.state.count}></Child>
      </div>
    );
  }
}
