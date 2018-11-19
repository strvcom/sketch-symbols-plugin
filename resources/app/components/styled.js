import styled from 'react-emotion'

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  color: ${props => props.theme.text};
`

export const TabContent = styled.div`
  flex: 1;
  background: ${props => props.theme.background};
  overflow: auto;
  display: flex;
  flex-direction: row;
`
