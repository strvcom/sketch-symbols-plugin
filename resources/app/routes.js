import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'

import App from './components/App'
import Main from './pages/Main'
import NotFound from './pages/NotFound'

export default () => (
  <HashRouter>
    <App>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/main" />} />
        <Route exact path="/main" component={Main} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </HashRouter>
)
