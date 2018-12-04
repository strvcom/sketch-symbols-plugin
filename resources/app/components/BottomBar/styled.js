import styled, { css } from 'react-emotion'

export const BottomBarWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: -72px;
  right: 0;
  width: 870px;
  height: 72px;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0 -10px 20px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.5s;

  ${p =>
    p.active &&
    css`
      bottom: 0;
    `};
`

export const CountWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SymbolsCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0880f6;
  border-radius: 4px;
  height: 20px;
  padding: 0 5px;
  margin-right: 8px;
  margin-left: 32px;
  color: #fff;
`

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  margin-right: 32px;
`
