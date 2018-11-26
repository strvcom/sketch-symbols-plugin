import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { append, includes, without, sortBy, prop, length } from 'ramda'
import { fetchSymbols, selectSymbols } from '../../redux/reducers/symbols'
import {
  Container,
  List,
  SymbolTile,
  SideBar,
  NavBar,
  ListWrap,
  SearchWrap,
  BreadCrums,
  ButtonWrap,
  BottomBar,
  SymbolsCount,
  MessageWrap,
  CountWrap,
  FolderList,
  Folder,
} from './styled'
import FolderIcon from '../../assets/folder-icon'
import InsertButton from '../../components/insert-button'
import createFolders from './helpers'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSymbols: [],
      selectedFolder: '',
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchSymbols())
  }

  render() {
    const { loading, symbols, dispatch, message } = this.props
    const { selectedSymbols, selectedFolder } = this.state
    const sortedSymbols = sortBy(prop('name'))(symbols)
    const count = length(selectedSymbols)
    const folders = createFolders(symbols)

    return (
      <Container>
        <NavBar>
          <SearchWrap />
          <BreadCrums>
            <FolderIcon />
            All symbols ...
          </BreadCrums>
        </NavBar>
        <SideBar>
          <FolderList>
            {folders.map(s => (
              <Folder
                onClick={() =>
                  this.setState({
                    selectedFolder: s,
                  })
                }
                selected={selectedFolder === s}
              >
                <FolderIcon />
                {s}
              </Folder>
            ))}
          </FolderList>
        </SideBar>
        <ListWrap>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <React.Fragment>
              <List>
                {sortedSymbols.map(s => (
                  <SymbolTile
                    onClick={() => {
                      if (includes(s.symbolId, selectedSymbols)) {
                        this.setState({
                          selectedSymbols: without(s.symbolId, selectedSymbols),
                        })
                      } else {
                        this.setState({
                          selectedSymbols: append(s.symbolId, selectedSymbols),
                        })
                      }
                    }}
                    selected={includes(s.symbolId, selectedSymbols)}
                  >
                    {s.name}
                  </SymbolTile>
                ))}
              </List>
              <h2>Folders</h2>
              <FolderList>
                {folders.map(s => (
                  <Folder
                    onClick={() =>
                      this.setState({
                        selectedFolder: s,
                      })
                    }
                    selected={selectedFolder === s}
                  >
                    <FolderIcon />
                    {s}
                  </Folder>
                ))}
              </FolderList>
            </React.Fragment>
          )}
          <BottomBar>
            <CountWrap>
              <SymbolsCount>{count}</SymbolsCount>
              {count > 1 ? 'Symbols ' : 'Symbol '}
              selected
            </CountWrap>
            <MessageWrap hidden={!message}>{message}</MessageWrap>
            <ButtonWrap
              onClick={() =>
                count > 0 ? dispatch(selectSymbols(selectedSymbols)) : null
              }
            >
              <InsertButton inactive={!count} />
            </ButtonWrap>
          </BottomBar>
        </ListWrap>
      </Container>
    )
  }
}

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
  symbols: PropTypes.arrayOf,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  loading: state.symbols.loading,
  symbols: state.symbols.symbols,
  message: state.symbols.message,
})

export default withRouter(connect(mapStateToProps)(Main))
