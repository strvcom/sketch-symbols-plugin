import styled, { css } from 'react-emotion'

export const SideBarWrap = styled.aside`
  width: 270px;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 5;
  background-color: #f6f6f6;
  overflow: scroll;
`

export const StatusDot = styled.div`
  display: none;
  position: absolute;
  left: 16px;
  width: 8px;
  height: 8px;
  background-color: #0880f6;
  border-radius: 4px;

  ${p =>
    p.hasSelectedSymbol &&
    css`
      display: flex;
    `};
`

/* Folder list */
export const FolderList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const SubFolderList = styled(FolderList)`
  display: none;

  ${p =>
    p.subSelected &&
    css`
      display: flex;
    `};
`

export const Folder = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 32px;
  margin-bottom: 8px;

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: rgba(52, 53, 54, 0.05);
  }

  ${p =>
    p.subSelected &&
    css`
      background-color: rgba(8, 128, 246, 0.05);
      color: #0880f6;

      &:hover {
        background-color: rgba(52, 53, 54, 0.05);
      }
    `};

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

export const FirstInner = styled(Folder)`
  svg {
    margin-left: 72px;
  }
`
/* End of folder components */
