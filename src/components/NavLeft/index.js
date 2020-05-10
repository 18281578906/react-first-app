import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import MenuConfig from '../../config/menuConfig';
import './index.less';
const SubMenu = Menu.SubMenu;

export default class NavLeft extends React.Component {
  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);
    this.setState({
      menuTreeNode: menuTreeNode
    });
  }

  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item itle={item.title} key={item.key}>
          <NavLink to={item.key}> {item.title}</NavLink>
        </Menu.Item>
      );
    });
  };
  render() {
    return (
      <div>
        <div className="logo">
          <img
            src="http://imoocms.51purse.com/assets/logo-ant.svg"
            alt="logo"
          ></img>
          <h1>后台管理</h1>
        </div>
        <Menu theme="dark" mode="inline">
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}
