import React from 'react'
import PropTypes from 'prop-types'
import { toPairs, head, keys, startsWith } from 'ramda'
import {
  SideBarWrap,
  FolderList,
  TopFolder,
  Folder,
  FirstInner,
  SubFolderList,
} from './styled'
import SketchDocumentIcon from '../../assets/SketchDocumentIcon'
import FolderIcon from '../../assets/FolderIcon'

const SideBar = ({ onSelectFolder, folders, selectedFolder }) => (
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
            <FolderIcon />
            <p>{head(f)}</p>
          </Folder>
          <SubFolderList subSelected={startsWith(head(f), selectedFolder)}>
            {keys(f[1]).map(inner => (
              <FirstInner
                onClick={() => onSelectFolder(`${head(f)}/${inner}`)}
                selected={startsWith(`${head(f)}/${inner}`, selectedFolder)}
              >
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
}

export default SideBar
