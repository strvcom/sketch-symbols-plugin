import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'

import App from './components/app'
import Dummy from './components/dummy'
import NotFound from './components/not-found'

export default () => (
  <HashRouter>
    <App>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dummy" />} />
        <Route exact path="/dummy" component={Dummy} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </HashRouter>
)
