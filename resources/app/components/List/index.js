import React from 'react'
import PropTypes from 'prop-types'
import { includes } from 'ramda'
import { ListStyled, SymbolTileWrap, SymbolTile, EditWrap } from './styled'
import SymbolIcon from '../../assets/SymbolIcon'
import EditIcon from '../../assets/EditIcon'

const List = ({
  selection,
  handleSelectSymbol,
  handleShowModal,
  selectedSymbols,
}) => (
  <ListStyled>
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
  </ListStyled>
)

List.propTypes = {
  selection: PropTypes.arrayOf.isRequired,
  selectedSymbols: PropTypes.arrayOf.isRequired,
  handleSelectSymbol: PropTypes.func.isRequired,
  handleShowModal: PropTypes.func,
}

export default List
