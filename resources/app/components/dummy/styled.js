import styled from 'react-emotion'

export const Container = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`

export const SideBar = styled.div`
  width: 25%;
  height: 100%;
  background-color: #f5f9fa;
`

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: ${props => (props.gray ? '#f5f9fa' : '#fff')};
`

export const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 50px;
  margin-left: 50px;
`

export const SymbolTile = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(33% - 24px);
  height: 100px;
  margin: 8px 4px 0 4px;
  background-color: #f5f9fa;
`

export const Label = styled.p`
  font-size: 16px;
  text-align: center;
`
