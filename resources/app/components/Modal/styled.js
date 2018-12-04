import styled from 'react-emotion'

export const OverlayWrap = styled.div`
  display: ${p => (p.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
`

export const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 425px;
  height: 238px;
  background-color: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15), 0 25px 30px 0 rgba(0, 0, 0, 0.35);
  border-radius: 4px;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid #d6d7d8;
  background-image: linear-gradient(-180deg, #f5f6f6 0%, #eeeff0 100%);
  text-transform: uppercase;
  font-size: 12px;
`

export const ModalContent = styled.form`
  display: flex;
  flex-direction: column;
  padding: 32px;
  width: 100%;
  height: calc(100% - 32px);
`

export const Label = styled.div`
  display: flex;
  margin-bottom: 8px;
`

export const Input = styled.input`
  display: flex;
  width: 100%;
  height: 40px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  align-items: center;
  padding-left: 16px;
  font-size: 14px;
  margin-bottom: 32px;
  user-select: auto;
`

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 129px;
  height: 40px;
  background-color: ${p => (p.primary ? '#0880F6' : '#f1f2f3')};
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  color: ${p => (p.primary ? '#fff' : 'black')};
  font-size: 12px;
  margin-left: 8px;
`
