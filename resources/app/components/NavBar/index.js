import React from 'react'
import PropTypes from 'prop-types'
import { NavBarWrap, BreadCrums, MessageWrap } from './styled'
import FolderIcon from '../../assets/FolderIcon'

const NavBar = ({ selectedFolder, message }) => (
  <NavBarWrap>
    <BreadCrums>
      <FolderIcon />
      {selectedFolder ? `${selectedFolder} ...` : 'All symbols ...'}
    </BreadCrums>
    <MessageWrap hidden={!message}>{message}</MessageWrap>
  </NavBarWrap>
)

NavBar.propTypes = {
  selectedFolder: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default NavBar
