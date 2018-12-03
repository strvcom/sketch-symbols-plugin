import React from 'react'
import PropTypes from 'prop-types'
import {
  OverlayWrap,
  ModalWrap,
  ModalHeader,
  ModalContent,
  Label,
  Input,
  Button,
} from './styled'

const Modal = ({ show, handleShowModal, value, onChangeValue }) => (
  <OverlayWrap show={show}>
    <ModalWrap>
      <ModalHeader>Rename Symbol</ModalHeader>
      <ModalContent>
        <Label>Symbol Name</Label>
        <Input type="text" value={value} onChange={onChangeValue} />
        <Button onClick={() => handleShowModal()}>Cancel</Button>
      </ModalContent>
    </ModalWrap>
  </OverlayWrap>
)

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleShowModal: PropTypes.func.isRequired,
  value: PropTypes.string,
  onChangeValue: PropTypes.func,
}

export default Modal

// onClick={() => handleShowModal()}
