import React from 'react'
import PropTypes from 'prop-types'
import { includes } from 'ramda'
import { ListWrap, List, SymbolTileWrap, SymbolTile, EditWrap } from './styled'
import SymbolIcon from '../../assets/SymbolIcon'
import EditIcon from '../../assets/EditIcon'

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
      <List>
        {selection.map(s => (
          <SymbolTileWrap selected={includes(s.symbolId, selectedSymbols)}>
            <SymbolTile onClick={() => handleSelectSymbol(s)}>
              <SymbolIcon />
              {s.name}
            </SymbolTile>
            <EditWrap onClick={() => handleShowModal(s)}>
              <EditIcon />
            </EditWrap>
          </SymbolTileWrap>
        ))}
      </List>
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
