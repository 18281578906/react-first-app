import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Main from './Main';
import About from './../route1/About';
import Topic from './../route1/Topic';
import Home from './Home';

export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <Home>
          <Route
            path="/home"
            // render实现嵌套路由
            render={() => (
              <Main>
                <Route path="/home/a" component={About}></Route>
              </Main>
            )}
          ></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/topic" component={Topic}></Route>
        </Home>
      </HashRouter>
    );
  }
}
