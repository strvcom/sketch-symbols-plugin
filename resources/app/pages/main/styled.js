import styled, { css } from 'react-emotion'

/* Main containers */
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
/* End of main containers */

/* List of symbols */
export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const SymbolTileWrap = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 64px;
  margin-bottom: 8px;
  background-color: #f6f6f6;
  border: 2px solid #f6f6f6;
  border-radius: 2px;

  &:hover {
    border: 2px solid #72d1fb;
  }

  ${p =>
    p.selected &&
    css`
      border: 2px solid #72d1fb;
    `};
`

export const SymbolTile = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  width: 90%;
  height: 100%;
  cursor: pointer;

  svg {
    margin-left: 20px;
    margin-right: 8px;
  }
`

export const SymbolPath = styled.p`
  font-size: 14px;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -22px;
`

export const EditWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 10%;
  height: 100%;
  padding-top: 4px;
  cursor: pointer;

  svg {
    margin: 0 24px 0 0;
  }
`
/* End of symbol list components */

/* Folder list */
export const FolderList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Folder = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
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
`

export const TopFolder = styled(Folder)`
  height: 72px;
  margin-bottom: 0;

  svg {
    margin-left: 24px;
  }
`
/* End of folder compoents */

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  margin-right: 32px;
`
