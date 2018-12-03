import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { append, includes, without, sortBy, prop, length, path } from 'ramda'
import { fetchSymbols, selectSymbols } from '../../redux/reducers/symbols'
import { Container, ButtonWrap } from './styled'
import InsertButton from '../../components/InsertButton'
import { createFolders, groupByFolders } from './helpers'
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
      renameSymbol: '',
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

  handleDispatch = count => {
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
      renameSymbol: symbol,
      modal: true,
    })

  handleCloseModal = () => this.setState({ modal: false })

  handleChangeValue = e => this.setState({ renameSymbol: e.target.value })

  render() {
    const { loading, symbols, message } = this.props
    const { selectedSymbols, selectedFolder, modal, renameSymbol } = this.state
    const sortedSymbols = sortBy(prop('name'))(symbols)
    const count = length(selectedSymbols)
    const folders = createFolders(sortedSymbols)
    const groups = groupByFolders(sortedSymbols)
    const selectedGroup = path([selectedFolder], groups)
    const selection = selectedGroup || sortedSymbols

    return (
      <Container>
        <Modal
          show={modal}
          handleShowModal={this.handleCloseModal}
          value={renameSymbol}
          onChangeValue={this.handleChangeValue}
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
            <ButtonWrap onClick={() => this.handleDispatch(count)}>
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
