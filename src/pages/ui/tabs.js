import React from 'react';
import { Card, Tabs, message, Icon } from 'antd';
import './ui.less';
const { TabPane } = Tabs;

export default class Tab extends React.Component {
  callback = key => {
    message.info('hi,你选择了页签' + key);
  };
  componentWillMount() {
    const panes = [
      {
        title: 'Tab 1',
        content: 'Tab 1',
        key: '1'
      },
      {
        title: 'Tab 2',
        content: 'Tab 2',
        key: '2'
      },
      {
        title: 'Tab 3',
        content: 'Tab 3',
        key: '3'
      }
    ];
    this.setState({
      activeKey: panes[0].key,
      panes: panes
    });
  }
  onChange = activeKey => {
    this.setState({
      activeKey
    });
  };
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };
  newTabIndex = 0;
  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: 'New Tab' + this.newTabIndex,
      content: 'Content of new Tab',
      key: activeKey
    });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };
  render() {
    return (
      <div>
        <Card title="Tab页签" className="card-warp">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab1" key="1">
              tab1 content
            </TabPane>
            <TabPane tab="Tab2" key="2">
              tab2 content
            </TabPane>
            <TabPane tab="Tab3" key="3">
              tab3 content
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" className="card-warp">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane
              tab={
                <span>
                  <Icon type="plus" />
                  Tab1
                </span>
              }
              key="1"
            >
              tab1 content
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="edit" />
                  Tab2
                </span>
              }
              key="2"
            >
              tab2 content
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="delete" />
                  Tab3
                </span>
              }
              key="3"
            >
              tab3 content
            </TabPane>
          </Tabs>
        </Card>

        <Card title="Tab页签" className="card-warp">
          <Tabs
            activeKey={this.state.activeKey}
            defaultActiveKey="1"
            onChange={this.onChange}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {this.state.panes.map(panel => {
              return (
                <TabPane tab={panel.title} key={panel.key}>
                  {panel.content}
                </TabPane>
              );
            })}
          </Tabs>
        </Card>
      </div>
    );
  }
}
