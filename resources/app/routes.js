import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'

import App from './components/app'
import Elements from './components/elements'
import NotFound from './components/404'

export default () => (
  <HashRouter>
    <App>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/elements" />} />
        <Route exact path="/elements" component={Elements} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </HashRouter>
)
