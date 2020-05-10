import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import home from './pages/home/home'
import staffList from './pages/user/staffList';
import adminList from './pages/user/adminList';
import NoMatch from './pages/nomatch/index';
import userList from './pages/user/userList';
import MovieList from './pages/movie/movieList';
import Test from './pages/movie/test';
import OrderList from './pages/order/orderList';
import OrderSnackList from './pages/orderSnack/orderList';
import Permission from './pages/permission'

export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
        <Route path="/login" component={Login}></Route>
          <Route
            path="/admin"
            render={() => (
              <Admin>
                <Switch>
                <Route
                    path="/admin/home"
                    component={home}
                  ></Route>
                  <Route
                    path="/admin/user/staffList"
                    component={staffList}
                  ></Route>
                  <Route
                    path="/admin/user/adminList"
                    component={adminList}
                  ></Route>
                  <Route
                    path="/admin/user/userList"
                    component={userList}
                  ></Route>
                  <Route
                    path="/admin/movie/movieList"
                    component={MovieList}
                  ></Route>
                   <Route
                    path="/admin/movie/test"
                    component={Test}
                  ></Route>
                  <Route
                    path="/admin/order/orderList"
                    component={OrderList}
                  ></Route>
                    <Route
                    path='/admin/order/orderSnackList'
                    component={OrderSnackList}
                  ></Route>
                  <Route
                    path="/admin/permission"
                    component={Permission}
                  ></Route>
                
                  <Route component={NoMatch}></Route>
                </Switch>
              </Admin>
            )}
          ></Route>
         
        </App>
      </HashRouter>
    );
  }
}
