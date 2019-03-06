import React from 'react'
import PropTypes from 'prop-types'
import { ListWrap } from './styled'
import List from '../List'

const SymbolsList = ({
  loading,
  selection,
  selectedSymbols,
  children,
  handleSelectSymbol,
  handleShowModal,
}) => (
  <ListWrap>
    {loading ? (
      <div>Loading...</div>
    ) : (
      <List
        selection={selection}
        selectedSymbols={selectedSymbols}
        handleSelectSymbol={handleSelectSymbol}
        handleShowModal={handleShowModal}
        id="list"
      />
    )}
    {children}
  </ListWrap>
)

SymbolsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleSelectSymbol: PropTypes.func.isRequired,
  selection: PropTypes.arrayOf.isRequired,
  selectedSymbols: PropTypes.arrayOf.isRequired,
  handleShowModal: PropTypes.func,
}

export default SymbolsList
