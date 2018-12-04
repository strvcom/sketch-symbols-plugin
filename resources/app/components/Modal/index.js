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

const Modal = ({
  show,
  handleShowModal,
  value,
  onChangeValue,
  handleRename,
  id,
}) => (
  <OverlayWrap show={show}>
    <ModalWrap>
      <ModalHeader>Rename Symbol</ModalHeader>
      <ModalContent>
        <Label>Symbol Name</Label>
        <Label>{id}</Label>
        <Input type="text" value={value} onChange={onChangeValue} />
        <ButtonRow>
          <Button onClick={() => handleShowModal()}>Cancel</Button>
          <Button primary onClick={() => handleRename()}>
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
  handleRename: PropTypes.func.isRequired,
  value: PropTypes.string,
  onChangeValue: PropTypes.func,
  id: PropTypes.string,
}

const mapStateToProps = state => ({
  loading: state.symbols.loading,
})

export default connect(mapStateToProps)(Modal)
