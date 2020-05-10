import React from 'react';

export default class Info extends React.Component {
  render() {
    return (
      <div>
        获取动态路由的值:
        {this.props.match.params.mainId}
      </div>
    );
  }
}
