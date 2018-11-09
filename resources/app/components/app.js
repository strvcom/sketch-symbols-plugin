/* globals document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ThemeProvider } from 'emotion-theming'
import {
  Container,
  TabBar,
  Tab,
  Label,
  TabContent,
  SelectedTab,
} from './styled'
import bridgeHandler from '../handler'
import getTheme from '../theme'

const tabs = [
  {
    url: '/elements',
    label: 'Elements',
  },
]

class App extends Component {
  constructor(props) {
    super(props)
    bridgeHandler(props.dispatch)
    this.navigateToTab = this.navigateToTab.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', event => {
      if (event.key === 'Tab' && event.ctrlKey) {
        this.navigateToTab(event.shiftKey ? 'prev' : 'next')
      }
    })
  }

  navigateToTab(direction) {
    const { location, history } = this.props
    const currentTabIndex = tabs.findIndex(t => t.url === location.pathname)
    history.push(
      tabs[
        Math.max(
          Math.min(
            currentTabIndex + (direction === 'next' ? 1 : -1),
            tabs.length - 1
          ),
          0
        )
      ].url
    )
  }

  render() {
    const { children, theme } = this.props
    const myTheme = getTheme(theme)
    return (
      <ThemeProvider theme={myTheme}>
        <Container>
          <TabBar>
            <ul>
              {tabs.map(t => (
                <li key={t.url}>
                  <Tab to={t.url} activeClassName={SelectedTab(myTheme)}>
                    <Label>{t.label}</Label>
                  </Tab>
                </li>
              ))}
            </ul>
          </TabBar>
          <TabContent>{children}</TabContent>
        </Container>
      </ThemeProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  theme: PropTypes.string,
}

export default withRouter(
  connect(state => ({
    theme: state.settings.theme,
  }))(App)
)
