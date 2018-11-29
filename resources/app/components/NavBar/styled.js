import styled from 'react-emotion'

export const NavBarWrap = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100%;
  height: 72px;
  margin-left: 270px;
`

export const BreadCrums = styled.div`
  font-size: 14px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-left: 32px;
  display: flex;
  align-items: center;
  z-index: 5;

  svg {
    margin-right: 8px;
  }
`
