/* globals document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ThemeProvider } from 'emotion-theming'
import { Container, TabContent } from './styled'
import getTheme from '../theme'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children, theme } = this.props
    const myTheme = getTheme(theme)
    return (
      <ThemeProvider theme={myTheme}>
        <Container>
          <TabContent>{children}</TabContent>
        </Container>
      </ThemeProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func,
  theme: PropTypes.string,
}

export default withRouter(
  connect(state => ({
    theme: state.settings.theme,
  }))(App)
)
