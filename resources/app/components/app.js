import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ThemeProvider } from 'emotion-theming'
import { Container, TabContent } from './styled'
import getTheme from '../theme'
import bridgeHandler from '../handler'

class App extends Component {
  constructor(props) {
    super(props)
    bridgeHandler(props.dispatch)
  }

  componentDidMount() {}

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
  theme: PropTypes.string,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  theme: state.settings.theme,
})

export default withRouter(connect(mapStateToProps)(App))
