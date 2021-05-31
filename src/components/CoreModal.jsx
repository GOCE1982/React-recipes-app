import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react';

const CoreModal = ({ open, onClose, onOpen, size, dimmer, onDelete }) => {

  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      onOpen={() => onOpen()}
      size={size}
      dimmer={dimmer}
    >
      <Modal.Header>Confirm Recipe Removal</Modal.Header>
      <Modal.Content>
        <h4>
          Are you sure you want to delete this recipe?
        </h4>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => onClose()}>
          No
        </Button>
        <Button positive onClick={() => onDelete()}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

CoreModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  size: PropTypes.string,
  dimmer: PropTypes.string
}

export default CoreModal;