import React from 'react';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import './index.less';

export default class Header extends React.Component {
  state={
    login:'登录',
    time:'00:00:00'
  }
  componentDidMount(){
    this.getWeather();
    var name=this.getCookie('username');
    if(name!== ''){
      this.setState({
        login:' 欢迎，'+name
      })
    }
    else{
      this.setState({
        login:'登录'
      })
    }
    this.clockTime();
  }
   // 获取cookie
   getCookie=(key)=> {
    const name = key + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
   
  // 设置cookie,默认是30天
  setCookie(key, value) {
    const d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toGMTString();
    document.cookie = key + "=" + value + "; " + expires;
}
logout=()=>{
  alert('退出成功！')
  this.setCookie('username','');  
}
//时间
clockTime=()=>{
setInterval(()=>{
  let today=new Date();
  this.setState({
    time:today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()+
    ' '+today.toLocaleTimeString(),
  });
},1000)
}
//天气预报
getWeather=()=>{

}
  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <div style={{ float: 'right', fontSize: 14 }}>                     
            <Link to="/login">{this.state.login }  </Link>    
            <Link to="/login">  <span className="logout" onClick={this.logout}>退出</span></Link>
            </div>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col className="breadcrumb-title" span={4}>
            首页
          </Col>
          <div className="weather">
            <span className="date">{this.state.time}</span>
            <span className="weather-symbol">
              <img
                src="http://api.map.baidu.com/images/weather/day/duoyun.png"
                alt="weather"
              />
            </span>
            <span className="weather-detail">多云转晴</span>
          </div>
        </Row>
      </div>
    );
  }
}
