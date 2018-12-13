import styled, { css } from 'react-emotion'

/* List of symbols */
export const ListStyled = styled.ul`
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
