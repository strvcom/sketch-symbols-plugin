import styled, { css } from 'react-emotion'

export const Container = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`

export const SideBar = styled.aside`
  width: 270px;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 5;
  background-color: #f6f6f6;
  overflow: scroll;
`

export const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 0;
  width: 100%;
  padding: 72px 32px 72px 302px;
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
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

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  margin-right: 32px;
`

export const FolderList = styled.ul`
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Folder = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 8px;
  position: relative;
  width: 100%;
  height: 32px;
  margin-bottom: 8px;

  &:hover {
    background-color: rgba(52, 53, 54, 0.05);
  }

  ${p =>
    p.selected &&
    css`
      background-color: #0880f6;
      color: #fff;

      &:hover {
        background-color: #0880f6;
      }
    `};

  svg {
    margin-right: 8px;
    margin-left: 56px;
  }

  ${p =>
    p.mainFolder &&
    css`
      svg {
        margin-left: 24px;
      }
    `};
`
