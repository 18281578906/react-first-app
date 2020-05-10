import React from 'react';
import { Card, Button, notification } from 'antd';
import './ui.less';
export default class Notifications extends React.Component {
  openNotification = (type, position) => {
    notification[type]({
      message: '发工资了',
      description: '上个月考勤22天，全勤',
      placement: position
    });
  };
  render() {
    return (
      <div>
        <Card title="通知提醒框" className="card-warp ">
          <Button
            type="primary"
            onClick={() => this.openNotification('success', 'topRight')}
          >
            Success
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotification('info', 'topLeft')}
          >
            Info
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotification('warning', 'bottomLeft')}
          >
            warning
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotification('error', 'bottomRight')}
          >
            Error
          </Button>
        </Card>
      </div>
    );
  }
}
