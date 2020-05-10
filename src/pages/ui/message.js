import React from 'react';
import { Card, Button, message } from 'antd';
import './ui.less';
export default class Message extends React.Component {
  showMessage = type => {
    message[type]('恭喜你，react晋级成功');
  };
  render() {
    return (
      <div>
        <Card title="全局提示框" className="card-warp">
          <Button type="primary" onClick={() => this.showMessage('success')}>
            Success
          </Button>
          <Button type="primary" onClick={() => this.showMessage('info')}>
            info
          </Button>
          <Button type="primary" onClick={() => this.showMessage('loading')}>
            loading
          </Button>
          <Button type="primary" onClick={() => this.showMessage('warning')}>
            warning
          </Button>
          <Button type="primary" onClick={() => this.showMessage('error')}>
            error
          </Button>
        </Card>
      </div>
    );
  }
}
