import React from 'react'
import { head, startsWith, includes } from 'ramda'

import { FirstInner, StatusDot } from './styled'
import FolderIcon from '../../assets/FolderIcon'
// import SymbolIcon from '../../assets/SymbolIcon'
import { getInnerFolders } from '../SideBar/helpers'

const SubFolder = ({
  topFolder,
  inner,
  selectedFolder,
  selectedSymbols,
  onSelectFolder,
}) => (
  <FirstInner
    onClick={() => onSelectFolder(`${head(topFolder)}/${head(inner)}`)}
    selected={startsWith(`${head(topFolder)}/${head(inner)}`, selectedFolder)}
  >
    <StatusDot
      hasSelectedSymbol={includes(
        `${head(topFolder)}/${head(inner)}`,
        getInnerFolders(selectedSymbols)
      )}
    />
    <FolderIcon />
    <p>{head(inner)}</p>
  </FirstInner>
)

export default SubFolder
