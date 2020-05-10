import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">关于</Link>
          </li>
          <li>
            <Link to="/topic">话题</Link>
          </li>
          <li>
            <Link to="/imooc">imooc</Link>
          </li>
        </ul>
        <hr />
        {/* 组件内容呈现的位置 */}
        {this.props.children}
      </div>
    );
  }
}
