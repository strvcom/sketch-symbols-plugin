import React from 'react'
import PropTypes from 'prop-types'
import { SideBarWrap, FolderList, TopFolder, Folder } from './styled'
import SketchDocumentIcon from '../../assets/SketchDocumentIcon'
import FolderIcon from '../../assets/FolderIcon'

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { onSelectFolder, folders, selectedFolder } = this.props
    return (
      <SideBarWrap>
        <FolderList>
          <TopFolder onClick={() => onSelectFolder('')}>
            <SketchDocumentIcon />
            Document
          </TopFolder>
          {folders.map(f => (
            <Folder
              onClick={() => onSelectFolder(f)}
              selected={selectedFolder === f}
            >
              <FolderIcon />
              {f}
            </Folder>
          ))}
        </FolderList>
      </SideBarWrap>
    )
  }
}

SideBar.propTypes = {
  onSelectFolder: PropTypes.func,
  folders: PropTypes.arrayOf,
  selectedFolder: PropTypes.string,
}

export default SideBar