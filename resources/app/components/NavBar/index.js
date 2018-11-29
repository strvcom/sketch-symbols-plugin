import React from 'react'
import PropTypes from 'prop-types'
import { NavBarWrap, BreadCrums, SearchWrap } from './styled'
import FolderIcon from '../../assets/FolderIcon'

const NavBar = ({ selectedFolder }) => (
  <NavBarWrap>
    <SearchWrap />
    <BreadCrums>
      <FolderIcon />
      {selectedFolder ? `${selectedFolder} ...` : 'All symbols ...'}
    </BreadCrums>
  </NavBarWrap>
)

NavBar.propTypes = {
  selectedFolder: PropTypes.string.isRequired,
}

export default NavBar
