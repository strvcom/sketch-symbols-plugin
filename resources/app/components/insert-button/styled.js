import styled from 'react-emotion'

export const StyledButton = styled.button`
  height: 40px;
  width: 129px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0880f6;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${p => (p.inactive ? 0.5 : 1)};
`

export const Label = styled.div`
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
`
