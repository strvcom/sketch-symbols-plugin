import React from 'react'
import PropTypes from 'prop-types'
import { BottomBarWrap, CountWrap, SymbolsCount, MessageWrap } from './styled'

const BottomBar = ({ count, message, children }) => (
  <BottomBarWrap>
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
}

export default BottomBar
