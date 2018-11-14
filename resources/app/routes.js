import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'

import App from './components/app'
import Dummy from './components/dummy'

export default () => (
  <HashRouter>
    <App>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dummy" />} />
        <Route component={Dummy} />
      </Switch>
    </App>
  </HashRouter>
)
