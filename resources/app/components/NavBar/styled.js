import styled from 'react-emotion'

export const NavBarWrap = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 48px;
  z-index: 10;
  background-color: #fff;
`

export const SearchWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 100%;
  background-color: #f6f6f6;
`

export const BreadCrums = styled.div`
  font-size: 14px;
  margin-left: 32px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`
