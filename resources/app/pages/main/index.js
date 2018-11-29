import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { append, includes, without, sortBy, prop, length, path } from 'ramda'
import { fetchSymbols, selectSymbols } from '../../redux/reducers/symbols'
import {
  Container,
  List,
  SymbolTile,
  SideBar,
  ListWrap,
  ButtonWrap,
  BottomBar,
  SymbolsCount,
  MessageWrap,
  CountWrap,
  FolderList,
  Folder,
} from './styled'
import FolderIcon from '../../assets/FolderIcon'
import InsertButton from '../../components/InsertButton'
import SketchDocumentIcon from '../../assets/SketchDocumentIcon'
import { createFolders, groupByFolders } from './helpers'
import NavBar from '../../components/NavBar'

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
    const folders = createFolders(sortedSymbols)
    const groups = groupByFolders(sortedSymbols)
    const selectedGroup = path([selectedFolder], groups)
    const selection = selectedGroup || sortedSymbols

    return (
      <Container>
        <NavBar selectedFolder={selectedFolder} />
        <SideBar>
          <FolderList>
            <React.Fragment>
              <Folder
                mainFolder
                onClick={() =>
                  this.setState({
                    selectedFolder: '',
                  })
                }
              >
                <SketchDocumentIcon />
                Document
              </Folder>
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
            </React.Fragment>
          </FolderList>
        </SideBar>
        <ListWrap>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <List>
              {selection.map(s => (
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
                count > 0
                  ? dispatch(selectSymbols(selectedSymbols)).then(
                      this.setState({
                        selectedSymbols: [],
                      })
                    )
                  : null
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
