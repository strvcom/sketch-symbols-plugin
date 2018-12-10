import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  append,
  includes,
  without,
  sortBy,
  prop,
  length,
  startsWith,
} from 'ramda'
import {
  fetchSymbols,
  selectSymbols,
  renameSymbol,
} from '../../redux/reducers/symbols'
import { Container, ButtonWrap } from './styled'
import InsertButton from '../../components/InsertButton'
import { createTree } from './helpers'
import NavBar from '../../components/NavBar'
import BottomBar from '../../components/BottomBar'
import SideBar from '../../components/SideBar'
import SymbolsList from '../../components/SymbolsList'
import Modal from '../../components/Modal'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSymbols: [],
      selectedFolder: '',
      modal: false,
      newSymbolName: '',
      newSymbolId: '',
    }
  }

  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch(fetchSymbols())
  }

  handleSelectFolder = folder =>
    this.setState({
      selectedFolder: folder,
    })

  handleSelectSymbol = s => {
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

  handleDispatchInsert = count => {
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

  handleShowModal = symbol =>
    this.setState({
      newSymbolName: symbol.name,
      newSymbolId: symbol.symbolId,
      modal: true,
    })

  handleCloseModal = () => {
    this.setState({ modal: false })
  }

  handleChangeValue = e =>
    this.setState({
      newSymbolName: e.target.value,
    })

  handleDispatchRename = () => {
    const { dispatch } = this.props
    const { newSymbolName, newSymbolId } = this.state
    const symbolToModify = {
      name: newSymbolName,
      symbolId: newSymbolId,
    }
    dispatch(renameSymbol(symbolToModify))
    dispatch(fetchSymbols())
    this.setState({
      modal: false,
    })
  }

  render() {
    // props and state
    const { loading, symbols, message } = this.props
    const { selectedSymbols, selectedFolder, modal, newSymbolName } = this.state

    // Sort by name and selection length
    const sortedSymbols = sortBy(prop('name'))(symbols)
    const count = length(selectedSymbols)

    // folders and groups
    const folders = createTree(sortedSymbols)
    const filtered = sortedSymbols.filter(s =>
      startsWith(selectedFolder, s.name)
    )

    // selection to render
    const selection = selectedFolder ? filtered : sortedSymbols

    return (
      <Container>
        <Modal
          show={modal}
          value={newSymbolName}
          onChangeValue={this.handleChangeValue}
          handleRename={this.handleDispatchRename}
          handleCloseModal={this.handleCloseModal}
        />
        <NavBar selectedFolder={selectedFolder} message={message} />
        <SideBar
          onSelectFolder={this.handleSelectFolder}
          folders={folders}
          selectedFolder={selectedFolder}
        />
        <SymbolsList
          loading={loading}
          selection={selection}
          selectedSymbols={selectedSymbols}
          handleSelectSymbol={this.handleSelectSymbol}
          handleShowModal={this.handleShowModal}
        >
          <BottomBar count={count} active={count}>
            <ButtonWrap onClick={() => this.handleDispatchInsert(count)}>
              <InsertButton inactive={!count} />
            </ButtonWrap>
          </BottomBar>
        </SymbolsList>
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
