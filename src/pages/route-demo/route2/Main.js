import React from 'react';
import { Link } from 'react-router-dom';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        this is the main page<Link to="/home/a">嵌套路由，二级路由</Link>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
