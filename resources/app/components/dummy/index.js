import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { append, last, contains, without } from 'ramda'
import { fetchSymbols, selectSymbols } from '../../redux/reducers/symbols'
import {
  Container,
  List,
  SymbolTile,
  SideBar,
  NavBar,
  ListWrap,
  SearchWrap,
  SymbolPath,
  BreadCrums,
  ButtonWrap,
} from './styled'
import FolderIcon from '../../assets/folder-icon'
import InsertButton from '../insert-button'
import formatName from './helpers'

class Dummy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSymbols: [],
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchSymbols())
  }

  render() {
    const { loading, symbols, dispatch } = this.props
    const { selectedSymbols } = this.state
    return (
      <Container>
        <NavBar>
          <SearchWrap />
          <BreadCrums>
            <FolderIcon />
            {last(selectedSymbols)}
          </BreadCrums>
          <ButtonWrap onClick={() => dispatch(selectSymbols(selectedSymbols))}>
            <InsertButton />
          </ButtonWrap>
        </NavBar>
        <SideBar />
        <ListWrap>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <List>
              {symbols.map(s => (
                <SymbolTile
                  onClick={() => {
                    if (contains(s.symbolId, selectedSymbols)) {
                      this.setState({
                        selectedSymbols: without(s.symbolId, selectedSymbols),
                      })
                    } else {
                      this.setState({
                        selectedSymbols: append(s.symbolId, selectedSymbols),
                      })
                    }
                  }}
                  selected={contains(s.symbolId, selectedSymbols)}
                >
                  {formatName(s.name)}
                  <SymbolPath>{s.name}</SymbolPath>
                </SymbolTile>
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
