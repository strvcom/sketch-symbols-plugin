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
  FolderList,
  Folder,
  TopFolder,
} from './styled'
import FolderIcon from '../../assets/FolderIcon'
import InsertButton from '../../components/InsertButton'
import SketchDocumentIcon from '../../assets/SketchDocumentIcon'
import { createFolders, groupByFolders } from './helpers'
import NavBar from '../../components/NavBar'
import BottomBar from '../../components/BottomBar'
import SymbolIcon from '../../assets/SymbolIcon'

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

  handleSelectFolder(folder) {
    return this.setState({
      selectedFolder: folder,
    })
  }

  handleSelectSymbol(s) {
    const { selectedSymbols } = this.state
    if (includes(s.symbolId, selectedSymbols)) {
      this.setState({
        selectedSymbols: without(s.symbolId, selectedSymbols),
      })
    } else {
      this.setState({
        selectedSymbols: append(s.symbolId, selectedSymbols),
      })
    }
  }

  handleDispatch(count) {
    const { dispatch } = this.props
    const { selectedSymbols } = this.state
    if (count > 0) {
      dispatch(selectSymbols(selectedSymbols)).then(
        this.setState({
          selectedSymbols: [],
        })
      )
    }
  }

  render() {
    const { loading, symbols, message } = this.props
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
            <TopFolder mainFolder onClick={() => this.handleSelectFolder('')}>
              <SketchDocumentIcon />
              Document
            </TopFolder>
            {folders.map(f => (
              <Folder
                onClick={() => this.handleSelectFolder(f)}
                selected={selectedFolder === f}
              >
                <FolderIcon />
                {f}
              </Folder>
            ))}
          </FolderList>
        </SideBar>
        <ListWrap>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <List>
              {selection.map(s => (
                <SymbolTile
                  onClick={() => this.handleSelectSymbol(s)}
                  selected={includes(s.symbolId, selectedSymbols)}
                >
                  <SymbolIcon />
                  {s.name}
                </SymbolTile>
              ))}
            </List>
          )}
          <BottomBar count={count} message={message} active={count}>
            <ButtonWrap onClick={() => this.handleDispatch(count)}>
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
