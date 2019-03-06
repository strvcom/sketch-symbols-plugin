import styled from 'react-emotion'

export const NavBarWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 5;
  width: calc(100% - 270px);
  height: 72px;
  margin-left: 270px;
  background-color: #fff;
`

export const BreadCrums = styled.div`
  font-size: 14px;
  height: 100%;
  margin-left: 32px;
  display: flex;
  align-items: center;
  z-index: 5;

  svg {
    margin-right: 8px;
  }
`

export const MessageWrap = styled.div`
  visibility: ${p => (p.hidden ? 'hidden' : 'visible')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(29, 194, 129, 0.1);
  height: 32px;
  padding: 0 16px;
  border-radius: 4px;
  color: #1dc281;
  margin-right: 32px;
`
