import styled, { css } from 'react-emotion'

export const Container = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`

export const SideBar = styled.div`
  width: 270px;
  height: 100%;
  position: fixed;
  left: 0;
  background-color: #f6f6f6;
`

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
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

export const ListWrap = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  width: 100%;
  padding: 72px 32px 72px 302px;
`

export const List = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`

export const SymbolTile = styled.li`
  display: flex;
  align-items: center;
  padding-left: 8px;
  position: relative;
  width: 100%;
  height: 32px;
  background-color: #f6f6f6;
  margin-bottom: 8px;
  border: 2px solid #fff;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    border: 2px solid #72d1fb;
  }

  ${p =>
    p.selected &&
    css`
      border: 2px solid #d941f1;
    `};
`

export const Label = styled.p`
  font-size: 16px;
  text-align: center;
`

export const SymbolPath = styled.p`
  font-size: 14px;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -22px;
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

export const ButtonWrap = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  height: 50px;
  right: 32px;
  top: 0;
`
