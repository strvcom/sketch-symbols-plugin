import React from 'react'
import PropTypes from 'prop-types'
import { BottomBarWrap, CountWrap, SymbolsCount } from './styled'

const BottomBar = ({ count, children, active }) => (
  <BottomBarWrap active={active}>
    <CountWrap>
      <SymbolsCount>{count}</SymbolsCount>
      {count > 1 ? 'Symbols ' : 'Symbol '}
      selected
    </CountWrap>
    {children}
  </BottomBarWrap>
)

BottomBar.propTypes = {
  count: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
}

export default BottomBar
