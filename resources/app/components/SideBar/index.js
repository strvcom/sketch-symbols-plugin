import React from 'react'
import PropTypes from 'prop-types'
import { toPairs, head, keys, startsWith, includes } from 'ramda'
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
import { getTopFolders, getInnerFolders } from './helpers'

const SideBar = ({
  onSelectFolder,
  folders,
  selectedFolder,
  selectedSymbols,
}) => (
  <SideBarWrap>
    <FolderList>
      <TopFolder onClick={() => onSelectFolder('')}>
        <SketchDocumentIcon />
        Document
      </TopFolder>
      {toPairs(folders).map(f => (
        <React.Fragment>
          <Folder
            onClick={() => onSelectFolder(head(f))}
            selected={
              startsWith(head(f), selectedFolder) && selectedFolder === head(f)
            }
            subSelected={startsWith(head(f), selectedFolder)}
          >
            <StatusDot
              hasSelectedSymbol={includes(
                head(f),
                getTopFolders(selectedSymbols)
              )}
            />
            <FolderIcon />
            <p>{head(f)}</p>
          </Folder>
          <SubFolderList subSelected={startsWith(head(f), selectedFolder)}>
            {keys(f[1]).map(inner => (
              <FirstInner
                onClick={() => onSelectFolder(`${head(f)}/${inner}`)}
                selected={startsWith(`${head(f)}/${inner}`, selectedFolder)}
              >
                <StatusDot
                  hasSelectedSymbol={includes(
                    `${head(f)}/${inner}`,
                    getInnerFolders(selectedSymbols)
                  )}
                />
                <FolderIcon />
                <p>{inner}</p>
              </FirstInner>
            ))}
          </SubFolderList>
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
