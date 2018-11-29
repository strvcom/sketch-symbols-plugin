import React from 'react'
import PropTypes from 'prop-types'
import { BottomBarWrap, CountWrap, SymbolsCount, MessageWrap } from './styled'

const BottomBar = ({ count, message, children, active }) => (
  <BottomBarWrap active={active}>
    <CountWrap>
      <SymbolsCount>{count}</SymbolsCount>
      {count > 1 ? 'Symbols ' : 'Symbol '}
      selected
    </CountWrap>
    <MessageWrap hidden={!message}>{message}</MessageWrap>
    {children}
  </BottomBarWrap>
)

BottomBar.propTypes = {
  count: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
}

export default BottomBar
