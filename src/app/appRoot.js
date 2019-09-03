
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom'
import { connect } from "af-render"
import app from "@app/appInit"
import { createLoadable } from "@common/createLoadable.js"
import  NotFound  from "@common/component/NotFound"

const Page1 = createLoadable(() => import(/* webpackChunkName: "page1" */'@pages/page1'))
const Page2 = createLoadable(() => import(/* webpackChunkName: "page2" */'@pages/Page2'))



function App(props) {
  const { history } = app;
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            component={Page1}
          />
          <Route
            path="/page2"
            component={Page2}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>

  );
}

const mapStateToProps = ({ router }) => ({
  router
});

export default connect(mapStateToProps)(App);
