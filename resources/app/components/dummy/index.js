import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchSymbols } from '../../redux/reducers/symbols'
import {
  Container,
  List,
  SymbolTile,
  SideBar,
  NavBar,
  ListWrap,
} from './styled'
import formatName from './helpers'

class Dummy extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchSymbols())
  }

  render() {
    const { loading, symbols } = this.props
    return (
      <Container>
        <SideBar>
          <NavBar gray />
        </SideBar>
        <ListWrap>
          <NavBar />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <List>
              {symbols.map(s => (
                <SymbolTile>{formatName(s)}</SymbolTile>
              ))}
            </List>
          )}
        </ListWrap>
      </Container>
    )
  }
}

Dummy.propTypes = {
  dispatch: PropTypes.func.isRequired,
  symbols: PropTypes.arrayOf,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  loading: state.symbols.loading,
  symbols: state.symbols.symbols,
})

export default withRouter(connect(mapStateToProps)(Dummy))
