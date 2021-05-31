import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../app/store'
import { useActions } from '../hooks/use-actions';
import CoreModal from './CoreModal';
import { Modal } from 'semantic-ui-react';

const ModalComponent = ({ recipeId }) => {
  const { deleteRecipe, openModal, closeModal, fetchRecipe, getAllRecipes } = useActions();
  const dispatch = useDispatch();
  const { open, size, dimmer } = useSelector(state => state.modal);
  const recipe = useSelector(state => state.recipes.all[recipeId])
  const recipes = useSelector(state => state.recipes);

  const onDelete = () => {
    fetchRecipe(recipe)
    deleteRecipe(recipe.id, history);
    const filtered = Object.assign({}, Object.fromEntries(Object.entries(recipes).filter(([k, v]) => v !== recipes.all)), {all: [recipes.all.filter(recipe => recipe.id !== recipeId)][0]})
    history.push('/recipes', filtered)
    closeModal();
    getAllRecipes(filtered);
  }

  return (
    <CoreModal
      open={open}
      onClose={() => dispatch(closeModal())}
      onOpen={() => dispatch(openModal())}
      size={size}
      dimmer={dimmer}
      onDelete={() => onDelete()}
    />
  )
}

Modal.propTypes = {
  recipeId: PropTypes.string,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  size: PropTypes.string,
}

export default ModalComponent;