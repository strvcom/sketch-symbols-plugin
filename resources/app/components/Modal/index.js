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
  value,
  onChangeValue,
  handleRename,
  handleCloseModal,
}) => (
  <OverlayWrap show={show}>
    <ModalWrap>
      <ModalHeader>Rename Symbol</ModalHeader>
      <ModalContent onSubmit={() => handleRename()}>
        <Label>Symbol Name</Label>
        <Input type="text" value={value} onChange={onChangeValue} />
        <ButtonRow>
          <Button onClick={() => handleCloseModal()}>Cancel</Button>
          <Button primary onClick={() => handleRename()}>
            Rename
          </Button>
        </ButtonRow>
      </ModalContent>
    </ModalWrap>
  </OverlayWrap>
)

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  handleRename: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func,
  show: PropTypes.bool.isRequired,
  value: PropTypes.string,
}

const mapStateToProps = state => ({
  loading: state.symbols.loading,
})

export default connect(mapStateToProps)(Modal)
