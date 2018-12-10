import React from 'react'
import PropTypes from 'prop-types'
import { toPairs, head, keys } from 'ramda'
import {
  SideBarWrap,
  FolderList,
  TopFolder,
  Folder,
  FirstInner,
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
            selected={selectedFolder === head(f)}
          >
            <FolderIcon />
            {head(f)}
          </Folder>
          <FolderList>
            {keys(f[1]).map(inner => (
              <FirstInner onClick={() => onSelectFolder(`${head(f)}/${inner}`)}>
                <FolderIcon />
                {inner}
              </FirstInner>
            ))}
          </FolderList>
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
