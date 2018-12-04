import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  OverlayWrap,
  ModalWrap,
  ModalHeader,
  ModalContent,
  Label,
  Input,
  ButtonRow,
  Button,
} from './styled'

const Modal = ({ show, handleShowModal, value, onChangeValue }) => (
  <OverlayWrap show={show}>
    <ModalWrap>
      <ModalHeader>Rename Symbol</ModalHeader>
      <ModalContent>
        <Label>Symbol Name</Label>
        <Input type="text" value={value} onChange={onChangeValue} />
        <ButtonRow>
          <Button onClick={() => handleShowModal()}>Cancel</Button>
          <Button primary onClick={() => handleShowModal()}>
            Rename
          </Button>
        </ButtonRow>
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

const mapStateToProps = state => ({
  loading: state.symbols.loading,
})

export default connect(mapStateToProps)(Modal)
