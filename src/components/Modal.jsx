import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useActions } from '../hooks/use-actions';
import { Button, Modal } from 'semantic-ui-react';

const ModalComponent = ({ recipeId }) => {
  const { deleteRecipe, openModal, closeModal } = useActions();
  const dispatch = useDispatch();
  const { open, size, dimmer } = useSelector(state => state.modal);

  let history = useHistory();

  const onDelete = () => {
    deleteRecipe(recipeId, history);
    dispatch(closeModal())
  }

  return (
    <Modal
      open={open}
      onClose={() => dispatch(closeModal())}
      onOpen={() => dispatch(openModal())}
      size={size}
      dimmer={dimmer}
    >
      <Modal.Header>Confirm Delete Recipe?</Modal.Header>
      <Modal.Content>
        <p>
          This action is irreversible. Are you sure?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => dispatch(closeModal())}>
          No
        </Button>
        <Button positive onClick={() => onDelete()}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalComponent;