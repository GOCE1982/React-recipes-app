import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useActions } from '../hooks/use-actions';

import { Card, Button, List, Modal } from 'semantic-ui-react';
import CoreModal from './CoreModal'
import isEmpty from '../helpers/isEmpty';
import { Link, withRouter, useHistory } from 'react-router-dom';

const RecipeShow = ({ match }) => {
  const { fetchRecipe, deleteRecipe, openModal, closeModal } = useActions()
  const dispatch = useDispatch();
  const { open, size, dimmer } = useSelector(state => state.modal);
  const recipe = useSelector(state => state.recipes.all[match.params.recipeId]);
  const history = useHistory()

  // eslint-disable-next-line
  const [firstOpen, setFirstOpen] = useState(false);

  useEffect(() => {
    (async() => {
      fetchRecipe(await recipe);
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onDelete = () => {
    deleteRecipe(recipe.id, history);
    dispatch(closeModal());
  }

  return (<Modal
    className="recipe-show"
    defaultOpen
    centered
    onClose={() => setFirstOpen(false)}
    onOpen={() => setFirstOpen(true)}
    onUnmount={() => history.push('/')}
      // size={size}
      // dimmer={dimmer}
    >
    {recipe ? (
      <>
        <Modal.Header>
          Recipe Details
          <Modal.Actions style={{float: 'right'}}>
            <Button color="blue" as={Link} to="/" onClick={() => setFirstOpen(false)}>Go Back to Recipes</Button>
          </Modal.Actions>
        </Modal.Header>
        <Modal.Content>
        <Card.Group centered style={{ position: 'relative'}}>
          <Card>
            <Card.Content>
              <Card.Header as="h2">{recipe.name}</Card.Header>
              {isEmpty(recipe.source) ? null : (<Card.Meta>Source: {recipe.source}</Card.Meta>)}
              <Card.Description>
                <Card.Header>Ingredients:</Card.Header>
                <List as="ul">
                {recipe.ingredients.map((ingredient, idx) => {
                  return (<Card.Description as="li" key={idx}>
                    {`${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}`}
                  </Card.Description>)
                })}
                </List>
              </Card.Description>
            </Card.Content>
            <Card.Content>
              Preparation time: {isEmpty(recipe.preparation_time.hours) || recipe.preparation_time.hours === 0 ? (<span>{`${recipe.preparation_time.minutes} minutes`}</span>) : (<span>{`${recipe.preparation_time.hours} hours, ${recipe.preparation_time.minutes} minutes`}</span>)}
            </Card.Content>
            <Card.Content extra>
              <Modal.Actions>
                <div className="ui two buttons">
                  <Button onClick={() => dispatch(openModal('mini', 'blurring'))} color="red">Delete Recipe</Button>
                </div>
              </Modal.Actions>
                <CoreModal
                  open={open}
                  onClose={() => dispatch(closeModal())}
                  onOpen={() => dispatch(openModal())}
                  size={size}
                  dimmer={dimmer}
                  onDelete={() => onDelete()}
                />
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>Preparation Instructions:</Card.Header>
              <Card.Description>{recipe.instructions}</Card.Description>
            </Card.Content>
          </Card>
            </Card.Group>
          </Modal.Content>
        </>
    ) : (
      <p>Loading...</p>
      )}
  </Modal>)
}

export default withRouter(RecipeShow);