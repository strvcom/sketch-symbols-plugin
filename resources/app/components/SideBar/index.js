import React from 'react'
import PropTypes from 'prop-types'
import {
  toPairs,
  head,
  keys,
  startsWith,
  includes,
  length,
  equals,
} from 'ramda'
import {
  SideBarWrap,
  FolderList,
  TopFolder,
  Folder,
  FirstInner,
  SubFolderList,
  StatusDot,
} from './styled'
import SketchDocumentIcon from '../../assets/SketchDocumentIcon'
import FolderIcon from '../../assets/FolderIcon'
import SymbolIcon from '../../assets/SymbolIcon'
import { getTopFolders, getInnerFolders } from './helpers'

const SideBar = ({
  onSelectFolder,
  folders,
  selectedFolder,
  selectedSymbols,
}) => (
  <SideBarWrap>
    <FolderList>
      <TopFolder onClick={() => onSelectFolder({ name: '' })}>
        <SketchDocumentIcon />
        Document
      </TopFolder>
      {toPairs(folders).map(mainFolder => (
        <React.Fragment>
          <Folder
            onClick={() => onSelectFolder({ name: head(mainFolder) })}
            selected={
              startsWith(head(mainFolder), selectedFolder) &&
              selectedFolder === head(mainFolder)
            }
            subSelected={startsWith(head(mainFolder), selectedFolder)}
          >
            <StatusDot
              hasSelectedSymbol={includes(
                head(mainFolder),
                getTopFolders(selectedSymbols)
              )}
            />
            {head(keys(mainFolder[1])) === 'undefined' ? (
              <SymbolIcon />
            ) : (
              <FolderIcon />
            )}
            <p>{head(mainFolder)}</p>
          </Folder>

          {head(keys(mainFolder[1])) !== 'undefined' ? (
            <SubFolderList
              subSelected={startsWith(head(mainFolder), selectedFolder)}
            >
              {toPairs(mainFolder[1]).map(inner => (
                <FirstInner
                  onClick={() =>
                    onSelectFolder({
                      name: `${head(mainFolder)}/${head(inner)}`,
                    })
                  }
                  selected={equals(
                    selectedFolder,
                    `${head(mainFolder)}/${head(inner)}`
                  )}
                >
                  <StatusDot
                    hasSelectedSymbol={includes(
                      `${head(mainFolder)}/${head(inner)}`,
                      getInnerFolders(selectedSymbols)
                    )}
                  />
                  {length(inner[1]) > 1 ? <FolderIcon /> : <SymbolIcon />}
                  <p>{head(inner)}</p>
                </FirstInner>
              ))}
            </SubFolderList>
          ) : null}
        </React.Fragment>
      ))}
    </FolderList>
  </SideBarWrap>
)

SideBar.propTypes = {
  onSelectFolder: PropTypes.func,
  folders: PropTypes.arrayOf,
  selectedFolder: PropTypes.string,
  selectedSymbols: PropTypes.arrayOf,
}

export default SideBar
