import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Main from './Main';
import About from './Info';
import Topic from './../route1/Topic';
import Home from './Home';
import Info from './Info';
import NotMatch from './NotMatch';

export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <Home>
          <Switch>
            <Route
              path="/home"
              // render实现嵌套路由
              render={() => (
                <Main>
                  {/* 动态路由id */}
                  <Route path="/home/:mainId" component={Info}></Route>
                </Main>
              )}
            ></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topic" component={Topic}></Route>
            <Route component={NotMatch}></Route>
          </Switch>
        </Home>
      </HashRouter>
    );
  }
}
