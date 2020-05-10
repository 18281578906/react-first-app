import React from 'react';
import { Form, Input, Button,Card } from 'antd';
import './login.less'
import Axios from 'axios'

// const onFinish = values => {
//       console.log('Received values of form: ', values);
//     };
export default class Home extends React.Component {
 state={
   username:'',
   password:''

  }
  handlePost=()=>{

    
       var qs=require('qs');
       Axios.post('/wechat-movie/api/login.php',qs.stringify({username:this.state.username,password:this.state.password}),
       {  headers:{
        "Content-Type": "application/x-www-form-urlencoded"
      }}
       ).then(data=>{
        console.log(data);
        this.setCookie('username',data.data);
        alert('登录成功！');
        this.props.history.push("/admin/home");        
      }).catch(error=>{
        alert('失败！');
        console.log(error)
      })

  }
   
  // 设置cookie,默认是30天
  setCookie(key, value) {
      const d = new Date();
      d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
      const expires = "expires=" + d.toGMTString();
      document.cookie = key + "=" + value + "; " + expires;
  }

  handleChange=(e)=>{
    let type=e.target.className.split(' ')[1];
    this.setState({
      [type]:e.target.value

    })
 
  }
    
  
  render() {
  
    return (
      <div className="formLogin">
        <h1 style={{ color:'white',margin:20,position:'relative',left:0}}>欢迎进入找票票后台管理系统</h1>
      <Card title="登录" style={{width:400,height:300,position:"absolute",top:200}} headStyle={{textAlign:'center'}} >
      <Form
      name="normal_login"
      className="login-form"
      // initialValues={{ remember: true }}
      // onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input 
         className='username'
        onChange={this.handleChange}
       placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
        
          type="password"
          placeholder="Password"
          className='password'
          onChange={this.handleChange}
        />
      </Form.Item>
  
      <Form.Item>
        <Button type="primary" onClick={this.handlePost} htmlType="submit" style={{width:100+'%'}} className="login-form-button">
          Log in
        </Button>
        Or <a href="/regisiter">register now!</a>
      </Form.Item>
    </Form>
     </Card>
   </div> );
  }
}

