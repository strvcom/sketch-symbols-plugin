import styled, { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  color: ${props => props.theme.text};
`

export const TabBar = styled.div`
  position: fixed;
  z-index: 1;
  ul {
    /* margin-left: 20px; */ /* bring back this if titlebar is hidden */
    display: flex;
    list-style: none;
  }
`

export const Tab = styled(NavLink)`
  height: 30px;
  margin-left: 20px;
  padding-bottom: 4px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => props.theme.heavyText};
  text-decoration: none;
  font-size: 1.5rem;
  opacity: 0.5;
  transition: all 0.2s;
  font-weight: 900;
  letter-spacing: -0.45px;
  border-bottom: 1px solid transparent;

  &:hover {
    opacity: 1;
  }

  &[disabled],
  &[disabled]:hover {
    opacity: 0.5;
    text-decoration: line-through;
  }
`

export const TabContent = styled.div`
  flex: 1;
  background: ${props => props.theme.background};
  overflow: auto;
  display: flex;
  flex-direction: row;
`

export const Label = styled.span`
  font-size: 13px;
  text-transform: capitalize;
  font-weight: normal;
  padding-top: 3px;
`

export const SelectedTab = theme => css`
  opacity: 1 !important;
  border-bottom: 1px solid ${theme.primary} !important;
`
